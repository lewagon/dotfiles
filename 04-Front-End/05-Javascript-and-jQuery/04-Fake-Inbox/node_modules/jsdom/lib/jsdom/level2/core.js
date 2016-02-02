var core         = require("../level1/core");
var defineGetter = require('../utils').defineGetter;
var defineSetter = require('../utils').defineSetter;
var memoizeQuery = require('../utils').memoizeQuery;
var validateQname = require('../living/helpers/validate-names').qname;
var validateAndExtract = require('../living/helpers/validate-names').validateAndExtract;

core.NamedNodeMap.prototype.getNamedItemNS = function(/* string */ namespaceURI,
                                                      /* string */ localName)
{
  if (this._nsStore[namespaceURI] && this._nsStore[namespaceURI][localName]) {
    return this._nsStore[namespaceURI][localName];
  }
  return null;
};

core.NamedNodeMap.prototype.setNamedItemNS = function(/* Node */ arg)
{
  if (this._readonly) {
    throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);
  }

  if (this._ownerDocument !== arg.ownerDocument) {
    throw new core.DOMException(core.WRONG_DOCUMENT_ERR);
  }

  if (arg._ownerElement) {
    throw new core.DOMException(core.INUSE_ATTRIBUTE_ERR);
  }

  // readonly
  if (this._readonly === true) {
    throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);
  }


  if (!this._nsStore[arg.namespaceURI]) {
    this._nsStore[arg.namespaceURI] = {};
  }
  var existing = null;
  if (this._nsStore[arg.namespaceURI][arg.localName]) {
    var existing = this._nsStore[arg.namespaceURI][arg.localName];
  }

  this._nsStore[arg.namespaceURI][arg.localName] = arg;

  arg._ownerDocument = this._ownerDocument;

  return this.setNamedItem(arg);
};

core.NamedNodeMap.prototype.removeNamedItemNS = function(/*string */ namespaceURI,
                                                         /* string */ localName)
{

  if (this.readonly) {
    throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);
  }


  var parent = this._parentNode,
      found = null,
      defaults,
      clone,
      defaultEl,
      defaultAttr;

  if (this._nsStore[namespaceURI] &&
      this._nsStore[namespaceURI][localName])
  {
    found = this._nsStore[namespaceURI][localName];
    this.removeNamedItem(found.qualifiedName);
    delete this._nsStore[namespaceURI][localName];
  }

  if (!found) {
    throw new core.DOMException(core.NOT_FOUND_ERR);
  }

  return found;
};

core.NamedNodeMap.prototype._map = function(fn) {
  var ret = [], l = this.length, i = 0, node;
  for(i; i<l; i++) {
    node = this.item(i);
    if (fn && fn(node)) {
      ret.push(node);
    }
  }
  return ret;
};

core.Element.prototype.getAttribute = function(/* string */ name)
{
  var attr =  this.getAttributeNode(name);
  return attr && attr.value;
};

core.Element.prototype.getAttributeNode = function(/* string */ name)
{
  return this._attributes.$getNoNS(name);
};

core.Element.prototype.removeAttribute = function(/* string */ name)
{
  return this._attributes.$removeNoNS(name);
};

core.Element.prototype.getAttributeNS = function(/* string */ namespaceURI,
                                                 /* string */ localName)
{
  if (namespaceURI === "") {
    namespaceURI = null;
  }

  var attr =  this._attributes.$getNode(namespaceURI, localName);
  return attr && attr.value;
};

core.Element.prototype.setAttribute = function(/* string */ name,
                                               /* string */ value)
{
  this._attributes.$setNoNS(name, value);
};

core.Element.prototype._setAttributeNoValidation = function (name, value) {
  this._attributes.$setNoNS(name, value, true);
};

core.Element.prototype.setAttributeNS = function (namespace, name, value) {
  namespace = namespace !== null ? String(namespace) : namespace;
  name = String(name);
  value = String(value);

  var extracted = validateAndExtract(namespace, name, core);

  this._attributes.$set(extracted.localName, value, extracted.qualifiedName, extracted.prefix, extracted.namespace);
};

core.Element.prototype.removeAttributeNS = function(/* string */ namespaceURI,
                                                    /* string */ localName)
{
  if (namespaceURI === "") {
    namespaceURI = null;
  }

  this._attributes.$remove(namespaceURI, localName);
};

core.Element.prototype.getAttributeNodeNS = function(/* string */ namespaceURI,
                                                     /* string */ localName)
{
  if (namespaceURI === "") {
    namespaceURI = null;
  }

  return this._attributes.$getNode(namespaceURI, localName);
};

