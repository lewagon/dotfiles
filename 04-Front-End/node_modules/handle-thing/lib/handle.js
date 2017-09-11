var assert = require('assert');
var util = require('util');

var EventEmitter = require('events').EventEmitter;
var Buffer = require('buffer').Buffer;

var Queue = require('./queue');

// Node.js version
var mode = /^v0\.8\./.test(process.version) ? 'rusty' :
           /^v0\.(9|10)\./.test(process.version) ? 'old' :
           'modern';

function Handle(stream, options) {
  EventEmitter.call(this);

  this._stream = stream;
  this._flowing = false;
  this._reading = false;
  this._options = options || {};

  this.onread = null;

  // Pending requests
  this.pending = new Queue();

  // Start handle once `onread` is set
  if (mode === 'rusty') {
    var self = this;
    Object.defineProperty(this, 'onread', {
      set: function(value) {
        Object.defineProperty(self, 'onread', {
          value: value
        });
        process.nextTick(function() {
          self.readStart();
        });
      }
    });
  }

  // NOTE: v0.8 has some odd .pause()/.resume() semantics in http.js
  if (mode === 'rusty')
    this.writeQueueSize = 0;
  else if (mode !== 'modern')
    this.writeQueueSize = 1;

  if (mode === 'rusty') {
    if (this._stream)
      this._rustyInit();
    else
      this.once('stream', this._rustyInit);
  }
}
util.inherits(Handle, EventEmitter);
module.exports = Handle;

Handle.mode = mode;

Handle.create = function create(stream, options) {
  return new Handle(stream, options);
};

Handle.prototype._queueReq = function _queueReq(type, req) {
  return this.pending.append(type, req);
};

Handle.prototype._pendingList = function _pendingList() {
  var list = [];
  while (!this.pending.isEmpty())
    list.push(this.pending.first().dequeue());
  return list;
};

Handle.prototype.setStream = function setStream(stream) {
  assert(this._stream === null, 'Can\'t set stream two times');
  this._stream = stream;

  this.emit('stream', stream);
};

Handle.prototype.readStart = function readStart() {
  this._reading = true;

  if (!this._stream) {
    this.once('stream', this.readStart);
    return 0;
  }

  if (!this._flowing) {
    this._flowing = true;
    this._flow();
  }

  this._stream.resume();
  return 0;
};

Handle.prototype.readStop = function readStop() {
  this._reading = false;

  if (!this._stream) {
    this.once('stream', this.readStop);
    return 0;
  }
  this._stream.pause();
  return 0;
};

if (mode === 'modern') {
  var uv = process.binding('uv');

  Handle.prototype._flow = function flow() {
    var self = this;
    this._stream.on('data', function(chunk) {
      self.onread(chunk.length, chunk);
    });

    this._stream.on('end', function() {
      self.onread(uv.UV_EOF, new Buffer(0));
    });

    this._stream.on('close', function() {
      setImmediate(function() {
        if (self._reading)
          self.onread(uv.UV_ECONNRESET, new Buffer(0));
      });
    });
  };

  Handle.prototype._close = function _close() {
    var list = this._pendingList();

    var self = this;
    setImmediate(function() {
      for (var i = 0; i < list.length; i++) {
        var req = list[i];
        req.oncomplete(uv.UV_ECANCELED, self, req);
      }
    });

    this.readStop();
  };
} else if (mode === 'old') {
  Handle.prototype._flow = function flow() {
    var self = this;
    this._stream.on('data', function(chunk) {
      self.onread(chunk, 0, chunk.length);
    });

    this._stream.on('end', function() {
      var errno = process._errno;
      process._errno = 'EOF';
      self.onread(null, 0, 0);
      if (process._errno === 'EOF')
        process._errno = errno;
    });

    this._stream.on('close', function() {
      setImmediate(function() {
        if (!self._reading)
          return;

        var errno = process._errno;
        process._errno = 'ECONNRESET';
        self.onread(null, 0, 0);
        if (process._errno === 'ECONNRESET')
          process._errno = errno;
      });
    });
  };

  Handle.prototype._close = function _close() {
    var list = this._pendingList();

    var self = this;
    setImmediate(function() {
      for (var i = 0; i < list.length; i++) {
        process._errno = 'CANCELED';
        var req = list[i];
        req.oncomplete(-1, self, req);
      }
    });

    this.readStop();
  };
} else {
  Handle.prototype._rustyInit = function _rustyInit() {
    var self = this;

    this._stream.on('close', function() {
      process.nextTick(function() {
        if (!self._reading)
          return;

        var errno = global.errno;
        global.errno = 'ECONNRESET';
        self.onread(null, 0, 0);
        if (global.errno === 'ECONNRESET')
          global.errno = errno;
      });
    });
  };

  Handle.prototype._flow = function flow() {
    var self = this;
    this._stream.on('data', function(chunk) {
      self.onread(chunk, 0, chunk.length);
    });

    this._stream.on('end', function() {
      var errno = global.errno;
      global.errno = 'EOF';
      self.onread(null, 0, 0);
      if (global.errno === 'EOF')
        global.errno = errno;
    });
  };

  Handle.prototype._close = function _close() {
    var list = this._pendingList();

    var self = this;
    process.nextTick(function() {
      for (var i = 0; i < list.length; i++) {
        var req = list[i];
        global.errno = 'CANCELED';
        req.oncomplete(-1, self, req);
      }
    });

    this.readStop();
  };
}

