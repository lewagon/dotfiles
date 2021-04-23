## 背景和目标

这是一个可以很快完成的热身挑战! 我们来练习一下如何把一个文档对象模型(DOM)事件和JavaScript的一些动作绑定在一起！

还是相同的三步流程：

- **选择** 你想要交互的元素
- **监听** 元素上的事件
- 写出**回调** (事件发生时运行的代码)

## 详细说明

启动你的本地网络服务器：

```bash
rake webpack
```

在浏览器中打开 [`localhost:8080`](http://localhost:8080)。

你应该可以看到一个大的绿色按钮写着 `Click me!`。这个挑战的目的是当你点击按钮的时候，一个写着`Thank you!` 的[`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) 会出现。

打开 `lib/index.js` 文件然后对照着伪码说的写!

这个练习没有测试，但我们还是要检查你的代码样式! 所以请运行 `rake`.
