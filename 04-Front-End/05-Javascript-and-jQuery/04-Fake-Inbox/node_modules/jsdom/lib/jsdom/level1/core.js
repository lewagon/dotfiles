/*
  ServerJS Javascript DOM Level 1
*/
var inheritFrom = require("../utils").inheritFrom;
var domToHtml = require("../browser/domtohtml").domToHtml;
var defineGetter = require("../utils").defineGetter;
var memoizeQuery = require("../utils").memoizeQuery;
var validateName = require('../living/helpers/validate-names').name;
var Location = require("../browser/location");

// utility functions
var attachId = function(id,elm,doc) {
  if (id && elm && doc) {
    if (!doc._ids[id]) {
      doc._ids[id] = [];
    }
    doc._ids[id].push(elm);
  }
};
var detachId = function(id,elm,doc) {
  var elms, i;
  if (id && elm && doc) {
    if (doc._ids && doc._ids[id]) {
      elms = doc._ids[id];
      for (i=0;i<elms.length;i++) {
        if (elms[i] === elm) {
          elms.splice(i,1);
          i--;
        }
      }
      if (elms.length === 0) {
        delete doc._ids[id];
      }
    }
  }
};

function setInnerHTML(dom, node, html) {
  //Clear the children first:
  var child;
  while ((child = node._childNodes[0])) {
    node.removeChild(child);
  }

  var isDoc = node.nodeName === '#document';
  if (html !== "" && html != null) {
    if (isDoc) {
      dom._htmlToDom.appendHtmlToDocument(html, node);
    } else {
      dom._htmlToDom.appendHtmlToElement(html, node);
    }
  }
}

// TODO: move all of these to utils.js. Right now they are exposed on window, which is bizarre.
var core = module.exports = {
  mapper: function(parent, filter, recursive) {
    return function() {
      return core.mapDOMNodes(parent, recursive !== false, filter);
    };
  },

  // Returns Array
  mapDOMNodes : function(parent, recursive, callback) {
    function visit(parent, result) {
      return parent._childNodes.reduce(reducer, result);
    }

    function reducer(array, child) {
      if (callback(child)) {
        array.push(child);
      }
      if (recursive && child._childNodes) {
        visit(child, array);
      }
      return array;
    }

    return visit(parent, []);
  },

  visitTree: function(root, callback) {
    var cur = root; // TODO: Unroll this.

    function visit(el) {
      if (el) {
        callback(el);
        if (el._childNodes) {
          var i        = 0,
              children = el._childNodes,
              l        = children.length;

          for (i; i<l; i++) {
            visit(children[i]);
          }
        }
      }
    }
    visit(root);
  },

  markTreeReadonly: function(node) {
    function markLevel(el) {
      el._readonly = true;
      // also mark attributes and their children read-only
      if (el.attributes) {
        var attributes = el.attributes, l = attributes.length, i=0;
        attributes._readonly = true;

        for (i; i<l; i++) {
          core.visitTree(attributes[i], markLevel);
        }
      }
    }

    core.visitTree(node, markLevel);
  }
};

// ExceptionCode
var INDEX_SIZE_ERR              = core.INDEX_SIZE_ERR              = 1,
    DOMSTRING_SIZE_ERR          = core.DOMSTRING_SIZE_ERR          = 2,
    HIERARCHY_REQUEST_ERR       = core.HIERARCHY_REQUEST_ERR       = 3,
    WRONG_DOCUMENT_ERR          = core.WRONG_DOCUMENT_ERR          = 4,
    INVALID_CHARACTER_ERR       = core.INVALID_CHARACTER_ERR       = 5,
    NO_DATA_ALLOWED_ERR         = core.NO_DATA_ALLOWED_ERR         = 6,
    NO_MODIFICATION_ALLOWED_ERR = core.NO_MODIFICATION_ALLOWED_ERR = 7,
    NOT_FOUND_ERR               = core.NOT_FOUND_ERR               = 8,
    NOT_SUPPORTED_ERR           = core.NOT_SUPPORTED_ERR           = 9,
    INUSE_ATTRIBUTE_ERR         = core.INUSE_ATTRIBUTE_ERR         = 10,
    INVALID_STATE_ERR           = core.INVALID_STATE_ERR           = 11,
    SYNTAX_ERR                  = core.SYNTAX_ERR                  = 12,
    INVALID_MODIFICATION_ERR    = core.INVALID_MODIFICATION_ERR    = 13,
    NAMESPACE_ERR               = core.NAMESPACE_ERR               = 14,
    INVALID_ACCESS_ERR          = core.INVALID_ACCESS_ERR          = 15,
// Node Types
    ELEMENT_NODE                = 1,
    ATTRIBUTE_NODE              = 2,
    TEXT_NODE                   = 3,
    CDATA_SECTION_NODE          = 4,
    ENTITY_REFERENCE_NODE       = 5,
    ENTITY_NODE                 = 6,
    PROCESSING_INSTRUCTION_NODE = 7,
    COMMENT_NODE                = 8,
    DOCUMENT_NODE               = 9,
    DOCUMENT_TYPE_NODE          = 10,
    DOCUMENT_FRAGMENT_NODE      = 11,
    NOTATION_NODE               = 12;

var messages = core.exceptionMessages = { };
messages[INDEX_SIZE_ERR]              = "Index size error";
messages[DOMSTRING_SIZE_ERR]          = "DOMString size error";
messages[HIERARCHY_REQUEST_ERR]       = "Hierarchy request error";
messages[WRONG_DOCUMENT_ERR]          = "Wrong document";
messages[INVALID_CHARACTER_ERR]       = "Invalid character";
messages[NO_DATA_ALLOWED_ERR]         = "No data allowed";
messages[NO_MODIFICATION_ALLOWED_ERR] = "No modification allowed";
messages[NOT_FOUND_ERR]               = "Not found";
messages[NOT_SUPPORTED_ERR]           = "Not supported";
messages[INUSE_ATTRIBUTE_ERR]         = "Attribute in use";
messages[NAMESPACE_ERR]               = "Invalid namespace";

core.DOMException = function DOMException(code, message) {
  Error.call(this, core.exceptionMessages[code]);
  this.message = core.exceptionMessages[code];
  this.code = code;

  if (message) {
    this.message = this.message + ": " + message;
  }

  if (Error.captureStackTrace) {

    Error.captureStackTrace(this, DOMException);
  }
};

