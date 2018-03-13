var server = require('../server');
var grunt = require('grunt');

describe('browser', function() {
  it('should run tests', function(done) {
    this.timeout(60 * 1000 * 5);

    return server.main(function(err, info) {
      if(err) {
        return done(err);
      }

      grunt.initConfig({
        mocha: {
          all: {
            options: {
              reporter: 'List',
              urls: ['http://localhost:' + info.port + '/index.html']
            }
          }
        }
      });

      grunt.loadNpmTasks('grunt-mocha');

      grunt.registerInitTask('default', function() {
        grunt.task.run(['mocha']);
      });
      grunt.tasks(['default'], {
        //debug: true
      }, function() {
        if(err) {
          return done(err);
        }
        // finish immediately
        done(null);
        return info.server.close();
      });
    });
  });
});
