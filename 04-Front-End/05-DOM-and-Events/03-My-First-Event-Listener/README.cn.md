## 背景和目标

昨天，我们学习了如何选择文档对象模型(DOM)元素，如何在该元素上读取信息并更新（文字，CSS,等等). 今天我们会学习如何用	[DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Events)来创建交互的网页。

## 详细说明

启动你的本地网页服务器：

```bash
rake webpack
```

打开`index.html` 文件. 你可以看到我们使用的是Bootstrap. 另外，`<body>`内有一个大的按钮。

你的目标是在`lib/listener.js`文件实现一些JS代码. **你需要对点击蓝色按钮做出回应** 当点击按钮的时候，我们想要:

- 让按钮不可用。这个可以通过添加`.disabled`类来实现。
- 把按钮上的字从"Click me!" 变成 "Bingo!"
- 可选择: `sound.mp3` [在浏览器播放](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)

在一些运行**Ubuntu**的浏览器上可能没有声音。想改正的话，只需运行：

```bash
sudo apt-get install ubuntu-restricted-extras
```

这个练习没有测试，但是我们仍会检查你的代码样式！所以，运行`rake`.