core.DOMException.INDEX_SIZE_ERR              = INDEX_SIZE_ERR;
core.DOMException.DOMSTRING_SIZE_ERR          = DOMSTRING_SIZE_ERR;
core.DOMException.HIERARCHY_REQUEST_ERR       = HIERARCHY_REQUEST_ERR;
core.DOMException.WRONG_DOCUMENT_ERR          = WRONG_DOCUMENT_ERR;
core.DOMException.INVALID_CHARACTER_ERR       = INVALID_CHARACTER_ERR;
core.DOMException.NO_DATA_ALLOWED_ERR         = NO_DATA_ALLOWED_ERR;
core.DOMException.NO_MODIFICATION_ALLOWED_ERR = NO_MODIFICATION_ALLOWED_ERR;
core.DOMException.NOT_FOUND_ERR               = NOT_FOUND_ERR;
core.DOMException.NOT_SUPPORTED_ERR           = NOT_SUPPORTED_ERR;
core.DOMException.INUSE_ATTRIBUTE_ERR         = INUSE_ATTRIBUTE_ERR;
core.DOMException.INVALID_STATE_ERR           = INVALID_STATE_ERR;
core.DOMException.SYNTAX_ERR                  = SYNTAX_ERR;
core.DOMException.INVALID_MODIFICATION_ERR    = INVALID_MODIFICATION_ERR;
core.DOMException.NAMESPACE_ERR               = NAMESPACE_ERR;
core.DOMException.INVALID_ACCESS_ERR          = INVALID_ACCESS_ERR;

inheritFrom(Error, core.DOMException, {
  name: "DOMException",
  INDEX_SIZE_ERR              : INDEX_SIZE_ERR,
  DOMSTRING_SIZE_ERR          : DOMSTRING_SIZE_ERR,
  HIERARCHY_REQUEST_ERR       : HIERARCHY_REQUEST_ERR,
  WRONG_DOCUMENT_ERR          : WRONG_DOCUMENT_ERR,
  INVALID_CHARACTER_ERR       : INVALID_CHARACTER_ERR,
  NO_DATA_ALLOWED_ERR         : NO_DATA_ALLOWED_ERR,
  NO_MODIFICATION_ALLOWED_ERR : NO_MODIFICATION_ALLOWED_ERR,
  NOT_FOUND_ERR               : NOT_FOUND_ERR,
  NOT_SUPPORTED_ERR           : NOT_SUPPORTED_ERR,
  INUSE_ATTRIBUTE_ERR         : INUSE_ATTRIBUTE_ERR,
  INVALID_STATE_ERR           : INVALID_STATE_ERR,
  SYNTAX_ERR                  : SYNTAX_ERR,
  INVALID_MODIFICATION_ERR    : INVALID_MODIFICATION_ERR,
  NAMESPACE_ERR               : NAMESPACE_ERR,
  INVALID_ACCESS_ERR          : INVALID_ACCESS_ERR
});

core.NodeList = function NodeList(element, query) {
  if (!query) {
    // Non-live NodeList
    if (Array.isArray(element)) {
      Array.prototype.push.apply(this, element);
    }
    Object.defineProperties(this, {
      _length: {value: element ? element.length : 0, writable:true}
    });
  } else {
    Object.defineProperties(this, {
      _element: {value: element},
      _query: {value: query},
      _snapshot: {writable: true},
      _length: {value: 0, writable: true},
      _version: {value: -1, writable: true}
    });
    this._update();
  }
};

function lengthFromProperties(arrayLike) {
  var max = -1;
  var keys = Object.keys(arrayLike);
  var highestKeyIndex = keys.length - 1;

  // abuses a v8 implementation detail for a very fast case
  // (if this implementation detail changes, this method will still
  //  return correct results)
  if (highestKeyIndex == keys[highestKeyIndex]) { // not ===
    return keys.length;
  }

  for (var i = highestKeyIndex; i >= 0 ; --i) {
    var asNumber = + keys[i];

    if (!isNaN(asNumber) && asNumber > max) {
      max = asNumber;
    }
  }
  return max + 1;
}
core.NodeList.prototype = {
  _update: function() {
    var i;

    if (!this._element) {
      this._length = lengthFromProperties(this);
    } else {
      if (this._version < this._element._version) {
        var nodes = this._snapshot = this._query();
        this._resetTo(nodes);
        this._version = this._element._version;
      }
    }
  },
  _resetTo: function(array) {
    var startingLength = lengthFromProperties(this);
    for (var i = 0; i < startingLength; ++i) {
      delete this[i];
    }

    for (var j = 0; j < array.length; ++j) {
      this[j] = array[j];
    }
    this._length = array.length;
  },
  _toArray: function() {
    if (this._element) {
      this._update();
      return this._snapshot;
    }

    return Array.prototype.slice.call(this);
  },
  get length() {
    this._update();
    return this._length || 0;
  },
  set length(length) {
    return this._length;
  },
  item: function(index) {
    this._update();
    return this[index] || null;
  },
  toString: function() {
    return '[ jsdom NodeList ]: contains ' + this.length + ' items';
  }
};
Object.defineProperty(core.NodeList.prototype, 'constructor', {
  value: core.NodeList,
  writable: true,
  configurable: true
});

core.DOMImplementation = function DOMImplementation(document, /* Object */ features) {
  this._ownerDocument = document;
  this._features = {};

  if (features) {
    for (var feature in features) {
      if (features.hasOwnProperty(feature)) {
        this._addFeature(feature.toLowerCase(), features[feature]);
      }
    }
  }
};

core.DOMImplementation.prototype = {
  // All of these are legacy, left because jsdom uses them internally :(. jsdom confused the idea of browser features
  // and jsdom features
  _removeFeature : function(feature, version) {
    feature = feature.toLowerCase();
    if (this._features[feature]) {
      if (version) {
        var j        = 0,
            versions = this._features[feature],
            l        = versions.length;

        for (j; j<l; j++) {
          if (versions[j] === version) {
            versions.splice(j,1);
            return;
          }
        }
      } else {
        delete this._features[feature];
      }
    }
  },

  _addFeature: function(feature, version) {
    feature = feature.toLowerCase();

    if (version) {

      if (!this._features[feature]) {
        this._features[feature] = [];
      }

      if (version instanceof Array) {
        Array.prototype.push.apply(this._features[feature], version);
      } else {
        this._features[feature].push(version);
      }
    }
  },

  // The real hasFeature is in living/dom-implementation.js, and returns true always.
  // This one is used internally
  _hasFeature: function(/* string */ feature, /* string */ version) {
    feature = (feature) ? feature.toLowerCase() : '';
    var versions = (this._features[feature]) ?
                    this._features[feature]  :
                    false;

    if (!version && versions.length && versions.length > 0) {
      return true;
    } else if (typeof versions === 'string') {
      return versions === version;
    } else if (versions.indexOf && versions.length > 0) {
      for (var i = 0; i < versions.length; i++) {
        var found = versions[i] instanceof RegExp ?
          versions[i].test(version) :
          versions[i] === version;
        if (found) { return true; }
      }
      return false;
    } else {
      return false;
    }
  }
};


