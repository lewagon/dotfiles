## 背景与目标

再次假设你的`Post`类可以访问一个全局的`DB`，定义为
变量，其定义如下：

```ruby
DB = SQLite3::Database.new("a_file.db")
```

你仍然可以使用`test.rb`文件来测试你的方法。

## 详细说明

在这第四个练习中，我们将重点讨论`CRUD`的**C**reate和**U**pdate。
为什么我们要把 `C` 和 `U` 放在一起做？这是因为这个过程非常相似。当操作对象实例时，如果我们对某个东西调用`save`，而它还不存在于我们的数据库中，它将被创建**C**reated。如果它已经存在，它就会被更新**U**pdated。

### `save `

实现一个**实例的**方法（为什么是像`destroy`这样的实例方法，而不是像`Post.find`这样的类方法?) `save`将在数据库中创建或更新相关的行。

```ruby
post = Post.new(title: "Awesome article")
post.id
# => nil (这个帖子还没有被持久化)
post.save # TODO: 持久记录!
post.id
# => 1 (预期的结果，数据库已经插入了一行，在内存中存储id)

post.title = "很棒的文章，更新了"
post.save # TODO: 应该更新数据库中的记录
```

你可能需要使用[last\_insert\_row\_id](http://zetcode.com/db/sqliteruby/connect/)。
