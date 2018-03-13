/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function getPaths(path) {
	var parts = path.split(/(.*?[\\\/]+)/);
	var paths = [path];
	var seqments = [parts[parts.length - 1]];
	var part = parts[parts.length - 1];
	path = path.substr(0, path.length - part.length - 1);
	paths.push(path);
	for(var i = parts.length - 2; i > 2; i -= 2) {
		part = parts[i];
		path = path.substr(0, path.length - part.length) || "/";
		paths.push(path);
		seqments.push(part.substr(0, part.length - 1));
	}
	part = parts[1];
	seqments.push(part.length > 1 ? part.substr(0, part.length - 1) : part);
	return {
		paths: paths,
		seqments: seqments
	};
};

module.exports.basename = function basename(path) {
	var i = path.lastIndexOf("/"),
		j = path.lastIndexOf("\\");
	var p = i < 0 ? j : j < 0 ? i : i < j ? j : i;
	if(p < 0) return null;
	var s = path.substr(p + 1);
	return s;
};
