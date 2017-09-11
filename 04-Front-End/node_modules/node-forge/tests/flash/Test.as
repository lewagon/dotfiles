/*
 * Copyright (c) 2010 Digital Bazaar, Inc. All rights reserved.
 * 
 * @author Dave Longley
 */
package
{
   import flash.display.Sprite;
   
   public class Test extends Sprite
   {
      import flash.events.*;
      import flash.net.*;
      
      import flash.external.ExternalInterface;
      import flash.system.Security;
      
      public function Test()
      {
         try
         {
            // FIXME: replace 'localhost' with cross-domain host to hit
            var xhost:String = "localhost";
            Security.loadPolicyFile("xmlsocket://" + xhost + ":80");
            
            var loader:URLLoader = new URLLoader();
            loader.addEventListener(
               Event.COMPLETE, completeHandler);
            loader.addEventListener(
               Event.OPEN, openHandler);
            loader.addEventListener(
               ProgressEvent.PROGRESS, progressHandler);
            loader.addEventListener(
               SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
            loader.addEventListener(
               HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
            loader.addEventListener(
               IOErrorEvent.IO_ERROR, ioErrorHandler);
            
            var request:URLRequest = new URLRequest(
               "http://" + xhost + "/index.html");
            loader.load(request);
         }
         catch(e:Error)
         {
            log("error=" + e.errorID + "," + e.name + "," + e.message);
            throw e;
         }
      }
      
      private function log(obj:Object):void
      {
         if(obj is String)
         {
            var str:String = obj as String;
            ExternalInterface.call("console.log", "Test", str);
         }
         else if(obj is Error)
         {
            var e:Error = obj as Error;
            log("error=" + e.errorID + "," + e.name + "," + e.message);
         }
      }
      
      private function completeHandler(event:Event):void
      {
         var loader:URLLoader = URLLoader(event.target);
         log("complete: " + loader.data);
      }

      private function openHandler(event:Event):void
      {
         log("open: " + event);
      }

      private function progressHandler(event:ProgressEvent):void
      {
         log("progress:" + event.bytesLoaded + " total: " + event.bytesTotal);
      }

      private function securityErrorHandler(event:SecurityErrorEvent):void
      {
         log("securityError: " + event);
      }

      private function httpStatusHandler(event:HTTPStatusEvent):void
      {
         log("httpStatus: " + event);
      }

      private function ioErrorHandler(event:IOErrorEvent):void
      {
         log("ioError: " + event);
      }
   }
}
