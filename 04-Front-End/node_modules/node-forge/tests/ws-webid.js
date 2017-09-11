var websocket_webid = function(host, port)
{
   var cat = 'ws';
   
   // TODO: get private key and certificate from local storage
   var privateKey =
   '-----BEGIN RSA PRIVATE KEY-----\r\n' +
'MIICXAIBAAKBgQCTmE8QLARsC57Z1OrOaLM6AS3fn70N7BvlU7z7yw8UpcJA/jOl\r\n' +
'NWu7eS9uzuckdVZ9FE0+x3DRvhtDI6K+18dcrUWtl5ADWXcs1QS3/7bGh7IybFyY\r\n' +
'0xT4VzLHcx6K4PNmfkjAQdyOz/EsuRqZ/ngIQ2tdHdkkzdQPECbTvFeG2wIDAQAB\r\n' +
'AoGAds3l7l2QHaxo7GzfqNBMXEdwto2tLxS8C6eQ+pkkBXm72HcF+Vj75AcTMD2p\r\n' +
'fwZYXQxHdV4yqRI+fZeku7uTA/3yBAAvNobbEN5jtHnq0ZTO/HO8HuHkKrCvD8c3\r\n' +
'0rJV6lNIuaARI9jZFf6HVchW3PMjKUpYhTs/sFhRxmsMpTkCQQDu8TPzXRmN1aw8\r\n' +
'tSI2Nyn8QUy9bw/12tlVaZIhrcVCiJl7JHGqSCowTqZlwmJIjd4W0zWjTvS7tEeO\r\n' +
'FaZHtP8lAkEAniGvm8S9zyzmhWRRIuU6EE2dtTbeAa5aSOK3nBaaNu2cHUxWle+J\r\n' +
'8lE4uequ9wqDG1AfOLobPmHReccmOI6N/wJAIP/I1/RkohT/a4bsiaZGsyLlkUf0\r\n' +
'YVTvLP+ege44zv6Ei+A1nnnG8dL64hTdc/27zVUwFDTEUeQM+c99nmudzQJBAApY\r\n' +
'qeTHOqQTjAGuTqC53tKyQV9Z96yke8PJEbpkwDJX2Z8RH5kv0xbHua5wbII9bdab\r\n' +
'p29OvfmW7N3K6fVJXoECQHK8FDC0i8v1Ui8FoBmt+Z1c1+/9TCEE0abUQ6rfOUbm\r\n' +
'XHMMac/n4qDs0OoCjR4u46dpoK+WN7zcg56tToFPVow=\r\n' +
'-----END RSA PRIVATE KEY-----';
  var certificate =
  '-----BEGIN CERTIFICATE-----\r\n' +
'MIICgDCCAemgAwIBAgIBATANBgkqhkiG9w0BAQUFADBYMRMwEQYDVQQDEwpKb2hu\r\n' +
'IFNtaXRoMRMwEQYDVQQHEwpCbGFja3NidXJnMREwDwYDVQQIEwhWaXJnaW5pYTEL\r\n' +
'MAkGA1UEBhMCVVMxDDAKBgNVBAoTA0ZvbzAeFw0xMDExMjYxNzUxMzJaFw0xMTEx\r\n' +
'MjYxNzUxMzJaMFgxEzARBgNVBAMTCkpvaG4gU21pdGgxEzARBgNVBAcTCkJsYWNr\r\n' +
'c2J1cmcxETAPBgNVBAgTCFZpcmdpbmlhMQswCQYDVQQGEwJVUzEMMAoGA1UEChMD\r\n' +
'Rm9vMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTmE8QLARsC57Z1OrOaLM6\r\n' +
'AS3fn70N7BvlU7z7yw8UpcJA/jOlNWu7eS9uzuckdVZ9FE0+x3DRvhtDI6K+18dc\r\n' +
'rUWtl5ADWXcs1QS3/7bGh7IybFyY0xT4VzLHcx6K4PNmfkjAQdyOz/EsuRqZ/ngI\r\n' +
'Q2tdHdkkzdQPECbTvFeG2wIDAQABo1owWDAMBgNVHRMEBTADAQH/MAsGA1UdDwQE\r\n' +
'AwIC9DA7BgNVHREENDAyhjBodHRwOi8vd2ViaWQuZGlnaXRhbGJhemFhci5jb20v\r\n' +
'aWRzLzE1MzQ1NzI2NDcjbWUwDQYJKoZIhvcNAQEFBQADgYEAPNm8albI4w6anynw\r\n' +
'XE/+00sCVks9BbgTcIpRqZPGqSuTRwoYW35isNLDqFqIUdVREMvFrEn3nOlOyKi0\r\n' +
'29G8JtLHFSXZsqf38Zou/bGAhtEH1AVEbM2bRtEnG8IW24jL8hiciz4htxmjnkHN\r\n' +
'JnQ8SQtUSWplGnz0vMFEOv6JbnI=\r\n' +
'-----END CERTIFICATE-----';

   // create websocket
   var ws = new WebSocket('ws://' + host + ':' + port);
   forge.log.debug(cat, 'Created WebSocket', ws);

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
      virtualHost: host,
      verify: function(c, verified, depth, certs)
      {
         forge.log.debug(cat, 
            'TLS Client verifying certificate w/CN: \"' +
            certs[0].subject.getField('CN').value + '\"');
         // accept any certificate from the server for this test
         return true;
      },
      connected: function(c)
      {
         forge.log.debug(cat, 'Client connected');
      },
      getCertificate: function(c, hint)
      {
         forge.log.debug(cat, 'Client using client-certificate');
         return certificate;
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
         forge.log.debug(cat, 'Client received \"' + response + '\"');
         try
         {
            response = JSON.parse(response);
            success = response.success;
            
            // TODO: call window.authenticate on response json, just like
            // w/flash version
         }
         catch(ex) {}
         c.close();
      },
      closed: function(c)
      {
         forge.log.debug(cat, 'Client disconnected');
         if(success)
         {
            forge.log.debug(cat, 'PASS');
         }
         else
         {
            forge.log.debug(cat, 'FAIL');
         }
      },
      error: function(c, error)
      {
         forge.log.debug(cat, 'Client error: ' + error.message);
      }
   });

   ws.onopen = function(evt)
   {
      forge.log.debug(cat, 'WebSocket connected');

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
      forge.log.debug(cat, 'WebSocket closed');
   };
};

