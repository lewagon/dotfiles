## 背景和目标

在这个练习中，我们将使用[Vue](https://vuejs.org/) JavaScript框架。

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

Vue的一大好处是，如果你使用它，你几乎再也不用手动`querySelector`或 `addEventListener`！取而代之，你将在特定元素上使用常规的 `v-` HTML属性。

让我们一起开始我们的第一个Vue挑战练习！

## 模版

继续, 打开 `index.html` 和 `lib/index.js` 然后查看里面的代码。

里面是一个带有许多选项框的HTML表单：
- 1x ”Check All“ 选项框
- 4x 带有各种种类名称的选项框

你可以启动webpack服务器：
```bash
yarn install
rake webpack
```

然后再在你的浏览器中打开相应网页：
```bash
open http://localhost:8080
```

你可以分别逐一的点击这些选项框，但是“Check All”选项框还没有一次性选择所有选项框的功能。这就是我们想要现在实现的功能，得益于JavaScript，和我们的新朋友:Vue.js。

## 第一步：安装Vue.js

**CDN**
对于制作原型或学习，你可以这样使用最新版本：

```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

你可以复制这一行代码到`index.html`来使用Vue。

**NPM**
在用 Vue 构建大型应用时推荐使用 NPM 安装[1]。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。

```bash
# 最新稳定版
npm install vue
```

接下来你可以继续使用Vue编写代码。

## 整体逻辑

我们需要做一下几件事：
- 检查“Check All”选项框的选择状态。
- 如果它被选择了，那么对于所有的目标选项框，我们将会`checked`属性改为`true`。
- 如果它没有被选择，那么对于所有的目标选项框，我们将会`checked`属性改为`false`。

## 选择`div`来进行交互

为了能够使用JS来和DOM交互，我们需要在我们的`new Vue({})`实例中使用`el`选项来选择我们想要控制的元素。这一次，我们可以选择整一个带有`container`类的`div`来和其中的所有元素进行交互。

## 监听一个事件
我们需要一个事件处理器在这里来监听`check-all`选项框的点击事件。所以，当每一次`check-all`选项框被点击时，一个方法（`checkAllBoxes`）将会被触发来帮我们实现上方所提到的逻辑。

除了我们之前学到的`querySelector`和`addEventListener`，你还记得我们在学习Vue的时候是如何处理事件的吗？


```js
// lib/controllers/zelda_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    console.log("The Zelda controller is now loaded!");
  }
}
```

让我们调整HTML以连接控制器：

```html
<div data-controller="zelda">
  <button class="btn btn-primary btn-lg">
    Click me!
  </button>
</div>
```

看到了吗？我们删除了按钮id, 这意味着之前在 `lib/index.js` 内的JS代码_不再好用_。 实际上，只要删除那个代码，然后继续使用Stimulus的init代码。换句话说，把下面这行之后的所有的代码都删掉：

```js
application.load(definitionsFromContext(context));
```

现在让我们暂停一下。我们想做什么？我们想要能够点击按钮并触发一个方法。可以这样做：

```html
<button data-action="click->zelda#play" [...]>
```

这将把 `click` 事件绑定到Stimulus `zelda_controller.js`里的 `play()` 方法。我们现在可以这样定义这个方法：

```js
// [...]

export default class extends Controller {
  // [...]

  play() {
    console.log("Button clicked! TODO: play a sound");
  }
}
```

单击按钮。控制台出现了新的代码行吗？太好了！如果没有，仔细检查每一步，问你的伙伴，最后可以像助教求助（open a ticket）。

下一步是播放声音。在 `play()` 方法中添加以下两行：

```js
const sound = new Audio('secret.mp3');
sound.play();
```

测试一下！它好用吗？很好！

那接下来呢？我们想：

- 当声音播放时，将按钮文本更改为`"Bingo !"`
- 声音播放时禁用按钮
- 当声音播放完毕，将按钮文本改回 `"Click me!"`
- 声音播放完毕后重新启用按钮

如果你看上面的代码，我们_没有使用_ Stimulus, 我们使用的是 `event.currentTarget` 引用按钮。在这里，我们将使用Stimulus的另一个特性，**target**。

重新打开HTML并添加另一个 `data-` 属性:

```html
<button data-zelda-target="trigger" [...]>
```

我们的按钮现在有一个叫做 `trigger` 的目标(target)，我们可以直接在Stimulus控制器中引用它：

```js
export default class extends Controller {
  static targets = [ "trigger" ];

