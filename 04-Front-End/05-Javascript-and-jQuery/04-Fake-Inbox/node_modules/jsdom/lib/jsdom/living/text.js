"use strict";
var inheritFrom = require("../utils").inheritFrom;

module.exports = function (core) {
  // TODO: constructor should not take ownerDocument
  core.Text = function Text(ownerDocument, data) {
    core.CharacterData.call(this, ownerDocument, data);
  };

  inheritFrom(core.CharacterData, core.Text, {
    nodeType: core.Node.TEXT_NODE, // TODO should be on prototype, not here
    splitText: function (offset) {
      offset = offset >>> 0;

      var length = this.length;

      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }

      var count = length - offset;
      var newData = this.substringData(offset, count);

      var newNode = this._ownerDocument.createTextNode(newData);

      var parent = this._parentNode;

      if (parent !== null) {
        parent.insertBefore(newNode, this.nextSibling);
      }

      this.replaceData(offset, count, "");

      return newNode;

      // TODO: range stuff
    },

    // TODO: wholeText property
  });
};
