"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const closest = require("../helpers/traversal").closest;

class HTMLButtonElementImpl extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);

    this._eventDefaults.click = function (event) {
      const target = event.target;
      const form = target.form;
      if (form) {
        if (target.type === "submit") {
          form._dispatchSubmitEvent();
        }
      }
    };
  }

  get form() {
    return closest(this, "form");
  }

  get type() {
    const typeAttr = (this.getAttribute("type") || "").toLowerCase();
    switch (typeAttr) {
      case "submit":
      case "reset":
      case "button":
      case "menu":
        return typeAttr;
      default:
        return "submit";
    }
  }

  set type(v) {
    v = String(v).toLowerCase();
    switch (v) {
      case "submit":
      case "reset":
      case "button":
      case "menu":
        this.setAttribute("type", v);
        break;
      default:
        this.setAttribute("type", "submit");
        break;
    }
  }
}

module.exports = {
  implementation: HTMLButtonElementImpl
};
