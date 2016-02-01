jslint(1) -- a code quality tool
================================
## SYNOPSIS

jslint.js [--anon] [--ass] [--bitwise] [--browser] [--closure] [--color] [--continue] [--debug] [--devel] [--edition] [--eqeq] [--es5] [--evil] [--forin] [--indent] [--json] [--maxerr] [--maxlen] [--newcap] [--node] [--nomen] [--on] [--passfail] [--plusplus] [--predef] [--properties] [--regexp] [--rhino] [--sloppy] [--stupid] [--sub] [--terse] [--todo] [--undef] [--unparam] [--vars] [--white] [--] <scriptfile>...

## DESCRIPTION

JSLint is a static analysis tool to locate and correct style problems in Javascript (ECMAScript etc.) source code.

## META OPTIONS
  `--color`     write output in color

  `--terse`     report one error per line with parseable source file/line

  `--json`      output in JSON format

  `--edition`   specify which edition of jslint to use

  `--no-filter` allow linting files containing pattern `node_modules`

## LINTING OPTIONS
  `--ass`       Tolerate assignment expressions

  `--bitwise`   Tolerate bitwise operators

  `--browser`   Assume a browser

  `--closure`   Tolerate Google Closure idioms

  `--continue`  Tolerate continue

  `--debug`     Tolerate debugger statements

  `--devel`     Assume console,alert, ...

  `--eqeq`      Tolerate == and !=

  `--evil`      Tolerate eval

  `--forin`     Tolerate unfiltered for in

  `--indent`    Strict white space indentation

  `--maxerr`    Maximum number of errors

  `--maxlen`    Maximum line length

  `--newcap`    Tolerate uncapitalized constructors

  `--node`      Assume Node.js

  `--nomen`     Tolerate dangling underscore in identifiers

  `--passfail`  Stop on first error

  `--plusplus`  Tolerate ++ and --

  `--predef`    Declare additional predefined globals

  `--properties` Require all property names to be declared with /*properties*/

  `--regexp`    Tolerate . and [^...]. in /RegExp/

  `--rhino`     Assume Rhino

  `--sloppy`    Tolerate missing 'use strict' pragma

  `--stupid`    Tolerate stupidity (typically, use of sync functions)

  `--sub`       Tolerate inefficient subscripting

  `--todo`      Tolerate TODO comments

  `--unparam`   Tolerate unused parameters

  `--vars`      Tolerate many var statements per function

  `--white`     Tolerate messy white space

## DEPRECATED OPTIONS

  `--anon`      Tolerate no space in anonymous function definition

  `--es5`       Tolerate ECMAScript 5 syntax

  `--undef`     Tolerate variables used before declaration

  `--on`        Tolerate HTML event handlers

  `--windows`   Assume existence of Windows globals

##EXAMPLES

*Multiple files:*

    jslint lib/color.js lib/reporter.js

*All JSLint options supported*

    jslint --white --vars --regexp lib/color.js

*Defaults to true, but you can specify false*

    jslint --bitwise false lib/color.js

*Pass arrays*

    jslint --predef $ --predef Backbone lib/color.js

*JSLint your entire project*

    find . -name "*.js" -print0 | xargs -0 jslint

*Using JSLint with a config file*

  Start with the included example jslintrc file and customize your options per project
  or copy it to $HOME/.jslintrc to apply your setting globally

##INSTALLATION

To install jslint globally, use
 npm install jslint -g

To install jslint locally, use
 npm install jslint

When installed locally, jslint can be run as
 ./node_modules/.bin/jslint

##FILES

jslint looks for the following config files at startup:

 $HOME/.jslintrc
 ./jslintrc
 ./.jslintrc

The format of a jslint options file is a JSON file containing a single object
where the keys are jslint option names and the values are the option argument;
use `true` to enable and `false` to disable boolean options.  An example of a
valid option file is:

 {
   "vars": true,
   "white": true,
   "maxlen": 100,
   "predef": "foo,bar,baz"
 }

Comments are not allowed in option files.

##PRECEDENCE

The order of precedence for options is as follows:

 1. in the $HOME/.jslintrc
 1. in ./jslintrc or ./.jslintrc
 1. on the command line
 1. in a /\*jslint\*/ comment

A higher number indicates a higher precedence, i.e. command line options
override options specified by an options file, and /\*jslint\*/ comments
in the file being examined have the highest precedence.

##EDITIONS

You can now specify the edition of jslint with the *--edition* option.

Future versions of this package may include newer editions of jslint;
to always use the latest edition of jslint, specify --edition=latest:

    jslint --edition=latest lib/*.js

The default edition of jslint will remain stable as long as the leading
two components of the version number are the same.  New minor editions
may have a different default edition.

The previous version of this package (0.1.9) shipped an older edition
(2013-02-03) of jslint.  To revert to that behavior but still have the
new config file features, upgrade to 0.2.1 of this package and specify
`edition: '2012-02-03'` in your jslintrc file or `--edition=2013-02-03`
on the command line.

We recommend the following practices:

###If your project is in maintenance mode

Choose an edition of jslint and hardcode it into your project's lint config files, e.g.,
`edition: '2012-02-03'`. Specify a fixed version of jslint (e.g., "0.2.1") as a
devDependency in package.json

###If your project needs temporary stability (e.g., release phase)

Use the default edition of jslint (no `--edition` argument needed) and specify
a fixed minor version  (e.g, "~0.2") as a devDependency in package.json

###If you want the bleeding-edge version

Specify `edition: 'latest'` and use any 'latest version' behavior in package.json,
e.g., "*" or ">0.2.1"

##RETURN VALUES

jslint returns 1 if it found any problems, 0 otherwise.

##AUTHOR

jslint is written and maintained by Douglas Crockford [https://github.com/douglascrockford/JSLint](https://github.com/douglascrockford/JSLint)

This package is node-jslint, which provides a command-line interface for
running jslint using the nodejs platform.  node-jslint was written by Reid Burke
and is maintained by Reid Burke, Ryuichi Okumura, and Sam Mikes.

##BUGS

There are no known bugs.  Submit bugs to [https://github.com/reid/node-jslint/issues](https://github.com/reid/node-jslint/issues)

Note that if you are reporting a problem with the way jslint works rather than the way
the command-line tools work, we will probably refer you to the JSLint community [https://plus.google.com/communities/104441363299760713736](https://plus.google.com/communities/104441363299760713736) or the issue tracker at
 [https://github.com/douglascrockford/JSLint/issues](https://github.com/douglascrockford/JSLint/issues)
