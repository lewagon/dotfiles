## 背景与目标

祝贺你，你现在是Active Record的专家了😊
让我们回顾一下从第一天开始到现在所学到的全部内容：

- 在变量中存储信息
- 定义方法来实现参数上的通用行为并重用代码
- 使用几种类型，简单的（`Integer`, `String`）或复杂的（`Hash`, `Array`）。
- 使用`if`的条件分支
- 用`for`、`while`或`Enumerable#each`在集合上循环。

现在你知道了所有这些，你就掌握了任何编程语言的基本知识。如果你理解了这些概念，那么你现在就是一个程序员了，你将能够非常迅速地掌握任何新的面向对象的语言。你所要做的就是了解上面的东西是如何工作的。一旦你知道了，一个新的语言只是一个新的语法，而不是新的概念。

不过现在，你将开始涉及更复杂的东西，这将帮助我们建立更大、更复杂的软件。

- 类（Class）—— 将**数据**和**行为**封装在一个对象中。
- **MVC** - 构建软件的每个类都有一个对应的单独的责任。
- Active Record - 在数据库之上的一层，用于抽象SQL查询（写Ruby代码而不是SQL）。

我们现在已经非常接近Rails了。
不过还缺少一样东西——你知道的——那就是视图层。
我们在这里是为了建立网站，而不是命令行工具! HTML在哪里？CSS？

让我们来玩玩[Sinatra](http://www.sinatrarb.com)gem，预览一下它的样子!

## 设置

用以下命令安装你的gems在指定的`Gemfile`中:

```bash
bundle install
```
这将创建一个自动生成的`Gemfile.lock`文件，为每个gem指定版本。它实际上锁定了它们。

启动sinatra应用程序:

```bash
ruby lib/app.rb
```

看！你可以去[http://localhost:4567](http://localhost:4567)。你现在正在运行一个小型的网络服务器，并且用你的浏览器访问它。不再需要命令行了!

## 关于Sinatra的一些话

`app.rb`文件充当控制器。路由器层则由Sinatra处理。
我们已经创建了一个控制器方法来处理网页应用程序的根（root）。Sinatra将浏览器中的URL映射到`app.rb`中的正确方法。请看一下[routing doc](http://www.sinatrarb.com/intro.html#Routes)，了解更多信息。

```ruby
# app.rb
# [...]

get '/' do # <- Router part

  # [...] #
  # [...] # <- 控制器部分
  # [...] #

end
```

在开始编码之前，请阅读关于视图（Views）、路由（ Routing）、`params`的内容[这里](https://github.com/lewagon/sinatra-101#views)。

## ERB

你听说过**模板**吗？这是一种写HTML的方法，你可以在其中用代码来**动态地**注入数据。

在像Sinatra这样的Ruby框架中，我们可以使用**erb**，它代表了嵌入式Ruby。

其语法如下：

```erb
<% first_name = "Boris" %>

<h1>Hello, I'm <%= first_name %></h1>
```

对于你**不想显示的代码，使用`<% %>`**，而当你想在HTML中注入输出时，使用`<%= %>`。

通常情况下，你会在控制器中定义变量：

```ruby
get '/' do
  @first_name = "Boris" # <--注意`@`，使其在视图中可用!
  erb :home
end
```

并在你的`home.erb`视图中使用它：

```erb
<h1>你好，我是<%= @first_name %></h1>
```

确保你在控制器中**用`@`**为你想在视图中使用的变量来定义**实例变量**!

**Rails也会使用erb！**所以要花时间彻底阅读[本节]（https://github.com/lewagon/sinatra-101#passing-stuff-to-the-view）。

## 详细说明

这个练习是相当开放的，下面是一些你可以开始做的事情。

- 在网站的主页上显示所有的帖子
- 每个帖子都应该是可点击的。点击后会打开一个新的标签并进入网站
- 按降序显示帖子（见[`scopes`](http://guides.rubyonrails.org/active_record_querying.html#scopes))
- [难] 在顶部添加一个提交新帖子的表单（提示：在`app.rb`中使用`post`路径
- [非常困难！] 添加一个对帖子进行投票的方法。

尽情享受吧!

这个练习没有测试，所以`rake`将只是运行Rubocop以确保你有好的格式。

### 分享

欢迎在Slack上用[`ngrok`]（https://ngrok.com/ ）分享你的作品。安装`ngrok`（用`brew install --cask ngrok`或[手动安装Ubuntu](https://ngrok.com/download)），并在另一个窗口运行它。

```bash
ngrok http 4567
```

确保你的URL是公开的(`*.ngrok.com`)，这样你就可以和大家分享了!
