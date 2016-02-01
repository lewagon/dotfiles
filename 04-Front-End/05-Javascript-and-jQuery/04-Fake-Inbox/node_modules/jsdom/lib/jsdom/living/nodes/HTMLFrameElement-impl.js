"use strict";

const HTMLElementImpl = require("./HTMLElement-impl").implementation;

const applyDocumentFeatures = require("../../browser/documentfeatures").applyDocumentFeatures;
const resourceLoader = require("../../browser/resource-loader");
const defineGetter = require("../../utils").defineGetter;
const URL = require("whatwg-url").URL;
const documentBaseURL = require("../helpers/document-base-url").documentBaseURL;
const getAttributeValue = require("../attributes").getAttributeValue;

function loadFrame(frame) {
  if (frame._contentDocument) {
    if (frame._contentDocument.defaultView) {
      // close calls delete on its document.
      frame._contentDocument.defaultView.close();
    } else {
      delete frame._contentDocument;
    }
  }

  const parentDoc = frame._ownerDocument;

  // https://html.spec.whatwg.org/#process-the-iframe-attributes
  let url;
  const srcAttribute = getAttributeValue(frame, "src");
  if (srcAttribute === null || srcAttribute === "") {
    url = new URL("about:blank");
  } else {
    try {
      url = new URL(srcAttribute, documentBaseURL(parentDoc));
    } catch (e) {
      url = new URL("about:blank");
    }
  }

  // This is not great, but prevents a require cycle during webidl2js generation
  const wnd = new frame._ownerDocument._defaultView.constructor({
    parsingMode: "html",
    url: url.protocol === "javascript:" || url.href === "about:blank" ? parentDoc.URL : url.href,
    resourceLoader: parentDoc._customResourceLoader,
    userAgent: parentDoc.defaultView.navigator.userAgent,
    cookieJar: parentDoc._cookieJar
  });
  const contentDoc = frame._contentDocument = wnd.document;
  applyDocumentFeatures(contentDoc, parentDoc.implementation._features);

  const parent = parentDoc.defaultView;
  const contentWindow = contentDoc.defaultView;
  contentWindow._parent = parent;
  contentWindow._top = parent.top;
  contentWindow._virtualConsole = parent._virtualConsole;

  // Handle about:blank with a simulated load of an empty document.
  if (url.href === "about:blank") {
    // Cannot be done inside the enqueued callback; the documentElement etc. need to be immediately available.
    contentDoc.write("<html><head></head><body></body></html>");
    contentDoc.close();
    resourceLoader.enqueue(frame, undefined, () => { })(); // to fire the load event
  } else if (url.protocol === "javascript:") {
    // Cannot be done inside the enqueued callback; the documentElement etc. need to be immediately available.
    contentDoc.write("<html><head></head><body></body></html>");
    contentDoc.close();
    contentWindow.eval(url.pathname);
    resourceLoader.enqueue(frame, undefined, () => { })(); // to fire the load event
  } else {
    resourceLoader.load(frame, url.href, html => {
      contentDoc.write(html);
      contentDoc.close();
    });
  }
}

function refreshAccessors(document) {
  const window = document._defaultView;

  if (!window) {
    return;
  }

  const frames = document.querySelectorAll("iframe,frame");

  // delete accessors for all frames
  for (let i = 0; i < window._length; ++i) {
    delete window[i];
  }

  window._length = frames.length;
  Array.prototype.forEach.call(frames, (frame, i) => {
    defineGetter(window, i, () => frame.contentWindow);
  });
}

class HTMLFrameElementImpl extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);
    this._contentDocument = null;
  }
  _attrModified(name, value, oldVal) {
    super._attrModified(name, value, oldVal);
    if (name === "src") {
      // iframe should never load in a document without a Window
      // (e.g. implementation.createHTMLDocument)
      if (this._attached && this._ownerDocument._defaultView) {
        loadFrame(this);
      }
    }
  }

  _detach() {
    super._detach();

    if (this.contentWindow) {
      this.contentWindow.close();
    }

    refreshAccessors(this._ownerDocument);
  }

  _attach() {
    super._attach();

    if (this._ownerDocument._defaultView) {
      loadFrame(this);
    }
    refreshAccessors(this._ownerDocument);
  }

  get contentDocument() {
    return this._contentDocument;
  }

  get contentWindow() {
    return this.contentDocument ? this.contentDocument.defaultView : null;
  }

  get src() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("src"));
  }

  set src(value) {
    this.setAttribute("src", value);
  }

  get longDesc() {
    return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute("longdesc"));
  }

  set longDesc(value) {
    this.setAttribute("longdesc", value);
  }
}

module.exports = {
  implementation: HTMLFrameElementImpl
};

