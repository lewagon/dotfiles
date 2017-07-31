/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function ResultPlugin(source) {
	this.source = source;
}
module.exports = ResultPlugin;

ResultPlugin.prototype.apply = function(resolver) {
	resolver.plugin(this.source, function(request, callback) {
		var obj = Object.assign({}, request);
		resolver.applyPluginsAsyncSeries1("result", obj, function(err) {
			if(err) return callback(err);
			callback(null, obj);
		});
	});
};
