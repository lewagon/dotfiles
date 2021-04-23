<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

为了更好地理解`yield`，让我们试着重新实现[`Enumerable#map`](https://ruby-doc.org/core-2.5.3/Enumerable.html#method-i-map)方法，实际上不去直接使用它。


## 详细说明

### 自定义map

在这个练习中，你需要完成`#my_map`方法，它将被一个语句块调用，正如常规的`Enumerable#each`方法那样。你可以在你的代码中使用`Enumerable#each`来迭代各个元素。

这里有两个例子，在你的代码中应该正确运行：

```ruby
beatles = ["john", "paul", "george", "ringo"]
my_map(beatles) do |name|
  name.upcase
end
#=> ["JOHN", "PAUL", "GEORGE", RINGO"]
```

```ruby
numbers = [2, 4, 6, 8]
my_map(numbers) do |number|
  number * number
end
#=> [4, 16, 36, 64]
```

## 关键学习要点

- 重新考虑你使用过的所有的迭代器（iterators）`#each_with_index`, `#select`, `#find`... 是不是已经100%清楚，他们是被一个语句块（block）调用的方法（methods）？

