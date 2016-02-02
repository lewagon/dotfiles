"use strict";

exports.NOT_IMPLEMENTED = function (nameForErrorMessage, target) {
  return function () {
    if (target === undefined) {
      target = this;
    }

    if (target && target.raise) {
      target.raise("error", "NOT_IMPLEMENTED: " + nameForErrorMessage);
    } else if (typeof console !== "undefined" && console.log) {
      console.log(new Error("Called NOT_IMPLEMENTED without an element to raise on: " + nameForErrorMessage));
    }
  };
};
