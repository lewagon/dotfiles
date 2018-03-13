/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceMapConsumer = require("source-map").SourceMapConsumer;
var SourceMapSource = require("webpack-sources").SourceMapSource;
var RawSource = require("webpack-sources").RawSource;
var ConcatSource = require("webpack-sources").ConcatSource;
var RequestShortener = require("webpack/lib/RequestShortener");
var ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");
var uglify = require("uglify-js");

var UglifyJsPlugin = function () {
	function UglifyJsPlugin(options) {
		_classCallCheck(this, UglifyJsPlugin);

		if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== "object" || Array.isArray(options)) options = {};
		if (typeof options.compressor !== "undefined") options.compress = options.compressor;
		this.options = options;
	}

	_createClass(UglifyJsPlugin, [{
		key: "apply",
		value: function apply(compiler) {
			var options = this.options;
			options.test = options.test || /\.js($|\?)/i;
			var warningsFilter = options.warningsFilter || function () {
				return true;
			};

			var requestShortener = new RequestShortener(compiler.context);
			compiler.plugin("compilation", function (compilation) {
				if (options.sourceMap) {
					compilation.plugin("build-module", function (module) {
						// to get detailed location info about errors
						module.useSourceMap = true;
					});
				}
				compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
					var files = [];
					chunks.forEach(function (chunk) {
						return files.push.apply(files, chunk.files);
					});
					files.push.apply(files, compilation.additionalChunkAssets);
					var filteredFiles = files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options));
					filteredFiles.forEach(function (file) {
						var oldWarnFunction = uglify.AST_Node.warn_function;
						var warnings = [];
						var sourceMap = void 0;
						try {
							var asset = compilation.assets[file];
							if (asset.__UglifyJsPlugin) {
								compilation.assets[file] = asset.__UglifyJsPlugin;
								return;
							}
							var input = void 0;
							var inputSourceMap = void 0;
							if (options.sourceMap) {
								if (asset.sourceAndMap) {
									var sourceAndMap = asset.sourceAndMap();
									inputSourceMap = sourceAndMap.map;
									input = sourceAndMap.source;
								} else {
									inputSourceMap = asset.map();
									input = asset.source();
								}
								sourceMap = new SourceMapConsumer(inputSourceMap);
								uglify.AST_Node.warn_function = function (warning) {
									// eslint-disable-line camelcase
									var match = /\[.+:([0-9]+),([0-9]+)\]/.exec(warning);
									var line = +match[1];
									var column = +match[2];
									var original = sourceMap.originalPositionFor({
										line: line,
										column: column
									});
									if (!original || !original.source || original.source === file) return;
									if (!warningsFilter(original.source)) return;
									warnings.push(warning.replace(/\[.+:([0-9]+),([0-9]+)\]/, "") + "[" + requestShortener.shorten(original.source) + ":" + original.line + "," + original.column + "]");
								};
							} else {
								input = asset.source();
								uglify.AST_Node.warn_function = function (warning) {
									// eslint-disable-line camelcase
									warnings.push(warning);
								};
							}
							uglify.base54.reset();
							var ast = uglify.parse(input, {
								filename: file
							});
							if (options.compress !== false) {
								ast.figure_out_scope();
								var compress = uglify.Compressor(options.compress || {
									warnings: false
								}); // eslint-disable-line new-cap
								ast = compress.compress(ast);
							}
							if (options.mangle !== false) {
								ast.figure_out_scope(options.mangle || {});
								ast.compute_char_frequency(options.mangle || {});
								ast.mangle_names(options.mangle || {});
								if (options.mangle && options.mangle.props) {
									uglify.mangle_properties(ast, options.mangle.props);
								}
							}
							var output = {};
							output.comments = Object.prototype.hasOwnProperty.call(options, "comments") ? options.comments : /^\**!|@preserve|@license/;
							output.beautify = options.beautify;
							for (var k in options.output) {
								output[k] = options.output[k];
							}
							var extractedComments = [];
							if (options.extractComments) {
								var condition = {};
								if (typeof options.extractComments === "string" || options.extractComments instanceof RegExp) {
									// extractComments specifies the extract condition and output.comments specifies the preserve condition
									condition.preserve = output.comments;
									condition.extract = options.extractComments;
								} else if (Object.prototype.hasOwnProperty.call(options.extractComments, "condition")) {
									// Extract condition is given in extractComments.condition
									condition.preserve = output.comments;
									condition.extract = options.extractComments.condition;
								} else {
									// No extract condition is given. Extract comments that match output.comments instead of preserving them
									condition.preserve = false;
									condition.extract = output.comments;
								}

								// Ensure that both conditions are functions
								["preserve", "extract"].forEach(function (key) {
									switch (_typeof(condition[key])) {
										case "boolean":
											var b = condition[key];
											condition[key] = function () {
												return b;
											};
											break;
										case "function":
											break;
										case "string":
											if (condition[key] === "all") {
												condition[key] = function () {
													return true;
												};
												break;
											}
											var regex = new RegExp(condition[key]);
											condition[key] = function (astNode, comment) {
												return regex.test(comment.value);
											};
											break;
										default:
											regex = condition[key];
											condition[key] = function (astNode, comment) {
												return regex.test(comment.value);
											};
									}
								});

								// Redefine the comments function to extract and preserve
								// comments according to the two conditions
								output.comments = function (astNode, comment) {
									if (condition.extract(astNode, comment)) {
										extractedComments.push(comment.type === "comment2" ? "/*" + comment.value + "*/" : "//" + comment.value);
									}
									return condition.preserve(astNode, comment);
								};
							}
							var map = void 0;
							if (options.sourceMap) {
								map = uglify.SourceMap({ // eslint-disable-line new-cap
									file: file,
									root: ""
								});
								output.source_map = map; // eslint-disable-line camelcase
							}
							var stream = uglify.OutputStream(output); // eslint-disable-line new-cap
							ast.print(stream);
							if (map) map = map + "";
							var stringifiedStream = stream + "";
							var outputSource = map ? new SourceMapSource(stringifiedStream, file, JSON.parse(map), input, inputSourceMap) : new RawSource(stringifiedStream);
							if (extractedComments.length > 0) {
								var commentsFile = options.extractComments.filename || file + ".LICENSE";
								if (typeof commentsFile === "function") {
									commentsFile = commentsFile(file);
								}

								// Write extracted comments to commentsFile
								var commentsSource = new RawSource(extractedComments.join("\n\n") + "\n");
								if (commentsFile in compilation.assets) {
									// commentsFile already exists, append new comments...
									if (compilation.assets[commentsFile] instanceof ConcatSource) {
										compilation.assets[commentsFile].add("\n");
										compilation.assets[commentsFile].add(commentsSource);
									} else {
										compilation.assets[commentsFile] = new ConcatSource(compilation.assets[commentsFile], "\n", commentsSource);
									}
								} else {
									compilation.assets[commentsFile] = commentsSource;
								}

								// Add a banner to the original file
								if (options.extractComments.banner !== false) {
									var banner = options.extractComments.banner || "For license information please see " + commentsFile;
									if (typeof banner === "function") {
										banner = banner(commentsFile);
									}
									if (banner) {
										outputSource = new ConcatSource("/*! " + banner + " */\n", outputSource);
									}
								}
							}
							asset.__UglifyJsPlugin = compilation.assets[file] = outputSource;
							if (warnings.length > 0) {
								compilation.warnings.push(new Error(file + " from UglifyJs\n" + warnings.join("\n")));
							}
						} catch (err) {
							if (err.line) {
								var original = sourceMap && sourceMap.originalPositionFor({
									line: err.line,
									column: err.col
								});
								if (original && original.source) {
									compilation.errors.push(new Error(file + " from UglifyJs\n" + err.message + " [" + requestShortener.shorten(original.source) + ":" + original.line + "," + original.column + "][" + file + ":" + err.line + "," + err.col + "]"));
								} else {
									compilation.errors.push(new Error(file + " from UglifyJs\n" + err.message + " [" + file + ":" + err.line + "," + err.col + "]"));
								}
							} else if (err.msg) {
								compilation.errors.push(new Error(file + " from UglifyJs\n" + err.msg));
							} else compilation.errors.push(new Error(file + " from UglifyJs\n" + err.stack));
						} finally {
							uglify.AST_Node.warn_function = oldWarnFunction; // eslint-disable-line camelcase
						}
					});
					callback();
				});
			});
		}
	}]);

	return UglifyJsPlugin;
}();

module.exports = UglifyJsPlugin;