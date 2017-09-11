/**
 * Forge Tasks Test
 *
 * @author David I. Lehn <dlehn@digitalbazaar.com>
 *
 * Copyright (c) 2009-2010 Digital Bazaar, Inc. All rights reserved.
 */
jQuery(function($)
{
   var cat = 'forge.tests.tasks';

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
   
   var addTest = function(name, run)
   {
      var container = $('<ul><li>Test ' + name + '</li><ul/></ul>');
      var expect = $('<li>Expect: <span class="expect"/></li>');
      var result = $('<li>Result: <span class="result"/></li>');
      var time = $('<li>Time: <span class="time"/></li>');
      $('ul', container).append(expect).append(result).append(time);
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
         pass: function() {
            passed += 1;
            $('#pass').text(passed);
            $('li:first', container).addClass('pass');
            var dt = new Date() - test.startTime;
            $('span.time', container).html(dt);
         },
         fail: function() {
            failed += 1;
            $('#fail').text(failed);
            $('li:first', container).addClass('fail');
            var dt = new Date() - test.startTime;
            $('span.time', container).html(dt);
         }
      };
      tests.push(test);
   };

   addTest('pass', function(task, test) {
      test.pass();
   });

   addTest('check', function(task, test) {
      test.check();
   });

   addTest('task 1', function(task, test) {
      task.next(function(task) {
         test.pass();
      });
   });

   addTest('task check()', function(task, test) {
      test.expect.append('check');
      task.next(function(task) {
         test.result.append('check');
      });
      task.next(function(task) {
         test.check();
      });
   });

   addTest('serial 20', function(task, test) {
      // total
      var n = 20;
      // counter used in the tasks
      var taskn = 0;
      for(var i = 0; i < n; ++i) {
         test.expect.append(i + ' ');
         task.next(function(task) {
            test.result.append(taskn++ + ' ');
         });
      }
      task.next(function(task) {
         test.check();
      });
   });

   addTest('ajax block', function(task, test) {
      test.expect.append('.');
      task.next(function(task) {
         task.parent.block();
         $.ajax({
            type: 'GET',
            url: 'tasks.html',
            success: function() {
               test.result.append('.');
               task.parent.unblock();
            }
         });
      });
      task.next(function(task) {
         test.check();
      });
   });

   addTest('serial ajax', function(task, test) {
      var n = 10;
      for(var i = 0; i < n; ++i)
      {
         test.expect.append(i + ' ');
      }
      task.next(function(task) {
         // create parallel functions
         task.parent.block(n);
         for(var i = 0; i < n; ++i)
         {
            // pass value into closure
            (function(i)
            {
               // serial tasks
               task.next(function(ajaxTask)
               {
                  $.ajax({
                     type: 'GET',
                     url: 'tasks.html',
                     success: function() {
                        // results use top level task
                        test.result.append(i + ' ');
                        task.parent.unblock();
                     }
                  });
               });
            })(i);
         }
      });
      task.next(function(task) {
         test.check();
      });
   });

   addTest('parallel ajax', function(task, test) {
      task.next(function(task) {
         var n = 10;
         // create parallel functions
         var tasks = [];
         for(var i = 0; i < n; ++i)
         {
            // pass value into closure
            (function(i)
            {
               tasks.push(function(ajaxTask)
               {
                  $.ajax({
                     type: 'GET',
                     url: 'tasks.html',
                     success: function() {
                        // results use top level task
                        test.result.append(i + ' ');
                     }
                  });
               });
            })(i);
         }
         // launch in parallel
         task.parallel(tasks);
      });
      task.next(function(task) {
         test.pass();
      });
   });

   addTest('linear empty tasks rate', function(task, test) {
      test.expect.append('-');
      // total
      var n = 100;
      var start = new Date();
      for(var i = 0; i < n; ++i) {
         // empty task
         task.next(function(task) {});
      }
      task.next(function(task) {
         var dt = (new Date() - start) / 1000;
         var res = $('<ul/>')
            .append('<li>Tasks: ' + n + '</li>')
            .append('<li>Time: ' + dt + 's</li>')
            .append('<li>Rate: ' + n/dt + ' tasks/s</li>')
            .append('<li>Task Time: ' + 1000*dt/n + ' ms/tasks</li>');
         test.result.html(res);
         test.pass();
      });
   });

   addTest('sleep', function(task, test) {
      test.expect.append('-');
      var st = 1000;
      var start = new Date();
      task.next(function(task) {
         task.sleep(st);
      });
      task.next(function(task) {
         var dt = new Date() - start;
         var res = $('<ul/>')
            .append('<li>Sleep Time : ' + st + 'ms</li>')
            .append('<li>Real Time: ' + dt + 'ms</li>')
            .append('<li>Diff: ' + (dt-st) + 'ms</li>');
         test.result.html(res);
         test.pass();
      });
   });
   
   addTest('serial 20 + sleep', function(task, test) {
      // total
      var n = 20;
      // counter used in the tasks
      var taskn = 0;
      for(var i = 0; i < n; ++i) {
         test.expect.append(i + ' ');
         task.next(function(task) {
            task.sleep(20);
            test.result.append(taskn++ + ' ');
         });
      }
      task.next(function(task) {
         test.check();
      });
   });
   
   addTest('concurrent tasks', function(task, test)
   {
      var colors = [
         'red',
         'green',
         'blue',
         'black',
         'purple',
         'goldenrod',
         'maroon',
         'gray',
         'teal',
         'magenta'
      ];
      var count = colors.length;
      task.next(function(task)
      {
         var main = task;
         task.block(count);
         
         var tasks = [];
         for(var i = 0; i < count; ++i)
         {
            var makefunction = function(index)
            {
               return function(task)
               {
                  // total
                  var n = 20;
                  // counter used in the tasks
                  var taskn = 0;
                  for(var j = 0; j < n; j++)
                  {
                     task.next(function(task)
                     {
                        test.result.append(
                           '<span style=\"color:' + colors[index] + ';\">' +
                           taskn++ + '</span> ');
                     });
                  }
                  task.next(function(task)
                  {
                     main.unblock();
                  });
               };
            };
            tasks.push(
            {
               type: 'concurrent' + i,
               run: makefunction(i)
            });
         }
         
         for(var i = 0; i < count; ++i)
         {
            forge.task.start(tasks[i]);
         }
      });
      
      task.next(function(task) {
         test.pass();
      });
   });

   init();
});
