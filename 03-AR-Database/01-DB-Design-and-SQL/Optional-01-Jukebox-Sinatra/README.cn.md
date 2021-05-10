## 背景与目标

我们想建立一个小型的[Sinatra](http://www.sinatrarb.com/)网页应用程序来显示Jukebox数据库的所有信息。
这个练习有一个rake，可以测试你的sinatra应用程序，为了让它工作，需要在终端运行`gem install rack-test`。

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

Sinatra就是我们所说的网页"微框架"。它基本上是一个微型Rails，也遵循**MVC**模式。
`app.rb`文件充当控制器。路由器层则由Sinatra处理。
我们已经创建了一个控制器方法来处理网页应用程序的根文件（root）。Sinatra将浏览器中的URL映射到`app.rb`中的正确方法。请看一下[routing doc 路由](http://www.sinatrarb.com/intro.html#Routes)，了解更多信息。

不要犹豫，在我们自制的[教程](https://github.com/lewagon/sinatra-101)中阅读更多关于Sinatra的内容（跳过**设置**部分，因为你在`lib`文件夹中已经有一个模板了）。

## 详细说明

### 主页面

你应该编写一个主页`/`，显示所有艺术家的名单。
点唱机的所有艺术家名单。点击一个艺术家的名字，你应该转到艺术家页面。

### 艺术家页面

你应该编写一个`/artists/:id`页面，显示该艺术家的所有专辑。
点击一个专辑名称，你应该重定向到专辑页面。

### 专辑页面

你应该编写一个`/albums/:id`页面，显示该专辑的曲目。
点击一个曲目的名字，就会重定向到曲目页面。

### 曲目页面

你应该编写一个`/tracks/:id`页面，显示所有的曲目信息，如果你有时间的话，你可以看看像youtube这样的视频嵌入API服务，也可以在该页面上投放一个视频。

完成后，使用[`ngrok`](https://github.com/lewagon/sinatra-101/blob/master/README.md#share-with-the-world)在Slack上分享你的作品 👌
