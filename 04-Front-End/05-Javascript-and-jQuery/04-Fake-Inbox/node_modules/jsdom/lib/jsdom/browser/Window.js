"use strict";

var URL = require("url");
var CSSStyleDeclaration = require("cssstyle").CSSStyleDeclaration;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var dom = require("../level1/core");
var NOT_IMPLEMENTED = require("./utils").NOT_IMPLEMENTED;
var History = require("./history");
var VirtualConsole = require("../virtual-console");
var define = require("../utils").define;
var inherits = require("../utils").inheritFrom;
var EventTarget = require("../events/EventTarget");

var cssSelectorSplitRE = /((?:[^,"']|"[^"]*"|'[^']*')+)/;

module.exports = Window;
dom.Window = Window;

// NOTE: per https://heycam.github.io/webidl/#Global, all properties on the Window object must be own-properties.
// That is why we assign everything inside of the constructor, instead of using a shared prototype.
// You can verify this in e.g. Firefox or Internet Explorer, which do a good job with WebIDL compliance.

function Window(options) {
  EventTarget.call(this);

  var window = this;

  ///// INTERFACES FROM THE DOM
  // TODO: consider a mode of some sort where these are not shared between all DOM instances
  // It'd be very memory-expensive in most cases, though.
  define(window, dom);

  ///// PRIVATE DATA PROPERTIES

  // vm initialization is defered until script processing is activated (in level1/core)
  this._globalProxy = this;

  this.__timers = [];

  // List options explicitly to be clear which are passed through
  this._document = new dom.HTMLDocument({
    parsingMode: options.parsingMode,
    contentType: options.contentType,
    parser: options.parser,
    url: options.url,
    referrer: options.referrer,
    cookie: options.cookie,
    cookieDomain: options.cookieDomain,
    deferClose: options.deferClose,
    resourceLoader: options.resourceLoader,
    defaultView: this._globalProxy,
    global: this
  });


  // Set up the window as if it's a top level window.
  // If it's not, then references will be corrected by frame/iframe code.
  this._parent = this._top = this._globalProxy;

  // This implements window.frames.length, since window.frames returns a
  // self reference to the window object.  This value is incremented in the
  // HTMLFrameElement init function (see: level2/html.js).
  this._length = 0;

  this._virtualConsole = new VirtualConsole();

  ///// GETTERS

  define(this, {
    get length() {
      return window._length;
    },
    get window() {
      return window._globalProxy;
    },
    get frames() {
      return window._globalProxy;
    },
    get self() {
      return window._globalProxy;
    },
    get parent() {
      return window._parent;
    },
    get top() {
      return window._top;
    },
    get document() {
      return window._document;
    },
    get location() {
      return window._document._location;
    }
  });

  ///// METHODS for [ImplicitThis] hack
  // See https://lists.w3.org/Archives/Public/public-script-coord/2015JanMar/0109.html
  this.addEventListener = this.addEventListener.bind(this);
  this.removeEventListener = this.removeEventListener.bind(this);
  this.dispatchEvent = this.dispatchEvent.bind(this);

  ///// METHODS

  this.raise = function () {
    dom.Node.prototype.raise.apply(window.document, arguments);
  };

  this.setTimeout = function (fn, ms) {
    return startTimer(window, setTimeout, clearTimeout, fn, ms);
  };
  this.setInterval = function (fn, ms) {
    return startTimer(window, setInterval, clearInterval, fn, ms);
  };
  this.clearInterval = stopTimer.bind(this, window);
  this.clearTimeout = stopTimer.bind(this, window);
  this.__stopAllTimers = stopAllTimers.bind(this, window);

  this.Image = function (width, height) {
    var element = window._document.createElement("img");
    element.width = width;
    element.height = height;
    return element;
  };

  function wrapConsoleMethod(method) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      window._virtualConsole.emit.apply(window._virtualConsole, [method].concat(args));
    };
  }

  this.XMLHttpRequest = function () {
    var xhr = new XMLHttpRequest();
    var lastUrl = "";
    xhr._open = xhr.open;
    xhr.open = function (method, url, async, user, password) {
      url = URL.resolve(window.document.URL, url);
      lastUrl = url;
      return xhr._open(method, url, async, user, password);
    };
    xhr._send = xhr.send;
    xhr.send = function (data) {
      if (window.document.cookie) {
        var cookieDomain = window.document._cookieDomain;
        var url = URL.parse(lastUrl);
        var host = url.host.split(":")[0];
        if (host.indexOf(cookieDomain, host.length - cookieDomain.length) !== -1) {
          xhr.setDisableHeaderCheck(true);
          xhr.setRequestHeader("cookie", window.document.cookie);
          xhr.setDisableHeaderCheck(false);
        }
      }
      return xhr._send(data);
    };
    return xhr;
  };

  this.close = function () {
    // Recursively close child frame windows, then ourselves.
    var currentWindow = this;
    (function windowCleaner(window) {
      var i;
      // We could call window.frames.length etc, but window.frames just points
      // back to window.
      if (window.length > 0) {
        for (i = 0; i < window.length; i++) {
          windowCleaner(window[i]);
        }
      }
      // We"re already in our own window.close().
      if (window !== currentWindow) {
        window.close();
      }
    })(this);

    if (this._document) {
      if (this._document.body) {
        this._document.body.innerHTML = "";
      }

      if (this._document.close) {
        // We need to empty out the event listener array because
        // document.close() causes "load" event to re-fire.
        this._document._listeners = [];
        this._document.close();
      }
      delete this._document;
    }

    stopAllTimers(currentWindow);
  };

  this.getComputedStyle = function (node) {
    var s = node.style;
    var cs = new CSSStyleDeclaration();
    var forEach = Array.prototype.forEach;

    function setPropertiesFromRule(rule) {
      if (!rule.selectorText) {
        return;
      }

      var selectors = rule.selectorText.split(cssSelectorSplitRE);
      var matched = false;
      selectors.forEach(function (selectorText) {
        if (selectorText !== "" && selectorText !== "," && !matched && matchesDontThrow(node, selectorText)) {
          matched = true;
          forEach.call(rule.style, function (property) {
            cs.setProperty(property, rule.style.getPropertyValue(property), rule.style.getPropertyPriority(property));
          });
        }
      });
    }

    forEach.call(node.ownerDocument.styleSheets, function (sheet) {
      forEach.call(sheet.cssRules, function (rule) {
        if (rule.media) {
          if (Array.prototype.indexOf.call(rule.media, "screen") !== -1) {
            forEach.call(rule.cssRules, setPropertiesFromRule);
          }
        } else {
          setPropertiesFromRule(rule);
        }
      });
    });

    forEach.call(s, function (property) {
      cs.setProperty(property, s.getPropertyValue(property), s.getPropertyPriority(property));
    });

    return cs;
  };

  ///// PUBLIC DATA PROPERTIES (TODO: should be getters)

  this.history = new History(this);

  this.console = {
    assert: wrapConsoleMethod("assert"),
    clear: wrapConsoleMethod("clear"),
    count: wrapConsoleMethod("count"),
    debug: wrapConsoleMethod("debug"),
    error: wrapConsoleMethod("error"),
    group: wrapConsoleMethod("group"),
    groupCollapse: wrapConsoleMethod("groupCollapse"),
    groupEnd: wrapConsoleMethod("groupEnd"),
    info: wrapConsoleMethod("info"),
    log: wrapConsoleMethod("log"),
    table: wrapConsoleMethod("table"),
    time: wrapConsoleMethod("time"),
    timeEnd: wrapConsoleMethod("timeEnd"),
    trace: wrapConsoleMethod("trace"),
    warn: wrapConsoleMethod("warn")
  };

  define(this, {
    navigator: {
      get userAgent() { return "Node.js (" + process.platform + "; U; rv:" + process.version + ")"; },
      get appName() { return "Node.js jsDom"; },
      get platform() { return process.platform; },
      get appVersion() { return process.version; },
      noUI: true,
      get cookieEnabled() { return true; }
    },

    name: "nodejs",
    innerWidth: 1024,
    innerHeight: 768,
    outerWidth: 1024,
    outerHeight: 768,
    pageXOffset: 0,
    pageYOffset: 0,
    screenX: 0,
    screenY: 0,
    screenLeft: 0,
    screenTop: 0,
    scrollX: 0,
    scrollY: 0,
    scrollTop: 0,
    scrollLeft: 0,

    // These need their context passed explicitly because they can be called as e.g. `alert()` instead of as
    // `window.alert()`, which gives a `this` of `undefined`. If we get around to implementing [ImplicitThis] handling,
    // per https://esdiscuss.org/topic/global-method-calls, then this shouldn't be as necessary.
    alert: NOT_IMPLEMENTED("window.alert", window),
    blur: NOT_IMPLEMENTED("window.blur", window),
    confirm: NOT_IMPLEMENTED("window.confirm", window),
    createPopup: NOT_IMPLEMENTED("window.createPopup", window),
    focus: NOT_IMPLEMENTED("window.focus", window),
    moveBy: NOT_IMPLEMENTED("window.moveBy", window),
    moveTo: NOT_IMPLEMENTED("window.moveTo", window),
    open: NOT_IMPLEMENTED("window.open", window),
    print: NOT_IMPLEMENTED("window.print", window),
    prompt: NOT_IMPLEMENTED("window.prompt", window),
    resizeBy: NOT_IMPLEMENTED("window.resizeBy", window),
    resizeTo: NOT_IMPLEMENTED("window.resizeTo", window),
    scroll: NOT_IMPLEMENTED("window.scroll", window),
    scrollBy: NOT_IMPLEMENTED("window.scrollBy", window),
    scrollTo: NOT_IMPLEMENTED("window.scrollTo", window),
    screen: {
      width: 0,
      height: 0
    }
  });

  ///// INITIALIZATION

  process.nextTick(function () {
    if (!window.document) {
      return; // window might've been closed already
    }

    var ev = window.document.createEvent("HTMLEvents");
    ev.initEvent("load", false, false);
    if (window.document.readyState === "complete") {
      window.dispatchEvent(ev);
    } else {
      window.document.addEventListener("load", function (ev) {
        window.dispatchEvent(ev);
      });
    }
  });
}

inherits(EventTarget, Window, EventTarget.prototype);

function matchesDontThrow(el, selector) {
  try {
    return el.matches(selector);
  } catch (e) {
    return false;
  }
}

function startTimer(window, startFn, stopFn, callback, ms) {
  var res = startFn(callback, ms);
  window.__timers.push([res, stopFn]);
  return res;
}

function stopTimer(window, id) {
  if (typeof id === "undefined") {
    return;
  }
  for (var i in window.__timers) {
    if (window.__timers[i][0] === id) {
      window.__timers[i][1].call(window, id);
      window.__timers.splice(i, 1);
      break;
    }
  }
}

function stopAllTimers(window) {
  window.__timers.forEach(function (t) {
    t[1].call(window, t[0]);
  });
  window.__timers = [];
}
