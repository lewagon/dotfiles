## 背景和目标

终端应用很酷，但你知道什么更酷吗？Web应用程序！让我们尝试使用 `sinatra` gem将我们的食谱移植到一个新的web应用程序。

## 关于 Sinatra 的一些话

Sinatra称之为网络“微框架”。它基本上是一个微型Rails，也遵循 **模型-视图-控制器** 模式。
 `app.rb` f文件充当控制器。路由层由Sinatra处理。
我们已经创建了一个控制器方法来处理基础的web应用。Sinatra将浏览器中的URL映射到 `app.rb` 中的对应方法。看一下[路由文件](http://www.sinatrarb.com/intro.html#Routes)的更多信息。

阅读更多关于 Sinatra [教程](https://github.com/lewagon/sinatra-101). 参照 [安装](https://github.com/lewagon/sinatra-101#setup), [sinatra app](https://github.com/lewagon/sinatra-101#sinatra-app) and [视图](https://github.com/lewagon/sinatra-101#views) 在启动 Cookbook web应用程序之前，请彻底执行以下步骤。

## 详细说明

在我们的web应用程序中，我们将使用前面提到的 `Recipe` 和 `Cookbook` 类。不过，我们不需要 `Router` 和 `Controller` 。

### 索引

在web应用程序的根目录下（在 `/` url），你应该以无序列表的形式显示食谱。

在菜谱列表下，将导航链接（`<a>`）添加到 `/new` url，我们将使用该链接创建用户故事。

### 创建

在我们的web应用程序中，创建一个新的菜谱需要两个步骤。我们需要一个步骤来显示表单。我们将使用 `GET /new` HTTP请求来显示表单。

`<form>` 将相当于终端中的 `gets` 。我们需要为菜谱的名称，描述和任何其他字段，你发现相关的添加字段。提交此表单应触发以下HTTP请求：

```
POST /recipes
```

此请求应触发 `app.rb` 中的一些代码，以便将菜谱添加到 cookbook 中。
在这段代码的末尾，找到一种方法 **重定向** 用户到你的web应用的`/` url（索引）。

### 删除

在索引中，在菜谱的名称和描述旁边添加一个 `destroy` 链接。
点击链接会将其从 cookbook 中删除，并 **重定向** 到索引。

### 更进一步

当你成功地编写了这3个用户故事时，请继续并尝试实现更难的 `import` 和 `mark as done` 操作！

Sinatra 快乐！
