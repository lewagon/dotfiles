/**
 * Javascript implementation of PKCS#7 v1.5. Currently only certain parts of
 * PKCS#7 are implemented, especially the enveloped-data content type.
 *
 * @author Stefan Siegl
 *
 * Copyright (c) 2012 Stefan Siegl <stesie@brokenpipe.de>
 *
 * Currently this implementation only supports ContentType of either
 * EnvelopedData or EncryptedData on root level.  The top level elements may
 * contain only a ContentInfo of ContentType Data, i.e. plain data.  Further
 * nesting is not (yet) supported.
 *
 * The Forge validators for PKCS #7's ASN.1 structures are available from
 * a seperate file pkcs7asn1.js, since those are referenced from other
 * PKCS standards like PKCS #12.
 */
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {

// shortcut for ASN.1 API
var asn1 = forge.asn1;

// shortcut for PKCS#7 API
var p7 = forge.pkcs7 = forge.pkcs7 || {};

/**
 * Converts a PKCS#7 message from PEM format.
 *
 * @param pem the PEM-formatted PKCS#7 message.
 *
 * @return the PKCS#7 message.
 */
p7.messageFromPem = function(pem) {
  var msg = forge.pem.decode(pem)[0];

  if(msg.type !== 'PKCS7') {
    var error = new Error('Could not convert PKCS#7 message from PEM; PEM ' +
      'header type is not "PKCS#7".');
    error.headerType = msg.type;
    throw error;
  }
  if(msg.procType && msg.procType.type === 'ENCRYPTED') {
    throw new Error('Could not convert PKCS#7 message from PEM; PEM is encrypted.');
  }

  // convert DER to ASN.1 object
  var obj = asn1.fromDer(msg.body);

  return p7.messageFromAsn1(obj);
};

/**
 * Converts a PKCS#7 message to PEM format.
 *
 * @param msg The PKCS#7 message object
 * @param maxline The maximum characters per line, defaults to 64.
 *
 * @return The PEM-formatted PKCS#7 message.
 */
p7.messageToPem = function(msg, maxline) {
  // convert to ASN.1, then DER, then PEM-encode
  var pemObj = {
    type: 'PKCS7',
    body: asn1.toDer(msg.toAsn1()).getBytes()
  };
  return forge.pem.encode(pemObj, {maxline: maxline});
};

/**
 * Converts a PKCS#7 message from an ASN.1 object.
 *
 * @param obj the ASN.1 representation of a ContentInfo.
 *
 * @return the PKCS#7 message.
 */
p7.messageFromAsn1 = function(obj) {
  // validate root level ContentInfo and capture data
  var capture = {};
  var errors = [];
  if(!asn1.validate(obj, p7.asn1.contentInfoValidator, capture, errors))
  {
    var error = new Error('Cannot read PKCS#7 message. ' +
      'ASN.1 object is not an PKCS#7 ContentInfo.');
    error.errors = errors;
    throw error;
  }

  var contentType = asn1.derToOid(capture.contentType);
  var msg;

  switch(contentType) {
    case forge.pki.oids.envelopedData:
      msg = p7.createEnvelopedData();
      break;

    case forge.pki.oids.encryptedData:
      msg = p7.createEncryptedData();
      break;

    case forge.pki.oids.signedData:
      msg = p7.createSignedData();
      break;

    default:
      throw new Error('Cannot read PKCS#7 message. ContentType with OID ' +
        contentType + ' is not (yet) supported.');
  }

  msg.fromAsn1(capture.content.value[0]);
  return msg;
};

/**
 * Converts a single RecipientInfo from an ASN.1 object.
 *
 * @param obj The ASN.1 representation of a RecipientInfo.
 *
 * @return The recipientInfo object.
 */
var _recipientInfoFromAsn1 = function(obj) {
  // Validate EnvelopedData content block and capture data.
  var capture = {};
  var errors = [];
  if(!asn1.validate(obj, p7.asn1.recipientInfoValidator, capture, errors))
  {
    var error = new Error('Cannot read PKCS#7 message. ' +
      'ASN.1 object is not an PKCS#7 EnvelopedData.');
    error.errors = errors;
    throw error;
  }

  return {
    version: capture.version.charCodeAt(0),
    issuer: forge.pki.RDNAttributesAsArray(capture.issuer),
    serialNumber: forge.util.createBuffer(capture.serial).toHex(),
    encryptedContent: {
      algorithm: asn1.derToOid(capture.encAlgorithm),
      parameter: capture.encParameter.value,
      content: capture.encKey
    }
  };
};

/**
 * Converts a single recipientInfo object to an ASN.1 object.
 *
 * @param obj The recipientInfo object.
 *
 * @return The ASN.1 representation of a RecipientInfo.
 */
var _recipientInfoToAsn1 = function(obj) {
  return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
    // Version
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
      asn1.integerToDer(obj.version).getBytes()),
    // IssuerAndSerialNumber
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      // Name
      forge.pki.distinguishedNameToAsn1({attributes: obj.issuer}),
      // Serial
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
        forge.util.hexToBytes(obj.serialNumber))
    ]),
    // KeyEncryptionAlgorithmIdentifier
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      // Algorithm
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        asn1.oidToDer(obj.encryptedContent.algorithm).getBytes()),
      // Parameter, force NULL, only RSA supported for now.
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, '')
    ]),
    // EncryptedKey
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false,
      obj.encryptedContent.content)
  ]);
};

