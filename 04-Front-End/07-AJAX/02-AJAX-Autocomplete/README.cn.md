## 背景和目标

这是我们的第二个AJAX练习。我们会创建一个具有自动完成功能的输入。那是什么呢？前往[Google](https://www.google.com/) 看一个示例：当你在输入框中输入**一个**字符，你就会在下面得到自动完成的建议。

我们想用**字典单词**建立一个自动完成输入。

## 详细说明

启动你的本地网络服务器：

```bash
serve
```

你需要更新三个文件：

- `index.html` - 输入已经就位，但自动完成的`ul`中有一些不需要的元素可以删除。
- `style.css` - 添加一些样式
- `lib/index.js` - 你将从这里开始写码！

你可以使用以下API获得建议：

```bash
GET https://wagon-dictionary.herokuapp.com/autocomplete/:stem
```

在这里，你会把`:stem`替换成用户输入的字符。一旦用户输入一个新字符 (或许试试 `keyup`?), 你会触发一个新的AJAX调用。如果你查看Chrome Inspector中的“网络”选项栏，你会看到如下内容：

```bash
https://wagon-dictionary.herokuapp.com/autocomplete/u
https://wagon-dictionary.herokuapp.com/autocomplete/un
https://wagon-dictionary.herokuapp.com/autocomplete/und
https://wagon-dictionary.herokuapp.com/autocomplete/unde
https://wagon-dictionary.herokuapp.com/autocomplete/under
etc.
```

当你从API接收到JSON时，你的任务就是用建议来更新`ul#results`列表！

当你实现了基本的行为，不要犹豫去尝试把`ul#results` 变得 🎨 非常好看 🎨 😋
