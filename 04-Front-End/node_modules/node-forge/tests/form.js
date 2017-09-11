/**
 * Forge Form Tests
 *
 * @author Dave Longley
 *
 * Copyright (c) 2011 Digital Bazaar, Inc. All rights reserved.
 */
(function($) {
$(document).ready(function()
{
   // logging category
   var cat = 'forge.tests.form';
   
   // local alias
   var forge = window.forge;
   
   $('form.ajax').each(function(i, form)
   {
      $(form).submit(function()
      {
         try
         {
            var f = forge.form.serialize($(this));
            forge.log.debug(cat, 'result:', JSON.stringify(f));
            $('#result').html(JSON.stringify(f));
            
            /* dictionary test
            var f = forge.form.serialize($(this), '.', {'username':'user'});
            forge.log.debug(cat, 'result:', JSON.stringify(f));
            */
         }
         catch(e)
         {
            console.log('exception', e.stack);
         }
         return false;
      });
   });
});
})(jQuery);
