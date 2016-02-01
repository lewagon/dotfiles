// this file is lib/reportstream.js
// provides a stream interface to JSLint
//
// Copyright 2014 Cubane Canada Inc.
//
// Released under modified MIT/BSD 3-clause license
// See LICENSE for details.

(function () {
    'use strict';

    var util = require('util'),
        Transform = require('./stream').Transform,
        reporter = require('./reporter'),
        ReportStream;


    ReportStream = function ReportStream_constructor(options) {
        var stream = this;

        if (!(this instanceof ReportStream)) {
            return new ReportStream(options);
        }

        options = options || {};
        options.objectMode = true;
        Transform.call(this, options);

        this.reporter = reporter.makeReporter(
            {
                log: function (s) {
                    stream.emit('data', s);
                },
                err: function (s) {
                    stream.emit('data', s);
                }
            },
            options.color,
            options.terse
        );

        this.allOK = true;

    };
    util.inherits(ReportStream, Transform);

    function ReportStream_transform(chunk, ignore, callback) {
        // chunk: a package of lint data from JSLint

        this.reporter.report(chunk.file, chunk.linted);

        this.allOK = this.allOK && chunk.linted.ok;

        callback();
    }

    ReportStream.prototype._transform = ReportStream_transform;

    module.exports = ReportStream;

}());
