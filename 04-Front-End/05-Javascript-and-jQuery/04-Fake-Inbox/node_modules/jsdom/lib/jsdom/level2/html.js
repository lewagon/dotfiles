var core                  = require("../level1/core"),
    applyDocumentFeatures = require('../browser/documentfeatures').applyDocumentFeatures,
    defineGetter          = require('../utils').defineGetter,
    defineSetter          = require('../utils').defineSetter,
    inheritFrom           = require("../utils").inheritFrom,
    resolveHref           = require("../utils").resolveHref,
    Window                = require("../browser/Window"),
    URL                   = require("url"),
    Path                  = require('path'),
    fs                    = require("fs"),
    request               = require('request');

var isBrowser = Object.prototype.toString.call(process) !== "[object process]";

// Setup the javascript language processor
core.languageProcessors = {
  javascript : require("./languages/javascript").javascript
};

core.resourceLoader = {
  load: function(element, href, callback) {
    var ownerDoc = element._ownerDocument;
    var ownerImplementation = ownerDoc.implementation;

    if (ownerImplementation._hasFeature('FetchExternalResources', element.tagName.toLowerCase())) {
      var full = this.resolve(ownerDoc, href);
      var url = URL.parse(full);
      if (ownerImplementation._hasFeature('SkipExternalResources', full)) {
        return false;
      }

      var cookie = ownerDoc.cookie;
      var cookieDomain = ownerDoc._cookieDomain;
      var baseUrl = this.baseUrl(ownerDoc);
      var enqueued = this.enqueue(element, callback, full);

      if (typeof ownerDoc._resourceLoader == 'function') {
        var fetch = this.fetch.bind(this);
        ownerDoc._resourceLoader.call(null, {
          url: url,
          cookie: cookie,
          cookieDomain: cookieDomain,
          baseUrl: baseUrl,
          defaultFetch: function(callback) {
            fetch(this.url, this.cookie, this.cookieDomain, this.baseUrl, callback);
          }
        }, enqueued);
      } else {
        this.fetch(url, cookie, cookieDomain, baseUrl, enqueued);
      }
    }
  },
  enqueue: function(element, callback, filename) {
    var loader = this,
        doc    = element.nodeType === core.Node.DOCUMENT_NODE ?
                 element                :
                 element._ownerDocument;

    if (!doc._queue) {
      return function() {};
    }

    return doc._queue.push(function(err, data) {
      var ev = doc.createEvent('HTMLEvents');

      if (!err) {
        try {
          callback.call(element, data, filename || doc.URL);
          ev.initEvent('load', false, false);
        }
        catch(e) {
          err = e;
        }
      }

      if (err) {
        ev.initEvent('error', false, false);
        ev.error = err;
      }

      element.dispatchEvent(ev);
    });
  },

  baseUrl: function(document) {
    var baseElements = document.getElementsByTagName('base');
    var baseUrl = document.URL;

    if (baseElements.length > 0) {
      var baseHref = baseElements.item(0).href;
      if (baseHref) {
        baseUrl = resolveHref(baseUrl, baseHref);
      }
    }

    return baseUrl;
  },
  resolve: function(document, href) {
    // if getAttribute returns null, there is no href
    // lets resolve to an empty string (nulls are not expected farther up)
    if (href === null) {
      return '';
    }

    var baseUrl = this.baseUrl(document);

    return resolveHref(baseUrl, href);
  },
  fetch: function(url, cookie, cookieDomain, referrer, callback) {
    if (url.hostname) {
      this.download(url, cookie, cookieDomain, referrer, callback);
    } else {
      this.readFile(url.pathname, callback);
    }
  },
  download: function(url, cookie, cookieDomain, referrer, callback) {
    var headers = {};
    // set header; accomodate browserify
    if (referrer && !isBrowser) {
        headers['Referer'] =  referrer;
    }
    if (cookie) {
      var host = url.host.split(':')[0];
      if (host.indexOf(cookieDomain, host.length - cookieDomain.length) !== -1) {
        headers['cookie'] = cookie;
      }
    }

    var options = {url: url, headers: headers, gzip: true};
    request(options, function (error, response, body) {
      callback(error, body);
    });
  },
  readFile: function(url, callback) {
    fs.readFile(url.replace(/^file:\/\//, "").replace(/^\/([a-z]):\//i, '$1:/').replace(/%20/g, ' '), 'utf8', callback);
  }
};

function define(elementClass, def) {
  var tagName = def.tagName,
    tagNames = def.tagNames || (tagName? [tagName] : []),
    parentClass = def.parentClass || core.HTMLElement,
    attrs = def.attributes || [],
    proto = def.proto || {};

  var elem = core[elementClass] = function(document, name) {
    parentClass.call(this, document, name || tagName.toUpperCase());
    if (elem._init) {
      elem._init.call(this);
    }
  };
  elem._init = def.init;

  inheritFrom(parentClass, elem, proto);

  attrs.forEach(function(n) {
      var prop = n.prop || n,
        attr = n.attr || prop.toLowerCase();

      if (!n.prop || n.read !== false) {
        defineGetter(elem.prototype, prop, function() {
          var s = this.getAttribute(attr);
          if (n.type && n.type === 'boolean') {
            return s !== null;
          }
          if (n.type && n.type === 'long') {
            return +s;
          }
          if (typeof n === 'object' && n.normalize) { // see GH-491
            return n.normalize(s);
          }
          if (s === null) {
            s = '';
          }
          return s;
        });
      }

      if (!n.prop || n.write !== false) {
        defineSetter(elem.prototype, prop, function(val) {
          if (!val) {
            this.removeAttribute(attr);
          }
          else {
            var s = val.toString();
            if (typeof n === 'object' && n.normalize) {
              s = n.normalize(s);
            }
            this.setAttribute(attr, s);
          }
        });
      }
  });

  tagNames.forEach(function(tag) {
    core.Document.prototype._elementBuilders[tag.toLowerCase()] = function(doc, s) {
      var el = new elem(doc, s);

      if (def.elementBuilder) {
        return def.elementBuilder(el, doc, s);
      }

      return el;
    };
  });
}



core.HTMLCollection = function HTMLCollection(element, query) {
  this._keys = [];
  core.NodeList.call(this, element, query);
};
inheritFrom(core.NodeList, core.HTMLCollection, {
  namedItem: function(name) {
    // Try property shortcut; should work in most cases
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      return this[name];
    }

    var results = this._toArray(),
        l       = results.length,
        node,
        matchingName = null;

    for (var i=0; i<l; i++) {
      node = results[i];
      if (node.getAttribute('id') === name) {
        return node;
      } else if (node.getAttribute('name') === name) {
        matchingName = node;
      }
    }
    return matchingName;
  },
  toString: function() {
    return '[ jsdom HTMLCollection ]: contains ' + this.length + ' items';
  },
  _resetTo: function(array) {
    var i, _this = this;

    for (i = 0; i < this._keys.length; ++i) {
      delete this[this._keys[i]];
    }
    this._keys = [];

    core.NodeList.prototype._resetTo.apply(this, arguments);

    function testAttr(node, attr) {
      var val = node.getAttribute(attr);
      if (val && !Object.prototype.hasOwnProperty.call(_this, val)) {
        _this[val] = node;
        _this._keys.push(val);
      }
    }
    for (i = 0; i < array.length; ++i) {
      testAttr(array[i], 'id');
    }
    for (i = 0; i < array.length; ++i) {
      testAttr(array[i], 'name');
    }
  }
});
Object.defineProperty(core.HTMLCollection.prototype, 'constructor', {
  value: core.NodeList,
  writable: true,
  configurable: true
});

core.HTMLOptionsCollection = core.HTMLCollection;

function closest(e, tagName) {
  tagName = tagName.toUpperCase();
  while (e) {
    if (e.nodeName.toUpperCase() === tagName ||
        (e.tagName && e.tagName.toUpperCase() === tagName))
    {
      return e;
    }
    e = e._parentNode;
  }
  return null;
}

function descendants(e, tagName, recursive) {
  var owner = recursive ? e._ownerDocument || e : e;
  return new core.HTMLCollection(owner, core.mapper(e, function(n) {
    return n.tagName === tagName;
  }, recursive));
}

function firstChild(e, tagName) {
  if (!e) {
    return null;
  }
  var c = descendants(e, tagName, false);
  return c.length > 0 ? c[0] : null;
}

function ResourceQueue(paused) {
  this.paused = !!paused;
}
ResourceQueue.prototype = {
  push: function(callback) {
    var q = this;
    var item = {
      prev: q.tail,
      check: function() {
        if (!q.paused && !this.prev && this.fired){
          callback(this.err, this.data);
          if (this.next) {
            this.next.prev = null;
            this.next.check();
          }else{//q.tail===this
      q.tail = null;
    }
        }
      }
    };
    if (q.tail) {
      q.tail.next = item;
    }
    q.tail = item;
    return function(err, data) {
      item.fired = 1;
      item.err = err;
      item.data = data;
      item.check();
    };
  },
  resume: function() {
    if(!this.paused){
      return;
    }
    this.paused = false;
    var head = this.tail;
    while(head && head.prev){
      head = head.prev;
    }
    if(head){
      head.check();
    }
  }
};

core.HTMLDocument = function HTMLDocument(options) {
  core.Document.call(this, options);
  this._referrer = options.referrer;
  this._cookie = options.cookie;
  this._cookieDomain = options.cookieDomain || '127.0.0.1';
  this._queue = new ResourceQueue(options.deferClose);
  this._resourceLoader = options.resourceLoader;
  this.readyState = 'loading';

  // Add level2 features
  this.implementation._addFeature('core'  , '2.0');
  this.implementation._addFeature('html'  , '2.0');
  this.implementation._addFeature('xhtml' , '2.0');
  this.implementation._addFeature('xml'   , '2.0');
};

var nonInheritedTags = new Set([
  'article', 'section', 'nav', 'aside', 'hgroup', 'header', 'footer', 'address', 'dt',
  'dd', 'figure', 'figcaption', 'main', 'em', 'strong', 'small', 's', 'cite', 'dfn', 'abbr',
  'ruby', 'rt', 'rp', 'code', 'var', 'samp', 'kbd', 'i', 'b', 'u', 'mark', 'bdi', 'bdo', 'wbr'
]);

inheritFrom(core.Document, core.HTMLDocument, {
  _defaultElementBuilder: function (document, tagName) {
    if (nonInheritedTags.has(tagName.toLowerCase())) {
      return new core.HTMLElement(document, tagName);
    } else {
      return new core.HTMLUnknownElement(document, tagName);
    }
  },

  _referrer : "",
  get referrer() {
    return this._referrer || '';
  },
  get domain() {
    return "";
  },
  get images() {
    return this.getElementsByTagName('IMG');
  },
  get applets() {
    return new core.HTMLCollection(this, core.mapper(this, function(el) {
      if (el && el.tagName) {
        var upper = el.tagName.toUpperCase();
        if (upper === "APPLET") {
          return true;
        } else if (upper === "OBJECT" &&
          el.getElementsByTagName('APPLET').length > 0)
        {
          return true;
        }
      }
    }));
  },
  get links() {
    return new core.HTMLCollection(this, core.mapper(this, function(el) {
      if (el && el.tagName) {
        var upper = el.tagName.toUpperCase();
        if (upper === "AREA" || (upper === "A" && el.href)) {
          return true;
        }
      }
    }));
  },
  get forms() {
    return this.getElementsByTagName('FORM');
  },
  get anchors() {
    return this.getElementsByTagName('A');
  },
  open  : function() {
    this._childNodes = [];
    this._documentElement = null;
    this._modified();
  },
  close : function() {
    this._queue.resume();
    // Set the readyState to 'complete' once all resources are loaded.
    // As a side-effect the document's load-event will be dispatched.
    core.resourceLoader.enqueue(this, function() {
      this.readyState = 'complete';
      var ev = this.createEvent('HTMLEvents');
      ev.initEvent('DOMContentLoaded', false, false);
      this.dispatchEvent(ev);
    })(null, true);
  },

  // document.write is defined in browser/index.js.

  writeln : function(text) {
    this.write(text + '\n');
  },

  getElementsByName : function(elementName) {
    return new core.HTMLCollection(this, core.mapper(this, function(el) {
      return (el.getAttribute && el.getAttribute("name") === elementName);
    }));
  },

  get title() {
    var head = this.head,
      title = head ? firstChild(head, 'TITLE') : null;
    return title ? title.textContent : '';
  },

  set title(val) {
    var title = firstChild(this.head, 'TITLE');
    if (!title) {
      title = this.createElement('TITLE');
      var head = this.head;
      if (!head) {
        head = this.createElement('HEAD');
        this.documentElement.insertBefore(head, this.documentElement.firstChild);
      }
      head.appendChild(title);
    }
    title.textContent = val;
  },

  get head() {
    return firstChild(this.documentElement, 'HEAD');
  },

  set head(unused) { /* noop */ },

  get body() {
    var body = firstChild(this.documentElement, 'BODY');
    if (!body) {
      body = firstChild(this.documentElement, 'FRAMESET');
    }
    return body;
  },

  _cookie : "",
  get cookie() {
    var cookies = Array.isArray(this._cookie) ?
      this._cookie :
      (this._cookie && this._cookie.length > 0 ? [this._cookie] : []);

    return cookies.map(function (x) {
      return x.split(';')[0];
    }).join('; ');
  },
  set cookie(val) {
    if (val == null) return val;
    var key = val.split('=')[0];
    var cookies = Array.isArray(this._cookie) ?
      this._cookie :
      (this._cookie && this._cookie.length > 0 ? [this._cookie] : []);
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].lastIndexOf(key + '=', 0) === 0) {
        cookies[i] = val;
        key = null;
        break;
      }
    }
    if (key) {
      cookies.push(val);
    }
    if (cookies.length === 1) {
      this._cookie = cookies[0];
    } else {
      this._cookie = cookies;
    }
    return val;
  }
});

