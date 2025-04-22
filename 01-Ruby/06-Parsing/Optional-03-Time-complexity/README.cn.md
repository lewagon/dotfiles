## 背景与目标
在这个挑战中，我们将发现某些方法比其他方法更有效率，并且降低了计算时间。在处理数组时你是否意识到了这一点呢？

这个概念在计算机科学中是重要的一章，它叫做**时间复杂度（time complexity）**。

## 详细说明

我们只知道我们要寻找的书的标题，我们想先在较小的样本的一组书中找到它的索引（index），然后在一个更大的样本组完成同样的任务。

### 在书架上找到一本书
![书架（Shelf）](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/shelf.png)

想象你自己在家，在书架上寻找一本书，而书架上有12本无序排列的书。你可能从左到右逐一浏览每本书，直到你找到正确的那本。让我们来对这个行为进行编码！

编写`find_book`方法在一个`books`数组中找到`book_to_find`，并通过`each_with_index`遍历整个数组。

- 该方法有两个参数：一个书籍的数组，以及你要找的那本书的名字
- 它返回这本书在数组中的索引（index）
- 你应该使用`each_with_index`

```ruby
# books sample you can use to test your method
books = [
  "A Smarter Way to Learn",
  "Advanced Ruby",
  "Component-Based Applications",
  "Computer Science Distilled",
  "Eloquent JavaScript",
  "GitHub Explained",
  "Lead the Way",
  "Learn Ruby On Rails",
  "Markdown Guide",
  "Open Source",
  "Remote",
  "The Foundational Concepts"
]
```

在这个例子中，我们处理了12本书。迭代器将**最多**运行12次，花费0.02ms时间。
但是如果我们用同样的算法在100万本书中寻找一本书，会发生什么呢？我们将要迭代100万次吗？！
必须有个更有效的方法。

### 在图书馆中找一本书
![图书馆（Library）](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/library.png)

现在，让我们想象自己正置身于一个巨大的图书馆中。如果使用我们之前的技术逐一浏览每本书，要找到正确的书可能要花上好几天。值得庆幸的是，在图书馆，书籍已经**按照字母表顺序排序**了。因此，我们可以从图书馆的中间，从书本打头的字母那里开始寻找，并依此重复直到我们找到正确的那本书。这将大大减少迭代的次数！

编写`find_book_enhanced`方法：
1. 从数组的中间选择书本。
2. 将这本书与你要找的书进行比较：
  - 这是你要找的书吗？如果是，则返回索引（index）！
  - 你的书是在这本书之前还是之后？继续执行第3步！
3. 选择你的书籍所在的那一部分。
4. 重新进行整个过程。

## 时间复杂度（Time Complexity）
**时间复杂度**就是你在这里发现的：算法平均需要运行多少条命令才能找到解决方法。它基本上是随元素数量按比例决定的一个方程式。

## 大O记号（Big O notation）
它被记为**O**并指定**n**，**n**代表元素的个数。

示例：

函数`find_book`的时间复杂度是为O(n)：对于每本书，都有一条可能的指令。书越多，则迭代越多。最差的情况下的性能需要进行n此迭代。这种方法被称为**线性搜索**。

而函数`find_book_enhanced`为O(log2 n)：每次搜索的可能性是前一次的2倍。在一个大型图书馆，命令的数量缓慢增加。这是怎么回事？我们建立了一个循环，每次迭代将可能性减少了2个。我们以100万本书开始，然后只有500K被留下，然后是250K，依此类推。每一次，我们只检查轴心书籍是不是我要找的那本。
这个过程被称为**二进制搜索**，是减少计算时间非常优化的方法。

![Equations](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/equations.png)


## 进一步建议 & 资源

- 如果你想成为一个程序员，你将很可能在面试中遇到时间复杂度的问题。
- Ruby实现[本地二进制搜索（native binary search）](https://ruby-doc.org/core-2.6.5/Array.html#method-i-bsearch)
- 更多阅读:[WTF is time complexity?](https://remimercier.com/wtf-time-complexity)，由[Rémi Mercier](https://kitt.lewagon.com/alumni/merciremi)撰写。


