"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const resourceLoader = require("../../browser/resource-loader");
const closest = require("../helpers/traversal").closest;

class HTMLObjectElementImpl extends HTMLElementImpl {
  get form() {
    return closest(this, "form");
  }

  get contentDocument() {
    return null;
  }

  get data() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("data"));
  }

  set data(V) {
    this.setAttribute("data", V);
  }

  get codeBase() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("codebase"));
  }

  set codeBase(V) {
    this.setAttribute("codebase", V);
  }
}

module.exports = {
  implementation: HTMLObjectElementImpl
};
