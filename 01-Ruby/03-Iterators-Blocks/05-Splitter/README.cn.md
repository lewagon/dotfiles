## 背景与目标

让我们把enumerable的力量（`#each`, `#map`, etc.）和block（以及`yield`）联合起来。我们将想要创建一个**splitter**方法（method），它将以一个数组作为参数，并根据任意规则将其分为2个组群。如果我们谈论的是一群人，你可能想按照年龄分组。

## 详细说明

### 大小拆分
完成第一个方法（method）`size_splitter`，它有两个参数：一个数组，一个整数（即`size`）。我们将假设数组仅包含单词，例如`字符串（Strings）`，任意规则是用来形成2个组群：第一组包含给定大小（该方法的第二个参数，size）的单词，另一组是所有其他单词。

`size_splitter`方法应该返回一个含有两个数组的数组 - 即上面定义的2个组群 - 每个组的内容按照**字母表顺序**排序。

```ruby
words = %w(dog data ask my win two beer as)
result = size_splitter(words, 3)

# result => [["ask", "dog", "two", "win"], ["as", "beer", "data", "my"]]
```

### （高级）语句块拆分

在之前的练习中，规则是定死的。如果我们想让方法调用者选择应用哪种规则，会怎样呢？我们可以通过语句块（blocks）和`yield`来实现它！

编写一个`block_splitter`方法以使下文中的示例得以运行：

```ruby
beatles = [ "John", "Paul", "Ringo", "George" ]
result = block_splitter(beatles) { |beatle| beatle.start_with?("P") }

# result => [ [ "Paul" ], [ "John", "Ringo", "George" ] ]
```
