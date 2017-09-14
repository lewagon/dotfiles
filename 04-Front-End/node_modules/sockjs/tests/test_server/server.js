var http = require('http');
var config = require('./config').config;
var sockjs_app = require('./sockjs_app');


var server = http.createServer();
server.addListener('request', function(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.writeHead(404);
    res.end('404 - Nothing here (via sockjs-node test_server)');
});
server.addListener('upgrade', function(req, res){
    res.end();
});

sockjs_app.install(config.server_opts, server);

console.log(" [*] Listening on", config.host + ':' + config.port);
server.listen(config.port, config.host);
