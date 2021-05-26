## 背景与目标

第一次遇到语句块（block）和`yield`可能会令人费解，让我们练习它吧。这里的目标是：

- 使用`yield`完成一些基础的方法（method），以此理解其内在机制。
- 学习由语句块（block）调用方法（method）的语法。
- 理解当你把一个参数传递给语句块（block）时发生了什么。


在这个段旅程中，你将要开一间**汉堡餐厅**，从厨房到柜台，你将完成一些方法（method），以此为你的第一个顾客提供汉堡。


## 详细方法

### 第一步：基本款汉堡
让我们从编写一个简单的`burger`方法（method）开始，它需要3个参数 - 肉饼（patty），酱料（sauce)，和配菜（topping)，最后返回字符串数组作为汉堡。例如：

```ruby
burger("steak", "ketchup", "onions")
# => ["bread", "steak", "ketchup", "onions", "bread"]
```


顾客可以通过定义每一个参数来组成他们自己的汉堡：
![Burger Restaurant Menu](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/burger-restaurant-menu.svg)

### 第二步：随选汉堡

`burger`方法（method）只能使用上述列表包含的参数。然而，我们的客户在他们点单时经常特别指定**肉饼（patty）**。就比如说他们想要辣的牛排🌶，更大块的牛排，或者替代品。

我们的方法（method）现在不能接待这种特殊需求，所以我们需要修改一下。

但是在开始编程这个方法之前，让我们找到一个方式来记录给厨房的特殊说明（限制条件：不通过参数传递额外信息）。这就像在订单上写一个备注一样：

![Method call with side note](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/burger-restaurant-method.svg)

让我们用一个Ruby语句块来完成它吧！

```ruby
burger("steak", "ketchup", "onions") do |patty|
  "grilled #{patty}"
end
```

很好！我们找到了一个以不改变参数的方式转化我们的肉饼（patty）。现在我们想要上面的调用返回：

```ruby
# => ["bread", "grilled steak", "ketchup", "onions", "bread"]
```

让我们一起修改我们的方法，实现它！

### 回到厨房

`yield`是你需要执行语句块（block）时使用的关键词，它会在执行方法时被执行，对肉饼（patty）进行用户要求的改变。

![旁注](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/burger-restaurant-yield.svg)

升级`burger`方法，让它可以接受语句块（block）吧：
- 将`yield`放在你想要调用语句块的地方
- 语句块（block）只会改变`patty`

**有或没有语句块（block）**方法都必须正常运转。使用[`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F)方法检测执行方法时是否用到了一个语句块（block）。


## 第三步：准备汉堡
顾客蜂拥而至，他们都想品尝你美味的汉堡。
打开`interface.rb`，订单列表在等待被输入。写下准备所有汉堡的说明，你之后可以通过`puts`或者`p` 来显示汉堡。


### 给你的第一个语句块（block）的一点小帮助

你的一个顾客要求一份更大块的鱼。将你的经典汉堡转化为一个更大的汉堡给他，写一个语句块（block）将字符串转化为大写：

1. 调用`burger`方法，参数为"fish","mayo"以及"salad"，**全部小写字母**，将结果存储在`bigger_burger`变量中。

2. 附加一个语句块（我们故事中的旁注），自定义说明如下：
  - 它以一个字符串作为参数
  - 它将字符串转化为大写

![在Ruby中写语句块](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/burger-restaurant-syntax.svg)


你刚刚写下了你的第一个语句块（block），自己练习一下写其他的汉堡吧！
