# Validate XML Names and Qualified Names

This package simply tells you whether or not a string matches the [`Name`](http://www.w3.org/TR/xml/#NT-Name) or [`QName`](http://www.w3.org/TR/xml-names/#NT-QName) productions in the XML Namespaces specification. We use it for implementing the [validate](https://dom.spec.whatwg.org/#validate) algorithm in jsdom, but you can use it for whatever you want.

## Usage

```js
"use strict":
var xnv = require("xml-name-validator");
var assert = require("assert");

// Will not throw:
xnv.name("x");
xnv.name(":");
xnv.name("a:0");
xnv.name("a:b:c");

// Will throw:
xnv.name("\\");
xnv.name("'");
xnv.name("0");
xnv.name("a!");

// Will not throw:
xnv.qname("x");
xnv.qname("a0");
xnv.qname("a:b");

// Will throw:
xnv.qname(":a");
xnv.qname(":b");
xnv.qname("a:b:c");
xnv.qname("a:0");
```

In all the cases where the validator throws, it will throw an instance of `xnv.SyntaxError` with an informative `message` property, among others.
