var forge = require('../js/forge');
var fs = require('fs');
var http = require('http');
//var rdf = require('./rdflib');
var sys = require('sys');
var urllib = require('url');
var ws = require('./ws');

// remove xmlns from input
var normalizeNs = function(input, ns) {
  var rval = null;

  // primitive
  if(typeof input === 'string' ||
    typeof input === 'number' ||
    typeof input === 'boolean') {
    rval = input;
  }
  // array
  else if(forge.util.isArray(input)) {
    rval = [];
    for(var i = 0; i < input.length; ++i) {
      rval.push(normalizeNs(input[i], ns));
    }
  }
  // object
  else {
    if('@' in input) {
      // copy namespace map
      var newNs = {};
      for(var key in ns) {
        newNs[key] = ns[key];
      }
      ns = newNs;

      // update namespace map
      for(var key in input['@']) {
        if(key.indexOf('xmlns:') === 0) {
          ns[key.substr(6)] = input['@'][key];
        }
      }
    }

    rval = {};
    for(var key in input) {
      if(key.indexOf('xmlns:') !== 0) {
        var value = input[key];
        var colon = key.indexOf(':');
        if(colon !== -1) {
          var prefix = key.substr(0, colon);
          if(prefix in ns) {
            key = ns[prefix] + key.substr(colon + 1);
          }
        }
        rval[key] = normalizeNs(value, ns);
      }
    }
  }

  return rval;
};

// gets public key from WebID rdf
var getPublicKey = function(data, uri, callback) {
  // FIXME: use RDF library to simplify code below
  //var kb = new rdf.RDFParser(rdf.IndexedFormula(), uri).loadBuf(data);
  //var CERT = rdf.Namespace('http://www.w3.org/ns/auth/cert#');
  //var RSA  = rdf.Namespace('http://www.w3.org/ns/auth/rsa#');
  var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
  var CERT = 'http://www.w3.org/ns/auth/cert#';
  var RSA  = 'http://www.w3.org/ns/auth/rsa#';
  var desc = RDF + 'Description';
  var about = RDF + 'about';
  var type = RDF + 'type';
  var resource = RDF + 'resource';
  var publicKey = RSA + 'RSAPublicKey';
  var modulus = RSA + 'modulus';
  var exponent = RSA + 'public_exponent';
  var identity = CERT + 'identity';
  var hex = CERT + 'hex';
  var decimal = CERT + 'decimal';

  // gets a resource identifer from a node
  var getResource = function(node, key) {
    var rval = null;

    // special case 'about'
    if(key === about) {
      if('@' in node && about in node['@']) {
        rval = node['@'][about];
      }
    }
    // any other resource
    else if(
       key in node &&
       typeof node[key] === 'object' && !forge.util.isArray(node[key]) &&
       '@' in node[key] && resource in node[key]['@']) {
      rval = node[key]['@'][resource];
    }

    return rval;
  };

  // parse XML
  uri = urllib.parse(uri);
  var xml2js = require('./xml2js');
  var parser = new xml2js.Parser();
  parser.addListener('end', function(result) {
    // normalize namespaces
    result = normalizeNs(result, {});

    // find grab all public keys whose identity matches hash from uri
    var keys = [];
    if(desc in result) {
      // normalize RDF descriptions to array
      if(!forge.util.isArray(result[desc])) {
        desc = [result[desc]];
      }
      else {
        desc = result[desc];
      }

      // collect properties for all resources
      var graph = {};
      for(var i = 0; i < desc.length; ++i) {
        var node = desc[i];
        var res = {};
        for(var key in node) {
          var obj = getResource(node, key);
          res[key] = (obj === null) ? node[key] : obj;
        }
        graph[getResource(node, about) || ''] = res;
      }

      // for every public key w/identity that matches the uri hash
      // save the public key modulus and exponent
      for(var r in graph) {
        var props = graph[r];
        if(identity in props &&
          type in props &&
          props[type] === publicKey &&
          props[identity] === uri.hash &&
          modulus in props &&
          exponent in props &&
          props[modulus] in graph &&
          props[exponent] in graph &&
          hex in graph[props[modulus]] &&
          decimal in graph[props[exponent]]) {
          keys.push({
            modulus: graph[props[modulus]][hex],
            exponent: graph[props[exponent]][decimal]
          });
        }
      }
    }

    sys.log('Public keys from RDF: ' + JSON.stringify(keys));
    callback(keys);
  });
  parser.parseString(data);
};