define('HTMLElement', {
  parentClass: core.Element,
  proto : {
    // Add default event behavior (click link to navigate, click button to submit
    // form, etc). We start by wrapping dispatchEvent so we can forward events to
    // the element's _eventDefault function (only events that did not incur
    // preventDefault).
    dispatchEvent : function (event) {
      var outcome = core.Node.prototype.dispatchEvent.call(this, event)

      if (!event._canceled &&
          event.target._eventDefaults[event.type] &&
          typeof event.target._eventDefaults[event.type] === 'function')
      {
        event.target._eventDefaults[event.type](event)
      }
      return outcome;
    },
    getBoundingClientRect: function () {
      return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0
      };
    },
    focus : function() {
      this._ownerDocument.activeElement = this;
    },
    blur : function() {
      this._ownerDocument.activeElement = this._ownerDocument.body;
    },
    click: function() {
      // https://html.spec.whatwg.org/multipage/interaction.html#dom-click
      // https://html.spec.whatwg.org/multipage/interaction.html#run-synthetic-click-activation-steps
      // Not completely spec compliant due to e.g. incomplete implementations of disabled for form controls, or no
      // implementation at all of isTrusted.

      if (this.disabled) {
        return false;
      }

      var event = new core.MouseEvent("click", { bubbles: true, cancelable: true });
      this.dispatchEvent(event);
    },
    _eventDefaults : {}
  },
  attributes: [
    'id',
    'title',
    'lang',
    'dir',
    {prop: 'className', attr: 'class', normalize: function(s) { return s || ''; }}
  ]
});

