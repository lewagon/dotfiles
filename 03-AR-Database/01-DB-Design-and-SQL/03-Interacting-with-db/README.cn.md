## 背景与目标

`Sqlite`是一个简单的数据库，依赖于一个独立的文件。
你可以在[en.wikipedia.org/wiki/SQLite](http://en.wikipedia.org/wiki/SQLite)上阅读更多信息。

这第一个练习的目的是使用命令行来读取和查询名为`jukebox.sqlite`的样本数据库。

要完成这个挑战，请在[db.lewagon.com](http://db.lewagon.com/)上绘制DB模式，将其保存为XML文件并运行`rake`!

### 设置

首先测试一下，看看你的电脑上是否安装了sqlite3。

```bash
sqlite3 --version
```

如果你没有，你可以通过运行来安装它:

- macOS: `brew install sqlite`
- Ubuntu: `sudo apt-get install sqlite3 libsqlite3-dev`

你可以打开我们提供给你的数据库，对其进行一些查询:

```bash
sqlite3 lib/db/jukebox.sqlite
```

现在你在交互式的sqlite3控制台中，你可以向数据库写入你的SQL查询。
你可以用`.quit`或`CTRL+D`退出sqlite3控制台。

## 工具

你也可以使用一个**SQLite查看器**应用程序来读取SQLite数据库，探索模式，甚至**运行SQL查询**。

- [SQLite Pro (仅限macOS，付费但试用似乎没有限制)](https://www.sqlitepro.com/)
- [SQLStudio（免费）](http://sqlitestudio.pl/)
- [SQLite浏览器（免费）](http://sqlitebrowser.org/)

### Windows

在你的Ubuntu终端中逐行复制以下命令:

```bash
sudo apt update
sudo apt install -y sqlitebrowser
echo "export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0" >> ~/.zshrc
source ~/.zshrc
```

安装[Xming](https://sourceforge.net/projects/xming/) (取消勾选安装程序末尾的`Start Xming`)。


启动XLaunch，保留默认设置，但**添加以下可选参数** `-ac`。

! [xlaunch](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/xlaunch.jpg)

你可以用以下方法打开你的数据库:

```bash
cd ~/code/your-github-username/fullstack-challenges/03-AR-Database/01-DB-Design-and-SQL/03-Interacting-with-db
sqlitebrowser lib/db/jukebox.sqlite
```

如果你在打开你的DB时得到错误`could not initialize SDL`，你需要在你的Windows Defender中添加一个异常，以允许Xming通过UDP和TCP协议的公共输入流量。你可以按照这个[文档](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-an-inbound-port-rule)。


❓ 我应该使用命令行 "sqlite3"，还是上面的一个可视化工具？是的，两者都很有用! 出于两个原因，学习一下命令行的操作是很好的。一方面，[CLI](https://en.wikipedia.org/wiki/Command-line_interface)允许你专注于SQL查询。另一方面，[GUI](https://en.wikipedia.org/wiki/Graphical_user_interface)工具将证明对探索数据库模式结构(表？列？等等)有帮助。两个都试试吧!

## 详细说明

本练习的目的是探索Jukebox数据库，并了解其模式，回答下列问题：

- 什么是数据库的模式？(即什么是表，以及表之间的关系)
- 使用SQL设计工具绘制该数据库的模式。
- 每个表包含多少行？每个表的列名是什么？

使用[db.lewagon.com](http://db.lewagon.com/)绘制Jukebox模式。将其以XML格式保存为`jukebox.xml`，然后用`rake`检查它。
