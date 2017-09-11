var forge = require('../js/forge');

// function to create certificate
var createCert = function(cn, data) {
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

  // save data
  data[cn] = {
    cert: forge.pki.certificateToPem(cert),
    privateKey: forge.pki.privateKeyToPem(keys.privateKey)
  };

  console.log('certificate created for \"' + cn + '\": \n' + data[cn].cert);
};

var end = {};
var data = {};

// create certificate for server and client
createCert('server', data);
createCert('client', data);

var success = false;

// create TLS client
end.client = forge.tls.createConnection({
  server: false,
  caStore: [data.server.cert],
  sessionCache: {},
  // supported cipher suites in order of preference
  cipherSuites: [
    forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
    forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
  virtualHost: 'server',
  verify: function(c, verified, depth, certs) {
    console.log(
      'TLS Client verifying certificate w/CN: \"' +
      certs[0].subject.getField('CN').value +
      '\", verified: ' + verified + '...');
    return verified;
  },
  connected: function(c) {
    console.log('Client connected...');

    // send message to server
    setTimeout(function() {
      c.prepareHeartbeatRequest('heartbeat');
      c.prepare('Hello Server');
    }, 1);
  },
  getCertificate: function(c, hint) {
    console.log('Client getting certificate ...');
    return data.client.cert;
  },
  getPrivateKey: function(c, cert) {
    return data.client.privateKey;
  },
  tlsDataReady: function(c) {
    // send TLS data to server
    end.server.process(c.tlsData.getBytes());
  },
  dataReady: function(c) {
    var response = c.data.getBytes();
    console.log('Client received \"' + response + '\"');
    success = (response === 'Hello Client');
    c.close();
  },
  heartbeatReceived: function(c, payload) {
    console.log('Client received heartbeat: ' + payload.getBytes());
  },
  closed: function(c) {
    console.log('Client disconnected.');
    if(success) {
      console.log('PASS');
    } else {
      console.log('FAIL');
    }
  },
  error: function(c, error) {
    console.log('Client error: ' + error.message);
  }
});

// create TLS server
end.server = forge.tls.createConnection({
  server: true,
  caStore: [data.client.cert],
  sessionCache: {},
  // supported cipher suites in order of preference
  cipherSuites: [
    forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
    forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
  connected: function(c) {
    console.log('Server connected');
    c.prepareHeartbeatRequest('heartbeat');
  },
  verifyClient: true,
  verify: function(c, verified, depth, certs) {
    console.log(
      'Server verifying certificate w/CN: \"' +
      certs[0].subject.getField('CN').value +
      '\", verified: ' + verified + '...');
    return verified;
  },
  getCertificate: function(c, hint) {
    console.log('Server getting certificate for \"' + hint[0] + '\"...');
    return data.server.cert;
  },
  getPrivateKey: function(c, cert) {
    return data.server.privateKey;
  },
  tlsDataReady: function(c) {
    // send TLS data to client
    end.client.process(c.tlsData.getBytes());
  },
  dataReady: function(c) {
    console.log('Server received \"' + c.data.getBytes() + '\"');

    // send response
    c.prepare('Hello Client');
    c.close();
  },
  heartbeatReceived: function(c, payload) {
    console.log('Server received heartbeat: ' + payload.getBytes());
  },
  closed: function(c) {
    console.log('Server disconnected.');
  },
  error: function(c, error) {
    console.log('Server error: ' + error.message);
  }
});

console.log('created TLS client and server, doing handshake...');
end.client.handshake();
