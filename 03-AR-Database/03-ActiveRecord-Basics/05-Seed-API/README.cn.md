## 背景与目标

`faker`gem很酷，但如果我们能直接导入一些**真实的**Hacker News数据呢？这是有可能的! 我们可以通过他们的[API](https://github.com/HackerNews/API)做到这一点。

## 设置

我们将使用[rest-client](https://github.com/rest-client/rest-client)来调用
Hacker News的API。首先，在你的笔记本上安装gem。

```bash
gem install rest-client
```

同样，你可以重复使用`drop`，`create`，`migrate`，`seed`序列来测试你的seed。

```bash
rake db:drop db:create db:migrate db:seed
```

一旦你完成了种子，你可以使用基本的SQL查询来查看你刚刚用`rake db:seed`插入的行。

```bash
sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## 详细说明

打开`db/seeds.rb`文件，写一些代码来插入**10**个帖子（**不是100**，否则他们会禁止我们使用API），从Hacker News API中获取数据。

你可以调用API端点[https://hacker-news.firebaseio.com/v0/topstories.json](https://hacker-news.firebaseio.com/v0/topstories.json)。它将给你一个最新的100个帖子ID的数组。然后，对于前十个（不是一百个！）id，你必须调用API来检索一个帖子的细节。

举个例子，如果你想知道`20916749`这个帖子的细节，你必须调用[https://hacker-news.firebaseio.com/v0/item/20916749.json](https://hacker-news.firebaseio.com/v0/item/20916749.json)
