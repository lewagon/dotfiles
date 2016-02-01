"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const resourceLoader = require("../../browser/resource-loader");

class HTMLAppletElementImpl extends HTMLElementImpl {
  get object() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("object"));
  }

  set object(V) {
    this.setAttribute("object", V);
  }

  get codeBase() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("codebase"));
  }

  set codeBase(V) {
    this.setAttribute("codebase", V);
  }
}

module.exports = {
  implementation: HTMLAppletElementImpl
};
