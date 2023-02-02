## 背景与目标

- 理解**数据模式（schema）**迁移的概念
- 了解如何在你的数据库上运行`rake`任务来执行`migrations`迁移。

## 详细说明

这个练习的重点是**迁移**。因为还没有模型，所以你必须通过编码迁移来创建你的数据库模式（记住，数据模式（schema）是数据库的**结构，即表和列**，**不是数据**）。我们想创建一个数据库模式，用来存放[Hacker News](https://news.ycombinator.com) —— 一个著名的网站，分享关于技术和创业的链接。
我们需要一个`posts`表来存储帖子（有标题和URL）。

在`db/migrate`中，我们创建了一个`20141025152200_create_posts.rb`文件，包含一个Active Record迁移类。迁移文件的格式总是`yyyymmddhhmmss_migration_task_name.rb`。文件中的时间戳非常重要--它可以让`rake db:migrate`知道哪些迁移还没有运行。

### 1. 迁移以创建一个表

在`20141025152200_create_posts.rb`中编写代码，创建`posts`表。

你的`posts`表应该有以下几列：

- `title`为`String`
- `url`是一个`String`
- `created_at`和`updated_at`的时间戳

然后用`rake db:migrate`运行这个迁移。

检查你的表是否已经被创建:

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

你能看到不仅仅是你的`posts`表吗？那是Active Record的内部管道😊。你能猜到它是干什么用的吗？

### 2. 迁移以更新一个表

回到讲座中，阅读[Active Record Migration documentation](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html)。它展示了在Rails上进行迁移是多么容易。但是我们还没有到Rails，所以我们必须手动创建我们的迁移文件。

使用任务`rake db:timestamp`来为你的迁移文件名获取一个正确的时间戳。在一个新的文件`db/migrate/`中写一个新的迁移，为`posts`表增加一个新的列。

调用类型为`integer`的`votes`列，默认值为`0`：一个用户的帖子在创建时没有任何投票。

记得我们说过的关于迁移文件名的问题吗？格式是**非常重要的**。

然后用`rake db:migrate`运行这个迁移。

## 学习要点

到现在为止，你应该已经明白了，迁移是与**数据模式（schema）的变化有关的**。
(即表和它们的列)。
