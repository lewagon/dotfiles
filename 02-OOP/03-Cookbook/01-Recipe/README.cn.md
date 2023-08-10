## 背景和目标

在开始编写cookbook应用程序之前，先定义我们的 `Recipe` 类（在 **模型-视图-控制器** 模式中里的 **模型** 中）。

## 详细说明

### 模型

你应该始终从模型开始。应用程序中最重要的是数据，而使用模型可以让你操作任何数据。

首先，创建一个新文件 `recipe.rb`（在 `lib` 文件夹中），定义一个 `Recipe` 类。它应该有两个实例变量：`@name` 和`@description`。我们应该能够通过调用 `name` 和 `description` 方法来获取食谱实例的 `@name` 和 `@description`。

定义完成后，请在运行 `rake` 之前手动测试您的模型。在`irb`控制台中输入 `require_relative 'lib/recipe'`，加载模型，然后输入 `recipe = Recipe.new("chocolate cake", "a delicious chocolate cake")`，创建一个新的 `Recipe` 实例。当调用 `recipe` 时，它将返回一个具有正确的 `@name` 和 `@description` 的 `Recipe` 实例；当调用 `recipe.name` 和 `recipe.description` 时，它将打印出正确的 `name` 和 `description`。
