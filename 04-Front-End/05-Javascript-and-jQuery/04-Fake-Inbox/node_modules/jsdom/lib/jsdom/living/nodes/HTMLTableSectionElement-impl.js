"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;
const idlUtils = require("../generated/utils");

const mapper = require("../../utils").mapper;
const createHTMLCollection = require("../../living/html-collection").create;
const DOMException = require("../../web-idl/DOMException");

function descendants(e, tagName, recursive) {
  const owner = recursive ? e._ownerDocument || e : e;
  return createHTMLCollection(owner, mapper(e, n => n.tagName === tagName, recursive));
}

class HTMLTableSectionElementImpl extends HTMLElementImpl {
  get rows() {
    if (!this._rows) {
      this._rows = descendants(this, "TR", false);
    }
    return this._rows;
  }

  insertRow(index) {
    const tr = this._ownerDocument.createElement("TR");
    const rows = this.rows;
    if (index < -1 || index > rows.length) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    if (index === -1 || index === rows.length) {
      this.appendChild(tr);
    } else {
      const ref = idlUtils.implForWrapper(rows[index]);
      this.insertBefore(tr, ref);
    }
    return tr;
  }

  deleteRow(index) {
    const rows = this.rows;
    if (index === -1) {
      index = rows.length - 1;
    }
    if (index < 0 || index >= rows.length) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    const tr = idlUtils.implForWrapper(rows[index]);
    this.removeChild(tr);
  }
}

module.exports = {
  implementation: HTMLTableSectionElementImpl
};
