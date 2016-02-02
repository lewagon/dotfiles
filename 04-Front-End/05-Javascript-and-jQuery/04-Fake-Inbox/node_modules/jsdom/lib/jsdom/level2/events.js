/* DOM Level2 Events implemented as described here:
 *
 * http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 *
 */
var core = require("../level1/core"),
    utils = require("../utils"),
    defineGetter = utils.defineGetter,
    defineSetter = utils.defineSetter,
    inheritFrom = utils.inheritFrom;

core.Event = function(eventType, eventInit) {
    this._type = eventType || null;

    if (eventInit === undefined || eventInit === null) {
      eventInit = {};
    }
    if (typeof eventInit !== "object") {
      throw new TypeError("cannot convert eventInit argument to a dictionary");
    }
    this._bubbles = Boolean(eventInit.bubbles);
    this._cancelable = Boolean(eventInit.cancelable);

    this._target = null;
    this._currentTarget = null;
    this._eventPhase = 0;
    this._timeStamp = null;
    this._stopPropagation = false;
    this._canceled = false;
};

core.Event.prototype = {
    initEvent: function(type, bubbles, cancelable) {
        this._type = type;
        this._bubbles = bubbles;
        this._cancelable = cancelable;
    },
    preventDefault: function() {
        if (this._cancelable) {
            this._canceled = true;
        }
    },
    stopPropagation: function() {
        this._stopPropagation = true;
    },
    NONE            : 0,
    CAPTURING_PHASE : 1,
    AT_TARGET       : 2,
    BUBBLING_PHASE  : 3,
    get type() { return this._type; },
    get bubbles() { return this._bubbles; },
    get cancelable() { return this._cancelable; },
    get target() { return this._target; },
    get currentTarget() { return this._currentTarget; },
    get eventPhase() { return this._eventPhase; },
    get timeStamp() { return this._timeStamp; },
    get defaultPrevented() { return this._canceled; }
};


core.UIEvent = function(eventType, eventInit) {
    core.Event.call(this, eventType, eventInit);
    this.view = null;
    this.detail = null;
};
inheritFrom(core.Event, core.UIEvent, {
    initUIEvent: function(type, bubbles, cancelable, view, detail) {
        this.initEvent(type, bubbles, cancelable);
        this.view = view;
        this.detail = detail;
    },
});


core.MouseEvent = function(eventType, eventInit) {
    core.UIEvent.call(this, eventType, eventInit);
    this.screenX = null;
    this.screenY = null;
    this.clientX = null;
    this.clientY = null;
    this.ctrlKey = null;
    this.shiftKey = null;
    this.altKey = null;
    this.metaKey = null;
    this.button = null;
    this.relatedTarget = null;
};
inheritFrom(core.UIEvent, core.MouseEvent, {
    initMouseEvent:   function(type,
                               bubbles,
                               cancelable,
                               view,
                               detail,
                               screenX,
                               screenY,
                               clientX,
                               clientY,
                               ctrlKey,
                               altKey,
                               shiftKey,
                               metaKey,
                               button,
                               relatedTarget) {
        this.initUIEvent(type, bubbles, cancelable, view, detail);
        this.screenX  = screenX
        this.screenY  = screenY
        this.clientX  = clientX
        this.clientY  = clientY
        this.ctrlKey  = ctrlKey
        this.shiftKey  = shiftKey
        this.altKey  = altKey
        this.metaKey  = metaKey
        this.button  = button
        this.relatedTarget  = relatedTarget
    }
});


core.MutationEvent = function(eventType, eventInit) {
    core.Event.call(this, eventType, eventInit);
    this.relatedNode = null;
    this.prevValue = null;
    this.newValue = null;
    this.attrName = null;
    this.attrChange = null;
};
inheritFrom(core.Event, core.MutationEvent, {
    initMutationEvent:   function(type,
                                  bubbles,
                                  cancelable,
                                  relatedNode,
                                  prevValue,
                                  newValue,
                                  attrName,
                                  attrChange) {
        this.initEvent(type, bubbles, cancelable);
        this.relatedNode = relatedNode;
        this.prevValue = prevValue;
        this.newValue = newValue;
        this.attrName = attrName;
        this.attrChange = attrChange;
    },
    MODIFICATION : 1,
    ADDITION     : 2,
    REMOVAL      : 3
});

core.EventTarget = require('../events/EventTarget');

// Reinherit class heirarchy with EventTarget at its root
inheritFrom(core.EventTarget, core.Node, core.Node.prototype);

// Node
inheritFrom(core.Node, core.Attr, core.Attr.prototype);
inheritFrom(core.Node, core.Document, core.Document.prototype);
inheritFrom(core.Node, core.DocumentFragment, core.DocumentFragment.prototype);
inheritFrom(core.Node, core.Element, core.Element.prototype);


function getDocument(el) {
  return el.nodeType == core.Node.DOCUMENT_NODE ? el : el._ownerDocument;
}

