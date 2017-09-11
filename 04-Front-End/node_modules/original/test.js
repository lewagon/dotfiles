describe('original', function () {
  'use strict';

  var parse = require('url-parse')
    , assume = require('assume')
    , origin = require('./')
    , same = origin.same;

  it('is exposed as a function', function () {
    assume(origin).is.a('function');
  });

  it('also accepts objects instead of strings', function () {
    var o = origin(parse('http://google.com:80/pathname'));
    assume(o).equals('http://google.com');
  });

  it('also accepts origins as origin', function () {
    var o = origin('http://google.com:80/pathname');

    assume(origin(o)).equals(o);
  });

  it('lowercases the origin', function () {
    var o = origin('hTtp://WwW.ExAMPLE.cOM:8080');

    assume(o).equals('http://www.example.com:8080');

    o = origin('https://www.EXAMPLE.com:8080');
    assume(o).equals('https://www.example.com:8080');

    o = origin('HTTPS://WWW.example.COM:8080');
    assume(o).equals('https://www.example.com:8080');
  });

  it('returns "null" if the protocol is not specified', function () {
    var o = origin('www.example.com');

    assume(o).equals('null');
  });

  it('returns "null" if the hostname is not specified', function () {
    var o = origin('http://');

    assume(o).equals('null');
  });

  it('removes default ports for http', function () {
    var o = origin('http://google.com:80/pathname');
    assume(o).equals('http://google.com');

    o = origin('http://google.com:80');
    assume(o).equals('http://google.com');

    o = origin('http://google.com');
    assume(o).equals('http://google.com');

    o = origin('https://google.com:443/pathname');
    assume(o).equals('https://google.com');

    o = origin('http://google.com:443/pathname');
    assume(o).equals('http://google.com:443');

    o = origin('https://google.com:80/pathname');
    assume(o).equals('https://google.com:80');

    o = origin('file://google.com/pathname');
    assume(o).equals('file://google.com');
  });

  it('removes default ports for ws', function () {
    var o = origin('ws://google.com:80/pathname');
    assume(o).equals('ws://google.com');

    o = origin('wss://google.com:443/pathname');
    assume(o).equals('wss://google.com');

    o = origin('ws://google.com:443/pathname');
    assume(o).equals('ws://google.com:443');

    o = origin('wss://google.com:80/pathname');
    assume(o).equals('wss://google.com:80');
  });

  describe('.same', function () {
    assume(origin.same).is.a('function');

    it('equals', function () {
      assume(same('http://google.com', 'http://google.com:80')).is.true();
    });
  });
});
