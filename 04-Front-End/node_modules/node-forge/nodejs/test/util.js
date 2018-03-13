(function() {

function Tests(ASSERT, UTIL) {
  // custom assertion to test array-like objects
  function assertArrayEqual(actual, expected) {
    ASSERT.equal(actual.length, expected.length);
    for (var idx = 0; idx < expected.length; idx++) {
      ASSERT.equal(actual[idx], expected[idx]);
    }
  }

  describe('util', function() {
    it('should put bytes into a buffer', function() {
      var b = UTIL.createBuffer();
      b.putByte(1);
      b.putByte(2);
      b.putByte(3);
      b.putByte(4);
      b.putInt32(4);
      b.putByte(1);
      b.putByte(2);
      b.putByte(3);
      b.putInt32(4294967295);
      var hex = b.toHex();
      ASSERT.equal(hex, '0102030400000004010203ffffffff');

      var bytes = [];
      while(b.length() > 0) {
        bytes.push(b.getByte());
      }
      ASSERT.deepEqual(
        bytes, [1, 2, 3, 4, 0, 0, 0, 4, 1, 2, 3, 255, 255, 255, 255]);
    });

    it('should put bytes from an Uint8Array into a buffer', function() {
      if(typeof Uint8Array === 'undefined') {
        return;
      }
      var data = [1, 2, 3, 4, 0, 0, 0, 4, 1, 2, 3, 255, 255, 255, 255];
      var ab = new Uint8Array(data);
      var b = UTIL.createBuffer(ab);
      var hex = b.toHex();
      ASSERT.equal(hex, '0102030400000004010203ffffffff');

      var bytes = [];
      while(b.length() > 0) {
        bytes.push(b.getByte());
      }
      ASSERT.deepEqual(bytes, data);
    });

    it('should convert bytes from hex', function() {
      var hex = '0102030400000004010203ffffffff';
      var b = UTIL.createBuffer();
      b.putBytes(UTIL.hexToBytes(hex));
      ASSERT.equal(b.toHex(), hex);
    });

    it('should put 0 into a buffer using two\'s complement', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(0, 8);
      ASSERT.equal(b.toHex(), '00');
    });

    it('should put 0 into a buffer using two\'s complement w/2 bytes', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(0, 16);
      ASSERT.equal(b.toHex(), '0000');
    });

    it('should put 127 into a buffer using two\'s complement', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(127, 8);
      ASSERT.equal(b.toHex(), '7f');
    });

    it('should put 127 into a buffer using two\'s complement w/2 bytes', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(127, 16);
      ASSERT.equal(b.toHex(), '007f');
    });

    it('should put 128 into a buffer using two\'s complement', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(128, 16);
      ASSERT.equal(b.toHex(), '0080');
    });

    it('should put 256 into a buffer using two\'s complement', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(256, 16);
      ASSERT.equal(b.toHex(), '0100');
    });

    it('should put -128 into a buffer using two\'s complement', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(-128, 8);
      ASSERT.equal(b.toHex(), '80');
    });

    it('should put -129 into a buffer using two\'s complement', function() {
      var b = UTIL.createBuffer();
      b.putSignedInt(-129, 16);
      ASSERT.equal(b.toHex(), 'ff7f');
    });

    it('should get 0 from a buffer using two\'s complement', function() {
      var x = 0;
      var n = 8;
      var b = UTIL.createBuffer();
      b.putSignedInt(x, n);
      ASSERT.equal(b.getSignedInt(x, n), x);
    });

    it('should get 127 from a buffer using two\'s complement', function() {
      var x = 127;
      var n = 8;
      var b = UTIL.createBuffer();
      b.putSignedInt(x, n);
      ASSERT.equal(b.getSignedInt(n), x);
    });

    it('should get 128 from a buffer using two\'s complement', function() {
      var x = 128;
      var n = 16;
      var b = UTIL.createBuffer();
      b.putSignedInt(x, n);
      ASSERT.equal(b.getSignedInt(n), x);
    });

    it('should get 256 from a buffer using two\'s complement', function() {
      var x = 256;
      var n = 16;
      var b = UTIL.createBuffer();
      b.putSignedInt(x, n);
      ASSERT.equal(b.getSignedInt(n), x);
    });

    it('should get -128 from a buffer using two\'s complement', function() {
      var x = -128;
      var n = 8;
      var b = UTIL.createBuffer();
      b.putSignedInt(x, n);
      ASSERT.equal(b.getSignedInt(n), x);
    });

    it('should get -129 from a buffer using two\'s complement', function() {
      var x = -129;
      var n = 16;
      var b = UTIL.createBuffer();
      b.putSignedInt(x, n);
      ASSERT.equal(b.getSignedInt(n), x);
    });

    it('should base64 encode some bytes', function() {
      var s1 = '00010203050607080A0B0C0D0F1011121415161719';
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
      ASSERT.equal(UTIL.encode64(s1), s2);
    });

    it('should base64 decode some bytes', function() {
      var s1 = '00010203050607080A0B0C0D0F1011121415161719';
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
      ASSERT.equal(UTIL.decode64(s2), s1);
    });
    
    it('should base64 encode some bytes using util.binary.base64', function() {
      var s1 = new Uint8Array([
        0x30, 0x30, 0x30, 0x31, 0x30, 0x32, 0x30, 0x33, 0x30,
        0x35, 0x30, 0x36, 0x30, 0x37, 0x30, 0x38, 0x30, 0x41,
        0x30, 0x42, 0x30, 0x43, 0x30, 0x44, 0x30, 0x46, 0x31,
        0x30, 0x31, 0x31, 0x31, 0x32, 0x31, 0x34, 0x31, 0x35,
        0x31, 0x36, 0x31, 0x37, 0x31, 0x39]);
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
      ASSERT.equal(UTIL.binary.base64.encode(s1), s2);
    });

    it('should base64 encode some odd-length bytes using util.binary.base64', function() {
      var s1 = new Uint8Array([
        0x30, 0x30, 0x30, 0x31, 0x30, 0x32, 0x30, 0x33, 0x30,
        0x35, 0x30, 0x36, 0x30, 0x37, 0x30, 0x38, 0x30, 0x41,
        0x30, 0x42, 0x30, 0x43, 0x30, 0x44, 0x30, 0x46, 0x31,
        0x30, 0x31, 0x31, 0x31, 0x32, 0x31, 0x34, 0x31, 0x35,
        0x31, 0x36, 0x31, 0x37, 0x31, 0x39, 0x31, 0x41, 0x31,
        0x42]);
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5MUExQg==';
      ASSERT.equal(UTIL.binary.base64.encode(s1), s2);
    });

    it('should base64 decode some bytes using util.binary.base64', function() {
      var s1 = new Uint8Array([
        0x30, 0x30, 0x30, 0x31, 0x30, 0x32, 0x30, 0x33, 0x30,
        0x35, 0x30, 0x36, 0x30, 0x37, 0x30, 0x38, 0x30, 0x41,
        0x30, 0x42, 0x30, 0x43, 0x30, 0x44, 0x30, 0x46, 0x31,
        0x30, 0x31, 0x31, 0x31, 0x32, 0x31, 0x34, 0x31, 0x35,
        0x31, 0x36, 0x31, 0x37, 0x31, 0x39]);
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
      ASSERT.deepEqual(UTIL.binary.base64.decode(s2), s1);
    });
      
    it('should base64 decode some odd-length bytes using util.binary.base64', function() {
      var s1 = new Uint8Array([
        0x30, 0x30, 0x30, 0x31, 0x30, 0x32, 0x30, 0x33, 0x30,
        0x35, 0x30, 0x36, 0x30, 0x37, 0x30, 0x38, 0x30, 0x41,
        0x30, 0x42, 0x30, 0x43, 0x30, 0x44, 0x30, 0x46, 0x31,
        0x30, 0x31, 0x31, 0x31, 0x32, 0x31, 0x34, 0x31, 0x35,
        0x31, 0x36, 0x31, 0x37, 0x31, 0x39, 0x31, 0x41, 0x31,
        0x42]);
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5MUExQg==';
      assertArrayEqual(UTIL.binary.base64.decode(s2), s1);
    });
      
    it('should convert IPv4 0.0.0.0 textual address to 4-byte address', function() {
      var bytes = UTIL.bytesFromIP('0.0.0.0');
      var b = UTIL.createBuffer().fillWithByte(0, 4);
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv4 127.0.0.1 textual address to 4-byte address', function() {
      var bytes = UTIL.bytesFromIP('127.0.0.1');
      var b = UTIL.createBuffer();
      b.putByte(127);
      b.putByte(0);
      b.putByte(0);
      b.putByte(1);
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 :: textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('::');
      var b = UTIL.createBuffer().fillWithByte(0, 16);
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 ::0 textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('::0');
      var b = UTIL.createBuffer().fillWithByte(0, 16);
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 0:: textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('0::');
      var b = UTIL.createBuffer().fillWithByte(0, 16);
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 ::1 textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('::1');
      var b = UTIL.createBuffer().fillWithByte(0, 14);
      b.putBytes(UTIL.hexToBytes('0001'));
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 1:: textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('1::');
      var b = UTIL.createBuffer();
      b.putBytes(UTIL.hexToBytes('0001'));
      b.fillWithByte(0, 14);
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 1::1 textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('1::1');
      var b = UTIL.createBuffer();
      b.putBytes(UTIL.hexToBytes('0001'));
      b.fillWithByte(0, 12);
      b.putBytes(UTIL.hexToBytes('0001'));
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 1::1:0 textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('1::1:0');
      var b = UTIL.createBuffer();
      b.putBytes(UTIL.hexToBytes('0001'));
      b.fillWithByte(0, 10);
      b.putBytes(UTIL.hexToBytes('0001'));
      b.putBytes(UTIL.hexToBytes('0000'));
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv6 2001:db8:0:1:1:1:1:1 textual address to 16-byte address', function() {
      var bytes = UTIL.bytesFromIP('2001:db8:0:1:1:1:1:1');
      var b = UTIL.createBuffer();
      b.putBytes(UTIL.hexToBytes('2001'));
      b.putBytes(UTIL.hexToBytes('0db8'));
      b.putBytes(UTIL.hexToBytes('0000'));
      b.putBytes(UTIL.hexToBytes('0001'));
      b.putBytes(UTIL.hexToBytes('0001'));
      b.putBytes(UTIL.hexToBytes('0001'));
      b.putBytes(UTIL.hexToBytes('0001'));
      b.putBytes(UTIL.hexToBytes('0001'));
      ASSERT.equal(bytes, b.getBytes());
    });

    it('should convert IPv4 0.0.0.0 byte address to textual representation', function() {
      var addr = '0.0.0.0';
      var bytes = UTIL.createBuffer().fillWithByte(0, 4).getBytes();
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '0.0.0.0');
    });

    it('should convert IPv4 0.0.0.0 byte address to textual representation', function() {
      var addr = '127.0.0.1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '127.0.0.1');
    });

    it('should convert IPv6 :: byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '::';
      var bytes = UTIL.createBuffer().fillWithByte(0, 16).getBytes();
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '::');
    });

    it('should convert IPv6 ::1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '::1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '::1');
    });

    it('should convert IPv6 1:: byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1::';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1::');
    });

    it('should convert IPv6 0:0:0:0:0:0:0:1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '0:0:0:0:0:0:0:1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '::1');
    });

    it('should convert IPv6 1:0:0:0:0:0:0:0 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1:0:0:0:0:0:0:0';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1::');
    });

    it('should convert IPv6 1::1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1::1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1::1');
    });

    it('should convert IPv6 1:0:0:0:0:0:0:1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1:0:0:0:0:0:0:1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1::1');
    });

    it('should convert IPv6 1:0000:0000:0000:0000:0000:0000:1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1:0000:0000:0000:0000:0000:0000:1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1::1');
    });

    it('should convert IPv6 1:0:0:1:1:1:0:1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1:0:0:1:1:1:0:1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1::1:1:1:0:1');
    });

    it('should convert IPv6 1:0:1:1:1:0:0:1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '1:0:1:1:1:0:0:1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '1:0:1:1:1::1');
    });

    it('should convert IPv6 2001:db8:0:1:1:1:1:1 byte address to canonical textual representation (RFC 5952)', function() {
      var addr = '2001:db8:0:1:1:1:1:1';
      var bytes = UTIL.bytesFromIP(addr);
      var addr = UTIL.bytesToIP(bytes);
      ASSERT.equal(addr, '2001:db8:0:1:1:1:1:1');
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/util'
  ], function(UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      UTIL()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/util')());
}

})();
