"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const impl = utils.implSymbol;

function Location() {
  throw new TypeError("Illegal constructor");
}


Location.prototype.assign = function assign(url) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'assign' on 'Location': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  return utils.tryWrapperForImpl(this[impl].assign.apply(this[impl], args));
};

Location.prototype.replace = function replace(url) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'replace' on 'Location': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  return utils.tryWrapperForImpl(this[impl].replace.apply(this[impl], args));
};

Location.prototype.reload = function reload() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 0; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  return utils.tryWrapperForImpl(this[impl].reload.apply(this[impl], args));
};
Object.defineProperty(Location.prototype, "href", {
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

Location.prototype.toString = function () {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this.href;
};

Object.defineProperty(Location.prototype, "origin", {
  get() {
    return utils.tryWrapperForImpl(this[impl].origin);
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Location.prototype, "protocol", {
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

Object.defineProperty(Location.prototype, "host", {
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

Object.defineProperty(Location.prototype, "hostname", {
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

Object.defineProperty(Location.prototype, "port", {
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

Object.defineProperty(Location.prototype, "pathname", {
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

Object.defineProperty(Location.prototype, "search", {
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

Object.defineProperty(Location.prototype, "hash", {
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
    let obj = Object.create(Location.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(Location.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
    Object.defineProperty(obj, "valueOf", {
      value: function valueOf() { return this; },
      enumerable: true
    });

  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: Location,
  expose: {
    Window: { Location: Location }
  }
};


const Impl = require("../window/Location-impl.js");
