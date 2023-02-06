## 背景和目标

想一想Gmail邮箱收件箱的界面。你需要刷新页面来显示新的邮件吗？答案当然是**不**! 像Gmail这样的网站定期地提取新的邮件，然后把它们添加到列表的最上方。所以它是在初始页面加载**之后**，在_DOM_上添加新的内容。

## 详细说明

因为我们还没有见过AJAX, 所以我们目前会先模拟邮件提取。 我们在`lib/inbox.js` 文件中给你写好了一个大致的框架，你可以从那里开始。

- 实现 `hasNewMessage()` 方法 -- 有 20% 的概率返回 `true` (剩下的时间它会返回 `false`).
- 实现 `newMessage()` 方法 -- 它应该返回一个随机的对象 (i.e. 一封新邮件)，并含有 `subject` 和 `sender` 键(key). 比如说:

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

你可以`rake` 这两个方法.

现在, 我们来在浏览器上测试我们的代码(没有其它可用的 `rake` 了). 在一个新的终端上运行：

```bash
rake webpack
```

然后登录 [localhost:8080](http://localhost:8080).

## 任务

- 实现 `appendMessageToDom(message)` 方法，使用含有`subject` 和 `subject` 键(key)的对象作为参数，然后在HTML标记上附加新的一行代码。检查 `index.html` 文件，找找看`unread` 和 `read`行的例子。
- 然后，让我们把所有东西粘在一起。你可以在文件的底部看到， `refresh` 方法每隔`1000` 微秒会被调用。实现你的 `hasNewMessage()` 方法。如果有一个新的消息，添加它(`newMessage()`) 到收件箱的最上方(`appendMessageToDom(message)`)。要记得更新`h1` 标题里的计数器。
- (可选择完成的) [更新文件标题](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) 来让未读消息的计数器出现在你的网页标签的标题里，就像一个真实的收件箱那样！

