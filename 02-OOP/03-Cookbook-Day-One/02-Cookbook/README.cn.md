## 背景和目标

现在，你将编写一个用于管理食谱的Cookbook应用程序。

想法很简单：你喜欢烹饪，但你需要记住所有你喜欢的食谱。这是你的cookbook！它会保存你的食谱列表，允许你 `list` 它们， `add` 新食谱和 `remove` 其他食谱。

你将使用模型-视图-控制器 **模式** 构建此应用程序，该模式也用于Rails：
- 模型: 你想操纵的基本对象是什么？
- 视图: 在这里，我们 **向用户显示信息**（`puts`），并**向用户请求信息**（`gets`）
- 控制器: 它将获取和存储模型, 告诉视图显示或收集用户的数据。

请从纸和笔开始，确定你的应用程序组成部分及其职责。

## 详细说明

### 模型

幸运的是，我们已经在上一个练习中定义了 `Recipe` 类。现在我们需要做的就是把它复制到我们的cookbook应用程序。为此，请将此命令复制到终端：

```bash
cp ../01-Recipe/lib/recipe.rb lib
```

这是将上一个练习中的 `recipe.rb` 文件复制保存到我们的cookbook应用程序的 `lib` 文件夹中。

### 存储库

我们现在需要一个结构来存储用户的食谱。因为我们还没有一个合适的数据库，所以我们将使用一个充当数据库的类（正如我们在讲座中看到的）。当Ruby程序退出时，我们会丢失存储在变量中的所有数据。如果我们想在下次运行程序时索回数据，我们需要在硬盘上持久保存它们。我们会用CSV文件来实现！这个文件是空的，因为挑战是去通过应用程序添加你自己的食谱。

如果你想记住关于如何解析和存储CSV文件中的数据的语法，可以看看[解析课的幻灯片](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data#/2/3)

在这个挑战中，存储库存储用户添加的食谱。换句话说，它 **就是** **cookbook**。让我们将库存储类命名为 `Cookbook` ，以编写显式且有意义的代码，但请记住，它是今天上午图表中的 **存储库** ！

在 `Cookbook` 类中添加4中方法：
- `initialize(csv_file_path)` 从CSV文件加载现有的 `Recipe`
- `all` 返回所有的食谱
- `create(recipe)` 加了一个新的食谱到cookbook
- `destroy(recipe_index)` 从cookbook中删除一个食谱

### 控制器

控制器将从cookbook中收集数据，并将它们交给视图。它还将请求视图提供创建新配方的信息。以下是实现的方法：
- `initialize(cookbook)` 以 `Cookbook` 的实例作为参数。
- `list` （列出）所有的食谱
- `add` （增加）一个新的食谱
- `remove` （删除）一个现有食谱

### 视图

视图负责模型-视图-控制器的所有 `puts` 和 `gets` 。别忘了别在其他地方打这些代码（除非为了调试）。

### 把它绑在一起

准备就绪后，可以运行此代码去测试程序：

```bash
ruby lib/app.rb
```

我们需要 `app.rb` 里的代码去实例化一个 `Cookbook` 、 `Controller` ，并启动应用程序。在 `Router` 中有无限循环，因为这不是模型-视图-控制器的一部分。事实上，当你使用Rails时，这一切都将被视为理所当然，并为你完成。挺不错的😉

## 额外阅读

以下概念在软件体系结构中也很重要：
- [单一责任原则](http://en.wikipedia.org/wiki/Single_responsibility_principle) (需要VPN 🛡)
- [關注點分離](http://en.wikipedia.org/wiki/Separation_of_concerns) (需要VPN 🛡)
