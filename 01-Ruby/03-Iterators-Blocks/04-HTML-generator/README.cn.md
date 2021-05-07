## 背景与目标

让我们在这个挑战中继续练习语句块（block）。我们将编写另一个接受语句块（block）的方法（method）。这一次我们经看到语句块如何启动嵌套方法（method）的调用，以及它为什么在现实中有用。我们也将看到定义有可选参数的方法，这种情况非常常见。

## 详细情况

完成`#tag`方法，它会用HTML的起始标签和结束标签包住在语句块中给定的内容。例如：

```ruby
tag("h1") do
  "Some Title"
end
#=> "<h1>Some Title</h1>"
```

下面这个方法接受了第二个可选参数（参见下文中含有默认值的参数），使其能够传递一个含有HTML属性名称及其值的数组，类似`["href", "www.google.com"]`。

```ruby
tag("a", ["href", "www.google.com"]) do
  "Google it"
end
#=> '<a href="www.google.com">Google it</a>'
```

你可能需要知道，要想在一个双引号定界的字符串中包含双引号`"`，你需要用反斜杠`\"`来**脱离**这个字符。

这个方法很酷炫的一点是，你可以对方法的调用进行嵌套：

```ruby
tag("a", ["href", "www.google.com"]) do
  tag("h1") do
    "Google it"
  end
end
# => '<a href="www.google.com"><h1>Google it</h1></a>'
```

很酷，对吗？

#### 含有默认值的参数

在ruby中你可以给参数提供一个默认值。这意味着如果没有为参数赋予某个值，它将使用默认值，例如：

```ruby
def sum(a, b, c = 0)
  return a + b + c
end

sum(3, 6, 1) # => 10
sum(4, 2)    # => 6
```

在你这里，如过我们调用`sum`时只给顶了2个参数，则第三个参数的值是默认值`0`。
