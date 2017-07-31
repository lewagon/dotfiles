/* eslint-disable */
// adapted based on rackt/history (MIT)
// Node 0.10+
var execSync = require('child_process').execSync;
var fs = require('fs');

// Node 0.10 check
if (!execSync) {
  execSync = require('sync-exec');
}

function exec(command) {
  execSync(command, {
    stdio: [0, 1, 2]
  });
}

fs.stat('dist', function(error, stat) {
  // Skip building on Travis
  if (process.env.TRAVIS) {
    return;
  }

  if (error || !stat.isDirectory()) {
    // Create a directory to avoid getting stuck
    // in postinstall loop
    fs.mkdirSync('dist');
    exec('npm install --only=dev');
    exec('npm run build');
  }
});
