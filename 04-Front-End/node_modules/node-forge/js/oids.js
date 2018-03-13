/**
 * Object IDs for ASN.1.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2013 Digital Bazaar, Inc.
 */
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {

forge.pki = forge.pki || {};
var oids = forge.pki.oids = forge.oids = forge.oids || {};

// algorithm OIDs
oids['1.2.840.113549.1.1.1'] = 'rsaEncryption';
oids['rsaEncryption'] = '1.2.840.113549.1.1.1';
// Note: md2 & md4 not implemented
//oids['1.2.840.113549.1.1.2'] = 'md2WithRSAEncryption';
//oids['md2WithRSAEncryption'] = '1.2.840.113549.1.1.2';
//oids['1.2.840.113549.1.1.3'] = 'md4WithRSAEncryption';
//oids['md4WithRSAEncryption'] = '1.2.840.113549.1.1.3';
oids['1.2.840.113549.1.1.4'] = 'md5WithRSAEncryption';
oids['md5WithRSAEncryption'] = '1.2.840.113549.1.1.4';
oids['1.2.840.113549.1.1.5'] = 'sha1WithRSAEncryption';
oids['sha1WithRSAEncryption'] = '1.2.840.113549.1.1.5';
oids['1.2.840.113549.1.1.7'] = 'RSAES-OAEP';
oids['RSAES-OAEP'] = '1.2.840.113549.1.1.7';
oids['1.2.840.113549.1.1.8'] = 'mgf1';
oids['mgf1'] = '1.2.840.113549.1.1.8';
oids['1.2.840.113549.1.1.9'] = 'pSpecified';
oids['pSpecified'] = '1.2.840.113549.1.1.9';
oids['1.2.840.113549.1.1.10'] = 'RSASSA-PSS';
oids['RSASSA-PSS'] = '1.2.840.113549.1.1.10';
oids['1.2.840.113549.1.1.11'] = 'sha256WithRSAEncryption';
oids['sha256WithRSAEncryption'] = '1.2.840.113549.1.1.11';
oids['1.2.840.113549.1.1.12'] = 'sha384WithRSAEncryption';
oids['sha384WithRSAEncryption'] = '1.2.840.113549.1.1.12';
oids['1.2.840.113549.1.1.13'] = 'sha512WithRSAEncryption';
oids['sha512WithRSAEncryption'] = '1.2.840.113549.1.1.13';

oids['1.3.14.3.2.7'] = 'desCBC';
oids['desCBC'] = '1.3.14.3.2.7';

oids['1.3.14.3.2.26'] = 'sha1';
oids['sha1'] = '1.3.14.3.2.26';
oids['2.16.840.1.101.3.4.2.1'] = 'sha256';
oids['sha256'] = '2.16.840.1.101.3.4.2.1';
oids['2.16.840.1.101.3.4.2.2'] = 'sha384';
oids['sha384'] = '2.16.840.1.101.3.4.2.2';
oids['2.16.840.1.101.3.4.2.3'] = 'sha512';
oids['sha512'] = '2.16.840.1.101.3.4.2.3';
oids['1.2.840.113549.2.5'] = 'md5';
oids['md5'] = '1.2.840.113549.2.5';

// pkcs#7 content types
oids['1.2.840.113549.1.7.1'] = 'data';
oids['data'] = '1.2.840.113549.1.7.1';
oids['1.2.840.113549.1.7.2'] = 'signedData';
oids['signedData'] = '1.2.840.113549.1.7.2';
oids['1.2.840.113549.1.7.3'] = 'envelopedData';
oids['envelopedData'] = '1.2.840.113549.1.7.3';
oids['1.2.840.113549.1.7.4'] = 'signedAndEnvelopedData';
oids['signedAndEnvelopedData'] = '1.2.840.113549.1.7.4';
oids['1.2.840.113549.1.7.5'] = 'digestedData';
oids['digestedData'] = '1.2.840.113549.1.7.5';
oids['1.2.840.113549.1.7.6'] = 'encryptedData';
oids['encryptedData'] = '1.2.840.113549.1.7.6';

// pkcs#9 oids
oids['1.2.840.113549.1.9.1'] = 'emailAddress';
oids['emailAddress'] = '1.2.840.113549.1.9.1';
oids['1.2.840.113549.1.9.2'] = 'unstructuredName';
oids['unstructuredName'] = '1.2.840.113549.1.9.2';
oids['1.2.840.113549.1.9.3'] = 'contentType';
oids['contentType'] = '1.2.840.113549.1.9.3';
oids['1.2.840.113549.1.9.4'] = 'messageDigest';
oids['messageDigest'] = '1.2.840.113549.1.9.4';
oids['1.2.840.113549.1.9.5'] = 'signingTime';
oids['signingTime'] = '1.2.840.113549.1.9.5';
oids['1.2.840.113549.1.9.6'] = 'counterSignature';
oids['counterSignature'] = '1.2.840.113549.1.9.6';
oids['1.2.840.113549.1.9.7'] = 'challengePassword';
oids['challengePassword'] = '1.2.840.113549.1.9.7';
oids['1.2.840.113549.1.9.8'] = 'unstructuredAddress';
oids['unstructuredAddress'] = '1.2.840.113549.1.9.8';
oids['1.2.840.113549.1.9.14'] = 'extensionRequest';
oids['extensionRequest'] = '1.2.840.113549.1.9.14';

oids['1.2.840.113549.1.9.20'] = 'friendlyName';
oids['friendlyName'] = '1.2.840.113549.1.9.20';
oids['1.2.840.113549.1.9.21'] = 'localKeyId';
oids['localKeyId'] = '1.2.840.113549.1.9.21';
oids['1.2.840.113549.1.9.22.1'] = 'x509Certificate';
oids['x509Certificate'] = '1.2.840.113549.1.9.22.1';

// pkcs#12 safe bags
oids['1.2.840.113549.1.12.10.1.1'] = 'keyBag';
oids['keyBag'] = '1.2.840.113549.1.12.10.1.1';
oids['1.2.840.113549.1.12.10.1.2'] = 'pkcs8ShroudedKeyBag';
oids['pkcs8ShroudedKeyBag'] = '1.2.840.113549.1.12.10.1.2';
oids['1.2.840.113549.1.12.10.1.3'] = 'certBag';
oids['certBag'] = '1.2.840.113549.1.12.10.1.3';
oids['1.2.840.113549.1.12.10.1.4'] = 'crlBag';
oids['crlBag'] = '1.2.840.113549.1.12.10.1.4';
oids['1.2.840.113549.1.12.10.1.5'] = 'secretBag';
oids['secretBag'] = '1.2.840.113549.1.12.10.1.5';
oids['1.2.840.113549.1.12.10.1.6'] = 'safeContentsBag';
oids['safeContentsBag'] = '1.2.840.113549.1.12.10.1.6';

// password-based-encryption for pkcs#12
oids['1.2.840.113549.1.5.13'] = 'pkcs5PBES2';
oids['pkcs5PBES2'] = '1.2.840.113549.1.5.13';
oids['1.2.840.113549.1.5.12'] = 'pkcs5PBKDF2';
oids['pkcs5PBKDF2'] = '1.2.840.113549.1.5.12';

oids['1.2.840.113549.1.12.1.1'] = 'pbeWithSHAAnd128BitRC4';
oids['pbeWithSHAAnd128BitRC4'] = '1.2.840.113549.1.12.1.1';
oids['1.2.840.113549.1.12.1.2'] = 'pbeWithSHAAnd40BitRC4';
oids['pbeWithSHAAnd40BitRC4'] = '1.2.840.113549.1.12.1.2';
oids['1.2.840.113549.1.12.1.3'] = 'pbeWithSHAAnd3-KeyTripleDES-CBC';
oids['pbeWithSHAAnd3-KeyTripleDES-CBC'] = '1.2.840.113549.1.12.1.3';
oids['1.2.840.113549.1.12.1.4'] = 'pbeWithSHAAnd2-KeyTripleDES-CBC';
oids['pbeWithSHAAnd2-KeyTripleDES-CBC'] = '1.2.840.113549.1.12.1.4';
oids['1.2.840.113549.1.12.1.5'] = 'pbeWithSHAAnd128BitRC2-CBC';
oids['pbeWithSHAAnd128BitRC2-CBC'] = '1.2.840.113549.1.12.1.5';
oids['1.2.840.113549.1.12.1.6'] = 'pbewithSHAAnd40BitRC2-CBC';
oids['pbewithSHAAnd40BitRC2-CBC'] = '1.2.840.113549.1.12.1.6';

// symmetric key algorithm oids
oids['1.2.840.113549.3.7'] = 'des-EDE3-CBC';
oids['des-EDE3-CBC'] = '1.2.840.113549.3.7';
oids['2.16.840.1.101.3.4.1.2'] = 'aes128-CBC';
oids['aes128-CBC'] = '2.16.840.1.101.3.4.1.2';
oids['2.16.840.1.101.3.4.1.22'] = 'aes192-CBC';
oids['aes192-CBC'] = '2.16.840.1.101.3.4.1.22';
oids['2.16.840.1.101.3.4.1.42'] = 'aes256-CBC';
oids['aes256-CBC'] = '2.16.840.1.101.3.4.1.42';

// certificate issuer/subject OIDs
oids['2.5.4.3'] = 'commonName';
oids['commonName'] = '2.5.4.3';
oids['2.5.4.5'] = 'serialName';
oids['serialName'] = '2.5.4.5';
oids['2.5.4.6'] = 'countryName';
oids['countryName'] = '2.5.4.6';
oids['2.5.4.7'] = 'localityName';
oids['localityName'] = '2.5.4.7';
oids['2.5.4.8'] = 'stateOrProvinceName';
oids['stateOrProvinceName'] = '2.5.4.8';
oids['2.5.4.10'] = 'organizationName';
oids['organizationName'] = '2.5.4.10';
oids['2.5.4.11'] = 'organizationalUnitName';
oids['organizationalUnitName'] = '2.5.4.11';

// X.509 extension OIDs
oids['2.16.840.1.113730.1.1'] = 'nsCertType';
oids['nsCertType'] = '2.16.840.1.113730.1.1';
oids['2.5.29.1'] = 'authorityKeyIdentifier'; // deprecated, use .35
oids['2.5.29.2'] = 'keyAttributes'; // obsolete use .37 or .15
oids['2.5.29.3'] = 'certificatePolicies'; // deprecated, use .32
oids['2.5.29.4'] = 'keyUsageRestriction'; // obsolete use .37 or .15
oids['2.5.29.5'] = 'policyMapping'; // deprecated use .33
oids['2.5.29.6'] = 'subtreesConstraint'; // obsolete use .30
oids['2.5.29.7'] = 'subjectAltName'; // deprecated use .17
oids['2.5.29.8'] = 'issuerAltName'; // deprecated use .18
oids['2.5.29.9'] = 'subjectDirectoryAttributes';
oids['2.5.29.10'] = 'basicConstraints'; // deprecated use .19
oids['2.5.29.11'] = 'nameConstraints'; // deprecated use .30
oids['2.5.29.12'] = 'policyConstraints'; // deprecated use .36
oids['2.5.29.13'] = 'basicConstraints'; // deprecated use .19
oids['2.5.29.14'] = 'subjectKeyIdentifier';
oids['subjectKeyIdentifier'] = '2.5.29.14';
oids['2.5.29.15'] = 'keyUsage';
oids['keyUsage'] = '2.5.29.15';
oids['2.5.29.16'] = 'privateKeyUsagePeriod';
oids['2.5.29.17'] = 'subjectAltName';
oids['subjectAltName'] = '2.5.29.17';
oids['2.5.29.18'] = 'issuerAltName';
oids['issuerAltName'] = '2.5.29.18';
oids['2.5.29.19'] = 'basicConstraints';
oids['basicConstraints'] = '2.5.29.19';
oids['2.5.29.20'] = 'cRLNumber';
oids['2.5.29.21'] = 'cRLReason';
oids['2.5.29.22'] = 'expirationDate';
oids['2.5.29.23'] = 'instructionCode';
oids['2.5.29.24'] = 'invalidityDate';
oids['2.5.29.25'] = 'cRLDistributionPoints'; // deprecated use .31
oids['2.5.29.26'] = 'issuingDistributionPoint'; // deprecated use .28
oids['2.5.29.27'] = 'deltaCRLIndicator';
oids['2.5.29.28'] = 'issuingDistributionPoint';
oids['2.5.29.29'] = 'certificateIssuer';
oids['2.5.29.30'] = 'nameConstraints';
oids['2.5.29.31'] = 'cRLDistributionPoints';
oids['2.5.29.32'] = 'certificatePolicies';
oids['2.5.29.33'] = 'policyMappings';
oids['2.5.29.34'] = 'policyConstraints'; // deprecated use .36
oids['2.5.29.35'] = 'authorityKeyIdentifier';
oids['2.5.29.36'] = 'policyConstraints';
oids['2.5.29.37'] = 'extKeyUsage';
oids['extKeyUsage'] = '2.5.29.37';
oids['2.5.29.46'] = 'freshestCRL';
oids['2.5.29.54'] = 'inhibitAnyPolicy';

// extKeyUsage purposes
oids['1.3.6.1.5.5.7.3.1'] = 'serverAuth';
oids['serverAuth'] = '1.3.6.1.5.5.7.3.1';
oids['1.3.6.1.5.5.7.3.2'] = 'clientAuth';
oids['clientAuth'] = '1.3.6.1.5.5.7.3.2';
oids['1.3.6.1.5.5.7.3.3'] = 'codeSigning';
oids['codeSigning'] = '1.3.6.1.5.5.7.3.3';
oids['1.3.6.1.5.5.7.3.4'] = 'emailProtection';
oids['emailProtection'] = '1.3.6.1.5.5.7.3.4';
oids['1.3.6.1.5.5.7.3.8'] = 'timeStamping';
oids['timeStamping'] = '1.3.6.1.5.5.7.3.8';

} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'oids';
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
define(['require', 'module'], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();