define('HTMLUnknownElement', {
  // no additional properties & attributes
});

// http://www.whatwg.org/specs/web-apps/current-work/#category-listed
var listedElements = /button|fieldset|input|keygen|object|select|textarea/i;

define('HTMLFormElement', {
  tagName: 'FORM',
  proto: {
    _descendantAdded: function(parent, child) {
      var form = this;
      core.visitTree(child, function(el) {
        if (typeof el._changedFormOwner === 'function') {
          el._changedFormOwner(form);
        }
      });

      core.HTMLElement.prototype._descendantAdded.apply(this, arguments);
    },
    _descendantRemoved: function(parent, child) {
      core.visitTree(child, function(el) {
        if (typeof el._changedFormOwner === 'function') {
          el._changedFormOwner(null);
        }
      });

      core.HTMLElement.prototype._descendantRemoved.apply(this, arguments);
    },
    get elements() {
      return new core.HTMLCollection(this._ownerDocument, core.mapper(this, function(e) {
        return listedElements.test(e.nodeName) ; // TODO exclude <input type="image">
      }));
    },
    get length() {
      return this.elements.length;
    },
    _dispatchSubmitEvent: function() {
      var ev = this._ownerDocument.createEvent('HTMLEvents');
      ev.initEvent('submit', true, true);
      if (!this.dispatchEvent(ev)) {
        this.submit();
      };
    },
    submit: function() {
    },
    reset: function() {
      this.elements._toArray().forEach(function(el) {
        if (typeof el._formReset === 'function') {
          el._formReset();
        }
      });
    }
  },
  attributes: [
    'name',
    {prop: 'acceptCharset', attr: 'accept-charset'},
    'action',
    'enctype',
    'method',
    'target'
  ]
});

define('HTMLLinkElement', {
  tagName: 'LINK',
  proto: {
    get href() {
      return core.resourceLoader.resolve(this._ownerDocument, this.getAttribute('href'));
    }
  },
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'charset',
    'href',
    'hreflang',
    'media',
    'rel',
    'rev',
    'target',
    'type'
  ]
});

define('HTMLMetaElement', {
  tagName: 'META',
  attributes: [
    'content',
    {prop: 'httpEquiv', attr: 'http-equiv'},
    'name',
    'scheme'
  ]
});

define('HTMLHtmlElement', {
  tagName: 'HTML',
  attributes: [
    'version'
  ]
});

define('HTMLHeadElement', {
  tagName: 'HEAD',
  attributes: [
    'profile'
  ]
});

define('HTMLTitleElement', {
  tagName: 'TITLE',
  proto: {
    get text() {
      return this.innerHTML;
    },
    set text(s) {
      this.innerHTML = s;
    }
  }
});

define('HTMLBaseElement', {
  tagName: 'BASE',
  attributes: [
    'href',
    'target'
  ]
});


//**Deprecated**
define('HTMLIsIndexElement', {
  tagName : 'ISINDEX',
  parentClass : core.Element,
  proto : {
    get form() {
      return closest(this, 'FORM');
    }
  },
  attributes : [
    'prompt'
  ]
});


define('HTMLStyleElement', {
  tagName: 'STYLE',
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'media',
    'type',
  ]
});

define('HTMLBodyElement', {
  proto: (function() {
    var proto = {};
    // The body element's "traditional" event handlers are proxied to the
    // window object.
    // See: http://www.whatwg.org/specs/web-apps/current-work/#the-body-element
    ['onafterprint', 'onbeforeprint', 'onbeforeunload', 'onblur', 'onerror',
     'onfocus', 'onhashchange', 'onload', 'onmessage', 'onoffline', 'ononline',
     'onpagehide', 'onpageshow', 'onpopstate', 'onresize', 'onscroll',
     'onstorage', 'onunload'].forEach(function (name) {
      defineSetter(proto, name, function (handler) {
        this._ownerDocument.defaultView[name] = handler;
      });
      defineGetter(proto, name, function () {
        return this._ownerDocument.defaultView[name];
      });
    });
    return proto;
  })(),
  tagName: 'BODY',
  attributes: [
    'aLink',
    'background',
    'bgColor',
    'link',
    'text',
    'vLink'
  ]
});

