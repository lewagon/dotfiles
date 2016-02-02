"use strict";
var inheritFrom = require("../utils").inheritFrom;

module.exports = function (core) {
  // TODO: constructor should not take ownerDocument
  core.Comment = function Comment(ownerDocument, data) {
    core.CharacterData.call(this, ownerDocument, data);
  };

  inheritFrom(core.CharacterData, core.Comment, {
    nodeType: core.Node.COMMENT_NODE, // TODO should be on prototype, not here
  });
};
