"use strict";
var inheritFrom = require("../utils").inheritFrom;
var addConstants = require("../utils").addConstants;
var table = require("./dom-exception-table.json"); // https://heycam.github.io/webidl/#idl-DOMException-error-names

// Precompute some stuff. Mostly unnecessary once we take care of the TODO below.
var namesWithCodes = Object.keys(table).filter(function (name) {
  return "legacyCodeValue" in table[name];
});

var codesToNames = Object.create(null);
namesWithCodes.forEach(function (name) {
  codesToNames[table[name].legacyCodeValue] = name;
});

module.exports = DOMException;

// TODO: update constructor signature to match WebIDL spec
// See also https://github.com/heycam/webidl/pull/22 which isn't merged as of yet
function DOMException(code, message) {
  var name = codesToNames[code];

  if (message === undefined) {
    message = table[name].description;
  }
  Error.call(this, message);

  Object.defineProperty(this, "name", { value: name, writable: true, configurable: true, enumerable: false });
  Object.defineProperty(this, "code", { value: code, writable: true, configurable: true, enumerable: false });

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, DOMException);
  }
}

inheritFrom(Error, DOMException);

var constants = Object.create(null);
namesWithCodes.forEach(function (name) {
  constants[table[name].legacyCodeName] = table[name].legacyCodeValue;
});

addConstants(DOMException, constants);