var attrCopy = function(src, dest, fn) {
  if (src.attributes) {
    var attrs = src.attributes, i, l = attrs.length, attr, copied;
    for (i=0;i<l;i++) {
      attr = attrs[i];
      // skip over default attributes
      if (!attr.specified) {
        continue;
      }
      // TODO: consider duplicating this code and moving it into level2/core
      if (attr.namespaceURI) {
        dest.setAttributeNS(attr.namespaceURI,
                                     attr.name,
                                     attr.value);
        var localName = attr.name.split(':').pop();
        copied = dest.getAttributeNodeNS(attr.namespaceURI, localName);
      } else {
        dest.setAttribute(attr.name, attr.value);
        copied = dest.getAttributeNode(attr.name);
      }
      if (typeof fn == "function") {
        fn(attr, copied);
      }

    }
  }
  return dest;
};

core.Node = function Node(ownerDocument) {
  this._childNodes = [];
  this._childNodesList = null;
  this._ownerDocument = ownerDocument;
  this._attributes = new AttributeList(ownerDocument, this);
  this._childrenList = null;
  this._version = 0;
  this._parentNode = null;
  this._memoizedQueries = {};
  this._readonly = false;
};

core.Node.ELEMENT_NODE                = ELEMENT_NODE;
core.Node.ATTRIBUTE_NODE              = ATTRIBUTE_NODE;
core.Node.TEXT_NODE                   = TEXT_NODE;
core.Node.CDATA_SECTION_NODE          = CDATA_SECTION_NODE;
core.Node.ENTITY_REFERENCE_NODE       = ENTITY_REFERENCE_NODE;
core.Node.ENTITY_NODE                 = ENTITY_NODE;
core.Node.PROCESSING_INSTRUCTION_NODE = PROCESSING_INSTRUCTION_NODE;
core.Node.COMMENT_NODE                = COMMENT_NODE;
core.Node.DOCUMENT_NODE               = DOCUMENT_NODE;
core.Node.DOCUMENT_TYPE_NODE          = DOCUMENT_TYPE_NODE;
core.Node.DOCUMENT_FRAGMENT_NODE      = DOCUMENT_FRAGMENT_NODE;
core.Node.NOTATION_NODE               = NOTATION_NODE;

