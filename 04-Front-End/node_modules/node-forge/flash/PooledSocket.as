/*
 * Copyright (c) 2009 Digital Bazaar, Inc. All rights reserved.
 * 
 * @author Dave Longley
 */
package
{
   import flash.net.Socket;
   
   /**
    * A helper class that contains the ID for a Socket.
    */
   public class PooledSocket extends Socket
   {
      // the ID in the related socket pool
      public var id:String;
   }
}
