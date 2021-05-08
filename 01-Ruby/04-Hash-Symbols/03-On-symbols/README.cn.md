## 背景与目标

### 和同学们讨论一下

- 字符串（String）和符号（Symbol）的区别是什么？
- 什么时候应该使用其中一个，什么时候使用另一个？
- 内存角度来看，它们的行为各有什么不同？

### 技术概述

对于ruby初学者来说，理解Symnols可能相当棘手。
经验法则是，Symbols和String非常相似，但是：

当你使用字符串（String）时，如果不是为了其文本内容，而更多用作一个独特的标识符时，你就应该考虑使用符号（Symbol）。

正因如此，很多哈希的键（Hash keys）都是符号（Symbols），因为它们的作用更多是用于识别事物而非纯文本。这里有个例子：

```ruby
fox = { color: "red", species: "mammal" }
```
`:color`和`:species`在这里被用作识别符，所以我们使用符号（Symbols）。它们的文本值已经被定好了，所以人们可以很快理解这些键（Keys）代表什么。

注意：你可能偶尔也会看到另一种（旧的）语法：

```ruby
fox = { :color => "red", :species => "mammal" }
```

如果你确实想了解字符串（string）和符号（symbol）之间的细微差别，请阅读[这个StackOverflow的回答](http://stackoverflow.com/a/8189435/197944/)。此处，**可变性（mutability）**的概念很重要。

## 详细说明

看看`lib/symbols.rb`。你将找到一个true/false小测验以及一些方法，它们用来测试你选择符号（symbols）或字符串（string）的能力。

## 关键学习要点

对于下面每个例子，你应该使用哪一种类型呢？

```ruby
{ "temperature" => "10 deg", "pressure" => "10 bar" }
# or
{ temperature: "10 deg", pressure: "10 bar" }
```

```ruby
user_name = :bob
# or
user_name = "bob"
# or
"user_name" = "bob"
# or
:user_name = :bob
```


