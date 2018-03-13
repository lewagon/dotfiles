(function() {

function Tests(ASSERT, PBKDF2, MD, UTIL) {
  describe('pbkdf2', function() {
    it('should derive a password with hmac-sha-1 c=1', function() {
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 1, 20));
      ASSERT.equal(dkHex, '0c60c80f961f0e71f3a9b524af6012062fe037a6');
    });

    it('should derive a password with hmac-sha-1 c=2', function() {
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 2, 20));
      ASSERT.equal(dkHex, 'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957');
    });

    it('should derive a password with hmac-sha-1 c=5 keylen=8', function() {
      var salt = UTIL.hexToBytes('1234567878563412');
      var dkHex = UTIL.bytesToHex(PBKDF2('password', salt, 5, 8));
      ASSERT.equal(dkHex, 'd1daa78615f287e6');
    });

    it('should derive a password with hmac-sha-1 c=4096', function() {
      // Note: might be too slow on old browsers
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 4096, 20));
      ASSERT.equal(dkHex, '4b007901b765489abead49d926f721d065a429c1');
    });

    /*
    it('should derive a password with hmac-sha-1 c=16777216', function() {
      // Note: too slow
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 16777216, 20));
      ASSERT.equal(dkHex, 'eefe3d61cd4da4e4e9945b3d6ba2158c2634e984');
    });*/

    it('should derive a password with hmac-sha-256 c=1000', function() {
      // Note: might be too slow on old browsers
      var salt = '4bcda0d1c689fe465c5b8a817f0ddf3d';
      var md = MD.sha256.create();
      var dkHex = UTIL.bytesToHex(PBKDF2('password', salt, 1000, 48, md));
      ASSERT.equal(dkHex, '9da8a5f4ae605f35e82e5beac5f362df15c4255d88f738d641466a4107f9970238e768e72af29ac89a1b16ff277b31d2');
    });

    it('should derive a password with hmac-sha-256 (passed as an algorithm identifier) c=1000', function() {
      // Note: might be too slow on old browsers
      var salt = '4bcda0d1c689fe465c5b8a817f0ddf3d';
      var dkHex = UTIL.bytesToHex(PBKDF2('password', salt, 1000, 48, 'sha256'));
      ASSERT.equal(dkHex, '9da8a5f4ae605f35e82e5beac5f362df15c4255d88f738d641466a4107f9970238e768e72af29ac89a1b16ff277b31d2');
    });

    it('should asynchronously derive a password with hmac-sha-1 c=1', function(done) {
      PBKDF2('password', 'salt', 1, 20, function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, '0c60c80f961f0e71f3a9b524af6012062fe037a6');
        done();
      });
    });

    it('should asynchronously derive a password with hmac-sha-1 c=2', function(done) {
      PBKDF2('password', 'salt', 2, 20, function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, 'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957');
        done();
      });
    });

    it('should asynchronously derive a password with hmac-sha-1 c=5 keylen=8', function(done) {
      var salt = UTIL.hexToBytes('1234567878563412');
      PBKDF2('password', salt, 5, 8, function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, 'd1daa78615f287e6');
        done();
      });
    });

    it('should asynchronously derive a password with hmac-sha-1 c=4096', function(done) {
      // Note: might be too slow on old browsers
      PBKDF2('password', 'salt', 4096, 20, function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, '4b007901b765489abead49d926f721d065a429c1');
        done();
      });
    });

    /*
    it('should asynchronously derive a password with hmac-sha-1 c=16777216', function(done) {
      // Note: too slow
      PBKDF2('password', 'salt', 16777216, 20, function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, 'eefe3d61cd4da4e4e9945b3d6ba2158c2634e984');
        done();
      });
    });*/

    it('should asynchronously derive a password with hmac-sha-256 c=1000', function(done) {
      // Note: might be too slow on old browsers
      var salt = '4bcda0d1c689fe465c5b8a817f0ddf3d';
      var md = MD.sha256.create();
      PBKDF2('password', salt, 1000, 48, md, function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, '9da8a5f4ae605f35e82e5beac5f362df15c4255d88f738d641466a4107f9970238e768e72af29ac89a1b16ff277b31d2');
        done();
      });
    });

    it('should asynchronously derive a password with hmac-sha-256 (passed as an algorithm identifier) c=1000', function(done) {
      // Note: might be too slow on old browsers
      var salt = '4bcda0d1c689fe465c5b8a817f0ddf3d';
      PBKDF2('password', salt, 1000, 48, 'sha256', function(err, dk) {
        var dkHex = UTIL.bytesToHex(dk);
        ASSERT.equal(dkHex, '9da8a5f4ae605f35e82e5beac5f362df15c4255d88f738d641466a4107f9970238e768e72af29ac89a1b16ff277b31d2');
        done();
      });
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/pbkdf2',
    'forge/md',
    'forge/util'
  ], function(PBKDF2, MD, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      PBKDF2(),
      MD(),
      UTIL()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/pbkdf2')(),
    require('../../js/md')(),
    require('../../js/util')());
}

})();
