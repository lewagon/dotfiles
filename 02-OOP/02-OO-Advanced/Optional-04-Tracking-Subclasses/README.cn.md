##  背景和目标

让我们玩一玩继承。在Ruby中，可以调用类的 `ancestors` 来
弄一份类所有父类的名单。看看[这个问题](http://stackoverflow.com/questions/19045195/understanding-ruby-class-and-ancestors-methods)和Stack Overflow 建议的答案来初步了解类别继承体系。

## 详细说明

对于这个练习，我们想做相反的事情。我们有一个 `Mother` 类，应该能够调用它后代的方法。假设你有两个类 `Daughter` 和 `Son` ，其类方法为 `phone` ，那么：

```ruby
Mother.phone_kids
# => 应该能调用 Daughter.phone 和 Son.phone
```

说明为你提供了两个 `Mother` 的子类，因此你只需实现
类方法 `phone_kids` 。你可能需要使用`Class` 中[`inherited`](https://ruby-doc.org/core-2.7.5/Class.html#method-i-inherited)方法。
