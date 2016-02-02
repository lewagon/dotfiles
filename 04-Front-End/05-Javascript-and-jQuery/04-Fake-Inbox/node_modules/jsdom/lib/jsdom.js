var fs = require('fs');
var path = require('path');
var URL = require('url');

var toFileUrl = require('./jsdom/utils').toFileUrl;
var defineGetter = require('./jsdom/utils').defineGetter;
var defineSetter = require('./jsdom/utils').defineSetter;
var features = require('./jsdom/browser/documentfeatures');
var dom = require('./jsdom/living');
var browserAugmentation = require('./jsdom/browser/index').browserAugmentation;
var domToHtml = require('./jsdom/browser/domtohtml').domToHtml;
var VirtualConsole = require('./jsdom/virtual-console');

var request = function() { // lazy loading request
  request = require('request');
  return request.apply(undefined, arguments);
}

exports.getVirtualConsole = function (window) {
  return window._virtualConsole;
};
exports.debugMode = false;

// Proxy feature functions to features module.
['availableDocumentFeatures',
 'defaultDocumentFeatures',
 'applyDocumentFeatures'].forEach(function (propName) {
  defineGetter(exports, propName, function () {
    return features[propName];
  });
  defineSetter(exports, propName, function (val) {
    return features[propName] = val;
  });
});

exports.jsdom = function (html, options) {
  if (options === undefined) {
    options = {};
  }
  if (options.parsingMode === undefined || options.parsingMode === 'auto') {
    options.parsingMode = 'html';
  }

  var browser = browserAugmentation(dom, options);
  var doc = new browser.HTMLDocument(options);

  if (options.created) {
    options.created(null, doc.parentWindow);
  }

  features.applyDocumentFeatures(doc, options.features);

  if (html === undefined) {
    html = '';
  }
  html = String(html);
  doc.write(html);

  if (doc.close && !options.deferClose) {
    doc.close();
  }

  return doc;
};

exports.jQueryify = exports.jsdom.jQueryify = function (window, jqueryUrl, callback) {
  if (!window || !window.document) {
    return;
  }

  var features = window.document.implementation._features;
  window.document.implementation._addFeature('FetchExternalResources', ['script']);
  window.document.implementation._addFeature('ProcessExternalResources', ['script']);
  window.document.implementation._addFeature('MutationEvents', ['2.0']);

  var scriptEl = window.document.createElement('script');
  scriptEl.className = 'jsdom';
  scriptEl.src = jqueryUrl;
  scriptEl.onload = scriptEl.onerror = function () {
    window.document.implementation._features = features;

    if (callback) {
      callback(window, window.jQuery);
    }
  };

  window.document.body.appendChild(scriptEl);
};

exports.env = exports.jsdom.env = function () {
  var config = getConfigFromArguments(arguments);

  if (config.file) {
    fs.readFile(config.file, 'utf-8', function (err, text) {
      if (err) {
        if (config.created) {
          config.created(err);
        }
        if (config.done) {
          config.done([err]);
        }
        return;
      }

      setParsingModeFromExtension(config, config.file);

      config.html = text;
      processHTML(config);
    });
  } else if (config.html !== undefined) {
    processHTML(config);
  } else if (config.url) {
    handleUrl(config);
  } else if (config.somethingToAutodetect !== undefined) {
    var url = URL.parse(config.somethingToAutodetect);
    if (url.protocol && url.hostname) {
      config.url = config.somethingToAutodetect;
      handleUrl(config.somethingToAutodetect);
    } else {
      fs.readFile(config.somethingToAutodetect, 'utf-8', function (err, text) {
        if (err) {
          // the toString() test is because in Node.js, there is no proper code for this.
          // This is fixed in io.js: https://github.com/iojs/io.js/issues/517 so:
          // TODO: remove when we start requiring io.js
          if (err.code === 'ENOENT' || err.code === 'ENAMETOOLONG'
          	|| (err.toString() == 'Error: Path must be a string without null bytes.')
          ) {
            config.html = config.somethingToAutodetect;
            processHTML(config);
          } else {
            if (config.created) {
              config.created(err);
            }
            if (config.done) {
              config.done([err]);
            }
          }
        } else {
          setParsingModeFromExtension(config, config.somethingToAutodetect);

          config.html = text;
          config.url = toFileUrl(config.somethingToAutodetect);
          processHTML(config);
        }
      });
    }
  }

  function handleUrl() {
    var options = {
      uri: config.url,
      encoding: config.encoding || 'utf8',
      headers: config.headers || {},
      proxy: config.proxy || null,
      jar: config.jar !== undefined ? config.jar : true
    };

    request(options, function (err, res, responseText) {
      if (err) {
        if (config.created) {
          config.created(err);
        }
        if (config.done) {
          config.done([err]);
        }
        return;
      }

      // The use of `res.request.uri.href` ensures that `window.location.href`
      // is updated when `request` follows redirects.
      config.html = responseText;
      config.url = res.request.uri.href;

      if (config.parsingMode === "auto" && (
        res.headers["content-type"] === "application/xml" ||
        res.headers["content-type"] === "text/xml" ||
        res.headers["content-type"] === "application/xhtml+xml")) {
        config.parsingMode = "xml";
      }

      processHTML(config);
    });
  }
};

