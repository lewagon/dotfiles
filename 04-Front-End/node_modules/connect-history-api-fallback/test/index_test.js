'use strict';

var sinon = require('sinon');
var historyApiFallback = require('../lib');

var tests = module.exports = {};

var middleware;
var req = null;
var requestedUrl;
var next;

tests.setUp = function(done) {
  middleware = historyApiFallback();
  requestedUrl = '/foo';
  req = {
    method: 'GET',
    url: requestedUrl,
    headers: {
      accept: 'text/html, */*'
    }
  };
  next = sinon.stub();

  done();
};


['POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'].forEach(function(method) {
  tests['should ignore ' + method + ' requests'] = function(test) {
    req.method = method;

    middleware(req, null, next);

    test.equal(req.url, requestedUrl);
    test.ok(next.called);
    test.done();
  };
});


tests['should ignore requests that do not accept html'] = function(test) {
  req.headers.accept = 'application/json';

  middleware(req, null, next);

  test.equal(req.url, requestedUrl);
  test.ok(next.called);
  test.done();
};


tests['should ignore file requests'] = function(test) {
  var expected = req.url = 'js/app.js';

  middleware(req, null, next);

  test.equal(req.url, expected);
  test.ok(next.called);
  test.done();
};


tests['should rewrite requests when the . rule is disabled'] = function(test) {
  req.url = 'js/app.js';
  middleware = historyApiFallback({
    disableDotRule: true
  });
  middleware(req, null, next);

  test.equal(req.url, '/index.html');
  test.ok(next.called);
  test.done();
};


tests['should take JSON preference into account'] = function(test) {
  req.headers.accept = 'application/json, text/plain, */*';

  middleware(req, null, next);

  test.equal(req.url, requestedUrl);
  test.ok(next.called);
  test.done();
};


tests['should rewrite valid requests'] = function(test) {
  middleware(req, null, next);

  test.equal(req.url, '/index.html');
  test.ok(next.called);
  test.done();
};

tests['should not fail for missing HTTP accept header'] = function(test) {
  delete req.headers.accept;

  middleware(req, null, next);

  test.equal(req.url, requestedUrl);
  test.ok(next.called);
  test.done();
};

tests['should not fail for missing headers object'] = function(test) {
  delete req.headers;

  middleware(req, null, next);

  test.equal(req.url, requestedUrl);
  test.ok(next.called);
  test.done();
};

tests['should work in verbose mode'] = function(test) {
  var expected = req.url = 'js/app.js';
  middleware = historyApiFallback({
    verbose: true
  });

  middleware(req, null, next);

  test.equal(req.url, expected);
  test.ok(next.called);
  test.done();
};

tests['should work with a custom logger'] = function(test) {
  var expected = req.url = 'js/app.js';
  var logger = sinon.stub();
  middleware = historyApiFallback({
    logger: logger
  });

  middleware(req, null, next);

  test.equal(req.url, expected);
  test.ok(next.called);
  test.ok(logger.calledOnce);
  test.done();
};

tests['should rewrite requested path according to rules'] = function(test) {
  req.url = '/soccer';
  middleware = historyApiFallback({
    rewrites: [
      {from: /\/soccer/, to: '/soccer.html'}
    ]
  });

  middleware(req, null, next);

  test.equal(req.url, '/soccer.html');
  test.ok(next.called);
  test.done();
};

tests['should support functions as rewrite rule'] = function(test) {
  middleware = historyApiFallback({
    rewrites: [
      {
        from: /^\/libs\/(.*)$/,
        to: function(context) {
          return './bower_components' + context.parsedUrl.pathname;
        }
      }
    ]
  });

  req.url = '/libs/jquery/jquery.1.12.0.min.js';
  middleware(req, null, next);
  test.equal(req.url, './bower_components/libs/jquery/jquery.1.12.0.min.js');
  test.ok(next.called);

  next = sinon.stub();
  var expected = req.url = '/js/main.js';
  middleware(req, null, next);
  test.equal(req.url, expected);
  test.ok(next.called);

  test.done();
};

tests['should test rewrite rules'] = function(test) {
  req.url = '/socer';
  middleware = historyApiFallback({
    rewrites: [
      {from: /\/soccer/, to: '/soccer.html'}
    ]
  });

  middleware(req, null, next);

  test.equal(req.url, '/index.html');
  test.ok(next.called);
  test.done();
};

tests['should support custom index file'] = function(test) {
  var index = 'default.html';
  req.url = '/socer';
  middleware = historyApiFallback({
    index: index
  });

  middleware(req, null, next);

  test.equal(req.url, index);
  test.ok(next.called);
  test.done();
};

tests['should accept html requests based on headers option'] = function(test) {
  req.headers.accept = '*/*';
  middleware = historyApiFallback({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
  });

  middleware(req, null, next);

  test.equal(req.url, requestedUrl);
  test.ok(next.called);
  test.done();
};

tests['should support custom rewrite rules'] = function(test) {
  req.headers.accept = '*/*';
  var url = '/app/login/app.js';
  req.url = url;
  middleware = historyApiFallback({
    rewrites: [
      {
        from: /\/app\/login/,
        to: function onMatch(ctx) {
          if (ctx.parsedUrl.path.indexOf('.js')) {
            return ctx.parsedUrl.href;
          }
          return '/app/login/index.html';
        }
      }
    ]
  });

  middleware(req, null, next);

  test.equal(req.url, url);
  test.ok(next.called);
  test.done();
};
