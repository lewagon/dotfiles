var mime = require("mime");
var parseRange = require("range-parser");
var pathIsAbsolute = require("path-is-absolute");
var MemoryFileSystem = require("memory-fs");
var timestamp = require("time-stamp");

var HASH_REGEXP = /[0-9a-f]{10,}/;

module.exports = function Shared(context) {
	var share = {
		setOptions: function(options) {
			if(!options) options = {};
			if(typeof options.reportTime === "undefined") options.reportTime = false;
			if(typeof options.watchOptions === "undefined") options.watchOptions = {};
			if(typeof options.reporter !== "function") options.reporter = share.defaultReporter;
			if(typeof options.log !== "function") options.log = console.log.bind(console);
			if(typeof options.warn !== "function") options.warn = console.warn.bind(console);
			if(typeof options.error !== "function") options.error = console.error.bind(console);
			if(typeof options.watchDelay !== "undefined") {
				// TODO remove this in next major version
				options.warn("options.watchDelay is deprecated: Use 'options.watchOptions.aggregateTimeout' instead");
				options.watchOptions.aggregateTimeout = options.watchDelay;
			}
			if(typeof options.watchOptions.aggregateTimeout === "undefined") options.watchOptions.aggregateTimeout = 200;
			if(typeof options.stats === "undefined") options.stats = {};
			if(!options.stats.context) options.stats.context = process.cwd();
			if(options.lazy) {
				if(typeof options.filename === "string") {
					var str = options.filename
						.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
						.replace(/\\\[[a-z]+\\\]/ig, ".+");
					options.filename = new RegExp("^[\/]{0,1}" + str + "$");
				}
			}
			// defining custom MIME type
			if(options.mimeTypes) mime.define(options.mimeTypes);

			context.options = options;
		},
		defaultReporter: function(reporterOptions) {
			var time = "";
			var state = reporterOptions.state;
			var stats = reporterOptions.stats;
			var options = reporterOptions.options;

			if(!!options.reportTime) {
				time = "[" + timestamp("HH:mm:ss") + "] ";
			}
			if(state) {
				var displayStats = (!options.quiet && options.stats !== false);
				if(displayStats && !(stats.hasErrors() || stats.hasWarnings()) &&
					options.noInfo)
					displayStats = false;
				if(displayStats) {
					if(stats.hasErrors()) {
						options.error(stats.toString(options.stats));
					} else if(stats.hasWarnings()) {
						options.warn(stats.toString(options.stats));
					} else {
						options.log(stats.toString(options.stats));
					}
				}
				if(!options.noInfo && !options.quiet) {
					var msg = "Compiled successfully.";
					if(stats.hasErrors()) {
						msg = "Failed to compile.";
					  } else if(stats.hasWarnings()) {
						msg = "Compiled with warnings.";
					}
					options.log(time + "webpack: " + msg);
				}
			} else {
				options.log(time + "webpack: Compiling...");
			}
		},
		handleRangeHeaders: function handleRangeHeaders(content, req, res) {
			//assumes express API. For other servers, need to add logic to access alternative header APIs
			res.setHeader("Accept-Ranges", "bytes");
			if(req.headers.range) {
				var ranges = parseRange(content.length, req.headers.range);

				// unsatisfiable
				if(-1 == ranges) {
					res.setHeader("Content-Range", "bytes */" + content.length);
					res.statusCode = 416;
				}

				// valid (syntactically invalid/multiple ranges are treated as a regular response)
				if(-2 != ranges && ranges.length === 1) {
					// Content-Range
					res.statusCode = 206;
					var length = content.length;
					res.setHeader(
						"Content-Range",
						"bytes " + ranges[0].start + "-" + ranges[0].end + "/" + length
					);

					content = content.slice(ranges[0].start, ranges[0].end + 1);
				}
			}
			return content;
		},
		setFs: function(compiler) {
			if(typeof compiler.outputPath === "string" && !pathIsAbsolute.posix(compiler.outputPath) && !pathIsAbsolute.win32(compiler.outputPath)) {
				throw new Error("`output.path` needs to be an absolute path or `/`.");
			}

			// store our files in memory
			var fs;
			var isMemoryFs = !compiler.compilers && compiler.outputFileSystem instanceof MemoryFileSystem;
			if(isMemoryFs) {
				fs = compiler.outputFileSystem;
			} else {
				fs = compiler.outputFileSystem = new MemoryFileSystem();
			}
			context.fs = fs;
		},
		compilerDone: function(stats) {
			// We are now on valid state
			context.state = true;
			context.webpackStats = stats;

			// Do the stuff in nextTick, because bundle may be invalidated
			// if a change happened while compiling
			process.nextTick(function() {
				// check if still in valid state
				if(!context.state) return;
				// print webpack output
				context.options.reporter({
					state: true,
					stats: stats,
					options: context.options
				});

				// execute callback that are delayed
				var cbs = context.callbacks;
				context.callbacks = [];
				cbs.forEach(function continueBecauseBundleAvailable(cb) {
					cb(stats);
				});
			});

			// In lazy mode, we may issue another rebuild
			if(context.forceRebuild) {
				context.forceRebuild = false;
				share.rebuild();
			}
		},
		compilerInvalid: function() {
			if(context.state && (!context.options.noInfo && !context.options.quiet))
				context.options.reporter({
					state: false,
					options: context.options
				});

			// We are now in invalid state
			context.state = false;
			//resolve async
			if(arguments.length === 2 && typeof arguments[1] === "function") {
				var callback = arguments[1];
				callback();
			}
		},
		ready: function ready(fn, req) {
			var options = context.options;
			if(context.state) return fn(context.webpackStats);
			if(!options.noInfo && !options.quiet)
				options.log("webpack: wait until bundle finished: " + (req.url || fn.name));
			context.callbacks.push(fn);
		},
		startWatch: function() {
			var options = context.options;
			var compiler = context.compiler;
			// start watching
			if(!options.lazy) {
				var watching = compiler.watch(options.watchOptions, share.handleCompilerCallback);
				context.watching = watching;
			} else {
				context.state = true;
			}
		},
		rebuild: function rebuild() {
			if(context.state) {
				context.state = false;
				context.compiler.run(share.handleCompilerCallback);
			} else {
				context.forceRebuild = true;
			}
		},
		handleCompilerCallback: function(err) {
			if(err) {
				context.options.error(err.stack || err);
				if(err.details) context.options.error(err.details);
			}
		},
		handleRequest: function(filename, processRequest, req) {
			// in lazy mode, rebuild on bundle request
			if(context.options.lazy && (!context.options.filename || context.options.filename.test(filename)))
				share.rebuild();
			if(HASH_REGEXP.test(filename)) {
				try {
					if(context.fs.statSync(filename).isFile()) {
						processRequest();
						return;
					}
				} catch(e) {
				}
			}
			share.ready(processRequest, req);
		},
		waitUntilValid: function(callback) {
			callback = callback || function() {};
			share.ready(callback, {});
		},
		invalidate: function(callback) {
			callback = callback || function() {};
			if(context.watching) {
				share.ready(callback, {});
				context.watching.invalidate();
			} else {
				callback();
			}
		},
		close: function(callback) {
			callback = callback || function() {};
			if(context.watching) context.watching.close(callback);
			else callback();
		}
	};
	share.setOptions(context.options);
	share.setFs(context.compiler);

	context.compiler.plugin("done", share.compilerDone);
	context.compiler.plugin("invalid", share.compilerInvalid);
	context.compiler.plugin("watch-run", share.compilerInvalid);
	context.compiler.plugin("run", share.compilerInvalid);

	share.startWatch();
	return share;
};
