"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const resourceLoader = require("../../browser/resource-loader");
const internalConstants = require("../helpers/internal-constants");
const accept = internalConstants.accept;
const conversions = require("webidl-conversions");

class HTMLImageElementImpl extends HTMLElementImpl {
  _attrModified(name, value, oldVal) {
    if (name === "src" && value !== oldVal) {
      resourceLoader.enqueue(this, null, () => { })();
    }

    super._attrModified.call(this, name, value, oldVal);
  }

  get [accept]() {
    return "image/png,image/*;q=0.8,*/*;q=0.5";
  }

  get src() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("src"));
  }

  set src(value) {
    this.setAttribute("src", value);
  }

  get height() {
    if (this.hasAttribute("height")) {
      return conversions["unsigned long"](this.getAttribute("height"));
    }
    return 0;
  }

  set height(V) {
    this.setAttribute("height", String(V));
  }

  get width() {
    if (this.hasAttribute("width")) {
      return conversions["unsigned long"](this.getAttribute("width"));
    }
    return 0;
  }

  set width(V) {
    this.setAttribute("width", String(V));
  }
}

module.exports = {
  implementation: HTMLImageElementImpl
};