define('HTMLSelectElement', {
  tagName: 'SELECT',
  proto: {
    _formReset: function() {
      this.options._toArray().forEach(function(option, i) {
        option._selectedness = option.defaultSelected;
        option._dirtyness = false;
      });
      this._askedForAReset();
    },
    _askedForAReset: function() {
      if (this.hasAttribute('multiple')) {
        return;
      }

      var options = this.options._toArray();
      var selected = options.filter(function(option){
        return option._selectedness;
      });

      // size = 1 is default if not multiple
      if ((!this.size || this.size === 1) && !selected.length) {
        // select the first option that is not disabled
        for (var i = 0; i < options.length; ++i) {
          var option = options[i];
          var disabled = option.disabled;
          if (option._parentNode &&
              option._parentNode.nodeName.toUpperCase() === 'OPTGROUP' &&
              option._parentNode.disabled) {
            disabled = true;
          }

          if (!disabled) {
            // (do not set dirty)
            option._selectedness = true;
            break;
          }
        }
      } else if (selected.length >= 2) {
        // select the last selected option
        selected.forEach(function(option, index) {
          option._selectedness = index === selected.length - 1;
        });
      }
    },
    _descendantAdded: function(parent, child) {
      if (child.nodeType === core.Node.ELEMENT_NODE) {
        this._askedForAReset();
      }

      core.HTMLElement.prototype._descendantAdded.apply(this, arguments);
    },
    _descendantRemoved: function(parent, child) {
      if (child.nodeType === core.Node.ELEMENT_NODE) {
        this._askedForAReset();
      }

      core.HTMLElement.prototype._descendantRemoved.apply(this, arguments);
    },
    _attrModified: function(name, value) {
      if (name === 'multiple' || name === 'size') {
        this._askedForAReset();
      }
      core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    get options() {
      return new core.HTMLOptionsCollection(this, core.mapper(this, function(n) {
        return n.nodeName === 'OPTION';
      }));
    },

    get length() {
      return this.options.length;
    },

    get selectedIndex() {
      return this.options._toArray().reduceRight(function(prev, option, i) {
        return option.selected ? i : prev;
      }, -1);
    },

    set selectedIndex(index) {
      this.options._toArray().forEach(function(option, i) {
        option.selected = i === index;
      });
    },

    get value() {
      var i = this.selectedIndex;
      if (this.options.length && (i === -1)) {
        i = 0;
      }
      if (i === -1) {
        return '';
      }
      return this.options[i].value;
    },

    set value(val) {
      var self = this;
      this.options._toArray().forEach(function(option) {
        if (option.value === val) {
          option.selected = true;
        } else {
          if (!self.hasAttribute('multiple')) {
            // Remove the selected bit from all other options in this group
            // if the multiple attr is not present on the select
            option.selected = false;
          }
        }
      });
    },

    get form() {
      return closest(this, 'FORM');
    },

    get type() {
      return this.multiple ? 'select-multiple' : 'select-one';
    },

    add: function(opt, before) {
      if (before) {
        this.insertBefore(opt, before);
      }
      else {
        this.appendChild(opt);
      }
    },

    remove: function(index) {
      var opts = this.options._toArray();
      if (index >= 0 && index < opts.length) {
        var el = opts[index];
        el._parentNode.removeChild(el);
      }
    }

  },
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    {prop: 'multiple', type: 'boolean'},
    'name',
    {prop: 'size', type: 'long'},
    {prop: 'tabIndex', type: 'long'},
  ]
});

define('HTMLOptGroupElement', {
  tagName: 'OPTGROUP',
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'label'
  ]
});

define('HTMLOptionElement', {
  tagName: 'OPTION',
  proto: {
    // whenever selectedness is set to true, make sure all
    // other options set selectedness to false
    _selectedness: false,
    _dirtyness: false,
    _removeOtherSelectedness: function() {
      //Remove the selectedness flag from all other options in this select
      var select = this._selectNode;

      if (select && !select.multiple) {
        var o = select.options;
        for (var i = 0; i < o.length; i++) {
          if (o[i] !== this) {
            o[i]._selectedness = false;
          }
        }
      }
    },
    _askForAReset: function() {
      var select = this._selectNode;
      if (select) {
        select._askedForAReset();
      }
    },
    _attrModified: function(name, value) {
      if (!this._dirtyness && name === 'selected') {
        this._selectedness = this.defaultSelected;
        if (this._selectedness) {
          this._removeOtherSelectedness();
        }
        this._askForAReset();
      }
      core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    get _selectNode() {
      var select = this._parentNode;
      if (!select) return null;
      if (select.nodeName.toUpperCase() !== 'SELECT') {
        select = select._parentNode;
        if (!select) return null;
        if (select.nodeName.toUpperCase() !== 'SELECT') return null;
      }
      return select;
    },
    get form() {
      return closest(this, 'FORM');
    },
    get defaultSelected() {
      return this.getAttribute('selected') !== null;
    },
    set defaultSelected(s) {
      if (s) this.setAttribute('selected', 'selected');
      else this.removeAttribute('selected');
    },
    get text() {
      return this.innerHTML;
    },
    get value() {
      return (this.hasAttribute('value')) ? this.getAttribute('value') : this.innerHTML;
    },
    set value(val) {
      this.setAttribute('value', val);
    },
    get index() {
      return closest(this, 'SELECT').options._toArray().indexOf(this);
    },
    get selected() {
      return this._selectedness;
    },
    set selected(s) {
      this._dirtyness = true;
      this._selectedness = !!s;
      if (this._selectedness) {
        this._removeOtherSelectedness();
      }
      this._askForAReset();
    }
  },
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'label'
  ]
});

