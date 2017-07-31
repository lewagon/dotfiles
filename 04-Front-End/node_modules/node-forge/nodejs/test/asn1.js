(function() {

function Tests(ASSERT, ASN1, UTIL) {
  describe('asn1', function() {
    // TODO: add more ASN.1 coverage

    it('should convert an OID to DER', function() {
      ASSERT.equal(ASN1.oidToDer('1.2.840.113549').toHex(), '2a864886f70d');
    });

    it('should convert an OID from DER', function() {
      var der = UTIL.hexToBytes('2a864886f70d');
      ASSERT.equal(ASN1.derToOid(der), '1.2.840.113549');
    });

    it('should convert INTEGER 0 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(0).toHex(), '00');
    });

    it('should convert INTEGER 1 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(1).toHex(), '01');
    });

    it('should convert INTEGER 127 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(127).toHex(), '7f');
    });

    it('should convert INTEGER 128 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(128).toHex(), '0080');
    });

    it('should convert INTEGER 256 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(256).toHex(), '0100');
    });

    it('should convert INTEGER -128 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-128).toHex(), '80');
    });

    it('should convert INTEGER -129 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-129).toHex(), 'ff7f');
    });

    it('should convert INTEGER 32768 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(32768).toHex(), '008000');
    });

    it('should convert INTEGER -32768 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-32768).toHex(), '8000');
    });

    it('should convert INTEGER -32769 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-32769).toHex(), 'ff7fff');
    });

    it('should convert INTEGER 8388608 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(8388608).toHex(), '00800000');
    });

    it('should convert INTEGER -8388608 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-8388608).toHex(), '800000');
    });

    it('should convert INTEGER -8388609 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-8388609).toHex(), 'ff7fffff');
    });

    it('should convert INTEGER 2147483647 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(2147483647).toHex(), '7fffffff');
    });

    it('should convert INTEGER -2147483648 to DER', function() {
      ASSERT.equal(ASN1.integerToDer(-2147483648).toHex(), '80000000');
    });

    it('should convert INTEGER 0 from DER', function() {
      var der = UTIL.hexToBytes('00');
      ASSERT.equal(ASN1.derToInteger(der), 0);
    });

    it('should convert INTEGER 1 from DER', function() {
      var der = UTIL.hexToBytes('01');
      ASSERT.equal(ASN1.derToInteger(der), 1);
    });

    it('should convert INTEGER 127 from DER', function() {
      var der = UTIL.hexToBytes('7f');
      ASSERT.equal(ASN1.derToInteger(der), 127);
    });

    it('should convert INTEGER 128 from DER', function() {
      var der = UTIL.hexToBytes('0080');
      ASSERT.equal(ASN1.derToInteger(der), 128);
    });

    it('should convert INTEGER 256 from DER', function() {
      var der = UTIL.hexToBytes('0100');
      ASSERT.equal(ASN1.derToInteger(der), 256);
    });

    it('should convert INTEGER -128 from DER', function() {
      var der = UTIL.hexToBytes('80');
      ASSERT.equal(ASN1.derToInteger(der), -128);
    });

    it('should convert INTEGER -129 from DER', function() {
      var der = UTIL.hexToBytes('ff7f');
      ASSERT.equal(ASN1.derToInteger(der), -129);
    });

    it('should convert INTEGER 32768 from DER', function() {
      var der = UTIL.hexToBytes('008000');
      ASSERT.equal(ASN1.derToInteger(der), 32768);
    });

    it('should convert INTEGER -32768 from DER', function() {
      var der = UTIL.hexToBytes('8000');
      ASSERT.equal(ASN1.derToInteger(der), -32768);
    });

    it('should convert INTEGER -32769 from DER', function() {
      var der = UTIL.hexToBytes('ff7fff');
      ASSERT.equal(ASN1.derToInteger(der), -32769);
    });

    it('should convert INTEGER 8388608 from DER', function() {
      var der = UTIL.hexToBytes('00800000');
      ASSERT.equal(ASN1.derToInteger(der), 8388608);
    });

    it('should convert INTEGER -8388608 from DER', function() {
      var der = UTIL.hexToBytes('800000');
      ASSERT.equal(ASN1.derToInteger(der), -8388608);
    });

    it('should convert INTEGER -8388609 from DER', function() {
      var der = UTIL.hexToBytes('ff7fffff');
      ASSERT.equal(ASN1.derToInteger(der), -8388609);
    });

    it('should convert INTEGER 2147483647 from DER', function() {
      var der = UTIL.hexToBytes('7fffffff');
      ASSERT.equal(ASN1.derToInteger(der), 2147483647);
    });

    it('should convert INTEGER -2147483648 from DER', function() {
      var der = UTIL.hexToBytes('80000000');
      ASSERT.equal(ASN1.derToInteger(der), -2147483648);
    });

    (function() {
      var tests = [{
        in: '20110223123400',
        out: 1298464440000
      }, {
        in: '20110223123400.1',
        out: 1298464440100
      }, {
        in: '20110223123400.123',
        out: 1298464440123
      }];
      for(var i = 0; i < tests.length; ++i) {
        var test = tests[i];
        it('should convert local generalized time "' + test.in + '" to a Date', function() {
          var d = ASN1.generalizedTimeToDate(test.in);
          var localOffset = d.getTimezoneOffset() * 60000;
          ASSERT.equal(d.getTime(), test.out + localOffset);
        });
      }
    })();

    (function() {
      var tests = [{
        in: '20110223123400Z', // Wed Feb 23 12:34:00.000 UTC 2011
        out: 1298464440000
      }, {
        in: '20110223123400.1Z', // Wed Feb 23 12:34:00.100 UTC 2011
        out: 1298464440100
      }, {
        in: '20110223123400.123Z', // Wed Feb 23 12:34:00.123 UTC 2011
        out: 1298464440123
      }, {
        in: '20110223123400+0200', // Wed Feb 23 10:34:00.000 UTC 2011
        out: 1298457240000
      }, {
        in: '20110223123400.1+0200', // Wed Feb 23 10:34:00.100 UTC 2011
        out: 1298457240100
      }, {
        in: '20110223123400.123+0200', // Wed Feb 23 10:34:00.123 UTC 2011
        out: 1298457240123
      }, {
        in: '20110223123400-0200', // Wed Feb 23 14:34:00.000 UTC 2011
        out: 1298471640000
      }, {
        in: '20110223123400.1-0200', // Wed Feb 23 14:34:00.100 UTC 2011
        out: 1298471640100
      }, {
        in: '20110223123400.123-0200', // Wed Feb 23 14:34:00.123 UTC 2011
        out: 1298471640123
      }];
      for(var i = 0; i < tests.length; ++i) {
        var test = tests[i];
        it('should convert utc generalized time "' + test.in + '" to a Date', function() {
          var d = ASN1.generalizedTimeToDate(test.in);
          ASSERT.equal(d.getTime(), test.out);
        });
      }
    })();

    (function() {
      var tests = [{
        in: '1102231234Z', // Wed Feb 23 12:34:00 UTC 2011
        out: 1298464440000
      }, {
        in: '1102231234+0200', // Wed Feb 23 10:34:00 UTC 2011
        out: 1298457240000
      }, {
        in: '1102231234-0200', // Wed Feb 23 14:34:00 UTC 2011
        out: 1298471640000
      }, {
        in: '110223123456Z', // Wed Feb 23 12:34:56 UTC 2011
        out: 1298464496000
      }, {
        in: '110223123456+0200', // Wed Feb 23 10:34:56 UTC 2011
        out: 1298457296000
      }, {
        in: '110223123456-0200', // Wed Feb 23 14:34:56 UTC 2011
        out: 1298471696000
      }];
      for(var i = 0; i < tests.length; ++i) {
        var test = tests[i];
        it('should convert utc time "' + test.in + '" to a Date', function() {
          var d = ASN1.utcTimeToDate(test.in);
          ASSERT.equal(d.getTime(), test.out);
        });
      }
    })();
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/asn1',
    'forge/util'
  ], function(ASN1, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      ASN1(),
      UTIL()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/asn1')(),
    require('../../js/util')());
}

})();
