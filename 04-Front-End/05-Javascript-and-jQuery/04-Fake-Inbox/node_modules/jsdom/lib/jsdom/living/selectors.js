"use strict";
var nwmatcher = require("nwmatcher/src/nwmatcher-noqsa");
var memoizeQuery = require("../utils").memoizeQuery;

module.exports = function (core) {
  [core.Document, core.DocumentFragment, core.Element].forEach(function (Class) {
    Class.prototype.querySelector = memoizeQuery(function (selectors) {
      return addNwmatcher(this).first(String(selectors), this);
    });

    Class.prototype.querySelectorAll = memoizeQuery(function (selectors) {
      return new core.NodeList(addNwmatcher(this).select(String(selectors), this));
    });
  });

  core.Element.prototype.matches = memoizeQuery(function (selectors) {
    return addNwmatcher(this).match(this, selectors);
  });
};

// nwmatcher gets `document.documentElement` at creation-time, so we have to initialize lazily, since in the initial
// stages of Document initialization, there is no documentElement present yet.
function addNwmatcher(parentNode) {
  var document = parentNode._ownerDocument;

  if (!document._nwmatcher) {
    document._nwmatcher = nwmatcher({ document: document });
    document._nwmatcher.configure({ UNIQUE_ID: false });
  }

  return document._nwmatcher;
}
