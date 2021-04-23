<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

让我们在这个挑战中继续练习语句块（block）。我们将编写另一个方法（method），它应该与语句块（block）一起被调用，这一次我们经看到语句块如何启动嵌套方法（method）的调用，以及它在现实示例中如果变得有用。我们也将发现我们如何用第二可选参数来定义方法（methods），这种情况非常常见。

## 详细情况

完成`#tag`方法，它围绕我们在语句块中给定的内容建立HTML标签。例如：

```ruby
tag("h1") do
  "Some Title"
end
#=> "<h1>Some Title</h1>"
```

这个方法接受了第二可选参数（参见下文中含有默认值的参数），使其能够传递一个含有HTML属性名称及其值的数组，类似`["href", "www.google.com"]`。

```ruby
tag("a", ["href", "www.google.com"]) do
  "Google it"
end
#=> '<a href="www.google.com">Google it</a>'
```

你可能需要知道，要想在一个字符串中包含被双引号限定的`"`符号，你需要用`\"`**逃避**这个字符。

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








