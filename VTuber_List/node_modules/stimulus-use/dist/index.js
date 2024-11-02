/*
 * stimulus-use 0.52.1
 */
import { Controller } from "@hotwired/stimulus";

const method = (controller, methodName) => {
  const method = controller[methodName];
  if (typeof method == "function") {
    return method;
  } else {
    return (...args) => {};
  }
};

const composeEventName = (name, controller, eventPrefix) => {
  let composedName = name;
  if (eventPrefix === true) {
    composedName = `${controller.identifier}:${name}`;
  } else if (typeof eventPrefix === "string") {
    composedName = `${eventPrefix}:${name}`;
  }
  return composedName;
};

const extendedEvent = (type, event, detail) => {
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
  const customEvent = new CustomEvent(type, {
    bubbles: bubbles,
    cancelable: cancelable,
    composed: composed,
    detail: detail
  });
  return customEvent;
};

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.top + rect.height > 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width > 0;
  return vertInView && horInView;
}

function camelize(value) {
  return value.replace(/(?:[_-])([a-z0-9])/g, ((_, char) => char.toUpperCase()));
}

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

const defaultOptions$8 = {
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
    this.debug = (_b = (_a = options === null || options === void 0 ? void 0 : options.debug) !== null && _a !== void 0 ? _a : controller.application.stimulusUseDebug) !== null && _b !== void 0 ? _b : defaultOptions$8.debug;
    this.logger = (_c = options === null || options === void 0 ? void 0 : options.logger) !== null && _c !== void 0 ? _c : defaultOptions$8.logger;
    this.controller = controller;
    this.controllerId = controller.element.id || controller.element.dataset.id;
    this.targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
    const {dispatchEvent: dispatchEvent, eventPrefix: eventPrefix} = Object.assign({}, defaultOptions$8, options);
    Object.assign(this, {
      dispatchEvent: dispatchEvent,
      eventPrefix: eventPrefix
    });
    this.controllerInitialize = controller.initialize.bind(controller);
    this.controllerConnect = controller.connect.bind(controller);
    this.controllerDisconnect = controller.disconnect.bind(controller);
  }
}

const defaultOptions$7 = {
  eventPrefix: true,
  bubbles: true,
  cancelable: true
};

class UseDispatch extends StimulusUse {
  constructor(controller, options = {}) {
    var _a, _b, _c, _d;
    super(controller, options);
    this.dispatch = (eventName, detail = {}) => {
      const {controller: controller, targetElement: targetElement, eventPrefix: eventPrefix, bubbles: bubbles, cancelable: cancelable, log: log, warn: warn} = this;
      Object.assign(detail, {
        controller: controller
      });
      const eventNameWithPrefix = composeEventName(eventName, this.controller, eventPrefix);
      const event = new CustomEvent(eventNameWithPrefix, {
        detail: detail,
        bubbles: bubbles,
        cancelable: cancelable
      });
      targetElement.dispatchEvent(event);
      warn("`useDispatch()` is deprecated. Please use the built-in `this.dispatch()` function from Stimulus. You can find more information on how to upgrade at: https://stimulus-use.github.io/stimulus-use/#/use-dispatch");
      log("dispatch", {
        eventName: eventNameWithPrefix,
        detail: detail,
        bubbles: bubbles,
        cancelable: cancelable
      });
      return event;
    };
    this.targetElement = (_a = options.element) !== null && _a !== void 0 ? _a : controller.element;
    this.eventPrefix = (_b = options.eventPrefix) !== null && _b !== void 0 ? _b : defaultOptions$7.eventPrefix;
    this.bubbles = (_c = options.bubbles) !== null && _c !== void 0 ? _c : defaultOptions$7.bubbles;
    this.cancelable = (_d = options.cancelable) !== null && _d !== void 0 ? _d : defaultOptions$7.cancelable;
    this.enhanceController();
  }
  enhanceController() {
    Object.assign(this.controller, {
      dispatch: this.dispatch
    });
  }
}

const useDispatch = (controller, options = {}) => new UseDispatch(controller, options);

const defaultOptions$6 = {
  overwriteDispatch: true
};

const useApplication = (controller, options = {}) => {
  const {overwriteDispatch: overwriteDispatch} = Object.assign({}, defaultOptions$6, options);
  Object.defineProperty(controller, "isPreview", {
    get() {
      return document.documentElement.hasAttribute("data-turbolinks-preview") || document.documentElement.hasAttribute("data-turbo-preview");
    }
  });
  Object.defineProperty(controller, "isConnected", {
    get() {
      return !!Array.from(this.context.module.connectedContexts).find((c => c === this.context));
    }
  });
  Object.defineProperty(controller, "csrfToken", {
    get() {
      return this.metaValue("csrf-token");
    }
  });
  if (overwriteDispatch) {
    useDispatch(controller, options);
  }
  Object.assign(controller, {
    metaValue(name) {
      const element = document.head.querySelector(`meta[name="${name}"]`);
      return element && element.getAttribute("content");
    }
  });
};