core.Node.prototype = {
  ELEMENT_NODE                : ELEMENT_NODE,
  ATTRIBUTE_NODE              : ATTRIBUTE_NODE,
  TEXT_NODE                   : TEXT_NODE,
  CDATA_SECTION_NODE          : CDATA_SECTION_NODE,
  ENTITY_REFERENCE_NODE       : ENTITY_REFERENCE_NODE,
  ENTITY_NODE                 : ENTITY_NODE,
  PROCESSING_INSTRUCTION_NODE : PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE                : COMMENT_NODE,
  DOCUMENT_NODE               : DOCUMENT_NODE,
  DOCUMENT_TYPE_NODE          : DOCUMENT_TYPE_NODE,
  DOCUMENT_FRAGMENT_NODE      : DOCUMENT_FRAGMENT_NODE,
  NOTATION_NODE               : NOTATION_NODE,

  get children() {
    if (!this._childrenList) {
      var self = this;
      this._childrenList = new core.NodeList(this, function() {
        return self._childNodes.filter(function(node) {
          return node.tagName;
        });
      });
    }
    this._childrenList._update();
    return this._childrenList;
  },
  get nodeValue() {
    if (this.nodeType === core.Node.TEXT_NODE ||
        this.nodeType === core.Node.COMMENT_NODE ||
        this.nodeType === core.Node.PROCESSING_INSTRUCTION_NODE) {
      return this._data;
    }

    return null;
  },
  set nodeValue(value) {
    if (this.nodeType === core.Node.TEXT_NODE ||
        this.nodeType === core.Node.COMMENT_NODE ||
        this.nodeType === core.Node.PROCESSING_INSTRUCTION_NODE) {
      this.replaceData(0, this.length, value);
    }
  },
  get parentNode() { return this._parentNode;},

  get nodeName() {
    switch (this.nodeType) {
      case ELEMENT_NODE:
        return this.tagName;
      case TEXT_NODE:
        return "#text";
      case PROCESSING_INSTRUCTION_NODE:
        return this.target;
      case COMMENT_NODE:
        return "#comment";
      case DOCUMENT_NODE:
        return "#document";
      case DOCUMENT_TYPE_NODE:
        return this.name;
      case DOCUMENT_FRAGMENT_NODE:
        return "#document-fragment";
      case ATTRIBUTE_NODE:
        // TODO: remove this; attributes should not be nodes and should not have a nodeName property
        // Removing it breaks some legit-seeming xpath tests :-/
        return this.name;
    }
  },
  set nodeName(unused) { throw new core.DOMException();},
  get firstChild() {
    return this._childNodes.length > 0 ? this._childNodes[0] : null;
  },
  get ownerDocument() { return this._ownerDocument;},
  get readonly() { return this._readonly;},

  get lastChild() {
    var len = this._childNodes.length;
    return len > 0 ? this._childNodes[len -1] : null;
  },

  get childNodes() {
    if (!this._childNodesList) {
      var self = this;
      this._childNodesList = new core.NodeList(this, function() {
        return self._childNodes.slice();
      });
    }
    this._childNodesList._update();
    return this._childNodesList;
  },
  set childNodes(unused) { throw new core.DOMException();},

  _indexOf: function(/*Node*/ child) {
    return this._childNodes.indexOf(child);
  },

  get nextSibling() {
    // find this node's index in the parentNode, add one and call it a day
    if (!this._parentNode || !this._parentNode._indexOf) {
      return null;
    }

    var index = this._parentNode._indexOf(this);

    if (index == -1 || index+1 >= this._parentNode._childNodes.length) {
      return null;
    }

    return this._parentNode._childNodes[index+1] || null;
  },
  set nextSibling(unused) { throw new core.DOMException();},

  get previousSibling() {
    if (!this._parentNode || !this._parentNode._indexOf) {
      return null;
    }

    var index = this._parentNode._indexOf(this);

    if (index == -1 || index-1 < 0) {
      return null;
    }

    return this._parentNode._childNodes[index-1] || null;
  },
  set previousSibling(unused) { throw new core.DOMException();},

  /* returns Node */
  insertBefore :  function(/* Node */ newChild, /* Node*/ refChild) {
    if (this._readonly === true) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR, 'Attempting to modify a read-only node');
    }

    // Adopt unowned children, for weird nodes like DocumentType
    if (!newChild._ownerDocument) newChild._ownerDocument = this._ownerDocument;

    // TODO - if (!newChild) then?
    if (!(this instanceof core.Document) && newChild._ownerDocument !== this._ownerDocument) {
      throw new core.DOMException(WRONG_DOCUMENT_ERR);
    }

    if (newChild.nodeType && newChild.nodeType === ATTRIBUTE_NODE) {
      throw new core.DOMException(HIERARCHY_REQUEST_ERR);
    }

    // search for parents matching the newChild
    var current = this;
    do {
      if (current === newChild) {
        throw new core.DOMException(HIERARCHY_REQUEST_ERR);
      }
    } while((current = current._parentNode));

    // fragments are merged into the element (except parser-created fragments in <template>)
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE && !newChild._templateContent) {
      var tmpNode, i = newChild._childNodes.length;
      while (i-- > 0) {
        tmpNode = newChild.removeChild(newChild.firstChild);
        this.insertBefore(tmpNode, refChild);
      }
    } else if (newChild === refChild) {
      return newChild;
    } else {
      // if the newChild is already in the tree elsewhere, remove it first
      if (newChild._parentNode) {
        newChild._parentNode.removeChild(newChild);
      }

      if (refChild == null) {
        this._childNodes.push(newChild);
      } else {
        var refChildIndex = this._indexOf(refChild);
        if (refChildIndex == -1) {
          throw new core.DOMException(NOT_FOUND_ERR);
        }
        this._childNodes.splice(refChildIndex, 0, newChild);
      }

      newChild._parentNode = this;
      if (this._attached && newChild._attach) {
        newChild._attach();
      }

      this._modified();
      this._descendantAdded(this, newChild);
    }

    return newChild;
  }, // raises(DOMException);

  _modified: function() {
    this._version++;
    if (this._ownerDocument) {
      this._ownerDocument._version++;
    }

    if (this._childrenList) {
      this._childrenList._update();
    }
    this._clearMemoizedQueries()
  },

  _clearMemoizedQueries: function() {
    this._memoizedQueries = {};
    if (this._parentNode && this._parentNode !== this) {
      this._parentNode._clearMemoizedQueries();
    }
  },

  _descendantRemoved: function(parent, child) {
    if (this._parentNode && this._parentNode !== this) {
      this._parentNode._descendantRemoved(parent, child);
    }
  },

  _descendantAdded: function(parent, child) {
    if (this._parentNode && this._parentNode !== this) {
      this._parentNode._descendantAdded(parent, child);
    }
  },

  _attrModified: function(name, value, oldValue) {
    if (name == 'id' && this._attached) {
      var doc = this._ownerDocument;
      detachId(oldValue,this,doc);
      attachId(value,this,doc);
    }

    // Check for inline event handlers.
    // We can't set these like other attributes then look it up in
    // dispatchEvent() because that would create 2 'traditional' event handlers
    // in the case where there's an inline event handler attribute, plus one
    // set using element.on* in a script.
    //
    // @see http://www.w3.org/TR/2011/WD-html5-20110405/webappapis.html#event-handler-content-attributes
    if ((name.length > 2) && (name[0] == 'o') && (name[1] == 'n')) {
        if (value) {
          var self = this;
          // Check whether we're the window. This can happen because inline
          // handlers on the body are proxied to the window.
          var w = (typeof self.run !== 'undefined') ? self : self._ownerDocument.parentWindow;
          self[name] = function (event) {
              // The handler code probably refers to functions declared in the
              // window context, so we need to call run().

              // Use awesome hacks to get the correct `this` context for the
              // inline event handler. This would only be necessary if we're an
              // element, but for the sake of simplicity we also do it on window.

              // Also set event variable and support `return false`.
              w.__tempContextForInlineEventHandler = self;
              w.__tempEvent = event;
              w.run("if ((function (event) {" + value + "}).call(" +
                "window.__tempContextForInlineEventHandler, window.__tempEvent) === false) {" +
                "window.__tempEvent.preventDefault()}");
              delete w.__tempContextForInlineEventHandler;
              delete w.__tempEvent;
          };
        } else {
          this[name] = null;
        }
    }
  },

  /* returns Node */
  replaceChild : function(/* Node */ newChild, /* Node */ oldChild){
    this.insertBefore(newChild, oldChild);
    return this.removeChild(oldChild);
  }, //raises(DOMException);

  /* returns void */
  _attach : function() {
    this._attached = true;
    if (this.id) {
      attachId(this.id,this,this._ownerDocument);
    }
    for (var i = 0, len = this._childNodes.length; i < len; i++) {
      if (this._childNodes[i]._attach) {
        this._childNodes[i]._attach();
      }
    }
  },
  /* returns void */
  _detach : function() {
    var i, elms;
    this._attached = false;
    if (this.id) {
      detachId(this.id,this,this._ownerDocument);
    }
    for (var i = 0, len = this._childNodes.length; i < len; i++) {
      this._childNodes[i]._detach();
    }
  },

  /* returns Node */
  removeChild : function(/* Node */ oldChild){
    if (this._readonly === true) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    // TODO - if (!oldChild) then?

    // Use lastIndexOf so that removing all the children by
    // going backwards through childNodes is fast
    // (because of splice)
    var oldChildIndex = this._childNodes.lastIndexOf(oldChild);
    if (oldChildIndex == -1) {
      throw new core.DOMException(NOT_FOUND_ERR);
    }

    this._childNodes.splice(oldChildIndex, 1);
    oldChild._parentNode = null;
    this._modified();
    oldChild._detach();
    this._descendantRemoved(this, oldChild);
    return oldChild;
  }, // raises(DOMException);

  /* returns Node */
  appendChild : function(/* Node */ newChild) {
    return this.insertBefore(newChild, null);
  }, // raises(DOMException);

  /* returns boolean */
  hasChildNodes : function() {
    return this._childNodes.length > 0;
  },

  /* returns Node */
  cloneNode : function(/* bool */ deep, fn) {

    var object = null;
    switch (this.nodeType) {

      case this.ELEMENT_NODE:
        object = attrCopy(this,this._ownerDocument.createElementNS(this.namespaceURI, this.nodeName), fn);
        // Using this.nodeName isn't always exact because of uppercasing-related stuff
        object._prefix = this._prefix;
        object._localName = this._localName;
      break;

      case this.TEXT_NODE:
        object = attrCopy(this,this._ownerDocument.createTextNode(this.tagName));
        object.nodeValue = this.nodeValue;
      break;
      case this.ATTRIBUTE_NODE:
        object = this._ownerDocument.createAttribute(this.name);
      break;
      break;
      case this.PROCESSING_INSTRUCTION_NODE:
        var pi = this._ownerDocument.createProcessingInstruction(this._target,
                                                                this._data);
        object = attrCopy(this, pi);
      break;
      case this.COMMENT_NODE:
        object = this._ownerDocument.createComment(this.tagName);
        object.nodeValue = this.nodeValue;
      break;
      case this.DOCUMENT_NODE:
        object = attrCopy(this, new this.constructor({ parsingMode: this._parsingMode }));
        // TODO: clone the doctype?
      break;
      case this.DOCUMENT_TYPE_NODE:
        object = new core.DocumentType(this._ownerDocument, this._name, this._publicId, this._systemId);
      break;
      case this.DOCUMENT_FRAGMENT_NODE:
        object = this._ownerDocument.createDocumentFragment();
      break;
      default:
        throw new core.DOMException(NOT_FOUND_ERR);
      break;
    }

    if (typeof fn === "function") {
      fn(this, object);
    }

    if (deep || this.nodeType === ATTRIBUTE_NODE) {
      var clone = null;
      for (var i=0,len=this._childNodes.length;i<len;i++)
      {
        clone = this._childNodes[i].cloneNode(true);
        if (clone.nodeType === ATTRIBUTE_NODE) {
          object.setAttributeNode(clone);
        } else {
          var readonly = object._readonly;
          object._readonly = false;
          object.appendChild(clone);
          object._readonly = readonly;
        }
      }
    }

    return object;
  },

  /* returns void */
  normalize: function() {
    var prevChild, child, attr,i;

    if (this._attributes && this._attributes.length) {
      for (i=0;i<this._attributes.length;i++)
      {
        if (this._attributes[i]) {
          attr = this._attributes[i].normalize();
        }
      }
    }

    for (i=0;i<this._childNodes.length;i++)
    {
      child = this._childNodes[i];

      if (child.normalize) {
        child.normalize();
      }

      // Level2/core clean off empty nodes
      if (child.nodeValue === "") {
        this.removeChild(child);
        i--;
        continue;
      }

      if (i>0) {
        prevChild = this._childNodes[i-1];

        if (child.nodeType === TEXT_NODE &&
            prevChild.nodeType === TEXT_NODE)
        {

          // remove the child and decrement i
          prevChild.appendData(child.nodeValue);

          this.removeChild(child);
          i--;
        }
      }
    }
  },
  toString: function() {
    var id = '';
    if (this.id) {
        id = '#' + this.id;
    }
    if (this.className) {
        var classes = this.className.split(/\s+/);
	for (var i = 0, len = classes.length; i < len; i++) {
	    id += '.' + classes[i];
	}
    }
    return '[ ' + this.tagName + id + ' ]';
  },
  raise: function(type, message, data) {
    var text = type + ": " + message;

    if (data) {
      if (data.exception) {
        text = data.exception.stack;
      } else {
        text += ' - More:\n' + data;
      }
    }

    if (type === "error") {
      if (!this.errors) {
        this.errors = [];
      }
      // TODO: consider using actual `Error` objects or `DOMException`s even..
      var err = {
        type    : type,
        message : message || "No message",
        data    : data || null
      };

      this.errors.push(err);

      if (this._ownerDocument        &&
          this._ownerDocument.raise &&
          this !== this._ownerDocument)
      {
        this._ownerDocument.raise(type, message, data);
      }
    }
  }
};


