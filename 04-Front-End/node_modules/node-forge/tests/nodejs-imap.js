var forge = require('../js/forge');
var net = require('net');

var socket = new net.Socket();

var client = forge.tls.createConnection({
  server: false,
  verify: function(connection, verified, depth, certs) {
    // skip verification for testing
    return true;
  },
  connected: function(connection) {
    console.log('[tls] connected');
  },
  tlsDataReady: function(connection) {
    // encrypted data is ready to be sent to the server
    var data = connection.tlsData.getBytes();
    socket.write(data, 'binary');
  },
  dataReady: function(connection) {
    // clear data from the server is ready
    var data = connection.data.getBytes();
    console.log('[tls] received from the server: ' + data);
    client.close();
  },
  closed: function() {
    console.log('[tls] disconnected');
  },
  error: function(connection, error) {
    console.log('[tls] error', error);
  }
});

socket.on('connect', function() {
  console.log('[socket] connected');
  client.handshake();
});
socket.on('data', function(data) {
  client.process(data.toString('binary'));
});
socket.on('end', function() {
  console.log('[socket] disconnected');
});

// connect to gmail's imap server
socket.connect(993, 'imap.gmail.com');
