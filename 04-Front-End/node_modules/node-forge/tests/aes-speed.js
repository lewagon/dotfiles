var forge = require('../js/forge');

console.log('Times in 1000s of bytes/sec processed.');

aes_128('AES-CBC');
aes_128('AES-CFB');
aes_128('AES-OFB');
aes_128('AES-CTR');
aes_128('AES-GCM');

function aes_128(algorithm) {
  console.log('Running ' + algorithm + ' for 5 seconds...');

  var size = 1024;
  var key = forge.random.getBytesSync(16);
  var iv = forge.random.getBytes(algorithm === 'AES-GCM' ? 12 : 16);
  var plain = forge.random.getBytesSync(size);

  // run for 5 seconds
  var start = new Date().getTime();

  var now;
  var totalEncrypt = 0;
  var totalDecrypt = 0;
  var cipher;
  var count = 0;
  var passed = 0;
  while(passed < 5000) {
    var input = forge.util.createBuffer(plain);

    // encrypt, only measuring update() and finish()
    cipher = forge.cipher.createCipher(algorithm, key);
    cipher.start({iv: iv});
    now = new Date().getTime();
    cipher.update(input);
    cipher.finish();
    totalEncrypt += new Date().getTime() - now;

    var ciphertext = cipher.output;
    var tag = cipher.mode.tag;
    count += cipher.output.length();

    // decrypt, only measuring update() and finish()
    cipher = forge.cipher.createDecipher(algorithm, key);
    cipher.start({iv: iv, tag: tag});
    now = new Date().getTime();
    cipher.update(ciphertext);
    if(!cipher.finish()) {
      throw new Error('Decryption error.');
    }
    totalDecrypt += new Date().getTime() - now;

    passed = new Date().getTime() - start;
  }

  count = count / 1000;
  totalEncrypt /= 1000;
  totalDecrypt /= 1000;
  console.log('encrypt: ' + (count / totalEncrypt) + ' k/sec');
  console.log('decrypt: ' + (count / totalDecrypt) + ' k/sec');
  console.log();
}
