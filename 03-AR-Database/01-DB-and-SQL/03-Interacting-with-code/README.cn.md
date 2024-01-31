## 背景与目标

现在是时候使用Ruby代码与之前练习中的`jukebox`数据库进行交互了。本挑战的目标是**通过我们的Ruby代码**与数据库通信。

在这个挑战中，你将在`lib/queries.rb`的Ruby文件中工作，你需要完成几个方法，来从数据库中收集特定数据。

### 设置说明

👉 **重点**: 每个方法都需要一个`db`参数，这是一个`SQLite3::Database`的实例，你可以在上面调用`execute`方法。这个`db`是**由测试建立的，并传递给方法**。你不需要自己创建一个来满足`rake`。你的方法将看起来像这样:

```ruby
def the_method(db)
  results = db.execute("YOUR SQL QUERY")
  # 结果是一个数组（行）的数组（列）。
  p results # 检查你得到的结果! 不要猜测!

  # 然后你就需要返回一些东西。
  return ?
end
```

👉 不过，测试代码也很重要！要在`irb`中（或在`lib/queries.rb`文件中）尝试你的代码，你需要自己构建`db`:

```ruby
# ➜ 03-Interacting-with-code git:(master) ✗ irb
require "sqlite3"
DB = SQLite3::Database.new("lib/db/jukebox.sqlite")
rows = DB.execute("SELECT * FROM artists LIMIT 3")
# => [[1, "AC/DC"], [2, "Accept"], [3, "Aerosmith"] ]
```

如果你在`lib/queries.rb`文件中添加了上述代码，现在又想尝试从`irb`测试代码，你可以使用下面的方法导入并调用你的查询方法：

```ruby
require_relative "lib/queries"
artist_count(DB)
# => [...]
```

如果你只在 `lib/queries.rb` 中运行代码，你可以调用方法，并使用 `puts` 或 `p` 查看结果，在如上所述实例化`DB`**之后**。

## 详细说明

打开`lib/queries.rb`文件，回答以下问题。不要忘记你可以通过在终端运行`sqlite3 lib/db/jukebox.sqlite`查看数据库内部，或者使用前面练习中提到的一个工具（SQLite Pro、SQLStudio或SQLite Browser）。

有六种方法需要实现:

- `artists`表一共有多少行？
- 每个表包含多少行（通用方法）？
- 返回所有艺术家，并按姓名（按字母顺序）排序。**提示：**使用`ORDER BY` SQL命令来过滤。
- 查找所有情歌（即名称中含有"love"的曲目）。**提示：** 使用 `WHERE` 和 `LIKE`SQL关键字。
- 返回所有长度超过给定时长的曲目并排序。**提示：** 在SQL中可以使用比较运算符 `>`。
- 按字母顺序排序，返回每个艺术家以及他们的专辑数量。 **提示：**你需要`JOIN`两个表，并使用`GROUP BY`和`ORDER BY`！

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

你会注意到代码编辑器理解Heredoc，语法高亮实际上是Ruby文件中的SQL!

## 资源

* [SQL命令](https://www.codecademy.com/article/sql-commands)
* [关于`SELECT`的课程](http://sqlpro.developpez.com/cours/sqlaz/select/#L3.4)

## VS Code SQLite 插件 - 执行查询

这次我们会执行`SQLite: New Query`命令。 根据下面步骤来操作吧:

- 打开命令面板 `Cmd / Ctrl` + `Shift` + `p`
- 输入 `SQLite: New Query`
- 在打开的`.sql`文件中写下查询
- 写好查询后，打开命令面板然后输入`SQLite: Run Query`
- 选择你想要执行查询的数据库

这样就好啦！你就可以看到结果了！

<iframe src="https://player.vimeo.com/video/690525239?h=ca70e032e8" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

👉 如果想了解更多关于VS Code SQLite插件的话，可以查看这个[专门的总结](https://kitt.lewagon.com/knowledge/cheatsheets/vs_code_sqlite_extension)。
