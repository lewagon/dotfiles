<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

这是一个进阶练习，要求你编写`shuffle`方法，它以一个数组作为参数并返回一个完全被洗牌的版本。但是你如何确保你将得到一个真正的洗牌呢？一个好的洗牌应该是什么样的呢？

## 详细说明

### 核心

- 在`lib/shuffle.rb`中编写`#shuffle`方法（method）。
- 你应该使用ruby`rand()`方法（method）。
- 要编写你的算法，你不得使用任何精致的数组方法（Array methods），例如`sort_by`或者`shuffle`！

**提示**：你不应该改变初始的数组。你可能需要把该数组[`克隆`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-clone)到一个数组A中并操作这个副本。一个算法可以是创建一个新的空数组B，随机选择一个A的索引（index），将A的元素加入B中的该索引（index）位置，然后删除A中相应的那个索引。继续操作，直到A空了为止。B应该包含新的洗牌数组！
