"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const whatwgURL = require("whatwg-url");
const documentBaseURL = require("../helpers/document-base-url").documentBaseURL;
const fallbackBaseURL = require("../helpers/document-base-url").fallbackBaseURL;
const resolveURLToResultingParsedURL = require("../helpers/document-base-url").resolveURLToResultingParsedURL;

class HTMLBaseElement extends HTMLElementImpl {
  get href() {
    if (!this.hasAttribute("href")) {
      return documentBaseURL(this._ownerDocument);
    }

    const fbbu = fallbackBaseURL(this._ownerDocument);
    const url = this.getAttribute("href");

    try {
      return whatwgURL.serializeURL(resolveURLToResultingParsedURL(url, fbbu));
    } catch (e) {
      return "";
    }
  }

  set href(value) {
    this.setAttribute("href", String(value));
  }
}

module.exports = {
  implementation: HTMLBaseElement
};
