"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const mapper = require("../../utils").mapper;
const domSymbolTree = require("../helpers/internal-constants").domSymbolTree;
const createHTMLCollection = require("../../living/html-collection").create;
const DOMException = require("../../web-idl/DOMException");
const idlUtils = require("../generated/utils");

function descendants(e, tagName, recursive) {
  const owner = recursive ? e._ownerDocument || e : e;
  return createHTMLCollection(owner, mapper(e, n => n.tagName === tagName, recursive));
}

function firstChild(e, tagName) {
  if (!e) {
    return null;
  }
  const c = descendants(e, tagName, false);
  return c.length > 0 ? idlUtils.implForWrapper(c[0]) : null;
}

class HTMLTableElementImpl extends HTMLElementImpl {
  get caption() {
    return firstChild(this, "CAPTION");
  }

  get tHead() {
    return firstChild(this, "THEAD");
  }

  get tFoot() {
    return firstChild(this, "TFOOT");
  }

  get rows() {
    if (!this._rows) {
      const table = this;
      this._rows = createHTMLCollection(this._ownerDocument, () => {
        const sections = [];
        if (table.tHead) {
          sections.push(table.tHead);
        }
        sections.push.apply(sections, table.tBodies);
        if (table.tFoot) {
          sections.push(table.tFoot);
        }

        if (sections.length === 0) {
          return domSymbolTree.childrenToArray(table, { filter: el => el.tagName === "TR" });
        }

        const rows = [];
        for (const s of sections) {
          rows.push.apply(rows, s.rows);
        }
        return rows;
      });
    }
    return this._rows;
  }

  get tBodies() {
    if (!this._tBodies) {
      this._tBodies = descendants(this, "TBODY", false);
    }
    return this._tBodies;
  }

  createTHead() {
    let el = this.tHead;
    if (!el) {
      el = this._ownerDocument.createElement("THEAD");
      this.appendChild(el);
    }
    return el;
  }

  deleteTHead() {
    const el = this.tHead;
    if (el) {
      domSymbolTree.parent(el).removeChild(el);
    }
  }

  createTFoot() {
    let el = this.tFoot;
    if (!el) {
      el = this._ownerDocument.createElement("TFOOT");
      this.appendChild(el);
    }
    return el;
  }

  deleteTFoot() {
    const el = this.tFoot;
    if (el) {
      domSymbolTree.parent(el).removeChild(el);
    }
  }

  createCaption() {
    let el = this.caption;
    if (!el) {
      el = this._ownerDocument.createElement("CAPTION");
      this.appendChild(el);
    }
    return el;
  }

  deleteCaption() {
    const c = this.caption;
    if (c) {
      domSymbolTree.parent(c).removeChild(c);
    }
  }

  insertRow(index) {
    const tr = this._ownerDocument.createElement("TR");

    if (!domSymbolTree.hasChildren(this)) {
      this.appendChild(this._ownerDocument.createElement("TBODY"));
    }
    const rows = this.rows;
    if (index < -1 || index > rows.length) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    if (index === -1 || (index === 0 && rows.length === 0)) {
      this.tBodies.item(0).appendChild(tr);
    } else if (index === rows.length) {
      const ref = idlUtils.implForWrapper(rows[index - 1]);
      domSymbolTree.parent(ref).appendChild(tr);
    } else {
      const ref = idlUtils.implForWrapper(rows[index]);
      domSymbolTree.parent(ref).insertBefore(tr, ref);
    }
    return tr;
  }

  deleteRow(index) {
    const rows = this.rows;
    const l = rows.length;
    if (index === -1) {
      index = l - 1;
    }
    if (index < 0 || index >= l) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    const tr = idlUtils.implForWrapper(rows[index]);
    domSymbolTree.parent(tr).removeChild(tr);
  }
}

module.exports = {
  implementation: HTMLTableElementImpl
};
