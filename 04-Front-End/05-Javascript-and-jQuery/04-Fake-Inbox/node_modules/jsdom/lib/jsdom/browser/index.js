var HtmlToDom     = require('./htmltodom').HtmlToDom,
    jsdom         = require('../../jsdom'),
    defineGetter  = require('../utils').defineGetter,
    defineSetter  = require('../utils').defineSetter,
    Contextify    = require('contextify'),
    Window        = require('./Window');

function windowAugmentation(document) {
  var window = createWindow(document);

  if (document.addEventListener) {
    if (document.readyState == 'complete') {
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent('load', false, false);
      process.nextTick(function () {
        window.dispatchEvent(ev);
      });
    }
    else {
      document.addEventListener('load', function(ev) {
        window.dispatchEvent(ev);
      });
    }
  }

  return window;
};

function createWindow(document) {
  var window = new Window(document);

  Contextify(window);

  // We need to set up self references using Contextify's getGlobal() so that
  // the global object identity is correct (window === this).
  // See Contextify README for more info.
  var windowGlobal = window.getGlobal();

  // Set up the window as if it's a top level window.
  // If it's not, then references will be corrected by frame/iframe code.
  // Note: window.frames is maintained in the HTMLFrameElement init function.
  window.window = window.frames
                = window.self
                = window.parent
                = window.top = windowGlobal;

  return window;
};

/**
 * Augments the given DOM by adding browser-specific properties and methods (BOM).
 * Returns the augmented DOM.
 */
// TODO: this function is HORIBBLE. It modifies the *shared* `dom` variable with document-specific stuff.
// We call it in `jsdom.jsdom`, i.e. per-document. The checks `if (dom._augment && ...)` just mean that it won't modify
// the global twice *for the same options*. Bad stuff.
//
// None of the properties set here should be on `dom`, really.
exports.browserAugmentation = function (dom, options) {
  if (!options) {
    options = {};
  }

  var parser = options.parser;

  if (dom._augmented && dom._parser === parser && dom._parsingMode === options.parsingMode) {
    return dom;
  }

  dom._parser = parser;
  dom._parsingMode = options.parsingMode;
  var htmltodom = new HtmlToDom(parser, options.parsingMode);
  dom.Document.prototype._htmlToDom = htmltodom;
  dom.Document.prototype._domImpl = dom.DOMImplementation;

  defineGetter(dom.Document.prototype, 'parentWindow', function() {
    if (!this._parentWindow) {
      this.parentWindow = windowAugmentation(this);
    }
    return this._parentWindow;
  });

  dom._augmented = true;
  return dom;
};