class ApplicationController extends Controller {
  constructor(context) {
    super(context);
    this.isPreview = false;
    this.isConnected = false;
    this.csrfToken = "";
    useApplication(this, this.options);
  }
}

const defaultOptions$5 = {
  events: [ "click", "touchend" ],
  onlyVisible: true,
  dispatchEvent: true,
  eventPrefix: true
};

const useClickOutside = (composableController, options = {}) => {
  const controller = composableController;
  const {onlyVisible: onlyVisible, dispatchEvent: dispatchEvent, events: events, eventPrefix: eventPrefix} = Object.assign({}, defaultOptions$5, options);
  const onEvent = event => {
    const targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
    if (targetElement.contains(event.target) || !isElementInViewport(targetElement) && onlyVisible) {
      return;
    }
    if (controller.clickOutside) {
      controller.clickOutside(event);
    }
    if (dispatchEvent) {
      const eventName = composeEventName("click:outside", controller, eventPrefix);
      const clickOutsideEvent = extendedEvent(eventName, event, {
        controller: controller
      });
      targetElement.dispatchEvent(clickOutsideEvent);
    }
  };
  const observe = () => {
    events === null || events === void 0 ? void 0 : events.forEach((event => {
      window.addEventListener(event, onEvent, true);
    }));
  };
  const unobserve = () => {
    events === null || events === void 0 ? void 0 : events.forEach((event => {
      window.removeEventListener(event, onEvent, true);
    }));
  };
  const controllerDisconnect = controller.disconnect.bind(controller);
  Object.assign(controller, {
    disconnect() {
      unobserve();
      controllerDisconnect();
    }
  });
  observe();
  return [ observe, unobserve ];
};

class ClickOutsideComposableController extends Controller {}

class ClickOutsideController extends ClickOutsideComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useClickOutside(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

class DebounceController extends Controller {}

DebounceController.debounces = [];

const defaultWait$1 = 200;

const debounce = (fn, wait = defaultWait$1) => {
  let timeoutId = null;
  return function() {
    const args = Array.from(arguments);
    const context = this;
    const params = args.map((arg => arg.params));
    const callback = () => {
      args.forEach(((arg, index) => arg.params = params[index]));
      return fn.apply(context, args);
    };
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, wait);
  };
};

const useDebounce = (composableController, options) => {
  const controller = composableController;
  const constructor = controller.constructor;
  constructor.debounces.forEach((func => {
    if (typeof func === "string") {
      controller[func] = debounce(controller[func], options === null || options === void 0 ? void 0 : options.wait);
    }
    if (typeof func === "object") {
      const {name: name, wait: wait} = func;
      if (!name) return;
      controller[name] = debounce(controller[name], wait || (options === null || options === void 0 ? void 0 : options.wait));
    }
  }));
};

