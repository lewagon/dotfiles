"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const impl = utils.implSymbol;

function HTMLHyperlinkElementUtils() {
  throw new TypeError("Illegal constructor");
}

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "href", {
  get() {
    return utils.tryWrapperForImpl(this[impl].href);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].href = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

HTMLHyperlinkElementUtils.prototype.toString = function () {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this.href;
};

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "origin", {
  get() {
    return utils.tryWrapperForImpl(this[impl].origin);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "protocol", {
  get() {
    return utils.tryWrapperForImpl(this[impl].protocol);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].protocol = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "username", {
  get() {
    return utils.tryWrapperForImpl(this[impl].username);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].username = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "password", {
  get() {
    return utils.tryWrapperForImpl(this[impl].password);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].password = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "host", {
  get() {
    return utils.tryWrapperForImpl(this[impl].host);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].host = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "hostname", {
  get() {
    return utils.tryWrapperForImpl(this[impl].hostname);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hostname = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "port", {
  get() {
    return utils.tryWrapperForImpl(this[impl].port);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].port = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "pathname", {
  get() {
    return utils.tryWrapperForImpl(this[impl].pathname);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].pathname = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "search", {
  get() {
    return utils.tryWrapperForImpl(this[impl].search);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].search = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(HTMLHyperlinkElementUtils.prototype, "hash", {
  get() {
    return utils.tryWrapperForImpl(this[impl].hash);
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hash = utils.tryImplForWrapper(V);
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  mixedInto: [],
  is(obj) {
    if (obj) {
      if (obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (let i = 0; i < module.exports.mixedInto.length; ++i) {
        if (obj instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      const wrapper = utils.wrapperForImpl(obj);
      for (let i = 0; i < module.exports.mixedInto.length; ++i) {
        if (wrapper instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(HTMLHyperlinkElementUtils.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(HTMLHyperlinkElementUtils.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: HTMLHyperlinkElementUtils,
  expose: {
    
  }
};


const Impl = require("../nodes/HTMLHyperlinkElementUtils-impl.js");
