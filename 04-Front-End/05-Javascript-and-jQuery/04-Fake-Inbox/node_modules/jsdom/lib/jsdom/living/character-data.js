"use strict";
var inheritFrom = require("../utils").inheritFrom;

module.exports = function (core) {
  core.CharacterData = function CharacterData(ownerDocument, data) {
    core.Node.call(this, ownerDocument);

    this._data = data;
  };

  inheritFrom(core.Node, core.CharacterData, {
    get data() { return this._data; },
    set data(data) {
      if (data === null) {
        data = "";
      }
      data = String(data);

      this._setData(data);
    },

    get length() {
      return this._data.length;
    },

    substringData: function (offset, count) {
      offset = offset >>> 0;
      count = count >>> 0;

      var length = this.length;

      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }

      if (offset + count > length) {
        return this._data.substring(offset);
      }

      return this._data.substring(offset, offset + count);
    },

    appendData: function (data) {
      this.replaceData(this.length, 0, data);
    },

    insertData: function (offset, data) {
      this.replaceData(offset, 0, data);
    },

    deleteData: function (offset, count) {
      this.replaceData(offset, count, "");
    },

    replaceData: function (offset, count, data) {
      offset = offset >>> 0;
      count = count >>> 0;
      data = String(data);

      var length = this.length;

      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }

      if (offset + count > length) {
        count = length - offset;
      }

      var start = this._data.substring(0, offset);
      var end = this._data.substring(offset + count);

      this._setData(start + data + end);

      // TODO: range stuff
    },

    _setData: function (newData) {
      // TODO: remove this once we no longer rely on mutation events internally, since they are nonstandard
      var oldData = this._data;
      this._data = newData;

      if (this._ownerDocument && this._parentNode && this._ownerDocument.implementation._hasFeature("MutationEvents")) {
        var ev = this._ownerDocument.createEvent("MutationEvents");
        ev.initMutationEvent("DOMCharacterDataModified", true, false, this, oldData, newData, null, null);
        this.dispatchEvent(ev);
      }
    }
  });
};
