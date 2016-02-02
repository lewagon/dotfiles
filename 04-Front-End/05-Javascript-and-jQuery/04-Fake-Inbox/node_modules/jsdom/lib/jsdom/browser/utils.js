"use strict";

exports.NOT_IMPLEMENTED = function (target, nameForErrorMessage) {
  return function () {
    var raise = target ? target.raise : this.raise;
    raise.call(this, "error", "NOT IMPLEMENTED" + (nameForErrorMessage ? ": " + nameForErrorMessage : ""));
  };
};
