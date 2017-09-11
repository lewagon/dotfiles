<html>
   <head>
      <link type="text/css" rel="stylesheet" media="all" href="screen.css" />
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
      <script type="text/javascript" src="forge/debug.js"></script>
      <script type="text/javascript" src="forge/util.js"></script>
      <script type="text/javascript" src="forge/log.js"></script>
      <script type="text/javascript" src="forge/socket.js"></script>
      <script type="text/javascript" src="forge/md5.js"></script>
      <script type="text/javascript" src="forge/sha1.js"></script>
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
      <script type="text/javascript" src="forge/tlssocket.js"></script>
      <script type="text/javascript" src="forge/http.js"></script>
      <script type="text/javascript" src="ws-webid.js"></script>
      
      <script type="text/javascript">
      //<![CDATA[
      // logging category
      var cat = 'forge.tests.tls';

      swfobject.embedSWF(
         'forge/SocketPool.swf', 'socketPool', '0', '0', '9.0.0',
         false, {}, {allowscriptaccess: 'always'}, {});
      
      // CA certificate for test server
      var certificatePem =
         '-----BEGIN CERTIFICATE-----\r\n' +
         'MIIEaDCCA1CgAwIBAgIJAJuj0AjEWncuMA0GCSqGSIb3DQEBBQUAMH8xCzAJBgNV\r\n' +
         'BAYTAlVTMREwDwYDVQQIEwhWaXJnaW5pYTETMBEGA1UEBxMKQmxhY2tzYnVyZzEd\r\n' +
         'MBsGA1UEChMURGlnaXRhbCBCYXphYXIsIEluYy4xGjAYBgNVBAsTEUZvcmdlIFRl\r\n' +
         'c3QgU2VydmVyMQ0wCwYDVQQDEwR0ZXN0MB4XDTEwMDcxMzE3MjAzN1oXDTMwMDcw\r\n' +
         'ODE3MjAzN1owfzELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYD\r\n' +
         'VQQHEwpCbGFja3NidXJnMR0wGwYDVQQKExREaWdpdGFsIEJhemFhciwgSW5jLjEa\r\n' +
         'MBgGA1UECxMRRm9yZ2UgVGVzdCBTZXJ2ZXIxDTALBgNVBAMTBHRlc3QwggEiMA0G\r\n' +
         'CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCm/FobjqK8CVP/Xbnpyhf1tpoyaiFf\r\n' +
         'ShUOmlWqL5rLe0Q0dDR/Zur+sLMUv/1T4wOfFkjjxvZ0Sk5NIjK3Wy2UA41a+M3J\r\n' +
         'RTbCFrg4ujsovFaD4CDmV7Rek0qJB3m5Gp7hgu5vfL/v+WrwxnQObNq+IrTMSA15\r\n' +
         'cO4LzNIPj9K1LN2dB+ucT7xTQFHAfvLLgLlCLiberoabF4rEhgTMTbmMtFVKSt+P\r\n' +
         'xgQIYPnhw1WuAvE9hFesRQFdfARLqIZk92FeHkgtHv9BAunktJemcidbowTCTBaM\r\n' +
         '/njcgi1Tei/LFkph/FCVyGER0pekJNHX626bAQSLo/srsWfmcll9rK6bAgMBAAGj\r\n' +
         'geYwgeMwHQYDVR0OBBYEFCau5k6jxezjULlLuo/liswJlBF8MIGzBgNVHSMEgasw\r\n' +
         'gaiAFCau5k6jxezjULlLuo/liswJlBF8oYGEpIGBMH8xCzAJBgNVBAYTAlVTMREw\r\n' +
         'DwYDVQQIEwhWaXJnaW5pYTETMBEGA1UEBxMKQmxhY2tzYnVyZzEdMBsGA1UEChMU\r\n' +
         'RGlnaXRhbCBCYXphYXIsIEluYy4xGjAYBgNVBAsTEUZvcmdlIFRlc3QgU2VydmVy\r\n' +
         'MQ0wCwYDVQQDEwR0ZXN0ggkAm6PQCMRady4wDAYDVR0TBAUwAwEB/zANBgkqhkiG\r\n' +
         '9w0BAQUFAAOCAQEAnP/2mzFWaoGx6+KAfY8pcgnF48IoyKPx5cAQyzpMo+uRwrln\r\n' +
         'INcDGwNx6p6rkjFbK27TME9ReCk+xQuVGaKOtqErKECXWDtD+0M35noyaOwWIFu2\r\n' +
         '7gPZ0uGJ1n9ZMe/S9yZmmusaIrc66rX4o+fslUlH0g3SrH7yf83M8aOC2pEyCsG0\r\n' +
         'mNNfwSFWfmu+1GMRHXJQ/qT8qBX8ZPhzRY2BAS6vr+eh3gwXR6yXLA8Xm1+e+iDU\r\n' +
         'gGTQoYkixDIL2nhvd4AFFlE977BiE+0sMS1eJKUUbQ36MLAWb5oOZKHrphEvqMKA\r\n' +
         'eGDO3qoDqB5TkZC3x38DXBDvAZ01d9s0fvveag==\r\n' +
         '-----END CERTIFICATE-----';
      
      // local aliases
      var net = window.forge.net;
      var tls = window.forge.tls;
      var http = window.forge.http;
      var util = window.forge.util;

      var client;
      
      function client_init(primed)
      {
         try
         {
            var sp = net.createSocketPool({
               flashId: 'socketPool',
               policyPort: 19945,
               msie: false
            });
            client = http.createClient({
               //url: 'https://localhost:4433',
               url: 'https://' + window.location.host,
               socketPool: sp,
               connections: 10,
               caCerts: [certificatePem],
               // optional cipher suites in order of preference
               cipherSuites: [
                  tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
                  tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
               verify: function(c, verified, depth, certs)
               {
                  forge.log.debug(cat,
                     'TLS certificate ' + depth + ' verified', verified);
                  // Note: change to always true to test verifying without cert
                  //return verified;
                  // FIXME: temporarily accept any cert to allow hitting any bpe
                  if(verified !== true)
                  {
                     forge.log.warning(cat, 
                        'Certificate NOT verified. Ignored for test.');
                  }
                  return true;
               },
               primeTlsSockets: primed
            });
            document.getElementById('feedback').innerHTML =
               'http client created';
         }
         catch(ex)
         {
            forge.log.error(cat, ex);
         }
         
         return false;
      }
      
      function client_cleanup()
      {
         var sp = client.socketPool;
         client.destroy();
         sp.destroy();
         document.getElementById('feedback').innerHTML =
            'http client cleaned up';
         return false;
      }

      function client_send()
      {
         /*
         var request = http.createRequest({
            method: 'POST',
            path: '/',
            body: 'echo=foo',
            headers: [{'Content-Type': 'application/x-www-form-urlencoded'}]
         });
         */
         var request = http.createRequest({
            method: 'GET',
            path: '/'
         });
         
         client.send({
            request: request,
            connected: function(e)
            {
               forge.log.debug(cat, 'connected', e);
            },
            headerReady: function(e)
            {
               forge.log.debug(cat, 'header ready', e);
            },
            bodyReady: function(e)
            {
               forge.log.debug(cat, 'body ready', e);

               // FIXME: current test server doesn't seem to handle keep-alive
               // correctly, so close connection 
               e.socket.close();
            },
            error: function(e)
            {
               forge.log.error(cat, 'error', e);
            }
         });
         document.getElementById('feedback').innerHTML =
            'http request sent';
         return false;
      }

      function client_send_10()
      {
         for(var i = 0; i < 10; ++i)
         {
            client_send();
         }
         return false;
      }

      function client_stress()
      {
         for(var i = 0; i < 10; ++i)
         {
            setTimeout(function()
            {
               for(var i = 0; i < 10; ++i)
               {
                  client_send();
               }
            }, 0);
         }
         return false;
      }

      function client_cookies()
      {
         var cookie =
         {
            name: 'test-cookie',
            value: 'test-value',
            maxAge: -1,
            secure: true,
            path: '/'
         };
         client.setCookie(cookie);
         forge.log.debug(cat, 'cookie', client.getCookie('test-cookie'));
      }

      function client_clear_cookies()
      {
         client.clearCookies();
      }
      
      function websocket_test()
      {
         // create certificate
         var cn = 'client';
         console.log(
            'Generating 512-bit key-pair and certificate for \"' + cn + '\".');
         var keys = forge.pki.rsa.generateKeyPair(512);
         console.log('key-pair created.');

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
         
         // save cert and private key in PEM format
         cert = forge.pki.certificateToPem(cert);
         privateKey = forge.pki.privateKeyToPem(keys.privateKey);
         console.log('certificate created for \"' + cn + '\": \n' + cert);

         // create websocket
         var ws = new WebSocket('ws://localhost:8080');
         console.log('created websocket', ws);

         // create TLS client
         var success = false;
         var tls = forge.tls.createConnection(
         {
            server: false,
            caStore: [],
            sessionCache: {},
            // supported cipher suites in order of preference
            cipherSuites: [
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
               forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
            virtualHost: 'server',
            verify: function(c, verified, depth, certs)
            {
               console.log(
                  'TLS Client verifying certificate w/CN: \"' +
                  certs[0].subject.getField('CN').value +
                  '\", verified: ' + verified + '...');
               // accept any certificate from the server for this test
               return true;
            },
            connected: function(c)
            {
               console.log('Client connected...');
               
               // send message to server
               setTimeout(function()
               {
                  c.prepare('Hello Server');
               }, 1);
            },
            getCertificate: function(c, hint)
            {
               console.log('Client getting certificate ...');
               return cert;
            },
            getPrivateKey: function(c, cert)
            {
               return privateKey;
            },
            tlsDataReady: function(c)
            {
               // send base64-encoded TLS data to server
               ws.send(forge.util.encode64(c.tlsData.getBytes()));
            },
            dataReady: function(c)
            {
               var response = c.data.getBytes();
               console.log('Client received \"' + response + '\"');
               success = (response === 'Hello Client');
               c.close();
            },
            closed: function(c)
            {
               console.log('Client disconnected.');
               if(success)
               {
                  console.log('PASS');
               }
               else
               {
                  console.log('FAIL');
               }
            },
            error: function(c, error)
            {
               console.log('Client error: ' + error.message);
            }
         });

         ws.onopen = function(evt)
         {
            console.log('websocket connected');

            // do TLS handshake
            tls.handshake();
         };
         ws.onmessage = function(evt)
         {
            // base64-decode data and process it
            tls.process(forge.util.decode64(evt.data));
         };
         ws.onclose = function(evt)
         {
            console.log('websocket closed');
         };
      }
      
      //]]>
      </script>
   </head>
   <body>
      <div class="nav"><a href="index.html">Forge Tests</a> / TLS</div>

      <div class="header">
         <h1>TLS Test</h1>
      </div>

      <div class="content">

      <!-- div used to hold the flash socket pool implemenation -->
      <div id="socketPool">
         <p>Could not load the flash SocketPool.</p>
      </div>

      <fieldset class="section">
         <ul>
           <li>Use the controls below to test the HTTP client over TLS.</li>
           <li>You currently need a JavaScript console to view the output.</li>
           <li>This test connects to a TLS server so you must have one running. The easiest way to run this test is to start the test server with --tls and load this page over HTTPS.</li>
         </ul>
      </fieldset>

      <fieldset class="section">
      <legend>Controls</legend>
      <div id="controls">
         <button id="init" onclick="javascript:return client_init(false);">init</button>
         <button id="init_primed" onclick="javascript:return client_init(true);">init primed</button>
         <button id="cleanup" onclick="javascript:return client_cleanup();">cleanup</button>
         <button id="send" onclick="javascript:return client_send();">send</button>
         <button id="send10" onclick="javascript:return client_send_10();">send 10</button>
         <button id="stress" onclick="javascript:return client_stress();">stress</button>
         <button id="client_cookies" onclick="javascript:return client_cookies();">cookies</button>
         <button id="clear_cookies" onclick="javascript:return client_clear_cookies();">clear cookies</button>
         <button id="websocket" onclick="javascript:return websocket_test();">websocket test</button>
         <button id="websocket-webid" onclick="javascript:return websocket_webid('localhost', 8080);">websocket webid test</button>
      </div>
      </fieldset>

      <fieldset class="section">
      <legend>Feedback</legend>
      <p>Feedback from the flash SocketPool:</p>
      <div id="feedback">
      None
      </div>
      </fieldset>

      </div>
   </body>
</html>
