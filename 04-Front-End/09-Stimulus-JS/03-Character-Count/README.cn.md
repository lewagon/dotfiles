## 背景和目标

在你的 Stimulus 组件库中添加一个组件，你现在将实现一个组件，用于计算输入中的字符数。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-animation.gif)

Stimulus 控制器是可重用的。想想你将来可以在项目的许多不同功能中重用它们。这些控制器通常被称为`utilities`。

## 设置

从终端运行服务器：

```bash
serve
```

然后访问`localhost:8000`。你可以看到我们正在使用 Bootstrap。

这次，`Stimulus`已经在`index.html`的`<head>`中设置好了。

然而，你仍然需要习惯自己做JavaScript设置部分。打开`index.js`，在顶部导入Stimulus控制器，并在底部注册控制器。你可以将控制器命名为`CharacterCountController`。

在空的`controllers`文件夹中创建一个`character_count_controller.js`文件，复制粘贴模板：

```javascript
// lib/controllers/character_count_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

我们可以开始了！

## 详细参数

你的目标是实现一个计数器，用于计算文本区域中的字符数。

### 1. 构思概念

现在你有了一个基本的设置，想想这个组件的概念。这个组件的目的是什么？你将如何编码？拿一张纸，画出你的组件。它可能像这样：

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-mockup.png)

然后，问问自己这些问题：
- 我需要在 HTML 中添加 Stimulus targets 吗？例如，一个`counter`目标，用于显示数字。
- 我需要在 HTML 中添加 Stimulus actions 吗？
- 我需要在 HTML 中添加 Stimulus values 吗？

当你对你的组件有一个大致的想法时，你可以开始编码了！

### 2. 准备你的 HTML

在你的`index.html`中添加一个`<textarea>`标签。

然后添加一个小的`<div>`标签，它将作为计数器，显示字符数。

如果需要的话，添加 Bootstrap 类使它看起来漂亮。

### 3. 实现 Stimulus 控制器

确保将你的 Stimulus 控制器加到 DOM。

我们需要实现一个`updateCounter()`方法，它将在每次文本区域中计数和重新计数字符数。但是什么事件触发了该方法的调用？当找到时，将相应的 Stimulus `data-action`添加到文本区域。

在你的 Stimulus 控制器中，让我们现在编写事件回调。像往常一样，在方法中添加一个`console.log`，并检查每次调用事件时它是否工作。

一旦完成，想想下一步的伪代码。

### 4. 实现`updateCounter()`方法

当用户在文本区域中输入一个字符时，我们需要：
- 在文本区域中检索字符数。
- 用字符数更新计数器。

### 进一步：让我们实现一个字符限制！

现在你有了一个工作计数器，让我们添加一个字符限制。当用户输入超过 140 个字符时，计数器应该变成红色，并显示：`Number of charater exceeded by X characters（超过X字数了）`。
