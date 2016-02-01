"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const DOMException = require("../../web-idl/DOMException");
const closest = require("../helpers/traversal").closest;

class HTMLTextAreaElement extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);

    this._apiValue = null;
    this._dirtyValue = false;
  }

  _formReset() {
    this._apiValue = null;
    this._dirtyValue = false;
  }

  get form() {
    return closest(this, "form");
  }

  get defaultValue() {
    return this.textContent;
  }

  set defaultValue(val) {
    this.textContent = val;
  }

  get value() {
    // The WHATWG specifies that when "textContent" changes, the "raw value"
    // (just the API value in jsdom) must also be updated.
    // This slightly different solution has identical results, but is a lot less complex.
    if (this._dirtyValue) {
      if (this._apiValue === null) {
        return "";
      }
      return this._apiValue;
    }

    let val = this.defaultValue;
    val = val.replace(/\r\n|\r/g, "\n"); // API value normalizes line breaks per WHATWG
    return val;
  }

  set value(val) {
    if (val) {
      val = val.replace(/\r\n|\r/g, "\n"); // API value normalizes line breaks per WHATWG
    }

    this._dirtyValue = true;
    this._apiValue = val;

    this._selectionStart = 0;
    this._selectionEnd = 0;
    this._selectionDirection = "none";
  }

  get textLength() {
    return this.value.length; // code unit length (16 bit)
  }
  get type() {
    return "textarea";
  }

  _dispatchSelectEvent() {
    const event = this._ownerDocument.createEvent("HTMLEvents");
    event.initEvent("select", true, true);
    this.dispatchEvent(event);
  }
  _getValueLength() {
    return typeof this.value === "string" ? this.value.length : 0;
  }
  select() {
    this._selectionStart = 0;
    this._selectionEnd = this._getValueLength();
    this._selectionDirection = "none";
    this._dispatchSelectEvent();
  }
  get selectionStart() {
    return this._selectionStart;
  }
  set selectionStart(start) {
    this.setSelectionRange(start, Math.max(start, this._selectionEnd), this._selectionDirection);
  }
  get selectionEnd() {
    return this._selectionEnd;
  }
  set selectionEnd(end) {
    this.setSelectionRange(this._selectionStart, end, this._selectionDirection);
  }
  get selectionDirection() {
    return this._selectionDirection;
  }
  set selectionDirection(dir) {
    this.setSelectionRange(this._selectionStart, this._selectionEnd, dir);
  }
  setSelectionRange(start, end, dir) {
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

  get cols() {
    if (!this.hasAttribute("cols")) {
      return 20;
    }
    return parseInt(this.getAttribute("cols"));
  }

  set cols(value) {
    if (value <= 0) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    this.setAttribute("cols", String(value));
  }

  get rows() {
    if (!this.hasAttribute("rows")) {
      return 2;
    }
    return parseInt(this.getAttribute("rows"));
  }

  set rows(value) {
    if (value <= 0) {
      throw new DOMException(DOMException.INDEX_SIZE_ERR);
    }
    this.setAttribute("rows", String(value));
  }
}

module.exports = {
  implementation: HTMLTextAreaElement
};
