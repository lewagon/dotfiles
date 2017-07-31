/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var fs = require("graceful-fs");

function NodeJsInputFileSystem() {}
module.exports = NodeJsInputFileSystem;

NodeJsInputFileSystem.prototype.stat = fs.stat.bind(fs);
NodeJsInputFileSystem.prototype.readdir = function readdir(path, callback) {
	fs.readdir(path, function(err, files) {
		callback(err, files && files.map(function(file) {
			return file.normalize ? file.normalize("NFC") : file;
		}));
	});
};
NodeJsInputFileSystem.prototype.readFile = fs.readFile.bind(fs);
NodeJsInputFileSystem.prototype.readlink = fs.readlink.bind(fs);

NodeJsInputFileSystem.prototype.statSync = fs.statSync.bind(fs);
NodeJsInputFileSystem.prototype.readdirSync = function readdirSync(path) {
	var files = fs.readdirSync(path);
	return files && files.map(function(file) {
		return file.normalize ? file.normalize("NFC") : file;
	});
};
NodeJsInputFileSystem.prototype.readFileSync = fs.readFileSync.bind(fs);
NodeJsInputFileSystem.prototype.readlinkSync = fs.readlinkSync.bind(fs);
