var sys = require('sys');
var ws = require('./ws');
var forge = require('../js/forge');

// function to create certificate
var createCert = function(cn, data)
{
   sys.puts(
      'Generating 512-bit key-pair and certificate for \"' + cn + '\".');
   var keys = forge.pki.rsa.generateKeyPair(512);
   sys.puts('key-pair created.');

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
   
   sys.puts('certificate created for \"' + cn + '\": \n' + data[cn].cert);
};

var data = {};

// create certificate for server
createCert('server', data);

// function to create TLS server connection
var createTls = function(websocket)
{
   return forge.tls.createConnection(
   {
      server: true,
      caStore: [],
      sessionCache: {},
      // supported cipher suites in order of preference
      cipherSuites: [
         forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
         forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
      connected: function(c)
      {
         sys.puts('Server connected');
      },
      verifyClient: true,
      verify: function(c, verified, depth, certs)
      {
         sys.puts(
            'Server verifying certificate w/CN: \"' +
            certs[0].subject.getField('CN').value +
            '\", verified: ' + verified + '...');
         
         // accept any certificate (could actually do WebID authorization from
         // here within the protocol)
         return true;
      },
      getCertificate: function(c, hint)
      {
         sys.puts('Server getting certificate for \"' + hint[0] + '\"...');
         return data.server.cert;
      },
      getPrivateKey: function(c, cert)
      {
         return data.server.privateKey;
      },
      tlsDataReady: function(c)
      {
         // send base64-encoded TLS data over websocket
         websocket.write(forge.util.encode64(c.tlsData.getBytes()));
      },
      dataReady: function(c)
      {
         sys.puts('Server received \"' + c.data.getBytes() + '\"');
         
         // send response
         c.prepare('Hello Client');
      },
      closed: function(c)
      {
         sys.puts('Server disconnected.');
         websocket.end();
      },
      error: function(c, error)
      {
         sys.puts('Server error: ' + error.message);
      }
   });
};

// create websocket server
var port = 8080;
ws.createServer(function(websocket)
{
   // create TLS server connection
   var tls = createTls(websocket);
   
   websocket.addListener('connect', function(resource)
   {
      sys.puts('connected: ' + resource);
      
      // close connection after 10 seconds
      setTimeout(websocket.end, 10 * 1000);
   });
   
   websocket.addListener('data', function(data)
   {
      // base64-decode data and process it
      tls.process(forge.util.decode64(data));
   });
   
   websocket.addListener('close', function()
   {
      sys.puts('closed');
   });
}).listen(port);

sys.puts('server running on port ' + port);
