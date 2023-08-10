## 背景和目标

一个很快的热身练习！让我们来排练一下如何在JavaScript中将DOM事件绑定到某些操作上！

这总是相同的三步过程：

- **选择**要交互的元素
- **监听**元素上的某些事件
- 编写**回调**（事件发生时运行的代码）

## 详细参数

像往常一样，在`localhost:8000`上在浏览器中打开html页面：

```bash
serve
```

你应该看到一个大大的绿色按钮，上面写着`Click me!`。这个挑战的目标是在你点击它时让它显示一个[`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)，上面写着`Thank you!`。

打开`lib/index.js`，并按照伪代码开始写吧！

这个练习没有任何测试，但我们会检查你的代码风格！所以运行`rake`。
