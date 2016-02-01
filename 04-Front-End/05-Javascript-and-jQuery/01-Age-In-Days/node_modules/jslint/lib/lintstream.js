// this file is lib/lintstream.js
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
        nodelint = require('./nodelint'),
        optModule = require('./options'),
        linter = require('./linter'),
        LintStream;

    LintStream = function LintStream_constructor(options) {
        if (!(this instanceof LintStream)) {
            return new LintStream(options);
        }
        Transform.call(this, {objectMode: true});

        // shallow copy options
        options = optModule.merge({}, options);
        this.JSlint = nodelint.load(options.edition);

        // initialize members
        this.options = options;
        this.linter = linter;
    };
    util.inherits(LintStream, Transform);

    function LintStream_transform(chunk, ignore, callback) {
        var fileName = chunk.file,
            body = chunk.body,
            linted = this.linter.doLint(this.JSlint, body, this.options);

        this.push({file: fileName, linted: linted});

        callback();
    }

    LintStream.prototype._transform = LintStream_transform;

    module.exports = LintStream;

}());
