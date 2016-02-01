"use strict";

const cssom = require("cssom");

const HTMLElementImpl = require("./HTMLElement-impl").implementation;
const LinkStyleImpl = require("./LinkStyle-impl").implementation;
const idlUtils = require("../generated/utils");

const internalConstants = require("../helpers/internal-constants");
const accept = internalConstants.accept;
const resourceLoader = require("../../browser/resource-loader");
const resolveHref = require("../../utils").resolveHref;

/**
 * @this {core.HTMLLinkElement|core.HTMLStyleElement}
 * @param {string} url
 * @param {cssom.CSSStyleSheet} sheet
 * @see http://dev.w3.org/csswg/cssom/#requirements-on-user-agents-implementing0
 */
function fetchStylesheet(url, sheet) {
  resourceLoader.load(this, url, data => {
    // TODO: abort if the content-type is not text/css, and the document is
    // in strict mode
    url = sheet.href = resourceLoader.resolveResourceUrl(this.ownerDocument, url);
    evaluateStylesheet.call(this, data, sheet, url);
  });
}
/**
 * @this {core.HTMLLinkElement|core.HTMLStyleElement}
 * @param {string} data
 * @param {cssom.CSSStyleSheet} sheet
 * @param {string} baseUrl
 */
function evaluateStylesheet(data, sheet, baseUrl) {
  // this is the element
  const newStyleSheet = cssom.parse(data);
  const spliceArgs = newStyleSheet.cssRules;
  spliceArgs.unshift(0, sheet.cssRules.length);
  Array.prototype.splice.apply(sheet.cssRules, spliceArgs);
  scanForImportRules.call(this, sheet.cssRules, baseUrl);
  this.ownerDocument.styleSheets.push(sheet);
}
/**
 * @this {core.HTMLLinkElement|core.HTMLStyleElement}
 * @param {cssom.CSSStyleSheet} sheet
 * @param {string} baseUrl
 */
function scanForImportRules(cssRules, baseUrl) {
  if (!cssRules) {
    return;
  }

  for (let i = 0; i < cssRules.length; ++i) {
    if (cssRules[i].cssRules) {
      // @media rule: keep searching inside it.
      scanForImportRules.call(this, cssRules[i].cssRules, baseUrl);
    } else if (cssRules[i].href) {
      // @import rule: fetch the resource and evaluate it.
      // See http://dev.w3.org/csswg/cssom/#css-import-rule
      //     If loading of the style sheet fails its cssRules list is simply
      //     empty. I.e. an @import rule always has an associated style sheet.
      fetchStylesheet.call(this, resolveHref(baseUrl, cssRules[i].href), this.sheet);
    }
  }
}

class HTMLLinkElementImpl extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);

    this.addEventListener("DOMNodeInsertedIntoDocument", () => {
      const wrapper = idlUtils.wrapperForImpl(this);
      if (!/(?:[ \t\n\r\f]|^)stylesheet(?:[ \t\n\r\f]|$)/i.test(wrapper.rel)) {
        // rel is a space-separated list of tokens, and the original rel types
        // are case-insensitive.
        return;
      }
      if (this.href) {
        fetchStylesheet.call(this, this.href, this.sheet);
      }
    });
  }

  get [accept]() {
    return "text/css,*/*;q=0.1";
  }

  get href() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("href"));
  }

  set href(value) {
    this.setAttribute("href", value);
  }
}

idlUtils.mixin(HTMLLinkElementImpl.prototype, LinkStyleImpl.prototype);

module.exports = {
  implementation: HTMLLinkElementImpl
};
