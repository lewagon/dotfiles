/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var createInnerCallback = require("./createInnerCallback");

function UnsafeCachePlugin(source, filterPredicate, cache, withContext, target) {
	this.source = source;
	this.filterPredicate = filterPredicate;
	this.withContext = withContext;
	this.cache = cache || {};
	this.target = target;
}
module.exports = UnsafeCachePlugin;

function getCacheId(request, withContext) {
	return JSON.stringify({
		context: withContext ? request.context : "",
		path: request.path,
		query: request.query,
		request: request.request
	});
}

UnsafeCachePlugin.prototype.apply = function(resolver) {
	var filterPredicate = this.filterPredicate;
	var cache = this.cache;
	var target = this.target;
	var withContext = this.withContext;
	resolver.plugin(this.source, function(request, callback) {
		if(!filterPredicate(request)) return callback();
		var cacheId = getCacheId(request, withContext);
		var cacheEntry = cache[cacheId];
		if(cacheEntry) {
			return callback(null, cacheEntry);
		}
		resolver.doResolve(target, request, null, createInnerCallback(function(err, result) {
			if(err) return callback(err);
			if(result) return callback(null, cache[cacheId] = result);
			callback();
		}, callback));
	});
};
