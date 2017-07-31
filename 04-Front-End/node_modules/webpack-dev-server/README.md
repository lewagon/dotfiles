# webpack-dev-server

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>webpack Dev Server</h1>
</div>

Use [webpack](https://webpack.js.org) with a development server that provides live reloading. This should be used for **development only**.

It uses [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) under the hood, which provides fast in-memory access to the webpack assets.

<h2 align="center">Install</h2>

```
npm install webpack-dev-server --save-dev
```

<h2 align="center">Usage</h2>

The easiest way to use it is with the CLI. In the directory where your `webpack.config.js` is, run:

```
node_modules/.bin/webpack-dev-server
```

This will start a server, listening on connections from `localhost` on port `8080`.

Now, when you change something in your assets, it should live-reload the files.

See [**the documentation**](https://webpack.js.org/configuration/dev-server/#devserver) for more use cases and options.

<h2 align="center">Contributing</h2>

We appreciate all help! Check out [CONTRIBUTING.md](CONTRIBUTING.md) for more information on how to help.

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/SpaceK33z?v=3">
        <br />
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
    </tr>
  </tbody>
</table>

<h2 align="center">Inspiration</h2>

This project is heavily inspired by [peerigon/nof5](https://github.com/peerigon/nof5).

<h2 align="center">LICENSE</h2>

#### [MIT](./LICENSE)


[npm]: https://img.shields.io/npm/v/webpack-dev-server.svg
[npm-url]: https://npmjs.com/package/webpack-dev-server

[node]: https://img.shields.io/node/v/webpack-dev-server.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/webpack-dev-server.svg
[deps-url]: https://david-dm.org/webpack/webpack-dev-server

[tests]: http://img.shields.io/travis/webpack/webpack-dev-server.svg
[tests-url]: https://travis-ci.org/webpack/webpack-dev-server

[cover]: https://codecov.io/gh/webpack/webpack-dev-server/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack/webpack-dev-server

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
