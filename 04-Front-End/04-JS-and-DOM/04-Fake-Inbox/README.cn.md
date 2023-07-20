## 背景和目标

想想Gmail的收件箱界面。你需要刷新页面才能看到新邮件吗？当然不需要！像Gmail这样的网站会定期获取新邮件并将其添加到列表的顶部。因此，它在初始页面加载**之后**向_DOM_添加新内容。

在这个挑战中，我们将有两个过程来测试我们的代码：
- 浏览器中
- 终端中

## 详细参数

We haven't seen AJAX yet, so we'll simulate email fetching for now. We have given you a skeleton in `lib/inbox.js` to get you started.
我们还没有学到AJAX，所以我们现在将模拟电子邮件获取。我们已经给你一个基本的框架在`lib/inbox.js`里，你可以从那里开始。

- 实现方法`hasNewMessage()`，它有20%的概率返回`true`（剩下概率返回`false`）。
- 实现方法`newMessage()`，它应该返回一个随机对象（即一个新的电子邮件）与`subject`和`sender`键。例如：


```js
{
  sender: 'GitHub Team',
  subject: 'Welcome to GitHub'
}
```

或者

```js
{
  sender: 'Arnold Schwarzenegger',
  subject: "I'm Back"
}
```

Now, we'll work by testing the code in the browser. In another terminal tab, run:
现在，我们将在浏览器中测试代码，来继续工作。在另一个终端窗口中运行：

```bash
serve
```

然后打开[localhost:8000](http://localhost:8000)。

如果你在`hasNewMessage()`方法中`console.log`，你应该会看到这个函数被调用了1000次。为什么？这来自于`inbox_examiner.js`测试文件的第43行！

## 任务

- 实现方法`appendMessageToDom(message)`，它接受一个带有`subject`和`sender`键的对象作为参数，并将这条新消息的新行附加到HTML文档中。检查`index.html`文件，查看以`unread`和`read`的示例。
- 然后，让我们把所有东西都结合起来吧。正如你在文件底部看到的，`refresh`方法每`1000`毫秒被调用一次。实现一个`hasNewMessage()`方法，如果有新的消息，就把它(`newMessage()`)添加到收件箱的顶部(`appendMessageToDom(message)`)。记得更新`h1`标题中的计数。
- （选做）[更新文档标题](https://developer.mozilla.org/en-US/docs/Web/API/Document/title)，这样未读消息计数器就会出现在你的标签标题中，就像真正的收件箱一样！
