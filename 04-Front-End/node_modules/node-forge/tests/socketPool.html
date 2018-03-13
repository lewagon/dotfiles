<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <link type="text/css" rel="stylesheet" media="all" href="screen.css" />
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
      <script type="text/javascript" src="forge/util.js"></script>
      <script type="text/javascript" src="forge/socket.js"></script>
      <script type="text/javascript" src="forge/log.js"></script>
      
      <script type="text/javascript">
      //<![CDATA[
      // logging category
      var cat = 'forge.tests.socketPool';

      // feedback types
      var ERROR = '';
      var USER = 'user';
      var SOCKETPOOL = 'socketpool'
      var SOCKET = 'socket'

      function addFeedback(type, text)
      {
          var row = $('<tr/>')
             .append($('<td/>').html('&nbsp;'))
             .append($('<td/>').html('&nbsp;'))
             .append($('<td/>').html('&nbsp;'));
          switch(type)
          {
             case USER:
                row.children().eq(0).html(text);
                break;
             case SOCKETPOOL:
                row.children().eq(1).html(text);
                break;
             case SOCKET:
                row.children().eq(2).html(text);
                break;
             default:
                var msg = 'ERROR: bad feedback type:' + type;
                row.children().eq(1).html(msg);
                forge.log.error(cat, msg);
          }
          $('#feedback').append(row);
          forge.log.debug(cat, '[' + type + ']', text);
      };

      function _setState(stateSel)
      {
         $('.sp-control').filter(stateSel).removeAttr('disabled');
         $('.sp-control').filter(':not(' + stateSel + ')').attr('disabled', 'disabled');
         $('.sp-state').filter(stateSel).addClass('sp-state-on');
         $('.sp-state').filter(':not(' + stateSel + ')').removeClass('sp-state-on');
      };

      function setState(state)
      {
         switch(state)
         {
            case 'ready':
               _setState('.sp-ready');
               break;
            case 'initialized':
               _setState('.sp-ready,.sp-initialized');
               break;
            case 'created':
               _setState('.sp-ready,.sp-initialized,.sp-created');
               break;
            case 'connected':
               _setState('.sp-ready,.sp-initialized,.sp-created,.sp-connected');
               break;
            default:
               addFeedback(ERROR, 'ERROR: bad state: ' + state);
         };
      };

      window.forge.socketPool =
      {
         ready: function()
         {
            $(document).ready(function() {
               addFeedback(SOCKETPOOL, 'Ready');
               setState('ready');
            });
         }
      };
      
      swfobject.embedSWF(
         "forge/SocketPool.swf", "socketPool", "0", "0", "9.0.0",
         false, {}, {allowscriptaccess: 'always'}, {});
      
      // local alias
      var net = window.forge.net;

      // socket to use
      var socket;

      $(document).ready(function() {
         addFeedback(USER, 'Ready');
         $('#host').val(window.location.hostname);
         $('#port').val(window.location.port);
      });

      function sp_init()
      {
         net.createSocketPool({
            flashId: 'socketPool',
            policyPort: parseInt($('#policyPort').val()),
            msie: false
         });
         addFeedback(SOCKETPOOL, 'Initialized');
         setState('initialized');
         return false;
      };
      
      function sp_cleanup()
      {
         net.destroySocketPool({flashId: 'socketPool'});
         addFeedback(SOCKETPOOL, 'Cleaned up');
         setState('ready');
         return false;
      };

      function sp_create()
      {
         socket = net.createSocket({
            flashId: 'socketPool',
            connected: function(e)
            {
               forge.log.debug(cat, 'connected', e);
               addFeedback(SOCKET, 'Connected');
            },
            closed: function(e)
            {
               forge.log.debug(cat, 'closed', e);
               addFeedback(SOCKET, 'Closed. Type: ' + e.type);
               setState('created');
            },
            data: function(e)
            {
               forge.log.debug(cat, 'data received', e);
               forge.log.debug(cat, 'bytes available', socket.bytesAvailable());
               addFeedback(SOCKET,
                  'Data available: ' +
                  socket.bytesAvailable() +' bytes');
               var bytes = socket.receive(e.bytesAvailable);
               forge.log.debug(cat, 'bytes received', bytes);
            },
            error: function(e)
            {
               forge.log.error(cat, 'error', e);
               addFeedback(SOCKET, 'Error: ' + e);
            }
         });
         addFeedback(SOCKETPOOL, 'Created socket');
         setState('created');
         return false;
      };
      
      function sp_destroy()
      {
         socket.destroy();
         addFeedback(USER, 'Request socket destroy');
         setState('initialized');
         return false;
      };

      function sp_connect()
      {
         socket.connect({
            host: $('#host').val(),
            port: parseInt($('#port').val()),
            policyPort: parseInt($('#policyPort').val())
         });
         addFeedback(USER, 'Request socket connect');
         setState('connected');
      };

      function sp_isConnected()
      {
         var connected = socket.isConnected();
         addFeedback(USER, 'Socket connected check: ' + connected);
      };

      function sp_send()
      {
         socket.send('GET ' + $('#path').val() + ' HTTP/1.0\r\n\r\n');
         addFeedback(USER, 'Send GET request');
      };

      function sp_close()
      {
         socket.close();
         addFeedback(USER, 'Requst socket close');
         setState('created');
      };
      //]]>
      </script>
   </head>
   <body>
      <div class="nav"><a href="index.html">Forge Tests</a> / SocketPool</div>

      <div class="header">
         <h1>SocketPool Test</h1>
      </div>

      <div class="content">
         <!-- div used to hold the flash socket pool implemenation -->
         <div id="socketPool">
            <p>Could not load the flash SocketPool.</p>
         </div>
   
         <fieldset class="section">
            <ul>
               <li>This page tests a single socket connection to the local test server.</li>
               <li>Note that the selected server must serve a Flash cross-domain policy file on the selected policy port.</li>
               <li>Additional output available in the JavaScript console.</li>
            </ul>
         </fieldset>
   
         <fieldset class="section">
            <legend>State</legend>
            <p>State:
               <span class="sp-state sp-ready">Ready</span> &raquo;
               <span class="sp-state sp-initialized">Initialized</span> &raquo;
               <span class="sp-state sp-created">Created</span> &raquo;
               <span class="sp-state sp-connected">Connected</span>
            </p>
         </fieldset>
   
         <fieldset class="section">
            <legend>Controls</legend>
            <div id="controls">
               <table>
                  <tr><th>Action</th><th>Description</th></tr>
                  <tr>
                     <td><button id="init" disabled="disabled" class="sp-control sp-ready"
                        onclick="javascript:return sp_init();">init</button></td>
                     <td>Initialize SocketPool system.</td>
                  </tr>
                  <tr>
                     <td><button id="cleanup" disabled="disabled" class="sp-control sp-initialized"
                        onclick="javascript:return sp_cleanup();">cleanup</button></td>
                     <td>Cleanup SocketPool system.</td>
                  </tr>
                  <tr>
                     <td><button id="create" disabled="disabled" class="sp-control sp-initialized"
                        onclick="javascript:return sp_create();">create socket</button></td>
                     <td>Create a new test socket.</td>
                  </tr>
                  <tr>
                     <td><button id="destroy" disabled="disabled" class="sp-control sp-created"
                        onclick="javascript:return sp_destroy();">destroy socket</button></td>
                     <td>Destroy the test socket.</td>
                  </tr>
                  <tr>
                     <td><button id="connect" disabled="disabled" class="sp-control sp-created"
                        onclick="javascript:return sp_connect();">connect</button></td>
                     <td>Connect the socket to
                        host: <input id="host"/>
                        port: <input id="port"/>
                        policy port: <input id="policyPort" value="19945"/>
                     </td>
                  </tr>
                  <tr>
                     <td><button id="isConnected" disabled="disabled" class="sp-control sp-created"
                        onclick="javascript:return sp_isConnected();">is connected</button></td>
                     <td>Check if socket is connected.</td>
                  </tr>
                  <tr>
                     <td><button id="send" disabled="disabled" class="sp-control sp-connected"
                        onclick="javascript:return sp_send();">send</button></td>
                     <td>Send a GET request for
                        path: <input id="path" value="/"/>
                     </td>
                  </tr>
                  <tr>
                     <td><button id="close" disabled="disabled" class="sp-control sp-connected"
                        onclick="javascript:return sp_close();">close</button></td>
                     <td>Close the test socket.</td>
                  </tr>
               </table>
            </div>
         </fieldset>
   
         <fieldset class="section">
            <legend>Feedback</legend>
            <table id="feedback">
               <tr>
                  <th>User</th>
                  <th>SocketPool</th>
                  <th>Socket</th>
               </tr>
            </table>
         </fieldset>
      </div>
   </body>
</html>