core.NamedNodeMap = function NamedNodeMap(document) {
  this._nodes = Object.create(null);
  this._nsStore = {};
  this.length = 0;
  this._ownerDocument = document;
  this._readonly = false;
};
core.NamedNodeMap.prototype = {
  get readonly() { return this._readonly;},
  get ownerDocument() { this._ownerDocument;},

  exists : function(name) {
    return (this._nodes[name] || this._nodes[name] === null) ? true : false;
  },

  /* returns Node */
  getNamedItem: function(/* string */ name) {
    return this._nodes[name] || null;
  },

  /* returns Node */
  setNamedItem: function(/* Node */ arg) {

    // readonly
    if (this._readonly === true) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    // arg is from a different document
    if (arg && arg._ownerDocument !== this._ownerDocument) {
      throw new core.DOMException(WRONG_DOCUMENT_ERR);
    }

    // if this argument is already in use..
    if (arg && arg._ownerElement) {
      throw new core.DOMException(INUSE_ATTRIBUTE_ERR);
    }

    var name = arg.name || arg.tagName;
    var ret = this._nodes[name];
    if (!ret) {
      this.length++;
      ret = null;
    }
    this._nodes[name] = arg;

    // Avoid overwriting prototype methods etc.:
    if (this.hasOwnProperty(name) || !(name in this)) {
      this[name] = arg;
    }
    return ret;
  }, // raises: function(DOMException) {},

  /* returns Node */
  removeNamedItem: function(/* string */ name) {

    // readonly
    if (this._readonly === true) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    if (!this._nodes[name]) {
      throw new core.DOMException(NOT_FOUND_ERR);
    }

    var prev = this._nodes[name] || null;
    delete this._nodes[name];
    delete this[name];

    this.length--;
    return prev;
  }, // raises: function(DOMException) {},

  /* returns Node */
  item: function(/* int */ index) {
    var current = 0;
    for (var member in this._nodes) {
      if (current === index && this._nodes[member]) {
        return this._nodes[member];
      }
      current++;
    }
    return null;
  }
};

//
// For historical reasons, AttributeList objects must allow accessing
// attributes as if the object were an associative array. For
// instance, if `attributes` is an AttributeList object then
// `attributes.x` should evaluate to the attribute named `x` (which is
// not in any namespace). The AttributeList class uses the dollar
// symbol ($) to reduce the possibility of a clash between its field
// names and possible attribute names. For instance, if the method
// currently named `$set` were instead named `set` then it would not
// be possible to access an attribute named `set` through
// `attributes.set`. The dollar symbol is not valid in attribute names
// so `$set` cannot clash.
//
// Some fields do not get the $ because:
//
// * They are part of the API (e.g. `setNamedItem`, `length`), so they
//   must be visible under a specific name.
//
// * Jsdom's code which traverses the DOM tree expects regularly named
//   fields (e.g. `_parentNode`).
//
function AttributeList(document, parentNode) {
  this._ownerDocument = document;
  this._parentNode = parentNode;
  this._readonly = false;
  this._$ns_to_attrs = Object.create(null);
  this._$name_to_attrs = Object.create(null);
  this.length = 0;
}