if (mode === 'modern') {
  Handle.prototype.shutdown = function shutdown(req) {
    var wrap = this._queueReq('shutdown', req);

    if (!this._stream) {
      this.once('stream', function() {
        this._shutdown(wrap);
      });
      return 0;
    }

    return this._shutdown(wrap);
  };

  Handle.prototype._shutdown = function _shutdown(wrap) {
    var self = this;
    this._stream.end(function() {
      var req = wrap.dequeue();
      if (!req)
        return;

      req.oncomplete(0, self, req);
    });
    return 0;
  };
} else {
  Handle.prototype.shutdown = function shutdown(req) {
    if (!req)
      req = {};

    var wrap = this._queueReq('shutdown', req);

    if (!this._stream) {
      this.once('stream', function() {
        this._shutdown(wrap);
      });
      return req;
    }

    this._shutdown(wrap);

    return req;
  };

  Handle.prototype._shutdown = function _shutdown(wrap) {
    var self = this;
    this._stream.end(function() {
      var req = wrap.dequeue();
      if (!req)
        return;
      req.oncomplete(0, self, req);
    });
  };
}

if (mode !== 'rusty') {
  Handle.prototype.close = function close(callback) {
    this._close();

    if (!this._stream) {
      this.once('stream', function() {
        this.close(callback);
      });
      return 0;
    }

    if (this._options.close)
      this._options.close(callback);
    else
      process.nextTick(callback);

    return 0;
  };
} else {
  Handle.prototype.close = function close() {
    this._close();

    if (!this._stream)
      this.once('stream', this.close);
    else if (this._options.close)
      this._options.close(function() {});

    return 0;
  };
}

if (mode === 'modern') {
  Handle.prototype.writeEnc = function writeEnc(req, data, enc) {
    var wrap = this._queueReq('write', req);

    if (!this._stream) {
      this.once('stream', function() {
        this._writeEnc(wrap, req, data, enc);
      });

      return 0;
    }

    return this._writeEnc(wrap, req, data, enc);
  };

  Handle.prototype._writeEnc = function _writeEnc(wrap, req, data, enc) {
    var self = this;

    req.async = true;
    req.bytes = data.length;

    if (wrap.isEmpty())
      return 0;

    this._stream.write(data, enc, function() {
      var req = wrap.dequeue();
      if (!req)
        return;
      req.oncomplete(0, self, req);
    });

    return 0;
  };
} else {
  Handle.prototype.writeEnc = function writeEnc(data, ignored, enc, req) {
    if (!req)
      req = { bytes: data.length };

    var wrap = this._queueReq('write', req);

    if (!this._stream) {
      this.once('stream', function() {
        this._writeEnc(data, ignored, enc, wrap);
      });
      return req;
    }

    this._writeEnc(data, ignored, enc, wrap);
    return req;
  };

  Handle.prototype._writeEnc = function _writeEnc(data, ignored, enc, wrap) {
    var self = this;
    var buffer = new Buffer(data, enc);

    if (wrap.isEmpty())
      return;

    this._stream.write(buffer, function() {
      var req = wrap.dequeue();
      if (!req)
        return;
      req.oncomplete(0, self, req);
    });
  };
}

Handle.prototype.writeBuffer = function writeBuffer(req, data) {
  return this.writeEnc(req, data, null);
};

Handle.prototype.writeAsciiString = function writeAsciiString(req, data) {
  return this.writeEnc(req, data, 'ascii');
};

Handle.prototype.writeUtf8String = function writeUtf8String(req, data) {
  return this.writeEnc(req, data, 'utf8');
};

Handle.prototype.writeUcs2String = function writeUcs2String(req, data) {
  return this.writeEnc(req, data, 'ucs2');
};

Handle.prototype.writeBinaryString = function writeBinaryString(req, data) {
  return this.writeEnc(req, data, 'binary');
};

Handle.prototype.writeLatin1String = function writeLatin1String(req, data) {
  return this.writeEnc(req, data, 'binary');
};

// v0.8
Handle.prototype.getsockname = function getsockname() {
  if (this._options.getPeerName)
    return this._options.getPeerName();
  return null;
};

if (mode === 'modern') {
  Handle.prototype.getpeername = function getpeername(out) {
    var res = this.getsockname();
    if (!res)
      return -1;

    Object.keys(res).forEach(function(key) {
      out[key] = res[key];
    });

    return 0;
  };
} else {
  // v0.10
  Handle.prototype.getpeername = function getpeername() {
    return this.getsockname();
  };
}
