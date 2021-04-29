## 背景与目标
- 学习在ruby文档中查找正确的方法（method）。
- 熟练使用IRB来测试新的方法（method）并把它们变成你的。

IRB是ruby的一个交互式编程环境[REPL](https://zh.wikipedia.org/wiki/读取﹣求值﹣输出循环)。它是这样运行的：

1. 它可以 **读取（Read）** 用户的表达式，可以是任何有效的ruby表达式，例如：`"Hello"`, `2+2`, `"hello".upcase` 等等。
2. 它可以 **评估（Evaluate）** 该表达式的结果。
3. 它可以 **打印（Print）** 这个结果。
4. 它可以从1开始 **循环（Loop）**，等待新的用户输入。

* **测试以下的命令**
```ruby
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".downcase
[1, 2, 3].shuffle
```

在ruby中，一切（文本, 一个整数, 一个小数, 一个数组...）都是对象。我们针对这些对象来调用方法（method）。这样的方法称为 **实例方法（instance methods）**， 因为它们的调用只能针对类的实例。我们调用方法（method）时所针对的对象被称为 **接收器（receiver）**。

## 详细说明

找到并插入正确的[字符串类]（http://ruby-doc.org/core-2.5.3/String.html ）、[整数类]（http://ruby-doc.org/core-2.5.3/Integer.html ），以及[数组类]的ruby方法（methods），以使测试通过。

编程就是聪明地知道如何以及在哪里找到你需要的信息！通常，最困难的步骤就是向谷歌提出正确的问题。为了找到你将在这个挑战中所需的方法（methods），请使用：

* Google 以及 [Stack Overflow](http://stackoverflow.com/)
* 如果你大概知道自己要找什么样的方法（method），查查[ruby文档](http://ruby-doc.org)

当你认为你已经找到了你所寻找的方法（method），而且你也知道如何使用它，那就用IRB来试用一下该方法！用IRB进行试用对初学者而言，是关键的步骤。

## 关键学习要点

你可以回答一下问题吗？如果不能，你还没有准备好继续前进！

- 你知道多少个ruby内置类（built-in ruby classes）？都有哪些？
- 针对这些类的对象调用一个方法（method）的语法是什么？
- 当你在执行标准操作（给数组排序， 把一个单词变成大写，等等）时，应该立即采取的第一步是什么？
- 为了确保你真正理解了你找到的方法（method），应采取的第二步是什么？
