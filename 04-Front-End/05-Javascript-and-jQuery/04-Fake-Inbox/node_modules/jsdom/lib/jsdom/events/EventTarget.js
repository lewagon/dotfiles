"use strict";
var DOMException = require("../web-idl/DOMException");

module.exports = EventTarget;

function EventTarget() {
  this._events = Object.create(null);
}


EventTarget.prototype.addEventListener = function (type, callback, capture) {
  if (arguments.length < 2) {
    throw new TypeError("Expected at least 2 arguments for addEventListener");
  }

  type = String(type);

  if (callback === undefined || callback === null) {
    callback = null;
  } else if (typeof callback === "object") {
    callback = callback.handleEvent;
  } else if (typeof callback !== "function") {
    throw new TypeError("Only undefined, null, an object, or a function are allowed for the callback parameter");
  }

  capture = Boolean(capture);

  if (callback === null) {
    return;
  }

  if (this._events[type] === undefined) {
    this._events[type] = {
      capturing: [],
      bubbling: []
    };
  }

  var handlers = this._events[type][capture ? "capturing" : "bubbling"];
  if (handlers.indexOf(callback) !== -1) {
    return;
  }

  handlers.unshift(callback);
};

EventTarget.prototype.removeEventListener = function (type, callback, capture) {
  if (arguments.length < 2) {
    throw new TypeError("Expected at least 2 arguments for addEventListener");
  }

  type = String(type);

  if (callback === undefined || callback === null) {
    callback = null;
  } else if (typeof callback === "object") {
    callback = callback.handleEvent;
  } else if (typeof callback !== "function") {
    throw new TypeError("Only undefined, null, an object, or a function are allowed for the callback parameter");
  }

  capture = Boolean(capture);

  if (callback === null) {
    // Optimization, not in the spec.
    return;
  }

  if (this._events[type] === undefined) {
    return;
  }

  var handlers = this._events[type][capture ? "capturing" : "bubbling"];
  var idx = handlers.indexOf(callback);

  if (idx !== -1) {
    handlers.splice(idx, 1);
  }
};

EventTarget.prototype.dispatchEvent = function (event) {
  if (!("_bubbles" in event) || !("_cancelable" in event)) {
    throw new TypeError("Argument to dispatchEvent must be an Event");
  }

  if (event._type === null || event._type === "") {
    throw new DOMException(DOMException.INVALID_STATE_ERR, "Tried to dispatch an uninitialized event");
  }

  var targetList = [];

  event._target = this;

  //per the spec we gather the list of targets first to ensure
  //against dom modifications during actual event dispatch
  var target = this;
  var targetParent = target._parentNode;
  while (targetParent) {
    targetList.push(targetParent);
    target = targetParent;
    targetParent = target._parentNode;
  }
  targetParent = target.defaultView;
  if (targetParent) {
    targetList.push(targetParent);
  }

  var iterator = backwardIterator(targetList);

  event._eventPhase = event.CAPTURING_PHASE;
  dispatchPhase(event, iterator);

  iterator = singleIterator(event._target);
  event._eventPhase = event.AT_TARGET;
  dispatchPhase(event, iterator);

  if (event._bubbles) {
    iterator = forwardIterator(targetList);
    event._eventPhase = event.BUBBLING_PHASE;
    dispatchPhase(event, iterator);
  }

  event._currentTarget = null;
  event._eventPhase = event.NONE;

  return !event._canceled;
};

function forwardIterator(list) {
  var i = 0;
  var len = list.length;
  return function iterator() {
    return i < len ? list[i++] : null;
  };
}

function backwardIterator(list) {
  var i = list.length;
  return function iterator() {
    return i >= 0 ? list[--i] : null;
  };
}

function singleIterator(obj) {
  var i = 1;
  return function iterator() {
    return i-- ? obj : null;
  };
}

function dispatchPhase(event, iterator) {
  var target = iterator();

  while (target && !event._stopPropagation) {
    if (event._eventPhase === event.CAPTURING_PHASE || event._eventPhase === event.AT_TARGET) {
      callListeners(event, target, getListeners(target, event._type, true));
    }
    if (event._eventPhase === event.AT_TARGET || event._eventPhase === event.BUBBLING_PHASE) {
      callListeners(event, target, getListeners(target, event._type, false));
    }
    target = iterator();
  }
}

function callListeners(event, target, listeners) {
  var currentListener = listeners.length;
  while (currentListener--) {
    event._currentTarget = target;
    try {
      listeners[currentListener].call(target, event);
    } catch (e) {
      target.raise(
        "error", "Dispatching event '" + event._type + "' failed",
        { error: e, event: event }
      );
    }
  }
}

function getListeners(target, type, capturing) {
  var listeners;
  if (target._events[type]) {
    listeners = target._events[type][capturing ? "capturing" : "bubbling"];
  } else {
    listeners = [];
  }

  if (!capturing) {
    var traditionalHandler = target["on" + type];
    if (traditionalHandler) {
      var implementation = (target._ownerDocument ? target._ownerDocument.implementation
                                                  : target.document.implementation);

      if (implementation._hasFeature("ProcessExternalResources", "script")) {
        if (listeners.indexOf(traditionalHandler) === -1) {
          listeners.push(traditionalHandler);
        }
      }
    }
  }
  return listeners;
}
