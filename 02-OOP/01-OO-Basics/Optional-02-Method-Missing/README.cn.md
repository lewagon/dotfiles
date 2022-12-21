## 背景与目标

这是一个比较高级的习题。我们现在将讨论Ruby的内在特性，以及它处理`NoMethodError`的方式。

### 详细说明

我们想创建一个 `UberHash` 类，它可以存储任何东西。一个经典的哈希是这样工作的：

```ruby
classic_hash = Hash.new
classic_hash[:color] = "red"
classic_hash[:color]
# => "red"
```

但我们想做的是：

```ruby
uber_hash = UberHash.new
uber_hash.color
# => nil

uber_hash.color = "red"
uber_hash.color
# => "red"
```

你可能认为你只需要在 `UberHash` 上加一个 `attr_accessor :color` ，但是等等！我们想储存 **任意** 特性。

如果尝试调用类中未定义的实例方法，Ruby将调用引发 `method_missing` 的内置方法引发 `NoMethodError` 。

为了防止引发 `NoMethodError` ，你可以在类中定义 **你自己的** `method_missing` 实例方法，并实现它来执行任何你想要的操作！

你可以阅读[这篇文章](https://manny.codes/3-practical-uses-of-ruby-method-missing/)了解Ruby如何以及何时调用`method_missing` ([相关文档](https://ruby-doc.org/core-2.5.3/BasicObject.html#method-i-method_missing)).

你可能还想了解Ruby是如何让你动态地[得到](https://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_get) or [设置](https://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_set)实例变量.

祝你好运！
