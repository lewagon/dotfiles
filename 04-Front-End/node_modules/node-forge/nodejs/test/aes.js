(function() {

function Tests(ASSERT, CIPHER, AES, UTIL) {
  describe('aes', function() {
    it('should encrypt a single block with a 128-bit key', function() {
      var key = [0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f];
      var block = [0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff];

      var output = [];
      var w = AES._expandKey(key, false);
      AES._updateBlock(w, block, output, false);

      var out = UTIL.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);

      ASSERT.equal(out.toHex(), '69c4e0d86a7b0430d8cdb78070b4c55a');
    });

    it('should decrypt a single block with a 128-bit key', function() {
      var key = [0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f];
      var block = [0x69c4e0d8, 0x6a7b0430, 0xd8cdb780, 0x70b4c55a];

      var output = [];
      var w = AES._expandKey(key, true);
      AES._updateBlock(w, block, output, true);

      var out = UTIL.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);

      ASSERT.equal(out.toHex(), '00112233445566778899aabbccddeeff');
    });

    it('should encrypt a single block with a 192-bit key', function() {
        var key = [
          0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
          0x10111213, 0x14151617];
        var block = [0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff];

        var output = [];
        var w = AES._expandKey(key, false);
        AES._updateBlock(w, block, output, false);

        var out = UTIL.createBuffer();
        out.putInt32(output[0]);
        out.putInt32(output[1]);
        out.putInt32(output[2]);
        out.putInt32(output[3]);

        ASSERT.equal(out.toHex(), 'dda97ca4864cdfe06eaf70a0ec0d7191');
    });

    it('should decrypt a single block with a 192-bit key', function() {
        var key = [
          0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
          0x10111213, 0x14151617];
        var block = [0xdda97ca4, 0x864cdfe0, 0x6eaf70a0, 0xec0d7191];

        var output = [];
        var w = AES._expandKey(key, true);
        AES._updateBlock(w, block, output, true);

        var out = UTIL.createBuffer();
        out.putInt32(output[0]);
        out.putInt32(output[1]);
        out.putInt32(output[2]);
        out.putInt32(output[3]);

        ASSERT.equal(out.toHex(), '00112233445566778899aabbccddeeff');
    });

    it('should encrypt a single block with a 256-bit key', function() {
        var key = [
          0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
          0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f];
        var block = [0x00112233, 0x44556677, 0x8899aabb, 0xccddeeff];

        var output = [];
        var w = AES._expandKey(key, false);
        AES._updateBlock(w, block, output, false);

        var out = UTIL.createBuffer();
        out.putInt32(output[0]);
        out.putInt32(output[1]);
        out.putInt32(output[2]);
        out.putInt32(output[3]);

        ASSERT.equal(out.toHex(), '8ea2b7ca516745bfeafc49904b496089');
    });

    it('should decrypt a single block with a 256-bit key', function() {
        var key = [
          0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
          0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f];
        var block = [0x8ea2b7ca, 0x516745bf, 0xeafc4990, 0x4b496089];

        var output = [];
        var w = AES._expandKey(key, true);
        AES._updateBlock(w, block, output, true);

        var out = UTIL.createBuffer();
        out.putInt32(output[0]);
        out.putInt32(output[1]);
        out.putInt32(output[2]);
        out.putInt32(output[3]);

        ASSERT.equal(out.toHex(), '00112233445566778899aabbccddeeff');
    });

    // AES-128-ECB
    (function() {
      var keys = [
        '2b7e151628aed2a6abf7158809cf4f3c',
        '2b7e151628aed2a6abf7158809cf4f3c',
        '2b7e151628aed2a6abf7158809cf4f3c',
        '2b7e151628aed2a6abf7158809cf4f3c'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        '3ad77bb40d7a3660a89ecaf32466ef97',
        'f5d3d58503b9699de785895a96fdbaaf',
        '43b1cd7f598ece23881b00e3ed030688',
        '7b0c785e27e8ad3f8223207104725dd4'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-ecb encrypt: ' + inputs[i], function() {
            // encrypt w/no padding
            var cipher = CIPHER.createCipher('AES-ECB', key);
            cipher.mode.pad = false;
            cipher.start();
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-128-ecb decrypt: ' + outputs[i], function() {
            // decrypt w/no padding
            var cipher = CIPHER.createDecipher('AES-ECB', key);
            cipher.mode.unpad = false;
            cipher.start();
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), inputs[i]);
          });
        })(i);
      }
    })();

    // AES-192-ECB
    (function() {
      var keys = [
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        'bd334f1d6e45f25ff712a214571fa5cc',
        '974104846d0ad3ad7734ecb3ecee4eef',
        'ef7afd2270e2e60adce0ba2face6444e',
        '9a4b41ba738d6c72fb16691603c18e0e'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-192-ecb encrypt: ' + inputs[i], function() {
            // encrypt w/no padding
            var cipher = CIPHER.createCipher('AES-ECB', key);
            cipher.mode.pad = false;
            cipher.start();
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-192-ecb decrypt: ' + outputs[i], function() {
            // decrypt w/no padding
            var cipher = CIPHER.createDecipher('AES-ECB', key);
            cipher.mode.unpad = false;
            cipher.start();
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), inputs[i]);
          });
        })(i);
      }
    })();

    // AES-256-ECB
    (function() {
      var keys = [
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        'f3eed1bdb5d2a03c064b5a7e3db181f8',
        '591ccb10d410ed26dc5ba74a31362870',
        'b6ed21b99ca6f4f9f153e7b1beafed1d',
        '23304b7a39f9f3ff067d8d8f9e24ecc7'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-256-ecb encrypt: ' + inputs[i], function() {
            // encrypt w/no padding
            var cipher = CIPHER.createCipher('AES-ECB', key);
            cipher.mode.pad = false;
            cipher.start();
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-256-ecb decrypt: ' + outputs[i], function() {
            // decrypt w/no padding
            var cipher = CIPHER.createDecipher('AES-ECB', key);
            cipher.mode.unpad = false;
            cipher.start();
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), inputs[i]);
          });
        })(i);
      }
    })();

    // AES-128-CBC
    (function() {
      var keys = [
        '06a9214036b8a15b512e03d534120006',
        'c286696d887c9aa0611bbb3e2025a45a',
        '6c3ea0477630ce21a2ce334aa746c2cd',
        '56e47a38c5598974bc46903dba290349'
      ];

      var ivs = [
        '3dafba429d9eb430b422da802c9fac41',
        '562e17996d093d28ddb3ba695a2e6f58',
        'c782dc4c098c66cbd9cd27d825682c81',
        '8ce82eefbea0da3c44699ed7db51b7d9'
      ];

      var inputs = [
        'Single block msg',
        '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
        'This is a 48-byte message (exactly 3 AES blocks)',
        'a0a1a2a3a4a5a6a7a8a9aaabacadaeaf' +
          'b0b1b2b3b4b5b6b7b8b9babbbcbdbebf' +
          'c0c1c2c3c4c5c6c7c8c9cacbcccdcecf' +
          'd0d1d2d3d4d5d6d7d8d9dadbdcdddedf'
      ];

      var outputs = [
        'e353779c1079aeb82708942dbe77181a',
        'd296cd94c2cccf8a3a863028b5e1dc0a7586602d253cfff91b8266bea6d61ab1',
        'd0a02b3836451753d493665d33f0e886' +
          '2dea54cdb293abc7506939276772f8d5' +
          '021c19216bad525c8579695d83ba2684',
        'c30e32ffedc0774e6aff6af0869f71aa' +
          '0f3af07a9a31a9c684db207eb0ef8e4e' +
          '35907aa632c3ffdf868bb7b29d3d46ad' +
          '83ce9f9a102ee99d49a53e87f4c3da55'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = (i & 1) ? UTIL.hexToBytes(inputs[i]) : inputs[i];
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-cbc encrypt: ' + inputs[i], function() {
            // encrypt w/no padding
            var cipher = CIPHER.createCipher('AES-CBC', key);
            cipher.mode.pad = false;
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-128-cbc decrypt: ' + outputs[i], function() {
            // decrypt w/no padding
            var cipher = CIPHER.createDecipher('AES-CBC', key);
            cipher.mode.unpad = false;
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = (i & 1) ? cipher.output.toHex() : cipher.output.bytes();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-192-CBC
    (function() {
      var keys = [
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b'
      ];

      var ivs = [
        '000102030405060708090A0B0C0D0E0F',
        '4F021DB243BC633D7178183A9FA071E8',
        'B4D9ADA9AD7DEDF4E5E738763F69145A',
        '571B242012FB7AE07FA9BAAC3DF102E0'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        '4f021db243bc633d7178183a9fa071e8',
        'b4d9ada9ad7dedf4e5e738763f69145a',
        '571b242012fb7ae07fa9baac3df102e0',
        '08b0e27988598881d920a9e64f5615cd'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-192-cbc encrypt: ' + inputs[i], function() {
            // encrypt w/no padding
            var cipher = CIPHER.createCipher('AES-CBC', key);
            cipher.mode.pad = false;
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-192-cbc decrypt: ' + outputs[i], function() {
            // decrypt w/no padding
            var cipher = CIPHER.createDecipher('AES-CBC', key);
            cipher.mode.unpad = false;
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-256-CBC
    (function() {
      var keys = [
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4'
      ];

      var ivs = [
        '000102030405060708090A0B0C0D0E0F',
        'F58C4C04D6E5F1BA779EABFB5F7BFBD6',
        '9CFC4E967EDB808D679F777BC6702C7D',
        '39F23369A9D9BACFA530E26304231461'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        'f58c4c04d6e5f1ba779eabfb5f7bfbd6',
        '9cfc4e967edb808d679f777bc6702c7d',
        '39f23369a9d9bacfa530e26304231461',
        'b2eb05e2c39be9fcda6c19078c6a9d1b'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-256-cbc encrypt: ' + inputs[i], function() {
            // encrypt w/no padding
            var cipher = CIPHER.createCipher('AES-CBC', key);
            cipher.mode.pad = false;
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-256-cbc decrypt: ' + outputs[i], function() {
            // decrypt w/no padding
            var cipher = CIPHER.createDecipher('AES-CBC', key);
            cipher.mode.unpad = false;
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-128-CFB
    (function() {
      var keys = [
        '00000000000000000000000000000000',
        '2b7e151628aed2a6abf7158809cf4f3c',
        '2b7e151628aed2a6abf7158809cf4f3c',
        '2b7e151628aed2a6abf7158809cf4f3c',
        '2b7e151628aed2a6abf7158809cf4f3c',
        '00000000000000000000000000000000'
      ];

      var ivs = [
        '80000000000000000000000000000000',
        '000102030405060708090a0b0c0d0e0f',
        '3B3FD92EB72DAD20333449F8E83CFB4A',
        'C8A64537A0B3A93FCDE3CDAD9F1CE58B',
        '26751F67A3CBB140B1808CF187A4F4DF',
        '60f9ff04fac1a25657bf5b36b5efaf75'
      ];

      var inputs = [
        '00000000000000000000000000000000',
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710',
        'This is a 48-byte message (exactly 3 AES blocks)'
      ];

      var outputs = [
        '3ad78e726c1ec02b7ebfe92b23d9ec34',
        '3b3fd92eb72dad20333449f8e83cfb4a',
        'c8a64537a0b3a93fcde3cdad9f1ce58b',
        '26751f67a3cbb140b1808cf187a4f4df',
        'c04b05357c5d1c0eeac4c66f9ff7f2e6',
        '52396a2ba1ba420c5e5b699a814944d8' +
          'f4e7fbf984a038319fbc0b4ee45cfa6f' +
          '07b2564beab5b5e92dbd44cb345f49b4'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = (i !== 5) ? UTIL.hexToBytes(inputs[i]) : inputs[i];
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-cfb encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-128-cfb decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = (i !== 5) ?
              cipher.output.toHex() : cipher.output.getBytes();
            ASSERT.equal(out, inputs[i]);
          });

          it('should aes-128-cfb encrypt (one byte at a time): ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CFB', key);
            cipher.start({iv: iv});
            var input_ = UTIL.createBuffer(input);
            var out = UTIL.createBuffer();
            while(input_.length() > 0) {
              cipher.update(UTIL.createBuffer(input_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            ASSERT.equal(out.toHex(), outputs[i]);
          });

          it('should aes-128-cfb decrypt (one byte at a time): ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CFB', key);
            cipher.start({iv: iv});
            var output_ = UTIL.createBuffer(output);
            var out = UTIL.createBuffer();
            while(output_.length() > 0) {
              cipher.update(UTIL.createBuffer(output_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            out = (i !== 5) ? out.toHex() : out.getBytes();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-192-CFB
    (function() {
      var keys = [
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b'
      ];

      var ivs = [
        '000102030405060708090A0B0C0D0E0F',
        'CDC80D6FDDF18CAB34C25909C99A4174',
        '67CE7F7F81173621961A2B70171D3D7A',
        '2E1E8A1DD59B88B1C8E60FED1EFAC4C9'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        'cdc80d6fddf18cab34c25909c99a4174',
        '67ce7f7f81173621961a2b70171d3d7a',
        '2e1e8a1dd59b88b1c8e60fed1efac4c9',
        'c05f9f9ca9834fa042ae8fba584b09ff'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-192-cfb encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-192-cfb decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-256-CFB
    (function() {
      var keys = [
        '861009ec4d599fab1f40abc76e6f89880cff5833c79c548c99f9045f191cd90b'
      ];

      var ivs = [
        'd927ad81199aa7dcadfdb4e47b6dc694'
      ];

      var inputs = [
        'MY-DATA-AND-HERE-IS-MORE-DATA'
      ];

      var outputs = [
        '80eb666a9fc9e263faf71e87ffc94451d7d8df7cfcf2606470351dd5ac'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = inputs[i];
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-256-cfb encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-256-cfb decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.getBytes();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-128-OFB
    (function() {
      var keys = [
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000'
      ];

      var ivs = [
        '80000000000000000000000000000000',
        'c8ca0d6a35dbeac776e911ee16bea7d3',
        '80000000000000000000000000000000'
      ];

      var inputs = [
        '00000000000000000000000000000000',
        'This is a 48-byte message (exactly 3 AES blocks)',
        '0000'
      ];

      var outputs = [
        '3ad78e726c1ec02b7ebfe92b23d9ec34',
        '39c0190727a76b2a90963426f63689cf' +
          'cdb8a2be8e20c5e877a81a724e3611f6' +
          '2ecc386f2e941b2441c838906002be19',
        '3ad7'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = (i !== 1) ? UTIL.hexToBytes(inputs[i]) : inputs[i];
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-ofb encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-OFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-128-ofb decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-OFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = (i !== 1) ?
              cipher.output.toHex() : cipher.output.getBytes();
            ASSERT.equal(out, inputs[i]);
          });

          it('should aes-128-ofb encrypt (one byte at a time): ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-OFB', key);
            cipher.start({iv: iv});
            var input_ = UTIL.createBuffer(input);
            var out = UTIL.createBuffer();
            while(input_.length() > 0) {
              cipher.update(UTIL.createBuffer(input_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            ASSERT.equal(out.toHex(), outputs[i]);
          });

          it('should aes-128-ofb decrypt (one byte at a time): ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-OFB', key);
            cipher.start({iv: iv});
            var output_ = UTIL.createBuffer(output);
            var out = UTIL.createBuffer();
            while(output_.length() > 0) {
              cipher.update(UTIL.createBuffer(output_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            out = (i !== 1) ? out.toHex() : out.getBytes();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-192-OFB
    (function() {
      var keys = [
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b',
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b'
      ];

      var ivs = [
        '000102030405060708090A0B0C0D0E0F',
        'A609B38DF3B1133DDDFF2718BA09565E',
        '52EF01DA52602FE0975F78AC84BF8A50',
        'BD5286AC63AABD7EB067AC54B553F71D'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        'cdc80d6fddf18cab34c25909c99a4174',
        'fcc28b8d4c63837c09e81700c1100401',
        '8d9a9aeac0f6596f559c6d4daf59a5f2',
        '6d9f200857ca6c3e9cac524bd9acc92a'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-192-ofb encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-OFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-192-ofb decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-OFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-256-OFB
    (function() {
      var keys = [
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4',
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4'
      ];

      var ivs = [
        '000102030405060708090A0B0C0D0E0F',
        'B7BF3A5DF43989DD97F0FA97EBCE2F4A',
        'E1C656305ED1A7A6563805746FE03EDC',
        '41635BE625B48AFC1666DD42A09D96E7'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'ae2d8a571e03ac9c9eb76fac45af8e51',
        '30c81c46a35ce411e5fbc1191a0a52ef',
        'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        'dc7e84bfda79164b7ecd8486985d3860',
        '4febdc6740d20b3ac88f6ad82a4fb08d',
        '71ab47a086e86eedf39d1c5bba97c408',
        '0126141d67f37be8538f5a8be740e484'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-256-ofb encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-OFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-256-ofb decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-OFB', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-128-CTR
    (function() {
      var keys = [
        '2b7e151628aed2a6abf7158809cf4f3c',
        '00000000000000000000000000000000',
        '2b7e151628aed2a6abf7158809cf4f3c'
      ];

      var ivs = [
        'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff',
        '650cdb80ff9fc758342d2bd99ee2abcf',
        'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a',
        'This is a 48-byte message (exactly 3 AES blocks)',
        '6bc1be'
      ];

      var outputs = [
        '874d6191b620e3261bef6864990db6ce',
        '5ede11d00e9a76ec1d5e7e811ea3dd1c' +
          'e09ee941210f825d35718d3282796f1c' +
          '07c3f1cb424f2b365766ab5229f5b5a4',
        '874d61'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = (i !== 1) ? UTIL.hexToBytes(inputs[i]) : inputs[i];
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-ctr encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CTR', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-128-ctr decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CTR', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = (i !== 1) ?
              cipher.output.toHex() : cipher.output.getBytes();
            ASSERT.equal(out, inputs[i]);
          });

          it('should aes-128-ctr encrypt (one byte at a time): ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CTR', key);
            cipher.start({iv: iv});
            var input_ = UTIL.createBuffer(input);
            var out = UTIL.createBuffer();
            while(input_.length() > 0) {
              cipher.update(UTIL.createBuffer(input_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            ASSERT.equal(out.toHex(), outputs[i]);
          });

          it('should aes-128-ctr decrypt (one byte at a time): ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CTR', key);
            cipher.start({iv: iv});
            var output_ = UTIL.createBuffer(output);
            var out = UTIL.createBuffer();
            while(output_.length() > 0) {
              cipher.update(UTIL.createBuffer(output_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            out = (i !== 1) ? out.toHex() : out.getBytes();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-192-CTR
    (function() {
      var keys = [
        '8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b'
      ];

      var ivs = [
        'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a' +
          'ae2d8a571e03ac9c9eb76fac45af8e51' +
          '30c81c46a35ce411e5fbc1191a0a52ef' +
          'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        '1abc932417521ca24f2b0459fe7e6e0b' +
          '090339ec0aa6faefd5ccc2c6f4ce8e94' +
          '1e36b26bd1ebc670d1bd1d665620abf7' +
          '4f78a7f6d29809585a97daec58c6b050'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-192-ctr encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CTR', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-192-ctr decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CTR', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-256-CTR
    (function() {
      var keys = [
        '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4'
      ];

      var ivs = [
        'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff'
      ];

      var inputs = [
        '6bc1bee22e409f96e93d7e117393172a' +
          'ae2d8a571e03ac9c9eb76fac45af8e51' +
          '30c81c46a35ce411e5fbc1191a0a52ef' +
          'f69f2445df4f9b17ad2b417be66c3710'
      ];

      var outputs = [
        '601ec313775789a5b7a7f504bbf3d228' +
          'f443e3ca4d62b59aca84e990cacaf5c5' +
          '2b0930daa23de94ce87017ba2d84988d' +
          'dfc9c58db67aada613c2dd08457941a6'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-256-ctr encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-CTR', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
          });

          it('should aes-256-ctr decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-CTR', key);
            cipher.start({iv: iv});
            cipher.update(UTIL.createBuffer(output));
            cipher.finish();
            var out = cipher.output.toHex();
            ASSERT.equal(out, inputs[i]);
          });
        })(i);
      }
    })();

    // AES-128-GCM
    (function() {
      var keys = [
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        'feffe9928665731c6d6a8f9467308308',
        'feffe9928665731c6d6a8f9467308308',
        'feffe9928665731c6d6a8f9467308308',
        'feffe9928665731c6d6a8f9467308308',
        '00000000000000000000000000000000'
      ];

      var ivs = [
        '000000000000000000000000',
        '000000000000000000000000',
        'cafebabefacedbaddecaf888',
        'cafebabefacedbaddecaf888',
        'cafebabefacedbad',
        '9313225df88406e555909c5aff5269aa' +
          '6a7a9538534f7da1e4c303d2a318a728' +
          'c3c0c95156809539fcf0e2429a6b5254' +
          '16aedbf5a0de6a57a637b39b',
        '000000000000000000000000'
      ];

      var adatas = [
        '',
        '',
        '',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        ''
      ];

      var inputs = [
        '',
        '00000000000000000000000000000000',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b391aafd255',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        '0000'
      ];

      var outputs = [
        '',
        '0388dace60b6a392f328c2b971b2fe78',
        '42831ec2217774244b7221b784d0d49c' +
          'e3aa212f2c02a4e035c17e2329aca12e' +
          '21d514b25466931c7d8f6a5aac84aa05' +
          '1ba30b396a0aac973d58e091473f5985',
        '42831ec2217774244b7221b784d0d49c' +
          'e3aa212f2c02a4e035c17e2329aca12e' +
          '21d514b25466931c7d8f6a5aac84aa05' +
          '1ba30b396a0aac973d58e091',
        '61353b4c2806934a777ff51fa22a4755' +
          '699b2a714fcdc6f83766e5f97b6c7423' +
          '73806900e49f24b22b097544d4896b42' +
          '4989b5e1ebac0f07c23f4598',
        '8ce24998625615b603a033aca13fb894' +
          'be9112a5c3a211a8ba262a3cca7e2ca7' +
          '01e4a9a4fba43c90ccdcb281d48c7c6f' +
          'd62875d2aca417034c34aee5',
        '0388'
      ];

      var tags = [
        '58e2fccefa7e3061367f1d57a4e7455a',
        'ab6e47d42cec13bdf53a67b21257bddf',
        '4d5c2af327cd64a62cf35abd2ba6fab4',
        '5bc94fbc3221a5db94fae95ae7121a47',
        '3612d2e79e3b0785561be14aaca2fccb',
        '619cc5aefffe0bfa462af43c1699d050',
        '93dcdd26f79ec1dd9bff57204d9b33f5'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var adata = UTIL.hexToBytes(adatas[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-gcm encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-GCM', key);
            cipher.start({iv: iv, additionalData: adata});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
          });

          it('should aes-128-gcm decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-GCM', key);
            cipher.start({
              iv: iv,
              additionalData: adata,
              tag: UTIL.hexToBytes(tags[i])
            });
            cipher.update(UTIL.createBuffer(output));
            var pass = cipher.finish();
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
            ASSERT.equal(pass, true);
            ASSERT.equal(cipher.output.toHex(), inputs[i]);
          });

          it('should aes-128-gcm encrypt (one byte at a time): ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-GCM', key);
            cipher.start({iv: iv, additionalData: adata});
            var input_ = UTIL.createBuffer(input);
            var out = UTIL.createBuffer();
            while(input_.length() > 0) {
              cipher.update(UTIL.createBuffer(input_.getBytes(1)));
              ASSERT.equal(cipher.output.length(), 1);
              out.putByte(cipher.output.getByte());
            }
            cipher.finish();
            ASSERT.equal(out.toHex(), outputs[i]);
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
          });
        })(i);
      }
    })();

    // AES-192-GCM
    (function() {
      var keys = [
        '00000000000000000000000000000000' +
          '0000000000000000',
        '00000000000000000000000000000000' +
          '0000000000000000',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c'
      ];

      var ivs = [
        '000000000000000000000000',
        '000000000000000000000000',
        'cafebabefacedbaddecaf888',
        'cafebabefacedbaddecaf888',
        'cafebabefacedbad',
        '9313225df88406e555909c5aff5269aa' +
          '6a7a9538534f7da1e4c303d2a318a728' +
          'c3c0c95156809539fcf0e2429a6b5254' +
          '16aedbf5a0de6a57a637b39b'
      ];

      var adatas = [
        '',
        '',
        '',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2'
      ];

      var inputs = [
        '',
        '00000000000000000000000000000000',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b391aafd255',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39'
      ];

      var outputs = [
        '',
        '98e7247c07f0fe411c267e4384b0f600',
        '3980ca0b3c00e841eb06fac4872a2757' +
          '859e1ceaa6efd984628593b40ca1e19c' +
          '7d773d00c144c525ac619d18c84a3f47' +
          '18e2448b2fe324d9ccda2710acade256',
        '3980ca0b3c00e841eb06fac4872a2757' +
          '859e1ceaa6efd984628593b40ca1e19c' +
          '7d773d00c144c525ac619d18c84a3f47' +
          '18e2448b2fe324d9ccda2710',
        '0f10f599ae14a154ed24b36e25324db8' +
          'c566632ef2bbb34f8347280fc4507057' +
          'fddc29df9a471f75c66541d4d4dad1c9' +
          'e93a19a58e8b473fa0f062f7',
        'd27e88681ce3243c4830165a8fdcf9ff' +
          '1de9a1d8e6b447ef6ef7b79828666e45' +
          '81e79012af34ddd9e2f037589b292db3' +
          'e67c036745fa22e7e9b7373b'
      ];

      var tags = [
        'cd33b28ac773f74ba00ed1f312572435',
        '2ff58d80033927ab8ef4d4587514f0fb',
        '9924a7c8587336bfb118024db8674a14',
        '2519498e80f1478f37ba55bd6d27618c',
        '65dcc57fcf623a24094fcca40d3533f8',
        'dcf566ff291c25bbb8568fc3d376a6d9'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var adata = UTIL.hexToBytes(adatas[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-gcm encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-GCM', key);
            cipher.start({iv: iv, additionalData: adata});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
          });

          it('should aes-128-gcm decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-GCM', key);
            cipher.start({
              iv: iv,
              additionalData: adata,
              tag: UTIL.hexToBytes(tags[i])
            });
            cipher.update(UTIL.createBuffer(output));
            var pass = cipher.finish();
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
            ASSERT.equal(pass, true);
            ASSERT.equal(cipher.output.toHex(), inputs[i]);
          });
        })(i);
      }
    })();

    // AES-256-GCM
    (function() {
      var keys = [
        '00000000000000000000000000000000' +
          '00000000000000000000000000000000',
        '00000000000000000000000000000000' +
          '00000000000000000000000000000000',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c6d6a8f9467308308',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c6d6a8f9467308308',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c6d6a8f9467308308',
        'feffe9928665731c6d6a8f9467308308' +
          'feffe9928665731c6d6a8f9467308308'
      ];

      var ivs = [
        '000000000000000000000000',
        '000000000000000000000000',
        'cafebabefacedbaddecaf888',
        'cafebabefacedbaddecaf888',
        'cafebabefacedbad',
        '9313225df88406e555909c5aff5269aa' +
          '6a7a9538534f7da1e4c303d2a318a728' +
          'c3c0c95156809539fcf0e2429a6b5254' +
          '16aedbf5a0de6a57a637b39b'
      ];

      var adatas = [
        '',
        '',
        '',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2',
        'feedfacedeadbeeffeedfacedeadbeef' +
          'abaddad2'
      ];

      var inputs = [
        '',
        '00000000000000000000000000000000',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b391aafd255',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39',
        'd9313225f88406e5a55909c5aff5269a' +
          '86a7a9531534f7da2e4c303d8a318a72' +
          '1c3c0c95956809532fcf0e2449a6b525' +
          'b16aedf5aa0de657ba637b39'
      ];

      var outputs = [
        '',
        'cea7403d4d606b6e074ec5d3baf39d18',
        '522dc1f099567d07f47f37a32a84427d' +
          '643a8cdcbfe5c0c97598a2bd2555d1aa' +
          '8cb08e48590dbb3da7b08b1056828838' +
          'c5f61e6393ba7a0abcc9f662898015ad',
        '522dc1f099567d07f47f37a32a84427d' +
          '643a8cdcbfe5c0c97598a2bd2555d1aa' +
          '8cb08e48590dbb3da7b08b1056828838' +
          'c5f61e6393ba7a0abcc9f662',
        'c3762df1ca787d32ae47c13bf19844cb' +
          'af1ae14d0b976afac52ff7d79bba9de0' +
          'feb582d33934a4f0954cc2363bc73f78' +
          '62ac430e64abe499f47c9b1f',
        '5a8def2f0c9e53f1f75d7853659e2a20' +
          'eeb2b22aafde6419a058ab4f6f746bf4' +
          '0fc0c3b780f244452da3ebf1c5d82cde' +
          'a2418997200ef82e44ae7e3f'
      ];

      var tags = [
        '530f8afbc74536b9a963b4f1c4cb738b',
        'd0d1c8a799996bf0265b98b5d48ab919',
        'b094dac5d93471bdec1a502270e3cc6c',
        '76fc6ece0f4e1768cddf8853bb2d551b',
        '3a337dbf46a792c45e454913fe2ea8f2',
        'a44a8266ee1c8eb0c8b5d4cf5ae9f19a'
      ];

      for(var i = 0; i < keys.length; ++i) {
        (function(i) {
          var key = UTIL.hexToBytes(keys[i]);
          var iv = UTIL.hexToBytes(ivs[i]);
          var adata = UTIL.hexToBytes(adatas[i]);
          var input = UTIL.hexToBytes(inputs[i]);
          var output = UTIL.hexToBytes(outputs[i]);

          it('should aes-128-gcm encrypt: ' + inputs[i], function() {
            // encrypt
            var cipher = CIPHER.createCipher('AES-GCM', key);
            cipher.start({iv: iv, additionalData: adata});
            cipher.update(UTIL.createBuffer(input));
            cipher.finish();
            ASSERT.equal(cipher.output.toHex(), outputs[i]);
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
          });

          it('should aes-128-gcm decrypt: ' + outputs[i], function() {
            // decrypt
            var cipher = CIPHER.createDecipher('AES-GCM', key);
            cipher.start({
              iv: iv,
              additionalData: adata,
              tag: UTIL.hexToBytes(tags[i])
            });
            cipher.update(UTIL.createBuffer(output));
            var pass = cipher.finish();
            ASSERT.equal(cipher.mode.tag.toHex(), tags[i]);
            ASSERT.equal(pass, true);
            ASSERT.equal(cipher.output.toHex(), inputs[i]);
          });
        })(i);
      }
    })();
  });
}

// check for AMD
var forge = {};
if(typeof define === 'function') {
  define([
    'forge/cipher',
    'forge/aes',
    'forge/util'
  ], function(CIPHER, AES, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      CIPHER(forge),
      AES(forge),
      UTIL(forge)
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/cipher')(forge),
    require('../../js/aes')(forge),
    require('../../js/util')(forge));
}

})();
