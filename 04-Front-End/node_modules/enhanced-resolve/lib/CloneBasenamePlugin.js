/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var basename = require("./getPaths").basename;

function CloneBasenamePlugin(source, target) {
	this.source = source;
	this.target = target;
}
module.exports = CloneBasenamePlugin;

CloneBasenamePlugin.prototype.apply = function(resolver) {
	var target = this.target;
	resolver.plugin(this.source, function(request, callback) {
		var filename = basename(request.path);
		var filePath = resolver.join(request.path, filename);
		var obj = Object.assign({}, request, {
			path: filePath,
			relativePath: request.relativePath && resolver.join(request.relativePath, filename)
		});
		resolver.doResolve(target, obj, "using path: " + filePath, callback);
	});
};
