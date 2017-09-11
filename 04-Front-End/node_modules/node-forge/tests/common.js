/**
 * Forge Common Tests
 *
 * @author Dave Longley
 *
 * Copyright (c) 2009-2012 Digital Bazaar, Inc. All rights reserved.
 */
jQuery(function($)
{
   // logging category
   var cat = 'forge.tests.common';

   // local alias
   var forge = window.forge;

   var tests = [];
   var passed = 0;
   var failed = 0;

   var init = function()
   {
      passed = failed = 0;
      $('.ready,.testing,.pass,.fail')
         .removeClass('ready testing pass fail');
      $('#status')
         .text('Ready.')
         .addClass('ready');
      $('#total').text(tests.length);
      $('#pass').text(passed);
      $('#fail').text(failed);
      $('.expect').empty();
      $('.result').empty();
      $('.time').empty();
      $('.timePer').empty();
      $('#start').attr('disabled', '');
   };

   var start = function()
   {
      $('#start').attr('disabled', 'true');
      // meta! use tasks to run the task tests
      forge.task.start({
         type: 'test',
         run: function(task) {
            task.next('starting', function(task) {
               forge.log.debug(cat, 'start');
               $('#status')
                  .text('Testing...')
                  .addClass('testing')
                  .removeClass('idle');
            });
            $.each(tests, function(i, test) {
               task.next('test', function(task) {
                  var title = $('li:first', test.container);
                  if($('#scroll:checked').length === 1)
                  {
                     $('html,body').animate({scrollTop: title.offset().top});
                  }
                  title.addClass('testing');
                  test.run(task, test);
               });
               task.next('test', function(task) {
                  $('li:first', test.container).removeClass('testing');
               });
            });
            task.next('success', function(task) {
               forge.log.debug(cat, 'done');
               if(failed === 0) {
                  $('#status')
                     .text('PASS')
                     .addClass('pass')
                     .removeClass('testing');
               } else {
                  // FIXME: should just be hitting failure() below
                  $('#status')
                     .text('FAIL')
                     .addClass('fail')
                     .removeClass('testing');
               }
            });
         },
         failure: function() {
            $('#status')
               .text('FAIL')
               .addClass('fail')
               .removeClass('testing');
         }
      });
   };

   $('#start').click(function() {
      start();
   });

   $('#reset').click(function() {
      init();
   });

   $('#keygen').click(function() {
      var bits = $('#bits')[0].value;
      var keys = forge.pki.rsa.generateKeyPair(bits);
      forge.log.debug(cat, 'generating ' + bits + '-bit RSA key-pair...');
      setTimeout(function()
      {
         forge.log.debug(cat, 'private key:', keys.privateKey);
         forge.log.debug(cat, forge.pki.privateKeyToPem(keys.privateKey));
         forge.log.debug(cat, 'public key:', keys.publicKey);
         forge.log.debug(cat, forge.pki.publicKeyToPem(keys.publicKey));

         forge.log.debug(cat, 'testing sign/verify...');
         setTimeout(function()
         {
            // do sign/verify test
            try
            {
               var md = forge.md.sha1.create();
               md.update('foo');
               var signature = keys.privateKey.sign(md);
               keys.publicKey.verify(md.digest().getBytes(), signature);
               forge.log.debug(cat, 'sign/verify success');
            }
            catch(ex)
            {
               forge.log.error(cat, 'sign/verify failure', ex);
            }
         }, 0);
      }, 0);
   });

   $('#certgen').click(function() {
      var bits = $('#bits')[0].value;
      forge.log.debug(cat, 'generating ' + bits +
         '-bit RSA key-pair and certificate...');
      setTimeout(function()
      {
         try
         {
            var keys = forge.pki.rsa.generateKeyPair(bits);
            var cert = forge.pki.createCertificate();
            cert.serialNumber = '01';
            cert.validity.notBefore = new Date();
            cert.validity.notAfter = new Date();
            cert.validity.notAfter.setFullYear(
               cert.validity.notBefore.getFullYear() + 1);
            var attrs = [{
               name: 'commonName',
               value: 'mycert'
            }, {
               name: 'countryName',
               value: 'US'
            }, {
               shortName: 'ST',
               value: 'Virginia'
            }, {
               name: 'localityName',
               value: 'Blacksburg'
            }, {
               name: 'organizationName',
               value: 'Test'
            }, {
               shortName: 'OU',
               value: 'Test'
            }];
            cert.setSubject(attrs);
            cert.setIssuer(attrs);
            cert.setExtensions([{
               name: 'basicConstraints',
               cA: true
            }, {
               name: 'keyUsage',
               keyCertSign: true
            }, {
               name: 'subjectAltName',
               altNames: [{
                  type: 6, // URI
                  value: 'http://localhost/dataspace/person/myname#this'
               }]
            }]);
            // FIXME: add subjectKeyIdentifier extension
            // FIXME: add authorityKeyIdentifier extension
            cert.publicKey = keys.publicKey;

            // self-sign certificate
            cert.sign(keys.privateKey);

            forge.log.debug(cat, 'certificate:', cert);
            //forge.log.debug(cat,
            //   forge.asn1.prettyPrint(forge.pki.certificateToAsn1(cert)));
            forge.log.debug(cat, forge.pki.certificateToPem(cert));

            // verify certificate
            forge.log.debug(cat, 'verified', cert.verify(cert));
         }
         catch(ex)
         {
            forge.log.error(cat, ex, ex.message ? ex.message : '');
         }
      }, 0);
   });

   var addTest = function(name, run)
   {
      var container = $('<ul><li>Test ' + name + '</li><ul/></ul>');
      var expect = $('<li>Expect: <span class="expect"/></li>');
      var result = $('<li>Result: <span class="result"/></li>');
      var time = $('<li>Time: <span class="time"/></li>');
      var timePer = $('<li>Time Per Iteration: <span class="timePer"/></li>');
      $('ul', container)
         .append(expect)
         .append(result)
         .append(time)
         .append(timePer);
      $('#tests').append(container);
      var test = {
         container: container,
         startTime: null,
         run: function(task, test) {
            test.startTime = new Date();
            run(task, test);
         },
         expect: $('span', expect),
         result: $('span', result),
         check: function() {
            var e = test.expect.text();
            var r = test.result.text();
            (e == r) ? test.pass() : test.fail();
         },
         pass: function(iterations) {
            var dt = new Date() - test.startTime;
            if(!iterations)
            {
               iterations = 1;
            }
            var dti = (dt / iterations);
            passed += 1;
            $('#pass').text(passed);
            $('li:first', container).addClass('pass');
            $('span.time', container).html(dt + 'ms');
            $('span.timePer', container).html(dti + 'ms');
         },
         fail: function(iterations) {
            var dt = new Date() - test.startTime;
            if(!iterations)
            {
               iterations = 1;
            }
            var dti = (dt / iterations);
            failed += 1;
            $('#fail').text(failed);
            $('li:first', container).addClass('fail');
            $('span.time', container).html(dt + 'ms');
            $('span.timePer', container).html(dti + 'ms');
         }
      };
      tests.push(test);
   };

   addTest('buffer put bytes', function(task, test)
   {
      ba = forge.util.createBuffer();
      ba.putByte(1);
      ba.putByte(2);
      ba.putByte(3);
      ba.putByte(4);
      ba.putInt32(4);
      ba.putByte(1);
      ba.putByte(2);
      ba.putByte(3);
      ba.putInt32(4294967295);
      var hex = ba.toHex();
      var bytes = [];
      while(ba.length() > 0)
      {
         bytes.push(ba.getByte());
      }
      var expect = [1, 2, 3, 4, 0, 0, 0, 4, 1, 2, 3, 255, 255, 255, 255];
      var exHex = '0102030400000004010203ffffffff';
      test.expect.html(exHex);
      test.result.html(hex);

      test.check();
   });

   addTest('buffer from hex', function(task, test)
   {
      var exHex = '0102030400000004010203ffffffff';
      test.expect.html(exHex);

      var buf = forge.util.createBuffer();
      buf.putBytes(forge.util.hexToBytes(exHex));
      test.result.html(buf.toHex());

      test.check();
   });

   addTest('base64 encode', function(task, test)
   {
      var s1 = '00010203050607080A0B0C0D0F1011121415161719';
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
      test.expect.html(s2);

      var out = forge.util.encode64(s1);
      test.result.html(out);

      test.check();
   });

   addTest('base64 decode', function(task, test)
   {
      var s1 = '00010203050607080A0B0C0D0F1011121415161719';
      var s2 = 'MDAwMTAyMDMwNTA2MDcwODBBMEIwQzBEMEYxMDExMTIxNDE1MTYxNzE5';
      test.expect.html(s1);

      var out = forge.util.decode64(s2);
      test.result.html(out);

      test.check();
   });

   addTest('md5 empty', function(task, test)
   {
      var expect = 'd41d8cd98f00b204e9800998ecf8427e';
      test.expect.html(expect);
      var md = forge.md.md5.create();
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('md5 "abc"', function(task, test)
   {
      var expect = '900150983cd24fb0d6963f7d28e17f72';
      test.expect.html(expect);
      var md = forge.md.md5.create();
      md.update('abc');
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('md5 "The quick brown fox jumps over the lazy dog"',
      function(task, test)
   {
      var expect = '9e107d9d372bb6826bd81d3542a419d6';
      test.expect.html(expect);
      var md = forge.md.md5.create();
      md.start();
      md.update('The quick brown fox jumps over the lazy dog');
      test.result.html(md.digest().toHex());
      test.check();
   });

   // c'è
   addTest('md5 "c\'\u00e8"', function(task, test)
   {
      var expect = '8ef7c2941d78fe89f31e614437c9db59';
      test.expect.html(expect);
      var md = forge.md.md5.create();
      md.update("c'\u00e8", 'utf8');
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('md5 "THIS IS A MESSAGE"',
   function(task, test)
   {
      var expect = '78eebfd9d42958e3f31244f116ab7bbe';
      test.expect.html(expect);
      var md = forge.md.md5.create();
      md.start();
      md.update('THIS IS ');
      md.update('A MESSAGE');
      // do twice to check continuing digest
      test.result.html(md.digest().toHex());
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('md5 long message',
   function(task, test)
   {
      var input = forge.util.createBuffer();
      input.putBytes(forge.util.hexToBytes(
         '0100002903018d32e9c6dc423774c4c39a5a1b78f44cc2cab5f676d39' +
         'f703d29bfa27dfeb870000002002f0100'));
      input.putBytes(forge.util.hexToBytes(
         '0200004603014c2c1e835d39da71bc0857eb04c2b50fe90dbb2a8477f' +
         'e7364598d6f0575999c20a6c7248c5174da6d03ac711888f762fc4ed5' +
         '4f7254b32273690de849c843073d002f00'));
      input.putBytes(forge.util.hexToBytes(
         '0b0003d20003cf0003cc308203c8308202b0a003020102020100300d0' +
         '6092a864886f70d0101050500308186310b3009060355040613025553' +
         '311d301b060355040a13144469676974616c2042617a6161722c20496' +
         'e632e31443042060355040b133b4269746d756e6b206c6f63616c686f' +
         '73742d6f6e6c7920436572746966696361746573202d20417574686f7' +
         '2697a6174696f6e207669612042545031123010060355040313096c6f' +
         '63616c686f7374301e170d3130303231343137303931395a170d32303' +
         '03231333137303931395a308186310b3009060355040613025553311d' +
         '301b060355040a13144469676974616c2042617a6161722c20496e632' +
         'e31443042060355040b133b4269746d756e6b206c6f63616c686f7374' +
         '2d6f6e6c7920436572746966696361746573202d20417574686f72697' +
         'a6174696f6e207669612042545031123010060355040313096c6f6361' +
         '6c686f737430820122300d06092a864886f70d01010105000382010f0' +
         '03082010a0282010100dc436f17d6909d8a9d6186ea218eb5c86b848b' +
         'ae02219bd56a71203daf07e81bc19e7e98134136bcb012881864bf03b' +
         '3774652ad5eab85dba411a5114ffeac09babce75f31314345512cd87c' +
         '91318b2e77433270a52185fc16f428c3ca412ad6e9484bc2fb87abb4e' +
         '8fb71bf0f619e31a42340b35967f06c24a741a31c979c0bb8921a90a4' +
         '7025fbeb8adca576979e70a56830c61170c9647c18c0794d68c0df38f' +
         '3aac5fc3b530e016ea5659715339f3f3c209cdee9dbe794b5af92530c' +
         '5754c1d874b78974bfad994e0dfc582275e79feb522f6e4bcc2b2945b' +
         'aedfb0dbdaebb605f9483ff0bea29ecd5f4d6f2769965d1b3e04f8422' +
         '716042680011ff676f0203010001a33f303d300c0603551d130101ff0' +
         '4023000300e0603551d0f0101ff0404030204f0301d0603551d250416' +
         '301406082b0601050507030106082b06010505070302300d06092a864' +
         '886f70d010105050003820101009c4562be3f2d8d8e388085a697f2f1' +
         '06eaeff4992a43f198fe3dcf15c8229cf1043f061a38204f73d86f4fb' +
         '6348048cc5279ed719873aa10e3773d92b629c2c3fcce04012c81ba3b' +
         '4ec451e9644ec5191078402d845e05d02c7b4d974b4588276e5037aba' +
         '7ef26a8bddeb21e10698c82f425e767dc401adf722fa73ab78cfa069b' +
         'd69052d7ca6a75cc9225550e315d71c5f8764362ea4dbc6ecb837a847' +
         '1043c5a7f826a71af145a053090bd4bccca6a2c552841cdb1908a8352' +
         'f49283d2e641acdef667c7543af441a16f8294251e2ac376fa507b53a' +
         'e418dd038cd20cef1e7bfbf5ae03a7c88d93d843abaabbdc5f3431132' +
         'f3e559d2dd414c3eda38a210b8'));
      input.putBytes(forge.util.hexToBytes('0e000000'));
      input.putBytes(forge.util.hexToBytes(
         '10000102010026a220b7be857402819b78d81080d01a682599bbd0090' +
         '2985cc64edf8e520e4111eb0e1729a14ffa3498ca259cc9ad6fc78fa1' +
         '30d968ebdb78dc0b950c0aa44355f13ba678419185d7e4608fe178ca6' +
         'b2cef33e4193778d1a70fe4d0dfcb110be4bbb4dbaa712177655728f9' +
         '14ab4c0f6c4aef79a46b3d996c82b2ebe9ed1748eb5cace7dc44fb67e' +
         '73f452a047f2ed199b3d50d5db960acf03244dc8efa4fc129faf8b65f' +
         '9e52e62b5544722bd17d2358e817a777618a4265a3db277fc04851a82' +
         'a91fe6cdcb8127f156e0b4a5d1f54ce2742eb70c895f5f8b85f5febe6' +
         '9bc73e891f9280826860a0c2ef94c7935e6215c3c4cd6b0e43e80cca3' +
         '96d913d36be'));

      var expect = 'd15a2da0e92c3da55dc573f885b6e653';
      test.expect.html(expect);

      var md = forge.md.md5.create();
      md.start();
      md.update(input.getBytes());
      test.result.html(md.digest().toHex());

      test.check();
   });

   addTest('sha-1 empty', function(task, test)
   {
      var expect = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
      test.expect.html(expect);
      var md = forge.md.sha1.create();
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('sha-1 "abc"', function(task, test)
   {
      var expect = 'a9993e364706816aba3e25717850c26c9cd0d89d';
      test.expect.html(expect);
      var md = forge.md.sha1.create();
      md.update('abc');
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('sha-1 "The quick brown fox jumps over the lazy dog"',
      function(task, test)
   {
      var expect = '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12';
      test.expect.html(expect);
      var md = forge.md.sha1.create();
      md.start();
      md.update('The quick brown fox jumps over the lazy dog');
      test.result.html(md.digest().toHex());
      test.check();
   });

   // c'è
   addTest('sha-1 "c\'\u00e8"', function(task, test)
   {
      var expect = '98c9a3f804daa73b68a5660d032499a447350c0d';
      test.expect.html(expect);
      var md = forge.md.sha1.create();
      md.update("c'\u00e8", 'utf8');
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('sha-1 "THIS IS A MESSAGE"',
   function(task, test)
   {
      var expect = '5f24f4d6499fd2d44df6c6e94be8b14a796c071d';
      test.expect.html(expect);
      var md = forge.md.sha1.create();
      md.start();
      md.update('THIS IS ');
      md.update('A MESSAGE');
      // do twice to check continuing digest
      test.result.html(md.digest().toHex());
      test.result.html(md.digest().toHex());
      test.check();
   });

   // other browsers too slow for this test
   if($.browser.webkit)
   {
      addTest('sha-1 long message',
      function(task, test)
      {
         var expect = '34aa973cd4c4daa4f61eeb2bdbad27316534016f';
         test.expect.html(expect);
         var md = forge.md.sha1.create();
         md.start();
         md.update(forge.util.fillString('a', 1000000));
         // do twice to check continuing digest
         test.result.html(md.digest().toHex());
         test.result.html(md.digest().toHex());
         test.check();
      });
   }

   addTest('sha-256 "abc"', function(task, test)
   {
      var expect =
         'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
      test.expect.html(expect);
      var md = forge.md.sha256.create();
      md.update('abc');
      test.result.html(md.digest().toHex());
      test.check();
   });

   // c'è
   addTest('sha-256 "c\'\u00e8"', function(task, test)
   {
      var expect =
         '1aa15c717afffd312acce2217ce1c2e5dabca53c92165999132ec9ca5decdaca';
      test.expect.html(expect);
      var md = forge.md.sha256.create();
      md.update("c'\u00e8", 'utf8');
      test.result.html(md.digest().toHex());
      test.check();
   });

   addTest('sha-256 "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"',
   function(task, test)
   {
      var expect =
         '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1';
      test.expect.html(expect);
      var md = forge.md.sha256.create();
      md.start();
      md.update('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq');
      test.result.html(md.digest().toHex());
      test.check();
   });

   // other browsers too slow for this test
   if($.browser.webkit)
   {
      addTest('sha-256 long message',
      function(task, test)
      {
         var expect =
            'cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0';
         test.expect.html(expect);
         var md = forge.md.sha256.create();
         md.start();
         md.update(forge.util.fillString('a', 1000000));
         // do twice to check continuing digest
         test.result.html(md.digest().toHex());
         test.result.html(md.digest().toHex());
         test.check();
      });
   }

   addTest('hmac md5 "Hi There", 16-byte key', function(task, test)
   {
      var expect = '9294727a3638bb1c13f48ef8158bfc9d';
      test.expect.html(expect);
      var key = forge.util.hexToBytes(
         '0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b');
      var hmac = forge.hmac.create();
      hmac.start('MD5', key);
      hmac.update('Hi There');
      test.result.html(hmac.digest().toHex());
      test.check();
   });

   addTest('hmac md5 "what do ya want for nothing?", "Jefe" key',
      function(task, test)
   {
      var expect = '750c783e6ab0b503eaa86e310a5db738';
      test.expect.html(expect);
      var hmac = forge.hmac.create();
      hmac.start('MD5', 'Jefe');
      hmac.update('what do ya want for nothing?');
      test.result.html(hmac.digest().toHex());
      test.check();
   });

   addTest('hmac md5 "Test Using Larger Than Block-Size Key - ' +
      'Hash Key First", 80-byte key', function(task, test)
   {
      var expect = '6b1ab7fe4bd7bf8f0b62e6ce61b9d0cd';
      test.expect.html(expect);
      var key = forge.util.hexToBytes(
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      var hmac = forge.hmac.create();
      hmac.start('MD5', key);
      hmac.update('Test Using Larger Than Block-Size Key - Hash Key First');
      test.result.html(hmac.digest().toHex());
      test.check();
   });

   addTest('hmac sha-1 "Hi There", 20-byte key', function(task, test)
   {
      var expect = 'b617318655057264e28bc0b6fb378c8ef146be00';
      test.expect.html(expect);
      var key = forge.util.hexToBytes(
         '0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b');
      var hmac = forge.hmac.create();
      hmac.start('SHA1', key);
      hmac.update('Hi There');
      test.result.html(hmac.digest().toHex());
      test.check();
   });

   addTest('hmac sha-1 "what do ya want for nothing?", "Jefe" key',
      function(task, test)
   {
      var expect = 'effcdf6ae5eb2fa2d27416d5f184df9c259a7c79';
      test.expect.html(expect);
      var hmac = forge.hmac.create();
      hmac.start('SHA1', 'Jefe');
      hmac.update('what do ya want for nothing?');
      test.result.html(hmac.digest().toHex());
      test.check();
   });

   addTest('hmac sha-1 "Test Using Larger Than Block-Size Key - ' +
      'Hash Key First", 80-byte key', function(task, test)
   {
      var expect = 'aa4ae5e15272d00e95705637ce8a3b55ed402112';
      test.expect.html(expect);
      var key = forge.util.hexToBytes(
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      var hmac = forge.hmac.create();
      hmac.start('SHA1', key);
      hmac.update('Test Using Larger Than Block-Size Key - Hash Key First');
      test.result.html(hmac.digest().toHex());
      test.check();
   });

   addTest('pbkdf2 hmac-sha-1 c=1', function(task, test)
   {
      var expect = '0c60c80f961f0e71f3a9b524af6012062fe037a6';
      var dk = forge.pkcs5.pbkdf2('password', 'salt', 1, 20);
      test.expect.html(expect);
      test.result.html(forge.util.bytesToHex(dk));
      test.check();
   });

   addTest('pbkdf2 hmac-sha-1 c=2', function(task, test)
   {
      var expect = 'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957';
      var dk = forge.pkcs5.pbkdf2('password', 'salt', 2, 20);
      test.expect.html(expect);
      test.result.html(forge.util.bytesToHex(dk));
      test.check();
   });

   addTest('pbkdf2 hmac-sha-1 c=2', function(task, test)
   {
      var expect = 'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957';
      var dk = forge.pkcs5.pbkdf2('password', 'salt', 2, 20);
      test.expect.html(expect);
      test.result.html(forge.util.bytesToHex(dk));
      test.check();
   });

   addTest('pbkdf2 hmac-sha-1 c=5 keylen=8', function(task, test)
   {
      var expect = 'd1daa78615f287e6';
      var salt = forge.util.hexToBytes('1234567878563412');
      var dk = forge.pkcs5.pbkdf2('password', salt, 5, 8);
      test.expect.html(expect);
      test.result.html(forge.util.bytesToHex(dk));
      test.check();
   });

   // other browsers too slow for this test
   if($.browser.webkit)
   {
      addTest('pbkdf2 hmac-sha-1 c=4096', function(task, test)
      {
         var expect = '4b007901b765489abead49d926f721d065a429c1';
         var dk = forge.pkcs5.pbkdf2('password', 'salt', 4096, 20);
         test.expect.html(expect);
         test.result.html(forge.util.bytesToHex(dk));
         test.check();
      });
   }

   /* too slow for javascript
   addTest('pbkdf2 hmac-sha-1 c=16777216', function(task, test)
   {
      var expect = 'eefe3d61cd4da4e4e9945b3d6ba2158c2634e984';
      var dk = forge.pkcs5.pbkdf2('password', 'salt', 16777216, 20);
      test.expect.html(expect);
      test.result.html(forge.util.bytesToHex(dk));
      test.check();
   });*/

   addTest('aes-128 encrypt', function(task, test)
   {
      var block = [];
      block.push(0x00112233);
      block.push(0x44556677);
      block.push(0x8899aabb);
      block.push(0xccddeeff);
      var plain = block;

      var key = [];
      key.push(0x00010203);
      key.push(0x04050607);
      key.push(0x08090a0b);
      key.push(0x0c0d0e0f);

      var expect = [];
      expect.push(0x69c4e0d8);
      expect.push(0x6a7b0430);
      expect.push(0xd8cdb780);
      expect.push(0x70b4c55a);

      test.expect.html('69c4e0d86a7b0430d8cdb78070b4c55a');

      var output = [];
      var w = forge.aes._expandKey(key, false);
      forge.aes._updateBlock(w, block, output, false);

      var out = forge.util.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);
      test.result.html(out.toHex());

      test.check();
   });

   addTest('aes-128 decrypt', function(task, test)
   {
      var block = [];
      block.push(0x69c4e0d8);
      block.push(0x6a7b0430);
      block.push(0xd8cdb780);
      block.push(0x70b4c55a);

      var key = [];
      key.push(0x00010203);
      key.push(0x04050607);
      key.push(0x08090a0b);
      key.push(0x0c0d0e0f);

      var expect = [];
      expect.push(0x00112233);
      expect.push(0x44556677);
      expect.push(0x8899aabb);
      expect.push(0xccddeeff);

      test.expect.html('00112233445566778899aabbccddeeff');

      var output = [];
      w = forge.aes._expandKey(key, true);
      forge.aes._updateBlock(w, block, output, true);

      var out = forge.util.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);
      test.result.html(out.toHex());

      test.check();
   });

   addTest('aes-192 encrypt', function(task, test)
   {
      var block = [];
      block.push(0x00112233);
      block.push(0x44556677);
      block.push(0x8899aabb);
      block.push(0xccddeeff);
      var plain = block;

      var key = [];
      key.push(0x00010203);
      key.push(0x04050607);
      key.push(0x08090a0b);
      key.push(0x0c0d0e0f);
      key.push(0x10111213);
      key.push(0x14151617);

      var expect = [];
      expect.push(0xdda97ca4);
      expect.push(0x864cdfe0);
      expect.push(0x6eaf70a0);
      expect.push(0xec0d7191);

      test.expect.html('dda97ca4864cdfe06eaf70a0ec0d7191');

      var output = [];
      var w = forge.aes._expandKey(key, false);
      forge.aes._updateBlock(w, block, output, false);

      var out = forge.util.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);
      test.result.html(out.toHex());

      test.check();
   });

   addTest('aes-192 decrypt', function(task, test)
   {
      var block = [];
      block.push(0xdda97ca4);
      block.push(0x864cdfe0);
      block.push(0x6eaf70a0);
      block.push(0xec0d7191);

      var key = [];
      key.push(0x00010203);
      key.push(0x04050607);
      key.push(0x08090a0b);
      key.push(0x0c0d0e0f);
      key.push(0x10111213);
      key.push(0x14151617);

      var expect = [];
      expect.push(0x00112233);
      expect.push(0x44556677);
      expect.push(0x8899aabb);
      expect.push(0xccddeeff);

      test.expect.html('00112233445566778899aabbccddeeff');

      var output = [];
      w = forge.aes._expandKey(key, true);
      forge.aes._updateBlock(w, block, output, true);

      var out = forge.util.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);
      test.result.html(out.toHex());

      test.check();
   });

   addTest('aes-256 encrypt', function(task, test)
   {
      var block = [];
      block.push(0x00112233);
      block.push(0x44556677);
      block.push(0x8899aabb);
      block.push(0xccddeeff);
      var plain = block;

      var key = [];
      key.push(0x00010203);
      key.push(0x04050607);
      key.push(0x08090a0b);
      key.push(0x0c0d0e0f);
      key.push(0x10111213);
      key.push(0x14151617);
      key.push(0x18191a1b);
      key.push(0x1c1d1e1f);

      var expect = [];
      expect.push(0x8ea2b7ca);
      expect.push(0x516745bf);
      expect.push(0xeafc4990);
      expect.push(0x4b496089);

      test.expect.html('8ea2b7ca516745bfeafc49904b496089');

      var output = [];
      var w = forge.aes._expandKey(key, false);
      forge.aes._updateBlock(w, block, output, false);

      var out = forge.util.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);
      test.result.html(out.toHex());

      test.check();
   });

   addTest('aes-256 decrypt', function(task, test)
   {
      var block = [];
      block.push(0x8ea2b7ca);
      block.push(0x516745bf);
      block.push(0xeafc4990);
      block.push(0x4b496089);

      var key = [];
      key.push(0x00010203);
      key.push(0x04050607);
      key.push(0x08090a0b);
      key.push(0x0c0d0e0f);
      key.push(0x10111213);
      key.push(0x14151617);
      key.push(0x18191a1b);
      key.push(0x1c1d1e1f);

      var expect = [];
      expect.push(0x00112233);
      expect.push(0x44556677);
      expect.push(0x8899aabb);
      expect.push(0xccddeeff);

      test.expect.html('00112233445566778899aabbccddeeff');

      var output = [];
      w = forge.aes._expandKey(key, true);
      forge.aes._updateBlock(w, block, output, true);

      var out = forge.util.createBuffer();
      out.putInt32(output[0]);
      out.putInt32(output[1]);
      out.putInt32(output[2]);
      out.putInt32(output[3]);
      test.result.html(out.toHex());

      test.check();
   });

   (function()
   {
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

      for(var i = 0; i < keys.length; ++i)
      {
         (function(i)
         {
            var key = forge.util.hexToBytes(keys[i]);
            var iv = forge.util.hexToBytes(ivs[i]);
            var input = (i & 1) ? forge.util.hexToBytes(inputs[i]) : inputs[i];
            var output = forge.util.hexToBytes(outputs[i]);

            addTest('aes-128 cbc encrypt', function(task, test)
            {
               // encrypt w/no padding
               test.expect.html(outputs[i]);
               var cipher = forge.aes.createEncryptionCipher(key);
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(input));
               cipher.finish(function(){return true;});
               test.result.html(cipher.output.toHex());
               test.check();
            });

            addTest('aes-128 cbc decrypt', function(task, test)
            {
               // decrypt w/no padding
               test.expect.html(inputs[i]);
               var cipher = forge.aes.createDecryptionCipher(key);
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(output));
               cipher.finish(function(){return true;});
               var out = (i & 1) ?
                  cipher.output.toHex() : cipher.output.bytes();
               test.result.html(out);
               test.check();
            });
         })(i);
      }
   })();

   (function()
   {
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

      for(var i = 0; i < keys.length; ++i)
      {
         (function(i)
         {
            var key = forge.util.hexToBytes(keys[i]);
            var iv = forge.util.hexToBytes(ivs[i]);
            var input = (i !== 5) ?
               forge.util.hexToBytes(inputs[i]) : inputs[i];
            var output = forge.util.hexToBytes(outputs[i]);

            addTest('aes-128 cfb encrypt', function(task, test)
            {
               // encrypt
               test.expect.html(outputs[i]);
               var cipher = forge.aes.createEncryptionCipher(key, 'CFB');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(input));
               cipher.finish();
               test.result.html(cipher.output.toHex());
               test.check();
            });

            addTest('aes-128 cfb decrypt', function(task, test)
            {
               // decrypt
               test.expect.html(inputs[i]);
               var cipher = forge.aes.createDecryptionCipher(key, 'CFB');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(output));
               cipher.finish();
               var out = (i !== 5) ?
                 cipher.output.toHex() : cipher.output.getBytes();
               test.result.html(out);
               test.check();
            });
         })(i);
      }
   })();

   (function()
   {
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

      for(var i = 0; i < keys.length; ++i)
      {
         (function(i)
         {
            var key = forge.util.hexToBytes(keys[i]);
            var iv = forge.util.hexToBytes(ivs[i]);
            var input = inputs[i];
            var output = forge.util.hexToBytes(outputs[i]);

            addTest('aes-256 cfb encrypt', function(task, test)
            {
               // encrypt
               test.expect.html(outputs[i]);
               var cipher = forge.aes.createEncryptionCipher(key, 'CFB');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(input));
               cipher.finish();
               test.result.html(cipher.output.toHex());
               test.check();
            });

            addTest('aes-256 cfb decrypt', function(task, test)
            {
               // decrypt
               test.expect.html(inputs[i]);
               var cipher = forge.aes.createDecryptionCipher(key, 'CFB');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(output));
               cipher.finish();
               var out = cipher.output.getBytes();
               test.result.html(out);
               test.check();
            });
         })(i);
      }
   })();

   (function()
   {
      var keys = [
         '00000000000000000000000000000000',
         '00000000000000000000000000000000'
      ];

      var ivs = [
         '80000000000000000000000000000000',
         'c8ca0d6a35dbeac776e911ee16bea7d3'
      ];

      var inputs = [
         '00000000000000000000000000000000',
         'This is a 48-byte message (exactly 3 AES blocks)'
      ];

      var outputs = [
         '3ad78e726c1ec02b7ebfe92b23d9ec34',
         '39c0190727a76b2a90963426f63689cf' +
           'cdb8a2be8e20c5e877a81a724e3611f6' +
           '2ecc386f2e941b2441c838906002be19'
      ];

      for(var i = 0; i < keys.length; ++i)
      {
         (function(i)
         {
            var key = forge.util.hexToBytes(keys[i]);
            var iv = forge.util.hexToBytes(ivs[i]);
            var input = (i !== 1) ?
               forge.util.hexToBytes(inputs[i]) : inputs[i];
            var output = forge.util.hexToBytes(outputs[i]);

            addTest('aes-128 ofb encrypt', function(task, test)
            {
               // encrypt w/no padding
               test.expect.html(outputs[i]);
               var cipher = forge.aes.createEncryptionCipher(key, 'OFB');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(input));
               cipher.finish(function(){return true;});
               test.result.html(cipher.output.toHex());
               test.check();
            });

            addTest('aes-128 ofb decrypt', function(task, test)
            {
               // decrypt w/no padding
               test.expect.html(inputs[i]);
               var cipher = forge.aes.createDecryptionCipher(key, 'OFB');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(output));
               cipher.finish(function(){return true;});
               var out = (i !== 1) ?
                 cipher.output.toHex() : cipher.output.getBytes();
               test.result.html(out);
               test.check();
            });
         })(i);
      }
   })();

   (function()
   {
      var keys = [
         '00000000000000000000000000000000',
         '2b7e151628aed2a6abf7158809cf4f3c'
      ];

      var ivs = [
         '650cdb80ff9fc758342d2bd99ee2abcf',
         'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff'
      ];

      var inputs = [
         'This is a 48-byte message (exactly 3 AES blocks)',
         '6bc1bee22e409f96e93d7e117393172a'
      ];

      var outputs = [
         '5ede11d00e9a76ec1d5e7e811ea3dd1c' +
           'e09ee941210f825d35718d3282796f1c' +
           '07c3f1cb424f2b365766ab5229f5b5a4',
         '874d6191b620e3261bef6864990db6ce'
      ];

      for(var i = 0; i < keys.length; ++i)
      {
         (function(i)
         {
            var key = forge.util.hexToBytes(keys[i]);
            var iv = forge.util.hexToBytes(ivs[i]);
            var input = (i !== 0) ?
               forge.util.hexToBytes(inputs[i]) : inputs[i];
            var output = forge.util.hexToBytes(outputs[i]);

            addTest('aes-128 ctr encrypt', function(task, test)
            {
               // encrypt w/no padding
               test.expect.html(outputs[i]);
               var cipher = forge.aes.createEncryptionCipher(key, 'CTR');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(input));
               cipher.finish(function(){return true;});
               test.result.html(cipher.output.toHex());
               test.check();
            });

            addTest('aes-128 ctr decrypt', function(task, test)
            {
               // decrypt w/no padding
               test.expect.html(inputs[i]);
               var cipher = forge.aes.createDecryptionCipher(key, 'CTR');
               cipher.start(iv);
               cipher.update(forge.util.createBuffer(output));
               cipher.finish(function(){return true;});
               var out = (i !== 0) ?
                 cipher.output.toHex() : cipher.output.getBytes();
               test.result.html(out);
               test.check();
            });
         })(i);
      }
   })();

   addTest('private key encryption', function(task, test)
   {
      var _privateKey =
         '-----BEGIN RSA PRIVATE KEY-----\r\n' +
         'MIICXQIBAAKBgQDL0EugUiNGMWscLAVM0VoMdhDZEJOqdsUMpx9U0YZI7szokJqQ\r\n' +
         'NIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMGTkP3VF29vXBo+dLq5e+8VyAy\r\n' +
         'Q3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGtvnM+z0MYDdKo80efzwIDAQAB\r\n' +
         'AoGAIzkGONi5G+JifmXlLJdplom486p3upf4Ce2/7mqfaG9MnkyPSairKD/JXvfh\r\n' +
         'NNWkkN8DKKDKBcVVElPgORYT0qwrWc7ueLBMUCbRXb1ZyfEulimG0R3kjUh7NYau\r\n' +
         'DaIkVgfykXGSQMZx8FoaT6L080zd+0emKDDYRrb+/kgJNJECQQDoUZoiC2K/DWNY\r\n' +
         'h3/ppZ0ane2y4SBmJUHJVMPQ2CEgxsrJTxet668ckNCKaOP/3VFPoWC41f17DvKq\r\n' +
         'noYINNntAkEA4JbZBZBVUrQFhHlrpXT4jzqtO2RlKZzEq8qmFZfEErxOT1WMyyCi\r\n' +
         'lAQ5gUKardo1Kf0omC8Xq/uO9ZYdED55KwJBALs6cJ65UFaq4oLJiQPzLd7yokuE\r\n' +
         'dcj8g71PLBTW6jPxIiMFNA89nz3FU9wIVp+xbMNhSoMMKqIPVPC+m0Rn260CQQDA\r\n' +
         'I83fWK/mZWUjBM33a68KumRiH238v8XyQxj7+C8i6D8G2GXvkigFAehAkb7LZZd+\r\n' +
         'KLuGFyPlWv3fVWHf99KpAkBQFKk3MRMl6IGJZUEFQe4l5whm8LkGU4acSqv9B3xt\r\n' +
         'qROkCrsFrMPqjuuzEmyHoQZ64r2PLJg7FOuyhBnQUOt4\r\n' +
         '-----END RSA PRIVATE KEY-----';
      var pk = forge.pki.privateKeyFromPem(_privateKey);
      var pem1 = forge.pki.privateKeyToPem(pk);
      var pem2 = forge.pki.encryptRsaPrivateKey(
         pk, 'password', {'encAlg': 'aes128'});
      var privateKey = forge.pki.decryptRsaPrivateKey(pem2, 'password');
      var pem3 = forge.pki.privateKeyToPem(privateKey);
      if(pem1 === pem3)
      {
         test.pass();
      }
      else
      {
         test.fail();
      }
   });

   addTest('random', function(task, test)
   {
     forge.random.getBytes(16);
     forge.random.getBytes(24);
     forge.random.getBytes(32);

      var b = forge.random.getBytes(10);
      test.result.html(forge.util.bytesToHex(b));
      if(b.length === 10)
      {
         test.pass();
      }
      else
      {
         test.fail();
      }
   });

   addTest('asn.1 oid => der', function(task, test)
   {
      test.expect.html('2a864886f70d');
      test.result.html(forge.asn1.oidToDer('1.2.840.113549').toHex());
      test.check();
   });

   addTest('asn.1 der => oid', function(task, test)
   {
      var der = '2a864886f70d';
      test.expect.html('1.2.840.113549');
      test.result.html(forge.asn1.derToOid(forge.util.hexToBytes(der)));
      test.check();
   });

   (function()
   {
      var _privateKey =
      '-----BEGIN RSA PRIVATE KEY-----\r\n' +
      'MIICXQIBAAKBgQDL0EugUiNGMWscLAVM0VoMdhDZEJOqdsUMpx9U0YZI7szokJqQ\r\n' +
      'NIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMGTkP3VF29vXBo+dLq5e+8VyAy\r\n' +
      'Q3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGtvnM+z0MYDdKo80efzwIDAQAB\r\n' +
      'AoGAIzkGONi5G+JifmXlLJdplom486p3upf4Ce2/7mqfaG9MnkyPSairKD/JXvfh\r\n' +
      'NNWkkN8DKKDKBcVVElPgORYT0qwrWc7ueLBMUCbRXb1ZyfEulimG0R3kjUh7NYau\r\n' +
      'DaIkVgfykXGSQMZx8FoaT6L080zd+0emKDDYRrb+/kgJNJECQQDoUZoiC2K/DWNY\r\n' +
      'h3/ppZ0ane2y4SBmJUHJVMPQ2CEgxsrJTxet668ckNCKaOP/3VFPoWC41f17DvKq\r\n' +
      'noYINNntAkEA4JbZBZBVUrQFhHlrpXT4jzqtO2RlKZzEq8qmFZfEErxOT1WMyyCi\r\n' +
      'lAQ5gUKardo1Kf0omC8Xq/uO9ZYdED55KwJBALs6cJ65UFaq4oLJiQPzLd7yokuE\r\n' +
      'dcj8g71PLBTW6jPxIiMFNA89nz3FU9wIVp+xbMNhSoMMKqIPVPC+m0Rn260CQQDA\r\n' +
      'I83fWK/mZWUjBM33a68KumRiH238v8XyQxj7+C8i6D8G2GXvkigFAehAkb7LZZd+\r\n' +
      'KLuGFyPlWv3fVWHf99KpAkBQFKk3MRMl6IGJZUEFQe4l5whm8LkGU4acSqv9B3xt\r\n' +
      'qROkCrsFrMPqjuuzEmyHoQZ64r2PLJg7FOuyhBnQUOt4\r\n' +
      '-----END RSA PRIVATE KEY-----\r\n';

      var _publicKey =
      '-----BEGIN PUBLIC KEY-----\r\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDL0EugUiNGMWscLAVM0VoMdhDZ\r\n' +
      'EJOqdsUMpx9U0YZI7szokJqQNIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMG\r\n' +
      'TkP3VF29vXBo+dLq5e+8VyAyQ3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGt\r\n' +
      'vnM+z0MYDdKo80efzwIDAQAB\r\n' +
      '-----END PUBLIC KEY-----\r\n';

      var _certificate =
      '-----BEGIN CERTIFICATE-----\r\n' +
      'MIIDIjCCAougAwIBAgIJANE2aHSbwpaRMA0GCSqGSIb3DQEBBQUAMGoxCzAJBgNV\r\n' +
      'BAYTAlVTMREwDwYDVQQIEwhWaXJnaW5pYTETMBEGA1UEBxMKQmxhY2tzYnVyZzEN\r\n' +
      'MAsGA1UEChMEVGVzdDENMAsGA1UECxMEVGVzdDEVMBMGA1UEAxMMbXlzZXJ2ZXIu\r\n' +
      'Y29tMB4XDTEwMDYxOTE3MzYyOFoXDTExMDYxOTE3MzYyOFowajELMAkGA1UEBhMC\r\n' +
      'VVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQHEwpCbGFja3NidXJnMQ0wCwYD\r\n' +
      'VQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MRUwEwYDVQQDEwxteXNlcnZlci5jb20w\r\n' +
      'gZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMvQS6BSI0YxaxwsBUzRWgx2ENkQ\r\n' +
      'k6p2xQynH1TRhkjuzOiQmpA0jCiSJDoSic2dZIyUi/LjoCGeVFif57N5N5Tt4wZO\r\n' +
      'Q/dUXb29cGj50url77xXIDJDcXMzXAji2ziFEAIXzDqarKBdDuL9IO7z+tepEa2+\r\n' +
      'cz7PQxgN0qjzR5/PAgMBAAGjgc8wgcwwHQYDVR0OBBYEFPV1Y+DHXW6bA/r9sv1y\r\n' +
      'NJ8jAwMAMIGcBgNVHSMEgZQwgZGAFPV1Y+DHXW6bA/r9sv1yNJ8jAwMAoW6kbDBq\r\n' +
      'MQswCQYDVQQGEwJVUzERMA8GA1UECBMIVmlyZ2luaWExEzARBgNVBAcTCkJsYWNr\r\n' +
      'c2J1cmcxDTALBgNVBAoTBFRlc3QxDTALBgNVBAsTBFRlc3QxFTATBgNVBAMTDG15\r\n' +
      'c2VydmVyLmNvbYIJANE2aHSbwpaRMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEF\r\n' +
      'BQADgYEARdH2KOlJWTC1CS2y/PAvg4uiM31PXMC1hqSdJlnLM1MY4hRfuf9VyTeX\r\n' +
      'Y6FdybcyDLSxKn9id+g9229ci9/s9PI+QmD5vXd8yZyScLc2JkYB4GC6+9D1+/+x\r\n' +
      's2hzMxuK6kzZlP+0l9LGcraMQPGRydjCARZZm4Uegln9rh85XFQ=\r\n' +
      '-----END CERTIFICATE-----\r\n';

      var _signature =
         '9200ece65cdaed36bcc20b94c65af852e4f88f0b4fe5b249d54665f815992ac4' +
         '3a1399e65d938c6a7f16dd39d971a53ca66523209dbbfbcb67afa579dbb0c220' +
         '672813d9e6f4818f29b9becbb29da2032c5e422da97e0c39bfb7a2e7d568615a' +
         '5073af0337ff215a8e1b2332d668691f4fb731440055420c24ac451dd3c913f4';

      addTest('private key from pem/to pem', function(task, test)
      {
         try
         {
            // convert from pem
            var key = forge.pki.privateKeyFromPem(_privateKey);
            //forge.log.debug(cat, 'privateKey', key);

            // convert back to pem
            var pem = forge.pki.privateKeyToPem(key);
            test.expect.html(_privateKey);
            test.result.html(pem);
            test.check();
         }
         catch(ex)
         {
            forge.log.error('test', ex);
            test.fail();
         }
      });

      addTest('public key from pem/to pem', function(task, test)
      {
         try
         {
            // convert from pem
            var key = forge.pki.publicKeyFromPem(_publicKey);
            //forge.log.debug(cat, 'publicKey', key);

            // convert back to pem
            var pem = forge.pki.publicKeyToPem(key);
            test.expect.html(_publicKey);
            test.result.html(pem);
            test.check();
         }
         catch(ex)
         {
            forge.log.error('test', ex);
            test.fail();
         }
      });

      addTest('certificate key from pem/to pem', function(task, test)
      {
         try
         {
            var cert = forge.pki.certificateFromPem(_certificate);
            /*
            forge.log.debug(cat, 'cert', cert);
            forge.log.debug(cat, 'CN', cert.subject.getField('CN').value);
            forge.log.debug(cat, 'C',
               cert.subject.getField({shortName: 'C'}).value);
            forge.log.debug(cat, 'stateOrProvinceName',
               cert.subject.getField({name: 'stateOrProvinceName'}).value);
            forge.log.debug(cat, '2.5.4.7',
               cert.subject.getField({type: '2.5.4.7'}).value);
            */
            // convert back to pem
            var pem = forge.pki.certificateToPem(cert);
            test.expect.html(_certificate);
            test.result.html(pem);
            test.check();
         }
         catch(ex)
         {
            forge.log.error('test', ex);
            test.fail();
         }
      });

      addTest('verify signature', function(task, test)
      {
         try
         {
            var key = forge.pki.publicKeyFromPem(_publicKey);
            var md = forge.md.sha1.create();
            md.update('0123456789abcdef');
            var signature = forge.util.hexToBytes(_signature);
            var success = key.verify(md.digest().getBytes(), signature);
            if(success)
            {
               test.pass();
            }
            else
            {
               test.fail();
            }
         }
         catch(ex)
         {
            forge.log.error('test', ex);
            test.fail();
         }
      });

      addTest('sign and verify', function(task, test)
      {
         try
         {
            var privateKey = forge.pki.privateKeyFromPem(_privateKey);
            var publicKey = forge.pki.publicKeyFromPem(_publicKey);

            // do sign
            var md = forge.md.sha1.create();
            md.update('0123456789abcdef');
            var st = +new Date();
            var signature = privateKey.sign(md);
            var et = +new Date();
            //forge.log.debug(cat, 'sign time', (et - st) + 'ms');

            // do verify
            st = +new Date();
            var success = publicKey.verify(md.digest().getBytes(), signature);
            et = +new Date();
            //forge.log.debug(cat, 'verify time', (et - st) + 'ms');
            if(success)
            {
               test.pass();
            }
            else
            {
               test.fail();
            }
         }
         catch(ex)
         {
            forge.log.error('test', ex);
            test.fail();
         }
      });

      addTest('certificate verify', function(task, test)
      {
         try
         {
            var cert = forge.pki.certificateFromPem(_certificate, true);
            //forge.log.debug(cat, 'cert', cert);
            var success = cert.verify(cert);
            if(success)
            {
               test.pass();
            }
            else
            {
               test.fail();
            }
         }
         catch(ex)
         {
            forge.log.error('test', ex);
            test.fail();
         }
      });
   })();

   addTest('TLS prf', function(task, test)
   {
      // Note: This test vector is originally from:
      // http://www.imc.org/ietf-tls/mail-archive/msg01589.html
      // But that link is now dead.
      var secret = forge.util.createBuffer();
      for(var i = 0; i < 48; ++i)
      {
         secret.putByte(0xAB);
      }
      secret = secret.getBytes();
      var seed = forge.util.createBuffer();
      for(var i = 0; i < 64; ++i)
      {
         seed.putByte(0xCD);
      }
      seed = seed.getBytes();

      var bytes = forge.tls.prf_tls1(secret, 'PRF Testvector',  seed, 104);
      var expect =
         'd3d4d1e349b5d515044666d51de32bab258cb521' +
         'b6b053463e354832fd976754443bcf9a296519bc' +
         '289abcbc1187e4ebd31e602353776c408aafb74c' +
         'bc85eff69255f9788faa184cbb957a9819d84a5d' +
         '7eb006eb459d3ae8de9810454b8b2d8f1afbc655' +
         'a8c9a013';
      test.expect.html(expect);
      test.result.html(bytes.toHex());
      test.check();
   });

   // function to create certificate
   var createCert = function(keys, cn, data)
   {
      var cert = forge.pki.createCertificate();
      cert.serialNumber = '01';
      cert.validity.notBefore = new Date();
      cert.validity.notAfter = new Date();
      cert.validity.notAfter.setFullYear(
         cert.validity.notBefore.getFullYear() + 1);
      var attrs = [{
         name: 'commonName',
         value: cn
      }, {
         name: 'countryName',
         value: 'US'
      }, {
         shortName: 'ST',
         value: 'Virginia'
      }, {
         name: 'localityName',
         value: 'Blacksburg'
      }, {
         name: 'organizationName',
         value: 'Test'
      }, {
         shortName: 'OU',
         value: 'Test'
      }];
      cert.setSubject(attrs);
      cert.setIssuer(attrs);
      cert.setExtensions([{
         name: 'basicConstraints',
         cA: true
      }, {
         name: 'keyUsage',
         keyCertSign: true,
         digitalSignature: true,
         nonRepudiation: true,
         keyEncipherment: true,
         dataEncipherment: true
      }, {
         name: 'subjectAltName',
         altNames: [{
            type: 6, // URI
            value: 'http://myuri.com/webid#me'
         }]
      }]);
      // FIXME: add subjectKeyIdentifier extension
      // FIXME: add authorityKeyIdentifier extension
      cert.publicKey = keys.publicKey;

      // self-sign certificate
      cert.sign(keys.privateKey);

      // save data
      data[cn] = {
         cert: forge.pki.certificateToPem(cert),
         privateKey: forge.pki.privateKeyToPem(keys.privateKey)
      };
   };

   var generateCert = function(task, test, cn, data)
   {
      task.block();

      // create key-generation state and function to step algorithm
      test.result.html(
         'Generating 512-bit key-pair and certificate for \"' + cn + '\".');
      var state = forge.pki.rsa.createKeyPairGenerationState(512);
      var kgTime = +new Date();
      var step = function()
      {
         // step key-generation
         if(!forge.pki.rsa.stepKeyPairGenerationState(state, 1000))
         {
            test.result.html(test.result.html() + '.');
            setTimeout(step, 1);
         }
         // key-generation complete
         else
         {
            kgTime = +new Date() - kgTime;
            forge.log.debug(cat, 'Total key-gen time', kgTime + 'ms');
            try
            {
               createCert(state.keys, cn, data);
               test.result.html(
                  test.result.html() + 'done. Time=' + kgTime + 'ms. ');
               task.unblock();
            }
            catch(ex)
            {
               forge.log.error(cat, ex, ex.message ? ex.message : '');
               test.result.html(ex.message);
               test.fail();
               task.fail();
            }
         }
      };

      // run key-gen algorithm
      setTimeout(step, 0);
   };

   var clientSessionCache1 = forge.tls.createSessionCache();
   var serverSessionCache1 = forge.tls.createSessionCache();
   addTest('TLS connection, w/o client-certificate', function(task, test)
   {
      var data = {};

      task.next('generate server certifcate', function(task)
      {
         generateCert(task, test, 'server', data);
      });

      task.next('starttls', function(task)
      {
         test.result.html(test.result.html() + 'Starting TLS...');

         var end =
         {
            client: null,
            server: null
         };
         var success = false;

         // create client
         end.client = forge.tls.createConnection(
         {
            server: false,
            caStore: [data.server.cert],
            sessionCache: clientSessionCache1,
            // optional cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            virtualHost: 'server',
            verify: function(c, verified, depth, certs)
            {
               test.result.html(test.result.html() +
                  'Client verifying certificate w/CN: \"' +
                  certs[0].subject.getField('CN').value +
                  '\", verified: ' + verified + '...');
               if(verified !== true)
               {
                  test.fail();
                  task.fail();
               }
               return verified;
            },
            connected: function(c)
            {
               test.result.html(test.result.html() + 'Client connected...');

               // send message to server
               setTimeout(function()
               {
                  c.prepare('Hello Server');
               }, 1);
            },
            tlsDataReady: function(c)
            {
               // send TLS data to server
               end.server.process(c.tlsData.getBytes());
            },
            dataReady: function(c)
            {
               var response = c.data.getBytes();
               test.result.html(test.result.html() +
                  'Client received \"' + response + '\"');
               success = (response === 'Hello Client');
               c.close();
            },
            closed: function(c)
            {
               test.result.html(test.result.html() + 'Client disconnected.');
               test.result.html(success ? 'Success' : 'Failure');
               if(success)
               {
                  test.expect.html('Success');
                  task.unblock();
                  test.pass();
               }
               else
               {
                  console.log('closed fail');
                  test.fail();
                  task.fail();
               }
            },
            error: function(c, error)
            {
               test.result.html(test.result.html() + 'Error: ' + error.message);
               test.fail();
               task.fail();
            }
         });

         // create server
         end.server = forge.tls.createConnection(
         {
            server: true,
            sessionCache: serverSessionCache1,
            // optional cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            connected: function(c)
            {
               test.result.html(test.result.html() + 'Server connected...');
            },
            getCertificate: function(c, hint)
            {
               test.result.html(test.result.html() +
                  'Server getting certificate for \"' + hint[0] + '\"...');
               return data.server.cert;
            },
            getPrivateKey: function(c, cert)
            {
               return data.server.privateKey;
            },
            tlsDataReady: function(c)
            {
               // send TLS data to client
               end.client.process(c.tlsData.getBytes());
            },
            dataReady: function(c)
            {
               test.result.html(test.result.html() +
                  'Server received \"' + c.data.getBytes() + '\"');

               // send response
               c.prepare('Hello Client');
               c.close();
            },
            closed: function(c)
            {
               test.result.html(test.result.html() + 'Server disconnected.');
            },
            error: function(c, error)
            {
               test.result.html(test.result.html() + 'Error: ' + error.message);
               test.fail();
               task.fail();
            }
         });

         // start handshake
         task.block();
         end.client.handshake();
      });
   });

   var clientSessionCache2 = forge.tls.createSessionCache();
   var serverSessionCache2 = forge.tls.createSessionCache();
   addTest('TLS connection, w/optional client-certificate', function(task, test)
   {
      var data = {};

      task.next('generate server certifcate', function(task)
      {
         generateCert(task, test, 'server', data);
      });

      // client-cert generated but not sent in this test
      task.next('generate client certifcate', function(task)
      {
         generateCert(task, test, 'client', data);
      });

      task.next('starttls', function(task)
      {
         test.result.html(test.result.html() + 'Starting TLS...');

         var end =
         {
            client: null,
            server: null
         };
         var success = false;

         // create client
         end.client = forge.tls.createConnection(
         {
            server: false,
            caStore: [data.server.cert],
            sessionCache: clientSessionCache2,
            // supported cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            virtualHost: 'server',
            verify: function(c, verified, depth, certs)
            {
               test.result.html(test.result.html() +
                  'Client verifying certificate w/CN: \"' +
                  certs[0].subject.getField('CN').value +
                  '\", verified: ' + verified + '...');
               if(verified !== true)
               {
                  test.fail();
                  task.fail();
               }
               return verified;
            },
            connected: function(c)
            {
               test.result.html(test.result.html() + 'Client connected...');

               // send message to server
               setTimeout(function()
               {
                  c.prepare('Hello Server');
               }, 1);
            },
            tlsDataReady: function(c)
            {
               // send TLS data to server
               end.server.process(c.tlsData.getBytes());
            },
            dataReady: function(c)
            {
               var response = c.data.getBytes();
               test.result.html(test.result.html() +
                  'Client received \"' + response + '\"');
               success = (response === 'Hello Client');
               c.close();
            },
            closed: function(c)
            {
               test.result.html(test.result.html() + 'Client disconnected.');
               test.result.html(success ? 'Success' : 'Failure');
               if(success)
               {
                  test.expect.html('Success');
                  task.unblock();
                  test.pass();
               }
               else
               {
                  console.log('closed fail');
                  test.fail();
                  task.fail();
               }
            },
            error: function(c, error)
            {
               test.result.html(test.result.html() + 'Error: ' + error.message);
               test.fail();
               task.fail();
            }
         });

         // create server
         end.server = forge.tls.createConnection(
         {
            server: true,
            caStore: [data.client.cert],
            sessionCache: serverSessionCache2,
            // supported cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            connected: function(c)
            {
               test.result.html(test.result.html() + 'Server connected...');
            },
            verifyClient: 'optional',
            verify: function(c, verified, depth, certs)
            {
               test.result.html(test.result.html() +
                  'Server verifying certificate w/CN: \"' +
                  certs[0].subject.getField('CN').value +
                  '\", verified: ' + verified + '...');
               if(verified !== true)
               {
                  test.fail();
                  task.fail();
               }
               return verified;
            },
            getCertificate: function(c, hint)
            {
               test.result.html(test.result.html() +
                  'Server getting certificate for \"' + hint[0] + '\"...');
               return data.server.cert;
            },
            getPrivateKey: function(c, cert)
            {
               return data.server.privateKey;
            },
            tlsDataReady: function(c)
            {
               // send TLS data to client
               end.client.process(c.tlsData.getBytes());
            },
            dataReady: function(c)
            {
               test.result.html(test.result.html() +
                  'Server received \"' + c.data.getBytes() + '\"');

               // send response
               c.prepare('Hello Client');
               c.close();
            },
            closed: function(c)
            {
               test.result.html(test.result.html() + 'Server disconnected.');
            },
            error: function(c, error)
            {
               test.result.html(test.result.html() + 'Error: ' + error.message);
               test.fail();
               task.fail();
            }
         });

         // start handshake
         task.block();
         end.client.handshake();
      });
   });

   var clientSessionCache3 = forge.tls.createSessionCache();
   var serverSessionCache3 = forge.tls.createSessionCache();
   addTest('TLS connection, w/client-certificate', function(task, test)
   {
      var data = {};

      task.next('generate server certifcate', function(task)
      {
         generateCert(task, test, 'server', data);
      });

      task.next('generate client certifcate', function(task)
      {
         generateCert(task, test, 'client', data);
      });

      task.next('starttls', function(task)
      {
         test.result.html(test.result.html() + 'Starting TLS...');

         var end =
         {
            client: null,
            server: null
         };
         var success = false;

         // create client
         end.client = forge.tls.createConnection(
         {
            server: false,
            caStore: [data.server.cert],
            sessionCache: clientSessionCache3,
            // supported cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            virtualHost: 'server',
            verify: function(c, verified, depth, certs)
            {
               test.result.html(test.result.html() +
                  'Client verifying certificate w/CN: \"' +
                  certs[0].subject.getField('CN').value +
                  '\", verified: ' + verified + '...');
               if(verified !== true)
               {
                  test.fail();
                  task.fail();
               }
               return verified;
            },
            connected: function(c)
            {
               test.result.html(test.result.html() + 'Client connected...');

               // send message to server
               setTimeout(function()
               {
                  c.prepare('Hello Server');
               }, 1);
            },
            getCertificate: function(c, hint)
            {
               test.result.html(test.result.html() +
                  'Client getting certificate ...');
               return data.client.cert;
            },
            getPrivateKey: function(c, cert)
            {
               return data.client.privateKey;
            },
            tlsDataReady: function(c)
            {
               // send TLS data to server
               end.server.process(c.tlsData.getBytes());
            },
            dataReady: function(c)
            {
               var response = c.data.getBytes();
               test.result.html(test.result.html() +
                  'Client received \"' + response + '\"');
               success = (response === 'Hello Client');
               c.close();
            },
            closed: function(c)
            {
               test.result.html(test.result.html() + 'Client disconnected.');
               test.result.html(success ? 'Success' : 'Failure');
               if(success)
               {
                  test.expect.html('Success');
                  task.unblock();
                  test.pass();
               }
               else
               {
                  console.log('closed fail');
                  test.fail();
                  task.fail();
               }
            },
            error: function(c, error)
            {
               test.result.html(test.result.html() + 'Error: ' + error.message);
               test.fail();
               task.fail();
            }
         });

         // create server
         end.server = forge.tls.createConnection(
         {
            server: true,
            caStore: [data.client.cert],
            sessionCache: serverSessionCache3,
            // supported cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            connected: function(c)
            {
               test.result.html(test.result.html() + 'Server connected...');
            },
            verifyClient: true, // use 'optional' to request but not require
            verify: function(c, verified, depth, certs)
            {
               test.result.html(test.result.html() +
                  'Server verifying certificate w/CN: \"' +
                  certs[0].subject.getField('CN').value +
                  '\", verified: ' + verified + '...');
               if(verified !== true)
               {
                  test.fail();
                  task.fail();
               }
               return verified;
            },
            getCertificate: function(c, hint)
            {
               test.result.html(test.result.html() +
                  'Server getting certificate for \"' + hint[0] + '\"...');
               return data.server.cert;
            },
            getPrivateKey: function(c, cert)
            {
               return data.server.privateKey;
            },
            tlsDataReady: function(c)
            {
               // send TLS data to client
               end.client.process(c.tlsData.getBytes());
            },
            dataReady: function(c)
            {
               test.result.html(test.result.html() +
                  'Server received \"' + c.data.getBytes() + '\"');

               // send response
               c.prepare('Hello Client');
               c.close();
            },
            closed: function(c)
            {
               test.result.html(test.result.html() + 'Server disconnected.');
            },
            error: function(c, error)
            {
               test.result.html(test.result.html() + 'Error: ' + error.message);
               test.fail();
               task.fail();
            }
         });

         // start handshake
         task.block();
         end.client.handshake();
      });
   });

   init();
});
