var sizes = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  rmd160: 20,
  ripemd160: 20
}

var createHmac = require('create-hmac')
var checkParameters = require('../lib/precondition')
var defaultEncoding = require('../lib/default-encoding')
var Buffer = require('safe-buffer').Buffer
module.exports = pbkdf2
function pbkdf2 (password, salt, iterations, keylen, digest) {
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)
  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)

  checkParameters(iterations, keylen)

  digest = digest || 'sha1'

  var DK = Buffer.allocUnsafe(keylen)
  var block1 = Buffer.allocUnsafe(salt.length + 4)
  salt.copy(block1, 0, 0, salt.length)

  var U, j, destPos, len

  var hLen = sizes[digest]
  var T = Buffer.allocUnsafe(hLen)
  var l = Math.ceil(keylen / hLen)
  var r = keylen - (l - 1) * hLen

  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length)
    U = createHmac(digest, password).update(block1).digest()

    U.copy(T, 0, 0, hLen)

    for (j = 1; j < iterations; j++) {
      U = createHmac(digest, password).update(U).digest()
      for (var k = 0; k < hLen; k++) T[k] ^= U[k]
    }

    destPos = (i - 1) * hLen
    len = (i === l ? r : hLen)
    T.copy(DK, destPos, 0, len)
  }

  return DK
}
