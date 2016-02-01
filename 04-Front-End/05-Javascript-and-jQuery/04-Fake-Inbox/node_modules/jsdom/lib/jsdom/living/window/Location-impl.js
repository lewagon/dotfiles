"use strict";
const whatwgURL = require("whatwg-url");
const documentBaseURL = require("../helpers/document-base-url.js").documentBaseURL;
const resolveURLToResultingParsedURL = require("../helpers/document-base-url.js").resolveURLToResultingParsedURL;
const DOMException = require("../../web-idl/DOMException.js");
const notImplemented = require("../../browser/not-implemented.js");
const navigate = require("./navigation.js").navigate;

// Not implemented: use of entry settings object's API base URL in href setter, assign, and replace. Instead we just
// use the document base URL. The difference matters in the case of cross-frame calls.

exports.implementation = class LocationImpl {
  constructor(args, privateData) {
    this._relevantDocument = privateData.relevantDocument;
    this.url = null;
  }

  get _url() {
    return this._relevantDocument._URL;
  }

  _locationObjectSetterNavigate(url) {
    // Not implemented: extra steps here to determine replacement flag, since they are not applicable to our
    // rudimentary "navigation" implementation.

    return this._locationObjectNavigate(url);
  }

  _locationObjectNavigate(url/* , { replacement = false } = {} */) {
    // Not implemented: the setup for calling navigate, which doesn't apply to our stub navigate anyway.
    // Not implemented: using the replacement flag.

    navigate(this._relevantDocument._defaultView, url);
  }

  toString() {
    return this.href;
  }

  get href() {
    return whatwgURL.serializeURL(this._url);
  }
  set href(v) {
    const newURL = whatwgURL.parseURL(v, { baseURL: whatwgURL.parseURL(documentBaseURL(this._relevantDocument)) });

    this._locationObjectSetterNavigate(newURL);
  }

  get origin() {
    return whatwgURL.serializeURLToUnicodeOrigin(this._url);
  }

  get protocol() {
    return this._url.scheme + ":";
  }
  set protocol(v) {
    const copyURL = Object.assign({}, this._url);

    whatwgURL.basicURLParse(v + ":", { url: copyURL, stateOverride: "scheme start" });

    if (copyURL.scheme !== "http" && copyURL.scheme !== "https") {
      return;
    }

    this._locationObjectSetterNavigate(copyURL);
  }

  get host() {
    const url = this._url;

    if (url.host === null) {
      return "";
    }
    if (url.port === null) {
      return whatwgURL.serializeHost(url.host);
    }

    return whatwgURL.serializeHost(url.host) + ":" + whatwgURL.serializeInteger(url.port);
  }
  set host(v) {
    const copyURL = Object.assign({}, this._url);

    if (copyURL.nonRelative) {
      return;
    }

    whatwgURL.basicURLParse(v, { url: copyURL, stateOverride: "host" });

    this._locationObjectSetterNavigate(copyURL);
  }

  get hostname() {
    if (this._url.host === null) {
      return "";
    }

    return whatwgURL.serializeHost(this._url.host);
  }
  set hostname(v) {
    const copyURL = Object.assign({}, this._url);

    if (copyURL.nonRelative) {
      return;
    }

    whatwgURL.basicURLParse(v, { url: copyURL, stateOverride: "hostname" });

    this._locationObjectSetterNavigate(copyURL);
  }

  get port() {
    if (this._url.port === null) {
      return "";
    }

    return whatwgURL.serializeInteger(this._url.port);
  }
  set port(v) {
    const copyURL = Object.assign({}, this._url);

    if (copyURL.host === null || copyURL.nonRelative || copyURL.scheme === "file") {
      return;
    }

    whatwgURL.basicURLParse(v, { url: copyURL, stateOverride: "port" });

    this._locationObjectSetterNavigate(copyURL);
  }

  get pathname() {
    const url = this._url;

    if (url.nonRelative) {
      return url.path[0];
    }

    return "/" + url.path.join("/");
  }
  set pathname(v) {
    const copyURL = Object.assign({}, this._url);

    if (copyURL.nonRelative) {
      return;
    }

    copyURL.path = [];
    whatwgURL.basicURLParse(v, { url: copyURL, stateOverride: "path start" });

    this._locationObjectSetterNavigate(copyURL);
  }

  get search() {
    if (this._url.query === null || this._url.query === "") {
      return "";
    }

    return "?" + this._url.query;
  }
  set search(v) {
    const copyURL = Object.assign({}, this._url);

    if (v === "") {
      copyURL.query = null;
    } else {
      const input = v[0] === "?" ? v.substring(1) : v;
      copyURL.query = "";
      whatwgURL.basicURLParse(input, {
        url: copyURL,
        stateOverride: "query",
        encodingOverride: this._relevantDocument.charset
      });
    }

    this._locationObjectSetterNavigate(copyURL);
  }

  get hash() {
    if (this._url.fragment === null || this._url.fragment === "") {
      return "";
    }

    return "#" + this._url.fragment;
  }
  set hash(v) {
    const copyURL = Object.assign({}, this._url);

    if (copyURL.scheme === "javascript") {
      return;
    }

    if (v === "") {
      copyURL.fragment = null;
    } else {
      const input = v[0] === "#" ? v.substring(1) : v;
      copyURL.fragment = "";
      whatwgURL.basicURLParse(input, { url: copyURL, stateOverride: "fragment" });
    }

    this._locationObjectSetterNavigate(copyURL);
  }

  assign(url) {
    let parsedURL;
    try {
      parsedURL = resolveURLToResultingParsedURL(url, this._relevantDocument.URL);
    } catch (e) {
      throw new DOMException(DOMException.SYNTAX_ERR, `Could not resolve the given string "${url}" relative to the ` +
        `base URL "${this._relevantDocument.URL}"`);
    }

    this._locationObjectNavigate(parsedURL);
  }

  replace(url) {
    let parsedURL;
    try {
      parsedURL = resolveURLToResultingParsedURL(url, this._relevantDocument.URL);
    } catch (e) {
      throw new DOMException(DOMException.SYNTAX_ERR, `Could not resolve the given string "${url}" relative to the ` +
        `base URL "${this._relevantDocument.URL}"`);
    }

    this._locationObjectNavigate(parsedURL, { replacement: true });
  }

  reload() {
    notImplemented("location.reload()", this._relevantDocument._defaultView);
  }
};