define('HTMLInputElement', {
  tagName: 'INPUT',
  init: function() {
    if (!this.type) {
      this.type = 'text';
    }
  },
  proto: {
    _value: null,
    _dirtyValue: false,
    _checkedness: false,
    _dirtyCheckedness: false,
    _attrModified: function(name, value) {
      if (!this._dirtyValue && name === 'value') {
        this._value = this.defaultValue;
      }
      if (!this._dirtyCheckedness && name === 'checked') {
        this._checkedness = this.defaultChecked;
        if (this._checkedness) {
          this._removeOtherRadioCheckedness();
        }
      }

      if (name === 'name' || name === 'type') {
        if (this._checkedness) {
          this._removeOtherRadioCheckedness();
        }
      }

      core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    _formReset: function() {
      this._value = this.defaultValue;
      this._dirtyValue = false;
      this._checkedness = this.defaultChecked;
      this._dirtyCheckedness = false;
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    },
    _changedFormOwner: function(newForm) {
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    },
    _removeOtherRadioCheckedness: function() {
      var root = this._radioButtonGroupRoot;
      if (!root) {
        return;
      }

      var name = this.name.toLowerCase();
      var radios = new core.HTMLCollection(this, core.mapper(root, function(el) {
        return el.type === 'radio' &&
               el.name &&
               el.name.toLowerCase() === name &&
               el._radioButtonGroupRoot === root;
      }));

      radios._toArray().forEach(function(radio) {
        if (radio !== this) {
          radio._checkedness = false;
        }
      }, this);
    },
    get _radioButtonGroupRoot() {
      if (this.type !== 'radio' || !this.name) {
        return null;
      }

      var e = this._parentNode;
      while (e) {
        // root node of this home sub tree
        // or the form element we belong to
        if (!e._parentNode || e.nodeName.toUpperCase() === 'FORM') {
          return e;
        }
        e = e._parentNode;
      }
      return null;
    },
    get form() {
      return closest(this, 'FORM');
    },
    get defaultValue() {
      var val = this.getAttribute('value');
      return val !== null ? val : "";
    },
    set defaultValue(val) {
      this.setAttribute('value', String(val));
    },
    get defaultChecked() {
      return this.getAttribute('checked') !== null;
    },
    set defaultChecked(s) {
      if (s) this.setAttribute('checked', 'checked');
      else this.removeAttribute('checked');
    },
    get checked() {
      return this._checkedness;
    },
    set checked(checked) {
      this._checkedness = !!checked;
      this._dirtyCheckedness = true;
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    },
    get value() {
      if (this._value === null) {
        return '';
      }
      return this._value;
    },
    set value(val) {
      this._dirtyValue = true;
      if (val === null) {
        this._value = null;
      } else {
        this._value = String(val);
      }
    },
    get type() {
        var type = this.getAttribute('type');
        return type ? type : 'text';
    },
    set type(type) {
        this.setAttribute('type', type);
    },
    select: function() {
    },

    _eventDefaults: {
      click: function (event) {
        var target = event.target;

        if (target.type === 'checkbox') {
          target.checked = !target.checked;
        } else if (target.type === 'radio') {
          target.checked = true;
        } else if (target.type === 'submit') {
          var form = this.form;
          if (form) {
            form._dispatchSubmitEvent();
          }
        }
      }
    }
  },
  attributes: [
    'accept',
    'accessKey',
    'align',
    'alt',
    {prop: 'disabled', type: 'boolean'},
    {prop: 'maxLength', type: 'long'},
    'name',
    {prop: 'readOnly', type: 'boolean'},
    {prop: 'size', type: 'long'},
    'src',
    {prop: 'tabIndex', type: 'long'},
    {prop: 'type', normalize: function(val) {
        return val ? val.toLowerCase() : 'text';
    }},
    'useMap'
  ]
});

define('HTMLTextAreaElement', {
  tagName: 'TEXTAREA',
  proto: {
    _apiValue: null,
    _dirtyValue: false,
    // "raw value" and "value" are not used here because jsdom has no GUI
    _formReset: function() {
      this._apiValue = null;
      this._dirtyValue = false;
    },
    get form() {
      return closest(this, 'FORM');
    },
    get defaultValue() {
      return this.textContent;
    },
    set defaultValue(val) {
      this.textContent = val;
    },
    get value() {
      // The WHATWG specifies that when "textContent" changes, the "raw value"
      // (just the API value in jsdom) must also be updated.
      // This slightly different solution has identical results, but is a lot less complex.
      if (this._dirtyValue) {
        if (this._apiValue === null) {
          return '';
        }
        return this._apiValue;
      }

      var val = this.defaultValue;
      val = val.replace(/\r\n|\r/g, '\n'); // API value normalizes line breaks per WHATWG
      return val;
    },
    set value(val) {
      if (val) {
        val = val.replace(/\r\n|\r/g, '\n'); // API value normalizes line breaks per WHATWG
      }

      this._dirtyValue = true;
      this._apiValue = val;
    },
    get textLength() {
      return this.value.length; // code unit length (16 bit)
    },
    get type() {
      return 'textarea';
    },
    select: function() {
    }
  },
  attributes: [
    'accessKey',
    {prop: 'cols', type: 'long'},
    {prop: 'disabled', type: 'boolean'},
    {prop: 'maxLength', type: 'long'},
    'name',
    {prop: 'readOnly', type: 'boolean'},
    {prop: 'rows', type: 'long'},
    {prop: 'tabIndex', type: 'long'}
  ]
});

define('HTMLButtonElement', {
  tagName: 'BUTTON',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  },
  attributes: [
    'accessKey',
    {prop: 'disabled', type: 'boolean'},
    'name',
    {prop: 'tabIndex', type: 'long'},
    'type',
    'value'
  ]
});

define('HTMLLabelElement', {
  tagName: 'LABEL',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  },
  attributes: [
    'accessKey',
    {prop: 'htmlFor', attr: 'for'}
  ]
});

define('HTMLFieldSetElement', {
  tagName: 'FIELDSET',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  }
});

define('HTMLLegendElement', {
  tagName: 'LEGEND',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  },
  attributes: [
    'accessKey',
    'align'
  ]
});

define('HTMLUListElement', {
  tagName: 'UL',
  attributes: [
    {prop: 'compact', type: 'boolean'},
    'type'
  ]
});

define('HTMLOListElement', {
  tagName: 'OL',
  attributes: [
    {prop: 'compact', type: 'boolean'},
    {prop: 'start', type: 'long'},
    'type'
  ]
});

define('HTMLDListElement', {
  tagName: 'DL',
  attributes: [
    {prop: 'compact', type: 'boolean'}
  ]
});

define('HTMLDirectoryElement', {
  tagName: 'DIR',
  attributes: [
    {prop: 'compact', type: 'boolean'}
  ]
});

