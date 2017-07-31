(function() {

function Tests(ASSERT, PKI) {
  var _pem = {
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
      'MIICXQIBAAKBgQDL0EugUiNGMWscLAVM0VoMdhDZEJOqdsUMpx9U0YZI7szokJqQ\r\n' +
      'NIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMGTkP3VF29vXBo+dLq5e+8VyAy\r\n' +
      'Q3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGtvnM+z0MYDdKo80efzwIDAQAB\r\n' +
      'AoGAIzkGONi5G+JifmXlLJdplom486p3upf4Ce2/7mqfaG9MnkyPSairKD/JXvfh\r\n' +
      'NNWkkN8DKKDKBcVVElPgORYT0qwrWc7ueLBMUCbRXb1ZyfEulimG0R3kjUh7NYau\r\n' +
      'DaIkVgfykXGSQMZx8FoaT6L080zd+0emKDDYRrb+/kgJNJECQQDoUZoiC2K/DWNY\r\n' +
      'h3/ppZ0ane2y4SBmJUHJVMPQ2CEgxsrJTxet668ckNCKaOP/3VFPoWC41f17DvKq\r\n' +
      'noYINNntAkEA4JbZBZBVUrQFhHlrpXT4jzqtO2RlKZzEq8qmFZfEErxOT1WMyyCi\r\n' +
      'lAQ5gUKardo1Kf0omC8Xq/uO9ZYdED55KwJBALs6cJ65UFaq4oLJiQPzLd7yokuE\r\n' +
      'dcj8g71PLBTW6jPxIiMFNA89nz3FU9wIVp+xbMNhSoMMKqIPVPC+m0Rn260CQQDA\r\n' +
      'I83fWK/mZWUjBM33a68KumRiH238v8XyQxj7+C8i6D8G2GXvkigFAehAkb7LZZd+\r\n' +
      'KLuGFyPlWv3fVWHf99KpAkBQFKk3MRMl6IGJZUEFQe4l5whm8LkGU4acSqv9B3xt\r\n' +
      'qROkCrsFrMPqjuuzEmyHoQZ64r2PLJg7FOuyhBnQUOt4\r\n' +
      '-----END RSA PRIVATE KEY-----\r\n',
    publicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDL0EugUiNGMWscLAVM0VoMdhDZ\r\n' +
      'EJOqdsUMpx9U0YZI7szokJqQNIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMG\r\n' +
      'TkP3VF29vXBo+dLq5e+8VyAyQ3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGt\r\n' +
      'vnM+z0MYDdKo80efzwIDAQAB\r\n' +
      '-----END PUBLIC KEY-----\r\n'
  };

  describe('csr', function() {
    it('should generate a certification request', function() {
      var keys = {
        privateKey: PKI.privateKeyFromPem(_pem.privateKey),
        publicKey: PKI.publicKeyFromPem(_pem.publicKey)
      };
      var csr = PKI.createCertificationRequest();
      csr.publicKey = keys.publicKey;
      csr.setSubject([{
        name: 'commonName',
        value: 'example.org'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }]);
      // add optional attributes
      csr.setAttributes([{
        name: 'challengePassword',
        value: 'password'
      }, {
        name: 'unstructuredName',
        value: 'My company'
      }, {
        name: 'extensionRequest',
        extensions: [{
          name: 'subjectAltName',
          altNames: [{
            // type 2 is DNS
            type: 2,
            value: 'test.domain.com'
          }, {
            type: 2,
            value: 'other.domain.com'
          }, {
            type: 2,
            value: 'www.domain.net'
          }]
        }]
      }]);

      // sign certification request
      csr.sign(keys.privateKey);

      var pem = PKI.certificationRequestToPem(csr);
      csr = PKI.certificationRequestFromPem(pem);
      ASSERT.ok(csr.getAttribute({name: 'extensionRequest'}));
      ASSERT.equal(csr.getAttribute({name: 'extensionRequest'}).extensions[0].name, 'subjectAltName');
      ASSERT.deepEqual(csr.getAttribute({name: 'extensionRequest'}).extensions[0].altNames, [{
        // type 2 is DNS
        type: 2,
        value: 'test.domain.com'
      }, {
        type: 2,
        value: 'other.domain.com'
      }, {
        type: 2,
        value: 'www.domain.net'
      }]);
      ASSERT.ok(csr.verify());
    });

    it('should load an OpenSSL-generated certification request', function() {
      var pem = '-----BEGIN CERTIFICATE REQUEST-----\r\n' +
        'MIICdTCCAV0CAQAwMDEVMBMGA1UEAwwMTXlDb21tb25OYW1lMRcwFQYDVQQKDA5N\r\n' +
        'eU9yZ2FuaXphdGlvbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKRU\r\n' +
        'zrAMbiiSjAYYl3PWsOrNwY0VtemgRZc0t7+3FlWp1e8uIA3KxZFZY875wo0QOvD+\r\n' +
        'AdNv5+YnokgzOi83F3T4yewBSR0TiO3Pa4tL4C7CzWnhYliC/owk5bHCV0HLkYUW\r\n' +
        'F6z7Lx3HyhoxlKmrHySSPPZRLKp7KcwxbjFc2EfhQV21I73Z1mCG6MEp7cN2qBbQ\r\n' +
        'PyOMNjAUibOWs4JJEdUjWhm86EZm9+qfgpL5tlpZCe+kXySrKTp56mMsfSOQvlol\r\n' +
        'pRO8pP9AUjaEqRikCZ745I/9W7dHNPUoyxkWV5jRDwcT7s652+L6oxtoqVOXpg28\r\n' +
        'uAL0kUZQMa8wkYUKZiMCAwEAAaAAMA0GCSqGSIb3DQEBBQUAA4IBAQCXQH+ut6tr\r\n' +
        'Z/FdIDOljrc7uh8XpFRKS3GqC/PJsEwrV7d3CX5HuWPTuPc9FU5FQ88w6evXEA0o\r\n' +
        'ijxHuydeXmdjpy433vXWo1TaRSXh1WaBMG5pW/SlGZK9/Hr1P0v7KN/KCY5nXxoQ\r\n' +
        'k3Ndg9HzGrYnRoJVXzvdQeBGwCoJFk4FH+Rxa/F03VTUU5nwx66TsL9JUp9pnbI7\r\n' +
        'MR6DIA97LnTmut8Xp0Uurw+zsS5rif9iv0BKHd7eGpNNGl0RXu8E5dbT0zD90TSa\r\n' +
        'P5WjxjvY+Udg8XZU+UwT3kcyTEFpiQdkzTIKXg0dFurfUE9XG/9aic9oMZ/IBZz9\r\n' +
        'a535a7e9RkbJ\r\n' +
        '-----END CERTIFICATE REQUEST-----\r\n';

      var csr = PKI.certificationRequestFromPem(pem);
      ASSERT.equal(csr.subject.getField('CN').value, 'MyCommonName');
      ASSERT.equal(csr.subject.getField('O').value, 'MyOrganization');
      ASSERT.equal(csr.signatureOid, PKI.oids.sha1WithRSAEncryption);
      ASSERT.equal(csr.publicKey.e.toString(16), '10001');
      ASSERT.equal(csr.publicKey.n.toString(16).toUpperCase(), 'A454CEB00C6E28928C06189773D6B0EACDC18D15B5E9A0459734B7BFB71655A9D5EF2E200DCAC5915963CEF9C28D103AF0FE01D36FE7E627A248333A2F371774F8C9EC01491D1388EDCF6B8B4BE02EC2CD69E1625882FE8C24E5B1C25741CB91851617ACFB2F1DC7CA1A3194A9AB1F24923CF6512CAA7B29CC316E315CD847E1415DB523BDD9D66086E8C129EDC376A816D03F238C36301489B396B3824911D5235A19BCE84666F7EA9F8292F9B65A5909EFA45F24AB293A79EA632C7D2390BE5A25A513BCA4FF40523684A918A4099EF8E48FFD5BB74734F528CB19165798D10F0713EECEB9DBE2FAA31B68A95397A60DBCB802F491465031AF3091850A6623');
      ASSERT.ok(csr.verify());
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/pki'
  ], function(PKI) {
    Tests(
      // Global provided by test harness
      ASSERT,
      PKI()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/pki')());
}

})();