core.Element.prototype.setAttributeNodeNS = function(/* Attr */ newAttr)
{
  if (newAttr.ownerElement) {
    throw new core.DOMException(core.INUSE_ATTRIBUTE_ERR);
  }

  return this._attributes.$setNode(newAttr);
};

core.Element.prototype.getElementsByTagNameNS = memoizeQuery(function(/* String */ namespaceURI,
                                                         /* String */ localName)
{
  var nsPrefixCache = {};

  function filterByTagName(child) {
    var localMatch = child.localName === localName,
        nsMatch    = child.namespaceURI === namespaceURI;

    if ((localMatch || localName === "*") &&
        (nsMatch || namespaceURI === "*"))
    {
      if (child.nodeType === child.ELEMENT_NODE) {
        return true;
      }
    }
    return false;
  }

  return new core.NodeList(this.ownerDocument || this,
                           core.mapper(this, filterByTagName));
});

core.Element.prototype.hasAttribute = function(/* string */name)
{
  if (!this._attributes) {
    return false;
  }

  // Note: you might think you only need the latter condition. However, it makes a test case fail.
  // HOWEVER, that test case is for a XML DTD feature called "default attributes" that never was implemented by
  // browsers, so when we remove default attributes, we should be able to fix this code too.
  return !!this._attributes.$getNoNS(name) || !!this._attributes.$getNoNS(name.toLowerCase());
};

core.Element.prototype.hasAttributeNS = function(/* string */namespaceURI,
                                                 /* string */localName)
{
  if (namespaceURI === "") {
    namespaceURI = null;
  }

  return (this._attributes.getNamedItemNS(namespaceURI, localName) ||
          this.hasAttribute(localName));
};

core.Document.prototype.importNode = function(/* Node */ importedNode,
                                              /* bool */ deep)
{
  if (importedNode && importedNode.nodeType) {
    if (importedNode.nodeType === this.DOCUMENT_NODE ||
        importedNode.nodeType === this.DOCUMENT_TYPE_NODE) {
      throw new core.DOMException(core.NOT_SUPPORTED_ERR);
    }
  }

  var self = this,
      newNode = importedNode.cloneNode(deep, function(a, b) {
        b._prefix        = a._prefix;
        b._namespaceURI  = a._namespaceURI;
        b._localName     = a._localName;
      });

  function lastChance(el) {
    var attr, defaultEl, i, len;

    el._ownerDocument = self;
    if (el.id) {
      if (!self._ids) {self._ids = {};}
      if (!self._ids[el.id]) {self._ids[el.id] = [];}
      self._ids[el.id].push(el);
    }
    if (el._attributes) {
      var drop = [];
      el._attributes._ownerDocument = self;
      for (i=0,len=el._attributes.length; i < len; i++) {
        attr = el._attributes[i];
        attr._ownerDocument = self;
      }

      // Remove obsolete default nodes.
      for(i = 0; i < drop.length; ++i) {
        el._attributes.$removeNode(drop[i]);
      }

    }
  }

  if (deep) {
    core.visitTree(newNode, lastChance);
  }
  else {
    lastChance(newNode);
  }

  return newNode;
};

core.Document.prototype.createElementNS = function (namespace, qualifiedName) {
  namespace = namespace !== null ? String(namespace) : namespace;
  qualifiedName = String(qualifiedName);

  var extracted = validateAndExtract(namespace, qualifiedName, core);
  var element = this.createElement(extracted.localName);
  element._namespaceURI = extracted.namespace;
  element._prefix = extracted.prefix;

  return element;
};

core.Document.prototype.createAttributeNS = function (namespace, qualifiedName) {
  namespace = namespace !== null ? String(namespace) : namespace;
  qualifiedName = String(qualifiedName);

  var extracted = validateAndExtract(namespace, qualifiedName, core);
  attribute = this.createAttribute(extracted.qualifiedName);

  attribute._namespaceURI = extracted.namespace;
  attribute._prefix = extracted.prefix;
  attribute._localName = extracted.localName;
  attribute._name = extracted.qualifiedName;

  return attribute;
};

core.Document.prototype.getElementsByTagNameNS = function(/* String */ namespaceURI,
                                                          /* String */ localName)
{
  return core.Element.prototype.getElementsByTagNameNS.call(this,
                                                            namespaceURI,
                                                            localName);
};

core.Document.prototype.getElementById = function(id) {
  // return the first element
  return (this._ids && this._ids[id] && this._ids[id].length > 0 ? this._ids[id][0] : null);
};
