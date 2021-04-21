<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

[`数组（Array）`类](http://www.ruby-doc.org/core-2.5.3/Array.html)是ruby中用于存储和访问数据的2个主要结构之一（我们在明天将看到另一个：哈希[Hash][Hash](http://www.ruby-doc.org/core-2.5.3/Hash.html )) 。

一个数组（Array）是有序的，因此每个元素可以通过它的**索引**被访问。这个练习将帮助你理解如何创建一个数组，如果在其中存储数据，最后，如何用索引提取数据。
记住，数组索引是由`0`开始的，而不是`1`。

程序员经常被要求对事物进行排序，这就是为什么你应该阅读一些[排序算法（sorting algorithms）](http://en.wikipedia.org/wiki/Sorting_algorithm)。希望Ruby文档将为你提供几种[枚举（Enumerable）]的排序方法(http://ruby-doc.org/core-2.5.3/Enumerable.html) 。`数组（Array）`就是`枚举（Enumerable）`的一种形式，所以你可以在使用`数组（Array）时，`应用`枚举（Enumerable）`文档页面中引用的所有方法（methods），因为`数组（Array）`**含有**`枚举（Enumerable）`模块。

## 详细说明

- 完成"wagon_sort"方法，该方法需要一个参数，即一个包含学生姓名（`字符串（String）`）的数组，并返回一个数组，将学生姓名阵列按字母顺序排序。
- 排序方法必须对大小写不敏感，例如`bob` 应该放在`Felix`前面（查看[ASCII表](http://www.asciitable.com/)）
- 该方法应该保留名字原来的拼写。

### 交互式编程

打开`interface.rb`文件，并确保使用`wagon_sort`方法（method）。它应该像这样运行：

```bash
ruby lib/interface.rb

Type a student name:
felix
Type another student name or press enter to finish:
Cedric
Type another student name or press enter to finish:
bob
Type another student name or press enter to finish:

Congratulations! Your Wagon has 3 students:
bob, Cedric and felix
```

## 关键学习要点

熟悉基本的数组运算。你现在应该以下的语法：

- 创建一个数组（array）
- 在数组中添加一个新的元素
- 访问第n个元素
- 更新一个元素
- 删除给定索引的值
