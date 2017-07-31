/**
 * Forge Web ID Tests
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010 Digital Bazaar, Inc. All rights reserved.
 */
(function($)
{
   // load flash socket pool
   window.forge.socketPool = {};
   window.forge.socketPool.ready = function()
   {
      // init page
      init($);
   };
   swfobject.embedSWF(
      'forge/SocketPool.swf', 'socketPool', '0', '0', '9.0.0',
      false, {}, {allowscriptaccess: 'always'}, {});
})(jQuery);

var init = function($)
{
   // logging category
   var cat = 'forge.tests.loginDemo';
   
   // local alias
   var forge = window.forge;
   try
   {
      // get query variables
      var query = forge.util.getQueryVariables();
      var domain = query.domain || '';
      var auth = query.auth || '';
      var redirect = query.redirect || '';
      var pport = query.pport || 843;
      redirect = 'https://' + domain + '/' + redirect;
      if(domain)
      {
         $('#domain').html('`' + domain + '`');
      } 
      
      // for chosen webid
      var chosen = null;
      
      // init forge xhr
      forge.xhr.init({
         flashId: 'socketPool',
         msie: $.browser.msie,
         url: 'https://' + domain,
         policyPort: pport,
         connections: 1,
         caCerts: [],
         verify: function(c, verified, depth, certs)
         {
            // don't care about cert verification for test
            return true;
         },
         getCertificate: function(c)
         {
            forge.log.debug(cat, 'using cert', chosen.certificate);
            return chosen.certificate;
         },
         getPrivateKey: function(c)
         {
            //forge.log.debug(cat, 'using private key', chosen.privateKey);
            return chosen.privateKey;
         }
      });
      
      // get flash API
      var flashApi = document.getElementById('socketPool');
      
      // get web ids collection
      var webids = forge.util.getItem(
         flashApi, 'forge.test.webid', 'webids');
      webids = webids || {};
      
      var id = 0;
      var list = $('<ul/>');
      for(var key in webids)
      {
         (function(webid)
         {
            var cert = forge.pki.certificateFromPem(webid.certificate);
            var item = $('<li/>');
            var button = $('<button>');
            button.attr('id', '' + (webid + id++));
            button.html('Choose');
            button.click(function()
            {
               button.attr('disabled', 'disabled');
               
               // set chosen webid
               chosen = webid;
               
               // do webid call
               $.ajax(
               {
                  type: 'GET',
                  url: '/' + auth,
                  success: function(data, textStatus, xhr)
                  {
                     if(data !== '')
                     {
                        forge.log.debug(cat, 'authentication completed');
                        forge.log.debug(cat, data);
                        window.name = data;
                     }
                     else
                     {
                        forge.log.debug(cat, 'authentication failed');
                        window.name = '';
                     }
                     window.location = redirect;
                  },
                  error: function(xhr, textStatus, errorThrown)
                  {
                     forge.log.error(cat, 'authentication failed');
                  },
                  xhr: forge.xhr.create
               });
            });
            item.append(button);
            item.append(' ' + key + '<br/>');
            
            // display certificate attributes
            var attr;
            for(var n = 0; n < cert.subject.attributes.length; ++n)
            {
               attr = cert.subject.attributes[n];
               item.append(attr.name + ': ' + attr.value + '<br/>');
            }
            
            list.append(item);
         })(webids[key]);
      }
      if(list.html() === '<ul/>')
      {
         list.append('None');
      }
      
      $('#webids').append(list);
   }
   catch(ex)
   {
      forge.log.error(cat, ex);
   }
};
