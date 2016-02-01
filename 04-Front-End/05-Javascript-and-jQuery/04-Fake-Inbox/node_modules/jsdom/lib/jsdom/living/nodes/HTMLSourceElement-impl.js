"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const resourceLoader = require("../../browser/resource-loader");

class HTMLSourceElementImpl extends HTMLElementImpl {
  get src() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("src"));
  }

  set src(value) {
    this.setAttribute("src", value);
  }
}

module.exports = {
  implementation: HTMLSourceElementImpl
};
