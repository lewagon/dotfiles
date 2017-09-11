/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var Tapable = require("tapable");
var createInnerCallback = require("./createInnerCallback");

function Resolver(fileSystem) {
	Tapable.call(this);
	this.fileSystem = fileSystem;
}
module.exports = Resolver;

Resolver.prototype = Object.create(Tapable.prototype);

Resolver.prototype.constructor = Resolver;

Resolver.prototype.resolveSync = function resolveSync(context, path, request) {
	var err, result, sync = false;
	this.resolve(context, path, request, function(e, r) {
		err = e;
		result = r;
		sync = true;
	});
	if(!sync) throw new Error("Cannot 'resolveSync' because the fileSystem is not sync. Use 'resolve'!");
	if(err) throw err;
	return result;
};

Resolver.prototype.resolve = function resolve(context, path, request, callback) {
	if(arguments.length === 3) {
		throw new Error("Signature changed: context parameter added");
	}
	var resolver = this;
	var obj = {
		context: context,
		path: path,
		request: request
	};

	var localMissing;
	var log;
	var message = "resolve '" + request + "' in '" + path + "'";

	function writeLog(msg) {
		log.push(msg);
	}

	function logAsString() {
		return log.join("\n");
	}

	function onError(err, result) {
		if(callback.log) {
			for(var i = 0; i < log.length; i++)
				callback.log(log[i]);
		}

		if(err) return callback(err);

		var error = new Error("Can't " + message);
		error.details = logAsString();
		error.missing = localMissing;
		resolver.applyPlugins("no-resolve", obj, error);
		return callback(error);
	}

	function onResolve(err, result) {
		if(!err && result) {
			return callback(null, result.path === false ? false : result.path + (result.query || ""), result);
		}

		localMissing = [];
		log = [];

		return resolver.doResolve("resolve", obj, message, createInnerCallback(onError, {
			log: writeLog,
			missing: localMissing,
			stack: callback.stack
		}));
	}

	onResolve.missing = callback.missing;
	onResolve.stack = callback.stack;

	return this.doResolve("resolve", obj, message, onResolve);
};

Resolver.prototype.doResolve = function doResolve(type, request, message, callback) {
	var resolver = this;
	var stackLine = type + ": (" + request.path + ") " +
		(request.request || "") + (request.query || "") +
		(request.directory ? " directory" : "") +
		(request.module ? " module" : "");
	var newStack = [stackLine];
	if(callback.stack) {
		newStack = callback.stack.concat(newStack);
		if(callback.stack.indexOf(stackLine) >= 0) {
			// Prevent recursion
			var recursionError = new Error("Recursion in resolving\nStack:\n  " + newStack.join("\n  "));
			recursionError.recursion = true;
			if(callback.log) callback.log("abort resolving because of recursion");
			return callback(recursionError);
		}
	}
	resolver.applyPlugins("resolve-step", type, request);

	var beforePluginName = "before-" + type;
	if(resolver.hasPlugins(beforePluginName)) {
		resolver.applyPluginsAsyncSeriesBailResult1(beforePluginName, request, createInnerCallback(beforeInnerCallback, {
			log: callback.log,
			missing: callback.missing,
			stack: newStack
		}, message && ("before " + message), true));
	} else {
		runNormal();
	}

	function beforeInnerCallback(err, result) {
		if(arguments.length > 0) {
			if(err) return callback(err);
			if(result) return callback(null, result);
			return callback();
		}
		runNormal();
	}

	function runNormal() {
		if(resolver.hasPlugins(type)) {
			return resolver.applyPluginsAsyncSeriesBailResult1(type, request, createInnerCallback(innerCallback, {
				log: callback.log,
				missing: callback.missing,
				stack: newStack
			}, message));
		} else {
			runAfter();
		}
	}

	function innerCallback(err, result) {
		if(arguments.length > 0) {
			if(err) return callback(err);
			if(result) return callback(null, result);
			return callback();
		}
		runAfter();
	}

	function runAfter() {
		var afterPluginName = "after-" + type;
		if(resolver.hasPlugins(afterPluginName)) {
			return resolver.applyPluginsAsyncSeriesBailResult1(afterPluginName, request, createInnerCallback(afterInnerCallback, {
				log: callback.log,
				missing: callback.missing,
				stack: newStack
			}, message && ("after " + message), true));
		} else {
			callback();
		}
	}

	function afterInnerCallback(err, result) {
		if(arguments.length > 0) {
			if(err) return callback(err);
			if(result) return callback(null, result);
			return callback();
		}
		return callback();
	}
};

Resolver.prototype.parse = function parse(identifier) {
	if(identifier === "") return null;
	var part = {
		request: "",
		query: "",
		module: false,
		directory: false,
		file: false
	};
	var idxQuery = identifier.indexOf("?");
	if(idxQuery === 0) {
		part.query = identifier;
	} else if(idxQuery > 0) {
		part.request = identifier.slice(0, idxQuery);
		part.query = identifier.slice(idxQuery);
	} else {
		part.request = identifier;
	}
	if(part.request) {
		part.module = this.isModule(part.request);
		part.directory = this.isDirectory(part.request);
		if(part.directory) {
			part.request = part.request.substr(0, part.request.length - 1);
		}
	}
	return part;
};

var notModuleRegExp = /^\.$|^\.[\\\/]|^\.\.$|^\.\.[\/\\]|^\/|^[A-Z]:[\\\/]/i;
Resolver.prototype.isModule = function isModule(path) {
	return !notModuleRegExp.test(path);
};

var directoryRegExp = /[\/\\]$/i;
Resolver.prototype.isDirectory = function isDirectory(path) {
	return directoryRegExp.test(path);
};

var memoryFsJoin = require("memory-fs/lib/join");
var memoizedJoin = new Map();
Resolver.prototype.join = function(path, request) {
	var cacheEntry;
	var pathCache = memoizedJoin.get(path);
	if(typeof pathCache === "undefined") {
		memoizedJoin.set(path, pathCache = new Map());
	} else {
		cacheEntry = pathCache.get(request);
		if(typeof cacheEntry !== "undefined")
			return cacheEntry;
	}
	cacheEntry = memoryFsJoin(path, request);
	pathCache.set(request, cacheEntry);
	return cacheEntry;
};

Resolver.prototype.normalize = require("memory-fs/lib/normalize");
