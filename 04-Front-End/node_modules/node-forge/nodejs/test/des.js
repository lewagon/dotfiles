(function() {

function Tests(ASSERT, CIPHER, DES, UTIL) {
  describe('des', function() {
    // OpenSSL equivalent:
    // openssl enc -des-ecb -K a1c06b381adf3651 -nosalt
    it('should des-ecb encrypt: foobar', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf3651'));

      var cipher = CIPHER.createCipher('DES-ECB', key);
      cipher.start();
      cipher.update(UTIL.createBuffer('foobar'));
      cipher.finish();
      ASSERT.equal(cipher.output.toHex(), 'b705ffcf3dff06b3');
    });

    // OpenSSL equivalent:
    // openssl enc -d -des-ecb -K a1c06b381adf3651 -nosalt
    it('should des-ecb decrypt: b705ffcf3dff06b3', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf3651'));

      var decipher = CIPHER.createDecipher('DES-ECB', key);
      decipher.start();
      decipher.update(UTIL.createBuffer(UTIL.hexToBytes('b705ffcf3dff06b3')));
      decipher.finish();
      ASSERT.equal(decipher.output.getBytes(), 'foobar');
    });

    // OpenSSL equivalent:
    // openssl enc -des -K a1c06b381adf3651 -iv 818bcf76efc59662 -nosalt
    it('should des-cbc encrypt: foobar', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf3651'));
      var iv = new UTIL.createBuffer(
        UTIL.hexToBytes('818bcf76efc59662'));

      var cipher = CIPHER.createCipher('DES-CBC', key);
      cipher.start({iv: iv});
      cipher.update(UTIL.createBuffer('foobar'));
      cipher.finish();
      ASSERT.equal(cipher.output.toHex(), '3261e5839a990454');
    });

    // OpenSSL equivalent:
    // openssl enc -d -des -K a1c06b381adf3651 -iv 818bcf76efc59662 -nosalt
    it('should des-cbc decrypt: 3261e5839a990454', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf3651'));
      var iv = new UTIL.createBuffer(
        UTIL.hexToBytes('818bcf76efc59662'));

      var decipher = CIPHER.createDecipher('DES-CBC', key);
      decipher.start({iv: iv});
      decipher.update(UTIL.createBuffer(UTIL.hexToBytes('3261e5839a990454')));
      decipher.finish();
      ASSERT.equal(decipher.output.getBytes(), 'foobar');
    });

    // OpenSSL equivalent:
    // openssl enc -des-ede3 -K a1c06b381adf36517e84575552777779da5e3d9f994b05b5 -nosalt
    it('should 3des-ecb encrypt: foobar', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf36517e84575552777779da5e3d9f994b05b5'));

      var cipher = CIPHER.createCipher('3DES-ECB', key);
      cipher.start();
      cipher.update(UTIL.createBuffer('foobar'));
      cipher.finish();
      ASSERT.equal(cipher.output.toHex(), 'fce8b1ee8c6440d1');
    });

    // OpenSSL equivalent:
    // openssl enc -d -des-ede3 -K a1c06b381adf36517e84575552777779da5e3d9f994b05b5 -nosalt
    it('should 3des-ecb decrypt: fce8b1ee8c6440d1', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf36517e84575552777779da5e3d9f994b05b5'));

      var decipher = CIPHER.createDecipher('3DES-ECB', key);
      decipher.start();
      decipher.update(UTIL.createBuffer(UTIL.hexToBytes('fce8b1ee8c6440d1')));
      decipher.finish();
      ASSERT.equal(decipher.output.getBytes(), 'foobar');
    });

    // OpenSSL equivalent:
    // openssl enc -des3 -K a1c06b381adf36517e84575552777779da5e3d9f994b05b5 -iv 818bcf76efc59662 -nosalt
    it('should 3des-cbc encrypt "foobar", restart, and encrypt "foobar,,"', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf36517e84575552777779da5e3d9f994b05b5'));
      var iv = new UTIL.createBuffer(
        UTIL.hexToBytes('818bcf76efc59662'));

      var cipher = CIPHER.createCipher('3DES-CBC', key);
      cipher.start({iv: iv.copy()});
      cipher.update(UTIL.createBuffer('foobar'));
      cipher.finish();
      ASSERT.equal(cipher.output.toHex(), '209225f7687ca0b2');

      cipher.start({iv: iv.copy()});
      cipher.update(UTIL.createBuffer('foobar,,'));
      cipher.finish();
      ASSERT.equal(cipher.output.toHex(), '57156174c48dfc37293831bf192a6742');
    });

    // OpenSSL equivalent:
    // openssl enc -d -des3 -K a1c06b381adf36517e84575552777779da5e3d9f994b05b5 -iv 818bcf76efc59662 -nosalt
    it('should 3des-cbc decrypt "209225f7687ca0b2", restart, and decrypt "57156174c48dfc37293831bf192a6742,,"', function() {
      var key = new UTIL.createBuffer(
        UTIL.hexToBytes('a1c06b381adf36517e84575552777779da5e3d9f994b05b5'));
      var iv = new UTIL.createBuffer(
        UTIL.hexToBytes('818bcf76efc59662'));

      var decipher = CIPHER.createDecipher('3DES-CBC', key);
      decipher.start({iv: iv.copy()});
      decipher.update(UTIL.createBuffer(UTIL.hexToBytes('209225f7687ca0b2')));
      decipher.finish();
      ASSERT.equal(decipher.output.getBytes(), 'foobar');

      decipher.start({iv: iv.copy()});
      decipher.update(
        UTIL.createBuffer(UTIL.hexToBytes('57156174c48dfc37293831bf192a6742')));
      decipher.finish();
      ASSERT.equal(decipher.output.getBytes(), 'foobar,,');
    });
  });
}

// check for AMD
var forge = {};
if(typeof define === 'function') {
  define([
    'forge/cipher',
    'forge/des',
    'forge/util'
  ], function(CIPHER, DES, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      CIPHER(forge),
      DES(forge),
      UTIL(forge)
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/cipher')(forge),
    require('../../js/des')(forge),
    require('../../js/util')(forge));
}

})();
