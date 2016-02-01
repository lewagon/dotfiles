var con = console,
    vm = require("vm"),
    fs = require("fs"),
    path = require('path'),
    linter = require('./linter.js'),
    main = require('./main.js'),
    LintStream = require('./lintstream.js');

exports.LintStream = LintStream;

exports.linter = linter;

exports.runMain = main.runMain;

exports.setConsole = function (c) {
    'use strict';
    con = c;
};

function looksLikeFileName(edition) {
    'use strict';

    // contains .js or a path separator character '/' or '\'
    return (/\.js|\/|\\/).test(edition);
}
exports.looksLikeFileName = looksLikeFileName;

exports.load = function (edition) {
    'use strict';

    var ctx = vm.createContext(),
        fileName,
        jslintSource;

    function makePathFromName(name) {
        return path.join(__dirname, name) + ".js";
    }

    function makePathFromEdition(edition) {
        return makePathFromName("jslint-" + edition);
    }

    function read(name) {
        return fs.readFileSync(name);
    }


    if (edition) {
        if (looksLikeFileName(edition)) {
            fileName = edition;
        } else {
            fileName = makePathFromEdition(edition);
        }

        try {
            jslintSource = read(fileName);
        } catch (err) {
            con.warn("Unable to load edition " + edition + ", reverting to default. " + err);
        }
    }

    if (!jslintSource) {
        jslintSource = read(makePathFromName("jslint"));
    }

    vm.runInContext(jslintSource, ctx);

    if (!ctx.JSLINT) {
        ctx.JSLINT = function JSLINT(script, options) {
            var data = ctx.jslint(script, options, options.predef);
            ctx.JSLINT.data = function () {
                return data;
            };
        };
        ctx.JSLINT.edition = ctx.jslint('').edition;
    }

    return ctx.JSLINT;

};
