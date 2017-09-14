(function() {

function Tests(ASSERT, FORGE) {
  var forge = FORGE();
  var PKCS12 = forge.pkcs12;
  var ASN1 = forge.asn1;
  var PEM = forge.pem;
  var PKI = forge.pki;
  var UTIL = forge.util;

  var _data;
  describe('pkcs12', function() {
    it('should create certificate-only p12', function() {
      var p12Asn = PKCS12.toPkcs12Asn1(null, _data.certificate, null, {
        useMac: false,
        generateLocalKeyId: false
      });
      var p12Der = ASN1.toDer(p12Asn).getBytes();

      /* The generated PKCS#12 file lacks a MAC, therefore pass -nomacver to
        OpenSSL: openssl pkcs12 -nomacver -nodes -in pkcs12_certonly.p12 */
      ASSERT.equal(p12Der, UTIL.decode64(_data.p12certonly));
    });

    it('should create key-only p12', function() {
      var privateKey = PKI.privateKeyFromPem(_data.privateKey);
      var p12Asn = PKCS12.toPkcs12Asn1(privateKey, null, null, {
        useMac: false,
        generateLocalKeyId: false
      });
      var p12Der = ASN1.toDer(p12Asn).getBytes();

      /* The generated PKCS#12 file lacks a MAC, therefore pass -nomacver to
        OpenSSL: openssl pkcs12 -nomacver -nodes -in pkcs12_keyonly.p12 */
      ASSERT.equal(p12Der, UTIL.decode64(_data.p12keyonly));
    });

    it('should create encrypted-key-only p12', function() {
      /* Note we need to mock the PRNG, since the PKCS#12 file uses encryption
        which otherwise would differ each time due to the randomized IV. */
      var oldRandomGenerate = forge.random.generate;
      forge.random.generate = function(num) {
        return UTIL.createBuffer().fillWithByte(0, num).getBytes();
      };

      var privateKey = PKI.privateKeyFromPem(_data.privateKey);
      var p12Asn = PKCS12.toPkcs12Asn1(privateKey, null, 'nopass', {
        useMac: false,
        generateLocalKeyId: false
      });
      var p12Der = ASN1.toDer(p12Asn).getBytes();

      // restore old random function
      forge.random.generate = oldRandomGenerate;

      /* The generated PKCS#12 file lacks a MAC, therefore pass -nomacver to
        OpenSSL: openssl pkcs12 -nomacver -in pkcs12_enckeyonly.p12 */
      ASSERT.equal(p12Der, UTIL.decode64(_data.p12enckeyonly));
    });

    it('should import certificate-only p12', function() {
      var p12Der = UTIL.decode64(_data.p12certonly);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1);
      ASSERT.equal(p12.version, 3);

      // PKCS#12 PFX has exactly one SafeContents; it is not encrypted
      ASSERT.equal(p12.safeContents.length, 1);
      ASSERT.equal(p12.safeContents[0].encrypted, false);

      // SafeContents has one SafeBag which has one CertBag with the cert
      ASSERT.equal(p12.safeContents[0].safeBags.length, 1);
      ASSERT.equal(p12.safeContents[0].safeBags[0].type, PKI.oids.certBag);

      // check cert's serial number
      ASSERT.equal(
        p12.safeContents[0].safeBags[0].cert.serialNumber,
        '00d4541c40d835e2f3');
    });

    it('should import key-only p12', function() {
      var p12Der = UTIL.decode64(_data.p12keyonly);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1);
      ASSERT.equal(p12.version, 3);

      // PKCS#12 PFX has exactly one SafeContents; it is not encrypted
      ASSERT.equal(p12.safeContents.length, 1);
      ASSERT.equal(p12.safeContents[0].encrypted, false);

      // SafeContents has one SafeBag which has one KeyBag with the key
      ASSERT.equal(p12.safeContents[0].safeBags.length, 1);
      ASSERT.equal(p12.safeContents[0].safeBags[0].type, PKI.oids.keyBag);

      // compare the key from the PFX by comparing both primes
      var expected = PKI.privateKeyFromPem(_data.privateKey);
      ASSERT.deepEqual(p12.safeContents[0].safeBags[0].key.p, expected.p);
      ASSERT.deepEqual(p12.safeContents[0].safeBags[0].key.q, expected.q);
    });

    it('should import encrypted-key-only p12', function() {
      var p12Der = UTIL.decode64(_data.p12enckeyonly);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, 'nopass');
      ASSERT.equal(p12.version, 3);

      // PKCS#12 PFX has exactly one SafeContents; it is *not* encrypted,
      // only the key itself is encrypted (shrouded)
      ASSERT.equal(p12.safeContents.length, 1);
      ASSERT.equal(p12.safeContents[0].encrypted, false);

      // SafeContents has one SafeBag which has one shrouded KeyBag with the key
      ASSERT.equal(p12.safeContents[0].safeBags.length, 1);
      ASSERT.equal(
        p12.safeContents[0].safeBags[0].type, PKI.oids.pkcs8ShroudedKeyBag);

      // compare the key from the PFX by comparing both primes
      var expected = PKI.privateKeyFromPem(_data.privateKey);
      ASSERT.deepEqual(p12.safeContents[0].safeBags[0].key.p, expected.p);
      ASSERT.deepEqual(p12.safeContents[0].safeBags[0].key.q, expected.q);
    });

    it('should import an encrypted-key-only p12', function() {
      var p12Der = UTIL.decode64(_data.p12enckeyonly);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, 'nopass');
      ASSERT.equal(p12.version, 3);

      // PKCS#12 PFX has exactly one SafeContents; it is *not* encrypted,
      // only the key itself is encrypted (shrouded)
      ASSERT.equal(p12.safeContents.length, 1);
      ASSERT.equal(p12.safeContents[0].encrypted, false);

      // SafeContents has one SafeBag which has one shrouded KeyBag with the key
      ASSERT.equal(p12.safeContents[0].safeBags.length, 1);
      ASSERT.equal(
        p12.safeContents[0].safeBags[0].type, PKI.oids.pkcs8ShroudedKeyBag);

      // compare the key from the PFX by comparing both primes
      var expected = PKI.privateKeyFromPem(_data.privateKey);
      ASSERT.deepEqual(p12.safeContents[0].safeBags[0].key.p, expected.p);
      ASSERT.deepEqual(p12.safeContents[0].safeBags[0].key.q, expected.q);
    });

    it('should import an encrypted p12 with keys and certificates', function() {
      var p12Der = UTIL.decode64(_data.p12encmixed);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123456');
      ASSERT.equal(p12.version, 3);

      // PKCS#12 PFX has two SafeContents; first is *not* encrypted but
      // contains two shrouded keys, second is encrypted and has six
      // certificates
      ASSERT.equal(p12.safeContents.length, 2);

      ASSERT.equal(p12.safeContents[0].encrypted, false);
      ASSERT.equal(p12.safeContents[0].safeBags.length, 2);
      ASSERT.equal(p12.safeContents[0].safeBags[0].type, PKI.oids.pkcs8ShroudedKeyBag);
      ASSERT.equal(p12.safeContents[0].safeBags[0].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[0].safeBags[0].attributes.friendlyName[0], 'encryptionkey');
      ASSERT.equal(p12.safeContents[0].safeBags[0].attributes.localKeyId.length, 1);
      ASSERT.equal(p12.safeContents[0].safeBags[0].attributes.localKeyId[0], 'Time 1311855238964');

      ASSERT.equal(p12.safeContents[0].safeBags[1].type, PKI.oids.pkcs8ShroudedKeyBag);
      ASSERT.equal(p12.safeContents[0].safeBags[1].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[0].safeBags[1].attributes.friendlyName[0], 'signaturekey');
      ASSERT.equal(p12.safeContents[0].safeBags[1].attributes.localKeyId.length, 1);
      ASSERT.equal(p12.safeContents[0].safeBags[1].attributes.localKeyId[0], 'Time 1311855238863');

      ASSERT.equal(p12.safeContents[1].encrypted, true);
      ASSERT.equal(p12.safeContents[1].safeBags.length, 6);

      ASSERT.equal(p12.safeContents[1].safeBags[0].type, PKI.oids.certBag);
      ASSERT.equal(p12.safeContents[1].safeBags[0].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[0].attributes.friendlyName[0], 'CN=1002753325,2.5.4.5=#130b3130303237353333323543');
      ASSERT.equal(p12.safeContents[1].safeBags[0].attributes.localKeyId.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[0].attributes.localKeyId[0], 'Time 1311855238964');

      ASSERT.equal(p12.safeContents[1].safeBags[1].type, PKI.oids.certBag);
      ASSERT.equal(p12.safeContents[1].safeBags[1].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[1].attributes.friendlyName[0], 'CN=ElsterSoftTestCA,OU=CA,O=Elster,C=DE');

      ASSERT.equal(p12.safeContents[1].safeBags[2].type, PKI.oids.certBag);
      ASSERT.equal(p12.safeContents[1].safeBags[2].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[2].attributes.friendlyName[0], 'CN=ElsterRootCA,OU=RootCA,O=Elster,C=DE');

      ASSERT.equal(p12.safeContents[1].safeBags[3].type, PKI.oids.certBag);
      ASSERT.equal(p12.safeContents[1].safeBags[3].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[3].attributes.friendlyName[0], 'CN=1002753325,2.5.4.5=#130b3130303237353333323541');
      ASSERT.equal(p12.safeContents[1].safeBags[3].attributes.localKeyId.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[3].attributes.localKeyId[0], 'Time 1311855238863');

      ASSERT.equal(p12.safeContents[1].safeBags[4].type, PKI.oids.certBag);
      ASSERT.equal(p12.safeContents[1].safeBags[4].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[4].attributes.friendlyName[0], 'CN=ElsterSoftTestCA,OU=CA,O=Elster,C=DE');

      ASSERT.equal(p12.safeContents[1].safeBags[5].type, PKI.oids.certBag);
      ASSERT.equal(p12.safeContents[1].safeBags[5].attributes.friendlyName.length, 1);
      ASSERT.equal(p12.safeContents[1].safeBags[5].attributes.friendlyName[0], 'CN=ElsterRootCA,OU=RootCA,O=Elster,C=DE');
    });

    it('should get bags by friendly name', function() {
      var p12Der = UTIL.decode64(_data.p12encmixed);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123456');
      var bags = p12.getBags({friendlyName: 'signaturekey'});

      ASSERT.equal(bags.friendlyName.length, 1);
      ASSERT.equal(bags.friendlyName[0].attributes.friendlyName[0], 'signaturekey');
    });

    it('should get cert bags by friendly name', function() {
      var p12Der = UTIL.decode64(_data.p12encmixed);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123456');
      var bags = p12.getBags({
        friendlyName: 'CN=1002753325,2.5.4.5=#130b3130303237353333323543',
        bagType: PKI.oids.certBag
      });

      ASSERT.equal(bags.friendlyName.length, 1);
      ASSERT.equal(bags.friendlyName[0].attributes.friendlyName[0], 'CN=1002753325,2.5.4.5=#130b3130303237353333323543');
    });

    it('should get all cert bags', function() {
      var p12Der = UTIL.decode64(_data.p12encmixed);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123456');
      var bags = p12.getBags({
        bagType: PKI.oids.certBag
      });

      ASSERT.equal(bags[PKI.oids.certBag].length, 6);
      for(var i = 0; i < bags[PKI.oids.certBag].length; ++i) {
        ASSERT.equal(bags[PKI.oids.certBag][i].type, PKI.oids.certBag);
      }
    });

    it('should get bags by local key ID', function() {
      var p12Der = UTIL.decode64(_data.p12encmixed);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123456');
      var bags = p12.getBags({localKeyId: 'Time 1311855238863'});

      ASSERT.equal(bags.localKeyId.length, 2);
      ASSERT.equal(bags.localKeyId[0].attributes.localKeyId[0], 'Time 1311855238863');
      ASSERT.equal(bags.localKeyId[1].attributes.localKeyId[0], 'Time 1311855238863');
    });

    it('should get cert bags by local key ID', function() {
      var p12Der = UTIL.decode64(_data.p12encmixed);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123456');
      var bags = p12.getBags({
        localKeyId: 'Time 1311855238863',
        bagType: PKI.oids.certBag
      });

      ASSERT.equal(bags.localKeyId.length, 1);
      ASSERT.equal(bags.localKeyId[0].attributes.localKeyId[0], 'Time 1311855238863');
      ASSERT.equal(bags.localKeyId[0].type, PKI.oids.certBag);
    });

    it('should generate a PKCS#12 mac key', function() {
      var salt = 'A15D6AA8F8DAFC352F9EE1C192F09966EB85D17B';
      salt = UTIL.createBuffer(UTIL.hexToBytes(salt));
      var expected = '03e46727268575c6ebd6bff828d0d09b0c914201263ca543';
      var key = PKCS12.generateKey('123456', salt, 1, 1024, 24);
      ASSERT.equal(key.toHex(), expected);
    });

    it('should load a PKCS#12 with an ECDSA key in a certificate (unsupported key format)', function() {
      var p12Der = UTIL.decode64(_data.p12ecdsa);
      var p12Asn1 = ASN1.fromDer(p12Der);
      var p12 = PKCS12.pkcs12FromAsn1(p12Asn1, '123321');
      var bags = p12.getBags({bagType: PKI.oids.certBag});

      ASSERT.equal(bags[PKI.oids.certBag].length, 1);
      var bag = bags[PKI.oids.certBag][0];
      ASSERT.equal(bag.cert, null);
      ASSERT.equal('asn1' in bag, true);

      // convert to ASN.1, then DER, then PEM-encode
      var msg = {
        type: 'CERTIFICATE',
        body: ASN1.toDer(bag.asn1).getBytes()
      };
      var pem = PEM.encode(msg);
      ASSERT.equal(pem, _data.p12ecdsaCert);
    });
  });

  _data = {
    certificate: '-----BEGIN CERTIFICATE-----\r\n' +
      'MIIDtDCCApwCCQDUVBxA2DXi8zANBgkqhkiG9w0BAQUFADCBmzELMAkGA1UEBhMC\r\n' +
      'REUxEjAQBgNVBAgMCUZyYW5jb25pYTEQMA4GA1UEBwwHQW5zYmFjaDEVMBMGA1UE\r\n' +
      'CgwMU3RlZmFuIFNpZWdsMRIwEAYDVQQLDAlHZWllcmxlaW4xFjAUBgNVBAMMDUdl\r\n' +
      'aWVybGVpbiBERVYxIzAhBgkqhkiG9w0BCQEWFHN0ZXNpZUBicm9rZW5waXBlLmRl\r\n' +
      'MB4XDTEyMDMxODIyNTc0M1oXDTEzMDMxODIyNTc0M1owgZsxCzAJBgNVBAYTAkRF\r\n' +
      'MRIwEAYDVQQIDAlGcmFuY29uaWExEDAOBgNVBAcMB0Fuc2JhY2gxFTATBgNVBAoM\r\n' +
      'DFN0ZWZhbiBTaWVnbDESMBAGA1UECwwJR2VpZXJsZWluMRYwFAYDVQQDDA1HZWll\r\n' +
      'cmxlaW4gREVWMSMwIQYJKoZIhvcNAQkBFhRzdGVzaWVAYnJva2VucGlwZS5kZTCC\r\n' +
      'ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMsAbQ4fWevHqP1K1y/ewpMS\r\n' +
      '3vYovBto7IsKBq0v3NmC2kPf3NhyaSKfjOOS5uAPONLffLck+iGdOLLFia6OSpM6\r\n' +
      '0tyQIV9lHoRh7fOEYORab0Z+aBUZcEGT9yotBOraX1YbKc5f9XO+80eG4XYvb5ua\r\n' +
      '1NHrxWqe4w2p3zGJCKO+wHpvGkbKz0nfu36jwWz5aihfHi9hp/xs8mfH86mIKiD7\r\n' +
      'f2X2KeZ1PK9RvppA0X3lLb2VLOqMt+FHWicyZ/wjhQZ4oW55ln2yYJUQ+adlgaYn\r\n' +
      'PrtnsxmbTxM+99oF0F2/HmGrNs8nLZSva1Vy+hmjmWz6/O8ZxhiIj7oBRqYcAocC\r\n' +
      'AwEAATANBgkqhkiG9w0BAQUFAAOCAQEAvfvtu31GFBO5+mFjPAoR4BlzKq/H3EPO\r\n' +
      'qS8cm/TjHgDRALwSnwKYCFs/bXqE4iOTD6otV4TusX3EPbqL2vzZQEcZn6paU/oZ\r\n' +
      'ZVXwQqMqY5tf2teQiNxqxNmSIEPRHOr2QVBVIx2YF4Po89KGUqJ9u/3/10lDqRwp\r\n' +
      'sReijr5UKv5aygEcnwcW8+Ne4rTx934UDsutKG20dr5trZfWQRVS9fS9CFwJehEX\r\n' +
      'HAMUc/0++80NhfQthmWZWlWM1R3dr4TrIPtWdn5z0MtGeDvqBk7HjGrhcVS6kAsy\r\n' +
      'Z9y/lfLPjBuxlQAHztEJCWgI4TW3/RLhgfg2gI1noM2n84Cdmisfkg==\r\n' +
      '-----END CERTIFICATE-----\r\n',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
      'MIIEowIBAAKCAQEAywBtDh9Z68eo/UrXL97CkxLe9ii8G2jsiwoGrS/c2YLaQ9/c\r\n' +
      '2HJpIp+M45Lm4A840t98tyT6IZ04ssWJro5KkzrS3JAhX2UehGHt84Rg5FpvRn5o\r\n' +
      'FRlwQZP3Ki0E6tpfVhspzl/1c77zR4bhdi9vm5rU0evFap7jDanfMYkIo77Aem8a\r\n' +
      'RsrPSd+7fqPBbPlqKF8eL2Gn/GzyZ8fzqYgqIPt/ZfYp5nU8r1G+mkDRfeUtvZUs\r\n' +
      '6oy34UdaJzJn/COFBnihbnmWfbJglRD5p2WBpic+u2ezGZtPEz732gXQXb8eYas2\r\n' +
      'zyctlK9rVXL6GaOZbPr87xnGGIiPugFGphwChwIDAQABAoIBAAjMA+3QvfzRsikH\r\n' +
      'zTtt09C7yJ2yNjSZ32ZHEPMAV/m1CfBXCyL2EkhF0b0q6IZdIoFA3g6xs4UxYvuc\r\n' +
      'Q9Mkp2ap7elQ9aFEqIXkGIOtAOXkZV4QrEH90DeHSfax7LygqfD5TF59Gg3iAHjh\r\n' +
      'B3Qvqg58LyzJosx0BjLZYaqr3Yv67GkqyflpF/roPGdClHpahAi5PBkHiNhNTAUU\r\n' +
      'LJRGvMegXGZkUKgGMAiGCk0N96OZwrinMKO6YKGdtgwVWC2wbJY0trElaiwXozSt\r\n' +
      'NmP6KTQp94C7rcVO6v1lZiOfhBe5Kc8QHUU+GYydgdjqm6Rdow/yLHOALAVtXSeb\r\n' +
      'U+tPfcECgYEA6Qi+qF+gtPincEDBxRtoKwAlRkALt8kly8bYiGcUmd116k/5bmPw\r\n' +
      'd0tBUOQbqRa1obYC88goOVzp9LInAcBSSrexhVaPAF4nrkwYXMOq+76MiH17WUfQ\r\n' +
      'MgVM2IB48PBjNk1s3Crj6j1cxxkctqmCnVaI9HlU2PPZ3xjaklfv/NsCgYEA3wH8\r\n' +
      'mehUhiAp7vuhd+hfomFw74cqgHC9v0saiYGckpMafh9MJGc4U5GrN1kYeb/CFkSx\r\n' +
      '1hOytD3YBKoaKKoYagaMQcjxf6HnEF0f/5OiQkUQpWmgC9lNnE4XTWjnwqaTS5L9\r\n' +
      'D+H50SiI3VjHymGXTRJeKpAIwV74AxxrnVofqsUCgYAwmL1B2adm9g/c7fQ6yatg\r\n' +
      'hEhBrSuEaTMzmsUfNPfr2m4zrffjWH4WMqBtYRSPn4fDMHTPJ+eThtfXSqutxtCi\r\n' +
      'ekpP9ywdNIVr6LyP49Ita6Bc+mYVyU8Wj1pmL+yIumjGM0FHbL5Y4/EMKCV/xjvR\r\n' +
      '2fD3orHaCIhf6QvzxtjqTwKBgFm6UemXKlMhI94tTsWRMNGEBU3LA9XUBvSuAkpr\r\n' +
      'ZRUwrQssCpXnFinBxbMqXQe3mR8emrM5D8En1P/jdU0BS3t1kP9zG4AwI2lZHuPV\r\n' +
      'ggbKBS2Y9zVtRKXsYcHawM13+nIA/WNjmAGJHrB45UJPy/HNvye+9lbfoEiYKdCR\r\n' +
      'D4bFAoGBAIm9jcZkIwLa9kLAWH995YYYSGRY4KC29XZr2io2mog+BAjhFt1sqebt\r\n' +
      'R8sRHNiIP2mcUECMOcaS+tcayi+8KTHWxIEed9qDmFu6XBbePfe/L6yxPSagcixH\r\n' +
      'BK0KuK/fgTPvZCmIs8hUIC+AxhXKnqn4fIWoO54xLsALc0gEjs2d\r\n' +
      '-----END RSA PRIVATE KEY-----\r\n',
    p12certonly:
      'MIIEHgIBAzCCBBcGCSqGSIb3DQEHAaCCBAgEggQEMIIEADCCA/wGCSqGSIb3DQEH\r\n' +
      'AaCCA+0EggPpMIID5TCCA+EGCyqGSIb3DQEMCgEDoIID0DCCA8wGCiqGSIb3DQEJ\r\n' +
      'FgGgggO8BIIDuDCCA7QwggKcAgkA1FQcQNg14vMwDQYJKoZIhvcNAQEFBQAwgZsx\r\n' +
      'CzAJBgNVBAYTAkRFMRIwEAYDVQQIDAlGcmFuY29uaWExEDAOBgNVBAcMB0Fuc2Jh\r\n' +
      'Y2gxFTATBgNVBAoMDFN0ZWZhbiBTaWVnbDESMBAGA1UECwwJR2VpZXJsZWluMRYw\r\n' +
      'FAYDVQQDDA1HZWllcmxlaW4gREVWMSMwIQYJKoZIhvcNAQkBFhRzdGVzaWVAYnJv\r\n' +
      'a2VucGlwZS5kZTAeFw0xMjAzMTgyMjU3NDNaFw0xMzAzMTgyMjU3NDNaMIGbMQsw\r\n' +
      'CQYDVQQGEwJERTESMBAGA1UECAwJRnJhbmNvbmlhMRAwDgYDVQQHDAdBbnNiYWNo\r\n' +
      'MRUwEwYDVQQKDAxTdGVmYW4gU2llZ2wxEjAQBgNVBAsMCUdlaWVybGVpbjEWMBQG\r\n' +
      'A1UEAwwNR2VpZXJsZWluIERFVjEjMCEGCSqGSIb3DQEJARYUc3Rlc2llQGJyb2tl\r\n' +
      'bnBpcGUuZGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLAG0OH1nr\r\n' +
      'x6j9Stcv3sKTEt72KLwbaOyLCgatL9zZgtpD39zYcmkin4zjkubgDzjS33y3JPoh\r\n' +
      'nTiyxYmujkqTOtLckCFfZR6EYe3zhGDkWm9GfmgVGXBBk/cqLQTq2l9WGynOX/Vz\r\n' +
      'vvNHhuF2L2+bmtTR68VqnuMNqd8xiQijvsB6bxpGys9J37t+o8Fs+WooXx4vYaf8\r\n' +
      'bPJnx/OpiCog+39l9inmdTyvUb6aQNF95S29lSzqjLfhR1onMmf8I4UGeKFueZZ9\r\n' +
      'smCVEPmnZYGmJz67Z7MZm08TPvfaBdBdvx5hqzbPJy2Ur2tVcvoZo5ls+vzvGcYY\r\n' +
      'iI+6AUamHAKHAgMBAAEwDQYJKoZIhvcNAQEFBQADggEBAL377bt9RhQTufphYzwK\r\n' +
      'EeAZcyqvx9xDzqkvHJv04x4A0QC8Ep8CmAhbP216hOIjkw+qLVeE7rF9xD26i9r8\r\n' +
      '2UBHGZ+qWlP6GWVV8EKjKmObX9rXkIjcasTZkiBD0Rzq9kFQVSMdmBeD6PPShlKi\r\n' +
      'fbv9/9dJQ6kcKbEXoo6+VCr+WsoBHJ8HFvPjXuK08fd+FA7LrShttHa+ba2X1kEV\r\n' +
      'UvX0vQhcCXoRFxwDFHP9PvvNDYX0LYZlmVpVjNUd3a+E6yD7VnZ+c9DLRng76gZO\r\n' +
      'x4xq4XFUupALMmfcv5Xyz4wbsZUAB87RCQloCOE1t/0S4YH4NoCNZ6DNp/OAnZor\r\n' +
      'H5I=',
    p12enckeyonly:
      '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\r\n' +
      'H4/s3xo=',
    p12keyonly:
      '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\r\n' +
      'BI7NnQ==',
    p12encmixed:
      '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',
    p12ecdsa: 'MIIEwQIBAzCCBIcGCSqGSIb3DQEHAaCCBHgEggR0MIIEcDCCAy8GCSqGSIb3DQEHBqCCAyAwggMcAgEAMIIDFQYJKoZIhvcNAQcBMBwGCiqGSIb3DQEMAQYwDgQIxn3OksiScggCAggAgIIC6OB2GSW2p7zaoD4FS5+8kVRF8yTPFpNfV49YCQk49DzPEJoa2tKUE8dMh48jKEh3NRm4kemaN+CKZczTPB5xk21P/+PtLWzfFYFS8/wt/UJ+5NEbRHlVkI2GDj4HYwP+7E0ad0qi54UsuyxIeph7046Jag3keqfoKYinAoiEe3mvbWlICKTWj0PpuDQ2gxb7axwOnqsGfNC3J4HivnbcDPNL+/JReC5SgK/xEQpyBc4Fz49YA9qIGC6gQxNiIC9mQvq7M8hKDumYgkFWH25HXWzj6/pBT+4C8kQxkuLi+KWh9KWj8UXc2YaeqMR6MeJUJ7YMNELVGxU+a3ZY8NFkJf4jLAPy76u4JMEbX6meHtfmOAzqaGG6pnfuqZUWRHrTxYGWIWuTkSFfqCsB08McB6HYqEYm7juHqO7lqnIvRwh++TV7F/DJupOcS8sm4Q0+pI/Ug9lex27d/TVfFL2ICRfCVOvOtv65K+6fqNkPDrctQVl/kqS8tkWZoH+yfS/qDzICk9/fnAnO7bl4yiFGYp6ISbjAnki2NnRVdyGPQIO4B51VqqMeVzN3689ppJQZCajgw7afyq1rDt1dCqiD0OdnKXkARZEp2UeIqmMCMhVPRCeY1N+Z8yF8yWUv77SkGlwtMtyvhGYlrM3Wq/rweW6P20DfeSoLu9pU/ZxXe0X9a4ko/lXjKp/+ksJRZJcxWcRDxFRLtrHIWqrzIEdWilN/ld59HP6JU2+fhBkg+waWXd+lxEmIaVw6YY7WVmQT4riC17GGKjzyrNKQp0q4BDRZKJiJm1LSDBkGYUhWTkiHaZnihuwkidnXGaM6RshPu8c7nA29EoyoZjs4Vtj9dxQzwu6RvA+UvO3v+PMxxa0O/UKjU1XPLdhaxnc5KIUQGechjsgCooHQFOQ8hxEZPUQaBnebTRjq0W7Q+DhKv1EyGFWWRNG2cJRx1EDUO+A02nBvLck5DKOdIcJlsKiHWB0/ntCRqtQ7XzCCATkGCSqGSIb3DQEHAaCCASoEggEmMIIBIjCCAR4GCyqGSIb3DQEMCgECoIG0MIGxMBwGCiqGSIb3DQEMAQMwDgQI3Q+0WbOjf/0CAggABIGQhW8EaZfJhr+MTd4xjkUcubSPjzspoLeLtGLxmKxTBnbwBrKJBJ3bzXvU7we7qvvJGhWQfsRSHXEE841WS8I14veJJLWBJfN5V0AYz2aYkoApDQ61/o7mvgaAIn5rQQh20jp0EFXZM1TRqAT17pjBcBTaZ/s0wpUi2dbYqzhIgEYsQFQfHbW576eht5NlND3tMVgwIwYJKoZIhvcNAQkVMRYEFJ6dpRl6qwj5OZg36y8v5EVowEENMDEGCSqGSIb3DQEJFDEkHiIARQBDAEQAUwBBACAAYwBlAHIAdABpAGYAaQBjAGEAdABlMDEwITAJBgUrDgMCGgUABBSMcup2jX5JqMU5lqH8d/A0/kOu+wQI5FJlbGEnxF4CAggA',
    p12ecdsaCert: '-----BEGIN CERTIFICATE-----\r\n' +
      'MIICVzCCAf6gAwIBAgIJAO8k1Go1w/58MAkGByqGSM49BAEwgYgxCzAJBgNVBAYT\r\n' +
      'AkZSMQ4wDAYDVQQIDAVwYXJpczEMMAoGA1UEBwwDSWxlMQ0wCwYDVQQKDARlcmRm\r\n' +
      'MSIwIAYDVQQDDBluaXphci5hYmRlbm5lYmlAZ21haWwuY29tMSgwJgYJKoZIhvcN\r\n' +
      'AQkBFhluaXphci5hYmRlbm5lYmlAZ21haWwuY29tMB4XDTE0MDczMDE2MTYyMloX\r\n' +
      'DTE1MDczMDE2MTYyMlowgYgxCzAJBgNVBAYTAkZSMQ4wDAYDVQQIDAVwYXJpczEM\r\n' +
      'MAoGA1UEBwwDSWxlMQ0wCwYDVQQKDARlcmRmMSIwIAYDVQQDDBluaXphci5hYmRl\r\n' +
      'bm5lYmlAZ21haWwuY29tMSgwJgYJKoZIhvcNAQkBFhluaXphci5hYmRlbm5lYmlA\r\n' +
      'Z21haWwuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELqy3xekJMWlXzq5g\r\n' +
      '5ao7Z8PH3iL0I2Tj28SGrDIdZ07f5x/rAbwjbcfp2YsJecEJOoaE3/jgbI8/mc1p\r\n' +
      'wWJtm6NQME4wHQYDVR0OBBYEFINzYXPWdpiaoDaLBiObKSezqjYSMB8GA1UdIwQY\r\n' +
      'MBaAFINzYXPWdpiaoDaLBiObKSezqjYSMAwGA1UdEwQFMAMBAf8wCQYHKoZIzj0E\r\n' +
      'AQNIADBFAiEA9Q+TJyUHEn7lhjEkF1OUb0hEwejAWny+mvqQ0XNHup4CIAeOLjEs\r\n' +
      'mthwYiI/c1op4Y+H0xLUp2v8iLWHIDqAZA89\r\n' +
      '-----END CERTIFICATE-----\r\n'
  };
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/forge'
  ], function(FORGE) {
    Tests(
      // Global provided by test harness
      ASSERT,
      FORGE
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/forge'));
}

})();