class UseHover extends StimulusUse {
  constructor(controller, options = {}) {
    super(controller, options);
    this.observe = () => {
      this.targetElement.addEventListener("mouseenter", this.onEnter);
      this.targetElement.addEventListener("mouseleave", this.onLeave);
    };
    this.unobserve = () => {
      this.targetElement.removeEventListener("mouseenter", this.onEnter);
      this.targetElement.removeEventListener("mouseleave", this.onLeave);
    };
    this.onEnter = event => {
      this.call("mouseEnter", event);
      this.log("mouseEnter", {
        hover: true
      });
      this.dispatch("mouseEnter", {
        hover: false
      });
    };
    this.onLeave = event => {
      this.call("mouseLeave", event);
      this.log("mouseLeave", {
        hover: false
      });
      this.dispatch("mouseLeave", {
        hover: false
      });
    };
    this.controller = controller;
    this.enhanceController();
    this.observe();
  }
  enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller);
    const disconnect = () => {
      this.unobserve();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const useHover = (composableController, options = {}) => {
  const controller = composableController;
  const observer = new UseHover(controller, options);
  return [ observer.observe, observer.unobserve ];
};

class HoverComposableController extends Controller {}

class HoverController extends HoverComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useHover(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

const defaultEvents = [ "mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel" ];

const oneMinute = 6e4;

const defaultOptions$4 = {
  ms: oneMinute,
  initialState: false,
  events: defaultEvents,
  dispatchEvent: true,
  eventPrefix: true
};

const useIdle = (composableController, options = {}) => {
  const controller = composableController;
  const {ms: ms, initialState: initialState, events: events, dispatchEvent: dispatchEvent, eventPrefix: eventPrefix} = Object.assign({}, defaultOptions$4, options);
  let isIdle = initialState;
  let timeout = setTimeout((() => {
    isIdle = true;
    dispatchAway();
  }), ms);
  const dispatchAway = event => {
    const eventName = composeEventName("away", controller, eventPrefix);
    controller.isIdle = true;
    method(controller, "away").call(controller, event);
    if (dispatchEvent) {
      const clickOutsideEvent = extendedEvent(eventName, event || null, {
        controller: controller
      });
      controller.element.dispatchEvent(clickOutsideEvent);
    }
  };
  const dispatchBack = event => {
    const eventName = composeEventName("back", controller, eventPrefix);
    controller.isIdle = false;
    method(controller, "back").call(controller, event);
    if (dispatchEvent) {
      const clickOutsideEvent = extendedEvent(eventName, event || null, {
        controller: controller
      });
      controller.element.dispatchEvent(clickOutsideEvent);
    }
  };
  const onEvent = event => {
    if (isIdle) dispatchBack(event);
    isIdle = false;
    clearTimeout(timeout);
    timeout = setTimeout((() => {
      isIdle = true;
      dispatchAway(event);
    }), ms);
  };
  const onVisibility = event => {
    if (!document.hidden) onEvent(event);
  };
  if (isIdle) {
    dispatchAway();
  } else {
    dispatchBack();
  }
  const controllerDisconnect = controller.disconnect.bind(controller);
  const observe = () => {
    events.forEach((event => {
      window.addEventListener(event, onEvent);
    }));
    document.addEventListener("visibilitychange", onVisibility);
  };
  const unobserve = () => {
    clearTimeout(timeout);
    events.forEach((event => {
      window.removeEventListener(event, onEvent);
    }));
    document.removeEventListener("visibilitychange", onVisibility);
  };
  Object.assign(controller, {
    disconnect() {
      unobserve();
      controllerDisconnect();
    }
  });
  observe();
  return [ observe, unobserve ];
};

class IdleComposableController extends Controller {
  constructor() {
    super(...arguments);
    this.isIdle = false;
  }
}

class IdleController extends IdleComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useIdle(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

const defaultOptions$3 = {
  dispatchEvent: true,
  eventPrefix: true,
  visibleAttribute: "isVisible"
};

const useIntersection = (composableController, options = {}) => {
  const controller = composableController;
  const {dispatchEvent: dispatchEvent, eventPrefix: eventPrefix, visibleAttribute: visibleAttribute} = Object.assign({}, defaultOptions$3, options);
  const targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
  if (!controller.intersectionElements) controller.intersectionElements = [];
  controller.intersectionElements.push(targetElement);
  const callback = entries => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      dispatchAppear(entry);
    } else if (targetElement.hasAttribute(visibleAttribute)) {
      dispatchDisappear(entry);
    }
  };
  const observer = new IntersectionObserver(callback, options);
  const dispatchAppear = entry => {
    targetElement.setAttribute(visibleAttribute, "true");
    method(controller, "appear").call(controller, entry, observer);
    if (dispatchEvent) {
      const eventName = composeEventName("appear", controller, eventPrefix);
      const appearEvent = extendedEvent(eventName, null, {
        controller: controller,
        entry: entry,
        observer: observer
      });
      targetElement.dispatchEvent(appearEvent);
    }
  };
  const dispatchDisappear = entry => {
    targetElement.removeAttribute(visibleAttribute);
    method(controller, "disappear").call(controller, entry, observer);
    if (dispatchEvent) {
      const eventName = composeEventName("disappear", controller, eventPrefix);
      const disappearEvent = extendedEvent(eventName, null, {
        controller: controller,
        entry: entry,
        observer: observer
      });
      targetElement.dispatchEvent(disappearEvent);
    }
  };
  const controllerDisconnect = controller.disconnect.bind(controller);
  const disconnect = () => {
    unobserve();
    controllerDisconnect();
  };
  const observe = () => {
    observer.observe(targetElement);
  };
  const unobserve = () => {
    observer.unobserve(targetElement);
  };
  const noneVisible = () => controller.intersectionElements.filter((element => element.hasAttribute(visibleAttribute))).length === 0;
  const oneVisible = () => controller.intersectionElements.filter((element => element.hasAttribute(visibleAttribute))).length === 1;
  const atLeastOneVisible = () => controller.intersectionElements.some((element => element.hasAttribute(visibleAttribute)));
  const allVisible = () => controller.intersectionElements.every((element => element.hasAttribute(visibleAttribute)));
  const isVisible = allVisible;
  Object.assign(controller, {
    isVisible: isVisible,
    noneVisible: noneVisible,
    oneVisible: oneVisible,
    atLeastOneVisible: atLeastOneVisible,
    allVisible: allVisible,
    disconnect: disconnect
  });
  observe();
  return [ observe, unobserve ];
};

class IntersectionComposableController extends Controller {}

class IntersectionController extends IntersectionComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useIntersection(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

const useLazyLoad = (controller, options) => {
  const callback = entries => {
    const [entry] = entries;
    if (entry.isIntersecting && !controller.isLoaded) {
      handleAppear();
    }
  };
  const handleAppear = entry => {
    const src = controller.data.get("src");
    if (!src) return;
    const imageElement = controller.element;
    controller.isLoading = true;
    method(controller, "loading").call(controller, src);
    imageElement.onload = () => {
      handleLoaded(src);
    };
    imageElement.src = src;
  };
  const handleLoaded = src => {
    controller.isLoading = false;
    controller.isLoaded = true;
    method(controller, "loaded").call(controller, src);
  };
  const controllerDisconnect = controller.disconnect.bind(controller);
  const observer = new IntersectionObserver(callback, options);
  const observe = () => {
    observer.observe(controller.element);
  };
  const unobserve = () => {
    observer.unobserve(controller.element);
  };
  Object.assign(controller, {
    isVisible: false,
    disconnect() {
      unobserve();
      controllerDisconnect();
    }
  });
  observe();
  return [ observe, unobserve ];
};

class LazyLoadComposableController extends Controller {
  constructor() {
    super(...arguments);
    this.isLoading = false;
    this.isLoaded = false;
  }
}

class LazyLoadController extends LazyLoadComposableController {
  constructor(context) {
    super(context);
    this.options = {
      rootMargin: "10%"
    };
    requestAnimationFrame((() => {
      const [observe, unobserve] = useLazyLoad(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

const defaultOptions$2 = {
  mediaQueries: {},
  dispatchEvent: true,
  eventPrefix: true,
  debug: false
};

class UseMatchMedia extends StimulusUse {
  constructor(controller, options = {}) {
    var _a, _b, _c, _d;
    super(controller, options);
    this.matches = [];
    this.callback = event => {
      const name = Object.keys(this.mediaQueries).find((name => this.mediaQueries[name] === event.media));
      if (!name) return;
      const {media: media, matches: matches} = event;
      this.changed({
        name: name,
        media: media,
        matches: matches,
        event: event
      });
    };
    this.changed = payload => {
      const {name: name} = payload;
      if (payload.event) {
        this.call(camelize(`${name}_changed`), payload);
        this.dispatch(`${name}:changed`, payload);
        this.log(`media query "${name}" changed`, payload);
      }
      if (payload.matches) {
        this.call(camelize(`is_${name}`), payload);
        this.dispatch(`is:${name}`, payload);
      } else {
        this.call(camelize(`not_${name}`), payload);
        this.dispatch(`not:${name}`, payload);
      }
    };
    this.observe = () => {
      Object.keys(this.mediaQueries).forEach((name => {
        const media = this.mediaQueries[name];
        const match = window.matchMedia(media);
        match.addListener(this.callback);
        this.matches.push(match);
        this.changed({
          name: name,
          media: media,
          matches: match.matches
        });
      }));
    };
    this.unobserve = () => {
      this.matches.forEach((match => match.removeListener(this.callback)));
    };
    this.controller = controller;
    this.mediaQueries = (_a = options.mediaQueries) !== null && _a !== void 0 ? _a : defaultOptions$2.mediaQueries;
    this.dispatchEvent = (_b = options.dispatchEvent) !== null && _b !== void 0 ? _b : defaultOptions$2.dispatchEvent;
    this.eventPrefix = (_c = options.eventPrefix) !== null && _c !== void 0 ? _c : defaultOptions$2.eventPrefix;
    this.debug = (_d = options.debug) !== null && _d !== void 0 ? _d : defaultOptions$2.debug;
    if (!window.matchMedia) {
      console.error("window.matchMedia() is not available");
      return;
    }
    this.enhanceController();
    this.observe();
  }
  enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller);
    const disconnect = () => {
      this.unobserve();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const useMatchMedia = (controller, options = {}) => {
  const observer = new UseMatchMedia(controller, options);
  return [ observer.observe, observer.unobserve ];
};

const memoize = (controller, name, value) => {
  Object.defineProperty(controller, name, {
    value: value
  });
  return value;
};

const useMemo = controller => {
  var _a;
  (_a = controller.constructor.memos) === null || _a === void 0 ? void 0 : _a.forEach((getter => {
    memoize(controller, getter, controller[getter]);
  }));
};

const defineMetaGetter = (controller, metaName, suffix) => {
  const getterName = suffix ? `${camelize(metaName)}Meta` : camelize(metaName);
  Object.defineProperty(controller, getterName, {
    get() {
      return typeCast(metaValue(metaName));
    }
  });
};

function metaValue(name) {
  const element = document.head.querySelector(`meta[name="${name}"]`);
  return element && element.getAttribute("content");
}

function typeCast(value) {
  try {
    return JSON.parse(value);
  } catch (o_O) {
    return value;
  }
}

const useMeta = (controller, options = {
  suffix: true
}) => {
  const metaNames = controller.constructor.metaNames;
  const suffix = options.suffix;
  metaNames === null || metaNames === void 0 ? void 0 : metaNames.forEach((metaName => {
    defineMetaGetter(controller, metaName, suffix);
  }));
  Object.defineProperty(controller, "metas", {
    get() {
      const result = {};
      metaNames === null || metaNames === void 0 ? void 0 : metaNames.forEach((metaName => {
        const value = typeCast(metaValue(metaName));
        if (value !== undefined && value !== null) {
          result[camelize(metaName)] = value;
        }
      }));
      return result;
    }
  });
};

class UseMutation extends StimulusUse {
  constructor(controller, options = {}) {
    super(controller, options);
    this.observe = () => {
      try {
        this.observer.observe(this.targetElement, this.options);
      } catch (error) {
        this.controller.application.handleError(error, "At a minimum, one of childList, attributes, and/or characterData must be true", {});
      }
    };
    this.unobserve = () => {
      this.observer.disconnect();
    };
    this.mutation = entries => {
      this.call("mutate", entries);
      this.log("mutate", {
        entries: entries
      });
      this.dispatch("mutate", {
        entries: entries
      });
    };
    this.targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
    this.controller = controller;
    this.options = options;
    this.observer = new MutationObserver(this.mutation);
    this.enhanceController();
    this.observe();
  }
  enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller);
    const disconnect = () => {
      this.unobserve();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const useMutation = (controller, options = {}) => {
  const observer = new UseMutation(controller, options);
  return [ observer.observe, observer.unobserve ];
};

class MutationComposableController extends Controller {}

class MutationController extends MutationComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useMutation(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

const defaultOptions$1 = {
  dispatchEvent: true,
  eventPrefix: true
};

const useResize = (composableController, options = {}) => {
  const controller = composableController;
  const {dispatchEvent: dispatchEvent, eventPrefix: eventPrefix} = Object.assign({}, defaultOptions$1, options);
  const targetElement = (options === null || options === void 0 ? void 0 : options.element) || controller.element;
  const callback = entries => {
    const [entry] = entries;
    method(controller, "resize").call(controller, entry.contentRect);
    if (dispatchEvent) {
      const eventName = composeEventName("resize", controller, eventPrefix);
      const appearEvent = extendedEvent(eventName, null, {
        controller: controller,
        entry: entry
      });
      targetElement.dispatchEvent(appearEvent);
    }
  };
  const controllerDisconnect = controller.disconnect.bind(controller);
  const observer = new ResizeObserver(callback);
  const observe = () => {
    observer.observe(targetElement);
  };
  const unobserve = () => {
    observer.unobserve(targetElement);
  };
  Object.assign(controller, {
    disconnect() {
      unobserve();
      controllerDisconnect();
    }
  });
  observe();
  return [ observe, unobserve ];
};

class ResizeComposableController extends Controller {}

class ResizeController extends ResizeComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useResize(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

class UseTargetMutation extends StimulusUse {
  constructor(controller, options = {}) {
    super(controller, options);
    this.observe = () => {
      this.observer.observe(this.targetElement, {
        subtree: true,
        characterData: true,
        childList: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: [ this.targetSelector, this.scopedTargetSelector ]
      });
    };
    this.unobserve = () => {
      this.observer.disconnect();
    };
    this.mutation = entries => {
      for (const mutation of entries) {
        switch (mutation.type) {
         case "attributes":
          let newValue = mutation.target.getAttribute(mutation.attributeName);
          let oldValue = mutation.oldValue;
          if (mutation.attributeName === this.targetSelector || mutation.attributeName === this.scopedTargetSelector) {
            let oldTargets = this.targetsUsedByThisController(oldValue);
            let newTargets = this.targetsUsedByThisController(newValue);
            let removedTargets = oldTargets.filter((target => !newTargets.includes(target)));
            let addedTargets = newTargets.filter((target => !oldTargets.includes(target)));
            removedTargets.forEach((target => this.targetRemoved(this.stripIdentifierPrefix(target), mutation.target, "attributeChange")));
            addedTargets.forEach((target => this.targetAdded(this.stripIdentifierPrefix(target), mutation.target, "attributeChange")));
          }
          break;

         case "characterData":
          let nodule = this.findTargetInAncestry(mutation.target);
          if (nodule == null) {
            return;
          } else {
            let supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
            supportedTargets.forEach((target => {
              this.targetChanged(this.stripIdentifierPrefix(target), nodule, "domMutation");
            }));
          }
          break;

         case "childList":
          let {addedNodes: addedNodes, removedNodes: removedNodes} = mutation;
          addedNodes.forEach((node => this.processNodeDOMMutation(node, this.targetAdded)));
          removedNodes.forEach((node => this.processNodeDOMMutation(node, this.targetRemoved)));
          break;
        }
      }
    };
    this.controller = controller;
    this.options = options;
    this.targetElement = controller.element;
    this.identifier = controller.scope.identifier;
    this.identifierPrefix = `${this.identifier}.`;
    this.targetSelector = controller.scope.schema.targetAttribute;
    this.scopedTargetSelector = `data-${this.identifier}-target`;
    this.targets = options.targets || controller.constructor.targets;
    this.prefixedTargets = this.targets.map((target => `${this.identifierPrefix}${target}`));
    this.observer = new MutationObserver(this.mutation);
    this.enhanceController();
    this.observe();
  }
  processNodeDOMMutation(node, initialChangeModeAssumption) {
    let nodule = node;
    let change = initialChangeModeAssumption;
    let supportedTargets = [];
    if (nodule.nodeName == "#text" || this.targetsUsedByThisControllerFromNode(nodule).length == 0) {
      change = this.targetChanged;
      nodule = this.findTargetInAncestry(node);
    } else {
      supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
    }
    if (nodule == null) {
      return;
    } else if (supportedTargets.length == 0) {
      supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
    }
    supportedTargets.forEach((target => {
      change.call(this, this.stripIdentifierPrefix(target), nodule, "domMutation");
    }));
  }
  findTargetInAncestry(node) {
    let nodule = node;
    let supportedTargets = [];
    if (nodule.nodeName != "#text") {
      supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
    }
    while (nodule.parentNode !== null && nodule.parentNode != this.targetElement && supportedTargets.length == 0) {
      nodule = nodule.parentNode;
      if (nodule.nodeName !== "#text") {
        let supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
        if (supportedTargets.length > 0) {
          return nodule;
        }
      }
    }
    if (nodule.nodeName == "#text") {
      return null;
    }
    if (nodule.parentNode == null) {
      return null;
    }
    if (nodule.parentNode == this.targetElement) {
      if (this.targetsUsedByThisControllerFromNode(nodule).length > 0) {
        return nodule;
      }
      return null;
    }
    return null;
  }
  targetAdded(name, node, trigger) {
    let targetCallback = `${name}TargetAdded`;
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node);
    this.log("targetAdded", {
      target: name,
      node: node,
      trigger: trigger
    });
  }
  targetRemoved(name, node, trigger) {
    let targetCallback = `${name}TargetRemoved`;
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node);
    this.log("targetRemoved", {
      target: name,
      node: node,
      trigger: trigger
    });
  }
  targetChanged(name, node, trigger) {
    let targetCallback = `${name}TargetChanged`;
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node);
    this.log("targetChanged", {
      target: name,
      node: node,
      trigger: trigger
    });
  }
  targetsUsedByThisControllerFromNode(node) {
    if (node.nodeName == "#text" || node.nodeName == "#comment") {
      return [];
    }
    let nodeElement = node;
    return this.targetsUsedByThisController(nodeElement.getAttribute(this.scopedTargetSelector) || nodeElement.getAttribute(this.targetSelector));
  }
  targetsUsedByThisController(targetStr) {
    targetStr = targetStr || "";
    let targetsToCheck = this.stripIdentifierPrefix(targetStr).split(" ");
    return this.targets.filter((n => targetsToCheck.indexOf(n) !== -1));
  }
  stripIdentifierPrefix(target) {
    return target.replace(new RegExp(this.identifierPrefix, "g"), "");
  }
  enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller);
    const disconnect = () => {
      this.unobserve();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const useTargetMutation = (composableController, options = {}) => {
  const controller = composableController;
  const observer = new UseTargetMutation(controller, options);
  return [ observer.observe, observer.unobserve ];
};

class TargetMutationComposableController extends Controller {}

class TargetMutationController extends TargetMutationComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useTargetMutation(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

class ThrottleController extends Controller {}

ThrottleController.throttles = [];

const defaultWait = 200;

function throttle(func, wait = defaultWait) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      func.apply(context, args);
      setTimeout((() => inThrottle = false), wait);
    }
  };
}

const useThrottle = (composableController, options = {}) => {
  var _a;
  const controller = composableController;
  const constructor = controller.constructor;
  (_a = constructor.throttles) === null || _a === void 0 ? void 0 : _a.forEach((func => {
    if (typeof func === "string") {
      controller[func] = throttle(controller[func], options === null || options === void 0 ? void 0 : options.wait);
    }
    if (typeof func === "object") {
      const {name: name, wait: wait} = func;
      if (!name) return;
      controller[name] = throttle(controller[name], wait || (options === null || options === void 0 ? void 0 : options.wait));
    }
  }));
};

const alpineNames = {
  enterFromClass: "enter",
  enterActiveClass: "enterStart",
  enterToClass: "enterEnd",
  leaveFromClass: "leave",
  leaveActiveClass: "leaveStart",
  leaveToClass: "leaveEnd"
};

const defaultOptions = {
  transitioned: false,
  hiddenClass: "hidden",
  preserveOriginalClass: true,
  removeToClasses: true
};

const useTransition = (composableController, options = {}) => {
  var _a, _b, _c;
  const controller = composableController;
  const targetName = controller.element.dataset.transitionTarget;
  let targetFromAttribute;
  if (targetName) {
    targetFromAttribute = controller[`${targetName}Target`];
  }
  const targetElement = (options === null || options === void 0 ? void 0 : options.element) || targetFromAttribute || controller.element;
  if (!(targetElement instanceof HTMLElement || targetElement instanceof SVGElement)) return;
  const dataset = targetElement.dataset;
  const leaveAfter = parseInt(dataset.leaveAfter || "") || options.leaveAfter || 0;
  const {transitioned: transitioned, hiddenClass: hiddenClass, preserveOriginalClass: preserveOriginalClass, removeToClasses: removeToClasses} = Object.assign({}, defaultOptions, options);
  const controllerEnter = (_a = controller.enter) === null || _a === void 0 ? void 0 : _a.bind(controller);
  const controllerLeave = (_b = controller.leave) === null || _b === void 0 ? void 0 : _b.bind(controller);
  const controllerToggleTransition = (_c = controller.toggleTransition) === null || _c === void 0 ? void 0 : _c.bind(controller);
  async function enter(event) {
    if (controller.transitioned) return;
    controller.transitioned = true;
    controllerEnter && controllerEnter(event);
    const enterFromClasses = getAttribute("enterFrom", options, dataset);
    const enterActiveClasses = getAttribute("enterActive", options, dataset);
    const enterToClasses = getAttribute("enterTo", options, dataset);
    const leaveToClasses = getAttribute("leaveTo", options, dataset);
    if (!!hiddenClass) {
      targetElement.classList.remove(hiddenClass);
    }
    if (!removeToClasses) {
      removeClasses(targetElement, leaveToClasses);
    }
    await transition(targetElement, enterFromClasses, enterActiveClasses, enterToClasses, hiddenClass, preserveOriginalClass, removeToClasses);
    if (leaveAfter > 0) {
      setTimeout((() => {
        leave(event);
      }), leaveAfter);
    }
  }
  async function leave(event) {
    if (!controller.transitioned) return;
    controller.transitioned = false;
    controllerLeave && controllerLeave(event);
    const leaveFromClasses = getAttribute("leaveFrom", options, dataset);
    const leaveActiveClasses = getAttribute("leaveActive", options, dataset);
    const leaveToClasses = getAttribute("leaveTo", options, dataset);
    const enterToClasses = getAttribute("enterTo", options, dataset);
    if (!removeToClasses) {
      removeClasses(targetElement, enterToClasses);
    }
    await transition(targetElement, leaveFromClasses, leaveActiveClasses, leaveToClasses, hiddenClass, preserveOriginalClass, removeToClasses);
    if (!!hiddenClass) {
      targetElement.classList.add(hiddenClass);
    }
  }
  function toggleTransition(event) {
    controllerToggleTransition && controllerToggleTransition(event);
    if (controller.transitioned) {
      leave();
    } else {
      enter();
    }
  }
  async function transition(element, initialClasses, activeClasses, endClasses, hiddenClass, preserveOriginalClass, removeEndClasses) {
    const stashedClasses = [];
    if (preserveOriginalClass) {
      initialClasses.forEach((cls => element.classList.contains(cls) && cls !== hiddenClass && stashedClasses.push(cls)));
      activeClasses.forEach((cls => element.classList.contains(cls) && cls !== hiddenClass && stashedClasses.push(cls)));
      endClasses.forEach((cls => element.classList.contains(cls) && cls !== hiddenClass && stashedClasses.push(cls)));
    }
    addClasses(element, initialClasses);
    removeClasses(element, stashedClasses);
    addClasses(element, activeClasses);
    await nextAnimationFrame();
    removeClasses(element, initialClasses);
    addClasses(element, endClasses);
    await afterTransition(element);
    removeClasses(element, activeClasses);
    if (removeEndClasses) {
      removeClasses(element, endClasses);
    }
    addClasses(element, stashedClasses);
  }
  function initialState() {
    controller.transitioned = transitioned;
    if (transitioned) {
      if (!!hiddenClass) {
        targetElement.classList.remove(hiddenClass);
      }
      enter();
    } else {
      if (!!hiddenClass) {
        targetElement.classList.add(hiddenClass);
      }
      leave();
    }
  }
  function addClasses(element, classes) {
    if (classes.length > 0) {
      element.classList.add(...classes);
    }
  }
  function removeClasses(element, classes) {
    if (classes.length > 0) {
      element.classList.remove(...classes);
    }
  }
  initialState();
  Object.assign(controller, {
    enter: enter,
    leave: leave,
    toggleTransition: toggleTransition
  });
  return [ enter, leave, toggleTransition ];
};

function getAttribute(name, options, dataset) {
  const datasetName = `transition${name[0].toUpperCase()}${name.substr(1)}`;
  const datasetAlpineName = alpineNames[name];
  const classes = options[name] || dataset[datasetName] || dataset[datasetAlpineName] || " ";
  return isEmpty(classes) ? [] : classes.split(" ");
}

async function afterTransition(element) {
  return new Promise((resolve => {
    const duration = Number(getComputedStyle(element).transitionDuration.split(",")[0].replace("s", "")) * 1e3;
    setTimeout((() => {
      resolve(duration);
    }), duration);
  }));
}

async function nextAnimationFrame() {
  return new Promise((resolve => {
    requestAnimationFrame((() => {
      requestAnimationFrame(resolve);
    }));
  }));
}

function isEmpty(str) {
  return str.length === 0 || !str.trim();
}

class TransitionComposableController extends Controller {
  constructor() {
    super(...arguments);
    this.transitioned = false;
  }
}

class TransitionController extends TransitionComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      useTransition(this, this.options);
    }));
  }
}

class UseVisibility extends StimulusUse {
  constructor(controller, options = {}) {
    super(controller, options);
    this.observe = () => {
      this.controller.isVisible = !document.hidden;
      document.addEventListener("visibilitychange", this.handleVisibilityChange);
      this.handleVisibilityChange();
    };
    this.unobserve = () => {
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    };
    this.becomesInvisible = event => {
      this.controller.isVisible = false;
      this.call("invisible", event);
      this.log("invisible", {
        isVisible: false
      });
      this.dispatch("invisible", {
        event: event,
        isVisible: false
      });
    };
    this.becomesVisible = event => {
      this.controller.isVisible = true;
      this.call("visible", event);
      this.log("visible", {
        isVisible: true
      });
      this.dispatch("visible", {
        event: event,
        isVisible: true
      });
    };
    this.handleVisibilityChange = event => {
      if (document.hidden) {
        this.becomesInvisible(event);
      } else {
        this.becomesVisible(event);
      }
    };
    this.controller = controller;
    this.enhanceController();
    this.observe();
  }
  enhanceController() {
    const controllerDisconnect = this.controllerDisconnect;
    const disconnect = () => {
      this.unobserve();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const useVisibility = (composableController, options = {}) => {
  const controller = composableController;
  const observer = new UseVisibility(controller, options);
  return [ observer.observe, observer.unobserve ];
};

class VisibilityComposableController extends Controller {
  constructor() {
    super(...arguments);
    this.isVisible = false;
  }
}

class VisibilityController extends VisibilityComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useVisibility(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

class UseWindowFocus extends StimulusUse {
  constructor(controller, options = {}) {
    super(controller, options);
    this.observe = () => {
      if (document.hasFocus()) {
        this.becomesFocused();
      } else {
        this.becomesUnfocused();
      }
      this.interval = setInterval((() => {
        this.handleWindowFocusChange();
      }), this.intervalDuration);
    };
    this.unobserve = () => {
      clearInterval(this.interval);
    };
    this.becomesUnfocused = event => {
      this.controller.hasFocus = false;
      this.call("unfocus", event);
      this.log("unfocus", {
        hasFocus: false
      });
      this.dispatch("unfocus", {
        event: event,
        hasFocus: false
      });
    };
    this.becomesFocused = event => {
      this.controller.hasFocus = true;
      this.call("focus", event);
      this.log("focus", {
        hasFocus: true
      });
      this.dispatch("focus", {
        event: event,
        hasFocus: true
      });
    };
    this.handleWindowFocusChange = event => {
      if (document.hasFocus() && !this.controller.hasFocus) {
        this.becomesFocused(event);
      } else if (!document.hasFocus() && this.controller.hasFocus) {
        this.becomesUnfocused(event);
      }
    };
    this.controller = controller;
    this.intervalDuration = options.interval || 200;
    this.enhanceController();
    this.observe();
  }
  enhanceController() {
    const controllerDisconnect = this.controllerDisconnect;
    const disconnect = () => {
      this.unobserve();
      controllerDisconnect();
    };
    Object.assign(this.controller, {
      disconnect: disconnect
    });
  }
}

const useWindowFocus = (composableController, options = {}) => {
  const controller = composableController;
  const observer = new UseWindowFocus(controller, options);
  return [ observer.observe, observer.unobserve ];
};

class WindowFocusComposableController extends Controller {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
  }
}

class WindowFocusController extends WindowFocusComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useWindowFocus(this, this.options);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

const useWindowResize = composableController => {
  const controller = composableController;
  const callback = event => {
    const {innerWidth: innerWidth, innerHeight: innerHeight} = window;
    const payload = {
      height: innerHeight || Infinity,
      width: innerWidth || Infinity,
      event: event
    };
    method(controller, "windowResize").call(controller, payload);
  };
  const controllerDisconnect = controller.disconnect.bind(controller);
  const observe = () => {
    window.addEventListener("resize", callback);
    callback();
  };
  const unobserve = () => {
    window.removeEventListener("resize", callback);
  };
  Object.assign(controller, {
    disconnect() {
      unobserve();
      controllerDisconnect();
    }
  });
  observe();
  return [ observe, unobserve ];
};

class WindowResizeComposableController extends Controller {}

class WindowResizeController extends WindowResizeComposableController {
  constructor(context) {
    super(context);
    requestAnimationFrame((() => {
      const [observe, unobserve] = useWindowResize(this);
      Object.assign(this, {
        observe: observe,
        unobserve: unobserve
      });
    }));
  }
}

function useHotkeys() {
  throw "[stimulus-use] Notice: The import for `useHotkeys()` has been moved from `stimulus-use` to `stimulus-use/hotkeys`. \nPlease change the import accordingly and add `hotkey-js` as a dependency to your project. \n\nFor more information see: https://stimulus-use.github.io/stimulus-use/#/use-hotkeys?id=importing-the-behavior";
}

export { ApplicationController, ClickOutsideController, HoverController, IdleController, IntersectionController, LazyLoadController, MutationController, ResizeController, TargetMutationController, TransitionController, UseHover, UseMutation, UseTargetMutation, UseVisibility, UseWindowFocus, VisibilityController, WindowFocusController, WindowResizeController, debounce, useApplication, useClickOutside, useDebounce, useDispatch, useHotkeys, useHover, useIdle, useIntersection, useLazyLoad, useMatchMedia, useMemo, useMeta, useMutation, useResize, useTargetMutation, useThrottle, useTransition, useVisibility, useWindowFocus, useWindowResize };
