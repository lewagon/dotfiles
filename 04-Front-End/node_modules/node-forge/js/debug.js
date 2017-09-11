/**
 * Debugging support for web applications.
 *
 * @author David I. Lehn <dlehn@digitalbazaar.com>
 *
 * Copyright 2008-2013 Digital Bazaar, Inc.
 */
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {

/* DEBUG API */
forge.debug = forge.debug || {};

// Private storage for debugging.
// Useful to expose data that is otherwise unviewable behind closures.
// NOTE: remember that this can hold references to data and cause leaks!
// format is "forge._debug.<modulename>.<dataname> = data"
// Example:
// (function() {
//   var cat = 'forge.test.Test'; // debugging category
//   var sState = {...}; // local state
//   forge.debug.set(cat, 'sState', sState);
// })();
forge.debug.storage = {};

/**
 * Gets debug data. Omit name for all cat data  Omit name and cat for
 * all data.
 *
 * @param cat name of debugging category.
 * @param name name of data to get (optional).
 * @return object with requested debug data or undefined.
 */
forge.debug.get = function(cat, name) {
  var rval;
  if(typeof(cat) === 'undefined') {
    rval = forge.debug.storage;
  } else if(cat in forge.debug.storage) {
    if(typeof(name) === 'undefined') {
      rval = forge.debug.storage[cat];
    } else {
      rval = forge.debug.storage[cat][name];
    }
  }
  return rval;
};

/**
 * Sets debug data.
 *
 * @param cat name of debugging category.
 * @param name name of data to set.
 * @param data data to set.
 */
forge.debug.set = function(cat, name, data) {
  if(!(cat in forge.debug.storage)) {
    forge.debug.storage[cat] = {};
  }
  forge.debug.storage[cat][name] = data;
};

/**
 * Clears debug data. Omit name for all cat data. Omit name and cat for
 * all data.
 *
 * @param cat name of debugging category.
 * @param name name of data to clear or omit to clear entire category.
 */
forge.debug.clear = function(cat, name) {
  if(typeof(cat) === 'undefined') {
    forge.debug.storage = {};
  } else if(cat in forge.debug.storage) {
    if(typeof(name) === 'undefined') {
      delete forge.debug.storage[cat];
    } else {
      delete forge.debug.storage[cat][name];
    }
  }
};

} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'debug';
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    var nodeJS = true;
    define = function(ids, factory) {
      factory(require, module);
    };
  } else {
    // <script>
    if(typeof forge === 'undefined') {
      forge = {};
    }
    return initModule(forge);
  }
}
// AMD
var deps;
var defineFunc = function(require, module) {
  module.exports = function(forge) {
    var mods = deps.map(function(dep) {
      return require(dep);
    }).concat(initModule);
    // handle circular dependencies
    forge = forge || {};
    forge.defined = forge.defined || {};
    if(forge.defined[name]) {
      return forge[name];
    }
    forge.defined[name] = true;
    for(var i = 0; i < mods.length; ++i) {
      mods[i](forge);
    }
    return forge[name];
  };
};
var tmpDefine = define;
define = function(ids, factory) {
  deps = (typeof ids === 'string') ? factory.slice(2) : ids.slice(2);
  if(nodeJS) {
    delete define;
    return tmpDefine.apply(null, Array.prototype.slice.call(arguments, 0));
  }
  define = tmpDefine;
  return define.apply(null, Array.prototype.slice.call(arguments, 0));
};
define(['require', 'module'], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();
