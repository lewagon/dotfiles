"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;
const idlUtils = require("../generated/utils");

const mapper = require("../../utils").mapper;
const createHTMLCollection = require("../../living/html-collection").create;
const DOMException = require("../../web-idl/DOMException");
const domSymbolTree = require("../helpers/internal-constants").domSymbolTree;
const closest = require("../helpers/traversal").closest;

const filesSymbol = Symbol("files");

class HTMLInputElementImpl extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);

    if (!this.type) {
      this.type = "text";
    }
    this._selectionStart = this._selectionEnd = 0;
    this._selectionDirection = "none";
    this._value = null;
    this._dirtyValue = false;
    this._checkedness = false;
    this._dirtyCheckedness = false;

    this._eventDefaults.click = event => {
      const target = event.target;

      if (target.type === "checkbox") {
        target.checked = !target.checked;
      } else if (target.type === "radio") {
        target.checked = true;
      } else if (target.type === "submit") {
        const form = this.form;
        if (form) {
          form._dispatchSubmitEvent();
        }
      }
    };
  }
  _attrModified(name) {
    const wrapper = idlUtils.wrapperForImpl(this);
    if (!this._dirtyValue && name === "value") {
      this._value = wrapper.defaultValue;
    }
    if (!this._dirtyCheckedness && name === "checked") {
      this._checkedness = wrapper.defaultChecked;
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    }

    if (name === "name" || name === "type") {
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    }

    super._attrModified.apply(this, arguments);
  }
  _formReset() {
    const wrapper = idlUtils.wrapperForImpl(this);
    this._value = wrapper.defaultValue;
    this._dirtyValue = false;
    this._checkedness = wrapper.defaultChecked;
    this._dirtyCheckedness = false;
    if (this._checkedness) {
      this._removeOtherRadioCheckedness();
    }
  }
  _changedFormOwner() {
    if (this._checkedness) {
      this._removeOtherRadioCheckedness();
    }
  }
  _removeOtherRadioCheckedness() {
    const wrapper = idlUtils.wrapperForImpl(this);
    const root = this._radioButtonGroupRoot;
    if (!root) {
      return;
    }

    const name = wrapper.name.toLowerCase();
    const radios = createHTMLCollection(this, mapper(root, el => {
      const radioWrapper = idlUtils.wrapperForImpl(el);
      return el.type === "radio" &&
              radioWrapper.name &&
              radioWrapper.name.toLowerCase() === name &&
              el._radioButtonGroupRoot === root;
    }));

    Array.prototype.forEach.call(radios, radio => {
      radio = idlUtils.implForWrapper(radio);
      if (radio !== this) {
        radio._checkedness = false;
      }
    }, this);
  }
  get _radioButtonGroupRoot() {
    const wrapper = idlUtils.wrapperForImpl(this);
    if (this.type !== "radio" || !wrapper.name) {
      return null;
    }

    let e = domSymbolTree.parent(this);
    while (e) {
      // root node of this home sub tree
      // or the form element we belong to
      if (!domSymbolTree.parent(e) || e.nodeName.toUpperCase() === "FORM") {
        return e;
      }
      e = domSymbolTree.parent(e);
    }
    return null;
  }
  get form() {
    return closest(this, "form");
  }
  get checked() {
    return this._checkedness;
  }
  set checked(checked) {
    this._checkedness = Boolean(checked);
    this._dirtyCheckedness = true;
    if (this._checkedness) {
      this._removeOtherRadioCheckedness();
    }
  }
  get value() {
    if (this._value === null) {
      return "";
    }
    return this._value;
  }
  set value(val) {
    this._dirtyValue = true;

    if (val === null) {
      this._value = null;
    } else {
      this._value = String(val);
    }

    if (this._allowSelection()) {
      this._selectionStart = 0;
      this._selectionEnd = 0;
      this._selectionDirection = "none";
    }
  }
  get files() {
    if (this.type === "file") {
      this[filesSymbol] = this[filesSymbol] || new this._core.FileList();
    } else {
      this[filesSymbol] = null;
    }
    return this[filesSymbol];
  }
  get type() {
    const type = this.getAttribute("type");
    return type ? type.toLowerCase() : "text";
  }
  set type(type) {
    this.setAttribute("type", type);
  }

  _dispatchSelectEvent() {
    const event = this._ownerDocument.createEvent("HTMLEvents");
    event.initEvent("select", true, true);
    this.dispatchEvent(event);
  }
  _getValueLength() {
    return typeof this.value === "string" ? this.value.length : 0;
  }
  _allowSelection() {
    const type = this.type.toLowerCase();
    return type === "text" || type === "search" || type === "tel" ||
           type === "url" || type === "password";
  }
  select() {
    if (!this._allowSelection()) {
      throw new DOMException(DOMException.INVALID_STATE_ERR);
    }

    this._selectionStart = 0;
    this._selectionEnd = this._getValueLength();
    this._selectionDirection = "none";
    this._dispatchSelectEvent();
  }
  get selectionStart() {
    if (!this._allowSelection()) {
      throw new DOMException(DOMException.INVALID_STATE_ERR);
    }

    return this._selectionStart;
  }
  set selectionStart(start) {
    this.setSelectionRange(start, Math.max(start, this._selectionEnd), this._selectionDirection);
  }
  get selectionEnd() {
    if (!this._allowSelection()) {
      throw new DOMException(DOMException.INVALID_STATE_ERR);
    }
    return this._selectionEnd;
  }
  set selectionEnd(end) {
    this.setSelectionRange(this._selectionStart, end, this._selectionDirection);
  }
  get selectionDirection() {
    if (!this._allowSelection()) {
      throw new DOMException(DOMException.INVALID_STATE_ERR);
    }
    return this._selectionDirection;
  }
  set selectionDirection(dir) {
    this.setSelectionRange(this._selectionStart, this._selectionEnd, dir);
  }
  setSelectionRange(start, end, dir) {
    if (!this._allowSelection()) {
      throw new DOMException(DOMException.INVALID_STATE_ERR);
    }

    this._selectionEnd = Math.min(end, this._getValueLength());
    this._selectionStart = Math.min(start, this._selectionEnd);
    this._selectionDirection = ((dir === "forward") || (dir === "backward")) ? dir : "none";
    this._dispatchSelectEvent();
  }

  setRangeText(repl, start, end, selectionMode) {
    if (arguments.length < 2) {
      start = this._selectionStart;
      end = this._selectionEnd;
    } else if (start > end) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }

    start = Math.min(start, this._getValueLength());
    end = Math.min(end, this._getValueLength());

    const val = this.value;
    let selStart = this._selectionStart;
    let selEnd = this._selectionEnd;

    this.value = val.slice(0, start) + repl + val.slice(end);

    const newEnd = start + this.value.length;

    if (selectionMode === "select") {
      this.setSelectionRange(start, newEnd);
    } else if (selectionMode === "start") {
      this.setSelectionRange(start, start);
    } else if (selectionMode === "end") {
      this.setSelectionRange(newEnd, newEnd);
    } else { // preserve
      const delta = repl.length - (end - start);

      if (selStart > end) {
        selStart += delta;
      } else if (selStart > start) {
        selStart = start;
      }

      if (selEnd > end) {
        selEnd += delta;
      } else if (selEnd > start) {
        selEnd = newEnd;
      }

      this.setSelectionRange(selStart, selEnd);
    }
  }

  set maxLength(value) {
    if (value < 0) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    this.setAttribute("maxlength", String(value));
  }

  get maxLength() {
    if (!this.hasAttribute("maxlength")) {
      return 524288; // stole this from chrome
    }
    return parseInt(this.getAttribute("maxlength"));
  }

  set minLength(value) {
    if (value < 0) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    this.setAttribute("minlength", String(value));
  }

  get minLength() {
    if (!this.hasAttribute("minlength")) {
      return 0;
    }
    return parseInt(this.getAttribute("minlength"));
  }

  get size() {
    if (!this.hasAttribute("size")) {
      return 20;
    }
    return parseInt(this.getAttribute("size"));
  }

  set size(value) {
    if (value <= 0) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    this.setAttribute("size", String(value));
  }
}

module.exports = {
  implementation: HTMLInputElementImpl
};
