# jsdom

A JavaScript implementation of the WHATWG DOM and HTML standards, for use with [io.js](https://iojs.org/).

## Install

```bash
$ npm install jsdom
```

Note that as of our 4.0.0 release, jsdom no longer works with Node.js™, and instead requires io.js. You are still welcome to install a release in [the 3.x series](https://github.com/tmpvar/jsdom/tree/3.x) if you use Node.js™.

## Human contact

- [Mailing list](http://groups.google.com/group/jsdom)
- IRC channel: [#jsdom on freenode](irc://irc.freenode.net/jsdom)

## Easymode: `jsdom.env`

`jsdom.env` is an API that allows you to throw a bunch of stuff at it, and it will generally do the right thing.

You can use it with a URL

```js
// Count all of the links from the io.js build page
var jsdom = require("jsdom");

jsdom.env(
  "https://iojs.org/dist/",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    console.log("there have been", window.$("a").length - 4, "io.js releases!");
  }
);
```

or with raw HTML

```js
// Run some jQuery on a html fragment
var jsdom = require("jsdom");

jsdom.env(
  '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    console.log("contents of a.the-link:", window.$("a.the-link").text());
  }
);
```

or with a configuration object

```js
// Print all of the news items on Hacker News
var jsdom = require("jsdom");

jsdom.env({
  url: "http://news.ycombinator.com/",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (errors, window) {
    var $ = window.$;
    console.log("HN Links");
    $("td.title:not(:last) a").each(function() {
      console.log(" -", $(this).text());
    });
  }
});
```

or with raw JavaScript source

```js
// Print all of the news items on Hacker News
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./jquery.js", "utf-8");

jsdom.env({
  url: "http://news.ycombinator.com/",
  src: [jquery],
  done: function (errors, window) {
    var $ = window.$;
    console.log("HN Links");
    $("td.title:not(:last) a").each(function () {
      console.log(" -", $(this).text());
    });
  }
});
```

### How it works

The do-what-I-mean API is used like so:

```js
jsdom.env(string, [scripts], [config], callback);
```

- `string`: may be a URL, file name, or HTML fragment
- `scripts`: a string or array of strings, containing file names or URLs that will be inserted as `<script>` tags
- `config`: see below
- `callback`: takes two arguments
  - `errors`: either `null`, if nothing goes wrong, or an array of errors
  - `window`: a brand new `window`, if there were no loading errors

_Example:_

```js
jsdom.env(html, function (errors, window) {
  // free memory associated with the window
  window.close();
});
```

If you would like to specify a configuration object only:

```js
jsdom.env(config);
```

- `config.html`: a HTML fragment
- `config.file`: a file which jsdom will load HTML from; the resulting window's `location.href` will be a `file://` URL.
- `config.url`: sets the resulting window's `location.href`; if `config.html` and `config.file` are not provided, jsdom will load HTML from this URL.
- `config.scripts`: see `scripts` above.
- `config.src`: an array of JavaScript strings that will be evaluated against the resulting document. Similar to `scripts`, but it accepts JavaScript instead of paths/URLs.
- `config.jar`: a custom cookie jar, if desired; see [mikeal/request](https://github.com/mikeal/request) documentation.
- `config.parsingMode`: either `"auto"`, `"html"`, or `"xml"`. The default is `"auto"`, which uses HTML behavior unless `config.url` responds with an XML `Content-Type`, or `config.file` contains a filename ending in `.xml` or `.xhtml`. Setting to `"xml"` will attempt to parse the document as an XHTML document. (jsdom is [currently only OK at doing that](https://github.com/tmpvar/jsdom/issues/885).)
- `config.document`:
  - `referrer`: the new document will have this referrer.
  - `cookie`: manually set a cookie value, e.g. `'key=value; expires=Wed, Sep 21 2011 12:00:00 GMT; path=/'`.
  - `cookieDomain`: a cookie domain for the manually set cookie; defaults to `127.0.0.1`.
- `config.headers`: an object giving any headers that will be used while loading the HTML from `config.url`, if applicable
- `config.features`: see Flexibility section below. **Note**: the default feature set for `jsdom.env` does _not_ include fetching remote JavaScript and executing it. This is something that you will need to _carefully_ enable yourself.
- `config.resourceLoader`: a function that intercepts subresource requests and allows you to re-route them, modify, or outright replace them with your own content. More below.
- `config.done`, `config.loaded`, `config.created`: see below.

Note that at least one of the callbacks (`done`, `loaded`, or `created`) is required, as is one of `html`, `file`, or `url`.

### Initialization lifecycle

If you just want to load the document and execute it, the `done` callback shown above is the simplest. If anything goes wrong, either while loading the document and creating the window, or while executing any `<script>`s, the problem will show up in the `errors` array passed as the first argument.

However, if you want more control over or insight into the initialization lifecycle, you'll want to use the `created` and/or `loaded` callbacks:

#### `created(error, window)`

The `created` callback is called as soon as the window is created, or if that process fails. You may access all `window` properties here; however, `window.document` is not ready for use yet, as the HTML has not been parsed.

The primary use-case for `created` is to modify the window object (e.g. add new functions on built-in prototypes) before any scripts execute.

You can also set an event handler for `'load'` or other events on the window if you wish. But the `loaded` callback, below, can be more useful, since it includes script errors.

If the `error` argument is non-`null`, it will contain whatever loading error caused the window creation to fail; in that case `window` will not be passed.

#### `loaded(errors, window)`

The `loaded` callback is called along with the window's `'load'` event. This means it will only be called if creation succeeds without error. Note that by the time it has called, any external resources will have been downloaded, and any `<script>`s will have finished executing.

If `errors` is non-`null`, it will contain an array of all JavaScript errors that occured during script execution. `window` will still be passed, however.

#### `done(errors, window)`

Now that you know about `created` and `loaded`, you can see that `done` is essentially both of them smashed together:

- If window creation succeeds and no `<script>`s cause errors, then `errors` will be null, and `window` will be usable.
- If window creation succeeds but there are script errors, then `errors` will be an array containing those errors, but `window` will still be usable.
- If window creation fails, then `errors` will be an array containing the creation error, and `window` will not be passed.

#### Dealing with asynchronous script loading

If you load scripts asynchronously, e.g. with a module loader like RequireJS, none of the above hooks will really give you what you want. There's nothing, either in jsdom or in browsers, to say "notify me after all asynchronous loads have completed." The solution is to use the mechanisms of the framework you are using to notify about this finishing up. E.g., with RequireJS, you could do

```js
// On the io.js side:
var window = jsdom.jsdom(...).defaultView;
window.onModulesLoaded = function () {
  console.log("ready to roll!");
};
```

```html
<!-- Inside the HTML you supply to jsdom -->
<script>
requirejs(["entry-module"], function () {
  window.onModulesLoaded();
});
</script>
```

For more details, see the discussion in [#640](https://github.com/tmpvar/jsdom/issues/640), especially [@matthewkastor](https://github.com/matthewkastor)'s [insightful comment](https://github.com/tmpvar/jsdom/issues/640#issuecomment-22216965).

### On running scripts and being safe

By default, `jsdom.env` will not process and run external JavaScript, since our sandbox is not foolproof. That is, code running inside the DOM's `<script>`s can, if it tries hard enough, get access to the Node environment, and thus to your machine. If you want to (carefully!) enable running JavaScript, you can use `jsdom.jsdom`, `jsdom.jQueryify`, or modify the defaults passed to `jsdom.env`.

## For the hardcore: `jsdom.jsdom`

The `jsdom.jsdom` method does fewer things automatically; it takes in only HTML source, and it does not allow you to separately supply scripts that it will inject and execute. It just gives you back a `document` object, with usable `document.defaultView`, and starts asynchronously executing any `<script>`s included in the HTML source. You can listen for the `'load'` event to wait until scripts are done loading and executing, just like you would in a normal HTML page.

Usage of the API generally looks like this:

```js
var jsdom = require("jsdom").jsdom;
var doc = jsdom(markup, options);
var window = doc.defaultView;
```

- `markup` is a HTML document to be parsed. You can also pass `undefined` to get the basic document, equivalent to what a browser will give if you open up an empty `.html` file.

- `options`: see the explanation of the `config` object above.

### Flexibility

One of the goals of jsdom is to be as minimal and light as possible. This section details how someone can change the behavior of `Document`s before they are created. These features are baked into the `DOMImplementation` that every `Document` has, and may be tweaked in two ways:

1. When you create a new `Document`, by overriding the configuration:

  ```js
  var jsdom = require("jsdom").jsdom;
  var doc = jsdom("<html><body></body></html>", {
      features: {
        FetchExternalResources : ["img"]
      }
  });
  ```

  Do note, that this will only affect the document that is currently being created. All other documents will use the defaults specified below (see: Default Features).

2. Before creating any documents, you can modify the defaults for all future documents:

  ```js
  require("jsdom").defaultDocumentFeatures = {
      FetchExternalResources: ["script"],
      ProcessExternalResources: false
  };
  ```

#### External Resources

Default features are extremely important for jsdom as they lower the configuration requirement and present developers a set of consistent default behaviors. The following sections detail the available features, their defaults, and the values that jsdom uses.

`FetchExternalResources`

- _Default_: `["script"]`
- _Allowed_: `["script", "img", "css", "frame", "iframe", "link"]` or `false`
- _Default for `jsdom.env`_: `false`

Enables/disables fetching files over the file system/HTTP

`ProcessExternalResources`

- _Default_: `["script"]`
- _Allowed_: `["script"]` or `false`
- _Default for `jsdom.env`_: `false`

Enables/disables JavaScript execution

`SkipExternalResources`

- _Default_: `false` (allow all)
- _Allowed_: `/url to be skipped/` or `false`
- _Example_: `/http:\/\/example.org/js/bad\.js/`

Filters resource downloading and processing to disallow those matching the given regular expression

#### Custom External Resource Loader

jsdom lets you intercept subresource requests using `config.resourceLoader`. `config.resourceLoader` expects a function which is called for each subresource request with the following arguments:

- `resource`: a vanilla JavaScript object with the following properties
  - `url`: a parsed URL object.
  - `cookie`: the content of the HTTP cookie header (`key=value` pairs separated by semicolons).
  - `cookieDomain`: the cookie domain as set in `config`, defaults to `127.0.0.1`.
  - `baseUrl`: the base URL used to resolve relative URLs.
  - `defaultFetch(callback)`: a convenience method to fetch the resource online.
- `callback`: a function to be called with two arguments
  - `error`: either `null`, if nothing goes wrong, or an `Error` object.
  - `body`: a string representing the body of the resource.

For example, fetching all JS files from a different directory and running them in strict mode:

```js
var jsdom = require("jsdom");

jsdom.env({
  url: "http://example.com/",
  resourceLoader: function (resource, callback) {
    var pathname = resource.url.pathname;
    if (/\.js$/.test(pathname)) {
      resource.url.pathname = pathname.replace("/js/", "/js/raw/");
      resource.defaultFetch(function (err, body) {
        if (err) return callback(err);
        callback(null, '"use strict";\n' + body);
      });
    } else {
      resource.defaultFetch(callback);
    }
  },
  features: {
    FetchExternalResources: ["script"],
    ProcessExternalResources: ["script"],
    SkipExternalResources: false
  }
});
```

### Canvas

jsdom includes support for using the [canvas](https://npmjs.org/package/canvas) package to extend any `<canvas>` elements with the canvas API. To make this work, you need to include canvas as a dependency in your project, as a peer of jsdom. If jsdom can find the canvas package, it will use it, but if it's not present, then `<canvas>` elements will behave like `<div>`s.

## More Examples

### Creating a browser-like window object

```js
var jsdom = require("jsdom").jsdom;
var document = jsdom("hello world");
var window = document.defaultView;

console.log(window.document.documentElement.outerHTML);
// output: "<html><head></head><body>hello world</body></html>"

console.log(window.innerWidth);
// output: 1024

console.log(typeof window.document.getElementsByClassName);
// outputs: function
```

### jQueryify

```js
var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.1.js", function () {
  window.$("body").append('<div class="testing">Hello World, It works</div>');

  console.log(window.$(".testing").text());
});
```

### Passing objects to scripts inside the page

```js
var jsdom = require("jsdom").jsdom;
var window = jsdom().defaultView;

window.__myObject = { foo: "bar" };

var scriptEl = window.document.createElement("script");
scriptEl.src = "anotherScript.js";
window.document.body.appendChild(scriptEl);

// anotherScript.js will have the ability to read `window.__myObject`, even
// though it originated in io.js!
```

### Serializing a document

```js
var jsdom = require("jsdom").jsdom;
var serializeDocument = require("jsdom").serializeDocument;

var doc = jsdom("<!DOCTYPE html>hello");

serializeDocument(doc) === "<!DOCTYPE html><html><head></head><body>hello</body></html>";
doc.documentElement.outerHTML === "<html><head></head><body>hello</body></html>";
```

### Capturing Console Output

#### Forward a window's console output to the io.js console

```js
var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

jsdom.getVirtualConsole(window).sendTo(console);
```

#### Get an event emitter for a window's console

```js
var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

var virtualConsole = jsdom.getVirtualConsole(window);

virtualConsole.on("log", function (message) {
  console.log("console.log called ->", message);
});
```

## What Standards Does jsdom Support, Exactly?

Our mission is to get something very close to a headless browser, with emphasis more on the DOM/HTML side of things than the CSS side. As such, our primary goals are supporting [The DOM Standard](http://dom.spec.whatwg.org/) and [The HTML Standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/). We only support some subset of these so far; in particular we have the subset covered by the outdated DOM 2 spec family down pretty well. We're slowly including more and more from the modern DOM and HTML specs, including some `Node` APIs, `querySelector(All)`, attribute semantics, the history and URL APIs, and the HTML parsing algorithm.

We also support some subset of the [CSSOM](http://dev.w3.org/csswg/cssom/), largely via [@chad3814](https://github.com/chad3814)'s excellent [cssstyle](https://www.npmjs.org/package/cssstyle) package. In general we want to make webpages run headlessly as best we can, and if there are other specs we should be incorporating, let us know.