/**
 * Map a set of RecipientInfo ASN.1 objects to recipientInfo objects.
 *
 * @param objArr Array of ASN.1 representations RecipientInfo (i.e. SET OF).
 *
 * @return array of recipientInfo objects.
 */
var _recipientInfosFromAsn1 = function(objArr) {
  var ret = [];
  for(var i = 0; i < objArr.length; i ++) {
    ret.push(_recipientInfoFromAsn1(objArr[i]));
  }
  return ret;
};

/**
 * Map an array of recipientInfo objects to ASN.1 objects.
 *
 * @param recipientsArr Array of recipientInfo objects.
 *
 * @return Array of ASN.1 representations RecipientInfo.
 */
var _recipientInfosToAsn1 = function(recipientsArr) {
  var ret = [];
  for(var i = 0; i < recipientsArr.length; i ++) {
    ret.push(_recipientInfoToAsn1(recipientsArr[i]));
  }
  return ret;
};

/**
 * Map messages encrypted content to ASN.1 objects.
 *
 * @param ec The encryptedContent object of the message.
 *
 * @return ASN.1 representation of the encryptedContent object (SEQUENCE).
 */
var _encryptedContentToAsn1 = function(ec) {
  return [
    // ContentType, always Data for the moment
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
      asn1.oidToDer(forge.pki.oids.data).getBytes()),
    // ContentEncryptionAlgorithmIdentifier
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      // Algorithm
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        asn1.oidToDer(ec.algorithm).getBytes()),
      // Parameters (IV)
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false,
        ec.parameter.getBytes())
    ]),
    // [0] EncryptedContent
    asn1.create(asn1.Class.CONTEXT_SPECIFIC, 0, true, [
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false,
        ec.content.getBytes())
    ])
  ];
};

/**
 * Reads the "common part" of an PKCS#7 content block (in ASN.1 format)
 *
 * This function reads the "common part" of the PKCS#7 content blocks
 * EncryptedData and EnvelopedData, i.e. version number and symmetrically
 * encrypted content block.
 *
 * The result of the ASN.1 validate and capture process is returned
 * to allow the caller to extract further data, e.g. the list of recipients
 * in case of a EnvelopedData object.
 *
 * @param msg the PKCS#7 object to read the data to.
 * @param obj the ASN.1 representation of the content block.
 * @param validator the ASN.1 structure validator object to use.
 *
 * @return the value map captured by validator object.
 */
var _fromAsn1 = function(msg, obj, validator) {
  var capture = {};
  var errors = [];
  if(!asn1.validate(obj, validator, capture, errors)) {
    var error = new Error('Cannot read PKCS#7 message. ' +
      'ASN.1 object is not a supported PKCS#7 message.');
    error.errors = error;
    throw error;
  }

  // Check contentType, so far we only support (raw) Data.
  var contentType = asn1.derToOid(capture.contentType);
  if(contentType !== forge.pki.oids.data) {
    throw new Error('Unsupported PKCS#7 message. ' +
      'Only wrapped ContentType Data supported.');
  }

  if(capture.encryptedContent) {
    var content = '';
    if(forge.util.isArray(capture.encryptedContent)) {
      for(var i = 0; i < capture.encryptedContent.length; ++i) {
        if(capture.encryptedContent[i].type !== asn1.Type.OCTETSTRING) {
          throw new Error('Malformed PKCS#7 message, expecting encrypted ' +
            'content constructed of only OCTET STRING objects.');
        }
        content += capture.encryptedContent[i].value;
      }
    } else {
      content = capture.encryptedContent;
    }
    msg.encryptedContent = {
      algorithm: asn1.derToOid(capture.encAlgorithm),
      parameter: forge.util.createBuffer(capture.encParameter.value),
      content: forge.util.createBuffer(content)
    };
  }

  if(capture.content) {
    var content = '';
    if(forge.util.isArray(capture.content)) {
      for(var i = 0; i < capture.content.length; ++i) {
        if(capture.content[i].type !== asn1.Type.OCTETSTRING) {
          throw new Error('Malformed PKCS#7 message, expecting ' +
            'content constructed of only OCTET STRING objects.');
        }
        content += capture.content[i].value;
      }
    } else {
      content = capture.content;
    }
    msg.content = forge.util.createBuffer(content);
  }

  msg.version = capture.version.charCodeAt(0);
  msg.rawCapture = capture;

  return capture;
};

