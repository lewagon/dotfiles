## 背景与目标

购物有时很烦人，对吗？鉴于你现在已经是一个熟练的Ruby开发者了，你可能会发现开发自己的购物车更有趣！

我们已经为你准备好了这项工作：你将看到一个`interface.rb`文件已准备好录入你的购物清单，以及`store.rb`和`cart.rb`两个文件，它们包含商店和购物车的逻辑。

你需要完成这三个文件，以使整个任务正确运行。完成`store.rb` and `cart.rb`里的方法（methods），并初始化`interface.rb`中的`cart`变量。
你可以通过运行`ruby lib/interface.rb`来试试你的代码。

当你让它正确运行并且通过了测试，你应该对哈希（hashes）以及列举它们感到得心应手！

## 详细说明

花点时间想想，能够最好地描述一个商店的库存以及购物车数据结构是什么。然后：

- 完成`store.rb`和`cart.rb`中的所有功能
- 别忘了初始化`interface.rb`文件中的`cart`变量
- 检查是否所有的测试都通过了

这里有一个该商店的产品及其价格的列表：
- yogurts: 2€
- meat: 7€
- vegetables: 5€
- potatoes: 2€
- rice: 1€

额外任务：

- 改进`cart_to_s`方法，使其返回"meat x 2, vegetables x 3, yoghurt"， 而不是"meat, vegetables, vegetables, meat, yoghurt, vegetables"。你可能想要**改变数据结构**，不再使用你之前在你的购物车中使用的那种结构（rake将不再能通过了）。

## 关键学习要点

* 你为什么会使用你为商店和购物车所选择的数据类型？你能够用其他的数据类型吗？
* 你用了什么迭代器（iterators）？

## 进一步建议 & 资源
* 看一看[Enumerable doc](http://ruby-doc.org/core-2.5.3/Enumerable.html)中的方法！

