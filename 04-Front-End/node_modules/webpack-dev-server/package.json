{
  "name": "webpack-dev-server",
  "version": "2.6.1",
  "author": "Tobias Koppers @sokra",
  "description": "Serves a webpack app. Updates the browser on changes.",
  "peerDependencies": {
    "webpack": "^2.2.0 || ^3.0.0"
  },
  "dependencies": {
    "ansi-html": "0.0.7",
    "bonjour": "^3.5.0",
    "chokidar": "^1.6.0",
    "compression": "^1.5.2",
    "connect-history-api-fallback": "^1.3.0",
    "del": "^3.0.0",
    "express": "^4.13.3",
    "html-entities": "^1.2.0",
    "http-proxy-middleware": "~0.17.4",
    "internal-ip": "^1.2.0",
    "loglevel": "^1.4.1",
    "opn": "4.0.2",
    "portfinder": "^1.0.9",
    "selfsigned": "^1.9.1",
    "serve-index": "^1.7.2",
    "sockjs": "0.3.18",
    "sockjs-client": "1.1.4",
    "spdy": "^3.4.1",
    "strip-ansi": "^3.0.0",
    "supports-color": "^3.1.1",
    "webpack-dev-middleware": "^1.11.0",
    "yargs": "^6.0.0"
  },
  "devDependencies": {
    "codecov.io": "^0.1.6",
    "css-loader": "~0.26.1",
    "eslint": "^3.4.0",
    "file-loader": "~0.10.0",
    "istanbul": "^0.4.5",
    "jquery": "^2.2.0",
    "less": "^2.5.1",
    "less-loader": "~2.2.0",
    "mocha": "^3.0.2",
    "mocha-sinon": "^1.1.6",
    "pug": "^2.0.0-beta5",
    "pug-loader": "^2.3.0",
    "should": "^11.1.0",
    "sinon": "^1.17.6",
    "style-loader": "~0.13.0",
    "supertest": "^2.0.1",
    "url-loader": "~0.5.6",
    "webpack": "^3.0.0",
    "ws": "^1.1.1"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git://github.com/webpack/webpack-dev-server.git"
  },
  "homepage": "http://github.com/webpack/webpack-dev-server",
  "main": "lib/Server.js",
  "bin": "bin/webpack-dev-server.js",
  "engines": {
    "node": ">=4.7"
  },
  "files": [
    "lib/",
    "bin",
    "client/",
    "ssl/"
  ],
  "scripts": {
    "prepublish": "npm run -s client-live && npm run -s client-index && npm run -s client-sockjs",
    "client-live": "webpack ./client/live.js client/live.bundle.js --color --config client/webpack.config.js -p",
    "client-index": "webpack ./client/index.js client/index.bundle.js --color --config client/webpack.config.js -p",
    "client-sockjs": "webpack ./client/sockjs.js client/sockjs.bundle.js --color --config client/webpack.sockjs.config.js -p",
    "lint": "eslint bin lib test examples client/{index,live,socket,sockjs,overlay,webpack.config}.js",
    "beautify": "npm run lint -- --fix",
    "test": "mocha --full-trace --check-leaks",
    "posttest": "npm run -s lint",
    "cover": "istanbul cover node_modules/mocha/bin/_mocha",
    "travis": "npm run cover -- --report lcovonly && npm run lint"
  }
}
