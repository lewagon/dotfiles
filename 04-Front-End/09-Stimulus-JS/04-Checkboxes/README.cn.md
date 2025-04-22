## 背景和目标

我们来建一个新的 Stimulus 控制器来，它可以让我们一次性选中所有复选框。

## 设置

从终端运行服务器：

```bash
serve
```

然后访问`localhost:8000`。你可以看到我们正在使用 Bootstrap。

这次，`Stimulus`已经在`index.html`的`<head>`中设置好了。

然而，你仍然需要习惯自己做JavaScript设置部分。打开`index.js`，在顶部导入Stimulus控制器，并在底部注册控制器。你可以将控制器命名为`CheckAllCheckboxesController`。

在空的`controllers`文件夹中创建一个`check_all_checkboxes_controller.js`文件，复制粘贴模板：

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

我们可以开始了！

## 详细参数

你的目标是实现一个复选框，它可以一次性选中所有复选框。

### 1. 准备你的HTML

这次，HTML已经为你提供了。

现在，让我们调整我们的HTML来**连接**控制器：
- 在哪个DOM元素上连接控制器？
- 连接它的语法是什么？

我们知道控制器将必须与复选框“Check all”以及其他4个类别复选框进行交互。在 Stimulus 中，控制器只能与其范围内的元素进行交互——也就是说，只能与其连接的 DOM 元素的子元素进行交互。所以，这里的问题是：“哪个元素同时包含'Check All'复选框和类别复选框？”

一旦你连接了控制器，就在`connect()`方法中添加一个`console.log`。回到你的浏览器，打开控制台，然后重新加载页面。你应该在控制台中看到你的消息。

### 2. 监听事件

我们现在想要在选中“Check all”复选框时选中所有复选框。这意味着，我们想要监听“Check all”复选框上发生的事件，然后为其他复选框触发一些代码逻辑。

在 Stimulus 中，监听事件是一个**Action**。但是我们监听的是哪个事件？

根据这个[MDN文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)，复选框会发出两种类型的事件：`change`和`click`。让我们使用`change`（就像“状态改变”一样）。

当事件`change`被触发时，我们将在'check-all-checkboxes'控制器上调用方法`checkAll()`。

让我们在HTML中实现这个 Stimulus action。

### 3. 实现事件回调

现在我们正在监听`change`复选框事件，让我们在 Stimulus 控制器中编写`checkAll`方法。

注意这个方法接受一个`event`参数。默认情况下，Stimulus actions 会用一个`event`对象作为参数调用该方法，就像[好老的`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)一样。

在这个方法中，你将需要：
- 当“Check All”复选框被点击时的状态。
- 如果它被选中了，那么，让我们选中所有其他复选框。
- 如果它没有被选中，那么，让我们取消选中所有其他复选框。

但是你如何在这个方法中访问所有其他复选框呢？好问题！

### 4. 考虑目标

首先，我们必须在控制器中列出目标。DOM 的哪个元素应该被标记为“复选框”？让我们记住，对我们来说，选择所有这些元素，然后对每一个元素进行迭代，使其标记为选中，这将是有用的。

_提示：记住，在原始的 JavaScript 中，你可以使用`querySelector`或`querySelectorAll`，这取决于你是否只想得到一个元素或所有匹配元素的数组？在 Stimulus 中有一个类似的想法！如果你说`this.cardTarget`，你将只得到一个带有`data-my-controller-target="card"`的元素。如果你说`this.cardTargets`，那么你将得到一个数组，其中包含所有带有`data-my-controller-target="card"`的元素，无论它们是 0 还是 50 个。[(source)](https://stimulus.hotwired.dev/reference/targets#properties)_

一旦你发现了你的目标，让我们在 HTML 中添加目标。

### 5. 实现逻辑

在实现目标之后，让我们回到我们的`#checkAll`方法。

这是我们要做的：
- 当“Check All”复选框被点击时的状态。
- 如果它被选中了，那么，让我们迭代所有的复选框目标，并将它们的`checked`属性更改为`true`。
- 如果它没有被选中，那么，让我们迭代所有的复选框目标，并将它们的`checked`属性更改为`false`。

你已经掌握了解决这个挑战的所有要点。

记得在浏览器中尝试你的 Stimulus 控制器的行为（手动测试），并随时添加`console.log`来了解你在`checkAll`方法中处理的东西。

轮到你了！

### 下一步：了解生命周期

注意`connect()`方法。Stimulus 控制器带有生命周期回调：
- `initialize()`（与 ES6 构造函数不同）
- `connect()`
- `disconnect()`

在控制器连接到一个 DOM 元素时，`connect()`被触发，带有`data-controller`属性。

如果你想阅读更多关于 Stimulus 控制器生命周期的内容，[阅读这篇文档](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)
