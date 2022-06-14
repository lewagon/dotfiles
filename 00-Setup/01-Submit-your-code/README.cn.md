## 背景与目标

- 了解练习的仓储(repo)的结构，以及到你的GitHub帐户的链接。
- 学习在提交你的代码之前，如何在本地测试代码。
- 学习基本的git命令，来提交对代码的修改并把它推送到GitHub。
- 了解Kitt平台的功能。

在这9周里，你将会以3-4人一组或两人一组的方式学习。系统会每天都会按照[循环赛]（http://en.wikipedia.org/wiki/Round-robin_tournament) 的算法给你分配一个新的伙伴, 在这个[gem](https://github.com/ssaunier/round_robin_tournament)里实现.

在开始一个新的挑战之前， **确保你们互相解释你觉得你被要求做的是什么** 并且在开始写第一行代码**之前**。然后你可以在一个屏幕上一起编写程序，或者分别写，每10分钟左右互相检查一次，互相帮助。

结伴工作是软件工程领域中的常见做法。背后的想法是，如果你一个人写码然后卡住了，你可能会浪费几个小时到处找哪里出现了问题，而别人用不一样的眼睛和不一样的角度会在几秒钟内发现问题。别小看这个了！

## 练习 1: 我们一起 `rake`.

使用这一页顶部的命令，转到练习文件夹。

- 运行 `rake`. 它应该都是红色的(因为你还没开始写码).

在代码编辑器里打开 `lib/wagon_start.rb` 文件。那就是你编辑代码的地方。

- 让 `wagon_start` 方法返回 `"That's how it starts"`
- 在终端上, 运行 `rake` 并确保你的 `#wagon_start` 有绿色的 green 结果和好的样式 （**没有** offences/错误)。 虽然就算你的代码样式不好也可以继续往下做练习，但如果你想有好写代码结构的习惯，那么在继续下面的练习之前把所有东西都变成绿色！
- 提交更改并推送它们。
- 返回Kitt并刷新页面。你应该在右边看到你的答案。

## 练习 2: 练习命令行 (终端)

在了解全栈挑战的目录之前，我们首先练习下你刚刚学习的命令行。

提醒: **你不可以用Finder (或你的文件浏览器)!**

### tmp 目录

第一步，我们将在名为 `tmp` 的目录中创建所有文件。

- 转到主目录 (`~`)
- 在主目录中创建目 `tmp`
- 转到 `tmp` 目录.

### README 文件

- 在 `tmp` 目录里, 创建名为 `README` 的文件
- 在代码编辑器里打开这个 `tmp` 目录。 在 `README` 文件里写一些文字。

### 一级目录

- 在 `tmp` 目录里创建 `level-1` 目录。
- 转到这个目录并创建一个名为 `README-level1` 的文件
- 显示所在的路径

### 二级目录

- 返回父目录
- 从 `tmp` 目录, 在 `level-1` 目录里创建一个 `level-2` 目录。
- 还是从 `tmp` 目录, 在 `level-2` 目录里（在 `level-1` 目录里）创建一个 `configuration` 文件

### 探索文件的其它操作

我们来使用 `mv` 命令来移动/重命名文件夹和文件。
是时候像一个真正的开发者一样来工作了! 用google找到如何完成以下操作：

- 把这个配置文件从 `level-2` 目录移到 `level-1` 目录
- 转到 `level-1` 目录
- 重命名 `configuration` 文件，变为 `config`
- 列出所有文件
- 删除 `level-2` 文件夹
- 删除 `config` 文件

### 最后

- 回到主目录 (`~`)
- 销毁tmp文件夹
- 清除终端窗口

完成后，你可以查看下面的链接。

## 更进一步

如果你已经完成电脑的设置和以上练习，可以查看以下资源

- [git速查表](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)
- [交互速查表](http://www.ndpsoftware.com/git-cheatsheet.html)
- 看一下[这个 TED 演讲](http://www.ted.com/talks/clay_shirky_how_the_internet_will_one_day_transform_government) 关于如何把 git/GitHub 用于平时的项目 (非dev类的)
- 阅读并练习这个教程的所有内容[学习足够多的命令行来变得危险](http://www.learnenough.com/command-line/)
