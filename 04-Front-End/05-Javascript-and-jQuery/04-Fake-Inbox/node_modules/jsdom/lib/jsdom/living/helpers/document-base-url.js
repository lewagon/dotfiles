"use strict";
const internalQuerySelector = require("./selectors").querySelector;
const internalGetAttr = require("../attributes").getAttributeValue;
const whatwgURL = require("whatwg-url");
const idlUtils = require("../generated/utils");

exports.documentBaseURL = document => {
  // https://html.spec.whatwg.org/multipage/infrastructure.html#document-base-url

  let firstBase = internalQuerySelector(document, "base[href]");
  if (firstBase) {
    firstBase = idlUtils.implForWrapper(firstBase);
  }
  const fallbackBaseURL = exports.fallbackBaseURL(document);

  if (firstBase === null) {
    return fallbackBaseURL;
  }

  return exports.frozenBaseURL(firstBase, fallbackBaseURL);
};

exports.fallbackBaseURL = document => {
  // https://html.spec.whatwg.org/multipage/infrastructure.html#fallback-base-url

  // Unimplemented: <iframe srcdoc>

  if (document.URL === "about:blank" && document._defaultView &&
      document._defaultView._parent !== document._defaultView) {
    return exports.documentBaseURL(document._defaultView._parent._document);
  }

  return document.URL;
};

exports.frozenBaseURL = (baseElement, fallbackBaseURL) => {
  // https://html.spec.whatwg.org/multipage/semantics.html#frozen-base-url
  // The spec is eager (setting the frozen base URL when things change); we are lazy (getting it when we need to)

  const baseHrefAttribute = internalGetAttr(baseElement, "href");

  try {
    return whatwgURL.serializeURL(whatwgURL.parseURL(baseHrefAttribute, {
      baseURL: whatwgURL.parseURL(fallbackBaseURL)
    }));
  } catch (e) {
    return fallbackBaseURL;
  }
};

exports.resolveURLToResultingParsedURL = (url, absoluteURLOrElement) => {
  // https://html.spec.whatwg.org/#resolve-a-url

  // Encoding stuff ignored; always UTF-8 for us, for now.

  const base = typeof absoluteURLOrElement === "string" ? absoluteURLOrElement :
               exports.documentBaseURL(absoluteURLOrElement._ownerDocument);
  const baseURLRecord = whatwgURL.parseURL(base);

  return whatwgURL.parseURL(url, { baseURL: baseURLRecord });
  // This returns the resulting parsed URL; to get the resulting absolute URL, just serialize it.
};
