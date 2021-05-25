## 背景与目标

再次假设你的`Post`类可以访问一个全局的`DB`，定义为
变量，定义如下：

```ruby
DB = SQLite3::Database.new("a_file.db")
```

你仍然可以使用`test.rb`文件来测试你的方法。

## 详细说明

在这个练习中，我们将专注于删除**D**elete(`CRUD`中的`D`)。

### `destroy `

实现一个**实例**方法(为什么它是一个实例方法，而不是像`Post.find`那样的类方法？) `destroy`将从数据库中删除相关的行。

```ruby
post = Post.find(42) # 获取id为42的记录。
post.destroy # TODO: 摆脱数据库中的那一行

# 预期的结果是
Post.find(42)
# => nil
```

这个练习应该比前一个练习用的时间少😊