define('HTMLMenuElement', {
  tagName: 'MENU',
  attributes: [
    {prop: 'compact', type: 'boolean'}
  ]
});

define('HTMLLIElement', {
  tagName: 'LI',
  attributes: [
    'type',
    {prop: 'value', type: 'long'}
  ]
});

define('HTMLCanvasElement', {
  tagName: 'CANVAS',
  attributes: [
    'align'
  ],
  elementBuilder: function (element) {
    // require node-canvas and catch the error if it blows up
    try {
      var canvas = new (require('canvas'))(0,0);
      for (var attr in element) {
        if (!canvas[attr]) {
          canvas[attr] = element[attr];
        }
      }
      return canvas;
    } catch (e) {
      return element;
    }
  }
});

define('HTMLDivElement', {
  tagName: 'DIV',
  attributes: [
    'align'
  ],
  proto: {
    toString: function() { return '[object HTMLDivElement]'; }
  }
});

define('HTMLParagraphElement', {
  tagName: 'P',
  attributes: [
    'align'
  ]
});

define('HTMLHeadingElement', {
  tagNames: ['H1','H2','H3','H4','H5','H6'],
  attributes: [
    'align'
  ]
});

define('HTMLQuoteElement', {
  tagNames: ['Q','BLOCKQUOTE'],
  attributes: [
    'cite'
  ]
});

define('HTMLPreElement', {
  tagName: 'PRE',
  attributes: [
    {prop: 'width', type: 'long'}
  ]
});

define('HTMLBRElement', {
  tagName: 'BR',
  attributes: [
    'clear'
  ]
});

define('HTMLBaseFontElement', {
  tagName: 'BASEFONT',
  attributes: [
    'color',
    'face',
    {prop: 'size', type: 'long'}
  ]
});

define('HTMLFontElement', {
  tagName: 'FONT',
  attributes: [
    'color',
    'face',
    'size'
  ]
});

define('HTMLHRElement', {
  tagName: 'HR',
  attributes: [
    'align',
    {prop: 'noShade', type: 'boolean'},
    'size',
    'width'
  ]
});

define('HTMLModElement', {
  tagNames: ['INS', 'DEL'],
  attributes: [
    'cite',
    'dateTime'
  ]
});

define('HTMLAnchorElement', {
  tagName: 'A',

  proto: {
    get href() {
      return core.resourceLoader.resolve(this._ownerDocument, this.getAttribute('href'));
    },
    get hostname() {
      return URL.parse(this.href).hostname || '';
    },
    get host() {
      return URL.parse(this.href).host || '';
    },
    get origin() {
      var proto = URL.parse(this.href).protocol;

      if (proto !== undefined && proto !== null) {
        proto += '//';
      }

      return proto + URL.parse(this.href).host || '';
    },
    get port() {
      return URL.parse(this.href).port || '';
    },
    get protocol() {
      var protocol = URL.parse(this.href).protocol;
      return (protocol == null) ? ':' : protocol;
    },
    get password() {
      var auth = URL.parse(this.href).auth;
      return auth.substr(auth.indexOf(':') + 1);
    },
    get pathname() {
      return URL.parse(this.href).pathname || '';
    },
    get username() {
      var auth = URL.parse(this.href).auth;
      return auth.substr(0, auth.indexOf(':'));
    },
    get search() {
      return URL.parse(this.href).search || '';
    },
    get hash() {
      return URL.parse(this.href).hash || '';
    }
  },
  attributes: [
    'accessKey',
    'charset',
    'coords',
    {prop: 'href', type: 'string', read: false},
    'hreflang',
    'name',
    'rel',
    'rev',
    'shape',
    {prop: 'tabIndex', type: 'long'},
    'target',
    'type'
  ]
});

define('HTMLImageElement', {
  tagName: 'IMG',
  proto: {
    _attrModified: function(name, value, oldVal) {
      if (name == 'src' && value !== oldVal) {
        core.resourceLoader.enqueue(this, function() {})();
      }
    },
    get src() {
      return core.resourceLoader.resolve(this._ownerDocument, this.getAttribute('src'));
    }
  },
  attributes: [
    'name',
    'align',
    'alt',
    'border',
    {prop: 'height', type: 'long'},
    {prop: 'hspace', type: 'long'},
    {prop: 'isMap', type: 'boolean'},
    'longDesc',
    {prop: 'src', type: 'string', read: false},
    'useMap',
    {prop: 'vspace', type: 'long'},
    {prop: 'width', type: 'long'}
  ]
});

define('HTMLObjectElement', {
  tagName: 'OBJECT',
  proto: {
    get form() {
      return closest(this, 'FORM');
    },
    get contentDocument() {
      return null;
    }
  },
  attributes: [
    'code',
    'align',
    'archive',
    'border',
    'codeBase',
    'codeType',
    'data',
    {prop: 'declare', type: 'boolean'},
    {prop: 'height',  type: 'long'},
    {prop: 'hspace',  type: 'long'},
    'name',
    'standby',
    {prop: 'tabIndex', type: 'long'},
    'type',
    'useMap',
    {prop: 'vspace', type: 'long'},
    {prop: 'width', type: 'long'}
  ]
});

define('HTMLParamElement', {
  tagName: 'PARAM',
  attributes: [
    'name',
    'type',
    'value',
    'valueType'
  ]
});

define('HTMLAppletElement', {
  tagName: 'APPLET',
  attributes: [
    'align',
    'alt',
    'archive',
    'code',
    'codeBase',
    'height',
    {prop: 'hspace', type: 'long'},
    'name',
    'object',
    {prop: 'vspace', type: 'long'},
    'width'
  ]
});

define('HTMLMapElement', {
  tagName: 'MAP',
  proto: {
    get areas() {
      return this.getElementsByTagName("AREA");
    }
  },
  attributes: [
    'name'
  ]
});

define('HTMLAreaElement', {
  tagName: 'AREA',
  attributes: [
    'accessKey',
    'alt',
    'coords',
    'href',
    {prop: 'noHref', type: 'boolean'},
    'shape',
    {prop: 'tabIndex', type: 'long'},
    'target'
  ]
});