  play() {
    // [... Existing code]
    console.log(this.triggerTarget);
  }
}
```

💡 如果你使用代码编辑器的linter，那么ESLint会抱怨语法错误。此练习未配置来支持[`babel-eslint`](https://github.com/babel/babel-eslint) 允许这种语法的包。可以忽略这个错误继续挑战。

继续，点击按钮。你能在控制台看到 `this.triggerTarget` 吗？它是否在引用文档对象模型（DOM）中的 `<button />` 元素？

我们现在可以安全地使用这个变量来运行以下代码，以满足上述的4个要求：

```js
play() {
  // [...]
  this.triggerTarget.innerText = "Bingo!";
  this.triggerTarget.setAttribute('disabled', '');
  sound.addEventListener("ended", () => {
    this.triggerTarget.removeAttribute('disabled');
    this.triggerTarget.innerText = "Click me!";
  });
}
```

## 揭示Stimulus的魔法

目前，这种重构可能看起来很枯燥，甚至更复杂。让我们对代码做一些修改，这样你就可以看到Stimulus有多强大了。

假设我们想添加 **第二个** 按钮, 它将播放另一个声音。另外，我们希望第二个按钮有另一个文本，让它更有意义。

简而言之，我们想实现我们自己的[Button Playground](https://www.myinstants.com/).

好的，让我们从一些HTML开始：

```html
<div data-controller="zelda">
  <button data-action="click->zelda#play" data-zelda-target="trigger" class="btn btn-success btn-lg">
    Treasure!
  </button>
</div>
```

重新加载页面，现在你可以看到第二个按钮。点击上面写着 `Treasure` 的绿色按钮。会发生什么？

- 是同一个声音吗？我们想要一个新的（见文件夹里的 `treasure.mp3` ）
- 声音播放完毕后，按钮文本是否回到 `Treasure` ？我们想要那个！

让我们从文本开始。现在，我们在JavaScript中有一个硬编码的 `innerText`集合，在播放`“ended”`回调中：

```js
this.triggerTarget.innerText = "Click me!";
```

我们想要的时_把它还原为初始状态_. 所以我们需要把初始状态储存在一个地方！我们可以用 `connect()` 方法：

```js
connect() {
  this.originalTriggerText = this.triggerTarget.innerText;
}
```

这样我们可以把  `"ended"` 回调里的代码改成：

```js
this.triggerTarget.innerText = this.originalTriggerText;
```

返回浏览器并点击这两个按钮。有效果吗？

现在让我们继续修改下一个错误，即两个按钮播放_相同的_声音。为什么？因为在Stimulus控制器中你有声音路径**硬编码**：

```js
const sound = new Audio('secret.mp3');
```

我们希望 `"secret.mp3"` 是一个变量。一个方法是在HTML再使用一个 `data-` 属性:

```html
<div data-controller="zelda" data-zelda-sound="treasure.mp3">
  <button data-action="click->zelda#play" data-zelda-target="trigger" class="btn btn-success btn-lg">
    Treasure!
  </button>
</div>
```

然后回到你的Stimulus控制器并更新 `Audio()` 构造函数的参数:

```js
const sound = new Audio(this.data.get('sound'));
```

它好用吗？很好，现在可以更新第一个按钮HTML，使它与更新好的的Stimulus控制器一起工作

## 总结

最后看下你的 `lib/controllers/zelda_controller.js` 文件.

- 你看到 `querySelector` 了吗? 没有, 这被替换为 `this.element` 和 **target**机制，它自动将 `this.$$$Target` 变量绑定到 `data-controller-name-target` 定义的元素。
- 你看到 `addEventListener` 了吗？没有，它被替换为 `data-action` ，语法为 `EVENT_TYPE->CONTROLLER_NAME#CALLBACK` 。你只需要在你的控制器中实现回调就可以了！

一旦实现了一个Stimulus控制器，在一个有正确HTML标记的网站上重复使用它是非常容易的。
