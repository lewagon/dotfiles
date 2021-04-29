## 背景和目标

回到我们的农场日记。在你建设了大量的类之后，让我们在上面建立一个游戏来奖励我们的努力吧！让我们构建一个界面，在这个界面中，玩家是一个管理他/她的农作物和动物的农民，通过我们提供的插图，我们可以看到农场的发展。

你将学习如何使用无限循环构建界面！

## 设置

让我们从导入动物和作物类开始这个挑战：

```bash
cp ../02-Farming-Diary-Crops/lib/{crop.rb,corn.rb,rice.rb} lib
cp .03-Farming-Diary-Animals/lib/{animal.rb,cow.rb,chicken.rb} lib
```

在​​ `lib/interface.rb`，我们已经在文件的顶部添加了 `require_relative` 以加载类👌

## 详细说明

玩家可以在一组动作中进行选择：种植玉米、种植水稻、浇灌作物、添加动物等。
当玩家选择一个动作时，我们使用我们的类将其翻译成代码，然后继续下一个选择。这是一个循环。
让我们一步一步来建造它。

![循环](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/loop.svg?sanitize=true)


这个挑战没有 `rake` 。

### 从基本UI开始

打开​​ `lib/interface.rb` 编写一个非常基本的用户界面，只运行一次：
- 邀请玩家从列表中选择一个单词。
- 为每个单词显示一个简单的句子。

运行 `ruby lib/interface.rb`，你应该显示以下内容：

```bash
Pick an action: [corn | rice | quit]
> corn
Let\'s plant corn crops!
```

或

```bash
Pick an action: [corn | rice | quit]
> rice
Rice crops today!
```

or

```bash
Pick an action: [corn | rice | quit]
> quit
See you next time
```

当玩家随机键入一个单词时：

```bash
Pick an action: [corn | rice | quit]
> lalala
I don\'t know what you mean...
```

**注意：** 你可以选择一个基本的 `if` / `else` 语句，或者用 [`case` / `when`](https://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-case) 语句，非常适合含有封闭选项的长列表。


### 让它循环
如果只做一个动作后就退出了，那游戏就不好玩了。使其循环，直到玩家键入 `quit` 动作。运行`lib/interface.rb`，应给出以下输出：

```bash
Pick an action: [corn | rice | quit]
> corn
Let\'s plant corn crops!

Pick an action: [corn | rice | quit]
> rice
Rice crops today!

Pick an action: [corn | rice | quit]
> quit
See you next time
```


### 种植农作物

现在你已经有了无限循环，让我们在游戏中介绍农场类。当玩家选择 `corn` 或 `rice` 时，实例化相应类的对象并将它们存储在 `crops` 数组中。
要在每次操作后向你提供农场状态的图解反馈，请移动 `Board.new.display` 到循环内。如果你的代码按预期工作，将出现惊喜：）

### 给农作物浇水

向用户界面添加新操作： `water`：

```bash
Pick an action: [corn | rice | water | quit]
```

在这个动作中，玩家浇灌所有已经种植的作物（玉米和大米）。记住他们都继承了来自 `Crop` 的 `water!` 方法。

### 动物

恭喜你建立了农作物部分。你想试着自己把动物的部分造出来吗？

UI有三个新条目（牛、鸡和饲料）：

```bash
Pick an action: [corn | rice | water | cow | chicken | feed | quit]
```

**提示和线索:**
- `cow` and `chicken` actions create new intances of the corresponding classes and stores them in an `animal` array
- Ask the player for the name of the animals they add to their farm

- `cow` 和 `chicken` 创建相应类的新入口，并将它们存储在 `animal` 数组中
- 向玩家询问他们在农场中添加的动物的名字
  <details>
    <summary markdown='span'>View solution</summary>

    ```bash
    when "cow"
      puts "Name the cow"
      print "> "
      name = gets.chomp
      Cow.new(name)
    ```
  </details>
- 鸡有性别，由游戏随机挑选：

  <details>
  <summary markdown='span'>View solution</summary>

  ```bash
  when "chicken"
    gender = ["female", "male"].sample
    puts "The chicken is a #{gender}"
    puts "Name the chicken"
    print "> "
    name = gets.chomp
    Chicken.new(name, gender)
  ```
  </details>

祝你好运！
