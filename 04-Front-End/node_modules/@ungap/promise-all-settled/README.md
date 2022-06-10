# Promise.allSettled

[![Build Status](https://travis-ci.com/ungap/promise-all-settled.svg?branch=master)](https://travis-ci.com/ungap/promise-all-settled) [![Coverage Status](https://coveralls.io/repos/github/ungap/promise-all-settled/badge.svg?branch=master)](https://coveralls.io/github/ungap/promise-all-settled?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/ungap/promise-all-settled.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)

A cross platform [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled) polyfill.

  * CDN global utility via https://unpkg.com/@ungap/promise-all-settled
  * ESM via `import allSettled from '@ungap/promise-all-settled'`
  * CJS via `const allSettled = require('@ungap/promise-all-settled')`


### Example

```js
const allSettled = require("@ungap/promise-all-settled");

// use it via call
allSettled.call(Promise, []);

// or bind it:
const $settled = allSettled.bind(Promise);

// or put it in the Promise class
if (!Promise.allSettled)
  Promise.allSettled = allSettled;
```
