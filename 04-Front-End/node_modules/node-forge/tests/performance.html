<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
   <head>
      <title>Forge Performance Tests</title>
      <link type="text/css" rel="stylesheet" media="all" href="screen.css" />
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
      <script type="text/javascript" src="forge/debug.js"></script>
      <script type="text/javascript" src="forge/util.js"></script>
      <script type="text/javascript" src="forge/log.js"></script>
      <script type="text/javascript" src="forge/task.js"></script>
      <script type="text/javascript" src="forge/md5.js"></script>
      <script type="text/javascript" src="forge/sha1.js"></script>
      <script type="text/javascript" src="forge/sha256.js"></script>
      <script type="text/javascript" src="forge/hmac.js"></script>
      <script type="text/javascript" src="forge/aes.js"></script>
      <script type="text/javascript" src="forge/pem.js"></script>
      <script type="text/javascript" src="forge/asn1.js"></script>
      <script type="text/javascript" src="forge/jsbn.js"></script>
      <script type="text/javascript" src="forge/prng.js"></script>
      <script type="text/javascript" src="forge/random.js"></script>
      <script type="text/javascript" src="forge/oids.js"></script>
      <script type="text/javascript" src="forge/rsa.js"></script>
      <script type="text/javascript" src="forge/pbe.js"></script>
      <script type="text/javascript" src="forge/x509.js"></script>
      <script type="text/javascript" src="forge/pki.js"></script>
      <script type="text/javascript" src="forge/tls.js"></script>
      <script type="text/javascript" src="forge/aesCipherSuites.js"></script>

      <script type="text/javascript">
      //<![CDATA[
      // logging category
      var cat = 'forge.tests.performance';

      var test_random = function()
      {
         forge.log.debug(cat, 'painting canvas...');
         setTimeout(function()
         {
	         var canvas = document.getElementById("canvas");
	         var ctx = canvas.getContext("2d");
	         var imgData = ctx.createImageData(canvas.width, canvas.height);

	         // generate random bytes
	         var bytes = forge.random.getBytes(canvas.width * canvas.height * 3);
	         var n = 0;
	         for(var x = 0; x < imgData.width; x++)
	         {
	            for(var y = 0; y < imgData.height; y++)
	            {
	               // index of the pixel in the array
	               var idx = (x + y * imgData.width) * 4;

	               // set values
	               imgData.data[idx + 0] = bytes.charCodeAt(n++); // Red
	               imgData.data[idx + 1] = bytes.charCodeAt(n++); // Green
	               imgData.data[idx + 2] = bytes.charCodeAt(n++); // Blue
	               imgData.data[idx + 3] = 255;                   // Alpha
	            }
	         }

	         ctx.putImageData(imgData, 0, 0);
	         forge.log.debug(cat, 'done');
         }, 0);
      };

      var canvas_clear = function()
      {
         var canvas = document.getElementById("canvas");
         var ctx = canvas.getContext("2d");
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      var test_buffer_fill = function()
      {
         forge.log.debug(cat,
            'buffer fill optimized vs. slow running for about 5 seconds...');

         setTimeout(function()
         {
	         // run slow fill for 2.5 seconds
	         var st, et;
	         var b = '';
	         var passed = 0;
	         while(passed < 2500)
	         {
	            st = +new Date();
	            b += 'b';
	            et = +new Date();
	            passed += (et - st);
	         }

	         // do optimized fill
	         var buf = forge.util.createBuffer();
	         st = +new Date();
	         buf.fillWithByte('b'.charCodeAt(0), b.length);
	         et = +new Date();

	         forge.log.debug(cat, 'fill times', (et - st) + ' < ' + passed);
         });
      };

      var test_buffer_xor = function()
      {
         forge.log.debug(cat,
            'buffer xor optimized vs. slow running for about 5 seconds...');

         setTimeout(function()
         {
	         // run slow xor for 2.5 seconds
	         var st, et;
	         var output = forge.util.createBuffer();
	         var passed = 0;
	         while(passed < 2500)
	         {
	            st = +new Date();
	            output.putByte(0x01 ^ 0x02);
	            et = +new Date();
	            passed += (et - st);
	         }

	         // do optimized xor
	         var count = output.length();
	         var b1 = forge.util.createBuffer();
	         b1.fillWithByte(0x01, count);
	         var b2 = forge.util.createBuffer();
	         b2.fillWithByte(0x02, count);

	         st = +new Date();
	         output = forge.util.xorBytes(b1.getBytes(), b2.getBytes(), count);
	         et = +new Date();

	         forge.log.debug(cat, 'xor times', (et - st) + ' < ' + passed);
         });
      };

      // TODO: follow the same format as the hash tests
      var test_base64_encode = function()
      {
         forge.log.debug(cat, 'base64 encode running for about 5 seconds...');

         setTimeout(function()
         {
	         // get starting time to make test run for only 5 seconds
	         var start = +new Date();

	         // build data to encode
	         var str = '';
	         for(var i = 0; i < 100; i++)
	         {
	            str += '00010203050607080A0B0C0D0F1011121415161719';
	         }

	         // keep encoding for 5 seconds, keep track of total and count
	         var total = 0, count = 0, st, et;
	         var passed = 0;
	         while(passed < 5000)
	         {
	            st = +new Date();
	            forge.util.encode64(str);
	            et = +new Date();
	            ++count;
	            total += (et - st);
	            passed = +new Date() - start;
	         }

	         total /= 1000;
	         var kb = 4200/1024;
	         forge.log.debug(cat,
	            'encode:', (count*kb/total) + ' KiB/s');
         });
      };

      // TODO: follow the same format as the hash tests
      var test_base64_decode = function()
      {
         forge.log.debug(cat, 'base64 decode running for about 5 seconds...');

         setTimeout(function()
         {
	         // get starting time to make test run for only 5 seconds
	         var start = +new Date();

	         // build data to decode
	         var str = '';
	         for(var i = 0; i < 100; i++)
	         {
	            str +=
		            'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
	         }

	         // keep encoding for 5 seconds, keep track of total and count
	         var total = 0, count = 0, st, et;
	         var passed = 0;
	         while(passed < 5000)
	         {
	            st = +new Date();
	            forge.util.decode64(str);
	            et = +new Date();
	            ++count;
	            total += (et - st);
	            passed = +new Date() - start;
	         }

	         total /= 1000;
	         var kb = 5600/1024;
	         forge.log.debug(cat,
	            'decode:', (count*kb/total) + ' KiB/s');
         });
      };

      var test_md5 = function()
      {
         // create input data
         var input = ['0123456789abcdef', '', '', '', ''];
         for(var i = 0; i < 4; ++i)
         {
            input[1] += input[0];
         }
         for(var i = 0; i < 4; ++i)
         {
            input[2] += input[1];
         }
         for(var i = 0; i < 4; ++i)
         {
            input[3] += input[2];
         }
         for(var i = 0; i < 8; ++i)
         {
            input[4] += input[3];
         }

         var md = forge.md.md5.create();

         forge.log.debug(cat, 'md5 times in 1000s of bytes/sec processed:');

         var st, et;
         var output =
            ['  16 bytes: ',
             '  64 bytes: ',
             ' 256 bytes: ',
             '1024 bytes: ',
             '8192 bytes: '];
         var s = [16, 64, 256, 1024, 8192];
         var t = [0, 0, 0, 0, 0];
         for(var n = 0; n < 5; ++n)
         {
            var f = function(n)
            {
               setTimeout(function()
               {
                  // run for 2 seconds each
                  var count = 0;
                  while(t[n] < 2000)
                  {
                     md.start();
                     st = +new Date();
                     md.update(input[n]);
                     md.digest();
                     et = +new Date();
                     t[n] = t[n] + (et - st);
                     ++count;
                  }
                  t[n] /= 1000;
                  forge.log.debug(cat,
                     output[n], (count*s[n]/t[n]/1000) + 'k/sec');
               }, 0);
            }(n);
         }
      };

      var test_sha1 = function()
      {
         // create input data
         var input = ['0123456789abcdef', '', '', '', ''];
         for(var i = 0; i < 4; ++i)
         {
            input[1] += input[0];
         }
         for(var i = 0; i < 4; ++i)
         {
            input[2] += input[1];
         }
         for(var i = 0; i < 4; ++i)
         {
            input[3] += input[2];
         }
         for(var i = 0; i < 8; ++i)
         {
            input[4] += input[3];
         }

         var md = forge.md.sha1.create();

         forge.log.debug(cat, 'sha-1 times in 1000s of bytes/sec processed:');

         var st, et;
         var output =
            ['  16 bytes: ',
             '  64 bytes: ',
             ' 256 bytes: ',
             '1024 bytes: ',
             '8192 bytes: '];
         var s = [16, 64, 256, 1024, 8192];
         var t = [0, 0, 0, 0, 0];
         for(var n = 0; n < 5; ++n)
         {
            var f = function(n)
            {
               setTimeout(function()
               {
                  // run for 2 seconds each
                  var count = 0;
                  while(t[n] < 2000)
                  {
                     md.start();
                     st = +new Date();
                     md.update(input[n]);
                     md.digest();
                     et = +new Date();
                     t[n] = t[n] + (et - st);
                     ++count;
                  }
                  t[n] /= 1000;
                  forge.log.debug(cat,
                     output[n], (count*s[n]/t[n]/1000) + 'k/sec');
               }, 0);
            }(n);
         }
      };

      var test_sha256 = function()
      {
         // create input data
         var input = ['0123456789abcdef', '', '', '', ''];
         for(var i = 0; i < 4; ++i)
         {
            input[1] += input[0];
         }
         for(var i = 0; i < 4; ++i)
         {
            input[2] += input[1];
         }
         for(var i = 0; i < 4; ++i)
         {
            input[3] += input[2];
         }
         for(var i = 0; i < 8; ++i)
         {
            input[4] += input[3];
         }

         var md = forge.md.sha256.create();

         forge.log.debug(cat, 'sha-256 times in 1000s of bytes/sec processed:');

         var st, et;
         var output =
            ['  16 bytes: ',
             '  64 bytes: ',
             ' 256 bytes: ',
             '1024 bytes: ',
             '8192 bytes: '];
         var s = [16, 64, 256, 1024, 8192];
         var t = [0, 0, 0, 0, 0];
         for(var n = 0; n < 5; ++n)
         {
            var f = function(n)
            {
               setTimeout(function()
               {
                  // run for 2 seconds each
                  var count = 0;
                  while(t[n] < 2000)
                  {
                     md.start();
                     st = +new Date();
                     md.update(input[n]);
                     md.digest();
                     et = +new Date();
                     t[n] = t[n] + (et - st);
                     ++count;
                  }
                  t[n] /= 1000;
                  forge.log.debug(cat,
                     output[n], (count*s[n]/t[n]/1000) + 'k/sec');
               }, 0);
            }(n);
         }
      };

      // TODO: follow the same format as the hash tests
      var aes_128 = function()
      {
         forge.log.debug(cat, 'running AES-128 for 5 seconds...');

         var block = [];
         block.push(0x00112233);
         block.push(0x44556677);
         block.push(0x8899aabb);
         block.push(0xccddeeff);

         var key = [];
         key.push(0x00010203);
         key.push(0x04050607);
         key.push(0x08090a0b);
         key.push(0x0c0d0e0f);

         setTimeout(function()
         {
            // run for 5 seconds
            var start = +new Date();
	         var now;
	         var totalEncrypt = 0;
	         var totalDecrypt = 0;
	         var count = 0;
            var passed = 0;
	         while(passed < 5000)
	         {
	            var output = [];
	            var w = forge.aes._expandKey(key, false);
	            now = +new Date();
	            forge.aes._updateBlock(w, block, output, false);
	            totalEncrypt += +new Date() - now;

	            block = output;
	            output = [];
	            w = forge.aes._expandKey(key, true);
	            now = +new Date();
	            forge.aes._updateBlock(w, block, output, true);
	            totalDecrypt += +new Date() - now;

               ++count;
	            passed = +new Date() - start;
	         }

	         count = count * 16 / 1000;
	         totalEncrypt /= 1000;
	         totalDecrypt /= 1000;
	         forge.log.debug(cat, 'times in 1000s of bytes/sec processed.');
	         forge.log.debug(cat,
	   	      'encrypt: ' + (count*16 / totalEncrypt) + ' k/sec');
	         forge.log.debug(cat,
	   	      'decrypt: ' + (count*16 / totalDecrypt) + ' k/sec');
         }, 0);
      };

      // TODO: follow the same format as the hash tests
      var aes_128_cbc = function()
      {
         forge.log.debug(cat, 'running AES-128 CBC for 5 seconds...');

         var key = forge.random.getBytes(16);
         var iv = forge.random.getBytes(16);
         var plain = forge.random.getBytes(16);

         setTimeout(function()
         {
            // run for 5 seconds
            var start = +new Date();
	         var now;
	         var totalEncrypt = 0;
	         var totalDecrypt = 0;
	         var cipher;
	         var count = 0;
	         var passed = 0;
	         while(passed < 5000)
	         {
               var input = forge.util.createBuffer(plain);

               // encrypt, only measuring update() and finish()
               cipher = forge.aes.startEncrypting(key, iv);
               now = +new Date();
               cipher.update(input);
               cipher.finish();
               totalEncrypt += +new Date() - now;

               // decrypt, only measuring update() and finish()
               var ct = cipher.output;
               cipher = forge.aes.startDecrypting(key, iv);
               now = +new Date();
               cipher.update(ct);
               cipher.finish();
               totalDecrypt += +new Date() - now;

               ++count;
               passed = +new Date() - start;
	         }

	         // 32 bytes encrypted because of 16 bytes of padding
	         count = count * 32 / 1000;
            totalEncrypt /= 1000;
            totalDecrypt /= 1000;
            forge.log.debug(cat, 'times in 1000s of bytes/sec processed.');
            forge.log.debug(cat,
               'encrypt: ' + (count / totalEncrypt) + ' k/sec');
            forge.log.debug(cat,
               'decrypt: ' + (count / totalDecrypt) + ' k/sec');
         }, 0);
      };

      //]]>
      </script>
   </head>
   <body>
      <div class="nav"><a href="index.html">Forge Tests</a> / Performance</div>

      <div class="header">
         <h1>Performance Tests</h1>
      </div>

      <div class="content">

         <fieldset class="section">
            <ul>
               <li>Use the controls below to run Forge performance tests.</li>
               <li>You currently need a JavaScript console to view the output.</li>
            </ul>
         </fieldset>

         <fieldset class="section">
            <legend>Tests</legend>

         <div id="random_controls">
            <button id="random" onclick="javascript:return test_random();">paint random</button>
            <button id="clear" onclick="javascript:return canvas_clear();">clear</button>
         </div>
         <canvas id="canvas" width="100" height="100"></canvas>
         <div id="buffer_controls">
            <button id="buffer_fill" onclick="javascript:return test_buffer_fill();">buffer fill</button>
            <button id="buffer_xor" onclick="javascript:return test_buffer_xor();">buffer xor</button>
         </div>
         <div id="base64_controls">
            <button id="base64_encode" onclick="javascript:return test_base64_encode();">base64 encode</button>
            <button id="base64_decode" onclick="javascript:return test_base64_decode();">base64 decode</button>
         </div>
         <div id="hash_controls">
            <button id="md5" onclick="javascript:return test_md5();">md5</button>
            <button id="sha1" onclick="javascript:return test_sha1();">sha1</button>
            <button id="sha256" onclick="javascript:return test_sha256();">sha256</button>
         </div>
         <div id="aes_controls">
            <button id="aes_128" onclick="javascript:return aes_128();">aes-128</button>
            <button id="aes_128_cbc" onclick="javascript:return aes_128_cbc();">aes-128 cbc</button>
         </div>
         </fieldset>
      </div>
   </body>
</html>
