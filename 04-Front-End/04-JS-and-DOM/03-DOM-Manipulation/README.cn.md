## 背景和目标

我们做这个练习的目标是用在CSS模块里学的选择器动态地操作网页。

我们指的是操作文档对象模型[Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model) (需要VPN 🛡 ) (DOM), 它是**浏览器创建的HTML的内存表现**. 可以把它想象成家族谱：根节点（the root node）, 子辈（children）, 孙辈（grandchildren), 等等. 在那个树上，你可以:

- 横向移动来读取具体的节点
- 删除节点
- 添加节点

以上的任意行为都会立即改变网页的样子，无需点击”刷新“。

## 详细说明

打开 `lib/dom.js` 文件, 你会找到写着需要完成的挑战的列表。

来检测你的代码，打开一个新的终端并运行一下的命令:

```bash
rake webpack
```

然后在你最爱的浏览器里打开[`localhost:8080`](http://localhost:8080)。打开控制台（Console）.

修改一些`lib/dom.js`文件中的代码, 当你在代码编辑器里保存后, 在浏览器内网页会重新载入。

你的目标是通过所有测试！
