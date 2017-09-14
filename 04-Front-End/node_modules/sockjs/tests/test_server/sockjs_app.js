var sockjs = require('../../index');

exports.install = function(opts, server) {
    var sjs_echo = sockjs.createServer(opts);
    sjs_echo.on('connection', function(conn) {
        console.log('    [+] echo open    ' + conn);
        conn.on('close', function() {
            console.log('    [-] echo close   ' + conn);
        });
        conn.on('data', function(m) {
            var d  = JSON.stringify(m);
            console.log('    [ ] echo message ' + conn,
                        d.slice(0,64)+
                        ((d.length > 64) ? '...' : ''));
            conn.write(m);
        });
    });

    var sjs_close = sockjs.createServer(opts);
    sjs_close.on('connection', function(conn) {
        console.log('    [+] clos open    ' + conn);
        conn.close(3000, "Go away!");
        conn.on('close', function() {
            console.log('    [-] clos close   ' + conn);
        });
    });

    var sjs_ticker = sockjs.createServer(opts);
    sjs_ticker.on('connection', function(conn) {
        console.log('    [+] ticker open   ' + conn);
        var tref;
        var schedule = function() {
            conn.write('tick!');
            tref = setTimeout(schedule, 1000);
        };
        tref = setTimeout(schedule, 1000);
        conn.on('close', function() {
            clearTimeout(tref);
            console.log('    [-] ticker close   ' + conn);
        });
    });

    var broadcast = {};
    var sjs_broadcast = sockjs.createServer(opts);
    sjs_broadcast.on('connection', function(conn) {
        console.log('    [+] broadcast open ' + conn);
        broadcast[conn.id] = conn;
        conn.on('close', function() {
            delete broadcast[conn.id];
            console.log('    [-] broadcast close' + conn);
        });
        conn.on('data', function(m) {
            console.log('    [-] broadcast message', m);
            for(var id in broadcast) {
                broadcast[id].write(m);
            }
        });
    });

    var sjs_amplify = sockjs.createServer(opts);
    sjs_amplify.on('connection', function(conn) {
        console.log('    [+] amp open    ' + conn);
        conn.on('close', function() {
            console.log('    [-] amp close   ' + conn);
        });
        conn.on('data', function(m) {
            var n = Math.floor(Number(m));
            n = (n > 0 && n < 19) ? n : 1;
            console.log('    [ ] amp message: 2^' + n);
            conn.write(Array(Math.pow(2, n)+1).join('x'));
        });
    });


    sjs_echo.installHandlers(server, {prefix:'/echo',
                                      response_limit: 4096}),
    sjs_echo.installHandlers(server, {prefix:'/disabled_websocket_echo',
                                      websocket: false});
    sjs_echo.installHandlers(server, {prefix:'/cookie_needed_echo',
                                      jsessionid: true});
    sjs_close.installHandlers(server, {prefix:'/close'});
    sjs_ticker.installHandlers(server, {prefix:'/ticker'});
    sjs_amplify.installHandlers(server, {prefix:'/amplify'});
    sjs_broadcast.installHandlers(server, {prefix:'/broadcast'});
};
