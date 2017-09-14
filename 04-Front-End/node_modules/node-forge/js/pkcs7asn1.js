/**
 * Javascript implementation of PKCS#7 v1.5.  Currently only certain parts of
 * PKCS#7 are implemented, especially the enveloped-data content type.
 *
 * @author Stefan Siegl
 *
 * Copyright (c) 2012 Stefan Siegl <stesie@brokenpipe.de>
 *
 * The ASN.1 representation of PKCS#7 is as follows
 * (see RFC #2315 for details, http://www.ietf.org/rfc/rfc2315.txt):
 *
 * A PKCS#7 message consists of a ContentInfo on root level, which may
 * contain any number of further ContentInfo nested into it.
 *
 * ContentInfo ::= SEQUENCE {
 *    contentType                ContentType,
 *    content               [0]  EXPLICIT ANY DEFINED BY contentType OPTIONAL
 * }
 *
 * ContentType ::= OBJECT IDENTIFIER
 *
 * EnvelopedData ::= SEQUENCE {
 *    version                    Version,
 *    recipientInfos             RecipientInfos,
 *    encryptedContentInfo       EncryptedContentInfo
 * }
 *
 * EncryptedData ::= SEQUENCE {
 *    version                    Version,
 *    encryptedContentInfo       EncryptedContentInfo
 * }
 *
 * Version ::= INTEGER
 *
 * RecipientInfos ::= SET OF RecipientInfo
 *
 * EncryptedContentInfo ::= SEQUENCE {
 *   contentType                 ContentType,
 *   contentEncryptionAlgorithm  ContentEncryptionAlgorithmIdentifier,
 *   encryptedContent       [0]  IMPLICIT EncryptedContent OPTIONAL
 * }
 *
 * ContentEncryptionAlgorithmIdentifier ::= AlgorithmIdentifier
 *
 * The AlgorithmIdentifier contains an Object Identifier (OID) and parameters
 * for the algorithm, if any. In the case of AES and DES3, there is only one,
 * the IV.
 *
 * AlgorithmIdentifer ::= SEQUENCE {
 *    algorithm OBJECT IDENTIFIER,
 *    parameters ANY DEFINED BY algorithm OPTIONAL
 * }
 *
 * EncryptedContent ::= OCTET STRING
 *
 * RecipientInfo ::= SEQUENCE {
 *   version                     Version,
 *   issuerAndSerialNumber       IssuerAndSerialNumber,
 *   keyEncryptionAlgorithm      KeyEncryptionAlgorithmIdentifier,
 *   encryptedKey                EncryptedKey
 * }
 *
 * IssuerAndSerialNumber ::= SEQUENCE {
 *   issuer                      Name,
 *   serialNumber                CertificateSerialNumber
 * }
 *
 * CertificateSerialNumber ::= INTEGER
 *
 * KeyEncryptionAlgorithmIdentifier ::= AlgorithmIdentifier
 *
 * EncryptedKey ::= OCTET STRING
 */
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {

// shortcut for ASN.1 API
var asn1 = forge.asn1;

// shortcut for PKCS#7 API
var p7v = forge.pkcs7asn1 = forge.pkcs7asn1 || {};
forge.pkcs7 = forge.pkcs7 || {};
forge.pkcs7.asn1 = p7v;

var contentInfoValidator = {
  name: 'ContentInfo',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'ContentInfo.ContentType',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.OID,
    constructed: false,
    capture: 'contentType'
  }, {
    name: 'ContentInfo.content',
    tagClass: asn1.Class.CONTEXT_SPECIFIC,
    type: 0,
    constructed: true,
    optional: true,
    captureAsn1: 'content'
  }]
};
p7v.contentInfoValidator = contentInfoValidator;

var encryptedContentInfoValidator = {
  name: 'EncryptedContentInfo',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'EncryptedContentInfo.contentType',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.OID,
    constructed: false,
    capture: 'contentType'
  }, {
    name: 'EncryptedContentInfo.contentEncryptionAlgorithm',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true,
    value: [{
      name: 'EncryptedContentInfo.contentEncryptionAlgorithm.algorithm',
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.OID,
      constructed: false,
      capture: 'encAlgorithm'
    }, {
      name: 'EncryptedContentInfo.contentEncryptionAlgorithm.parameter',
      tagClass: asn1.Class.UNIVERSAL,
      captureAsn1: 'encParameter'
    }]
  }, {
    name: 'EncryptedContentInfo.encryptedContent',
    tagClass: asn1.Class.CONTEXT_SPECIFIC,
    type: 0,
    /* The PKCS#7 structure output by OpenSSL somewhat differs from what
     * other implementations do generate.
     *
     * OpenSSL generates a structure like this:
     * SEQUENCE {
     *    ...
     *    [0]
     *       26 DA 67 D2 17 9C 45 3C B1 2A A8 59 2F 29 33 38
     *       C3 C3 DF 86 71 74 7A 19 9F 40 D0 29 BE 85 90 45
     *       ...
     * }
     *
     * Whereas other implementations (and this PKCS#7 module) generate:
     * SEQUENCE {
     *    ...
     *    [0] {
     *       OCTET STRING
     *          26 DA 67 D2 17 9C 45 3C B1 2A A8 59 2F 29 33 38
     *          C3 C3 DF 86 71 74 7A 19 9F 40 D0 29 BE 85 90 45
     *          ...
     *    }
     * }
     *
     * In order to support both, we just capture the context specific
     * field here.  The OCTET STRING bit is removed below.
     */
    capture: 'encryptedContent',
    captureAsn1: 'encryptedContentAsn1'
  }]
};

