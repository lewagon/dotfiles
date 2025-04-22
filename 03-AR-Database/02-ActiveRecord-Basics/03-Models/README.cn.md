## 背景与目标

现在你知道如何使用迁移来更新数据库模式了。
让我们使用我们的数据库来插入几条记录并进行查询。
我们将继续完成Hacker News。

在开始这个练习之前，请确保你阅读了[Active Record启动指南](http://guides.rubyonrails.org/active_record_basics.html)。

## 设置

由于我们是在进行一项新的练习，我们需要在`db`文件夹中创建一个新的数据库。

```sbash
rake db:create
rake db:migrate
```

我们已经给了你迁移文件（见`db/migrate`文件）。它应该与你在之前的练习中从头开始建立的那个文件相匹配!

通过使用`sqlite3`打开DB，确保数据模式（schema）已经到位。

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

## 详细说明

### 1. 创建模型类

在`app/models`文件夹中为你的`posts`表添加一个类模型。

### 2. 使用该模型来执行查询

我们已经给你提供了与上周五相同的应用程序骨架。你可以用以下方式启动它：

```bash
ruby app.rb
```

打开`app/controllers/posts_controller.rb`并实现这些方法。记住 - **不要**写SQL。只要使用Active Record方法和你的类模型。
没有`rake`来测试练习的第二部分，所以你必须在终端启动它来测试你的应用程序。

## 关键学习点

* 什么是ORM？它是如何简化你的生活的？
* Active Record对象关系映射依靠的是什么命名规则？他背后的原理是什么？
* 你能看出使用Active Record比自己写所有的SQL要好得多吗？
