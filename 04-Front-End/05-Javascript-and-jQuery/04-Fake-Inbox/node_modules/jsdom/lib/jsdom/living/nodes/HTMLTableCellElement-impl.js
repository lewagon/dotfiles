"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;
const idlUtils = require("../generated/utils");

const domSymbolTree = require("../helpers/internal-constants").domSymbolTree;
const closest = require("../helpers/traversal").closest;

class HTMLTableCellImpl extends HTMLElementImpl {
  set headers(h) {
    if (h === "") {
      // Handle resetting headers so the dynamic getter returns a query
      this._headers = null;
      return;
    }
    if (!(h instanceof Array)) {
      h = [h];
    }
    this._headers = h;
  }

  get headers() {
    if (this._headers) {
      return this._headers.join(" ");
    }
    const cellIndex = this.cellIndex;
    const headings = [];
    const siblings = domSymbolTree.parent(this).getElementsByTagName(this.tagName);

    for (let i = 0; i < siblings.length; i++) {
      if (siblings.item(i).cellIndex >= cellIndex) {
        break;
      }
      headings.push(siblings.item(i).id);
    }
    this._headers = headings;
    return headings.join(" ");
  }

  get cellIndex() {
    return Array.prototype.indexOf.call(closest(this, "tr").cells, idlUtils.wrapperForImpl(this));
  }

  get colSpan() {
    const value = this.getAttribute("colspan");
    return value === null ? 1 : value;
  }

  set colSpan(V) {
    this.setAttribute("colspan", String(V));
  }

  get rowSpan() {
    const value = this.getAttribute("rowspan");
    return value === null ? 1 : value;
  }

  set rowSpan(V) {
    this.setAttribute("rowspan", String(V));
  }
}

module.exports = {
  implementation: HTMLTableCellImpl
};