p7v.envelopedDataValidator = {
  name: 'EnvelopedData',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'EnvelopedData.Version',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.INTEGER,
    constructed: false,
    capture: 'version'
  }, {
    name: 'EnvelopedData.RecipientInfos',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SET,
    constructed: true,
    captureAsn1: 'recipientInfos'
  }].concat(encryptedContentInfoValidator)
};

p7v.encryptedDataValidator = {
  name: 'EncryptedData',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'EncryptedData.Version',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.INTEGER,
    constructed: false,
    capture: 'version'
  }].concat(encryptedContentInfoValidator)
};

var signerValidator = {
  name: 'SignerInfo',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'SignerInfo.Version',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.INTEGER,
    constructed: false
  }, {
    name: 'SignerInfo.IssuerAndSerialNumber',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true
  }, {
    name: 'SignerInfo.DigestAlgorithm',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true
  }, {
    name: 'SignerInfo.AuthenticatedAttributes',
    tagClass: asn1.Class.CONTEXT_SPECIFIC,
    type: 0,
    constructed: true,
    optional: true,
    capture: 'authenticatedAttributes'
  }, {
    name: 'SignerInfo.DigestEncryptionAlgorithm',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true
  }, {
    name: 'SignerInfo.EncryptedDigest',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.OCTETSTRING,
    constructed: false,
    capture: 'signature'
  }, {
    name: 'SignerInfo.UnauthenticatedAttributes',
    tagClass: asn1.Class.CONTEXT_SPECIFIC,
    type: 1,
    constructed: true,
    optional: true
  }]
};

p7v.signedDataValidator = {
  name: 'SignedData',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'SignedData.Version',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.INTEGER,
    constructed: false,
    capture: 'version'
  }, {
    name: 'SignedData.DigestAlgorithms',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SET,
    constructed: true,
    captureAsn1: 'digestAlgorithms'
  },
  contentInfoValidator,
  {
    name: 'SignedData.Certificates',
    tagClass: asn1.Class.CONTEXT_SPECIFIC,
    type: 0,
    optional: true,
    captureAsn1: 'certificates'
  }, {
    name: 'SignedData.CertificateRevocationLists',
    tagClass: asn1.Class.CONTEXT_SPECIFIC,
    type: 1,
    optional: true,
    captureAsn1: 'crls'
  }, {
    name: 'SignedData.SignerInfos',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SET,
    capture: 'signerInfos',
    optional: true,
    value: [signerValidator]
  }]
};

p7v.recipientInfoValidator = {
  name: 'RecipientInfo',
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: 'RecipientInfo.version',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.INTEGER,
    constructed: false,
    capture: 'version'
  }, {
    name: 'RecipientInfo.issuerAndSerial',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true,
    value: [{
      name: 'RecipientInfo.issuerAndSerial.issuer',
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      captureAsn1: 'issuer'
    }, {
      name: 'RecipientInfo.issuerAndSerial.serialNumber',
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.INTEGER,
      constructed: false,
      capture: 'serial'
    }]
  }, {
    name: 'RecipientInfo.keyEncryptionAlgorithm',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true,
    value: [{
      name: 'RecipientInfo.keyEncryptionAlgorithm.algorithm',
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.OID,
      constructed: false,
      capture: 'encAlgorithm'
    }, {
      name: 'RecipientInfo.keyEncryptionAlgorithm.parameter',
      tagClass: asn1.Class.UNIVERSAL,
      constructed: false,
      captureAsn1: 'encParameter'
    }]
  }, {
    name: 'RecipientInfo.encryptedKey',
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.OCTETSTRING,
    constructed: false,
    capture: 'encKey'
  }]
};

} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'pkcs7asn1';
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    var nodeJS = true;
    define = function(ids, factory) {
      factory(require, module);
    };
  } else {
    // <script>
    if(typeof forge === 'undefined') {
      forge = {};
    }
    return initModule(forge);
  }
}
// AMD
var deps;
var defineFunc = function(require, module) {
  module.exports = function(forge) {
    var mods = deps.map(function(dep) {
      return require(dep);
    }).concat(initModule);
    // handle circular dependencies
    forge = forge || {};
    forge.defined = forge.defined || {};
    if(forge.defined[name]) {
      return forge[name];
    }
    forge.defined[name] = true;
    for(var i = 0; i < mods.length; ++i) {
      mods[i](forge);
    }
    return forge[name];
  };
};
var tmpDefine = define;
define = function(ids, factory) {
  deps = (typeof ids === 'string') ? factory.slice(2) : ids.slice(2);
  if(nodeJS) {
    delete define;
    return tmpDefine.apply(null, Array.prototype.slice.call(arguments, 0));
  }
  define = tmpDefine;
  return define.apply(null, Array.prototype.slice.call(arguments, 0));
};
define(['require', 'module', './asn1', './util'], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();
