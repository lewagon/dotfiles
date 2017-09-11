/*
 * Copyright (c) 2009 Digital Bazaar, Inc. All rights reserved.
 * 
 * @author Dave Longley
 */
package
{
   import flash.events.Event;
   
   /**
    * A helper class that contains the ID for a Socket.
    */
   public class SocketEvent extends Event
   {
      // the associated socket
      public var socket:PooledSocket;
      // an associated message
      public var message:String;
      
      /**
       * Creates a new SocketEvent.
       * 
       * @param type the type of event.
       * @param socket the associated PooledSocket.
       * @param message an associated message.
       */
      public function SocketEvent(
         type:String, socket:PooledSocket, message:String = null)
      {
         super(type, false, false);
         this.socket = socket;
         this.message = message;
      }
   }
}

