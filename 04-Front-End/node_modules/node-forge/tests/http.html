<html>
   <head>
      <link type="text/css" rel="stylesheet" media="all" href="screen.css" />
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
      <script type="text/javascript" src="forge/util.js"></script>
      <script type="text/javascript" src="forge/socket.js"></script>
      <script type="text/javascript" src="forge/http.js"></script>
      <script type="text/javascript" src="forge/log.js"></script>
      
      <script type="text/javascript">
      //<![CDATA[
      // logging category
      var cat = 'forge.tests.http';

      window.forge.socketPool =
      {
         ready: function()
         {
            forge.log.debug(cat, 'SocketPool ready.');
         }
      };

      swfobject.embedSWF(
         'forge/SocketPool.swf', 'socketPool', '0', '0', '9.0.0',
         false, {}, {allowscriptaccess: 'always'}, {});
      
      // local aliases
      var net = window.forge.net;
      var http = window.forge.http;
      var util = window.forge.util;

      var client;
      
      function client_init()
      {
         try
         {
            var sp = net.createSocketPool({
               flashId: 'socketPool',
               policyPort: 19945,
               msie: false
            });
            client = http.createClient({
               //url: 'http://' + window.location.host,
               socketPool: sp,
               connections: 10
            });
            
            document.getElementById('feedback').innerHTML =
               'HTTP client created';
         }
         catch(ex)
         {
            forge.log.error(cat, ex);
         }
         return false;
      }
      
      function client_cleanup()
      {
         var sp = client.socketPool;
         client.destroy();
         sp.destroy();
         document.getElementById('feedback').innerHTML =
            'HTTP client cleaned up';
         return false;
      }

      function client_send()
      {
         var request = http.createRequest({
            method: 'GET',
            path: '/'
            //body: 'echo=foo',
            //headers: [{'Content-Type': 'application/x-www-form-urlencoded'}]
         });
         
         client.send({
            request: request,
            connected: function(e)
            {
               forge.log.debug(cat, 'connected', e);
            },
            headerReady: function(e)
            {
               forge.log.debug(cat, 'header ready', e);
            },
            bodyReady: function(e)
            {
               forge.log.debug(cat, 'body ready', e);
            },
            error: function(e)
            {
               forge.log.error(cat, 'error', e);
            }
         });
         document.getElementById('feedback').innerHTML =
            'HTTP request sent';
         return false;
      }

      function client_send_10()
      {
         for(var i = 0; i < 10; ++i)
         {
            client_send();
         }
         return false;
      }

      function client_stress()
      {
         for(var i = 0; i < 10; ++i)
         {
            setTimeout(function()
            {
               for(var i = 0; i < 10; ++i)
               {
                  client_send();
               }
            }, 0);
         }
         return false;
      }
      
      function client_cookies()
      {
         var cookie =
         {
            name: 'test-cookie',
            value: 'test-value',
            maxAge: -1,
            secure: false,
            path: '/'
         };
         client.setCookie(cookie);
         forge.log.debug(cat, 'cookie', client.getCookie('test-cookie'));
      }

      function client_clear_cookies()
      {
         client.clearCookies();
      }

      function request_add_cookies()
      {
         var cookie1 =
         {
            name: 'test-cookie1',
            value: 'test-value1',
            maxAge: -1,
            secure: false,
            path: '/'
         };
         var cookie2 =
         {
            name: 'test-cookie2',
            value: 'test-value2',
            maxAge: -1,
            secure: false,
            path: '/'
         };
         var request = http.createRequest({
            method: 'GET',
            path: '/'
         });
         request.addCookie(cookie1);
         request.addCookie(cookie2);
         forge.log.debug(cat, 'request', request.toString());
      }

      function response_get_cookies()
      {
         var response = http.createResponse();
         response.appendField('Set-Cookie',
            'test-cookie1=test-value1; max-age=0; path=/; secure');
         response.appendField('Set-Cookie',
            'test-cookie2=test-value2; ' +
            'expires=Thu, 21-Aug-2008 23:47:25 GMT; path=/');
         var cookies = response.getCookies();
         forge.log.debug(cat, 'cookies', cookies);
      }
      
      //]]>
      </script>
   </head>
   <body>
      <div class="nav"><a href="index.html">Forge Tests</a> / HTTP</div>

      <div class="header">
         <h1>HTTP Test</h1>
      </div>

      <div class="content">

      <div id="socketPool">
         <p>Could not load the flash SocketPool.</p>
      </div>

      <fieldset class="section">
         <ul>
            <li>Use the controls below to test the HTTP client.</li>
            <li>You currently need a JavaScript console to view the output.</li>
         </ul>
      </fieldset>

      <fieldset class="section">
      <legend>Controls</legend>
         <button id="init" onclick="javascript:return client_init();">init</button>
         <button id="cleanup" onclick="javascript:return client_cleanup();">cleanup</button>
         <button id="send" onclick="javascript:return client_send();">send</button>
         <button id="send10" onclick="javascript:return client_send_10();">send 10</button>
         <button id="stress" onclick="javascript:return client_stress();">stress</button>
         <button id="client_cookies" onclick="javascript:return client_cookies();">cookies</button>
         <button id="clear_cookies" onclick="javascript:return client_clear_cookies();">clear cookies</button>
         <button id="add_cookies" onclick="javascript:return request_add_cookies();">add cookies</button>
         <button id="get_cookies" onclick="javascript:return response_get_cookies();">get cookies</button>
      </fieldset>

      <fieldset class="section">
      <legend>Feedback</legend>
      <p>Feedback from the flash SocketPool:</p>
      <div id="feedback">
      None
      </div>

      </div>
   </body>
</html>
