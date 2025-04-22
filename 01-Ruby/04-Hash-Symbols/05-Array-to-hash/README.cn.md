## 背景与目标

在这里进行一些小练习，让你处理数组（arrays），哈希（hashes）以及语句块（blocks）。磨练Ruby技能，你准备好了吗？

## 详细说明

编写一个`array_to_hash`方法，它以一个`数组（Array）`作为参数，并返回一个`哈希（Hash）`。

- 如果没有给定语句块（block），则哈希的键应该是将数组（array）中元素对应的被转化为`字符串（Strings）`的索引（indexes）。
- 如果给定一个语句块（block），调用它时传递数组索引作为语句块参数，并用返回的结果作为哈希的键（hash key）。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/array_to_hash.png)

你也许想看看[`Kernel#block_given?`](http://ruby-doc.org/core/Kernel.html#method-i-block_given-3F)
