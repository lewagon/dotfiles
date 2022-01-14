## 背景和目标

让我们通过使用API来注册我们玩的游戏并存储结果，把我们的Wagon赛车变得更有趣一点。

**在其他事情之前:**

去到练习文件夹：

```bash
bundle install
```

**对于API:**

* 你可以阅读[API 文档](https://github.com/lewagon/fullstack-challenges/blob/master/04-Front-End/07-JavaScript-Plugins/Optional-01-AJAX-wagon-race/API.md)
* 通过调用练习文件夹中的 `bundle exec rake api` 命令启动API
* API在 http://localhost:4567 上可以被访问

NB: 如果启动api时遇到问题，请尝试运行 `bundle exec rake db_reset`.

**对于你的JavaScript代码:**

* 使用`public` 文件夹内的文件
  * 把你的JS代码放在 `public/js/game.js` 内
  * 把你的CSS代码放在 `public/css/main.css` 内
  * 把你的HTML代码放在 `public/index.html` 内

**进入游戏**

当你用 `bundle exec rake api` 命令启动了API, 就可以在 http://localhost:4567/index.html 上访问游戏了。

## 详细说明

**从阅读API文档开始！**

你的应用程序要满足以下要求:

1. 当页面加载时，要求API创建一个新的游戏会话。
2. 创建游戏会话后，你的页面将显示一个按钮 `Start New Game!`！
3. 单击时，按钮会消失，并被替换为一个窗体，你可以在其中键入玩家1和玩家2的名称。
4. 在窗体提交时，你将要求API根据玩家的名字创建一个新游戏。
5. 当你得到响应时，隐藏窗体，显示记分板（就像你在前一个练习中所做的），并监听用户的输入。
6. 当游戏结束时，向API发送一个请求_结束_游戏，提供赢家信息并显示获胜所用的时间（秒）。
7. 当你得到API响应时，在记分板上显示信息并提供"Play Again!"按钮。