define('HTMLScriptElement', {
  tagName: 'SCRIPT',
  init: function() {
    this.addEventListener('DOMNodeInsertedIntoDocument', function() {
      if (this.src) {
        core.resourceLoader.load(this, this.src, this._eval);
      }
      else {
        var src = this.sourceLocation || {},
            filename = src.file || this._ownerDocument.URL;

        if (src) {
          filename += ':' + src.line + ':' + src.col;
        }
        filename += '<script>';

        core.resourceLoader.enqueue(this, this._eval, filename)(null, this.text);
      }
    });
  },
  proto: {
    _eval: function(text, filename) {
      if (this._ownerDocument.implementation._hasFeature("ProcessExternalResources", "script") &&
          this.language                                                                      &&
          core.languageProcessors[this.language])
      {
        this._ownerDocument._writeAfterElement = this;
        core.languageProcessors[this.language](this, text, filename);
        delete this._ownerDocument._writeAfterElement;
      }
    },
    get language() {
      var type = this.type || "text/javascript";
      return type.split("/").pop().toLowerCase();
    },
    get text() {
      var i=0, children = this._childNodes, l = children.length, ret = [];

      for (i; i<l; i++) {
        ret.push(children[i].nodeValue);
      }

      return ret.join("");
    },
    set text(text) {
      while (this._childNodes.length) {
        this.removeChild(this._childNodes[this._childNodes.length-1]);
      }
      this.appendChild(this._ownerDocument.createTextNode(text));
    }
  },
  attributes : [
    {prop: 'defer', 'type': 'boolean'},
    'htmlFor',
    'event',
    'charset',
    'type',
    'src'
  ]
})

