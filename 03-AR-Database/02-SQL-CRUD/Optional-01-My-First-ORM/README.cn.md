## 背景与目标

祝贺你完成了这个练习。我们现在将做一些元编程。
一段生产代码的代码。我们可以编写代码来动态地生成类或一个类中的方法。这很强大，而且用Ruby很容易做到。

想想你的`Post`类。你有`save`、`self.find`和`self.all`这样的方法。想象一下有另一个模型，例如`User`。你也会需要完全相同的方法。


这意味着我们希望`Post`和`User`共享一个共同的行为，这可以通过通过继承来实现：

```ruby
class Record
  # The shared code 共享的代码
end

class Post < Record
end

class User < Record
end
```

## 详细说明

实现`Record`类，使其具有一个模型所期望的所有行为(`save`, `destroy`, `self.find` 和 `self.all`)。

**不要**在你的`Post`和`User`类中写任何代码! 这个约束条件将帮助你发现Ruby的美妙之处。

## 进一步的建议和资源

- 所有的类上都有一个[`send`](http://stackoverflow.com/questions/3337285/what-does-send-do-in-ruby)方法。
- 你可以用[`instance_variable_set`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_set)动态地设置一个实例变量。
- 你可以用[`instance_variable_get`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_get)动态地读取一个实例变量。
