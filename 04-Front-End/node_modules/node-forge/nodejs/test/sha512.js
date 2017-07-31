(function() {

function Tests(ASSERT, SHA512, UTIL) {
  describe('sha512', function() {
    it('should digest the empty string', function() {
      var md = SHA512.create();
      ASSERT.equal(
        md.digest().toHex(),
        'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
    });

    it('should digest "abc"', function() {
      var md = SHA512.create();
      md.update('abc');
      ASSERT.equal(
        md.digest().toHex(),
        'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f');
    });

    it('should digest "abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu"', function() {
      var md = SHA512.create();
      md.update('abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu');
      ASSERT.equal(
        md.digest().toHex(),
        '8e959b75dae313da8cf4f72814fc143f8f7779c6eb9f7fa17299aeadb6889018501d289e4900f7e4331b99dec4b5433ac7d329eeb6dd26545e96e55b874be909');
    });

    it('should digest "The quick brown fox jumps over the lazy dog"', function() {
      var md = SHA512.create();
      md.update('The quick brown fox jumps over the lazy dog');
      ASSERT.equal(
        md.digest().toHex(),
        '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6');
    });

    it('should digest "c\'\u00e8"', function() {
      var md = SHA512.create();
      md.update("c\'\u00e8", 'utf8');
      ASSERT.equal(
        md.digest().toHex(),
        '9afdc0390dd91e81c63f858d1c6fcd9f949f3fc89dbdaed9e4211505bad63d8e8787797e2e9ea651285eb6954e51c4f0299837c3108cb40f1420bca1d237355c');
    });

    it('should digest "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"', function() {
      var md = SHA512.create();
      md.start();
      md.update('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq');
      // do twice to check continuing digest
      ASSERT.equal(
        md.digest().toHex(),
        '204a8fc6dda82f0a0ced7beb8e08a41657c16ef468b228a8279be331a703c33596fd15c13b1b07f9aa1d3bea57789ca031ad85c7a71dd70354ec631238ca3445');
      ASSERT.equal(
        md.digest().toHex(),
        '204a8fc6dda82f0a0ced7beb8e08a41657c16ef468b228a8279be331a703c33596fd15c13b1b07f9aa1d3bea57789ca031ad85c7a71dd70354ec631238ca3445');
    });
  });

  SHA384 = SHA512.sha384;

  describe('sha384', function() {
    it('should digest the empty string', function() {
      var md = SHA384.create();
      ASSERT.equal(
        md.digest().toHex(),
        '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b');
    });

    it('should digest "abc"', function() {
      var md = SHA384.create();
      md.update('abc');
      ASSERT.equal(
        md.digest().toHex(),
        'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7');
    });

    it('should digest "abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu"', function() {
      var md = SHA384.create();
      md.update('abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu');
      ASSERT.equal(
        md.digest().toHex(),
        '09330c33f71147e83d192fc782cd1b4753111b173b3b05d22fa08086e3b0f712fcc7c71a557e2db966c3e9fa91746039');
    });

    it('should digest "The quick brown fox jumps over the lazy dog"', function() {
      var md = SHA384.create();
      md.update('The quick brown fox jumps over the lazy dog');
      ASSERT.equal(
        md.digest().toHex(),
        'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1');
    });

    it('should digest "c\'\u00e8"', function() {
      var md = SHA384.create();
      md.update("c\'\u00e8", 'utf8');
      ASSERT.equal(
        md.digest().toHex(),
        '382ec8a92d50abf57f7d0f934ff3969d6d354d30c96f1616678a920677867aba49521d2d535c0f285a3c2961c2034ea3');
    });

    it('should digest "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"', function() {
      var md = SHA384.create();
      md.start();
      md.update('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq');
      // do twice to check continuing digest
      ASSERT.equal(
        md.digest().toHex(),
        '3391fdddfc8dc7393707a65b1b4709397cf8b1d162af05abfe8f450de5f36bc6b0455a8520bc4e6f5fe95b1fe3c8452b');
      ASSERT.equal(
        md.digest().toHex(),
        '3391fdddfc8dc7393707a65b1b4709397cf8b1d162af05abfe8f450de5f36bc6b0455a8520bc4e6f5fe95b1fe3c8452b');
    });
  });

  SHA256 = SHA512.sha256;

  describe('sha512/256', function() {
    it('should digest the empty string', function() {
      var md = SHA256.create();
      ASSERT.equal(
        md.digest().toHex(),
        'c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a');
    });

    it('should digest "The quick brown fox jumps over the lazy dog"', function() {
      var md = SHA256.create();
      md.update('The quick brown fox jumps over the lazy dog');
      ASSERT.equal(
        md.digest().toHex(),
        'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d');
    });
  });

  SHA224 = SHA512.sha224;

  describe('sha512/224', function() {
    it('should digest the empty string', function() {
      var md = SHA224.create();
      ASSERT.equal(
        md.digest().toHex(),
        '6ed0dd02806fa89e25de060c19d3ac86cabb87d6a0ddd05c333b84f4');
    });

    it('should digest "The quick brown fox jumps over the lazy dog"', function() {
      var md = SHA224.create();
      md.update('The quick brown fox jumps over the lazy dog');
      ASSERT.equal(
        md.digest().toHex(),
        '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37');
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/sha512',
    'forge/util'
  ], function(SHA512, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      SHA512(),
      UTIL()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/sha512')(),
    require('../../js/util')());
}

})();
