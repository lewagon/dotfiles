## 背景和目标

现在`Post`和`User`之间的关联已经到位，让我们给模型添加一些验证，确保我们不会在数据库中存储**不一致的**数据。在开始练习之前，请花15分钟时间，从上到下仔细阅读下方这个指南:

[guides.rubyonrails.org/active\_record\_validations](http://guides.rubyonrails.org/active_record_validations.html)

## 设置

已经有一个迁移来创建`posts`和`users`表（查看`db/migrate`文件夹）。你可以用以下方法来发挥这些迁移的作用:

```bash
rake db:create
rake db:migrate
```

## 详细说明

### 为`用户`模型添加验证信息

- 一个用户应该有一个`username`
- 一个用户应该有一个**有效的**`email`
- 每个人都应该有一个唯一的`username`

### 为`帖子`模型添加验证信息

- 一个帖子应该有一个`标题`、`url`（正确的格式！）和一个用户
- 一个帖子的`title`应该至少有5个字符长
- 每个帖子都应该有一个独特的`title`标题（不区分大小写）。

### 额外部分：回调

我们在讲座中没有提到这个，但是你需要知道Active Record中存在回调。**回调是当事件发生时被调用的一段代码**。在以后的训练营中，我们将在使用JavaScript编程时经常使用这个概念。

例如：当一个用户实例即将被验证时，调用一个方法来事先做一些清理工作。例如，我们可能想把`username`用户名变成小写。

我们可以用下面的代码来实现：

```ruby
class User
  before_validation :lower_username

  private

  def lower_username
    self.username = username.downcase unless username.nil?
  end
end
```

阅读[Active Record Callbacks guide](http://guides.rubyonrails.org/active_record_callbacks.html)来回答最后一个问题。

实现一个回调，在验证前剥离电子邮件。

实现一个回调，在用户被创建后被触发，向新用户发送一封**欢迎邮件**。阅读有关[可用的回调](http://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks)，以确定使用哪个回调。

现在我们没有Rails或像[letter_opener](https://github.com/ryanb/letter_opener)这样的实用工具，所以我们将用下面的方法回调用来模拟发送电子邮件。

```ruby
FakeMailer.instance.mail('boris@lewagon.org', 'Welcome to HN!')
```
