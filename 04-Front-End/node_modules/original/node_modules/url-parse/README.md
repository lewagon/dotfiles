# url-parse
[![Made by unshift](https://img.shields.io/badge/made%20by-unshift-00ffcc.svg?style=flat-square)](http://unshift.io)[![Version npm](https://img.shields.io/npm/v/url-parse.svg?style=flat-square)](http://browsenpm.org/package/url-parse)[![Build Status](https://img.shields.io/travis/unshiftio/url-parse/master.svg?style=flat-square)](https://travis-ci.org/unshiftio/url-parse)[![Dependencies](https://img.shields.io/david/unshiftio/url-parse.svg?style=flat-square)](https://david-dm.org/unshiftio/url-parse)[![Coverage Status](https://img.shields.io/coveralls/unshiftio/url-parse/master.svg?style=flat-square)](https://coveralls.io/r/unshiftio/url-parse?branch=master)[![IRC channel](https://img.shields.io/badge/IRC-irc.freenode.net%23unshift-00a8ff.svg?style=flat-square)](https://webchat.freenode.net/?channels=unshift)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/url-parse.svg)](https://saucelabs.com/u/url-parse)

The `url-parse` method exposes two different API interfaces. The
[`url`](https://nodejs.org/api/url.html) interface that you know from Node.js
and the new [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)
interface that is available in the latest browsers.

Since `0.1` we've moved away from using the DOM's `<a>` element for URL parsing
and moving to a full Regular Expression solution. The main reason for this
change is to make the URL parser available in different JavaScript environments
as you don't always have access to the DOM like `Worker` environments. This
module still have a really small foot print as this module's main intention is
to be bundled with client-side code. The only problem however with a RegExp
based solution is that it required a lot of lookups causing major problems in
FireFox. So the last and the current solution was a pure string parsing
solution which chops up the URL in smaller pieces.

In addition to URL parsing we also expose the bundled `querystringify` module.

## Installation

This module is designed to be used using either browserify or node.js it's
released in the public npm registry and can be installed using:

```
npm install url-parse
```

## Usage

All examples assume that this library is bootstrapped using:

```js
'use strict';

var URL = require('url-parse');
```

To parse an URL simply call the `URL` method with the URL that needs to be
transformed in to an object.

```js
var url = new URL('https://github.com/foo/bar');
```

The `new` keyword is optional but it will save you an extra function invocation.
In the example above we've demonstrated the URL interface, but as said in the
module description we also support the node.js interface. So you could also use
the library in this way:

```js
'use strict';

var parse = require('url-parse')
  , url = parse('https://github.com/foo/bar', true);
```

The returned `url` instance contains the following properties:

- `protocol`: Requested protocol without slashes (e.g. `http:`).
- `username`: Username of basic authentication.
- `password`: Password of basic authentication.
- `auth`: Authentication information portion (e.g. `username:password`).
- `host`: Host name with port number.
- `hostname`: Host name without port number.
- `port`: Optional port number.
- `pathname`: URL path.
- `query`: Parsed object containing query string, unless parsing is set to false.
- `hash`: The "fragment" portion of the URL including the pound-sign (`#`).
- `href`: The full URL.

### URL.set(key, value)

A simple helper function to change parts of the URL and propagating it through
all properties. When you set a new `host` you want the same value to be applied
to `port` if has a different port number, `hostname` so it has a correct name
again and `href` so you have a complete URL.

```js
var parsed = parse('http://google.com/parse-things');

parsed.set('hostname', 'yahoo.com');
console.log(parsed.href); // http://yahoo.com/parse-things
```

It's aware of default ports so you cannot set a port 80 on an URL which has
`http` as protocol.

### URL.toString()

The returned `url` object comes with a custom `toString` method which will
generate a full URL again when called. The method accepts an extra function
which will stringify the query string for you. If you don't supply a function we
will use our default method.

```js
var location = url.toString(); // http://example.com/whatever/?qs=32
```

You would rarely need to use this method as the full URL is also available as
`href` property. If you are using the `URL.set` method to make changes, this
will automatically update.

## Testing

The testing of this module is done in 3 different ways:

1. We have unit tests setup which run under Node.js using the normal `npm test`
   command.
2. Code coverage can be run manually using `npm run coverage`
3. For browser testing we use `testling` to startup a test server. We do assume
   that you `testling` installed globally, if not please run `npm install -g
   testling` and after that `testling -u` in the root of this repository. When
   you visit the outputted URL all unit tests that were written from the Node
   can now be ran inside browsers.

## License

[MIT](LICENSE)
