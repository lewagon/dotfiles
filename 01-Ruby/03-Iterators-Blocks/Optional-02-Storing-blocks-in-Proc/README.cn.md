## 背景及目标

在Ruby方法中接受语句块有两种主要方式。第一种 - 正如我们已经见过的 - 使用`yield`关键词。然而，有时候我们需要把语句块**存储**在一个对象中，要么因为我们想稍后再调用它，要么因为以语句块作为参数的方法委托给另一个方法，并且需要将该语句块转移给这个子调用方法。

值得庆幸的是，我们可以将Ruby代码的语句块存储在`Proc`对象中。

## 和号（&）语句块参数

当在方法的最后一个参数前加一个&时，它会根据传递进来的语句块（block）创建一个`Proc`对象（objects）。这个对象可以在随后被执行，以如下方式调用方法：

```ruby
def speak(&block)
  puts block.call
end

speak { "Hello" }
# Hello
#  => nil
```

** 无论何时，当该方法被调用时，一个新的`Proc`对象（objects）会根据语句块（block）被创建出来。

## 创建Proc对象
你可能也想创造你自己的 `Proc`对象，并把他们像这样以正常参数的方式传递给该方法：

```ruby
def speak(block)
  puts block.call
end

message_block = Proc.new { "Hello" }
speak(message_block)
# Hello
#  => nil
```

**`Proc`对象只会被创建一次，并可以被使用多次，如果我们多次调用该方法的话。**

## 详细说明

- 轮到你了！告诉你妈妈你有多么爱她😊完成`#tell`, `#tell_mum`, `#tell_with_proc`, `#tell_mum_with_proc`方法，其中要么使用和号（&）语句块参数，要么明确地传递`Proc`对象。
