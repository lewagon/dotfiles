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
        JSONReportStream;

    JSONReportStream = function JSONReportStream_constructor(options) {
        if (!(this instanceof JSONReportStream)) {
            return new JSONReportStream(options);
        }

        Transform.call(this, {objectMode: true});

        this.allOK = true;
    };
    util.inherits(JSONReportStream, Transform);

    function JSONReportStream_transform(chunk, ignore, callback) {
        // chunk: a package of lint data from JSLint
        this.emit('data', JSON.stringify([chunk.file, chunk.linted.errors]));

        this.allOK = this.allOK && chunk.linted.ok;

        callback();
    }

    JSONReportStream.prototype._transform = JSONReportStream_transform;

    module.exports = JSONReportStream;

}());
