## 背景和目标

在这个挑战中，你将使用我们提供的API:**wagon-chat** API.
这个API可以让你和你的小伙伴们聊天八卦 😉

在这个练习中, 你需要对API代码发出 `GET` 和 `POST` 请求. 你将使用AJAX调用来实现一个动态聊天室，在这里你可以即时查看最新消息并发布新消息。


![突出显示的Gif动图](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/chat-room.gif)

## 资源
[wagon-chat API文档](https://github.com/lewagon/wagon-chat-api/blob/master/README.md)

## 详细说明

启动本地服务器 `serve`. 访问 `localhost:8000`.

### 视图逻辑

在这个挑战中的 `index.html` 文件里， 你将发现一个页面分为两个主要部分：

* 一个带有窗体（form)的 **发送按钮** , 把你的消息推送给chat API。
* 一个带有占位符的 **刷新按钮** , 你将在这里显示所有新消息。

从阅读[API文档](https://github.com/lewagon/wagon-chat-api/blob/master/README.md)开始。 你能找到多少个端点？你能找出哪个端点与表单相关吗？哪个和刷新按钮有关？

在`lib/index.js`文件内写你的JS代码.

### 刷新按钮: 提取最近的消息

在标记中，您可以找到 `#refresh` 按钮。点击时，我们希望显示你们组里所有人的所有最新评论！

你需要用`fetch` 向JS的API发出`GET`请求：阅读[文档](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) 查看此请求的结构以及API将返回什么。在接收到的数据中查找消息，并在DOM中显示每一条消息。

下面是一个示例消息：

```html
<li>A sample message (posted <span class="date">10 minutes ago</span>) by John</li>
```

### 发送按钮：将消息推送给API

是时候开始聊天并发布自己的信息了！

`#comment-form` 表单有两个输入值 (`#your-message` 和 `#your-name`)。 首先编写一个简单的脚本来检索输入值。一开始，你可以用 `console.log()` 查看各种值来确保一切运行顺利。这是一个基本的DOM练习，还没有涉及AJAX！

**提示**: 你需要防止窗体提交的默认行为(使用 `preventDefault()` 方法).

你的代码目前还不会将任何数据发布到服务器。为此，你需要通过添加一个 `POST` 请求来增强JavaScript代码，以发送要存储在API数据库中的数据。阅读 [文档](https://github.com/lewagon/wagon-chat-api/blob/master/README.md)，找出如何使用`fetch`生成请求。

下面是一个在[JSON占位符API](https://jsonplaceholder.typicode.com/)上使用`fetch`的示例:

```js
const message = { name: "George", body: "Hello from Kitt" };
const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url, {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(message)
})
.then(response => response.json())
.then((data) => {
  console.log(data);
});
```

### 自动刷新

是时候自动刷新你的应用了。摆脱那个“刷新聊天”的按钮！



聊天愉快！
