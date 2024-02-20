## 背景和目标

我们在这个挑战中的目标是通过将我们在上一个挑战中编写的食谱保存到 CSV 文件中来完善我们现有的食谱手册。这样，当我们退出并重新在终端中启动应用程序时，我们的食谱将仍然保存在我们的计算机上。

如果你想记住如何解析和存储数据到 CSV 文件中的语法，可以参考[解析讲义幻灯片](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data#/2/3)

请记住，CSV 文件基本上是带有非常简单格式的 Excel 电子表格，其中行通过 `↵` 进行分隔，列通过 `,` 进行分隔。这是用于该挑战的 rake 测试的 CSV 文件示例：

```csv
英式烤饼,烤饼描述
烟肉豆早餐,豆子描述
李子布丁,布丁描述
苹果派,苹果派描述
圣诞水果酥,水果酥描述
```

保存/加载应该在哪个文件中进行呢？🤔 我们的 CSV 文件需要存储一个列举我们应用程序中_所有_食谱的电子表格。而且，碰巧有一个文件是负责存储我们所有 `Recipe` 实例的文件。没错，就是我们的 `Cookbook`，我们的 **仓库**。所以，在这个挑战中，我们将**仅修改**文件 `lib/cookbook.rb`。

## 设置

首先，将你的食谱手册的代码复制到这个挑战的 `lib` 文件夹中：

完整路径示例：

```bash
# 确保你在正确的目录中
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/03-Cookbook/03-Cookbook-With-CSV

# 从食谱手册挑战2中复制你的代码
cp -r ../02-Cookbook/lib .
```

在开始之前，运行你刚刚导入的代码，以确保已实现的用户操作（列表/添加/删除）仍然有效！

```bash
ruby lib/app.rb
```

## 规范

### 解析

当 Ruby 程序结束时，我们会丢失存储在变量中的所有数据。如果我们希望在下次运行程序时检索数据，我们需要将其持久化在硬盘上。我们将使用一个 CSV 文件！此时的 CSV 文件是空的，稍后通过应用程序添加你自己的食谱。

首先，我们从加载 CSV 开始。我们何时需要加载其中存储的数据呢？当你启动应用程序时 🚀，我们的 `#initialize` 方法在我们启动应用程序时会自动运行。

目前，我们的 `#initialize` 方法不接受任何参数。让我们更新它，使其接受一个参数，即指示要打开的 CSV 文件的文件路径的字符串 `String`。所以，它应该是 `initialize(csv_file_path)`。这意味着，要初始化一个新的 `Cookbook` 实例，你需要传入一个有效的文件路径，例如： `my_cookbook = Cookbook.new('lib/recipes.csv')`。

***

**重要**：由于我们更改了 `#initialize` 接受的参数数量，这会影响到我们的 `app.rb` 文件。实际上，此文件当前应该有以下行：

```rb
cookbook   = Cookbook.new
```

请更改此行（可以复制和粘贴）为：

```rb
csv_file   = File.join(__dir__, 'recipes.csv')
cookbook   = Cookbook.new(csv_file)
```

现在，`Cookbook` 的实例将接收 `lib/recipes.csv` 文件的路径作为参数 📊

***

然后，让我们更新 `#initialize` 方法以从 CSV 文件中加载食谱。例如，如果 CSV 文件中有5行，那么 `@recipes` 数组应该有5个 `Recipe` 实例。

接下来，让我们进行一些重构。这部分代码可能需要几行，所以最好在一个私有方法 `#load_csv` 中编写，并在 `#initialize` 方法中调用该方法。

### 存储

我们何时需要将更改保存到 CSV 文件中呢？当 `Cookbook` 中的食谱发生更改时 🌈。也就是说：

1. 当添加了新的食谱时；或者
2. 当删除了食谱时

那么，让我们编写一个新的私有方法 `#save_csv`，将 `@recipes` 数组中的所有 `Recipe` 实例保存到我们的 CSV 文件中。因此，如果 `@recipes` 数组中有6个 `Recipe` 实例，当更新文件时，CSV 文件应该有6行。

_请注意：当保存 CSV 文件时，实际上是覆盖整个文件。因此，即使一个食谱之前已经存储在 CSV 文件中，每次覆盖文件时也必须重新存储它。_

然后，你需要查找 `Cookbook` 的任何位置，来查看是否有地方添加或删除了食谱，然后在这些位置调用 `#save_csv` 方法。

#### 总结

更新 `Cookbook` 中的现有方法：
-  `initialize(csv_file_path)`：从 CSV 中加载现有的 `Recipe`。

为了加载和存储 CSV 中的数据，我们将实现2个**私有**方法：
-  `load_csv`：从 CSV 文件加载现有数据到我们的应用程序中。我们将在 `#initialize` 方法中调用它。
-  `save_csv`：在我们的 CSV 文件中将新的食谱添加为**新行**。我们将在每次添加或删除 `Cookbook` 中的食谱时调用它。

## 测试

为了验证它是否工作，请运行：

```bash
ruby lib/app.rb
```

然后，尝试向食谱手册中添加一个新的食谱，并退出应用程序。然后再次运行 `ruby lib/app.rb`。这个食谱应该会再次显示出来（因为在你添加它时进行了存储，在重新打开应用程序时进行了解析）💾

