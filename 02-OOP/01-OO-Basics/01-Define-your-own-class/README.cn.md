## 背景和目标

编写你的第一个类，去掌握面向对象编程的基本概念。

## 详细说明

在创建你的类前，先在 `lib` 目录中创建一个文件，以便在过程中测试你的类（创建新实例、调用实例方法，并将结果打印到终端）。我们把这个文件命名为 `interface.rb`。

接下来，从现实世界中选择一些你想建模的东西。餐馆、车辆、用户、游戏、食谱... *你说了算！*

选择后，在 `lib` 目录中创建一个以对象命名的文件。例如，你选择建模的对象为餐厅，请创建 `restaurant.rb` 文件：

```bash
touch lib/restaurant.rb
```

现在你可以放心删除 `.gitkeep` 文件。由于git不会追踪空文件夹，在空文件夹中添加 `.gitkeep` 文件可以使git追踪到该文件夹。而现在，由于`lib`目录中已经添加了`restaurant.rb` 文件，所以便不再需要用`.gitkeep` 文件了。

## 编程规范

**注意** 类所在的文件和类的名称要记住：以`lower_snake_case(.rb)` 去命名类所在的文件，以`UpperCamelCase` 去定义类的名称 **两者必须是单数！** 记住，类是允许你去创建许多不同餐厅（使用`.new`）的结构。

### 你创建的对象的内在属性是什么？

一家餐厅的特征有什么？一个用户的特征？一个游戏的特征？
在你要建的类中选择一些特征。它们将是类的 **实例变量**，有时称之为 **属性** 。

### 定义构造函数

`initialize` 是在类上调用 `new` 时使用的实例方法。例如：


```ruby
# lib/car.rb
class Car
  def initialize(model, brand, kilometers)
    @model = model
    @brand = brand
    @kilometers = kilometers
  end
end
```
现在在你所选择的类上定义 `initialize` 方法！

要测试它，你可能需要创建一个`lib/interface.rb` 文件，和用相关的引数去调用 `new` 构造函数，例如：

```ruby
# lib/interface.rb
require_relative "car"

second_hand_panda = Car.new("Panda 4x4", "Renault", 30_000)
new_testarossa    = Car.new("Testarossa", "Ferrari", 0)
```

### 定义实例方法

是时候用 **实例方法** 将 **"行为"** 添加到类中了。

下面是一个示例，说明如何在 `Car` 类上使用 `start` 的实例方法：

```ruby
# lib/interface.rb
require_relative "car"

car = Car.new("T", "Ford", 0)
car.start
```