AttributeList.prototype = {
  _$reserved: [], // Initialized later


  //
  // Code internal to jsdom and which manipulates an AttributeList
  // object should use the following methods rather than the methods
  // that provide the NamedNodeMap interface.
  //

  // This method *ignores* namespaces. This is *not* the same thing as
  // requesting an attribute with a null namespace.
  $getNoNS: function (name) {
    var attrs = this._$name_to_attrs[name];
    if (!attrs) {
      return null;
    }

    return attrs[0] || null;
  },

  $getNode: function (namespace, localName) {
    var attrs = this._$ns_to_attrs[namespace];
    if (!attrs) {
      return null;
    }

    var ret = attrs[localName];
    if (!ret) {
      return null;
    }

    return ret;
  },

  // This method *ignores* namespaces. This is *not* the same thing as
  // requesting an attribute with a null namespace.
  $setNoNS: function (name, value, dontValidate) {
    var attr = this.$getNoNS(name);
    if (!attr) {
      this.$set(name, value, undefined, undefined, undefined, dontValidate);
      return;
    }

    var prev_val = attr.value;
    attr.value = value;

    this._parentNode._attrModified(attr.name, attr.value, prev_val);
    this._parentNode._modified();
  },

  $set: function (localName, value, name, prefix, namespace, dontValidate) {
    if (this._readonly) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    if (name === undefined) {
      name = localName;
    }

    if (prefix === undefined) {
      prefix = null;
    }

    if (namespace === undefined) {
      namespace = null;
    }

    var prev_attr = this.$getNode(namespace, localName);
    var attr;

    var prev_val = null;
    if (prev_attr) {
      prev_val = prev_attr.value;
      prev_attr._prefix = prefix;
      prev_attr.value = value;
      attr = prev_attr;

      this._parentNode._attrModified(attr.name, attr.value, prev_val);
      this._parentNode._modified();
    }
    else {
      var method = dontValidate ? '_createAttributeNoNameValidation' : 'createAttribute';
      attr = this._ownerDocument[method](name);
      attr._ownerElement = this._parentNode;
      attr.value = value;
      attr._namespaceURI = namespace;
      attr._prefix = prefix;
      attr._localName = localName;
      attr._parentNode = this._parentNode;
      this.$setNode(attr);
      // $setNode calls the parent node methods.
    }
  },

  $setNode: function (attr) {
    if (this._readonly) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    if (attr.nodeType !== ATTRIBUTE_NODE) {
      throw new core.DOMException(HIERARCHY_REQUEST_ERR);
    }

    if (attr._ownerDocument !== this._ownerDocument) {
      throw new core.DOMException(WRONG_DOCUMENT_ERR);
    }

    if (attr._parentNode && attr._parentNode !== this._parentNode) {
      throw new core.DOMException(INUSE_ATTRIBUTE_ERR);
    }

    var localName = attr._localName;
    var name = attr.name;
    var prefix = attr._prefix;
    var namespace = attr._namespaceURI;

    if (name === undefined) {
      name = localName;
    }

    if (prefix === undefined) {
      prefix = null;
    }

    if (namespace === undefined) {
      namespace = null;
    }

    var prev_attr = this.$getNode(namespace, localName);

    var prev_val = null;
    if (prev_attr) {
      prev_val = prev_attr.value;
      // Remove the old attribute
      this._$onlyRemoveNode(prev_attr);
    }

    attr._parentNode = this._parentNode;
    attr._ownerElement = this._parentNode;

    var attrs = this._$ns_to_attrs[namespace];
    if (!attrs) {
      attrs = this._$ns_to_attrs[namespace] = Object.create(null);
    }
    attrs[localName] = attr;

    attrs = this._$name_to_attrs[name];
    if (!attrs) {
      attrs = this._$name_to_attrs[name] = [attr];
    }
    else {
      attrs.push(attr);
    }

    // Only attributes in the null namespace can be set this way.
    if (namespace === null) {
      // Make the node a field on this object but ONLY if it does not
      // clash with the reserved names.
      if (this._$reserved.indexOf(name) === -1) {
        this[name] = attr;
      }
    }

    this[this.length] = attr;
    this.length++;

    this._parentNode._attrModified(attr.name, attr.value, prev_val);
    this._parentNode._modified();

    return prev_attr;
  },

  // This method *ignores* namespaces. This is *not* the same thing as
  // requesting an attribute with a null namespace.
  $removeNoNS: function (name) {
    var attr = this.$getNoNS(name);
    return attr ? this.$removeNode(attr) : null;
  },

  $remove: function (namespace, localName) {
    var attr = this.$getNode(namespace, localName);
    return attr ? this.$removeNode(attr) : null;
  },

  /* Only removes the node, and does not add a default value. */
  _$onlyRemoveNode: function (attr) {
    var namespace = attr._namespaceURI;
    var localName = attr._localName;

    var attrs = this._$ns_to_attrs[namespace];
    if (!attrs) {
      return null;
    }

    var found_attr = attrs[localName];
    if (found_attr !== attr) {
      return null;
    }

    if (this._readonly) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    attr._ownerElement = null;
    attr._parentNode = null;
    delete attrs[localName];

    attrs = this._$name_to_attrs[attr.name];
    attrs.splice(attrs.indexOf(attr), 1);

    var ix = Array.prototype.indexOf.call(this, attr);
    // Splice also modifies length.
    Array.prototype.splice.call(this, ix, 1);

    if (this[attr.name] === attr) {
      delete this[attr.name];
    }

    this._parentNode._attrModified(attr.name);
    this._parentNode._modified();

    return attr;
  },

  $removeNode: function (attr) {
    if (!this._$onlyRemoveNode(attr)) {
      return null;
    }
    return attr;
  },

  // Although http://dom.spec.whatwg.org/#concept-element-attribute
  // does not specify that the attributes field on an Element should
  // support NamedNodeMap, in practice browsers still support this
  // interface so we should support it for compatibility.

  getNamedItem: function (name) {
    return this.getNamedItemNS(null, name);
  },
  removeNamedItem: function (name) {
    return this.removeNamedItemNS(null, name);
  },
  item: function (i) {
      return this[i];
  },
  getNamedItemNS: function (namespaceURI, localName) {
    if (namespaceURI === "") {
      namespaceURI = null;
    }

    return this.$getNode(namespaceURI, localName);
  },
  removeNamedItemNS: function (namespaceURI, localName) {
    var ret = this.$remove(namespaceURI, localName);

    if (ret === null) {
      throw new core.DOMException(NOT_FOUND_ERR);
    }

    return ret;
  }
};

// Alias these methods.
AttributeList.prototype.setNamedItem = AttributeList.prototype.$setNode;
AttributeList.prototype.setNamedItemNS = AttributeList.prototype.$setNode;

