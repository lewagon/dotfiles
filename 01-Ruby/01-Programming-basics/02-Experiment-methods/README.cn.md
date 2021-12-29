## 背景与目标
- 学习在Ruby文档中查找正确的方法（method）。
- 熟练使用IRB来测试新的方法（method）并把它们变成你的。

IRB是Ruby的一个交互式编程环境[REPL](https://zh.wikipedia.org/wiki/读取﹣求值﹣输出循环)。它是这样运行的：

1. 它可以 **读取（Read）** 用户的表达式。任何有效的Ruby表达式都可以，例如：`"Hello"`, `2+2`, `"hello".upcase` 等等。
2. 它可以 **评估（Evaluate）** 该表达式的结果。
3. 它可以 **打印（Print）** 这个结果。
4. 然后 **循环（Loop）**回到第1点，等待新的用户输入。

* **在IRB里**测试以下的代码**
```ruby
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".downcase
[1, 2, 3].shuffle
```

在Ruby中，所有东西（文本, 整数, 小数, 数组...）都是对象。我们针对这些对象来调用方法（method）。因为这样的方法的调用只能针对类的实例，所以称之为 **实例方法（instance methods）**。我们调用方法（method）时所针对的对象被称为 **接收器（receiver）**。

## 详细说明

找到并填入正确的[字符串类](http://ruby-doc.org/core-2.5.3/String.html)、[整数类](http://ruby-doc.org/core-2.5.3/Integer.html )，以及[数组类](http://ruby-doc.org/core-2.5.3/Array.html)的Ruby方法（methods），以使测试通过。

编程就是聪明地知道如何以及在哪里找到你需要的信息！通常，最困难的步骤就是向谷歌提出正确的问题。请使用以下的网站来找到这个挑战中所需的方法（methods）：

* Google 以及 [Stack Overflow](http://stackoverflow.com/)
* 如果你大概知道自己要找什么样的方法（method），查查[Ruby文档](http://ruby-doc.org)

当你认为你已经找到了你想要的方法（method），而且你也知道如何使用它的时候，那就用IRB来测试一下该方法！对初学者而言，用IRB实践是关键的步骤。

## 关键学习要点

你可以回答一下问题吗？如果不能，你还没有准备好继续前进！

- 你知道多少个Ruby内置类（built-in Ruby classes）？它们叫什么？
- 针对这些类的对象调用方法（method）的语法是什么？
- 当你在执行标准操作（给数组排序， 把一个单词变成大写，等等）时，应该立即采取的第一步是什么？
- 为了确保你真正理解了你找到的方法（method），应采取的第二步是什么？