exports.serializeDocument = function (doc) {
  return domToHtml(doc, true);
};

function processHTML(config) {
  var options = {
    features: config.features,
    url: config.url,
    parser: config.parser,
    parsingMode: config.parsingMode,
    created: config.created
  };

  if (config.document) {
    options.referrer = config.document.referrer;
    options.cookie = config.document.cookie;
    options.cookieDomain = config.document.cookieDomain;
  }

  var window = exports.jsdom(config.html, options).parentWindow;
  var features = JSON.parse(JSON.stringify(window.document.implementation._features));

  var docsLoaded = 0;
  var totalDocs = config.scripts.length + config.src.length;
  var readyState = null;
  var errors = [];

  if (!window || !window.document) {
    if (config.created) {
      config.created(new Error('JSDOM: a window object could not be created.'));
    }
    if (config.done) {
      config.done([new Error('JSDOM: a window object could not be created.')]);
    }
    return;
  }

  window.document.implementation._addFeature('FetchExternalResources', ['script']);
  window.document.implementation._addFeature('ProcessExternalResources', ['script']);
  window.document.implementation._addFeature('MutationEvents', ['2.0']);

  function scriptComplete() {
    docsLoaded++;

    if (docsLoaded >= totalDocs) {
      window.document.implementation._features = features;

      errors = errors.concat(window.document.errors || []);
      if (errors.length === 0) {
        errors = null;
      }

      process.nextTick(function() {
        if (config.loaded) {
          config.loaded(errors, window);
        }
        if (config.done) {
          config.done(errors, window);
        }
      });
    }
  }

  function handleScriptError(e) {
    if (!errors) {
      errors = [];
    }
    errors.push(e.error || e.message);

    // nextTick so that an exception within scriptComplete won't cause
    // another script onerror (which would be an infinite loop)
    process.nextTick(scriptComplete);
  }

  if (config.scripts.length > 0 || config.src.length > 0) {
    config.scripts.forEach(function (scriptSrc) {
      var script = window.document.createElement('script');
      script.className = 'jsdom';
      script.onload = scriptComplete;
      script.onerror = handleScriptError;
      script.src = scriptSrc;

      try {
        // protect against invalid dom
        // ex: http://www.google.com/foo#bar
        window.document.documentElement.appendChild(script);
      } catch (e) {
        handleScriptError(e);
      }
    });

    config.src.forEach(function (scriptText) {
      var script = window.document.createElement('script');
      script.onload = scriptComplete;
      script.onerror = handleScriptError;
      script.text = scriptText;

      window.document.documentElement.appendChild(script);
      window.document.documentElement.removeChild(script);
    });
  } else {
    if (window.document.readyState === 'complete') {
      scriptComplete();
    } else {
      window.addEventListener('load', function() {
        scriptComplete();
      });
    }
  }
}

function getConfigFromArguments(args, callback) {
  var config = {};
  if (typeof args[0] === 'object') {
    var configToClone = args[0];
    Object.keys(configToClone).forEach(function (key) {
      config[key] = configToClone[key];
    });
  } else {
    var stringToAutodetect = null;

    Array.prototype.forEach.call(args, function (arg) {
      switch (typeof arg) {
        case 'string':
          config.somethingToAutodetect = arg;
          break;
        case 'function':
          config.done = arg;
          break;
        case 'object':
          if (Array.isArray(arg)) {
            config.scripts = arg;
          } else {
            extend(config, arg);
          }
          break;
      }
    });
  }

  if (!config.done && !config.created && !config.loaded) {
    throw new Error('Must pass a "created", "loaded", "done" option or a callback to jsdom.env.');
  }

  if (config.somethingToAutodetect === undefined &&
      config.html === undefined && !config.file && !config.url) {
    throw new Error('Must pass a "html", "file", or "url" option, or a string, to jsdom.env');
  }

  config.scripts = ensureArray(config.scripts);
  config.src = ensureArray(config.src);
  config.parsingMode = config.parsingMode || "auto";

  config.features = config.features || {
    FetchExternalResources: false,
    ProcessExternalResources: false,
    SkipExternalResources: false
  };

  if (!config.url && config.file) {
    config.url = toFileUrl(config.file);
  }

  return config;
}

function ensureArray(value) {
  var array = value || [];
  if (typeof array === 'string') {
    array = [array];
  }
  return array;
}

function extend(config, overrides) {
  Object.keys(overrides).forEach(function (key) {
    config[key] = overrides[key];
  });
}

function setParsingModeFromExtension(config, filename) {
  if (config.parsingMode === "auto") {
    var ext = path.extname(filename);
    if (ext === ".xhtml" || ext === ".xml") {
      config.parsingMode = "xml";
    }
  }
}
