"use strict";

const NodeImpl = require("./Node-impl").implementation;

const NODE_TYPE = require("../node-type");

class DocumentTypeImpl extends NodeImpl {
  constructor(args, privateData) {
    super(args, privateData);

    this.nodeType = NODE_TYPE.DOCUMENT_TYPE_NODE;

    this.name = privateData.name;
    this.publicId = privateData.publicId;
    this.systemId = privateData.systemId;
  }
}

module.exports = {
  implementation: DocumentTypeImpl
};
