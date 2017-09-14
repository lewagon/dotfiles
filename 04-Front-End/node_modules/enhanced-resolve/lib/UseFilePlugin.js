/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function UseFilePlugin(source, filename, target) {
	this.source = source;
	this.filename = filename;
	this.target = target;
}
module.exports = UseFilePlugin;

UseFilePlugin.prototype.apply = function(resolver) {
	var filename = this.filename;
	var target = this.target;
	resolver.plugin(this.source, function(request, callback) {
		var filePath = resolver.join(request.path, filename);
		var obj = Object.assign({}, request, {
			path: filePath,
			relativePath: request.relativePath && resolver.join(request.relativePath, filename)
		});
		resolver.doResolve(target, obj, "using path: " + filePath, callback);
	});
};
