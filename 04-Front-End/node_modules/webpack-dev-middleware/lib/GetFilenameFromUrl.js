var pathJoin = require("./PathJoin");
var querystring = require("querystring");
var urlParse = require("url").parse;

function getFilenameFromUrl(publicPath, outputPath, url) {
	var filename;

	// localPrefix is the folder our bundle should be in
	var localPrefix = urlParse(publicPath || "/", false, true);
	var urlObject = urlParse(url);

	// publicPath has the hostname that is not the same as request url's, should fail
	if(localPrefix.hostname !== null && urlObject.hostname !== null &&
		localPrefix.hostname !== urlObject.hostname) {
		return false;
	}

	// publicPath is not in url, so it should fail
	if(publicPath && localPrefix.hostname === urlObject.hostname && url.indexOf(publicPath) !== 0) {
		return false;
	}

	// strip localPrefix from the start of url
	if(urlObject.pathname.indexOf(localPrefix.pathname) === 0) {
		filename = urlObject.pathname.substr(localPrefix.pathname.length);
	}

	if(!urlObject.hostname && localPrefix.hostname &&
		url.indexOf(localPrefix.path) !== 0) {
		return false;
	}
	// and if not match, use outputPath as filename
	return querystring.unescape(filename ? pathJoin(outputPath, filename) : outputPath);
}

// support for multi-compiler configuration
// see: https://github.com/webpack/webpack-dev-server/issues/641
function getPaths(publicPath, compiler, url) {
	var compilers = compiler && compiler.compilers;
	if(Array.isArray(compilers)) {
		var compilerPublicPath;
		for(var i = 0; i < compilers.length; i++) {
			compilerPublicPath = compilers[i].options
				&& compilers[i].options.output
				&& compilers[i].options.output.publicPath;
			if(url.indexOf(compilerPublicPath) === 0) {
				return {
					publicPath: compilerPublicPath,
					outputPath: compilers[i].outputPath
				};
			}
		}
	}
	return {
		publicPath: publicPath,
		outputPath: compiler.outputPath
	};
}

module.exports = function(publicPath, compiler, url) {
	var paths = getPaths(publicPath, compiler, url);
	return getFilenameFromUrl(paths.publicPath, paths.outputPath, url);
};