// compares two public keys for equality
var comparePublicKeys = function(key1, key2) {
  return key1.modulus === key2.modulus && key1.exponent === key2.exponent;
};

// gets the RDF data from a URL
var fetchUrl = function(url, callback, redirects) {
  // allow 3 redirects by default
  if(typeof(redirects) === 'undefined') {
    redirects = 3;
  }

  sys.log('Fetching URL: \"' + url + '\"');

  // parse URL
  url = forge.util.parseUrl(url);
  var client = http.createClient(
    url.port, url.fullHost, url.scheme === 'https');
  var request = client.request('GET', url.path, {
    'Host': url.host,
    'Accept': 'application/rdf+xml'
  });
  request.addListener('response', function(response) {
    var body = '';

    // error, return empty body
    if(response.statusCode >= 400) {
       callback(body);
    }
    // follow redirect
    else if(response.statusCode === 302) {
      if(redirects > 0) {
        // follow redirect
        fetchUrl(response.headers.location, callback, --redirects);
      }
      else {
        // return empty body
        callback(body);
      }
    }
    // handle data
    else {
      response.setEncoding('utf8');
      response.addListener('data', function(chunk) {
        body += chunk;
      });
      response.addListener('end', function() {
        callback(body);
      });
    }
  });
  request.end();
};

// does WebID authentication
var authenticateWebId = function(c, state) {
  var auth = false;

  // get client-certificate
  var cert = c.peerCertificate;

  // get public key from certificate
  var publicKey = {
    modulus: cert.publicKey.n.toString(16).toLowerCase(),
    exponent: cert.publicKey.e.toString(10)
  };

  sys.log(
    'Server verifying certificate w/CN: \"' +
    cert.subject.getField('CN').value + '\"\n' +
    'Public Key: ' + JSON.stringify(publicKey));

  // build queue of subject alternative names to authenticate with
  var altNames = [];
  var ext = cert.getExtension({name: 'subjectAltName'});
  if(ext !== null && ext.altNames) {
    for(var i = 0; i < ext.altNames.length; ++i) {
      var altName = ext.altNames[i];
      if(altName.type === 6) {
        altNames.push(altName.value);
      }
    }
  }

  // create authentication processor
  var authNext = function() {
    if(!auth) {
      // no more alt names, auth failed
      if(altNames.length === 0) {
        sys.log('WebID authentication FAILED.');
        c.prepare(JSON.stringify({
          success: false,
          error: 'Not Authenticated'
        }));
        c.close();
      }
      // try next alt name
      else {
        // fetch URL
        var url = altNames.shift();
        fetchUrl(url, function(body) {
          // get public key
          getPublicKey(body, url, function(keys) {
            // compare public keys from RDF until one matches
            for(var i = 0; !auth && i < keys.length; ++i) {
              auth = comparePublicKeys(keys[i], publicKey);
            }
            if(auth) {
              // send authenticated notice to client
              sys.log('WebID authentication PASSED.');
              state.authenticated = true;
              c.prepare(JSON.stringify({
                success: true,
                cert: forge.pki.certificateToPem(cert),
                webID: url,
                rdf: forge.util.encode64(body)
              }));
            }
            else {
              // try next alt name
              authNext();
            }
          });
        });
      }
    }
  };

  // do auth
  authNext();
};

