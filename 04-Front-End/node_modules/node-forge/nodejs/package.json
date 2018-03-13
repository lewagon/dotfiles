{
  "name": "forge-nodejs-example",
  "version": "0.1.0",
  "private": true,
  "main": "server.js",
  "dependencies": {
    "express": "~3.1.0",
    "mocha": "~1.21.5",
    "chai": "~1.10.0",
    "grunt": "~0.4.5",
    "grunt-mocha": "~0.4.12"
  },
  "scripts": {
    "run": "node server",
    "test": "mocha -t 30000 -R spec test/*.js",
    "coverage": "rm -rf coverage && ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -u exports -t 30000 -R spec test/*.js",
    "coverage-lcov": "rm -rf coverage && ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha --report lcovonly -- -u exports -t 30000 -R spec test/*.js",
    "coverage-report": "./node_modules/.bin/istanbul report"
  },
  "devDependencies": {
    "istanbul": "^0.3.14",
    "mocha-lcov-reporter": "0.0.2"
  }
}
