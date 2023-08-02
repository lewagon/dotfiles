## Background & Objectives
## 背景和目标

In this unit, we'll be spending some time coding useful components for your future projects. This is a first step towards building your own library of components.
在这个单元里，我们将花一些时间为你未来的项目编写有用的组件。这是构建自己的组件库的第一步。

In this challenge, you'll be coding a Copy to Clipboard component. This component will be used to copy an API key like you will find on many online services.
在这个挑战中，你将编写一个复制到剪贴板组件。这个组件将被用来复制一个 API 密钥，就像你在许多其他在线应用中看到过的那样。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/copy-to-clipboard.gif)

## Setup
## 设置

Run the server from your terminal with:
从终端运行服务器：

```bash
serve
```

And visit `localhost:8000`. You can see a form with a readonly input containing an API key and a button allowing the user to easily copy it.
然后访问`localhost:8000`。你可以看到一个包含 API 密钥的只读输入框和一个按钮，允许用户轻松地复制它。你的任务是实现复制到剪贴板功能。

Your mission is to implement the copy to clipboard feature.


This time, `Stimulus` is already setup in the `index.html` head.
这次，`Stimulus`已经在`index.html`的`<head>`中设置好了。

However, you still need to get used to doing the JavaScript setup part yourself. Open `index.js` and import the Stimulus Controller on top and register the controller at the bottom. You can name the controller `CopyToClipboardController`.
然而，你仍然需要习惯自己做JavaScript设置部分。打开`index.js`，在顶部导入Stimulus控制器，并在底部注册控制器。你可以将控制器命名为`CopyToClipboardController`。

Create a `copy_to_clipboard_controller.js` file in the empty `controllers` folder, copy-paste the boilerplate:
在空的`controllers`文件夹中创建一个`copy_to_clipboard_controller.js`文件，复制粘贴模板：

```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

We're good to go!
我们可以开始了！

## Specs
## 详细参数

Your goal is to implement the callback that copies the text in the value of the input to the clipboard.
你的目标是实现回调，将输入值中的文本复制到剪贴板中。

Once you click on the *Copy to Clipboard* button, you can then use `ctrl + v` to paste the text in another text area.
一旦你点击了*Copy to Clipboard（复制到剪贴板）*按钮，你就可以使用`ctrl + v`将文本粘贴到另一个文本区域中。


### 1. Inspect the existing HTML
### 1. 检查现有的HTML

The provided HTML contains an input with interesting attributes. The `value` is already set in order to contain an API key by default at page load.
提供的HTML包含一个带有有趣属性的输入框。`value`已经设置好了，以便在页面加载时默认包含一个API密钥。

The `readonly` attribute ensures that no one is able to edit the existing text or introduce a typo.
`readonly`属性确保没有人能够编辑现有的文本或引入拼写错误。

### 2. Implement the Stimulus Controller
### 2. 实现Stimulus控制器

Make sure to attach your Stimulus Controller to the DOM with `data-controller`.
确保使用`data-controller`将你的Stimulus控制器附加到DOM上。

In your Stimulus Controller, you'll need to implement the `copy()` method. This method will be called when the user clicks on the button (think `data-action`). As always, make sure the `copy()` method is called with the right context. Put a `console.log` in the method, click on the button and check that you see the message in the browser console.
在你的Stimulus控制器中，你需要实现`copy()`方法。当用户点击按钮时，将调用此方法（想想`data-action`）。和往常一样，确保`copy()`方法在正确的上下文中被调用。在方法中放一个`console.log`，点击按钮，检查你是否在浏览器控制台中看到了这条消息。

Once this is done, think about the pseudocode for the `copy()` method. What do you need to do to copy the text in the input to the clipboard?
完成后，思考一下`copy()`方法的伪代码。你需要做什么来复制输入框中的文本到剪贴板上？

### 3. Implement the `copy()` method
### 3. 实现`copy()`方法

You'll need to use the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard). Have a look at the documentation, which method of the API do you need to use?
你需要使用[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)。看一下文档，你需要使用API的哪个方法？

What happens when we click on the button (have a look at the gif above):
当我们点击按钮时会发生什么（看一下上面的gif）：

- The text inside the input's value is copied to the clipboard (in more technical words, the text string is *written* to the system clipboard). To get the value of the input, how about implementing a data target `input` in your Stimulus Controller?
- 输入框中的文本被复制到剪贴板中（用更多的技术词汇来说，文本字符串被*写入*到系统剪贴板中）。要获取输入框的值，你怎么在Stimulus控制器中实现一个数据目标`input`呢？
- When clicked, the button becomes `disabled`. It is no longer clickable.
- 点击后，按钮变为`disabled`。它不再可点击。
- The text inside the button changes to "Copied!". This text could be changed from one context to another if we were meant to re-use this Stimulus controller. Instead of hard-coding it in the JavaScript, let's create a Stimulus data `value` called `feedback-text` and use it in the Stimulus controller. The button, when, disabled will display whatever text is assigned to the `feedback-text` data value.
- 按钮内部的文本变成了“Copied!”。如果我们打算重用这个Stimulus控制器，这个文本可以从一个上下文变成另一个上下文。我们不要在JavaScript中硬编码它，让我们创建一个名为`feedback-text`的Stimulus数据`value`，并在Stimulus控制器中使用它。当按钮被禁用时，将显示分配给`feedback-text`数据值的任何文本。
