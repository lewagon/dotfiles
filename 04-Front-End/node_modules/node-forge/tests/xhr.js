/**
 * Forge XmlHttpRequest Test
 *
 * @author Dave Longley
 * @author David I. Lehn <dlehn@digitalbazaar.com>
 *
 * Copyright (c) 2009-2010 Digital Bazaar, Inc. All rights reserved.
 */
(function($)
{
   // load flash socket pool
   window.forge.socketPool = {};
   window.forge.socketPool.ready = function()
   {
      // init forge xhr
      forge.xhr.init({
         flashId: 'socketPool',
         policyPort: 19945,
         msie: $.browser.msie,
         connections: 10,
         caCerts: [],
         verify: function(c, verified, depth, certs)
         {
            // don't care about cert verification for test
            return true;
         }
      });
   };
   swfobject.embedSWF(
      'forge/SocketPool.swf', 'socketPool', '0', '0', '9.0.0',
      false, {}, {allowscriptaccess: 'always'}, {});
})(jQuery);

jQuery(function($)
{
   var cat = 'forge.tests.xhr';

   var tests = [];
   var passed = 0;
   var failed = 0;

   var init = function() {
      passed = failed = 0;
      $('.ready,.testing,.pass,.fail')
         .removeClass('ready testing pass fail');
      $('#status')
         .text('Ready.')
         .addClass('ready');
      $('#total').text(tests.length);
      $('#pass').text(passed);
      $('#fail').text(failed);
      $('.expect').empty();
      $('.result').empty();
      $('.time').empty();
      $('.timePer').empty();
      $('#start').removeAttr('disabled');
   };

   var start = function()
   {
      $('#start').attr('disabled', 'disabled');
      // meta! use tasks to run the task tests
      forge.task.start({
         type: 'test',
         run: function(task) {
            task.next('starting', function(task) {
               forge.log.debug(cat, 'start');
               $('#status')
                  .text('Testing...')
                  .addClass('testing')
                  .removeClass('idle');
            });
            $.each(tests, function(i, test) {
               task.next('test', function(task) {
                  var title = $('li:first', test.container);
                  if($('#scroll:checked').length === 1)
                  {
                     $('html,body').animate({scrollTop: title.offset().top});
                  }
                  title.addClass('testing');
                  test.run(task, test);
               });
               task.next('test', function(task) {
                  $('li:first', test.container).removeClass('testing');
               });
            });
            task.next('success', function(task) {
               forge.log.debug(cat, 'done');
               if(failed === 0) {
                  $('#status')
                     .text('PASS')
                     .addClass('pass')
                     .removeClass('testing');
               } else {
                  // FIXME: should just be hitting failure() below
                  $('#status')
                     .text('FAIL')
                     .addClass('fail')
                     .removeClass('testing');
               }
            });
         },
         failure: function() {
            $('#status')
               .text('FAIL')
               .addClass('fail')
               .removeClass('testing');
         }
      });
   };

   $('#start').click(function() {
      start();
   });

   $('#reset').click(function() {
      init();
   });

   var stressStats =
   {
      sent: 0,
      success: 0,
      error: 0
   };
   var stressStatsMessage = function()
   {
      return 'received:' + (stressStats.success + stressStats.error) + '/' +
         stressStats.sent + ' errors:' + stressStats.error;
   };

   $('#stress').click(function() {
      for(var i = 1; i <= 100; ++i)
      {
         (function(seqnum)
         {
            setTimeout(function()
            {
               $.ajax(
               {
                  type: 'GET',
                  url: '/result.txt?seq=' + seqnum,
                  beforeSend: function(xhr)
                  {
                     ++stressStats.sent;
                     xhr.setRequestHeader('Connection', 'close');
                  },
                  success: function(data, textStatus, xhr)
                  {
                     ++stressStats.success;
                     forge.log.debug(cat, 'xhr connection completed' +
                        ' seq:' + seqnum +
                        ' datalen:' + data.length + ' ' +
                        stressStatsMessage());
                  },
                  error: function(xhr, textStatus, errorThrown)
                  {
                     ++stressStats.error;
                     forge.log.error(cat, 'xhr connection failed' +
                        ' seq:' + seqnum + ' ' +
                        stressStatsMessage(), arguments);
                  },
                  xhr: forge.xhr.create
               });
            }, 0);
         })(i);
      }
      return false;
   });

   /**
    * Creates a simple XMLHttpRequest wrapper. For testing.
    */
   var createWrapper = function()
   {
      var UNSENT = 0;
      var OPENED = 1;
      var HEADERS_RECEIVED = 2;
      var LOADING = 3;
      var DONE = 4;

      var toWrap = new XMLHttpRequest();

      // create xhr wrapper object
      var xhr =
      {
         // FIXME: an EventListener
         onreadystatechange: null,
         // FIXME: readonly
         readyState: UNSENT,
         // FIXME: a string
         responseText: null,
         // FIXME: a document
         responseXML: null,
         // FIXME: readonly, returns the HTTP status code
         status: 0,
         // FIXME: readonly, returns the HTTP status message
         statusText: null,

         // FIXME: async, user, and password are optional
         open: function(method, url, async, user, password)
         {
            toWrap.open(method, url, async, user, password);
         },

         setRequestHeader: function(header, value)
         {
            toWrap.setRequestHeader(header, value);
         },

         // FIXME: data can be a string or a document
         send: function(data)
         {
            toWrap.send(data);
         },

         abort: function()
         {
            toWrap.abort();
            toWrap.onreadystatechange = null;
            toWrap = null;
         },

         // FIXME: return all response headers as a string
         getAllResponseHeaders: function()
         {
            return toWrap.getAllResponseHeaders();
         },

         // FIXME: return header field value
         getResponseHeader: function(header)
         {
            return toWrap.getResponseHeader(header);
         }
      };

      toWrap.onreadystatechange = function()
      {
         // copy attributes
         xhr.readyState = toWrap.readyState;
         xhr.responseText = toWrap.responseText;
         xhr.responseXML = toWrap.responseXML;

         if(toWrap.readyState == HEADERS_RECEIVED)
         {
            xhr.status = toWrap.status;
            xhr.statusText = toWrap.statusText;
         }

         if(xhr.onreadystatechange)
         {
            //forge.log.debug(cat, 'wrapper orsc', toWrap);
            xhr.onreadystatechange();
         }
      };

      return xhr;
   };

   var addTest = function(name, run)
   {
      var container = $('<ul><li>Test ' + name + '</li><ul/></ul>');
      var expect = $('<li>Expect: <span class="expect"/></li>');
      var result = $('<li>Result: <span class="result"/></li>');
      var time = $('<li>Time: <span class="time"/></li>');
      var timePer = $('<li>Time Per Iteration: <span class="timePer"/></li>');
      $('ul', container)
         .append(expect)
         .append(result)
         .append(time)
         .append(timePer);
      $('#tests').append(container);
      var test = {
         container: container,
         startTime: null,
         run: function(task, test) {
            test.startTime = new Date();
            run(task, test);
         },
         expect: $('span', expect),
         result: $('span', result),
         check: function() {
            var e = test.expect.text();
            var r = test.result.text();
            (e == r) ? test.pass() : test.fail();
         },
         pass: function(iterations) {
            var dt = new Date() - test.startTime;
            if(!iterations)
            {
               iterations = 1;
            }
            var dti = (dt / iterations);
            passed += 1;
            $('#pass').text(passed);
            $('li:first', container).addClass('pass');
            $('span.time', container).html(dt + 'ms');
            $('span.timePer', container).html(dti + 'ms');
         },
         fail: function(iterations) {
            var dt = new Date() - test.startTime;
            if(!iterations)
            {
               iterations = 1;
            }
            var dti = (dt / iterations);
            failed += 1;
            $('#fail').text(failed);
            $('li:first', container).addClass('fail');
            $('span.time', container).html(dt + 'ms');
            $('span.timePer', container).html(dti + 'ms');
         }
      };
      tests.push(test);
   };

   addTest('builtin xhr', function(task, test)
   {
      task.block();

      $.ajax(
      {
         type: 'GET',
         url: '/result.txt',
         success: function(data)
         {
            test.expect.html('expected result');
            test.result.html(data);
            task.unblock();
         },
         error: function()
         {
            task.fail();
         }
      });

      task.next(function(task)
      {
         test.pass();
      });
   });

   addTest('builtin xhr (10 serial)', function(task, test)
   {
      var N = 10;
      for(var i = 0; i < N; i++)
      {
         task.next(function(task)
         {
            task.parent.block();

            $.ajax(
            {
               type: 'GET',
               url: '/result.txt',
               success: function(data, textStatus)
               {
                  test.result.append('.');
                  task.parent.unblock();
               },
               error: function(xhr, textStatus, errorThrown)
               {
                  task.fail(N);
               }
            });
         });
      }

      task.next(function(task)
      {
         test.pass(N);
      });
   });

   addTest('builtin xhr (10 parallel)', function(task, test)
   {
      var N = 10;
      task.block(N);
      for(var i = 0; i < N; i++)
      {
         $.ajax(
         {
            type: 'GET',
            url: '/result.txt',
            success: function(data, textStatus)
            {
               test.result.append('.');
               task.unblock();
            },
            error: function(xhr, textStatus, errorThrown)
            {
               task.fail(N);
            }
         });
      }

      task.next(function(task)
      {
         test.pass(N);
      });
   });

   // test only works with non-IE
   if(!$.browser.msie)
   {
      addTest('generic wrapper xhr', function(task, test)
      {
         task.block();

         $.ajax(
         {
            type: 'GET',
            url: '/result.txt',
            success: function(data)
            {
               test.expect.html('expected result');
               test.result.html(data);
               task.unblock();
            },
            error: function()
            {
               task.fail();
            },
            xhr: createWrapper
         });

         task.next(function(task)
         {
            test.pass();
         });
      });

      addTest('generic wrapper xhr (10 serial)', function(task, test)
      {
         var N = 10;
         for(var i = 0; i < N; i++)
         {
            task.next(function(task)
            {
               task.parent.block();

               $.ajax(
               {
                  type: 'GET',
                  url: '/result.txt',
                  success: function(data, textStatus)
                  {
                     test.result.append('.');
                     task.parent.unblock();
                  },
                  error: function(xhr, textStatus, errorThrown)
                  {
                     task.fail(N);
                  },
                  xhr: createWrapper
               });
            });
         }

         task.next(function(task)
         {
            test.pass(N);
         });
      });

      addTest('generic wrapper xhr (10 parallel)', function(task, test)
      {
         var N = 10;
         task.block(N);
         for(var i = 0; i < N; i++)
         {
            $.ajax(
            {
               type: 'GET',
               url: '/result.txt',
               success: function(data, textStatus)
               {
                  test.result.append('.');
                  task.unblock();
               },
               error: function(xhr, textStatus, errorThrown)
               {
                  task.fail(N);
               },
               xhr: createWrapper
            });
         }

         task.next(function(task)
         {
            test.pass(N);
         });
      });
   }

   for(var i = 0; i < 3; i++) {
   addTest('TLS xhr ' + i, function(task, test)
   {
      task.block();

      $.ajax(
      {
         type: 'GET',
         url: '/result.txt',
         success: function(data, textStatus, xhr)
         {
            test.expect.html('expected result');
            test.result.html(data);
            task.unblock();
         },
         error: function(xhr, textStatus, errorThrown)
         {
            task.fail();
         },
         xhr: forge.xhr.create
      });

      task.next(function(task)
      {
         test.pass();
      });
   });
   }

   addTest('TLS xhr (10 serial)', function(task, test)
   {
      var N = 10;
      for(var i = 0; i < N; i++)
      {
         task.next(function(task)
         {
            task.parent.block();

            $.ajax(
            {
               type: 'GET',
               url: '/result.txt',
               success: function(data, textStatus, xhr)
               {
                  test.result.append('.');
                  task.parent.unblock();
               },
               error: function(xhr, textStatus, errorThrown)
               {
                  task.fail(N);
               },
               xhr: forge.xhr.create
            });
         });
      }

      task.next(function(task)
      {
         test.pass(N);
      });
   });

   addTest('TLS xhr (10 parallel) ' +
      '(hit "Reset" then "Start" to speed up - uses SSL session cache)',
      function(task, test)
   {
      var N = 10;
      task.block(N);
      for(var i = 0; i < N; i++)
      {
         $.ajax(
         {
            type: 'GET',
            url: '/result.txt',
            success: function(data, textStatus, xhr)
            {
               test.result.append('.');
               task.unblock();
            },
            error: function(xhr, textStatus, errorThrown)
            {
               task.fail(N);
            },
            xhr: forge.xhr.create
         });
      }

      task.next(function(task)
      {
         test.pass(N);
      });
   });

   init();
});
