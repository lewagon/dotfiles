<p align="center">
  <img src="docs/assets/stimulus-use-logo.png" width="500" srcset="docs/assets/stimulus-use-logo@2x.png 2x, docs/assets/stimulus-use-logo@3x.png 3x" />
</p>

<div align="center">

  **A collection of composable behaviors for your Stimulus Controllers**

  [![npm version](https://badgen.net/npm/v/stimulus-use)](https://npmjs.com/package/stimulus-use)
  [![minified + gzip size](https://badgen.net/bundlephobia/minzip/stimulus-use)](https://bundlephobia.com/result?p=stimulus-use)
  ![types included](https://badgen.net/npm/types/tslib)
  ![license](https://badgen.net/npm/license/stimulus-use)
  ![Sauce test status](./docs/assets/example-buildstatus-badge.png)

</div>
<br />

<p align="center">
  <img src="./docs/assets/stimulus-use example.png" alt="Stimulus Use Example">
</p>

<br />

- **New lifecycle behaviors**: adds new standard behaviors to your Stimulus controllers.
- **Composable**: compose at will different behaviors in a single controller with mixins.
- **Modular**: built as ES6 modules, just import what you need and tree shaking will remove the rest.
- **Typescript**: Types available, better autocompletion.
- **Tiny**: 3k gzip + tree shaking 🌳🌳🌳

## Getting Started

### Stimulus 3

If you want to use `stimulus-use` with Stimulus 3 you can use the version `0.50.0+`. This and all future versions are designed to work with the `@hotwired/stimulus` npm package. 

**Note:** If other packages still depend on the `stimulus` npm package you can safely keep that in your `package.json`, this won't break the `stimulus-use` compability.

#### Using npm
```bash
npm i stimulus-use @hotwired/stimulus
```

#### Using yarn
```bash
yarn add stimulus-use @hotwired/stimulus
```

### Stimulus 2 and below

If you want to use `stimulus-use` with Stimulus 2 (or below) you can use version `0.41.0`. This version is designed to work with the `stimulus` npm package.

#### Using npm
```bash
npm i stimulus-use@0.41.0 stimulus@2.0.0
```

#### Using yarn
```bash
yarn add stimulus-use@0.41.0 stimulus@2.0.0
```


## Documentation

We got you covered 👉 [stimulus-use.github.io/stimulus-use](https://stimulus-use.github.io/stimulus-use/#/)

## Mixins

### Observers

  This set of mixins is built around the [`Observer APIs`](https://developer.mozilla.org/en-US/docs/Web/API) and custom events to enhance your controllers with new behaviors.

  | Mixin | Description | NEW Callbacks |
  |-----------------------|-------------|---------------------|
  |[`useClickOutside`](./docs/use-click-outside.md)|Tracks the clicks outside of the element and adds a new lifecycle callback **clickOutside**.|`clickOutside`|
  |[`useHotkeys`](./docs/use-hotkeys.md)|Registers hotkeys using the [hotkeys-js](https://wangchujiang.com/hotkeys/) library and binds them to handler methods||
  |[`useHover`](./docs/use-hover.md)|Tracks the user's mouse movements over an element and adds **mouseEnter** and **mouseLeave** callbacks to your controller.|`mouseEnter` `mouseLeave`|
  |[`useIdle`](./docs/use-idle.md)| Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.|`away`</br> `back`|
  |[`useIntersection`](./docs/use-intersection.md) | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
  |[`useMatchMedia`](./docs/use-match-media.md) | Tracks if the window matches a media query string.| `is[Name]`, `not[Name]` and `[name]Changed`|
  |[`useMutation`](./docs/use-mutation.md) | Tracks mutations on an element, its attributes and/or subtree. Adds a **mutate** callback to your controller.|`mutate`|
  |[`useResize`](./docs/use-resize.md)|Tracks the element's size and adds a new lifecycle callback **resize**.|`resize`|
  |[`useTargetMutation`](./docs/use-target-mutation.md) | Tracks when targets are added or removed from the controller's scope, or their contents changed. Adds **[target]TargetAdded** , **[target]TargetRemoved** and **[target]TargetChanged** callback to your controller for each specified target.| `[target]TargetAdded` `[target]TargetRemoved` `[target]TargetChanged`|
  |[`useVisibility`](./docs/use-visibility.md) </br>| Tracks the page visibility and adds **visible**, **invisible** callbacks to your controller.|`visible`</br> `invisible`|
  |[`useWindowFocus`](./docs/use-window-focus.md) </br>| Tracks the window focus and adds **focus**, **unfocus** callbacks to your controller.|`focus`</br> `unfocus`|
  |[`useWindowResize`](./docs/use-window-resize.md)| Tracks the size of the `window` object and adds a new lifecycle callback **windowResize**.|`windowResize`|

### Optimization

  A set of mixin to optimize performances.

  | Mixin| Description |
  |------|-------------|
  |[`useDebounce`](./docs/use-debounce.md)|Adds the ability to specify an array "debounces" of functions to   debounce.|
  |[`useMemo`](./docs/use-memo.md)|Memoize expensive getters by mixing in `useMemo` and adding a static   `memos` array.|
  |[`useThrottle`](./docs/use-throttle.md)|Adds the ability to specify an array "throttles" of functions to throttle.|

### Animation

  A set of mixin and controllers to build animations.

  | Mixin| Description |
  |------|-------------|
  |[`useTransition`](./docs/use-transition.md)|Mixin or controller to apply classes to various stages of an element's transition.|

### Application
  | Mixin | Description |
  |------|-------------|
  |[`useApplication, ApplicationController`](./docs/application-controller.md)| supercharged controller for your application.|
  |[`useDispatch`](./docs/use-dispatch.md)|Adds a dispatch helper function to emit custom events. Useful to communicate between different controllers.|
  |[`useMeta`](./docs/use-meta.md)|Adds getters to easily access <head> meta values.|

## Extend or compose

Stimulus-use can be used in two ways:  **composing* with mixins* or **extending built-in controllers**

**Composing with mixins**

This is the prefered approach as it bring the most flexibility. Simply import a mixin and apply it in the `connect` or `initialize` to adds new behaviors to you controller. You can combine several mixins within the same controller.

```js
import { Controller } from '@hotwired/stimulus'
import { useIntersection, useResize } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
    useResize(this)
  }

  appear(entry) {
    // triggered when the element appears within the viewport
  }

  resize({ height, width }) {
    // trigered when the element is resized
  }
}
```

**Extending built-in controllers**

You can create your Stimulus controller from a pre-built Stimulus-use controller which offers the new behavior you're looking for.
This method works perfectly when you only need a single behavior for your controller.

```js
import { IntersectionController } from 'stimulus-use'

export default class extends IntersectionController {
  appear(entry) {
    // triggered when the element appears within the viewport
  }
}
```

## Development

- Fork the project locally
- `yarn install`
- `yarn start` - to run the local dev server with examples
- `yarn test` - to run the unit tests
- `yarn lint` - to run the linter with ESLint
- `yarn format` - to format changes with Prettier
- `yarn build` - to bundle the app into static files for production


## Contributors ✨

Made with :heart: by [@adrienpoly](https://twitter.com/adrienpoly), [@marcoroth](https://twitter.com/marcoroth_) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://marcoroth.dev"><img src="https://avatars2.githubusercontent.com/u/6411752?v=4?s=80" width="80px;" alt="Marco Roth"/><br /><sub><b>Marco Roth</b></sub></a><br /><a href="#infra-marcoroth" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=marcoroth" title="Code">💻</a> <a href="https://github.com/stimulus-use/stimulus-use/pulls?q=is%3Apr+reviewed-by%3Amarcoroth" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Amarcoroth" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://philippdaun.net"><img src="https://avatars3.githubusercontent.com/u/22225348?v=4?s=80" width="80px;" alt="Philipp Daun"/><br /><sub><b>Philipp Daun</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Adaun" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://code.digimonkey.com"><img src="https://avatars0.githubusercontent.com/u/74207?v=4?s=80" width="80px;" alt="M. E. Patterson"/><br /><sub><b>M. E. Patterson</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Amepatterson" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.argpar.se"><img src="https://avatars3.githubusercontent.com/u/2124818?v=4?s=80" width="80px;" alt="Jonathan Sundqvist"/><br /><sub><b>Jonathan Sundqvist</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=jonathan-s" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.rodloboz.com"><img src="https://avatars3.githubusercontent.com/u/23458442?v=4?s=80" width="80px;" alt="Rui Freitas"/><br /><sub><b>Rui Freitas</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=rodloboz" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://koudetat.co"><img src="https://avatars0.githubusercontent.com/u/7533706?v=4?s=80" width="80px;" alt="Nicolas Filzi"/><br /><sub><b>Nicolas Filzi</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=nfilzi" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bdarcet"><img src="https://avatars1.githubusercontent.com/u/9220278?v=4?s=80" width="80px;" alt="Benjamin Darcet"/><br /><sub><b>Benjamin Darcet</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=bdarcet" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/juancarlosasensio"><img src="https://avatars3.githubusercontent.com/u/37816105?v=4?s=80" width="80px;" alt="juancarlosasensio"/><br /><sub><b>juancarlosasensio</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=juancarlosasensio" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lidqqq.dev/"><img src="https://avatars3.githubusercontent.com/u/39523918?v=4?s=80" width="80px;" alt="lidqqq"/><br /><sub><b>lidqqq</b></sub></a><br /><a href="#infra-lidqqq" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Alidqqq" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.julianrubisch.at"><img src="https://avatars0.githubusercontent.com/u/4352208?v=4?s=80" width="80px;" alt="Julian Rubisch"/><br /><sub><b>Julian Rubisch</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=julianrubisch" title="Code">💻</a> <a href="https://github.com/stimulus-use/stimulus-use/pulls?q=is%3Apr+reviewed-by%3Ajulianrubisch" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chalkygames123"><img src="https://avatars1.githubusercontent.com/u/5608239?v=4?s=80" width="80px;" alt="Takuya Fukuju"/><br /><sub><b>Takuya Fukuju</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=chalkygames123" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jcoyne"><img src="https://avatars2.githubusercontent.com/u/92044?v=4?s=80" width="80px;" alt="Justin Coyne"/><br /><sub><b>Justin Coyne</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=jcoyne" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.asgerbehnckejacobsen.dk"><img src="https://avatars3.githubusercontent.com/u/1920077?v=4?s=80" width="80px;" alt="Asger Behncke Jacobsen"/><br /><sub><b>Asger Behncke Jacobsen</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=asgerb" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dancallaghan"><img src="https://avatars1.githubusercontent.com/u/1025380?v=4?s=80" width="80px;" alt="Dan Callaghan"/><br /><sub><b>Dan Callaghan</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=dancallaghan" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://Konnor.site"><img src="https://avatars2.githubusercontent.com/u/26425882?v=4?s=80" width="80px;" alt="Konnor Rogers"/><br /><sub><b>Konnor Rogers</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3AParamagicDev" title="Bug reports">🐛</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=ParamagicDev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://francisco.io/"><img src="https://avatars2.githubusercontent.com/u/2801252?v=4?s=80" width="80px;" alt="Francisco Presencia"/><br /><sub><b>Francisco Presencia</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=franciscop" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tsmd"><img src="https://avatars3.githubusercontent.com/u/490085?v=4?s=80" width="80px;" alt="Takayuki Shimada"/><br /><sub><b>Takayuki Shimada</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Atsmd" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Sub-Xaero"><img src="https://avatars0.githubusercontent.com/u/9960703?v=4?s=80" width="80px;" alt="Dylan Clarke"/><br /><sub><b>Dylan Clarke</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=Sub-Xaero" title="Code">💻</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=Sub-Xaero" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.howtoruby.com"><img src="https://avatars0.githubusercontent.com/u/1651750?v=4?s=80" width="80px;" alt="Martin Tomov"/><br /><sub><b>Martin Tomov</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=mtomov" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://symfonycasts.com"><img src="https://avatars.githubusercontent.com/u/121003?v=4?s=80" width="80px;" alt="Ryan Weaver"/><br /><sub><b>Ryan Weaver</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=weaverryan" title="Documentation">📖</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Aweaverryan" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Intrepidd"><img src="https://avatars.githubusercontent.com/u/803765?v=4?s=80" width="80px;" alt="Adrien S"/><br /><sub><b>Adrien S</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3AIntrepidd" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FlxAlbroscheit"><img src="https://avatars.githubusercontent.com/u/2439195?v=4?s=80" width="80px;" alt="Felix Albroscheit"/><br /><sub><b>Felix Albroscheit</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3AFlxAlbroscheit" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://guillaumebriday.fr"><img src="https://avatars.githubusercontent.com/u/8252238?v=4?s=80" width="80px;" alt="Guillaume Briday"/><br /><sub><b>Guillaume Briday</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=guillaumebriday" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/craisp"><img src="https://avatars.githubusercontent.com/u/16748711?v=4?s=80" width="80px;" alt="craisp"/><br /><sub><b>craisp</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Acraisp" title="Bug reports">🐛</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=craisp" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gahia"><img src="https://avatars.githubusercontent.com/u/8942202?v=4?s=80" width="80px;" alt="Gabriel"/><br /><sub><b>Gabriel</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Agahia" title="Bug reports">🐛</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=gahia" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/floodfx"><img src="https://avatars.githubusercontent.com/u/35109?v=4?s=80" width="80px;" alt="Donnie Flood"/><br /><sub><b>Donnie Flood</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=floodfx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ocarreterom.github.io"><img src="https://avatars.githubusercontent.com/u/11599942?v=4?s=80" width="80px;" alt="Óscar Carretero"/><br /><sub><b>Óscar Carretero</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/pulls?q=is%3Apr+reviewed-by%3Aocarreterom" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Aocarreterom" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=80" width="80px;" alt="Ikko Ashimine"/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=eltociear" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://michaeljcoyne.me"><img src="https://avatars.githubusercontent.com/u/82063?v=4?s=80" width="80px;" alt="Michael Coyne"/><br /><sub><b>Michael Coyne</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Amjc-gh" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://oll.ie"><img src="https://avatars.githubusercontent.com/u/342090?v=4?s=80" width="80px;" alt="Ollie Harridge"/><br /><sub><b>Ollie Harridge</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=ollietb" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/leon-vogt"><img src="https://avatars.githubusercontent.com/u/17851143?v=4?s=80" width="80px;" alt="Leon Vogt"/><br /><sub><b>Leon Vogt</b></sub></a><br /><a href="#infra-leon-vogt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=leon-vogt" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tkoenig"><img src="https://avatars.githubusercontent.com/u/63860?v=4?s=80" width="80px;" alt="Thomas König"/><br /><sub><b>Thomas König</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=tkoenig" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sc0ttman"><img src="https://avatars.githubusercontent.com/u/272701?v=4?s=80" width="80px;" alt="Scott"/><br /><sub><b>Scott</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Asc0ttman" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/daniel-rikowski"><img src="https://avatars.githubusercontent.com/u/1169363?v=4?s=80" width="80px;" alt="Daniel Rikowski"/><br /><sub><b>Daniel Rikowski</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Adaniel-rikowski" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://twitter.com/marckohlbrugge"><img src="https://avatars.githubusercontent.com/u/93276?v=4?s=80" width="80px;" alt="Marc Köhlbrugge"/><br /><sub><b>Marc Köhlbrugge</b></sub></a><br /><a href="#ideas-marckohlbrugge" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Acknowledgments

Continuous integration and cross browser testing is generously provided Sauce Labs.

[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-white.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)
