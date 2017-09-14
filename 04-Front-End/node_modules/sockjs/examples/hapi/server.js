/**
 * Created by Tony on 11/1/13.
 */
var http = require('http');
var sockjs = require('sockjs');
var Hapi = require('hapi');

// 1. Echo sockjs server
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

// Create a server with a host and port
var hapi_server = Hapi.createServer('0.0.0.0', 9999);

hapi_server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './html', listing: false, index: true }
    }
});

//hapi_server.listener is the http listener hapi uses
sockjs_echo.installHandlers(hapi_server.listener, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:9999' );
hapi_server.start();
