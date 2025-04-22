## 背景和目标

我们已经学习了如何选择DOM元素，读取它的信息并更新它（文本，CSS等）。现在我们将看到如何对DOM事件做出反应，以创建交互式网站。

### 设置

让我们通过运行以下命令来启动本地web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。

## 详细说明

打开`index.html`文件。你可以看到我们用了Bootstrap。以及`<body>`中有一个大按钮。

你的目标是在`lib/listener.js`文件中实现一些JavaScript。**你应该对蓝色按钮的点击做出反应。**当按钮被点击时，我们希望这些事会发生：

- 按钮被禁用。这可以通过添加`.disabled`类来实现。
- 按钮文本从“Click me!”变为“Bingo!”
- 选做：让`sound.mp3`[在浏览器中播放](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)

在**Ubuntu**上运行的某些浏览器上，声音可能无法正常工作。要修复它，只需运行：

```bash
sudo apt-get install ubuntu-restricted-extras
```

这个练习没有测试，但我们会检查你的风格！所以运行`rake`。