function mutationEventsEnabled(el) {
  return el.nodeType != core.Node.ATTRIBUTE_NODE &&
         getDocument(el).implementation._hasFeature('MutationEvents');
}

var insertBefore_super = core.Node.prototype.insertBefore;
core.Node.prototype.insertBefore = function(newChild, refChild) {
  var ret = insertBefore_super.apply(this, arguments);
  if (mutationEventsEnabled(this)) {
    var doc = getDocument(this),
        ev = doc.createEvent("MutationEvents");

    ev.initMutationEvent("DOMNodeInserted", true, false, this, null, null, null, null);
    newChild.dispatchEvent(ev);
    if (this.nodeType == core.Node.DOCUMENT_NODE || this._attachedToDocument) {
      ev = doc.createEvent("MutationEvents");
      ev.initMutationEvent("DOMNodeInsertedIntoDocument", false, false, null, null, null, null, null);
      core.visitTree(newChild, function(el) {
        if (el.nodeType == core.Node.ELEMENT_NODE) {
          el.dispatchEvent(ev);
          el._attachedToDocument = true;
        }
      });
    }
  }
  return ret;
};

var removeChild_super = core.Node.prototype.removeChild;
core.Node.prototype.removeChild = function (oldChild) {
  if (mutationEventsEnabled(this)) {
    var doc = getDocument(this),
        ev = doc.createEvent("MutationEvents");

    ev.initMutationEvent("DOMNodeRemoved", true, false, this, null, null, null, null);
    oldChild.dispatchEvent(ev);

    ev = doc.createEvent("MutationEvents");
    ev.initMutationEvent("DOMNodeRemovedFromDocument", false, false, null, null, null, null, null);
    core.visitTree(oldChild, function(el) {
      if (el.nodeType == core.Node.ELEMENT_NODE) {
        el.dispatchEvent(ev);
        el._attachedToDocument = false;
      }
    });
  }
  return removeChild_super.apply(this, arguments);
};

function dispatchAttrEvent(doc, target, prevVal, newVal, attrName, attrChange) {
  if (!newVal || newVal != prevVal) {
    var ev = doc.createEvent("MutationEvents");
    ev.initMutationEvent("DOMAttrModified", true, false, target, prevVal,
                         newVal, attrName, attrChange);
    target.dispatchEvent(ev);
  }
}

function attrNodeInterceptor(_super, change) {
  return function(node) {
    var target = this._parentNode,
        prev = _super.apply(this, arguments);

    if (mutationEventsEnabled(target)) {
      dispatchAttrEvent(target._ownerDocument,
                        target,
                        prev && prev.value || null,
                        change == 'ADDITION' ? node.value : null,
                        prev && prev.name || node.name,
                        core.MutationEvent.prototype[change]);
    }

    return prev;
  };
}

function attrInterceptor(_super, ns) {
  return function(localName, value, _name, _prefix, _namespace) {
    var target = this._parentNode,
        namespace = _namespace; // do not reassign parameters when using "arguments" (performance)

    if (!mutationEventsEnabled(target)) {
      _super.apply(this, arguments);
      return;
    }

    if (namespace === undefined) {
        namespace = null;
    }

    var prev =
          ns ? this.$getNode(namespace, localName) : this.$getNoNS(localName);
    var prevVal = prev && prev.value || null;

    _super.apply(this, arguments);

    var node = ns ? this.$getNode(namespace, localName):
            this.$getNoNS(localName);

    dispatchAttrEvent(target._ownerDocument,
                      target,
                      prevVal,
                      node.value,
                      node.name,
                      core.MutationEvent.prototype.ADDITION);
  };
}


core.AttributeList.prototype.$removeNode = attrNodeInterceptor(core.AttributeList.prototype.$removeNode, 'REMOVAL');
core.AttributeList.prototype.$setNode = attrNodeInterceptor(core.AttributeList.prototype.$setNode, 'ADDITION');
core.AttributeList.prototype.$set = attrInterceptor(core.AttributeList.prototype.$set, true);
core.AttributeList.prototype.$setNoNS = attrInterceptor(core.AttributeList.prototype.$setNoNS, false);

var interfaceTable = {
  event: core.Event,
  events: core.Event,
  htmlevents: core.Event,
  mouseevent: core.MouseEvent,
  mouseevents: core.MouseEvent,
  uievent: core.UIEvent,
  uievents: core.UIEvent,

  // alias unimplemented interfaces to Event
  customevent: core.Event, // CustomEvent
  keyboardevent: core.Event, // KeyboardEvent
  keyevents: core.Event, // KeyboardEvent
  messageevent: core.Event, // MessageEvent
  touchevent: core.Event, // TouchEvent

  // old, not part of spec anymore
  mutationevents: core.MutationEvent
};

core.Document.prototype.createEvent = function (type) {
  var typeLower = type.toLowerCase();
  var Constructor = interfaceTable[typeLower] || null;

  if (!Constructor) {
    throw new core.DOMException(core.DOMException.NOT_SUPPORTED_ERR,
      "The provided event type (\"" + type + "\") is invalid");
  }

  return new Constructor("");
};