(function () {
  // Construct the list of reserved attribute names from a temporarily
  // created AttributeList and from the chain of prototypes. We need
  // this because JavaScript code running an a browser expects to be
  // able to do el.attributes.x to get the value of the attribute "x"
  // on an element. Unfortunately, JavaScript *currently* does not
  // allow us to elegantly provide such functionality without risking
  // a clash with the fields and methods set on the AttributeList
  // object. Hence we need a list of reserved field names.

  var reserved = Object.keys(new AttributeList());
  var prototype = AttributeList.prototype;
  while (prototype) {
    reserved = reserved.concat(Object.getOwnPropertyNames(prototype));
    prototype = Object.getPrototypeOf(prototype);
  }
  AttributeList.prototype._$reserved = reserved;
})();

core.AttributeList = AttributeList;

core.Element = function Element(document, localName) {
  core.Node.call(this, document);
  this._namespaceURI = null;
  this._prefix = null;
  this._localName = localName;
};

inheritFrom(core.Node, core.Element, {
  get namespaceURI() {
    return this._namespaceURI;
  },
  get prefix() {
    return this._prefix;
  },
  get localName() {
    return this._localName;
  },
  get tagName() {
    var qualifiedName = this._prefix !== null ? this._prefix + ":" + this._localName : this._localName;
    if (this.namespaceURI === "http://www.w3.org/1999/xhtml" && this._ownerDocument._parsingMode === "html") {
      qualifiedName = qualifiedName.toUpperCase();
    }
    return qualifiedName;
  },

  get id() {
    var idAttr = this.getAttribute("id");
    if (idAttr === null) {
      return "";
    }
    return idAttr;
  },

  nodeType : ELEMENT_NODE,
  get attributes() {
    return this._attributes;
  },

  get sourceIndex() {
    /*
    * According to QuirksMode:
    * Get the sourceIndex of element x. This is also the index number for
    * the element in the document.getElementsByTagName('*') array.
    * http://www.quirksmode.org/dom/w3c_core.html#t77
    */
    var items = this.ownerDocument.getElementsByTagName('*'),
        len = items.length;

    for (var i = 0; i < len; i++) {
      if (items[i] === this) {
        return i;
      }
    }
  },

  get outerHTML() {
    return domToHtml(this, true);
  },

  get innerHTML() {
    var tagName = this.tagName;
    if (tagName === 'SCRIPT' || tagName === 'STYLE') {
      var type = this.getAttribute('type');
      if (!type || /^text\//i.test(type) || /\/javascript$/i.test(type)) {
        return domToHtml(this._childNodes, true, true);
      }
    }

    // In case of <template> we should pass it's content fragment as a serialization root if we have one
    if(tagName === 'TEMPLATE' &&
       this._namespaceURI === 'http://www.w3.org/1999/xhtml' &&
       this._childNodes[0] && this._childNodes[0]._templateContent) {
      return domToHtml(this._childNodes[0]._childNodes, true);
    }

    return domToHtml(this._childNodes, true);
  },

  set innerHTML(html) {
    setInnerHTML(this.ownerDocument, this, html);
  },

  scrollTop: 0,
  scrollLeft: 0,

  hasAttributes: function () {
    return this._attributes.length > 0;
  },

  /* returns Attr */
  setAttributeNode: function(/* Attr */ newAttr) {
    var prevNode = this._attributes.$getNode(null, newAttr.name);
    if (prevNode) {
      prevNode._ownerElement = null;
    }

    newAttr._ownerElement = this;
    this._attributes.$setNode(newAttr);

    return (prevNode && prevNode.specified) ? prevNode : null;
  }, //  raises: function(DOMException) {},

  /* returns Attr */
  removeAttributeNode: function(/* Attr */ oldAttr) {
    var ret = this._attributes.$removeNode(oldAttr);

    if (ret !== null) {
      return ret;
    }

    throw new core.DOMException(NOT_FOUND_ERR);
  }, //raises: function(DOMException) {},

  /* returns NodeList */
  getElementsByTagName: memoizeQuery(function(/* string */ name) {
    name = name.toLowerCase();

    function filterByTagName(child) {
      if (child.nodeName && child.nodeType === ELEMENT_NODE) {
        return name === "*" || (child.nodeName.toLowerCase() === name);
      }

      return false;
    }
    return new core.NodeList(this._ownerDocument || this, core.mapper(this, filterByTagName, true));
  }),

  getElementsByClassName: function (className) {

    function filterByClassName(child) {
      if (!child) {
        return false;
      }

      var classString = child.className;
      if (classString) {
        var s = classString.split(" ");
        for (var i = 0; i < s.length; i++) {
          if (s[i] === className) {
            return true;
          }
        }
      }
      return false;
    }

    return new core.NodeList(this.ownerDocument || this, core.mapper(this, filterByClassName));
  }
});

core.DocumentFragment = function DocumentFragment(document) {
  core.Node.call(this, document);
};
inheritFrom(core.Node, core.DocumentFragment, {
  nodeType : DOCUMENT_FRAGMENT_NODE
});

core.Document = function Document(options) {
  if (!options || !options.parsingMode || (options.parsingMode !== "html" && options.parsingMode !== "xml")) {
    throw new Error("options must exist and contain a parsingMode of html or xml");
  }

  core.Node.call(this, "#document");
  this._parsingMode = options.parsingMode;
  this._implementation = new core.DOMImplementation(this);
  this._documentElement = null;
  this._ids = Object.create(null);
  this._attached = true;
  this._ownerDocument = this;
  this._readonly = false;

  this._contentType = options.contentType;
  if (this._contentType === undefined) {
    this._contentType = this._parsingMode === "xml" ? "application/xml" : "text/html";
  }

  this._URL = options.url;
  if (this._URL === undefined) {
    this._URL = "about:blank";
  }
  this._location = new Location(this._URL, this);
};


