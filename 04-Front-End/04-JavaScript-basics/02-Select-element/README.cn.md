## 背景和目标

第一个挑战里，我们会从文档对象模型(DOM)里选择元素(element)。

### 设置

你应该已经安装了 `node` 和 `yarn`。在终端用以下代码确认一下:

```bash
node -v
# 你应该在这儿看到你node的版本号
yarn -v
# 你应该在这儿看到你yarn的版本号
```

如果没有的话, 你可以回到关于[macOS](https://github.com/lewagon/setup/blob/master/macos.cn.md#nodejs), 关于[Linux](https://github.com/lewagon/setup/blob/master/ubuntu.cn.md#nodejs) 或者 [Windows](https://github.com/lewagon/setup/blob/master/windows.cn.md#nodejs) 的设置内容.

## 详细说明

我们来运行以下代码来启动本地服务器：

```bash
rake webpack
```

然后, 在你最爱的浏览器里打开 [`localhost:8080`](http://localhost:8080)。

你应该会看到一个排好序的列表，里面是赢过 FIFA 世界杯次数最多的国家。

这个挑战的目标是选择法国的`<li>` 🇫🇷!

从文档对象模型(DOM)里选择元素(element)最简单也最直接的方式是**使用`id`**:

- 打开`index.html` 文件, 找到我们想要选择的元素然后给它设置一个`id`;
- 打开`lib/select.js` 文件然后写下 JavaScript 代码，用设置好的 id 来选择那个对应的元素，让函数返回`return`它!

祝大家选得开心 🎣

**N.B:** 在这个挑战里，测试的结果会在浏览器里直接显示！当你看到 `Congratulations!` 时，你可以 `add`, `commit`, `push` 然后继续下一个挑战！你也可以用 `rake` 检查代码样式.
