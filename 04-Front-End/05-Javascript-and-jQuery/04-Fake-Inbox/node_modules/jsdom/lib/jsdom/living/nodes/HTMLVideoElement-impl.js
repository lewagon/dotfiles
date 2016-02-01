"use strict";

const HTMLMediaElementImpl = require("./HTMLMediaElement-impl").implementation;

const resourceLoader = require("../../browser/resource-loader");

class HTMLVideoElementImpl extends HTMLMediaElementImpl {
  get poster() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("poster"));
  }

  set poster(value) {
    this.setAttribute("poster", value);
  }

  get videoWidth() {
    return 0;
  }

  get videoHeight() {
    return 0;
  }
}

module.exports = {
  implementation: HTMLVideoElementImpl
};
