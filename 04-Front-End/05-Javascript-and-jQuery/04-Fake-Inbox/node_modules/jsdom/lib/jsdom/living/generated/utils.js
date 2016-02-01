"use strict";

module.exports.mixin = function mixin(target, source) {
  const keys = Object.getOwnPropertyNames(source);
  for (let i = 0; i < keys.length; ++i) {
    if (keys[i] in target) {
      continue;
    }

    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
  }
};

module.exports.wrapperSymbol = Symbol("wrapper");
module.exports.implSymbol = Symbol("impl");

module.exports.wrapperForImpl = function (impl) {
  return impl ? impl[module.exports.wrapperSymbol] : null;
};

module.exports.implForWrapper = function (wrapper) {
  return wrapper ? wrapper[module.exports.implSymbol] : null;
};

module.exports.tryWrapperForImpl = function (impl) {
  const wrapper = module.exports.wrapperForImpl(impl);
  return wrapper ? wrapper : impl;
};

module.exports.tryImplForWrapper = function (wrapper) {
  const impl = module.exports.implForWrapper(wrapper);
  return impl ? impl : wrapper;
};
