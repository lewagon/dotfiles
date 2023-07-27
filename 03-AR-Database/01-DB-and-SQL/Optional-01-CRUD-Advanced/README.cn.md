## 背景和目标

本练习的目标是执行上一个挑战中剩余的CRUD操作。

**注意**: 作为提醒，在本练习中，我们**已经提供了**`DB`全局变量，因此无需自己实例化一个新的`SQLite3::Database`。只需在代码中使用 `DB.execute`，它就会工作（但请随时查看 `spec/models/post_spec.rb` 以了解 `DB` 变量是如何创建的）。

## 设置

首先，把上一个挑战中的代码复制粘贴到这个挑战的文件夹中：

```bash
# 确保你在正确的目录下：
cd ~/code/<user.github_nickname>/fullstack-challenges/03-AR-Database/01-DB-and-SQL/Optional-01-CRUD-Advanced

# 从 CRUD - 读取挑战中复制代码：
cp -r ../04-CRUD-Read/app .
```

## 测试

我们还为你准备了一个 `test.rb` 文件，其中 `DB` 全局变量的创建方式与 `spec/models/post_spec.rb` 中的相同。你可以使用该文件调用和测试您的方法。

### 详细参数

### SQL注入

就像上次练习一样，我们需要让数据库避免被SQL注入攻击。这意味着我们绝不能将用户数据插入SQL查询，而应使用`?`[**占位符**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem)。

ℹ️ 对于本练习的两个部分，为防止 SQL 注入，您需要向 `.execute` 方法传递多个参数。记得查看讲座幻灯片（或上次挑战），复习一下如何做到这一点！

#### 第一部分： 删除

在本练习的第一部分，我们将重点学习 **D**elete（`CRUD`中的`D`）。

为此，我们需要使用以下方法：

### `#destroy`

实现一个**实例**方法`destroy`，它可以从数据库中删除相关记录。为什么这个方法是一个实例方法，而不是像`Post.find`或`Post.all`这样的类方法？🤔 如果你不确定，可以问问你的伙伴或助教！

让我们来看一个如何使用这个方法的例子 👇

```ruby
post = Post.find(42) # 获取 ID 为 42 的记录。
post.destroy # TODO: 在数据库中删除该行

# 预期结果
Post.find(42)
# => nil
```

同样，让我们写一些伪代码来帮助我们：

```ruby
# TODO: 编写从数据库中删除特定文章的 SQL 查询
# TODO: 使用 DB.execute 执行 SQL 查询
```

### 第二部分：增加 & 更新

在练习的下一部分，我们将重点讨论`CRUD`的**C**reate 和**U**pdate。

为什么我们要把`C`和`U`放在一起呢？因为它们的过程非常相似！在这两种情况下，我们都在向数据库发送新数据。唯一的区别在于我们处理的对象是否已经存在于数据库中。如果存在，那么我们就是在更新现有记录的某些值（如何在数据库中找到现有记录？） 如果数据库中还不存在该对象，那么我们就是在插入值并创建一条新记录。

在操作对象实例时，如果我们对某个对象调用`save`，而它还不存在于我们的数据库中，它就会被**C**reate创建。如果它已经存在，则会被**U**pdate更新。💡 提示：现有对象和全新对象的主要区别是什么？

### `#save`

实现一个**实例**方法 `save`，在数据库中创建或更新相关行。同样，请确保你能回答为什么它跟`destroy`一样是实例方法，而不是一个类似于 `Post.find` 的类方法。

我们来看一个如何使用该方法的示例 👇

```ruby
post = Post.new(title: "Awesome article")
post.id
# => nil（文章尚未被保存）
post.save # 将持保存一条新记录！
post.id
# => 1（预期结果，数据库已插入一行，将id保存在内存中）

post.title = "Awesome article, updated"
post.save # 将更新数据库中的现有记录！
post.title
# => "Awesome article, updated"
```

让我们写一些伪代码来帮助我们完成这些步骤：

```ruby
# TODO: 确定是否需要*创建*或*更新*文章
# TODO: 如果文章已经存在：
  # TODO: 在数据库中编写更新文章的 SQL 查询
  # TODO： 使用 DB.execute 执行查询
# TODO： 如果文章是新的、
  # TODO: 编写 SQL 查询，在数据库中添加新的文章
  # TODO：使用 DB.execute 执行查询
  # TODO: 使用数据库中的数据更新文章的 @id
```

💡 提示：你可能需要使用 [last\_insert\_row_id](http://zetcode.com/db/sqliteruby/connect/)，正如我们在讲座中看到的那样😉
