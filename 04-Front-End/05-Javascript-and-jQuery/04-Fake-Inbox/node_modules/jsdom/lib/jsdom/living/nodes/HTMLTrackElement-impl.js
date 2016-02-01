"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const resourceLoader = require("../../browser/resource-loader");

class HTMLTrackElementImpl extends HTMLElementImpl {
  get readyState() {
    return 0;
  }

  get src() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("src"));
  }
  set src(value) {
    this.setAttribute("src", value);
  }
}

module.exports = {
  implementation: HTMLTrackElementImpl
};
