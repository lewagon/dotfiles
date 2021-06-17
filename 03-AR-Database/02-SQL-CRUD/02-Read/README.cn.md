## 背景与目标

今天的目标是实现每一个`CRUD`操作，并重现这个项目：
[Hacker News](https://news.ycombinator.com)。

**注意**：在这个练习中，我们给你提供了`DB`全局变量，所以
不需要自己实例化一个新的`SQLite3::Database`。只要在你的代码中使用`DB.execute`就可以了。（请看`spec/models/post_spec.rb`以查看如何创建`DB`变量。)

## 测试
我们为你准备了一个`test.rb`文件，其中`DB`全局变量的创建方式与`spec/models/post_spec.rb`中的创建方式相同。请自由使用这个文件来测试你的方法。

## 详细说明

在这第一个练习中，我们将重点放在**R**ead（`CRUD'中的`R'）。
实现一个处理`posts`表的类, 定义如下:

```sql
CREATE TABLE `posts` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes`  INTEGER
);
```

### `initialize `

添加`initialize`方法，将上述列存储在实例变量中。添加相关的读取器和访问器。

### `find`

在`Post`类上实现一个**类**方法`find(id)`，该方法需要
一个整数作为参数（帖子ID），并返回一个`Post`的实例。

(假设在程序中定义了一个全局变量`DB`，不需要
你去实例化它)

我们希望你能保护`find`方法，防止**SQL注入**。你可能会问，什么是SQL注入？好吧，如果你能[hack this bank](https://www.hacksplaining.com/exercises/sql-injection#/start)，你会明白的！。
这是一个关于练习的提示。你可能需要使用[占位符](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem)，向`.execute`方法传递几个参数。

### `all`

在`Post`类上实现一个**类**的方法`all`，该方法不需要任何参数，但它将会返回一个包含每个`Post`实例的数组。

## 进一步的建议

SQL注入是一种攻击类型，使用你的应用程序的人不会只是将一个普通的整数`id`传递给`find`方法，而是添加一个邪恶的字符串😈来破坏你的数据。如果你看一下详细说明中的SQL查询，你会明白什么意思。

你可以阅读[这篇Medium文章](https://medium.com/@yelstin.fernandes/how-to-add-items-to-a-database-table-using-ruby-sqlite3-74dcd8f931f9)和[这篇StackOverflow答案](https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218)，以了解SQL注入的情况 👌

**永远不要相信用户数据**!
