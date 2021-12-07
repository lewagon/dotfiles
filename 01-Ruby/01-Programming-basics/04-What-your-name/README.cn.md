## 背景与目标

- 再次验证你对于方法（methods）和变量（variables）的理解。
- 学习如何进行字符串插值（string interpolation）。
- 理解 **单**引号和**双**引号的区别。

## 详细说明

### 计算名字

- 执行在`lib/compute_name.rb`文件中定义的`compute_name`方法（method）。
- **约束条件** 你必须用**字符串插值**（`#{}`）的方式来构建这个全名。

### 交互式程序

`lib/interface.rb`文件中包含一个与用户进行交互的程序。现在运行下面的命令试一试：

```bash
ruby lib/interface.rb
```

接下来, 假设你已经先后输入了“Boris”，“Alexandre”，以及“Papillard”，程序应该打印出这样的信息`Hello, Boris Alexandre Papillard!`。

* **约束条件**：当然，你的`interface.rb`程序必须用到在另一个文件中定义的`compute_name`方法。
* **提升**：你可以通过增加其他信息来改进你的`custom_message`， 比如你的全名中字符的个数（举个例子，`Boris Alexandre Papillard has got 25 characters, including spaces`）， 或者其他更加重要的细节……

## 关键学习要点

再次问自己提出这些问题，并确保你都知道答案：

## 关于变量（variables）

* 你的代码中的变量有哪些？
* 你在哪里给这些变量赋值，又在哪里使用了它们？
* 什么是变量的作用域？

## 关于字符串（strings）

* 什么是字符串插值（string interpolation）？在字符串中“插入”ruby表达式的语法是什么？
* 在使用字符串插值时，单引号`''` 和双引号`""`的区别是什么？

## 进一步的建议 & 资源

* 为了在终端中得到用户的输入/回答，你应该使用[gets](http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html)。 你还将需要对结果字符串使用[chomp](https://ruby-doc.org/core-2.5.3/String.html#method-i-chomp)。
* 要想在终端中输出一个问题，你应该使用[puts](https://ruby-doc.org/core-2.7.5/IO.html#method-i-puts)。

