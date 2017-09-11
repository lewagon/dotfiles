'use strict';

var URL = require('./')
  , url = new URL('');

/**
 * A dictionary with all kind of different options that should generate a valid
 * and parse-able URL.
 *
 * @type {Object}
 * @api private
 */
var combinations = {};

combinations.protocol = [
  'http:',
  'https:',
  'ws:',
  'wss:',
  'blob:'/*,
  ''*/
];
combinations.username = ['foo', 'bar'];
combinations.password = combinations.username;
combinations.hostname = [
  'example.com',
  'www.example.com',
  'travel.travel',
  'sub.sub.sub.domain.nl',
  'xn--n3h.com',
  'localhost',
  '127.0.0.1',
  '255.255.255.255'/*,
  '3ffe:6a88:85a3:08d3:1319:8a2e:0370:7344',
  '2001:2353::1428:57ab',
  '2001:2353:0::0:1428:57ab',
  '2001:2353:0:0:0:0:1428:57ab',
  '2001:2353:0000:0000:0000::1428:57ab',
  '2001:2353:0000:0000:0000:0000:1428:57ab',
  '2001:2353:02de::0e13',
  '2001:2353:2de::e13'*/
];
combinations.port = ['8080', '844', '3340'];
combinations.pathname = [
  '/',
  '/bar',
  '/bar/',
  '/foo/bar',
  '/foo.bar/foo',
  '/fav.ico',
  '/@3rd-Eden',
  '/a/b/c/d/e/f/g/j/1/d/4/'
];
combinations.query = ['foo=bar',
  'foo[]=bar&foo[]=foo',
  'email=foo@bar.travel',
  'q='
];
combinations.hash = [
  'name',
  'moo-with-longer-name',
  '/what/about/slashes?querystring',
  '?querystring',
  '!/google/urls',
  'use:foo@',
  'http://'
];

/**
 * Get a random item from the given array.
 *
 * @param {String} name Name of the array we want to have a random item returned.
 * @returns {Mixed}
 * @api private
 */
function get(name) {
  var data = combinations[name];

  return data[Math.floor(Math.random() * data.length)];
}

/**
 * Return a random boolean.
 *
 * @returns {Boolean}
 * @api private
 */
function yep() {
  return !!Math.round(Math.random() * 1);
}

/**
 * Generate the actual URL.
 *
 * @returns {Object} specification
 * @api public
 */
module.exports = function generate() {
  var spec = {}
    , key;

  spec.protocol = get('protocol');
  spec.hostname = get('hostname');
  spec.pathname = get('pathname');

  if (yep()) spec.port = get('port');
  if (yep()) spec.query = '?'+ get('query');
  if (yep()) spec.hash = '#'+ get('hash');
  if (yep()) {
    spec.username = get('username');
    spec.password = get('password');
  }

  for (key in combinations) {
    url[key] = '';
  }

  for (key in spec) {
    url[key] = spec[key];
  }

  spec.href = url.toString();
  return spec;
};
