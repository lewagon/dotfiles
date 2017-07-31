/*
 * Copyright (c) 2009-2010 Digital Bazaar, Inc. All rights reserved.
 * 
 * @author Dave Longley
 */
package
{
   import flash.display.Sprite;
   
   /**
    * A SocketPool is a flash object that can be embedded in a web page to
    * allow javascript access to pools of Sockets.
    * 
    * Javascript can create a pool and then as many Sockets as it desires. Each
    * Socket will be assigned a unique ID that allows continued javascript
    * access to it. There is no limit on the number of persistent socket
    * connections.
    */
   public class SocketPool extends Sprite
   {
      import flash.events.Event;
      import flash.events.EventDispatcher;
      import flash.errors.IOError;
      import flash.events.IOErrorEvent;
      import flash.events.ProgressEvent;
      import flash.events.SecurityErrorEvent;
      import flash.events.TextEvent;
      import flash.external.ExternalInterface;
      import flash.net.SharedObject;
      import flash.system.Security;
      import flash.utils.ByteArray;
      import mx.utils.Base64Decoder;
      import mx.utils.Base64Encoder;
      
      // a map of ID to Socket
      private var mSocketMap:Object;
      
      // a counter for Socket IDs (Note: assumes there will be no overflow)
      private var mNextId:uint;
      
      // an event dispatcher for sending events to javascript
      private var mEventDispatcher:EventDispatcher;
      
      /**
       * Creates a new, unitialized SocketPool.
       * 
       * @throws Error - if no external interface is available to provide
       *                 javascript access.
       */
      public function SocketPool()
      {
         if(!ExternalInterface.available)
         {
            trace("ExternalInterface is not available");
            throw new Error(
               "Flash's ExternalInterface is not available. This is a " +
               "requirement of SocketPool and therefore, it will be " +
               "unavailable.");
         }
         else
         {
            try
            {
               // set up javascript access:
               
               // initializes/cleans up the SocketPool
               ExternalInterface.addCallback("init", init);
               ExternalInterface.addCallback("cleanup", cleanup);
               
               // creates/destroys a socket
               ExternalInterface.addCallback("create", create);
               ExternalInterface.addCallback("destroy", destroy);
               
               // connects/closes a socket
               ExternalInterface.addCallback("connect", connect);
               ExternalInterface.addCallback("close", close);
               
               // checks for a connection
               ExternalInterface.addCallback("isConnected", isConnected);
               
               // sends/receives data over the socket
               ExternalInterface.addCallback("send", send);
               ExternalInterface.addCallback("receive", receive);
               
               // gets the number of bytes available on a socket
               ExternalInterface.addCallback(
                  "getBytesAvailable", getBytesAvailable);
               
               // add a callback for subscribing to socket events
               ExternalInterface.addCallback("subscribe", subscribe);
               
               // add callbacks for deflate/inflate
               ExternalInterface.addCallback("deflate", deflate);
               ExternalInterface.addCallback("inflate", inflate);
               
               // add callbacks for local disk storage
               ExternalInterface.addCallback("setItem", setItem);
               ExternalInterface.addCallback("getItem", getItem);
               ExternalInterface.addCallback("removeItem", removeItem);
               ExternalInterface.addCallback("clearItems", clearItems);
               
               // socket pool is now ready
               ExternalInterface.call("window.forge.socketPool.ready");
            }
            catch(e:Error)
            {
               log("error=" + e.errorID + "," + e.name + "," + e.message);
               throw e;
            }
            
            log("ready");
         }
      }
      
      /**
       * A debug logging function.
       * 
       * @param obj the string or error to log.
       */
      CONFIG::debugging
      private function log(obj:Object):void
      {
         if(obj is String)
         {
            var str:String = obj as String;
            ExternalInterface.call("console.log", "SocketPool", str);
         }
         else if(obj is Error)
         {
            var e:Error = obj as Error;
            log("error=" + e.errorID + "," + e.name + "," + e.message);
         }
      }
      
      CONFIG::release
      private function log(obj:Object):void
      {
         // log nothing in release mode
      }
      
      /**
       * Called by javascript to initialize this SocketPool.
       * 
       * @param options:
       *        marshallExceptions: true to pass exceptions to and from
       *           javascript.
       */
      private function init(... args):void
      {
         log("init()");
         
         // get options from first argument
         var options:Object = args.length > 0 ? args[0] : null;
         
         // create socket map, set next ID, and create event dispatcher
         mSocketMap = new Object();
         mNextId = 1;
         mEventDispatcher = new EventDispatcher();
         
         // enable marshalling exceptions if appropriate
         if(options != null &&
            "marshallExceptions" in options &&
            options.marshallExceptions === true)
         {
            try
            {
               // Note: setting marshallExceptions in IE, even inside of a
               // try-catch block will terminate flash. Don't set this on IE.
               ExternalInterface.marshallExceptions = true;
            }
            catch(e:Error)
            {
               log(e);
            }
         }
         
         log("init() done");
      }
      
      /**
       * Called by javascript to clean up a SocketPool.
       */
      private function cleanup():void
      {
         log("cleanup()");
         
         mSocketMap = null;
         mNextId = 1;
         mEventDispatcher = null;
         
         log("cleanup() done");
      }
      
      /**
       * Handles events.
       * 
       * @param e the event to handle.
       */
      private function handleEvent(e:Event):void
      {
         // dispatch socket event
         var message:String = (e is TextEvent) ? (e as TextEvent).text : null;
         mEventDispatcher.dispatchEvent(
            new SocketEvent(e.type, e.target as PooledSocket, message));
      }
      
      /**
       * Called by javascript to create a Socket.
       * 
       * @return the Socket ID.
       */
      private function create():String
      {
         log("create()");
         
         // create a Socket
         var id:String = "" + mNextId++;
         var s:PooledSocket = new PooledSocket();
         s.id = id;
         s.addEventListener(Event.CONNECT, handleEvent);
         s.addEventListener(Event.CLOSE, handleEvent);
         s.addEventListener(ProgressEvent.SOCKET_DATA, handleEvent);
         s.addEventListener(IOErrorEvent.IO_ERROR, handleEvent);
         s.addEventListener(SecurityErrorEvent.SECURITY_ERROR, handleEvent);
         mSocketMap[id] = s;
         
         log("socket " + id + " created");
         log("create() done");
         
         return id;
      }
      
      /**
       * Called by javascript to clean up a Socket.
       * 
       * @param id the ID of the Socket to clean up.
       */
      private function destroy(id:String):void
      {
         log("destroy(" + id + ")");
         
         if(id in mSocketMap)
         {
            // remove Socket
            delete mSocketMap[id];
            log("socket " + id + " destroyed");
         }
         
         log("destroy(" + id + ") done");
      }
      
      /**
       * Connects the Socket with the given ID to the given host and port,
       * using the given socket policy port.
       *
       * @param id the ID of the Socket.
       * @param host the host to connect to.
       * @param port the port to connect to.
       * @param spPort the security policy port to use, 0 to use a url.
       * @param spUrl the http URL to the policy file to use, null for default.
       */
      private function connect(
         id:String, host:String, port:uint, spPort:uint,
         spUrl:String = null):void
      {
         log("connect(" +
            id + "," + host + "," + port + "," + spPort + "," + spUrl + ")");
         
         if(id in mSocketMap)
         {
            // get the Socket
            var s:PooledSocket = mSocketMap[id];
            
            // load socket policy file
            // (permits socket access to backend)
            if(spPort !== 0)
            {
               spUrl = "xmlsocket://" + host + ":" + spPort;
               log("using cross-domain url: " + spUrl);
               Security.loadPolicyFile(spUrl);
            }
            else if(spUrl !== null && typeof(spUrl) !== undefined)
            {
               log("using cross-domain url: " + spUrl);
               Security.loadPolicyFile(spUrl);
            }
            else
            {
               log("not loading any cross-domain url");
            }
            
            // connect
            s.connect(host, port);
         }
         else
         {
            // no such socket
            log("socket " + id + " does not exist");
         }
         
         log("connect(" + id + ") done");
      }
      
      /**
       * Closes the Socket with the given ID.
       *
       * @param id the ID of the Socket.
       */
      private function close(id:String):void
      {
         log("close(" + id + ")");
         
         if(id in mSocketMap)
         {
            // close the Socket
            var s:PooledSocket = mSocketMap[id];
            if(s.connected)
            {
               s.close();
            }
         }
         else
         {
            // no such socket
            log("socket " + id + " does not exist");
         }
         
         log("close(" + id + ") done");
      }
      
      /**
       * Determines if the Socket with the given ID is connected or not.
       *
       * @param id the ID of the Socket.
       *
       * @return true if the socket is connected, false if not.
       */
      private function isConnected(id:String):Boolean
      {
         var rval:Boolean = false;
         log("isConnected(" + id + ")");
         
         if(id in mSocketMap)
         {
            // check the Socket
            var s:PooledSocket = mSocketMap[id];
            rval = s.connected;
         }
         else
         {
            // no such socket
            log("socket " + id + " does not exist");
         }
         
         log("isConnected(" + id + ") done");
         return rval;
      }
      
      /**
       * Writes bytes to a Socket.
       *
       * @param id the ID of the Socket.
       * @param bytes the string of base64-encoded bytes to write.
       *
       * @return true on success, false on failure. 
       */
      private function send(id:String, bytes:String):Boolean
      {
         var rval:Boolean = false;
         log("send(" + id + ")");
         
         if(id in mSocketMap)
         {
         	// write bytes to socket
            var s:PooledSocket = mSocketMap[id];
            try
            {
               var b64:Base64Decoder = new Base64Decoder();
               b64.decode(bytes);
               var b:ByteArray = b64.toByteArray();
               s.writeBytes(b, 0, b.length);
               s.flush();
               rval = true;
            }
            catch(e:IOError)
            {
               log(e);
               
               // dispatch IO error event
               mEventDispatcher.dispatchEvent(new SocketEvent(
                  IOErrorEvent.IO_ERROR, s, e.message));
               if(s.connected)
               {
                  s.close();
               }
            }
         }
         else
         {
            // no such socket
            log("socket " + id + " does not exist");
         }
         
         log("send(" + id + ") done");
         return rval;
      }
      
      /**
       * Receives bytes from a Socket.
       *
       * @param id the ID of the Socket.
       * @param count the maximum number of bytes to receive.
       *
       * @return an object with 'rval' set to the received bytes,
       *         base64-encoded, or set to null on error.
       */
      private function receive(id:String, count:uint):Object
      {
      	 var rval:String = null;
         log("receive(" + id + "," + count + ")");
         
         if(id in mSocketMap)
         {
         	// only read what is available
            var s:PooledSocket = mSocketMap[id];
            if(count > s.bytesAvailable)
            {
               count = s.bytesAvailable;
            }
            
            try
            {
               // read bytes from socket
               var b:ByteArray = new ByteArray();
               s.readBytes(b, 0, count);
               b.position = 0;
               var b64:Base64Encoder = new Base64Encoder();
               b64.insertNewLines = false;
               b64.encodeBytes(b, 0, b.length);
               rval = b64.toString();
            }
            catch(e:IOError)
            {
               log(e);
               
               // dispatch IO error event
               mEventDispatcher.dispatchEvent(new SocketEvent(
                  IOErrorEvent.IO_ERROR, s, e.message));
               if(s.connected)
               {
                  s.close();
               }
            }
         }
         else
         {
            // no such socket
            log("socket " + id + " does not exist");
         }
         
         log("receive(" + id + "," + count + ") done");
         return {rval: rval};
      }
      
      /**
       * Gets the number of bytes available from a Socket.
       *
       * @param id the ID of the Socket.
       *
       * @return the number of available bytes.
       */
      private function getBytesAvailable(id:String):uint
      {
         var rval:uint = 0;
         log("getBytesAvailable(" + id + ")");
         
         if(id in mSocketMap)
         {
            var s:PooledSocket = mSocketMap[id];
            rval = s.bytesAvailable;
         }
         else
         {
            // no such socket
            log("socket " + id + " does not exist");
         }
         
         log("getBytesAvailable(" + id +") done");
         return rval;
      }      
      
      /**
       * Registers a javascript function as a callback for an event.
       * 
       * @param eventType the type of event (socket event types).
       * @param callback the name of the callback function.
       */
      private function subscribe(eventType:String, callback:String):void
      {
         log("subscribe(" + eventType + "," + callback + ")");
         
         switch(eventType)
         {
            case Event.CONNECT:
            case Event.CLOSE:
            case IOErrorEvent.IO_ERROR:
            case SecurityErrorEvent.SECURITY_ERROR:
            case ProgressEvent.SOCKET_DATA:
            {
               log(eventType + " => " + callback);
               mEventDispatcher.addEventListener(
                  eventType, function(event:SocketEvent):void
               {
                  log("event dispatched: " + eventType);
                  
                  // build event for javascript
                  var e:Object = new Object();
                  e.id = event.socket ? event.socket.id : 0;
                  e.type = eventType;
                  if(event.socket && event.socket.connected)
                  {
                     e.bytesAvailable = event.socket.bytesAvailable;
                  }
                  else
                  {
                     e.bytesAvailable = 0;
                  }
                  if(event.message)
                  {
                     e.message = event.message;
                  }
                  
                  // send event to javascript
                  ExternalInterface.call(callback, e);
               });
               break;
            }
            default:
               throw new ArgumentError(
                  "Could not subscribe to event. " +
                  "Invalid event type specified: " + eventType);
         }
         
         log("subscribe(" + eventType + "," + callback + ") done");
      }
      
      /**
       * Deflates the given data.
       * 
       * @param data the base64-encoded data to deflate.
       * 
       * @return an object with 'rval' set to deflated data, base64-encoded.
       */
      private function deflate(data:String):Object
      {
         log("deflate");
         
         var b64d:Base64Decoder = new Base64Decoder();
         b64d.decode(data);
         var b:ByteArray = b64d.toByteArray();
         b.compress();
         b.position = 0;
         var b64e:Base64Encoder = new Base64Encoder();
         b64e.insertNewLines = false;
         b64e.encodeBytes(b, 0, b.length);
         
         log("deflate done");
         return {rval: b64e.toString()};
      }
      
      /**
       * Inflates the given data.
       * 
       * @param data the base64-encoded data to inflate.
       * 
       * @return an object with 'rval' set to the inflated data,
       *         base64-encoded, null on error.
       */
      private function inflate(data:String):Object
      {
         log("inflate");
         var rval:Object = {rval: null};
      	 
      	 try
      	 {
            var b64d:Base64Decoder = new Base64Decoder();
            b64d.decode(data);
            var b:ByteArray = b64d.toByteArray();
            b.uncompress();
            b.position = 0;
            var b64e:Base64Encoder = new Base64Encoder();
            b64e.insertNewLines = false;
            b64e.encodeBytes(b, 0, b.length);
            rval.rval = b64e.toString();
         }
         catch(e:Error)
         {
         	log(e);
            rval.error = {
                id: e.errorID,
                name: e.name,
                message: e.message
            };
         }
         
         log("inflate done");
         return rval;
      }
      
      /**
       * Stores an item with a key and arbitrary base64-encoded data on local
       * disk.
       * 
       * @param key the key for the item.
       * @param data the base64-encoded item data.
       * @param storeId the storage ID to use, defaults to "forge.storage".
       * 
       * @return an object with rval set to true on success, false on failure
       *         with error included.
       */
      private function setItem(
         key:String, data:String, storeId:String = "forge.storage"):Object
      {
         var rval:Object = {rval: false};
         try
         {
            var store:SharedObject = SharedObject.getLocal(storeId);
            if(!('keys' in store.data))
            {
               store.data.keys = {};
            }
            store.data.keys[key] = data;
            store.flush();
            rval.rval = true;
         }
         catch(e:Error)
         {
         	log(e);
         	rval.error = {
                id: e.errorID,
                name: e.name,
                message: e.message
            };
         }
         return rval;
      }
      
      /**
       * Gets an item from the local disk.
       * 
       * @param key the key for the item.
       * @param storeId the storage ID to use, defaults to "forge.storage".
       * 
       * @return an object with rval set to the item data (which may be null),
       *         check for error object if null.
       */
      private function getItem(
         key:String, storeId:String = "forge.storage"):Object
      {
         var rval:Object = {rval: null};
         try
         {
            var store:SharedObject = SharedObject.getLocal(storeId);
            if('keys' in store.data && key in store.data.keys)
            {
               rval.rval = store.data.keys[key];
            }
         }
         catch(e:Error)
         {
         	log(e);
            rval.error = {
                id: e.errorID,
                name: e.name,
                message: e.message
            };
         }
         return rval;
      }
      
      /**
       * Removes an item from the local disk.
       * 
       * @param key the key for the item.
       * @param storeId the storage ID to use, defaults to "forge.storage".
       * 
       * @return an object with rval set to true if removed, false if not.
       */
      private function removeItem(
         key:String, storeId:String = "forge.storage"):Object
      {
         var rval:Object = {rval: false};
         try
         {
            var store:SharedObject = SharedObject.getLocal(storeId);
            if('keys' in store.data && key in store.data.keys)
            {
               delete store.data.keys[key];
               
               // clean up storage entirely if empty
               var empty:Boolean = true;
               for(var prop:String in store.data.keys)
               {
                  empty = false;
                  break;
               }
               if(empty)
               {
                  store.clear();
               }
               rval.rval = true;
            }
         }
         catch(e:Error)
         {
            log(e);
            rval.error = {
                id: e.errorID,
                name: e.name,
                message: e.message
            };
         }
         return rval;
      }
      
      /**
       * Clears an entire store of all of its items.
       * 
       * @param storeId the storage ID to use, defaults to "forge.storage".
       * 
       * @return an object with rval set to true if cleared, false if not.
       */
      private function clearItems(storeId:String = "forge.storage"):Object
      {
         var rval:Object = {rval: false};
         try
         {
            var store:SharedObject = SharedObject.getLocal(storeId);
            store.clear();
            rval.rval = true;
         }
         catch(e:Error)
         {
            log(e);
            rval.error = {
                id: e.errorID,
                name: e.name,
                message: e.message
            };
         }
         return rval;
      }
   }
}
