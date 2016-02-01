(function () {
    'use strict';

    var color = require("./color");

    exports.logger = {
        log: (console.log).bind(console),
        err: (process.stderr.write).bind(process.stderr)
    };

    exports.setLogger = function (l) {
        this.logger = l;
    };

    exports.makeReporter = function (logger, colorize, terse) {
        return {
            logger: logger,
            colorize: colorize,
            terse: terse,
            report: function (file, lint) {
                return exports.report.call(this, file, lint, this.colorize, this.terse);
            }
        };
    };

    exports.report = function (file, lint, colorize, terse) {
        var line,
            pad,
            errors,
            logger = this.logger,
            fileMessage;

        function c(format, str) {
            if (colorize) {
                return color[format](str);
            }
            return str;
        }

        fileMessage = "\n" + c('bold', file);

        function col(e) {
            return e.character || e.column;
        }
        function evidence(e) {
            return e.evidence || (lint.lines && lint.lines[e.line]) || '';
        }
        function message(e) {
            return e.reason || e.message;
        }

        if (!lint.ok) {
            // remove nulls
            errors = lint.errors;// || lint.warnings;
            errors = errors.filter(function (e) {
                return e;
            });

            if (terse) {
                errors.forEach(function (e) {
                    logger.log(file + ':' + e.line + ':' + col(e) + ': ' + message(e));
                });
            } else {
                logger.log(fileMessage);
                errors.forEach(function (e, i) {
                    pad = "#" + String(i + 1);
                    while (pad.length < 3) {
                        pad = ' ' + pad;
                    }
                    line = ' // Line ' + e.line + ', Pos ' + col(e);

                    logger.log(pad + ' ' + c('yellow', message(e)));
                    logger.log('    ' + evidence(e).trim() + c('grey', line));
                });
            }
        } else {
            if (terse) {
                logger.err(".");
            } else {
                logger.log(fileMessage + " is " + c('green', 'OK') + ".");
            }
        }

        return lint.ok;
    };

}());
