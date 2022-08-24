## 背景与目标

这是今天最长的练习。我们将构建一个简易商店界面程序。用户可以看到有哪些商品以及相应的价格。用户可以把商品添加到购物车，完成后选择结账并查看最终账单。

## 指引

- 如果你在午饭前有时间，那就开始和老师一起想想这个挑战的伪代码。
- 完成它应该会花去你整个下午的时间。
- 中间每一步都会有现场编码（live-code）。通过这个过程来验证你的每一步是否正确，并进行相应的更正。

## 伪代码

启动程序时，它应该如何工作？**让我们一起写出伪代码**

```ruby
# interface.rb

# 伪代码
# 1. 展示欢迎信息
# 2. 定义你的商店 (有哪些商品在卖?)
# 3. 得到用户想要的商品 (购物过程)
# 4. 展示账单 (结账)
```

**你能让上面的伪代码更详细点吗？**

## 第一步 - 简易版购物🛍

这里是我们的第一版程序：

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> Which item? (or 'quit' to checkout)
> pineapple
> Sorry, we don't have pineapple today.
> Which item? (or 'quit' to checkout)
> mango
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> TOTAL: 5.25€
> --------------------
```

### 对商店和购物车进行建模

- 我们如何为`商店（Store）`和`购物车（cart）`建模？
- 它们各自**最合适的数据结构**是什么？
- 我们应该使用数组吗？我们应该使用哈希（哪个是键，哪个是值）吗？

**在开始之前，和你的老师一起进行头脑风暴！**

## 第二步 - 添加数量 🛍🛍

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> How many?
> 2
> Which item? (or 'quit' to checkout)
> mango
> How many?
> 3
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> kiwi: 2 X 1.25€ = 2.5€
> mango: 3 X 4€ = 12€
> TOTAL: 14.5€
> --------------------
```

### 为商店和购物车建模

- 我们如何修改`store`和`cart`以将数量纳入考虑范围？
- 在这个新的建模里，我们需要如何改变我们的代码？

## 第三步 - 增加库存 🛍🛍🛍

现在让我们进一步推进该程序，处理我们的存货（考虑库存）：

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€ (5 available)
> banana: 0.5€ (4 available)
> mango: 4€ (1 available)
> asparagus: 9€ (5 available)
> --------------------
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 2
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 4
> Sorry, there are only 3 kiwis left.
> [...]
```

### 为商店和购物车建模

- 我们如何修改`store`和`cart`以将数量纳入考虑范围？
- 在这个新的建模里，我们需要如何改变我们的代码？

## 记忆卡片（Flashcards）

 你可以重新做这两组记忆卡片，来帮助你巩固今天的知识：**Flow, Conditions, Arrays**和**Iterators & Blocks**。
