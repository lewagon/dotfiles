## 背景与目标

你现在知道如何使用`SQLite3::Database`实例来`执行`SQL查询，
这是对一个SQLite数据库执行SQL查询:

```ruby
DB = SQLite3::Database.new("a_file.db")
rows = DB.execute('SELECT * FROM table_name')
# => rows是一个记录数组，每个记录是一个列数组。
```

在开始今天的主要目标之前，让我们演练一下向数据库进行查询的过程。
我们将使用昨天练习中的那个`jukebox`数据库。

## 详细说明

我们为你准备了一个`query.rb`文件，其中有一个方法：`all_artists`。这个方法应该使用作为参数的`db`来检索艺术家表中的所有记录（所有字段）。