/**
 * Decrypt the symmetrically encrypted content block of the PKCS#7 message.
 *
 * Decryption is skipped in case the PKCS#7 message object already has a
 * (decrypted) content attribute.  The algorithm, key and cipher parameters
 * (probably the iv) are taken from the encryptedContent attribute of the
 * message object.
 *
 * @param The PKCS#7 message object.
 */
var _decryptContent = function (msg) {
  if(msg.encryptedContent.key === undefined) {
    throw new Error('Symmetric key not available.');
  }

  if(msg.content === undefined) {
    var ciph;

    switch(msg.encryptedContent.algorithm) {
      case forge.pki.oids['aes128-CBC']:
      case forge.pki.oids['aes192-CBC']:
      case forge.pki.oids['aes256-CBC']:
        ciph = forge.aes.createDecryptionCipher(msg.encryptedContent.key);
        break;

      case forge.pki.oids['desCBC']:
      case forge.pki.oids['des-EDE3-CBC']:
        ciph = forge.des.createDecryptionCipher(msg.encryptedContent.key);
        break;

      default:
        throw new Error('Unsupported symmetric cipher, OID ' +
          msg.encryptedContent.algorithm);
    }
    ciph.start(msg.encryptedContent.parameter);
    ciph.update(msg.encryptedContent.content);

    if(!ciph.finish()) {
      throw new Error('Symmetric decryption failed.');
    }

    msg.content = ciph.output;
  }
};

p7.createSignedData = function() {
  var msg = null;
  msg = {
    type: forge.pki.oids.signedData,
    version: 1,
    certificates: [],
    crls: [],
    // populated during sign()
    digestAlgorithmIdentifiers: [],
    contentInfo: null,
    signerInfos: [],

    fromAsn1: function(obj) {
      // validate SignedData content block and capture data.
      _fromAsn1(msg, obj, p7.asn1.signedDataValidator);
      msg.certificates = [];
      msg.crls = [];
      msg.digestAlgorithmIdentifiers = [];
      msg.contentInfo = null;
      msg.signerInfos = [];

      var certs = msg.rawCapture.certificates.value;
      for(var i = 0; i < certs.length; ++i) {
        msg.certificates.push(forge.pki.certificateFromAsn1(certs[i]));
      }

      // TODO: parse crls
    },

    toAsn1: function() {
      // TODO: add support for more data types here
      if('content' in msg) {
        throw new Error('Signing PKCS#7 content not yet implemented.');
      }

      // degenerate case with no content
      if(!msg.contentInfo) {
        msg.sign();
      }

      var certs = [];
      for(var i = 0; i < msg.certificates.length; ++i) {
        certs.push(forge.pki.certificateToAsn1(msg.certificates[0]));
      }

      var crls = [];
      // TODO: implement CRLs

      // ContentInfo
      return asn1.create(
        asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          // ContentType
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
            asn1.oidToDer(msg.type).getBytes()),
          // [0] SignedData
          asn1.create(asn1.Class.CONTEXT_SPECIFIC, 0, true, [
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              // Version
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
                asn1.integerToDer(msg.version).getBytes()),
              // DigestAlgorithmIdentifiers
              asn1.create(
                asn1.Class.UNIVERSAL, asn1.Type.SET, true,
                msg.digestAlgorithmIdentifiers),
              // ContentInfo
              msg.contentInfo,
              // [0] IMPLICIT ExtendedCertificatesAndCertificates
              asn1.create(asn1.Class.CONTEXT_SPECIFIC, 0, true, certs),
              // [1] IMPLICIT CertificateRevocationLists
              asn1.create(asn1.Class.CONTEXT_SPECIFIC, 1, true, crls),
              // SignerInfos
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SET, true,
                msg.signerInfos)
            ])
          ])
      ]);
    },

    /**
     * Signs the content.
     *
     * @param signer the signer (or array of signers) to sign as, for each:
     *          key the private key to sign with.
     *          [md] the message digest to use, defaults to sha-1.
     */
    sign: function(signer) {
      if('content' in msg) {
        throw new Error('PKCS#7 signing not yet implemented.');
      }

      if(typeof msg.content !== 'object') {
        // use Data ContentInfo
        msg.contentInfo = asn1.create(
          asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
            // ContentType
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
              asn1.oidToDer(forge.pki.oids.data).getBytes())
          ]);

        // add actual content, if present
        if('content' in msg) {
          msg.contentInfo.value.push(
            // [0] EXPLICIT content
            asn1.create(asn1.Class.CONTEXT_SPECIFIC, 0, true, [
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false,
                msg.content)
            ]));
        }
      }

      // TODO: generate digest algorithm identifiers

      // TODO: generate signerInfos
    },

    verify: function() {
      throw new Error('PKCS#7 signature verification not yet implemented.');
    },

    /**
     * Add a certificate.
     *
     * @param cert the certificate to add.
     */
    addCertificate: function(cert) {
      // convert from PEM
      if(typeof cert === 'string') {
        cert = forge.pki.certificateFromPem(cert);
      }
      msg.certificates.push(cert);
    },

    /**
     * Add a certificate revokation list.
     *
     * @param crl the certificate revokation list to add.
     */
    addCertificateRevokationList: function(crl) {
      throw new Error('PKCS#7 CRL support not yet implemented.');
    }
  };
  return msg;
};

