var nodelint = require('./nodelint');
var optModule = require('./options');
var nopt = require("nopt");
var exit = require('exit'),
    glob = require('glob');

var LintStream = require('./lintstream.js'),
    ReportStream = require('./reportstream.js'),
    CollectorStream = require('./collectorstream.js'),
    JSONReportStream = require('./jsonreportstream.js'),
    FileOpener = require('./fileopener.js');

var con = console;
var pro = process;

exports.setConsole = function (c) {
    'use strict';
    con = c;
};

exports.setProcess = function (p) {
    'use strict';
    pro = p;
    exit = pro.exit.bind(pro);
};

function commandOptions() {
    'use strict';

    var commandOpts = {
            'indent': Number,
            'maxerr': Number,
            'maxlen': Number,
            'predef': [String, Array],
            'edition': String,
            'config': String
        },
        /* flags defined in jslint-latest.js */
        jslintFlags = [
            'ass', 'bitwise', 'browser', 'closure', 'continue',
            'debug', 'devel', 'eqeq', 'evil', 'forin', 'newcap',
            'node', 'nomen', 'passfail', 'plusplus', 'properties',
            'regexp', 'rhino', 'unparam', 'sloppy', 'stupid', 'sub',
            'todo', 'vars', 'white'
        ],
        /* flags used by node-jslint to control output */
        cliFlags = [
            'json', 'color', 'terse', 'version', 'filter'
        ],
        /* not used by jslint-latest.js */
        deprecatedFlags = [
            'anon', 'es5', 'on', 'undef', 'windows'
        ],
        allFlags = jslintFlags.concat(cliFlags).concat(deprecatedFlags);

    allFlags.forEach(function (option) {
        commandOpts[option] = Boolean;
    });

    return commandOpts;
}
exports.commandOptions = commandOptions;

function die(why) {
    'use strict';
    var o = commandOptions();
    con.warn(why);
    con.warn("Usage: " + pro.argv[1] +
            " [--" + Object.keys(o).sort().join("] [--") +
            "] [--] <scriptfile>...");
    exit(1);
}

function parseArgs(argv) {
    'use strict';
    var args = nopt(commandOptions(), {}, argv);

    if (args.filter === undefined) {
        args.filter = true;
    }

    return args;
}
exports.parseArgs = parseArgs;

exports.reportVersion = function reportVersion(callback, options) {
    'use strict';
    process.nextTick(function () {
        var package_data = require('../package.json'),
            version = package_data.version,
            edition = nodelint.load(options.edition).edition;

        callback("node-jslint version: " + version + "  JSLint edition " + edition);
    });

};

function expandGlob(glob) {
    'use strict';

    return function (pattern) {
        return glob.sync(pattern);
    };
}
exports.expandGlob = expandGlob;

function noNodeModules(file) {
    'use strict';
    return file.indexOf('node_modules') === -1;
}
exports.noNodeModules = noNodeModules;

function flatten(a, b) {
    'use strict';

    return a.concat(b);
}

function globFiles(list, glob, filter) {
    'use strict';
    var remain = [];

    remain = list.map(expandGlob(glob))
        .reduce(flatten, []);

    if (filter) {
        remain = remain.filter(noNodeModules);
    }

    return remain;
}
exports.globFiles = globFiles;

function makeReporter(parsed) {
    'use strict';
    var reporter;

    if (parsed.json) {
        reporter = new JSONReportStream(parsed);
    } else if (parsed.collector) {
        reporter = new CollectorStream(parsed);
    } else {
        reporter = new ReportStream(parsed);
    }

    reporter.on('data', function (chunk) {
        if (chunk === '.') {
            pro.stderr.write(chunk);
        } else {
            con.log(chunk);
        }
    });

    return reporter;
}
exports.makeReporter = makeReporter;

exports.runMain = function (options, cb) {
    'use strict';

    if (options.version) {
        exports.reportVersion(con.log, options);
        return;
    }

    if (!options.argv.remain.length) {
        die("No files specified.");
    }

    var procOptions = optModule.getOptions(process.env.HOME, options),
        files = globFiles(options.argv.remain, glob, options.filter),
        opener = new FileOpener(),
        linter = new LintStream(procOptions),
        reporter = makeReporter(procOptions);

    opener.pipe(linter);
    linter.pipe(reporter);

    reporter.on('finish', function () {
        if (cb) {
            return cb(null, reporter.lint);
        }

        if (reporter.allOK) {
            return exit(0);
        }
        exit(1);
    });

    files.forEach(function (file) {
        opener.write(file);
    });
    opener.end();
};