var tagRegEx = /[^\w:\d_\.-]+/i;
var entRegEx = /[^\w\d_\-&;]+/;
var invalidAttrRegEx = /[\s"'>/=\u0000-\u001A]/;

inheritFrom(core.Node, core.Document, {
  nodeType : DOCUMENT_NODE,
  _elementBuilders : { },
  _defaultElementBuilder: function(document, tagName) {
    return new core.Element(document, tagName);
  },
  get contentType() { return this._contentType;},
  get compatMode() { return (this._parsingMode === "xml" || this.doctype) ? "CSS1Compat" : "BackCompat"; },
  get characterSet() { return "UTF-8"; },
  get inputEncoding() { return "UTF-8"; },
  get doctype() {
    for (var i = 0; i < this._childNodes.length; ++i) {
      if (this._childNodes[i].nodeType === DOCUMENT_TYPE_NODE) {
        return this._childNodes[i];
      }
    }
    return null;
  },
  get URL() {
    return this._URL;
  },
  get documentURI() {
    return this._URL;
  },
  get location() {
    return this._location;
  },
  get documentElement() {
    if (this._documentElement) {
      return this._documentElement;
    } else {
      for (var i = 0; i < this._childNodes.length; ++i) {
        if (this._childNodes[i].nodeType === ELEMENT_NODE) {
          this._documentElement = this._childNodes[i];
          return this._documentElement;
        }
      }
      return null;
    }
  },

  get implementation() { return this._implementation;},
  set implementation(implementation) { this._implementation = implementation;},
  get ownerDocument() { return null;},
  get readonly() { return this._readonly;},

  set parentWindow(window) {
    // Contextify does not support getters and setters, so we have to set them
    // on the original object instead.
    window._frame = function (name, frame) {
      if (typeof frame === 'undefined') {
        delete window[name];
      } else {
        defineGetter(window, name, function () { return frame.contentWindow; });
      }
    };
    this._parentWindow = window.getGlobal();
  },

  get defaultView() {
    return this.parentWindow;
  },

  toString: function () {
    return '[object HTMLDocument]';
  },

  _createElementNoTagNameValidation: function (tagName) {
    var element = (this._elementBuilders[tagName.toLowerCase()] || this._defaultElementBuilder)(this, tagName);
    element._namespaceURI = "http://www.w3.org/1999/xhtml";
    return element;
  },

  createElement: function (localName) {
    localName = String(localName);
    validateName(localName, core);
    if (this._parsingMode === "html") {
      localName = localName.toLowerCase();
    }

    return this._createElementNoTagNameValidation(localName);
  },

  /* returns DocumentFragment */
  createDocumentFragment: function() {
    return new core.DocumentFragment(this);
  },

  /* returns Attr */
  createAttribute: function (localName) {
    localName = String(localName);
    validateName(localName, core);

    return this._createAttributeNoNameValidation(localName);
  }, // raises: function(DOMException) {},

  _createAttributeNoNameValidation: function (localName) {
    return new core.Attr(this, localName, "");
  },

  appendChild : function(/* Node */ arg) {
    if (this.documentElement && arg.nodeType == ELEMENT_NODE) {
      throw new core.DOMException(HIERARCHY_REQUEST_ERR);
    }
    return core.Node.prototype.appendChild.call(this, arg);
  },

  removeChild : function(/* Node */ arg) {
    var ret = core.Node.prototype.removeChild.call(this, arg);
    if (arg == this._documentElement) {
      this._documentElement = null;// force a recalculation
    }
    return ret;
  },

  /* returns NodeList */
  getElementsByTagName: memoizeQuery(function(/* string */ name) {
    function filterByTagName(child) {
      if (child.nodeName && child.nodeType === ELEMENT_NODE)
      {
        if (name === "*") {
          return true;

        // case insensitivity for html
        } else if (child._ownerDocument && child._ownerDocument._doctype &&
                   //child._ownerDocument._doctype.name === "html" &&
                   child.nodeName.toLowerCase() === name.toLowerCase())
        {
          return true;
        } else if (child.nodeName.toLowerCase() === name.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
    return new core.NodeList(this.documentElement || this, core.mapper(this, filterByTagName, true));
  }),

  getElementsByClassName: function (className) {

    function filterByClassName(child) {
      if (!child) {
        return false;
      }

      var classString = child.className;
      if (classString) {
        var s = classString.split(" ");
        for (var i = 0; i < s.length; i++) {
          if (s[i] === className) {
            return true;
          }
        }
      }
      return false;
    }

    return new core.NodeList(this.ownerDocument || this, core.mapper(this, filterByClassName));
  },

  write: function (text) {
    if (this._writeAfterElement) {
      // If called from an script element directly (during the first tick),
      // the new elements are inserted right after that element.
      var tempDiv = this.createElement('div');
      setInnerHTML(this, tempDiv, text);

      var child = tempDiv.firstChild;
      var previous = this._writeAfterElement;
      var parent = this._writeAfterElement.parentNode;

      while (child) {
        var node = child;
        child = child.nextSibling;
        parent.insertBefore(node, previous.nextSibling);
        previous = node;
      }
    } else if (this.readyState === "loading") {
      // During page loading, document.write appends to the current element
      // Find the last child that has been added to the document.
      var node = this;
      while (node.lastChild && node.lastChild.nodeType === this.ELEMENT_NODE) {
        node = node.lastChild;
      }
      setInnerHTML(this, node, text || "<html><head></head><body></body></html>");
    } else if (text) {
      setInnerHTML(this, this, text);
    }
  }
});

core.Attr = function Attr(document, name, value) {
  core.Node.call(this, document);
  this._valueForAttrModified = value;
  this._name = name;
  this._ownerElement = null;
  this._namespaceURI = null;
  this._localName = name;
  this._prefix = null;
};
inheritFrom(core.Node, core.Attr, {
  nodeType : ATTRIBUTE_NODE,
  get namespaceURI() {
    return this._namespaceURI;
  },
  get prefix() {
    return this._prefix;
  },
  get localName() {
    return this._localName;
  },
  get name() {
    return this._name;
  },
  get ownerElement() {
    return this._ownerElement;
  },
  get nodeValue() {
    var val = '';
    for (var i=0,len=this._childNodes.length;i<len;i++) {
      var child = this._childNodes[i];
      val += child.nodeValue;
    }
    return val;
  },
  set nodeValue(value) {
    // readonly
    if (this._readonly) {
      throw new core.DOMException(NO_MODIFICATION_ALLOWED_ERR);
    }

    this._childNodes.length = 1;
    this._childNodes[0] = this._ownerDocument.createTextNode(value);
    this._modified();
    var prev = this._valueForAttrModified;
    this._nodeValue = value;
    if (this._ownerElement) {
      this._ownerElement._attrModified(this._name, value, prev);
    }
  },
  get specified() {
    return true;
  },
  get value() {
    return this.nodeValue;
  },
  set value(value) {
    this.nodeValue = value;
  },
  get parentNode() { return null;},

  insertBefore : function(/* Node */ newChild, /* Node*/ refChild){
    if (newChild.nodeType === CDATA_SECTION_NODE ||
        newChild.nodeType === ELEMENT_NODE)
    {
      throw new core.DOMException(HIERARCHY_REQUEST_ERR);
    }

    return core.Node.prototype.insertBefore.call(this, newChild, refChild);
  },

  appendChild : function(/* Node */ arg) {

    if (arg.nodeType === CDATA_SECTION_NODE ||
        arg.nodeType === ELEMENT_NODE)
    {
      throw new core.DOMException(HIERARCHY_REQUEST_ERR);
    }

    return core.Node.prototype.appendChild.call(this, arg);
  }

});
