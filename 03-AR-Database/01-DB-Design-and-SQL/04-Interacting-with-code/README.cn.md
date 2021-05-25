## 背景与目标

现在是时候使用ruby代码与`jukebox`数据库进行交互了。为此，我们需要一个叫做[sqlite3](http://rubygems.org/gems/sqlite3)的gem。

要在你的电脑上安装这个gem，请在终端运行这个程序：

```bash
gem install sqlite3
```

这个挑战的目的是要从我们的**Ruby代码中**与数据库对话。

## 详细说明

👉 **重要的是**: 每个方法都需要一个`db`参数，这是一个`SQLite3::Database`的实例，你可以在上面调用`execute`方法。这个`db`是**由测试建立的，并传递给方法**。你不需要自己创建一个来满足`rake`。你的方法将看起来像这样:

```ruby
def the_method(db)
  results = db.execute("YOUR SQL QUERY")
  # 结果是一个数组（行）的数组（列）。
  p results # 检查你得到的结果! 不要猜测!

  # 然后你就需要返回一些东西。
  return ?
end
```

👉 要在`irb`中（或在`lib/queries.rb`文件中）尝试你的代码，你需要自己构建`db`:

```ruby
# ➜ 03-Interacting-with-code git:(master) ✗ irb
require "sqlite3"
db = SQLite3::Database.new("lib/db/jukebox.sqlite")
rows = db.execute("SELECT * FROM artists LIMIT 3")
# => [[1, "AC/DC"], [2, "Accept"], [3, "Aerosmith"] ]
```

然后你可以用以下方法导入你的查询方法:

```ruby
require_relative "lib/queries"
artist_count(db)
# => [...]
```

打开`lib/queries.rb`文件，回答以下问题。不要忘记你可以通过在终端运行`sqlite3 lib/db/jukebox.sqlite`查看数据库内部，或者使用前面练习中提到的一个工具（SQLite Pro、SQLStudio或SQLite Browser）。

有五种方法需要实现:

- `artists`艺术家表包含多少行？
- 每个表包含多少行（通用方法）？
- 返回所有艺术家的列表，并按名字排序（按字母顺序）。**提示：**使用`ORDER BY`SQL过滤器。
- 找到所有的情歌（即在其名称中包含"love"的任何曲目） 。**提示：**使用`WHERE`和`LIKE`SQL关键字。
- 返回所有长于给定时间的曲目，并对其进行排序。**提示：**你可以在SQL中使用比较运算符`>`。

## 提示

SQL查询往往会变得非常长，特别是当你开始使用`WHERE`或`JOIN`时。在Ruby中,
你可以使用[HEREDOC](https://www.rubyguides.com/2018/11/ruby-heredoc/)语法来编写**多行的**字符串。

```ruby
# 找到名字中带有字母`Z`的前3个艺术家。
query = <<-SQL
  SELECT * FROM artists
  WHERE name LIKE "%Z%"
  ORDER BY name
  LIMIT 3
SQL
rows = db.execute(query)
```

你会注意到Sublime Text理解Heredoc，语法高亮实际上是Ruby文件中的SQL!

## 资源

* [SQL命令](http://www.sqlcommands.net/)
* [关于`SELECT`的课程](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## 工具

在之前的练习中，你已经认识了这些工具。使用它们吧!

- [SQLite Pro (仅限macOS，可以试用)](https://www.sqlitepro.com/)
- [SQLStudio（免费）](http://sqlitestudio.pl/)
- [SQLite浏览器（免费）](http://sqlitebrowser.org/)

