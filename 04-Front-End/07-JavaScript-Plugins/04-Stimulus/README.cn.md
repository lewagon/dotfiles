## 背景和目标

在这个练习中，我们将使用[Stimulus](https://stimulusjs.org/) JavaScript框架. 这个框架是由[Basecamp](https://basecamp.com/)创建的, 也是Ruby-on-Rails框架背后的公司。

这个框架的口号是“为你已经拥有的HTML提供一个适度的框架”。它是一个框架，你可以在项目期间使用它来帮助你组织JavaScript代码。它与rails配合得很好，因为它允许你在服务器端动态生成HTML（想想 MVC、Sinatra等），并插入一些JS行为。

Stimulus的一大好处是，如果你使用它，你几乎再也不用手动`querySelector`或 `addEventListener`！取而代之，你将在特定元素上使用常规的 `data-` HTML属性。

这个框架使用[ES6 类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), 这是自2015年（ES6发布年）以来为JavaScript添加面向对象编程(Object Oriented Programming)的完美补充。

## 从JavaScript类开始

让我们先用rake做一个小的Node练习:

```bash
rake
```

你需要把三个测试变成绿色。你需要知道的一切都在[这个MDN页面](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). 我们希望你在 `lib/user.js` 文件实现 `User` 类：

- 一个 `firstName` 实例变量
- 一个 `lastName` 实例变量
- 两个实例变量都由 `constructor` 初始化
- 一个 `fullName()` 实例方法返回连接好的名字和姓氏

这会是7行JS代码，想想你是如何在Ruby中进行面向对象编程的，这里的概念完全相同！

## 我的第一个事件监听器, Take 2

💡 这个挑战更像是一个帮助你探索Stimulus框架的教程。不要跳过任何一步，跟着我们的讲解走，会好的👌

还记得[我的第一个事件监听器](?path=04-Front-End/05-DOM-and-Events/03-My-First-Event-Listener) 练习吗? 你点击一个按钮然后这个[Zelda Ocarina of Time](https://www.youtube.com/watch?v=g2wzMZzdNJA) (需要VPN 🛡 ) 声音开始播放！

```html
<button id="clickme" class="btn btn-primary btn-lg">
  Click me!
</button>
```

```js
const button = document.querySelector('#clickme');
const sound = new Audio('secret.mp3');

button.addEventListener('click', (event) => {
  const clickedButton = event.currentTarget;
  clickedButton.setAttribute('disabled', '');
  clickedButton.innerText = 'Bingo!';
  sound.addEventListener("ended", () => {
    clickedButton.removeAttribute('disabled');
    clickedButton.innerText = "Click me!";
  });
  sound.play();
});
```

继续, 打开 `index.html` 和 `lib/index.js` 文件然后把上面的代码复制粘贴。都做完了后启动服务器，然后在浏览器检查按钮是否如我们期望的那样好用：

```bash
yarn install
rake webpack
```

```bash
open http://localhost:8080
```

查看我们如何改善在 `audio` 元素上监听 `ended` 事件时你提出的解决方案。这样，当声音播放完毕后，我们重新启用按钮并放回初始文本。

### 用Stimulus重构代码

我们会用Stimulus框架重构代码。在我们跳转到代码之前，请花一些时间阅读手册的以下几页，掌握以下这个框架诞生背后的理念：

- [Stimulus的起源](https://stimulusjs.org/handbook/origin)
- [简介](https://stimulusjs.org/handbook/introduction)
- [Hello Stimulus](https://stimulusjs.org/handbook/hello-stimulus)
- [创建真实的东西](https://stimulusjs.org/handbook/building-something-real)

结束后，我们用Stimulus[设置](https://stimulusjs.org/handbook/installing)我们的项目:

```bash
yarn add stimulus
mkdir lib/controllers # This is where we will add our Stimulus code
```

然后打开 `lib/index.js` 文件并在文件**开头**添加以下内容：

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// The rest of the code with document.querySelector('#clickme');
```

现在我们实现我们的**第一个 Stimulus 控制器**!

```bash
touch lib/controllers/zelda_controller.js
```

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

继续，点击按钮。你能在控制台看到 `this.triggerTarget` 吗？它是否在引用文档对象模型（DOM）中的 `<button>` 元素？

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
