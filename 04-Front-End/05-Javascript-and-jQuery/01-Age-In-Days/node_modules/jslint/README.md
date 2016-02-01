## node-jslint

Easily use [JSLint][] from the command line.

    jslint bin/jslint.js

## What's New

Added latest jslint, 2015-07-10.

Version 0.9.2 contains the latest jslint-es6, and a bug fix from @bryanjhv
jslint-es6 is no longer marked BETA by upstream.  In about a month (August, 2015)
I plan to release node-jslint 1.0.0 with `es6` linting by default.

Version 0.9.0 contains the new BETA version of jslint for EcmaScript 6,
which is a ground-up rewrite by Douglas Crockford.  The `latest` alias
still points to the last `es5` version of jslint; you can also use 
`--edition=es5` to get the (old) es5 version.  To get the `es6` version
you must use `--edition=es6`.

Version 0.7.0 creates a new programmatic interface which is used by
https://github.com/hapijs/lab

Version 0.5.1 fixes a regression which crashes jslint when more than
maxerr errors are in a single file.  Thanks to Vasil Velichkov
(@velichkov) for pointing this out.

Version 0.5.0 reorganizes the loading interface, making it easier for
other projects to use node-jslint to load a specific jslint edition.

Version 0.4.0 exposes a stream interface to jslint.

Version 0.3.4 supports globbing with * and ** expressions.

Versions 0.2+ provide multiple editions of jslint to
address backwards and forwards compatibility.

## Use the command-line client

### Use the default jslint

    jslint lib/color.js

### Always use the latest jslint

    jslint --edition=latest lib/color.js

### Use a specific edition

For example, edition 2013-02-03 which shipped with node-jslint 0.1.9:

    jslint --edition=2013-02-03 lib/color.js

## Use node-jslint programmatically

### Streams interface

As of node-jslint 0.4.0, a streams interface is exposed.  You can use it in client code like this:

Install as a dependency:

    $ npm install --save jslint

Pull it into your code with require:

    var LintStream = require('jslint').LintStream;

Create and configure the stream linter:

    var options = {
        "edition": "latest",
        "length": 100
    },
        l = new LintStream(options);

Send files to the linter:

    var fileName, fileContents;
    l.write({file: fileName, body: fileContents});

Receive lint from the linter:

    l.on('data', function (chunk, encoding, callback) {
        // chunk is an object

        // chunk.file is whatever you supplied to write (see above)
        assert.deepEqual(chunk.file, fileName);

        // chunk.linted is an object holding the result from running JSLint
        // chunk.linted.ok is the boolean return code from JSLINT()
        // chunk.linted.errors is the array of errors, etc.
        // see JSLINT for the complete contents of the object

        callback();
    });

You can only pass options to the LintStream when creating it.  The `edition` option can be
used to select different editions of JSLint.

The LintStream is in object mode (objectMode: true).  It expects an
object with two properties: `file` and `body`.  The `file` property
can be used to pass metadata along with the file.  The `body` property
contains the file to be linted; it can be either a string or a Buffer.

The LintStream emits `'data'` events containing an object with two properties.
The `file` property is copied from the `file` property that is passed in.  The
`linted` property contains the results of running JSLINT.

### Simple interface

The simple interface provides an edition-aware loader.  This can be used as a frontend to
node-jslint's collection of editions of the JSLINT code.

    var node_jslint = require('jslint'),
        JSLINT = node_jslint.load(edition);

This exposes the same loading interface used in node-jslint, so it supports the special
edition names `default` and `latest` as well as date-based edition names such as `2013-08-26`

As of version 0.5.0, the `load` function also accepts filenames.  To be recognized as a filename,
the argument to load must contain a path-separator character (`/` or `\`) or end with the extension
`.js`.


## Usage examples

Multiple files

    jslint lib/color.js lib/reporter.js

All JSLint options supported

    jslint --white --vars --regexp lib/color.js

Defaults to true, but you can specify false

    jslint --bitwise false lib/color.js

Pass arrays

    jslint --predef $ --predef Backbone lib/color.js

JSLint your entire project

    jslint '**/*.js'

Using JSLint with a config file

Start with the included jslint.conf.example file and customize your options
per project or copy it to $HOME/.jslint.conf to apply your setting globally

## License

See LICENSE file.

[JSLint]: http://jslint.com/
