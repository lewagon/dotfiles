/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var createInnerCallback = require("./createInnerCallback");

function startsWith(string, searchString) {
	var stringLength = string.length;
	var searchLength = searchString.length;

	// early out if the search length is greater than the search string
	if(searchLength > stringLength) {
		return false;
	}
	var index = -1;
	while(++index < searchLength) {
		if(string.charCodeAt(index) !== searchString.charCodeAt(index)) {
			return false;
		}
	}
	return true;
}

function AliasPlugin(source, options, target) {
	this.source = source;
	this.name = options.name;
	this.alias = options.alias;
	this.onlyModule = options.onlyModule;
	this.target = target;
}
module.exports = AliasPlugin;

AliasPlugin.prototype.apply = function(resolver) {
	var target = this.target;
	var name = this.name;
	var alias = this.alias;
	var onlyModule = this.onlyModule;
	resolver.plugin(this.source, function(request, callback) {
		var innerRequest = request.request;
		if(!innerRequest) return callback();
		if(innerRequest === name || (!onlyModule && startsWith(innerRequest, name + "/"))) {
			if(innerRequest !== alias && !startsWith(innerRequest, alias + "/")) {
				var newRequestStr = alias + innerRequest.substr(name.length);
				var obj = Object.assign({}, request, {
					request: newRequestStr
				});
				return resolver.doResolve(target, obj, "aliased with mapping '" + name + "': '" + alias + "' to '" + newRequestStr + "'", createInnerCallback(function(err, result) {
					if(arguments.length > 0) return callback(err, result);

					// don't allow other aliasing or raw request
					callback(null, null);
				}, callback));
			}
		}
		return callback();
	});
};
