(function() {

function Tests(ASSERT, HMAC, UTIL) {
  describe('hmac', function() {
    it('should md5 hash "Hi There", 16-byte key', function() {
      var key = UTIL.hexToBytes('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b');
      var hmac = HMAC.create();
      hmac.start('MD5', key);
      hmac.update('Hi There');
      ASSERT.equal(hmac.digest().toHex(), '9294727a3638bb1c13f48ef8158bfc9d');
    });

    it('should md5 hash "what do ya want for nothing?", "Jefe" key', function() {
      var hmac = HMAC.create();
      hmac.start('MD5', 'Jefe');
      hmac.update('what do ya want for nothing?');
      ASSERT.equal(hmac.digest().toHex(), '750c783e6ab0b503eaa86e310a5db738');
    });

    it('should md5 hash "Test Using Larger Than Block-Size Key - Hash Key First", 80-byte key', function() {
      var key = UTIL.hexToBytes(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      var hmac = HMAC.create();
      hmac.start('MD5', key);
      hmac.update('Test Using Larger Than Block-Size Key - Hash Key First');
      ASSERT.equal(hmac.digest().toHex(), '6b1ab7fe4bd7bf8f0b62e6ce61b9d0cd');
    });

    it('should sha1 hash "Hi There", 20-byte key', function() {
      var key = UTIL.hexToBytes('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b');
      var hmac = HMAC.create();
      hmac.start('SHA1', key);
      hmac.update('Hi There');
      ASSERT.equal(
        hmac.digest().toHex(), 'b617318655057264e28bc0b6fb378c8ef146be00');
    });

    it('should sha1 hash "what do ya want for nothing?", "Jefe" key', function() {
      var hmac = HMAC.create();
      hmac.start('SHA1', 'Jefe');
      hmac.update('what do ya want for nothing?');
      ASSERT.equal(
        hmac.digest().toHex(), 'effcdf6ae5eb2fa2d27416d5f184df9c259a7c79');
    });

    it('should sha1 hash "Test Using Larger Than Block-Size Key - Hash Key First", 80-byte key', function() {
      var key = UTIL.hexToBytes(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      var hmac = HMAC.create();
      hmac.start('SHA1', key);
      hmac.update('Test Using Larger Than Block-Size Key - Hash Key First');
      ASSERT.equal(
        hmac.digest().toHex(), 'aa4ae5e15272d00e95705637ce8a3b55ed402112');
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/hmac',
    'forge/util'
  ], function(HMAC, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      HMAC(),
      UTIL()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/hmac')(),
    require('../../js/util')());
}

})();