// creates credentials (private key + certificate)
var createCredentials = function(cn, credentials) {
  sys.log('Generating 512-bit key-pair and certificate for \"' + cn + '\".');
  var keys = forge.pki.rsa.generateKeyPair(512);
  sys.log('key-pair created.');

  var cert = forge.pki.createCertificate();
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
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

  // save credentials
  credentials.key = forge.pki.privateKeyToPem(keys.privateKey);
  credentials.cert = forge.pki.certificateToPem(cert);

  sys.log('Certificate created for \"' + cn + '\": \n' + credentials.cert);
};

// initialize credentials
var credentials = {
  key: null,
  cert: null
};

// read private key from file
var readPrivateKey = function(filename) {
  credentials.key = fs.readFileSync(filename);
  // try to parse from PEM as test
  forge.pki.privateKeyFromPem(credentials.key);
};

// read certificate from file
var readCertificate = function(filename) {
  credentials.cert = fs.readFileSync(filename);
  // try to parse from PEM as test
  forge.pki.certificateFromPem(credentials.cert);
};

// parse command line options
var opts = require('opts');
var options = [
{ short       : 'v'
, long        : 'version'
, description : 'Show version and exit'
, callback    : function() { console.log('v1.0'); process.exit(1); }
},
{ short       : 'p'
, long        : 'port'
, description : 'The port to listen for WebSocket connections on'
, value       : true
},
{ long        : 'key'
, description : 'The server private key file to use in PEM format'
, value       : true
, callback    : readPrivateKey
},
{ long        : 'cert'
, description : 'The server certificate file to use in PEM format'
, value       : true
, callback    : readCertificate
}
];
opts.parse(options, true);

// create credentials for server
if(credentials.key === null || credentials.cert === null) {
  createCredentials('server', credentials);
}

// function to create TLS server connection
var createTls = function(websocket) {
  var state = {
    authenticated: false
  };
  return forge.tls.createConnection({
    server: true,
    caStore: [],
    sessionCache: {},
    // supported cipher suites in order of preference
    cipherSuites: [
       forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA,
       forge.tls.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA],
    connected: function(c) {
      sys.log('Server connected');

      // do WebID authentication
      try {
        authenticateWebId(c, state);
      }
      catch(ex) {
        c.close();
      }
    },
    verifyClient: true,
    verify: function(c, verified, depth, certs) {
      // accept certs w/unknown-CA (48)
      if(verified === 48) {
        verified = true;
      }
      return verified;
    },
    getCertificate: function(c, hint) {
       sys.log('Server using certificate for \"' + hint[0] + '\"');
       return credentials.cert;
    },
    getPrivateKey: function(c, cert) {
       return credentials.key;
    },
    tlsDataReady: function(c) {
       // send base64-encoded TLS data over websocket
       websocket.write(forge.util.encode64(c.tlsData.getBytes()));
    },
    dataReady: function(c) {
      // ignore any data until connection is authenticated
      if(state.authenticated) {
        sys.log('Server received \"' + c.data.getBytes() + '\"');
      }
    },
    closed: function(c) {
      sys.log('Server disconnected');
      websocket.end();
    },
    error: function(c, error) {
      sys.log('Server error: ' + error.message);
    }
  });
};

// create websocket server
var port = opts.get('port') || 8080;
ws.createServer(function(websocket) {
  // create TLS server connection
  var tls = createTls(websocket);

  websocket.addListener('connect', function(resource) {
    sys.log('WebSocket connected: ' + resource);

    // close connection after 30 second timeout
    setTimeout(websocket.end, 30 * 1000);
  });

  websocket.addListener('data', function(data) {
    // base64-decode data and process it
    tls.process(forge.util.decode64(data));
  });

  websocket.addListener('close', function() {
    sys.log('WebSocket closed');
  });
}).listen(port);

sys.log('WebSocket WebID server running on port ' + port);