/**
 * Creates an empty PKCS#7 message of type EncryptedData.
 *
 * @return the message.
 */
p7.createEncryptedData = function() {
  var msg = null;
  msg = {
    type: forge.pki.oids.encryptedData,
    version: 0,
    encryptedContent: {
      algorithm: forge.pki.oids['aes256-CBC']
    },

    /**
     * Reads an EncryptedData content block (in ASN.1 format)
     *
     * @param obj The ASN.1 representation of the EncryptedData content block
     */
    fromAsn1: function(obj) {
      // Validate EncryptedData content block and capture data.
      _fromAsn1(msg, obj, p7.asn1.encryptedDataValidator);
    },

    /**
     * Decrypt encrypted content
     *
     * @param key The (symmetric) key as a byte buffer
     */
    decrypt: function(key) {
      if(key !== undefined) {
        msg.encryptedContent.key = key;
      }
      _decryptContent(msg);
    }
  };
  return msg;
};

/**
 * Creates an empty PKCS#7 message of type EnvelopedData.
 *
 * @return the message.
 */
p7.createEnvelopedData = function() {
  var msg = null;
  msg = {
    type: forge.pki.oids.envelopedData,
    version: 0,
    recipients: [],
    encryptedContent: {
      algorithm: forge.pki.oids['aes256-CBC']
    },

    /**
     * Reads an EnvelopedData content block (in ASN.1 format)
     *
     * @param obj the ASN.1 representation of the EnvelopedData content block.
     */
    fromAsn1: function(obj) {
      // validate EnvelopedData content block and capture data
      var capture = _fromAsn1(msg, obj, p7.asn1.envelopedDataValidator);
      msg.recipients = _recipientInfosFromAsn1(capture.recipientInfos.value);
    },

    toAsn1: function() {
      // ContentInfo
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // ContentType
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
          asn1.oidToDer(msg.type).getBytes()),
        // [0] EnvelopedData
        asn1.create(asn1.Class.CONTEXT_SPECIFIC, 0, true, [
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
            // Version
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
              asn1.integerToDer(msg.version).getBytes()),
            // RecipientInfos
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SET, true,
              _recipientInfosToAsn1(msg.recipients)),
            // EncryptedContentInfo
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true,
              _encryptedContentToAsn1(msg.encryptedContent))
          ])
        ])
      ]);
    },

    /**
     * Find recipient by X.509 certificate's issuer.
     *
     * @param cert the certificate with the issuer to look for.
     *
     * @return the recipient object.
     */
    findRecipient: function(cert) {
      var sAttr = cert.issuer.attributes;

      for(var i = 0; i < msg.recipients.length; ++i) {
        var r = msg.recipients[i];
        var rAttr = r.issuer;

        if(r.serialNumber !== cert.serialNumber) {
          continue;
        }

        if(rAttr.length !== sAttr.length) {
          continue;
        }

        var match = true;
        for(var j = 0; j < sAttr.length; ++j) {
          if(rAttr[j].type !== sAttr[j].type ||
            rAttr[j].value !== sAttr[j].value) {
            match = false;
            break;
          }
        }

        if(match) {
          return r;
        }
      }

      return null;
    },

    /**
     * Decrypt enveloped content
     *
     * @param recipient The recipient object related to the private key
     * @param privKey The (RSA) private key object
     */
    decrypt: function(recipient, privKey) {
      if(msg.encryptedContent.key === undefined && recipient !== undefined &&
        privKey !== undefined) {
        switch(recipient.encryptedContent.algorithm) {
          case forge.pki.oids.rsaEncryption:
          case forge.pki.oids.desCBC:
            var key = privKey.decrypt(recipient.encryptedContent.content);
            msg.encryptedContent.key = forge.util.createBuffer(key);
            break;

          default:
            throw new Error('Unsupported asymmetric cipher, ' +
              'OID ' + recipient.encryptedContent.algorithm);
        }
      }

      _decryptContent(msg);
    },

    /**
     * Add (another) entity to list of recipients.
     *
     * @param cert The certificate of the entity to add.
     */
    addRecipient: function(cert) {
      msg.recipients.push({
        version: 0,
        issuer: cert.issuer.attributes,
        serialNumber: cert.serialNumber,
        encryptedContent: {
          // We simply assume rsaEncryption here, since forge.pki only
          // supports RSA so far.  If the PKI module supports other
          // ciphers one day, we need to modify this one as well.
          algorithm: forge.pki.oids.rsaEncryption,
          key: cert.publicKey
        }
      });
    },

    /**
     * Encrypt enveloped content.
     *
     * This function supports two optional arguments, cipher and key, which
     * can be used to influence symmetric encryption.  Unless cipher is
     * provided, the cipher specified in encryptedContent.algorithm is used
     * (defaults to AES-256-CBC).  If no key is provided, encryptedContent.key
     * is (re-)used.  If that one's not set, a random key will be generated
     * automatically.
     *
     * @param [key] The key to be used for symmetric encryption.
     * @param [cipher] The OID of the symmetric cipher to use.
     */
    encrypt: function(key, cipher) {
      // Part 1: Symmetric encryption
      if(msg.encryptedContent.content === undefined) {
        cipher = cipher || msg.encryptedContent.algorithm;
        key = key || msg.encryptedContent.key;

        var keyLen, ivLen, ciphFn;
        switch(cipher) {
          case forge.pki.oids['aes128-CBC']:
            keyLen = 16;
            ivLen = 16;
            ciphFn = forge.aes.createEncryptionCipher;
            break;

          case forge.pki.oids['aes192-CBC']:
            keyLen = 24;
            ivLen = 16;
            ciphFn = forge.aes.createEncryptionCipher;
            break;

          case forge.pki.oids['aes256-CBC']:
            keyLen = 32;
            ivLen = 16;
            ciphFn = forge.aes.createEncryptionCipher;
            break;

          case forge.pki.oids['des-EDE3-CBC']:
            keyLen = 24;
            ivLen = 8;
            ciphFn = forge.des.createEncryptionCipher;
            break;

          default:
            throw new Error('Unsupported symmetric cipher, OID ' + cipher);
        }

        if(key === undefined) {
          key = forge.util.createBuffer(forge.random.getBytes(keyLen));
        } else if(key.length() != keyLen) {
          throw new Error('Symmetric key has wrong length; ' +
            'got ' + key.length() + ' bytes, expected ' + keyLen + '.');
        }

        // Keep a copy of the key & IV in the object, so the caller can
        // use it for whatever reason.
        msg.encryptedContent.algorithm = cipher;
        msg.encryptedContent.key = key;
        msg.encryptedContent.parameter = forge.util.createBuffer(
          forge.random.getBytes(ivLen));

        var ciph = ciphFn(key);
        ciph.start(msg.encryptedContent.parameter.copy());
        ciph.update(msg.content);

        // The finish function does PKCS#7 padding by default, therefore
        // no action required by us.
        if(!ciph.finish()) {
          throw new Error('Symmetric encryption failed.');
        }

        msg.encryptedContent.content = ciph.output;
      }

      // Part 2: asymmetric encryption for each recipient
      for(var i = 0; i < msg.recipients.length; i ++) {
        var recipient = msg.recipients[i];

        // Nothing to do, encryption already done.
        if(recipient.encryptedContent.content !== undefined) {
          continue;
        }

        switch(recipient.encryptedContent.algorithm) {
          case forge.pki.oids.rsaEncryption:
            recipient.encryptedContent.content =
              recipient.encryptedContent.key.encrypt(
                msg.encryptedContent.key.data);
            break;

          default:
            throw new Error('Unsupported asymmetric cipher, OID ' +
              recipient.encryptedContent.algorithm);
        }
      }
    }
  };
  return msg;
};

} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'pkcs7';
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
define([
  'require',
  'module',
  './aes',
  './asn1',
  './des',
  './oids',
  './pem',
  './pkcs7asn1',
  './random',
  './util',
  './x509'
], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();