define('HTMLTableElement', {
  tagName: 'TABLE',
  proto: {
    get caption() {
      return firstChild(this, 'CAPTION');
    },
    get tHead() {
      return firstChild(this, 'THEAD');
    },
    get tFoot() {
      return firstChild(this, 'TFOOT');
    },
    get rows() {
      if (!this._rows) {
        var table = this;
        this._rows = new core.HTMLCollection(this._ownerDocument, function() {
          var sections = [table.tHead].concat(table.tBodies._toArray(), table.tFoot).filter(function(s) { return !!s });

          if (sections.length === 0) {
            return core.mapDOMNodes(table, false, function(el) {
              return el.tagName === 'TR';
            });
          }

          return sections.reduce(function(prev, s) {
            return prev.concat(s.rows._toArray());
          }, []);

        });
      }
      return this._rows;
    },
    get tBodies() {
      if (!this._tBodies) {
        this._tBodies = descendants(this, 'TBODY', false);
      }
      return this._tBodies;
    },
    createTHead: function() {
      var el = this.tHead;
      if (!el) {
        el = this._ownerDocument.createElement('THEAD');
        this.appendChild(el);
      }
      return el;
    },
    deleteTHead: function() {
      var el = this.tHead;
      if (el) {
        el._parentNode.removeChild(el);
      }
    },
    createTFoot: function() {
      var el = this.tFoot;
      if (!el) {
        el = this._ownerDocument.createElement('TFOOT');
        this.appendChild(el);
      }
      return el;
    },
    deleteTFoot: function() {
      var el = this.tFoot;
      if (el) {
        el._parentNode.removeChild(el);
      }
    },
    createCaption: function() {
      var el = this.caption;
      if (!el) {
        el = this._ownerDocument.createElement('CAPTION');
        this.appendChild(el);
      }
      return el;
    },
    deleteCaption: function() {
      var c = this.caption;
      if (c) {
        c._parentNode.removeChild(c);
      }
    },
    insertRow: function(index) {
      var tr = this._ownerDocument.createElement('TR');
      if (this._childNodes.length === 0) {
        this.appendChild(this._ownerDocument.createElement('TBODY'));
      }
      var rows = this.rows._toArray();
      if (index < -1 || index > rows.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      if (index === -1 || (index === 0 && rows.length === 0)) {
        this.tBodies.item(0).appendChild(tr);
      }
      else if (index === rows.length) {
        var ref = rows[index-1];
        ref._parentNode.appendChild(tr);
      }
      else {
        var ref = rows[index];
        ref._parentNode.insertBefore(tr, ref);
      }
      return tr;
    },
    deleteRow: function(index) {
      var rows = this.rows._toArray(), l = rows.length;
      if (index === -1) {
        index = l-1;
      }
      if (index < 0 || index >= l) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var tr = rows[index];
      tr._parentNode.removeChild(tr);
    }
  },
  attributes: [
    'align',
    'bgColor',
    'border',
    'cellPadding',
    'cellSpacing',
    'frame',
    'rules',
    'summary',
    'width'
  ]
});

define('HTMLTableCaptionElement', {
  tagName: 'CAPTION',
  attributes: [
    'align'
  ]
});

define('HTMLTableColElement', {
  tagNames: ['COL','COLGROUP'],
  attributes: [
    'align',
    {prop: 'ch', attr: 'char'},
    {prop: 'chOff', attr: 'charoff'},
    {prop: 'span', type: 'long'},
    'vAlign',
    'width',
  ]
});

define('HTMLTableSectionElement', {
  tagNames: ['THEAD','TBODY','TFOOT'],
  proto: {
    get rows() {
      if (!this._rows) {
        this._rows = descendants(this, 'TR', false);
      }
      return this._rows;
    },
    insertRow: function(index) {
      var tr = this._ownerDocument.createElement('TR');
      var rows = this.rows._toArray();
      if (index < -1 || index > rows.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      if (index === -1 || index === rows.length) {
        this.appendChild(tr);
      }
      else {
        var ref = rows[index];
        this.insertBefore(tr, ref);
      }
      return tr;
    },
    deleteRow: function(index) {
      var rows = this.rows._toArray();
      if (index === -1) {
        index = rows.length-1;
      }
      if (index < 0 || index >= rows.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var tr = this.rows[index];
      this.removeChild(tr);
    }
  },
  attributes: [
    'align',
    {prop: 'ch', attr: 'char'},
    {prop: 'chOff', attr: 'charoff'},
    {prop: 'span', type: 'long'},
    'vAlign',
    'width',
  ]
});

define('HTMLTableRowElement', {
  tagName: 'TR',
  proto: {
    get cells() {
      if (!this._cells) {
        this._cells = new core.HTMLCollection(this, core.mapper(this, function(n) {
          return n.nodeName === 'TD' || n.nodeName === 'TH';
        }, false));
      }
      return this._cells;
    },
    get rowIndex() {
      var table = closest(this, 'TABLE');
      return table ? table.rows._toArray().indexOf(this) : -1;
    },

    get sectionRowIndex() {
      return this._parentNode.rows._toArray().indexOf(this);
    },
    insertCell: function(index) {
      var td = this._ownerDocument.createElement('TD');
      var cells = this.cells._toArray();
      if (index < -1 || index > cells.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      if (index === -1 || index === cells.length) {
        this.appendChild(td);
      }
      else {
        var ref = cells[index];
        this.insertBefore(td, ref);
      }
      return td;
    },
    deleteCell: function(index) {
      var cells = this.cells._toArray();
      if (index === -1) {
        index = cells.length-1;
      }
      if (index < 0 || index >= cells.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var td = this.cells[index];
      this.removeChild(td);
    }
  },
  attributes: [
    'align',
    'bgColor',
    {prop: 'ch', attr: 'char'},
    {prop: 'chOff', attr: 'charoff'},
    'vAlign'
  ]
});

define('HTMLTableCellElement', {
  tagNames: ['TH','TD'],
  proto: {
    _headers: null,
    set headers(h) {
      if (h === '') {
        //Handle resetting headers so the dynamic getter returns a query
        this._headers = null;
        return;
      }
      if (!(h instanceof Array)) {
        h = [h];
      }
      this._headers = h;
    },
    get headers() {
      if (this._headers) {
        return this._headers.join(' ');
      }
      var cellIndex = this.cellIndex,
          headings  = [],
          siblings  = this._parentNode.getElementsByTagName(this.tagName);

      for (var i=0; i<siblings.length; i++) {
        if (siblings.item(i).cellIndex >= cellIndex) {
          break;
        }
        headings.push(siblings.item(i).id);
      }
      this._headers = headings;
      return headings.join(' ');
    },
    get cellIndex() {
      return closest(this, 'TR').cells._toArray().indexOf(this);
    }
  },
  attributes: [
    'abbr',
    'align',
    'axis',
    'bgColor',
    {prop: 'ch', attr: 'char'},
    {prop: 'chOff', attr: 'charoff'},
    {prop: 'colSpan', type: 'long'},
    'height',
    {prop: 'noWrap', type: 'boolean'},
    {prop: 'rowSpan', type: 'long'},
    'scope',
    'vAlign',
    'width'
  ]
});

define('HTMLFrameSetElement', {
  tagName: 'FRAMESET',
  attributes: [
    'cols',
    'rows'
  ]
});

function loadFrame (frame) {
  if (frame._contentDocument) {
    if (frame._contentDocument.defaultView) {
      // close calls delete on its document.
      frame._contentDocument.defaultView.close();
    } else {
      delete frame._contentDocument;
    }
  }

  var src = frame.src.trim() === '' ? 'about:blank' : frame.src;
  var parentDoc = frame._ownerDocument;

  // If the URL can't be resolved or the src attribute is missing / blank,
  // then url should be set to the string "about:blank".
  // (http://www.whatwg.org/specs/web-apps/current-work/#the-iframe-element)
  var url = core.resourceLoader.resolve(parentDoc, src);
  var wnd = new Window({
    parsingMode: 'html',
    url: url
  });
  var contentDoc = frame._contentDocument = wnd.document;
  applyDocumentFeatures(contentDoc, parentDoc.implementation._features);

  var parent = parentDoc.defaultView;
  var contentWindow = contentDoc.defaultView;
  contentWindow._parent = parent;
  contentWindow._top = parent.top;

  // Handle about:blank with a simulated load of an empty document.
  if(url === 'about:blank') {
    core.resourceLoader.enqueue(frame, function() {
      contentDoc.write();
      contentDoc.close();
    })();
  } else {
    core.resourceLoader.load(frame, url, function(html, filename) {
      contentDoc.write(html);
      contentDoc.close();
    });
  }
}

function refreshAccessors(document) {
  var window = document._defaultView;
  var frames = document.querySelectorAll("iframe,frame");

  // delete accessors for all frames
  for (var i = 0; i < window._length; ++i) {
    delete window[i];
  }

  window._length = frames.length;
  Array.prototype.forEach.call(frames, function (frame, i) {
    defineGetter(window, i, function () { return frame.contentWindow; });
  });
}

function refreshNameAccessor(frame) {
  var name = frame.getAttribute("name");
  // https://html.spec.whatwg.org/multipage/browsers.html#named-access-on-the-window-object:supported-property-names
  if (name !== null && name !== "") {
    // I do not know why this only works with _global and not with _defaultView :(
    var window = frame._ownerDocument._global;
    delete window[name];

    if (isInDocument(frame)) {
      defineGetter(window, name, function () { return frame.contentWindow; });
    }
  }
}

function isInDocument(el) {
  var document = el._ownerDocument;

  var current = el;
  while ((current = current._parentNode)) {
    if (current === document) {
      return true;
    }
  }

  return false;
}

define('HTMLFrameElement', {
  tagName: 'FRAME',
  proto: {
    _attrModified: function (name, value, oldVal) {
      core.HTMLElement.prototype._attrModified.call(this, name, value, oldVal);
      if (name === 'name') {
        if (oldVal) {
          // I do not know why this only works with _global and not with _defaultView :(
          delete this._ownerDocument._global[oldVal];
        }
        refreshNameAccessor(this);
      } else if (name === 'src') {
        if (isInDocument(this)) {
          loadFrame(this);
        }
      }
    },

    _detach: function () {
      core.HTMLElement.prototype._detach.call(this);

      if (this.contentWindow) {
        this.contentWindow.close();
      }

      refreshAccessors(this._ownerDocument);
      refreshNameAccessor(this);
    },

    _attach: function () {
      core.HTMLElement.prototype._attach.call(this);

      loadFrame(this);
      refreshAccessors(this._ownerDocument);
      refreshNameAccessor(this);
    },

    _contentDocument : null,
    get contentDocument() {
      if (this._contentDocument == null) {
        this._contentDocument = new core.HTMLDocument({ parsingMode: "html" });
      }
      return this._contentDocument;
    },
    get contentWindow() {
      return this.contentDocument.defaultView;
    }
  },
  attributes: [
    'frameBorder',
    'longDesc',
    'marginHeight',
    'marginWidth',
    'name',
    {prop: 'noResize', type: 'boolean'},
    'scrolling',
    {prop: 'src', type: 'string', write: false}
  ]
});

define('HTMLIFrameElement', {
  tagName: 'IFRAME',
  parentClass: core.HTMLFrameElement,
  attributes: [
    'align',
    'frameBorder',
    'height',
    'longDesc',
    'marginHeight',
    'marginWidth',
    'name',
    'scrolling',
    'src',
    'width'
  ]
});
