(function() {

function Tests(ASSERT, KEM, MD, RSA, UTIL, JSBN, RANDOM) {

  function FixedSecureRandom(str) {
    var bytes = UTIL.hexToBytes(str);
    this.getBytesSync = function(count) {
      // prepend zeros
      return UTIL.fillString(String.fromCharCode(0), bytes.length - count) +
        bytes;
    };
  }

  describe('kem', function() {
    it('should generate and encrypt a symmetric key and decrypt it 10x', function() {
      for(var i = 0; i < 10; ++i) {
        var kdf = new KEM.kdf1(MD.sha256.create());
        var kem = KEM.rsa.create(kdf);

        var pair = RSA.generateKeyPair(512);

        var result = kem.encrypt(pair.publicKey, 256);
        var key1 = result.key;
        var key2 = kem.decrypt(pair.privateKey, result.encapsulation, 256);

        ASSERT.equal(UTIL.bytesToHex(key1), UTIL.bytesToHex(key2));
      }
    });
  });

  /**
   * According to section "C.6 Test vectors for RSA-KEM" from ISO-18033-2 final
   * draft.
   */
  describe('C.6 Test vectors for RSA-KEM from ISO-18033-2 final', function() {
    it('should pass test vector C.6.1', function() {
      var n = '5888113332502691251761936431009284884966640757179802337490546478326238537107326596800820237597139824869184990638749556269785797065508097452399642780486933';
      var e = '65537';
      var d = '3202313555859948186315374524474173995679783580392140237044349728046479396037520308981353808895461806395564474639124525446044708705259675840210989546479265';

      var C0 = '4603e5324cab9cef8365c817052d954d44447b1667099edc69942d32cd594e4ffcf268ae3836e2c35744aaa53ae201fe499806b67dedaa26bf72ecbd117a6fc0';
      var K = '5f8de105b5e96b2e490ddecbd147dd1def7e3b8e0e6a26eb7b956ccb8b3bdc1ca975bc57c3989e8fbad31a224655d800c46954840ff32052cdf0d640562bdfadfa263cfccf3c52b29f2af4a1869959bc77f854cf15bd7a25192985a842dbff8e13efee5b7e7e55bbe4d389647c686a9a9ab3fb889b2d7767d3837eea4e0a2f04';

      var kdf = new KEM.kdf1(MD.sha1.create());
      var rnd = new FixedSecureRandom('032e45326fa859a72ec235acff929b15d1372e30b207255f0611b8f785d764374152e0ac009e509e7ba30cd2f1778e113b64e135cf4e2292c75efe5288edfda4');
      var kem = KEM.rsa.create(kdf, {prng: rnd});

      var rsaPublicKey = RSA.setPublicKey(
        new JSBN.BigInteger(n), new JSBN.BigInteger(e));
      var rsaPrivateKey = RSA.setPrivateKey(
        new JSBN.BigInteger(n), null, new JSBN.BigInteger(d));

      var result = kem.encrypt(rsaPublicKey, 128);
      ASSERT.equal(UTIL.bytesToHex(result.encapsulation), C0);
      ASSERT.equal(UTIL.bytesToHex(result.key), K);

      var decryptedKey = kem.decrypt(rsaPrivateKey, result.encapsulation, 128);
      ASSERT.equal(UTIL.bytesToHex(decryptedKey), K);
    });

    it('should pass test vector C.6.2', function() {
      var n = '5888113332502691251761936431009284884966640757179802337490546478326238537107326596800820237597139824869184990638749556269785797065508097452399642780486933';
      var e = '65537';
      var d = '3202313555859948186315374524474173995679783580392140237044349728046479396037520308981353808895461806395564474639124525446044708705259675840210989546479265';

      var C0 = '4603e5324cab9cef8365c817052d954d44447b1667099edc69942d32cd594e4ffcf268ae3836e2c35744aaa53ae201fe499806b67dedaa26bf72ecbd117a6fc0';
      var K = '0e6a26eb7b956ccb8b3bdc1ca975bc57c3989e8fbad31a224655d800c46954840ff32052cdf0d640562bdfadfa263cfccf3c52b29f2af4a1869959bc77f854cf15bd7a25192985a842dbff8e13efee5b7e7e55bbe4d389647c686a9a9ab3fb889b2d7767d3837eea4e0a2f04b53ca8f50fb31225c1be2d0126c8c7a4753b0807';

      var kdf = new KEM.kdf2(MD.sha1.create());
      var rnd = new FixedSecureRandom('032e45326fa859a72ec235acff929b15d1372e30b207255f0611b8f785d764374152e0ac009e509e7ba30cd2f1778e113b64e135cf4e2292c75efe5288edfda4');
      var kem = KEM.rsa.create(kdf, {prng: rnd});

      var rsaPublicKey = RSA.setPublicKey(
        new JSBN.BigInteger(n), new JSBN.BigInteger(e));
      var rsaPrivateKey = RSA.setPrivateKey(
        new JSBN.BigInteger(n), null, new JSBN.BigInteger(d));

      var result = kem.encrypt(rsaPublicKey, 128);
      ASSERT.equal(UTIL.bytesToHex(result.encapsulation), C0);
      ASSERT.equal(UTIL.bytesToHex(result.key), K);

      var decryptedKey = kem.decrypt(rsaPrivateKey, result.encapsulation, 128);
      ASSERT.equal(UTIL.bytesToHex(decryptedKey), K);
    });

    it('should pass test vector C.6.3', function() {
      var n = '5888113332502691251761936431009284884966640757179802337490546478326238537107326596800820237597139824869184990638749556269785797065508097452399642780486933';
      var e = '65537';
      var d = '3202313555859948186315374524474173995679783580392140237044349728046479396037520308981353808895461806395564474639124525446044708705259675840210989546479265';

      var C0 = '4603e5324cab9cef8365c817052d954d44447b1667099edc69942d32cd594e4ffcf268ae3836e2c35744aaa53ae201fe499806b67dedaa26bf72ecbd117a6fc0';
      var K = '09e2decf2a6e1666c2f6071ff4298305e2643fd510a2403db42a8743cb989de86e668d168cbe604611ac179f819a3d18412e9eb45668f2923c087c12fee0c5a0d2a8aa70185401fbbd99379ec76c663e875a60b4aacb1319fa11c3365a8b79a44669f26fb555c80391847b05eca1cb5cf8c2d531448d33fbaca19f6410ee1fcb';

      var kdf = new KEM.kdf1(MD.sha256.create(), 20);
      var rnd = new FixedSecureRandom('032e45326fa859a72ec235acff929b15d1372e30b207255f0611b8f785d764374152e0ac009e509e7ba30cd2f1778e113b64e135cf4e2292c75efe5288edfda4');
      var kem = KEM.rsa.create(kdf, {prng: rnd});

      var rsaPublicKey = RSA.setPublicKey(
        new JSBN.BigInteger(n), new JSBN.BigInteger(e));
      var rsaPrivateKey = RSA.setPrivateKey(
        new JSBN.BigInteger(n), null, new JSBN.BigInteger(d));

      var result = kem.encrypt(rsaPublicKey, 128);
      ASSERT.equal(UTIL.bytesToHex(result.encapsulation), C0);
      ASSERT.equal(UTIL.bytesToHex(result.key), K);

      var decryptedKey = kem.decrypt(rsaPrivateKey, result.encapsulation, 128);
      ASSERT.equal(UTIL.bytesToHex(decryptedKey), K);
    });

    it('should pass test vector C.6.4', function() {
      var n = '5888113332502691251761936431009284884966640757179802337490546478326238537107326596800820237597139824869184990638749556269785797065508097452399642780486933';
      var e = '65537';
      var d = '3202313555859948186315374524474173995679783580392140237044349728046479396037520308981353808895461806395564474639124525446044708705259675840210989546479265';

      var C0 = '4603e5324cab9cef8365c817052d954d44447b1667099edc69942d32cd594e4ffcf268ae3836e2c35744aaa53ae201fe499806b67dedaa26bf72ecbd117a6fc0';
      var K = '10a2403db42a8743cb989de86e668d168cbe604611ac179f819a3d18412e9eb45668f2923c087c12fee0c5a0d2a8aa70185401fbbd99379ec76c663e875a60b4aacb1319fa11c3365a8b79a44669f26fb555c80391847b05eca1cb5cf8c2d531448d33fbaca19f6410ee1fcb260892670e0814c348664f6a7248aaf998a3acc6';

      var kdf = new KEM.kdf2(MD.sha256.create(), 20);
      var rnd = new FixedSecureRandom('00032e45326fa859a72ec235acff929b15d1372e30b207255f0611b8f785d764374152e0ac009e509e7ba30cd2f1778e113b64e135cf4e2292c75efe5288edfda4');
      var kem = KEM.rsa.create(kdf, {prng: rnd});

      var rsaPublicKey = RSA.setPublicKey(
        new JSBN.BigInteger(n), new JSBN.BigInteger(e));
      var rsaPrivateKey = RSA.setPrivateKey(
        new JSBN.BigInteger(n), null, new JSBN.BigInteger(d));

      var result = kem.encrypt(rsaPublicKey, 128);
      ASSERT.equal(UTIL.bytesToHex(result.encapsulation), C0);
      ASSERT.equal(UTIL.bytesToHex(result.key), K);

      var decryptedKey = kem.decrypt(rsaPrivateKey, result.encapsulation, 128);
      ASSERT.equal(UTIL.bytesToHex(decryptedKey), K);
    });
  });

  describe('prepended zeros test', function() {
    it('should pass when random has leading zeros', function() {
      var n = '5888113332502691251761936431009284884966640757179802337490546478326238537107326596800820237597139824869184990638749556269785797065508097452399642780486933';
      var e = '65537';
      var d = '3202313555859948186315374524474173995679783580392140237044349728046479396037520308981353808895461806395564474639124525446044708705259675840210989546479265';

      var C0 = '5f268a76c1aed04bc195a143d7ee768bee0aad308d16196274a02d9c1a72bbe10cbf718de323fc0135c5f8129f96ac8f504d9623960dc54cd87bddee94f5a0b2';
      var K = '8bf41e59dc1b83142ee32569a347a94539e48c98347c685a29e3aa8b7a3ea714d68c1a43c4a760c9d4a45149b0ce8b681e98076bdd4393394c7832a7fa71848257772ac38a4e7fbe96e8bb383becbb7242841946e82e35d9ef1667245fc82601e7edf53b897f5ce2b6bce8e1e3212abd5a8a99a0c9b99472e22a313dac396383';

      var kdf = new KEM.kdf1(MD.sha1.create());
      var rnd = new FixedSecureRandom('000e45326fa859a72ec235acff929b15d1372e30b207255f0611b8f785d764374152e0ac009e509e7ba30cd2f1778e113b64e135cf4e2292c75efe5288edfda4');
      var kem = KEM.rsa.create(kdf, {prng: rnd});

      var rsaPublicKey = RSA.setPublicKey(
        new JSBN.BigInteger(n), new JSBN.BigInteger(e));
      var rsaPrivateKey = RSA.setPrivateKey(
        new JSBN.BigInteger(n), null, new JSBN.BigInteger(d));

      var result = kem.encrypt(rsaPublicKey, 128);
      ASSERT.equal(UTIL.bytesToHex(result.encapsulation), C0);
      ASSERT.equal(UTIL.bytesToHex(result.key), K);

      var decryptedKey = kem.decrypt(rsaPrivateKey, result.encapsulation, 128);
      ASSERT.equal(UTIL.bytesToHex(decryptedKey), K);
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/kem',
    'forge/md',
    'forge/rsa',
    'forge/util',
    'forge/jsbn',
    'forge/random'
  ], function(KEM, MD, RSA, UTIL, JSBN, RANDOM) {
    Tests(
      // Global provided by test harness
      ASSERT,
      KEM(),
      MD(),
      RSA(),
      UTIL(),
      JSBN(),
      RANDOM()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/kem')(),
    require('../../js/md')(),
    require('../../js/rsa')(),
    require('../../js/util')(),
    require('../../js/jsbn')(),
    require('../../js/random')());
}

})();
