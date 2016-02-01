"use strict";

/* eslint global-require: 0 */

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const notImplemented = require("../../browser/not-implemented");
let Canvas;
try {
  Canvas = require("canvas");
} catch (e) {
  // Do nothing
}

class HTMLCanvasElementImpl extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);

    if (typeof Canvas === "function") { // in browserify, the require will succeed but return an empty object
      this._nodeCanvas = new Canvas(this.width, this.height);
    }
  }

  _attrModified(name) {
    if ((name === "width" || name === "height") && this._nodeCanvas) {
      this._nodeCanvas = new Canvas(this.width, this.height);
    }

    return super._attrModified.apply(this, arguments);
  }

  getContext(contextId) {
    if (this._nodeCanvas) {
      return this._nodeCanvas.getContext(contextId) || null;
    }

    notImplemented("HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)",
      this._ownerDocument._defaultView);
  }

  probablySupportsContext(contextId) {
    if (this._nodeCanvas) {
      return contextId === "2d";
    }
    return false;
  }

  setContext() {
    notImplemented("HTMLCanvasElement.prototype.setContext");
  }

  toDataURL() {
    if (this._nodeCanvas) {
      return this._nodeCanvas.toDataURL.apply(this._nodeCanvas, arguments);
    }

    notImplemented("HTMLCanvasElement.prototype.toDataURL (without installing the canvas npm package)",
      this._ownerDocument._defaultView);
  }

  get width() {
    const parsed = parseInt(this.getAttribute("width"));
    return isNaN(parsed) || parsed < 0 || parsed > 2147483647 ? 300 : parsed;
  }

  set width(v) {
    v = v > 2147483647 ? 300 : v;
    this.setAttribute("width", String(v));
  }

  get height() {
    const parsed = parseInt(this.getAttribute("height"));
    return isNaN(parsed) || parsed < 0 || parsed > 2147483647 ? 150 : parsed;
  }

  set height(v) {
    v = v > 2147483647 ? 150 : v;
    this.setAttribute("height", String(v));
  }
}

module.exports = {
  implementation: HTMLCanvasElementImpl
};
