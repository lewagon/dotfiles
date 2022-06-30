## 背景与目标

`Sqlite`是一个简单的数据库，依赖于一个独立的文件。你可以在[en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite)上阅读更多信息。

这第一个练习的目的是使用命令行来读取和查询名为`jukebox.sqlite`的样本数据库。

要完成这个挑战，请在[db.lewagon.com](http://db.lewagon.com/)上绘制DB模式，将其保存为XML文件并运行`rake`!

### 设置

你的电脑应该已经安装了[SQLite](https://sqlite.org/index.html)。运行下面的命令来检查一下吧：

```bash
sqlite3 -version
# 然后你应该看到sqlite的版本
```

如果没有显示任何版本，那就回到专门的章节，根据指示安装。根据你的电脑选择：[macOS](https://github.com/lewagon/setup/blob/master/macos.md#sqlite)/[Windows](https://github.com/lewagon/setup/blob/master/windows.md#sqlite)/[Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#sqlite)

你可以打开我们提供给你的数据库，对其进行一些查询:

```bash
sqlite3 lib/db/jukebox.sqlite
```

现在你在交互式的sqlite3控制台中，你可以向数据库写入你的SQL查询。你可以用`.quit`或`CTRL + D`退出sqlite3控制台。

## 工具

你可以使用[VS Code SQLite插件](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)读取SQLite数据库，探索数据模式，甚至**运行SQL查询**。这个插件应该在第一天就安装好了。如果你没有安装的话，回到专门的章节，根据指示安装。根据你的电脑选择：[macOS](https://github.com/lewagon/setup/blob/master/macos.md#vscode_extensions)/[Windows](https://github.com/lewagon/setup/blob/master/windows.md#vscode_extensions)/[Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#vscode_extensions)

### VS Code SQLite 插件 - 探索数据库

这个插件会带来很多不同用来探索和操作数据库的命令。输入命令前，先按 `Cmd / Ctrl` + `Shift` + `p`来打开你的命令面板。然后就会出现一个输入框。想要探索数据库的话，我们需要运行`Open Database`命令，如下：

- 打开命令面板 `Cmd / Ctrl` + `Shift` + `p`
- 输入`SQLite: Open Database`
- 点击你数据库对应的路径

然后你会看到有加载好数据库的`SQL EXPLORER`标签页。 现在你就可以打开你的数据库看看各种数据表了！你还可以点击 `triangle icon（三角形的图标）`来看到更视觉化的表格 🙌 用`tracks`数据表试试！

<iframe src="https://player.vimeo.com/video/690525143?h=75949ff5a2" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## 详细说明

本练习的目的是探索Jukebox数据库，并了解其模式，回答下列问题：
- 什么是数据库的模式？(即什么是表，以及表之间的关系)
- 使用SQL设计工具绘制该数据库的模式。
- 每个表包含多少行？每个表的列名是什么？

使用[db.lewagon.com](http://db.lewagon.com/)绘制Jukebox模式。将其以XML格式保存为`jukebox.xml`，然后用`rake`检查它。
