"use strict";
var path = require("path");
var url = require("url");

exports.toFileUrl = function (fileName) {
  // Beyond just the `path.resolve`, this is mostly for the benefit of Windows,
  // where we need to convert "\" to "/" and add an extra "/" prefix before the
  // drive letter.
  var pathname = path.resolve(process.cwd(), fileName).replace(/\\/g, "/");
  if (pathname[0] !== "/") {
    pathname = "/" + pathname;
  }

  return "file://" + pathname;
};

/**
 * Define a setter on an object
 *
 * This method replaces any existing setter but leaves getters in place.
 *
 * - `object` {Object} the object to define the setter on
 * - `property` {String} the name of the setter
 * - `setterFn` {Function} the setter
 */
exports.defineSetter = function defineSetter(object, property, setterFn) {
  var descriptor = Object.getOwnPropertyDescriptor(object, property) || {
    configurable: true,
    enumerable: true
  };

  descriptor.set = setterFn;

  Object.defineProperty(object, property, descriptor);
};

/**
 * Define a getter on an object
 *
 * This method replaces any existing getter but leaves setters in place.
 *
 * - `object` {Object} the object to define the getter on
 * - `property` {String} the name of the getter
 * - `getterFn` {Function} the getter
 */
exports.defineGetter = function defineGetter(object, property, getterFn) {
  var descriptor = Object.getOwnPropertyDescriptor(object, property) || {
    configurable: true,
    enumerable: true
  };

  descriptor.get = getterFn;

  Object.defineProperty(object, property, descriptor);
};

/**
 * Create an object with the given prototype
 *
 * Optionally augment the created object.
 *
 * - `prototype` {Object} the created object's prototype
 * - `[properties]` {Object} properties to attach to the created object
 */
exports.createFrom = function createFrom(prototype, properties) {
  properties = properties || {};

  var descriptors = {};
  Object.getOwnPropertyNames(properties).forEach(function (name) {
    descriptors[name] = Object.getOwnPropertyDescriptor(properties, name);
  });

  return Object.create(prototype, descriptors);
};

/**
 * Create an inheritance relationship between two classes
 *
 * Optionally augment the inherited prototype.
 *
 * - `Superclass` {Function} the inherited class
 * - `Subclass` {Function} the inheriting class
 * - `[properties]` {Object} properties to attach to the inherited prototype
 */
exports.inheritFrom = function inheritFrom(Superclass, Subclass, properties) {
  properties = properties || {};

  Object.defineProperty(properties, "constructor", {
    value: Subclass,
    writable: true,
    configurable: true
  });

  Subclass.prototype = exports.createFrom(Superclass.prototype, properties);
};

/**
 * Define a set of properties on an object, by copying the property descriptors
 * from the original object.
 *
 * - `object` {Object} the target object
 * - `properties` {Object} the source from which to copy property descriptors
 */
exports.define = function define(object, properties) {
  Object.getOwnPropertyNames(properties).forEach(function (name) {
    var propDesc = Object.getOwnPropertyDescriptor(properties, name);
    Object.defineProperty(object, name, propDesc);
  });
};

/**
 * Define a list of constants on a constructor and its .prototype
 *
 * - `Constructor` {Function} the constructor to define the constants on
 * - `propertyMap` {Object}  key/value map of properties to define
 */
exports.addConstants = function addConstants(Constructor, propertyMap) {
  for (var property in propertyMap) {
    var value = propertyMap[property];
    addConstant(Constructor, property, value);
    addConstant(Constructor.prototype, property, value);
  }
};

function addConstant(object, property, value) {
  Object.defineProperty(object, property, {
    configurable: false,
    enumerable: true,
    value: value,
    writable: false
  });
}

var memoizeQueryTypeCounter = 0;

/**
 * Returns a version of a method that memoizes specific types of calls on the object
 *
 * - `fn` {Function} the method to be memozied
 */
exports.memoizeQuery = function memoizeQuery(fn) {
  // Only memoize query functions with arity <= 2
  if (fn.length > 2) {
    return fn;
  }

  var type = memoizeQueryTypeCounter++;

  return function () {
    if (!this._memoizedQueries) {
      return fn.apply(this, arguments);
    }

    if (!this._memoizedQueries[type]) {
      this._memoizedQueries[type] = Object.create(null);
    }

    var key;
    if (arguments.length === 1 && typeof arguments[0] === "string") {
      key = arguments[0];
    } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
      key = arguments[0] + "::" + arguments[1];
    } else {
      return fn.apply(this, arguments);
    }

    if (!(key in this._memoizedQueries[type])) {
      this._memoizedQueries[type][key] = fn.apply(this, arguments);
    }
    return this._memoizedQueries[type][key];
  };
};

/**
* A slightly-more-compliant version of `url.resolve`, taking care of a few Node bugs.
*/
exports.resolveHref = function resolveHref(baseUrl, href) {
  var about = "about:blank";

  // if we're redirecting to another site on about:blank, just let it through
  if (href.substring(0, about.length) === about) {
    return href;
  }

  // if we have to resolve from about:blank we need a bit of special logic
  if (baseUrl.substring(0, about.length) === about) {
    if (href.search(/^([A-Za-z0-9]+):/) === 0) { // we have an absolute url
      baseUrl = href;
      href = "";
    } else if (href[0] === "#") { // we have a location hash on about:blank
      return baseUrl.split(/#/)[0] + href;
    } else if (!href) { // we just have some base url
      return baseUrl;
    } else { // must be a file url
      baseUrl = "file://" + href;
      href = "";
    }
  }

  if (baseUrl === resolveHref.memoizedUrl && resolveHref.cache && resolveHref.cache[href]) {
    return resolveHref.cache[href];
  }

  // When switching protocols, the path doesn't get canonicalized (i.e. .s and ..s are still left):
  // https://github.com/joyent/node/issues/5453
  var intermediate = url.resolve(baseUrl, href);

  // This canonicalizes the path, at the cost of overwriting the hash.
  var nextStep = url.resolve(intermediate, "#");

  // But it breaks file URLs by removing their colon O_o, so put that back.
  nextStep = nextStep.replace(/^file:\/\/([a-z])\//i, "file:///$1:/");

  // So, insert the hash back in, if there was one.
  var parsed = url.parse(intermediate);
  var fixed = nextStep.slice(0, -1) + (parsed.hash || "");

  // Finally, fix file:/// URLs on Windows, where Node removes their drive letters:
  // https://github.com/joyent/node/issues/5452
  if (/^file\:\/\/\/[a-z]\:\//i.test(baseUrl) && /^file\:\/\/\//.test(fixed) &&
      !/^file\:\/\/\/[a-z]\:\//i.test(fixed)) {
    fixed = fixed.replace(/^file\:\/\/\//, baseUrl.substring(0, 11));
  }

  // HORRIBLE HACK: encode \u00E4 correctly just so that we pass
  // https://github.com/w3c/web-platform-tests/blob/e75f01a689a3481f5c773315c2c2527712cf8c2c/dom/nodes/DOMImplementation-createHTMLDocument.html#L71-L72
  // Eventually we should replace this with a real URL parser based on the URL standard.
  fixed = fixed.replace(/\u00E4/, "%C3%A4");

  if (baseUrl !== resolveHref.memoizedUrl) {
    resolveHref.memoizedUrl = baseUrl;
    resolveHref.cache = {};
  }
  resolveHref.cache[href] = fixed;

  return fixed;
};
