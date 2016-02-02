## 4.5.1

* Removed unnecessary browserify dependency that was erroneously included in 4.5.0.

## 4.5.0

* Added `document.currentScript`. (jeffcarp)

## 4.4.0

* All resources are now loaded with the [request](https://www.npmjs.com/package/request) package, which means that e.g. GZIPped resources will be properly uncompressed, redirects will be followed, and more. This was previously the case only for URLs passed directly to `jsdom.env`, and not for sub-resources inside the resulting page. (ssesha)

## 4.3.0

* Made the click behavior for radio buttons and checkboxes work when doing `el.dispatchEvent(clickEvent)`, not just when doing `el.click()`. (brandon-bethke-neudesic)
* Added `defaultPrevented` property to `Event` instances, reflecting whether `ev.preventDefault()` has been called. (brandon-bethke-neudesic)
* Moved the `click()` method from `HTMLInputElement.prototype` to `HTMLElement.prototype`, per the latest spec.
* Made the `click()` method trigger a `MouseEvent` instead of just an `Event`.

## 4.2.0

* Added a second parameter to `UIEvent`, `MouseEvent`, and `MutationEvent`, which for now just behaves the same as that for `Event`. (Rich-Harris)

## 4.1.0

* Added a second parameter to the `Event` constructor, which allows you to set the `bubbles` and `cancelable` properties. (brandon-bethke-neudesic)

## 4.0.5

* Added `HTMLUnknownElement` and fix the parser/`document.createElement` to create those instead of `HTMLElement` for unknown elements.
* Fixed issues with named and indexed properties on `window`, as well as `window.length`, with regard to `<frame>`s/`<iframe>`s being added and removed from the document.

_Note:_ this probably should have been a minor version number increment (i.e. 4.1.0 instead of 4.0.5), since it added `HTMLUnknownElement`. We apologize for the deviation from semver.

## 4.0.4

* Fixed parsing of doctypes by relying on the information provided by the html parser if possible.

## 4.0.3

* Fixed events fired from `EventTarget`s to execute their handlers in FIFO order, as per the spec.
* Fixed a case where `childNodes` would not be correctly up to date in some cases. (medikoo)
* Sped up window creation with `jsdom.env` by ~600%, for the special case when no scripts are to be executed.

## 4.0.2

* `EventTarget` is now correctly in the prototype chain of `Window`.
* `EventTarget` argument validation is now correct according to the DOM Standard.
* `DOMException` now behaves more like it should per Web IDL. In particular it has a more comprehensive set of constants, and instances now have `name` properties.
* `new Event("click")` can now be dispatched. (lovebear)
* `document.createEvent` now behaves more like it should according to the DOM Standard: it accepts a wider range of arguments, but will throw if an invalid one is given. (lovebear)
* Fixed a regression in our browser support that required Chrome 41 as of 4.0.1; now Chrome 40 will work, as well as (in theory, although less well-tested) the latest stable versions of Firefox and IE.

## 4.0.1

* Fixed: `Node.prototype.contains` to always return a boolean. This was a regression in 3.1.1. (Joris-van-der-Wel)
* Fixed: `Document.prototype` no longer contains its own `ownerDocument` getter, instead correctly delegating to `Node.prototype`.
* Fixed: some edge cases regarding running `<script>`s in browserified jsdom.
* A couple fixes from updated dependencies (although you would have gotten these anyway with a fresh install, due to floating version specifiers):
    - csstyle minimum version bumped from 0.2.21 to 0.2.23, fixing handling of `0` when setting numeric CSS properties and parsing of shorthand `font` declarations.
    - parse5 minimum version bumped from 1.3.1 to 1.3.2 to, fixing the parsing of `<form>` elements inside `<template>` elements.

## 4.0.0

This release relies on the newly-overhauled `vm` module of io.js to eliminate the Contextify native module dependency. jsdom should now be much easier to use and install, without requiring a C++ compiler toolchain!

Note that as of this release, jsdom no longer works with Node.js™, and instead requires io.js. You are still welcome to install a release in [the 3.x series](https://github.com/tmpvar/jsdom/tree/3.x) if you are stuck on legacy technology like Node.js™.

In the process of rewriting parts of jsdom to use `vm`, a number of related fixes were made regarding the `Window` object:

* In some cases, state was implicitly shared between `Window` instances—especially parser- and serializer-related state. This is no longer the case, thankfully.
* A number of properties of `Window` were updated for spec compliance: some data properties became accessors, and all methods moved from the prototype to the instance.
* The non-standard `document.parentWindow` was removed, in favor of the standard `document.defaultView`. Our apologies for encouraging use of `parentWindow` in our README, tests, and examples.

## 3.1.2

* Some fixes to the `NOT_IMPLEMENTED` internal helper, which should eliminate the cases where calling e.g. `window.alert` crashes your application.
* Fixed a global variable leak when triggering `NOT_IMPLEMENTED` methods, like `window.location.reload`.
* Fixed the URL resolution algorithm to handle `about:blank` properly on all systems (previously it only worked on Windows). This is especially important since as of 3.0.0 the default URL is `about:blank`.
* Fixed, at least partially, the ability to run `<script>`s inside a browserified jsdom instance. This is done by dynamically rewriting the source code so that global variable references become explicit references to `window.variableName`, so it is not foolproof.

## 3.1.1

* Updated `Node.prototype.isEqualNode` to the algorithm of the DOM Standard, fixing a bug where it would throw an error along the way.
* Removed `Node.prototype.isSameNode`, which is not present in the DOM Standard (and was just a verbose `===` check anyway).
* Fixed a couple small issues while browserifying, mainly around `jsdom.env`. However, while doing so discovered that `<script>`s in general don't work too well in a browserified jsdom; see [#1023](https://github.com/tmpvar/jsdom/issues/1023).

## 3.1.0

* Added support for [custom external resource loading](https://github.com/tmpvar/jsdom#custom-external-resource-loader). (tobie)

## 3.0.3

* Fixed some stray byte-order marks in a couple files, which incidentally [break Browserify](https://github.com/substack/node-browserify/issues/1095). (sterpe)

## 3.0.2

* Fixed another edge case where unchecking a radio button would incorrectly uncheck radio buttons outside the containing form. (zpao)

## 3.0.1

* Fixed errors when serializing text nodes (possibly only occurred when inside `<template>`).
* Handle null bytes being passed to `jsdom.env`'s autodetecting capabilities. (fluffybunnies)
* Handle empty HTML strings being passed to `jsdom.env`'s `html` option. (fluffybunnies)

## 3.0.0

This release updates large swathes of the DOM APIs to conform to the standard, mostly by removing old stuff. It also fixes a few bugs, introduces a couple new features, and changes some defaults.

3.0.x will be the last release of jsdom to support Node.js. All future releases (starting with 4.0.0) will require [io.js](https://iojs.org/), whose [new `vm` module](https://github.com/iojs/io.js/blob/v1.x/CHANGELOG.md#vm) will allow us to remove our contextify native-module dependency. (Given that I submitted the relevant patch to joyent/node [1.5 years ago](https://github.com/joyent/node/commit/7afdba6e0bc3b69c2bf5fdbd59f938ac8f7a64c5), I'm very excited that we can finally use it!)

* By default documents now use `about:blank` as their URL, instead of trying to infer some type of file URL from the call site (in Node.js) or using `location.href` (in browsers).
* Introduced a new "virtual console" abstraction for capturing console output from inside the page. [See the readme for more information.](https://github.com/tmpvar/jsdom#capturing-console-output) Note that `console.error` will no longer contribute to the (non-standard, and likely dying in the future) `window.errors` array. (jeffcarp)
* Added the named `new Image(width, height)` constructor. (vinothkr)
* Fixed an exception when using `querySelector` with selectors like `div:last-child > span[title]`.
* Removed all traces of entities, entity types, notations, default attributes, and CDATA sections.
* Differentiated between XML and HTML documents better, for example in how they handle the casing of tag names and attributes.
* Updated `DOMImplementation` to mostly work per-spec, including removing `addFeature` and `removeFeature` methods, the `ownerDocument` property, and making `hasFeature` always return `true`.
* Re-did the `CharacterData` implementation to follow the algorithms in the DOM Standard; this notably removes a few exceptions that were previously thrown.
* Re-did `Comment`, `Text`, and `ProcessingInstruction` to follow the DOM Standard and derive from `CharacterData`.
* Re-did `DocumentType` to follow the DOM Standard and be much simpler, notably removing notations, entities, and default attributes.
* Fixed a variety of accessors on `Node`, `Element`, `Attr`, and `Document`; some were removed that were nonstandard (especially setters); others were updated to reflect the spec; etc.
* Re-did name/qname validation, which is done by various APIs, to work with the xml-name-validator package and some centralized algorithms.
* Made the XML parser at least somewhat aware of processing instructions.
* Cleaned up doctype parsing and association between doctypes and documents. More exotic doctypes should parse better now.
* `document.contentType` now is generally inferred from the parsing mode of the document.
* Moved some properties to `Document.prototype` and `Window.prototype` instead of setting them as own properties during the document/window creation. This should improve memory usage (as well as spec compliance).

## 2.0.0

This release is largely a refactoring release to remove the defunct concept of "levels" from jsdom, in favor of the [living standard model](https://wiki.whatwg.org/wiki/FAQ#What_does_.22Living_Standard.22_mean.3F) that browsers follow. Although the code is still organized that way, that's now [noted as a historical artifact](https://github.com/tmpvar/jsdom/blob/2ff5747488ad4b518fcef97a026c82eab42a0a14/lib/README.md). The public API changes while doing so were fairly minimal, but this sets the stage for a cleaner jsdom code structure going forward.

* Removed: `jsdom.level`, and the `level` option from `jsdom.jsdom`.
* Change: the nonstandard `Element.prototype.matchesSelector` method was replaced with the standard `Element.prototype.matches`. (KenPowers)
* Fix: `querySelector` correctly coerces its argument to a string (1.2.2 previously fixed this for `querySelectorAll`).

## 1.5.0

* Add: missing `window.console` methods, viz. `assert`, `clear`, `count`, `debug`, `group`, `groupCollapse`, `groupEnd`, `table`, `time`, `timeEnd`, and `trace`. All except `assert` do nothing for now, but see [#979](https://github.com/tmpvar/jsdom/issues/979) for future plans. (jeffcarp)
* Tweak: make `childNodes`, and the many places in jsdom that use it, much faster. (Joris-van-der-Wel)

## 1.4.1

* Tweak: faster implementation of `NodeList.prototype.length`, which should speed up common operations like `appendChild` and similar. (Joris-van-der-Wel)

## 1.4.0

* Fix: `HTMLInputElement.prototype.checked` and `defaultChecked` now behave per the spec. (Joris-van-der-Wel)
* Fix: `HTMLOptionElement.prototype.selected` now behaves per the spec. (Joris-van-der-Wel)
* Fix: `HTMLInputElement.prototype.value` now behaves per the spec. (Joris-van-der-Wel)
* Fix: `HTMLTextAreaElement.prototype.value` and `defaultValue` now behave per the spec. (Joris-van-der-Wel)
* Add: `HTMLTextAreaElement.prototype.defaultValue` now has a setter, and `HTMLTextAreaElement.prototype.textLength` now exists. (Joris-van-der-Wel)
* Fix: resetting a `<form>` now behaves per spec for all different types of form elements. (Joris-van-der-Wel)
* Fix: radio buttons reset other radio buttons correctly now per the spec. (Joris-van-der-Wel)
* Fix: `document.cloneNode` now works. (AVGP)
* Fix: `hasAttribute` is now case-insensitive, as it should be. (AVGP)
* Fix: `div.toString()` now returns `[object HTMLDivElement]`. (AVGP)

## 1.3.2

* Fix: check if `module.parent` exists before using it to construct a document's initial URL. Apparently some testing frameworks like Jest do not correctly emulate the module environment; this compensates. (SegFaultx64)

## 1.3.1

* Fix: changing attributes on `<option>` elements will now have the correct consequences. For example changing the `id` attribute now interacts correctly with `document.getElementById`. (Joris-van-der-Wel)

## 1.3.0

* Add: moved `focus` and `blur` methods to `HTMLElement.prototype`, instead of having them only be present on certain element prototypes. Our focus story is still not very spec-compliant, but this is a step in the right direction. (vincentsiao)

## 1.2.3

* Tweak: improve performance of `Node.prototype.insertBefore`, `Node.prototype.removeChild`, and several `AttributeList` methods. (Joris-van-der-Wel)

## 1.2.2

* Fix: `querySelectorAll` correctly coerces its argument to a string; notably this allows you to pass arrays. (jeffcarp)
* Fix: the `data` setter on text nodes correctly coerces the new value to a string. (medikoo)
* Fix: `document.toString()` now returns `[object HTMLDocument]`. (jeffcarp)

## 1.2.1

* Fix: handling of `<template>` element parsing and serialization, now that it is supported by parse5. (inikulin)

## 1.2.0

* Add: `NodeFilter`, in particular its constants. (fhemberger)
* Fix: initial `history.length` should be `1`, not `0`. (rgrove)
* Fix: `history.pushState` and `history.replaceState` should not fire the `popstate` event. (rgrove)

## 1.1.0

* Add: `document.implementation.createHTMLDocument()`. (fhemberger)
* Fix: `localName` was sometimes `null` for elements when it should not be. (fhemberger)

## 1.0.3

* Update: no longer requiring separate `cssstyle` and `cssstyle-browserify` dependencies; now `cssstyle` can be used directly. This also un-pins the `cssstyle` dependency so that future fixes arrive as they appear upstream.

## 1.0.2

* Fix: temporarily pin `cssstyle` dependency to at most 0.2.18 until [chad3814/CSSStyleDeclaration#20](https://github.com/chad3814/CSSStyleDeclaration/issues/20) is fixed.
* Fix: browserifying jsdom should work better now that the required packages are included as `dependencies` instead of `devDependencies`. (Sebmaster)
* Fix: using `jsom.env` in a browser environment now correctly defaults `options.url` to `location.href` instead of trying to infer a reasonable `fil://` URL using techniques that fail in the browser. (rattrayalex)

## 1.0.1

* Fix: the return value of `EventTarget.prototype.dispatchEvent` should be `true` when the default is *not* prevented; previously it was the opposite. (eventualbuddha)

## 1.0.0

For a consolidated list of changes from 0.11.1 to 1.0.0, see [this wiki page](https://github.com/tmpvar/jsdom/wiki/Changes-from-0.11.1-to-1.0.0).

* Remove: nonstandard `EventTarget.getListeners`; `EventTarget.forwardIterator`; `EventTarget.backwardIterator`; `EventTarget.singleIterator`.
* Remove: nonstandard `document.innerHTML`. (jorendorff)
* Fix: `value` and `defaultValue` properties of a `HTMLInputElement` are now correctly synced to the `value=""` attribute. (Sebmaster)

## 1.0.0-pre.7

* Remove: support for old, untested HTML and XML parsers, namely davglass/node-htmlparser and isaacs/sax-js. In the future we plan to work toward a standardized parsing interface that other parsers can implement, instead of adding custom code to jsdom for various parsers. This interface still is being decided though, as it needs to support complex things like pausing the parse stream (for `document.write`) and parsing disconnected fragments (for `document.innerHTML`). (Sebmaster)
* Add: new `parsingMode` configuration, to allow you to manually specify XML or HTML. (Sebmaster)
* Change: jsdom will no longer use the presence of `<?xml` or similar to attempt to auto-detect XHTML documents. Instead, it will by default treat them the same as browsers do, with the `<?xml` declaration just being a bogus comment. If you need your document interpreted as XHTML instead of HTML, use the `parsingMode` option. (Sebmaster)
* Tweak: memoize various DOM-querying functions (e.g. `getElementsByTagName`, `querySelector`, etc.) to improve performance. (ccarpita)

## 1.0.0-pre.6

* Fix: another parsing issues with void elements and `innerHTML`, this time related to disconnected nodes. This was a regression between 0.11.1 and 1.0.0-pre.1. (paton)
* Fix: same-named radio inputs should not be mutually exclusive unless they are in the same form. (stof)

## 1.0.0-pre.5

* Fix: sometimes calling `window.close()` would cause a segfault. (paton)

## 1.0.0-pre.4

* Fix: attributes and elements now have their `prefix`, `localName`, and `namespaceURI` properties set correctly in all cases. (Excepting `application/xhtml+xml` mode, which jsdom does not support yet.) (Sebmaster)

## 1.0.0-pre.3

* Fix: void elements no longer parsed correctly when using `innerHTML`. This was a regression between 0.11.1 and 1.0.0-pre.1. (Sebmaster)

## 1.0.0-pre.2

* Fix: parsing and serialization of attributes in the form `x:y`, e.g. `xmlns:xlink` or `xlink:href`. This was a regression between 0.11.1 and 1.0.0-pre.1. (Sebmaster)

## 1.0.0-pre.1

This is a prerelease of jsdom's first major version. It incorporates several great additions, as well as a general cleanup of the API surface, which make it more backward-incompatible than usual. Starting with the 1.0.0 release, we will be following semantic versioning, so that you can depend on stability within major version ranges. But we still have [a few more issues](https://github.com/tmpvar/jsdom/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0) before we can get there, so I don't want to do 1.0.0 quite yet.

This release owes a special thanks to [@Sebmaster](https://github.com/Sebmaster), for his amazing work taking on some of the hardest problems in jsdom and solving them with gusto.

### Major changes

* jsdom now can be browserified into a bundle that works in web workers! This is highly experimental, but also highly exciting! (lawnsea)
* An overhaul of the [initialization lifecycle](https://github.com/tmpvar/jsdom#initialization-lifecycle), to bring more control and address common use cases. (Sebmaster)
* The excellent [parse5](https://npmjs.org/package/parse5) HTML parser is now the default parser, fixing many parsing bugs and giving us full, official-test-suite-passing HTML parsing support. This especially impacts documents that didn't include optional tags like `<html>`, `<head>`, or `<body>` in their source. We also use parse5 for serialization, fixing many bugs there. (Sebmaster)
* As part of the new parser story, we are not supporting XML for now. It might work if you switch to a different parser (e.g. htmlparser2), but in the end, HTML and XML are very different, and we are not attempting to be an XML DOM. That said, we eventually want to support XML to the same extent browsers do (i.e., support XHTML and SVG, with an appropriate MIME type switch); this is being planned in [#820](https://github.com/tmpvar/jsdom/issues/820).

### Removed jsdom APIs

* `jsdom.createWindow`: use `document.parentWindow` after creating a document
* `jsdom.html`: use `jsdom.jsdom`
* `jsdom.version`: use `require("jsdom/package.json").version`
* `jsdom.level`: levels are deprecated and will probably be removed in 2.0.0
* `jsdom.dom`
* `jsdom.browserAugmentation`
* `jsdom.windowAugmentation`

### Changed jsdom APIs

* `jsdom.jsdom` no longer takes a level as its second argument.
* `jsdom.jQueryify` now requires a jQuery URL, since [always picking the latest was a bad idea](http://blog.jquery.com/2014/07/03/dont-use-jquery-latest-js/).

### Removed non-standard DOM APIs

* `document.createWindow`: use `document.parentWindow`
* `document.innerHTML` and `document.outerHTML`: use the new `jsdom.serializeDocument` to include the DOCTYPE, or use `document.documentElement.outerHTML` to omit it.

### Other fixes

* Allow empty strings to be passed to `jsdom.env`. (michaelmior)
* Fix for a memory leak in `EventTarget.prototype.dispatchEvent`. (Joris-van-der-Wel)
* Make event listeners in the capture phase also fire on the event target. (Joris-van-der-Wel)
* Correctly reset `eventPhase` and `currentTarget` on events, before and after a dispatch. (Joris-van-der-Wel)
* Fix `document.cookie = null` to not throw, but instead just do nothing. (kapouer)

## 0.11.1

* Add: `Node.prototype.parentElement`. (lukasbuenger)
* Fix: attributes that are reflected as properties should be `''` when not present, instead of `null`. (Note that `getAttribute` still returns `null` for them). (thejameskyle)
* Fix: `textContent` now works for nodes that do not have children, like text nodes for example. (hayes)
* Fix: `jsdom.jQueryify` was using the wrong URL for jQuery by default. (lukasbuenger)

## 0.11.0

* Add: new default level, `living`, reflecting our focus on the [DOM Living Standard](http://dom.spec.whatwg.org/) and the [HTML Living Standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/), which are what browsers actually implement. This should open the door for more features of the modern DOM and HTML specs to be implemented in jsdom. (robotlovesyou)
* Add: `Node.prototype.contains` now implemented. (robotlovesyou)
* Add: `navigator.cookieEnabled` now implemented; it always returns `true`. (Sebmaster)
* Change: DOCTYPEs no longer have their `name` property uppercased during parsing, and appear in the output of `document.innerHTML`.
* Fix: `Node.prototype.compareDocumentPosition` implemented correctly; various document position constants added to the `Node` constructor. (robotlovesyou)
* Fix: `DocumentType.prototype.parentNode` now returns the document node, not `null`. (robotlovesyou)
* Fix: various `navigator` properties are now getters, not data properties. (Sebmaster)
* Fix: a bug involving invalid script paths and `jsdom.jQueryify`. (Sebmaster)

## 0.10.6

* Add: remaining URL properties to `window.location` and `HTMLAnchorElement`.
* Fix: the presence of `String.prototype.normalize`, which is available by default in Node 0.11.13 onwards, caused reflected attributes to break. (brock8503)
* Fix: iframes now correctly load `about:blank` when the `src` attribute is empty or missing. (mcmathja)
* Fix: documents containing only whitespace now correctly generate wrapper documents, just like blank documents do. (nikolas)
* Tweak: lazy-load the request module, to improve overall jsdom loading time. (tantaman)

## 0.10.5

* Fix: the list of void elements has been updated to match the latest HTML spec.
* Fix: when serializing void elements, don't include a ` /`: i.e. the result is now `<br>` instead of `<br />`.

## 0.10.4

* Fix: another case was found where jQuery 1.11's `show()` method would cause errors.
* Add: `querySelector` and `querySelectorAll` methods to `DocumentFragment`s. (Joris-van-der-Wel)

## 0.10.3

* Fix: various defaults on `HTMLAnchorElement` and `window.location` should not be `null`; they should usually be the empty string.

## 0.10.2

* Fix: Using jQuery 1.11's `show()` method would cause an error to be thrown.
* Fix: `window.location` properties were not updating correctly after using `pushState` or `replaceState`. (toomanydaves)

## 0.10.1

* Fix: `window.location.port` should default to `""`, not `null`. (bpeacock)

## 0.10.0

* Add: a more complete `document.cookie` implementation, that supports multiple cookies. Note that options like `path`, `max-age`, etc. are still ignored. (dai-shi)

## 0.9.0

* Add: implement attribute ordering semantics from WHATWG DOM spec, and in general overhaul attribute storage implementation to be much more awesome and accurate. (lddubeau)
* Add: `port` and `protocol` to `HTMLAnchorElement`. (sporchia)
* Fix: make `HTMLInputElement` not have a `type` *attribute* by default. It still has a default value for the `type` *property*, viz. `"text"`. (aredridel)
* Fix: treat empty namespace URI as meaning "no namespace" with the `getAttributeNS`, `hasAttributeNS`, and `setAttributeNS` functions. (lddubeau)
* Fix: reference typed arrays in a way that doesn't immediately break on Node 0.6. Node 0.6 isn't supported in general, though. (kangax)

## 0.8.11

* Add: store and use cookies between requests; customizable cookie jars also possible. (stockholmux)
* Fix: attributes named the same as prototype properties of `NamedNodeMap` no longer break jsdom. (papandreou)
* Fix: `removeAttributeNS` should not throw on missing attributes. (lddubeau)
* Change: remove `__proto__`, `__defineGetter__`, and `__defineSetter__` usage, as part of a project to make jsdom work better across multiple environments. (lawnsea)

## 0.8.10

* Add: `hash` property to `HTMLAnchorElement`. (fr0z3nk0)

## 0.8.9

* Upgrade: `cssom` to 0.3.0, adding support for `@-moz-document` and fixing a few other issues.
* Upgrade: `cssstyle` to 0.2.6, adding support for many shorthand properties and better unit handling.

## 0.8.8

* Fix: avoid repeated `NodeList.prototype.length` calculation, for a speed improvement. (peller)

## 0.8.7

* Add: `host` property to `HTMLAnchorElement`. (sporchia)

## 0.8.6

* Fix: stop accidentally modifying `Error.prototype`. (mitar)
* Add: a dummy `getBoundingClientRect` method, that returns `0` for all properties of the rectangle, is now implemented. (F1LT3R)

## 0.8.5

* Add: `href` property on `CSSStyleSheet` instances for external CSS files. (FrozenCow)

## 0.8.4

 * Add: typed array constructors on the `window`. (nlacasse)
 * Fix: `querySelector` and `querySelectorAll` should be on the prototypes of `Element` and `Document`, not own-properties. (mbostock)

## 0.8.3

 * Fix: when auto-detecting whether the first parameter to `jsdom.env` is a HTML string or a filename, deal with long strings correctly instead of erroring. (baryshev)

## 0.8.2

 * Add: basic `window.history` support, including `back`, `forward`, `go`, `pushState`, and `replaceState`. (ralphholzmann)
 * Add: if an `<?xml?>` declaration starts the document, will try to parse as XML, e.g. not lowercasing the tags. (robdodson)
 * Fix: tag names passed to `createElement` are coerced to strings before evaluating.

## 0.8.1 (hotfix)

 * Fix: a casing issue that prevented jsdom from loading on Unix and Solaris systems. (dai-shi)
 * Fix: `window.location.replace` was broken. (dai-shi)
 * Fix: update minimum htmlparser2 version, to ensure you get the latest parsing-related bugfixes.

## 0.8.0

 * Add: working `XMLHttpRequest` support, including cookie passing! (dai-shi)
 * Add: there is now a `window.navigator.noUI` property that evaluates to true, if you want to specifically distinguish jsdom in your tests.

## 0.7.0

 * Change: the logic when passing `jsdom.env` a string is more accurate, and you can be explicit by using the `html`, `url`, or `file` properties. This is a breaking change in the behavior of `html`, which used to do the same auto-detection logic as the string-only version.
 * Fix: errors raised in scripts are now passed to `jsdom.env`'s callback. (airportyh)
 * Fix: set `window.location.href` correctly when using `jsdom.env` to construct a window from a URL, when that URL causes a redirect. (fegs)
 * Add: a more complete and accurate `window.location` object, which includes firing `hashchange` events when the hash is changed. (dai-shi)
 * Add: when using a non-implemented feature, mention exactly what it was that is not implemented in the error message. (papandreou)

## 0.6.5

 * Fix: custom attributes whose names were the same as properties of `Object.prototype`, e.g. `"constructor"`, would confuse jsdom massively.

## 0.6.4

 * Fix: CSS selectors which contain commas inside quotes are no longer misinterpreted. (chad3814)
 * Add: `<img>` elements now fire `"load"` events when their `src` attributes are changed. (kapouer)

## 0.6.3

 * Fix: better automatic detection of URLs vs. HTML fragments when using `jsdom.env`. (jden)

## 0.6.2

 * Fix: URL resolution to be amazing and extremely browser-compatible, including the interplay between the document's original URL, any `<base>` tags that were set, and any relative `href`s. This impacts many parts of jsdom having to do with external resources or accurate `href` and `src` attributes. (deitch)
 * Add: access to frames and iframes via named properties. (adrianlang)
 * Fix: node-canvas integration, which had been broken since 0.5.7.

## 0.6.1

 * Make the code parseable with Esprima. (squarooticus)
 * Use the correct `package.json` field `"repository"` instead of `"repositories"` to prevent npm warnings. (jonathanong)

## 0.6.0

Integrated a new HTML parser, [htmlparser2](https://npmjs.org/package/htmlparser2), from fb55. This is an actively maintained and much less buggy parser, fixing many of our parsing issues, including:

 * Parsing elements with optional closing tags, like `<p>` or `<td>`.
 * The `innerHTML` of `<script>` tags no longer cuts off the first character.
 * Empty attributes now have `""` as their value instead of the attribute name.
 * Multiline attributes no longer get horribly mangled.
 * Attribute names can now be any value allowed by HTML5, including crazy things like `^`.
 * Attribute values can now contain any value allowed by HTML5, including e.g. `>` and `<`.

## 0.5.7

 * Fix: make event handlers attached via `on<event>` more spec-compatible, supporting `return false` and passing the `event` argument. (adrianlang)
 * Fix: make the getter for `textContent` more accurate, e.g. in cases involving comment nodes or processing instruction nodes. (adrianlang)
 * Fix: make `<canvas>` behave like a `<div>` when the `node-canvas` package isn't available, instead of crashing. (stepheneb)

## 0.5.6

 * Fix: `on<event>` properties are correctly updated when using `setAttributeNode`, `attributeNode.value =`, `removeAttribute`, and `removeAttributeNode`; before it only worked with `setAttribute`. (adrianlang)
 * Fix: `HTMLCollection`s now have named properties based on their members' `id` and `name` attributes, e.g. `form.elements.inputId` is now present. (adrianlang)

## 0.5.5

 * Fix: `readOnly` and `selected` properties were not correct when their attribute values were falsy, e.g. `<option selected="">`. (adrianlang)

## 0.5.4

This release, and all future releases, require at least Node.js 0.8.

 * Add: parser can now be set via `jsdom.env` configuration. (xavi-)
 * Fix: accessing `rowIndex` for table rows that are not part of a table would throw. (medikoo)
 * Fix: several places in the code accidentally created global variables, or referenced nonexistant values. (xavi-)
 * Fix: `<img>` elements' `src` properties now evaluate relative to `location.href`, just like `<a>` elements' `href` properties. (brianmaissy)

## 0.5.3

This release is compatible with Node.js 0.6, whereas all future releases will require at least Node.js 0.8.

 * Fix: `getAttributeNS` now returns `null` for attributes that are not present, just like `getAttribute`. (mbostock)
 * Change: `"request"` dependency pinned to version 2.14 for Node.js 0.6 compatibility.

## 0.5.2

 * Fix: stylesheets with `@-webkit-keyframes` rules were crashing calls to `getComputedStyle`.
 * Fix: handling of `features` option to `jsdom.env`.
 * Change: retain the value of the `style` attribute until the element's `style` property is touched. (papandreou)

## 0.5.1

 * Fix: `selectedIndex` now changes correctly in response to `<option>` elements being selected. This makes `<select>` elements actually work like you would want, especially with jQuery. (xcoderzach)
 * Fix: `checked` works correctly on radio buttons, i.e. only one can be checked and clicking on one does not uncheck it. Previously they worked just like checkboxes. (xcoderzach)
 * Fix: `click()` on `<input>` elements now fires a click event. (xcoderzach)

## 0.5.0

 * Fix: Make `contextify` a non-optional dependency. jsdom never worked without it, really, so this just caused confusion.

## 0.4.2

 * Fix: `selected` now returns true for the first `<option>` in a `<select>` if nothing is explicitly set.
 * Fix: tweaks to accuracy and speed of the `querySelectorAll` implementation.

## 0.4.1 (hotfix)

 * Fix: crashes when loading HTML files with `<a>` tags with no `href` attribute. (eleith)

## 0.4.0

 * Fix: `getAttribute` now returns `null` for attributes that are not present, as per DOM4 (but in contradiction to DOM1 through DOM3).
 * Fix: static `NodeList`-returning methods (such as `querySelectorAll`) now return a real `NodeList` instance.
 * Change: `NodeList`s no longer expose nonstandard properties to the world, like `toArray`, without first prefixing them with an underscore.
 * Change: `NodeList`s no longer inconsistently have array methods. Previously, live node lists would have `indexOf`, while static node lists would have them all. Now, they have no array methods at all, as is correct per the specification.

## 0.3.4

 * Fix: stylesheets with `@media` rules were crashing calls to `getComputedStyle`, e.g. those in jQuery's initialization.

## 0.3.3

 * Fix: make `document.write` calls insert new elements correctly. (johanoverip, kblomquist).
 * Fix: `<input>` tags with no `type` attribute now return a default value of `"text"` when calling `inputEl.getAttribute("type")`.

## 0.3.2

 * Fix: stylesheets with "joining" rules (i.e. those containing comma-separated selectors) now apply when using `getComputedStyle`. (chad3814, godmar)
 * Add: support for running the tests using @aredridel's [html5](https://npmjs.org/package/html5) parser, as a prelude toward maybe eventually making this the default and fixing various parsing bugs.

## 0.3.1 (hotfix)

 * Fix: crashes when invalid selectors were present in stylesheets.

## 0.3.0

 * Fix: a real `querySelector` implementation, courtesy of the nwmatcher project, solves many outstanding `querySelector` bugs.
 * Add: `matchesSelector`, again via nwmatcher.
 * Add: support for styles coming from `<style>` and `<link rel="stylesheet">` elements being applied to the results of `window.getComputedStyle`. (chad3814)
 * Add: basic implementation of `focus()` and `blur()` methods on appropriate elements. More work remains.
 * Fix: script filenames containing spaces will now work when passed to `jsdom.env`. (TomNomNom)
 * Fix: elements with IDs `toString`, `hasOwnProperty`, etc. could cause lots of problems.
 * Change: A window's `load` event always fires asynchronously now, even if no external resources are necessary.
 * Change: turning off mutation events is not supported, since doing so breaks external-resource fetching.

## 0.2.19

 * Fix: URL resolution was broken on pages that included `href`-less `<base>` tags.
 * Fix: avoid putting `attr` in the global scope when using node-canvas. (starsquare)
 * Add: New `SkipExternalResources` feature accepts a regular expression. (fgalassi)

## 0.2.18

 * Un-revert: cssstyle has fixed its memory problems, so we get back accurate `cssText` and `style` properties again.

## 0.2.17 (hotfix)

 * Revert: had to revert the use of the cssstyle package. `cssText` and `style` properties are no longer as accurate.
 * Fix: cssstyle was causing out-of-memory errors on some larger real-world pages, e.g. reddit.com.

## 0.2.16
 * Update: Sizzle version updated to circa September 2012.
 * Fix: when setting a text node's value to a falsy value, convert it to a string instead of coercing it to `""`.
 * Fix: Use the cssstyle package for `CSSStyleDeclaration`, giving much more accurate `cssText` and `style` properties on all elements. (chad3814)
 * Fix: the `checked` property on checkboxes and radiobuttons now reflects the attribute correctly.
 * Fix: `HTMLOptionElement`'s `text` property should return the option's text, not its value.
 * Fix: make the `name` property only exist on certain specific tags, and accurately reflect the corresponding `name` attribute.
 * Fix: don't format `outerHTML` (especially important for `<pre>` elements).
 * Fix: remove the `value` property from `Text` instances (e.g. text nodes).
 * Fix: don't break in the presence of a `String.prototype.normalize` method, like that of sugar.js.
 * Fix: include level3/xpath correctly.
 * Fix: many more tests passing, especially related to file:/// URLs on Windows. Tests can now be run with `npm test`.

## 0.2.15
 * Fix: make sure that doctypes don't get set as the documentElement (Aria Stewart)
 * Add: HTTP proxy support for jsdom.env (Eugene Ware)
 * Add: .hostname and .pathname properties to Anchor elements to comply with WHATWG standard (Avi Deitcher)
 * Fix: Only decode HTML entities in text when not inside a `<script>` or `<style>` tag. (Andreas Lind Petersen)
 * Fix: HTMLSelectElement single selection implemented its type incorrectly as 'select' instead of 'select-one' (John Roberts)

## 0.2.14
 * Fix: when serializing single tags use ' />' instead of '/>' (kapouer)
 * Fix: support for contextify simulation using vm.runInContext (trodrigues)
 * Fix: allow jsdom.env's config.html to handle file paths which contain spaces (shinuza)
 * Fix: Isolate QuerySelector from prototype (Nao Iizuka)
 * Add: setting textContent to '' or clears children (Jason Davies)
 * Fix: jsdom.env swallows exceptions that occur in the callback (Xavi)

## 0.2.13
 * Fix: remove unused style property which was causing explosions in 0.2.12 and node 0.4.7

## 0.2.12
 * Fix: do not include gmon.out/v8.log/tests in npm distribution

## 0.2.11
 * Add: allow non-unique element ids (Avi Deitcher)
 * Fix: make contexify an optional dependency (Isaac Schlueter)
 * Add: scripts injected by jsdom are now marked with a 'jsdom' class for serialization's sake (Peter Lyons)
 * Fix: definition for ldquo entity (Andrew Morton)
 * Fix: access NamedNodeMap items via property (Brian McDaniel)
 * Add: upgrade sizzle from 1.0 to [fe2f6181](https://github.com/jquery/sizzle/commit/fe2f618106bb76857b229113d6d11653707d0b22) which is roughly 1.5.1
 * Add: documentation now includes `jsdom.level(x, 'feature')`
 * Fix: make `toArray` and `item` on `NodeList` objects non-enumerable properties
 * Add: a reference to `window.close` in the readme
 * Fix: Major performance boost (Felix Gnass)
 * Fix: Using querySelector `:not()` throws a `ReferenceError` (Felix Gnass)

## 0.2.10
 * Fix: problems with lax dependency versions
 * Fix: CSSOM constructors are hung off of the dom (Brian McDaniel)
 * Fix: move away from deprecated 'sys' module
 * Fix: attribute event handlers on bubbling path aren't called (Brian McDaniel)
 * Fix: setting textarea.value to markup should not be parsed (Andreas Lind Petersen)
 * Fix: content of script tags should not be escaped (Ken Sternberg)
 * Fix: DocumentFeatures for iframes with no src attribute. (Brian McDaniel) Closes #355
 * Fix: 'trigger' to 'raise' to be a bit more descriptive
 * Fix: When `ProcessExternalResources['script']` is disabled, do _not_ run inline event handlers. #355
 * Add: verbose flag to test runner (to show tests as they are running and finishing)

## 0.2.9
 * Fix: ensure features are properly reset after a jsdom.env invocation. Closes #239
 * Fix: ReferenceError in the scanForImportRules helper function
 * Fix: bug in appendHtmlToElement with HTML5 parser (Brian McDaniel)
 * Add: jsonp support (lheiskan)
 * Fix: for setting script element's text property (Brian McDaniel)
 * Fix: for jsdom.env src bug
 * Add: test for jsdom.env src bug (multiple done calls)
 * Fix: NodeList properties should enumerate like arrays (Felix Gnass)
 * Fix: when downloading a file, include the url.search in file path
 * Add: test for making a jsonp request with jquery from jsdom window
 * Add: test case for issue #338
 * Fix: double load behavior when mixing jsdom.env's `scripts` and `src` properties (cjroebuck)

## 0.2.8 (hotfix)
 * Fix: inline event handlers are ignored by everything except for the javascript context

## 0.2.7 (hotfix)
 * Fix stylesheet loading

## 0.2.6
 * Add: support for window.location.search and document.cookie (Derek Lindahl)
 * Add: jsdom.env now has a document configuation option which allows users to change the referer of the document (Derek Lindahl)
 * Fix: allow users to use different jsdom levels in the same process (sinegar)
 * Fix: removeAttributeNS no longer has a return value (Jason Davies)
 * Add: support for encoding/decoding all html entities from html4/5 (papandreou)
 * Add: jsdom.env() accepts the same features object seen in jsdom.jsdom and friends

## 0.2.5
 * Fix: serialize special characters in Element.innerHTML/Element.attributes like a grade A browser (Jason Priestley)
 * Fix: ensure Element.getElementById only returns elements that are attached to the document
 * Fix: ensure an Element's id is updated when changing the nodeValue of the 'id' attribute (Felix Gnass)
 * Add: stacktrace to error reporter (Josh Marshall)
 * Fix: events now bubble up to the window (Jason Davies)
 * Add: initial window.location.hash support (Josh Marshall)
 * Add: Node#insertBefore should do nothing when both params are the same node (Jason Davies)
 * Add: fixes for DOMAttrModified mutation events (Felix Gnass)

## 0.2.4
 * Fix: adding script to invalid/incomplete dom (document.documentElement) now catches the error and passes it in the `.env` callback (Gregory Tomlinson)
 * Cleanup: trigger and html tests
 * Add: support for inline event handlers (ie: `<div onclick='some.horrible.string()'>`) (Brian McDaniel)
 * Fix: script loading over https (Brian McDaniel) #280
 * Add: using style.setProperty updates the style attribute (Jimmy Mabey).
 * Add: invalid markup is reported as an error and attached to the associated element and document
 * Fix: crash when setChild() failes to create new DOM element (John Hurliman)
 * Added test for issue #287.
 * Added support for inline event handlers.
 * Moved frame tests to test/window/frame.js and cleaned up formatting.
 * Moved script execution tests to test/window/script.js.
 * Fix a crash when setChild() fails to create a new DOM element
 * Override CSSOM to update style attribute

## 0.2.3
 * Fix: segfault due to window being garbage collected prematurely
    NOTE: you must manually close the window to free memory (window.close())

## 0.2.2
 * Switch to Contextify to manage the window's script execution.
 * Fix: allow nodelists to have a length of 0 and toArray to return an empty array
 * Fix: style serialization; issues #230 and #259
 * Fix: Incomplete DOCTYPE causes JavaScript error
 * Fix: indentation, removed outdated debug code and trailing whitespace.
 * Prevent JavaScript error when parsing incomplete `<!DOCTYPE>`. Closes #259.
 * Adding a test from brianmcd that ensures that setTimeout callbacks execute in the context of the window
 * Fixes issue 250: make `document.parentWindow === window` work
 * Added test to ensure that timer callbacks execute in the window context.
 * Fixes 2 issues in ResourceQueue
 * Make frame/iframe load/process scripts if the parent has the features enabled

## 0.2.1
 * Javascript execution fixes [#248, #163, #179]
 * XPath (Yonathan and Daniel Cassidy)
 * Start of cssom integration (Yonathan)
 * Conversion of tests to nodeunit! (Martin Davis)
 * Added sizzle tests, only failing 3/15
 * Set the title node's textContent rather than its innerHTML #242.  (Andreas Lind Petersen)
 * The textContent getter now walks the DOM and extract the text properly. (Andreas Lind Petersen)
 * Empty scripts won't cause jsdom.env to hang #172 (Karuna Sagar)
 * Every document has either a body or a frameset #82. (Karuna Sagar)
 * Added the ability to grab a level by string + feature. ie: jsdom.level(2, 'html') (Aria Stewart)
 * Cleaned up htmlencoding and fixed character (de)entification #147, #177 (Andreas Lind Petersen)
 * htmlencoding.HTMLDecode: Fixed decoding of `&lt;`, `&gt;`, `&amp;`, and `&apos;`. Closes #147 and #177.
 * Require dom level as a string or object. (Aria Stewart)
 * JS errors ar triggered on the script element, not document. (Yonathan)
 * Added configuration property 'headers' for HTTP request headers. (antonj)
 * Attr.specified is readonly - Karuna Sagar
 * Removed return value from setAttributeNS() #207 (Karuna Sagar)
 * Pass the correct script filename to runInContext. (robin)
 * Add http referrer support for the download() function. (Robin)
 * First attempt at fixing the horrible memory leak via window.stopTimers() (d-ash)
 * Use vm instead of evals binding (d-ash)
 * Add a way to set the encoding of the jsdom.env html request.
 * Fixed various typos/lint problems (d-ash)
 * The first parameter download is now the object returned by URL.parse(). (Robin)
 * Fixed serialization of elements with a style attribute.
 * Added src config option to jsdom.env() (Jerry Sievert)
 * Removed dead code from getNamedItemNS() (Karuna Sagar)
 * Changes to language/javascript so jsdom would work on v0.5.0-pre (Gord Tanner)
 * Correct spelling of "Hierarchy request error" (Daniel Cassidy)
 * Node and Exception type constants are available in all levels. (Daniel Cassidy)
 * Use \n instead of \r\n during serialization
 * Fixed auto-insertion of body/html tags  (Adrian Makowski)
 * Adopt unowned nodes when added to the tree. (Aria Stewart)
 * Fix the selected and defaultSelected fields of `option` element. - Yonathan
 * Fix: EventTarget.getListeners() now returns a shallow copy so that listeners can be safely removed while an event is being dispatched. (Felix Gnass)
 * Added removeEventListener() to DOMWindow (Felix Gnass)
 * Added the ability to pre-load scripts for jsdom.env() (Jerry Sievert)
 * Mutation event tests/fixes (Felix Gnass)
 * Changed HTML serialization code to (optionally) pretty print while traversing the tree instead of doing a regexp-based postprocessing. (Andreas Lind Petersen)
 * Relative and absolute urls now work as expected
 * setNamedItem no longer sets Node.parentNode #153 (Karuna Sagar)
 * Added missing semicolon after entity name - Felix Gnass
 * Added NodeList#indexOf implementation/tests (Karuna Sagar)
 * resourceLoader.download now works correctly with https and redirects (waslogic)
 * Scheme-less URLs default to the current protocol #87 (Alexander Flatter)
 * Simplification the prevSibling(), appendChild(), insertBefore() and replaceChild() code (Karuna Sagar)
 * Javascript errors use core.Node.trigger (Alexander Flatter)
 * Add core.Document.trigger in level1/core and level2/events; Make DOMWindow.console use it (Alexander Flatter)
 * Resource resolver fixes (Alexander Flatter)
 * Fix serialization of doctypes with new lines #148 (Karuna Sagar)
 * Child nodes are calculated immediately instead of after .length is called #169, #171, #176 (Karuna Sagar)
