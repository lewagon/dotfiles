// Github: http://github.com/ncr/node.ws.js
// Compatible with node v0.1.91
// Author: Jacek Becela
// Contributors:
//   Michael Stillwell  http://github.com/ithinkihaveacat
//   Nick Chapman       http://github.com/nchapman
//   Dmitriy Shalashov  http://github.com/skaurus
//   Johan Dahlberg
//   Andreas Kompanez
//   Samuel Cyprian		http://github.com/samcyp
// License: MIT
// Based on: http://github.com/Guille/node.websocket.js

function nano(template, data) {
  return template.replace(/\{([\w\.]*)}/g, function (str, key) {
    var keys = key.split("."), value = data[keys.shift()];
    keys.forEach(function (key) { value = value[key];});
    return value;
  });
}

function pack(num) {
  var result = '';
  result += String.fromCharCode(num >> 24 & 0xFF);
  result += String.fromCharCode(num >> 16 & 0xFF);
  result += String.fromCharCode(num >> 8 & 0xFF);
  result += String.fromCharCode(num & 0xFF);
  return result;
}

var sys  = require("sys"),
  net    = require("net"),
  crypto = require("crypto"),
  requiredHeaders = {
    'get': /^GET (\/[^\s]*)/,
    'upgrade': /^WebSocket$/,
    'connection': /^Upgrade$/,
    'host': /^(.+)$/,
    'origin': /^(.+)$/
  },
  handshakeTemplate75 = [
    'HTTP/1.1 101 Web Socket Protocol Handshake', 
    'Upgrade: WebSocket', 
    'Connection: Upgrade',
    'WebSocket-Origin: {origin}',
    'WebSocket-Location: {protocol}://{host}{resource}',
    '',
    ''
  ].join("\r\n"),
  handshakeTemplate76 = [
    'HTTP/1.1 101 WebSocket Protocol Handshake', // note a diff here
    'Upgrade: WebSocket',
    'Connection: Upgrade',
    'Sec-WebSocket-Origin: {origin}',
    'Sec-WebSocket-Location: {protocol}://{host}{resource}',
    '',
    '{data}'
  ].join("\r\n"),
  flashPolicy = '<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>';



exports.createSecureServer = function (websocketListener, credentials, options) {
	if (!options) options = {};
	options.secure = credentials;
	return this.createServer(websocketListener, options);
};

exports.createServer = function (websocketListener, options) {
  if (!options) options = {};
  if (!options.flashPolicy) options.flashPolicy = flashPolicy;
  // The value should be a crypto credentials
  if (!options.secure) options.secure = null;

  return net.createServer(function (socket) {
	//Secure WebSockets
	var wsProtocol = 'ws';
	if(options.secure) {
	  wsProtocol = 'wss';
	  socket.setSecure(options.secure);
	}
    socket.setTimeout(0);
    socket.setNoDelay(true);
    socket.setKeepAlive(true, 0);

    var emitter = new process.EventEmitter(),
      handshaked = false,
      buffer = "";
      
    function handle(data) {
      buffer += data;
      
      var chunks = buffer.split("\ufffd"),
        count = chunks.length - 1; // last is "" or a partial packet
        
      for(var i = 0; i < count; i++) {
        var chunk = chunks[i];
        if(chunk[0] == "\u0000") {
          emitter.emit("data", chunk.slice(1));
        } else {
          socket.end();
          return;
        }
      }
      
      buffer = chunks[count];
    }

    function handshake(data) {
      var _headers = data.split("\r\n");

      if ( /<policy-file-request.*>/.exec(_headers[0]) ) {
        socket.write( options.flashPolicy );
        socket.end();
        return;
      }

      // go to more convenient hash form
      var headers = {}, upgradeHead, len = _headers.length;
      if ( _headers[0].match(/^GET /) ) {
        headers["get"] = _headers[0];
      } else {
        socket.end();
        return;
      }
      if ( _headers[ _headers.length - 1 ] ) {
        upgradeHead = _headers[ _headers.length - 1 ];
        len--;
      }
      while (--len) { // _headers[0] will be skipped
        var header = _headers[len];
        if (!header) continue;

        var split = header.split(": ", 2); // second parameter actually seems to not work in node
        headers[ split[0].toLowerCase() ] = split[1];
      }

      // check if we have all needed headers and fetch data from them
      var data = {}, match;
      for (var header in requiredHeaders) {
        //           regexp                          actual header value
        if ( match = requiredHeaders[ header ].exec( headers[header] ) ) {
          data[header] = match;
        } else {
          socket.end();
          return;
        }
      }

      // draft auto-sensing
      if ( headers["sec-websocket-key1"] && headers["sec-websocket-key2"] && upgradeHead ) { // 76
        var strkey1 = headers["sec-websocket-key1"]
          , strkey2 = headers["sec-websocket-key2"]

          , numkey1 = parseInt(strkey1.replace(/[^\d]/g, ""), 10)
          , numkey2 = parseInt(strkey2.replace(/[^\d]/g, ""), 10)

          , spaces1 = strkey1.replace(/[^\ ]/g, "").length
          , spaces2 = strkey2.replace(/[^\ ]/g, "").length;

        if (spaces1 == 0 || spaces2 == 0 || numkey1 % spaces1 != 0 || numkey2 % spaces2 != 0) {
          socket.end();
          return;
        }

        var hash = crypto.createHash("md5")
        , key1 = pack(parseInt(numkey1/spaces1))
        , key2 = pack(parseInt(numkey2/spaces2));
        
        hash.update(key1);
        hash.update(key2);
        hash.update(upgradeHead);

        socket.write(nano(handshakeTemplate76, {
          protocol: wsProtocol,
          resource: data.get[1],
          host:     data.host[1],
          origin:   data.origin[1],
          data:     hash.digest("binary")
        }), "binary");

      } else { // 75
        socket.write(nano(handshakeTemplate75, {
          protocol: wsProtocol,
          resource: data.get[1],
          host:     data.host[1],
          origin:   data.origin[1]
        }));

      }

      handshaked = true;
      emitter.emit("connect", data.get[1]);
    }

    socket.addListener("data", function (data) {
      if(handshaked) {
        handle(data.toString("utf8"));
      } else {
        handshake(data.toString("binary")); // because of draft76 handshakes
      }
    }).addListener("end", function () {
      socket.end();
    }).addListener("close", function () {
      if (handshaked) { // don't emit close from policy-requests
        emitter.emit("close");
      }
    }).addListener("error", function (exception) {
      if (emitter.listeners("error").length > 0) {
        emitter.emit("error", exception);
      } else {
        throw exception;
      }
    });

    emitter.remoteAddress = socket.remoteAddress;
    
    emitter.write = function (data) {
      try {
        socket.write('\u0000', 'binary');
        socket.write(data, 'utf8');
        socket.write('\uffff', 'binary');
      } catch(e) { 
        // Socket not open for writing, 
        // should get "close" event just before.
        socket.end();
      }
    };
    
    emitter.end = function () {
      socket.end();
    };
    
    websocketListener(emitter); // emits: "connect", "data", "close", provides: write(data), end()
  });
};

