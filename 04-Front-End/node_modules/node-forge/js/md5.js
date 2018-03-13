/**
 * Message Digest Algorithm 5 with 128-bit digest (MD5) implementation.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
 */
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {

var md5 = forge.md5 = forge.md5 || {};
forge.md = forge.md || {};
forge.md.algorithms = forge.md.algorithms || {};
forge.md.md5 = forge.md.algorithms.md5 = md5;

/**
 * Creates an MD5 message digest object.
 *
 * @return a message digest object.
 */
md5.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // MD5 state contains four 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(16);

  // message digest object
  var md = {
    algorithm: 'md5',
    blockLength: 64,
    digestLength: 16,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true 64-bit message length as two 32-bit ints
    messageLength64: [0, 0]
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    md.messageLength = 0;
    md.messageLength64 = [0, 0];
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x67452301,
      h1: 0xEFCDAB89,
      h2: 0x98BADCFE,
      h3: 0x10325476
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    md.messageLength += msg.length;
    md.messageLength64[0] += (msg.length / 0x100000000) >>> 0;
    md.messageLength64[1] += msg.length >>> 0;

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

  /**
   * Produces the digest.
   *
   * @return a byte buffer containing the digest value.
   */
  md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate MD5 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    // 512 bits == 64 bytes, 448 bits == 56 bytes, 64 bits = 8 bytes
    // _padding starts with 1 byte with first bit is set in it which
    // is byte value 128, then there may be up to 63 other pad bytes
    var padBytes = forge.util.createBuffer();
    padBytes.putBytes(_input.bytes());
    // 64 - (remaining msg + 8 bytes msg length) mod 64
    padBytes.putBytes(
      _padding.substr(0, 64 - ((md.messageLength64[1] + 8) & 0x3F)));

    /* Now append length of the message. The length is appended in bits
    as a 64-bit number in little-endian order. Since we store the length in
    bytes, we must multiply the 64-bit length by 8 (or left shift by 3). */
    padBytes.putInt32Le(md.messageLength64[1] << 3);
    padBytes.putInt32Le(
      (md.messageLength64[0] << 3) | (md.messageLength64[0] >>> 28));
    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3
    };
    _update(s2, _w, padBytes);
    var rval = forge.util.createBuffer();
    rval.putInt32Le(s2.h0);
    rval.putInt32Le(s2.h1);
    rval.putInt32Le(s2.h2);
    rval.putInt32Le(s2.h3);
    return rval;
  };

  return md;
};

// padding, constant tables for calculating md5
var _padding = null;
var _g = null;
var _r = null;
var _k = null;
var _initialized = false;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // g values
  _g = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12,
    5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2,
    0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9];

  // rounds table
  _r = [
    7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
    5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
    4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
    6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21];

  // get the result of abs(sin(i + 1)) as a 32-bit integer
  _k = new Array(64);
  for(var i = 0; i < 64; ++i) {
    _k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000);
  }

  // now initialized
  _initialized = true;
}

/**
 * Updates an MD5 state with the given byte buffer.
 *
 * @param s the MD5 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t, a, b, c, d, f, r, i;
  var len = bytes.length();
  while(len >= 64) {
    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;

    // round 1
    for(i = 0; i < 16; ++i) {
      w[i] = bytes.getInt32Le();
      f = d ^ (b & (c ^ d));
      t = (a + f + _k[i] + w[i]);
      r = _r[i];
      a = d;
      d = c;
      c = b;
      b += (t << r) | (t >>> (32 - r));
    }
    // round 2
    for(; i < 32; ++i) {
      f = c ^ (d & (b ^ c));
      t = (a + f + _k[i] + w[_g[i]]);
      r = _r[i];
      a = d;
      d = c;
      c = b;
      b += (t << r) | (t >>> (32 - r));
    }
    // round 3
    for(; i < 48; ++i) {
      f = b ^ c ^ d;
      t = (a + f + _k[i] + w[_g[i]]);
      r = _r[i];
      a = d;
      d = c;
      c = b;
      b += (t << r) | (t >>> (32 - r));
    }
    // round 4
    for(; i < 64; ++i) {
      f = c ^ (b | ~d);
      t = (a + f + _k[i] + w[_g[i]]);
      r = _r[i];
      a = d;
      d = c;
      c = b;
      b += (t << r) | (t >>> (32 - r));
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;

    len -= 64;
  }
}

} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'md5';
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    var nodeJS = true;
    define = function(ids, factory) {
      factory(require, module);
    };
  } else {
    // <script>
    if(typeof forge === 'undefined') {
      forge = {};
    }
    return initModule(forge);
  }
}
// AMD
var deps;
var defineFunc = function(require, module) {
  module.exports = function(forge) {
    var mods = deps.map(function(dep) {
      return require(dep);
    }).concat(initModule);
    // handle circular dependencies
    forge = forge || {};
    forge.defined = forge.defined || {};
    if(forge.defined[name]) {
      return forge[name];
    }
    forge.defined[name] = true;
    for(var i = 0; i < mods.length; ++i) {
      mods[i](forge);
    }
    return forge[name];
  };
};
var tmpDefine = define;
define = function(ids, factory) {
  deps = (typeof ids === 'string') ? factory.slice(2) : ids.slice(2);
  if(nodeJS) {
    delete define;
    return tmpDefine.apply(null, Array.prototype.slice.call(arguments, 0));
  }
  define = tmpDefine;
  return define.apply(null, Array.prototype.slice.call(arguments, 0));
};
define(['require', 'module', './util'], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();
