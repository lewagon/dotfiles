/*
 * stimulus-use 0.52.1
 */
import hotkeys from "hotkeys-js";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */ function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

const defaultOptions = {
  debug: false,
  logger: console,
  dispatchEvent: true,
  eventPrefix: true
};

class StimulusUse {
  constructor(controller, options = {}) {
    var _a, _b, _c;
    this.log = (functionName, args) => {
      if (!this.debug) return;
      this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${functionName}`, "color: #3B82F6", "color: unset");
      this.logger.log(Object.assign({
        controllerId: this.controllerId
      }, args));
      this.logger.groupEnd();
    };
    this.warn = message => {
      this.logger.warn(`%c${this.controller.identifier} %c${message}`, "color: #3B82F6; font-weight: bold", "color: unset");
    };
    this.dispatch = (eventName, details = {}) => {
      if (this.dispatchEvent) {
        const {event: event} = details, eventDetails = __rest(details, [ "event" ]);
        const customEvent = this.extendedEvent(eventName, event || null, eventDetails);
        this.targetElement.dispatchEvent(customEvent);
        this.log("dispatchEvent", Object.assign({
          eventName: customEvent.type
        }, eventDetails));
      }
    };
    this.call = (methodName, args = {}) => {
      const method = this.controller[methodName];
      if (typeof method == "function") {
        return method.call(this.controller, args);
      }
    };
    this.extendedEvent = (name, event, detail) => {
      const {bubbles: bubbles, cancelable: cancelable, composed: composed} = event || {
        bubbles: true,
        cancelable: true,
        composed: true
      };
      if (event) {
        Object.assign(detail, {
          originalEvent: event
        });
      }
      const customEvent = new CustomEvent(this.composeEventName(name), {
        bubbles: bubbles,
        cancelable: cancelable,
        composed: composed,
        detail: detail
      });
      return customEvent;
    };
    this.composeEventName = name => {
      let composedName = name;
      if (this.eventPrefix === true) {
        composedName = `${this.controller.identifier}:${name}`;
      } else if (typeof this.eventPrefix === "string") {
        composedName = `${this.eventPrefix}:${name}`;
      }
      return composedName;
    };
    this.debug = (_b = (_a = options === null || options === void 0 ? void 0 : options.debug) !== null && _a !== void 0 ? _a : controller.application.stimulusUseDebug) !== null && _b !== void 0 ? _b : defaultOptions.debug;
    this.logger = (_c = options === null || options === void 0 ? void 0 : options.logger) !== null && _c !== void 0 ? _c : defaultOptions.logger;
    this.controller = controller;
    this.controllerId = controller.element.id || controller.element.dataset.id;
    this.targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
    const {dispatchEvent: dispatchEvent, eventPrefix: eventPrefix} = Object.assign({}, defaultOptions, options);
    Object.assign(this, {
      dispatchEvent: dispatchEvent,
      eventPrefix: eventPrefix
    });
    this.controllerInitialize = controller.initialize.bind(controller);
    this.controllerConnect = controller.connect.bind(controller);
    this.controllerDisconnect = controller.disconnect.bind(controller);
  }
}

class UseHotkeys extends StimulusUse {
  constructor(controller, hotkeysOptions) {
    super(controller, hotkeysOptions);
    this.bind = () => {
      for (const [hotkey, definition] of Object.entries(this.hotkeysOptions.hotkeys)) {
        const handler = definition.handler.bind(this.controller);
        hotkeys(hotkey, definition.options, (e => handler(e, e)));
      }
    };
    this.unbind = () => {
      for (const hotkey in this.hotkeysOptions.hotkeys) {
        hotkeys.unbind(hotkey);
      }
    };
    this.controller = controller;
    this.hotkeysOptions = hotkeysOptions;
    this.enhanceController();
    this.bind();
  }
  enhanceController() {
    if (this.hotkeysOptions.filter) {
      hotkeys.filter = this.hotkeysOptions.filter;
    }
    const controllerDisconnect = this.controller.disconnect.bind(this.controller);
    const disconnect = () => {
      this.unbind();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const convertSimpleHotkeyDefinition = definition => ({
  handler: definition[0],
  options: {
    element: definition[1]
  }
});

const coerceOptions = options => {
  if (!options.hotkeys) {
    const hotkeys = {};
    Object.entries(options).forEach((([hotkey, definition]) => {
      Object.defineProperty(hotkeys, hotkey, {
        value: convertSimpleHotkeyDefinition(definition),
        writable: false,
        enumerable: true
      });
    }));
    options = {
      hotkeys: hotkeys
    };
  }
  return options;
};

const useHotkeys = (controller, options) => new UseHotkeys(controller, coerceOptions(options));

export { useHotkeys };
