## 背景和目标

恭喜你，你在Cookbook挑战中表现出色！

让我们重新开始编写另一个完整的模型-视图-控制器应用程序。这次我们将创建一个应用程序来保存[DEV](https://dev.to)发布并稍后阅读：

- 作为用户，我可以列出我保存的所有帖子
- 作为一个用户，我可以添加一个我想稍后阅读的帖子
- 作为一个用户，我可以阅读我保存的帖子
- 作为一个用户，我可以将一篇帖子标记为已读

一个演示胜过千言万语，所以这是我们要编写的应用程序：

#### 列出帖子

```bash
---------------------------------
Welcome to your DEV Pocket Reader
---------------------------------

----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 1

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
```

#### 保存帖子以备以后阅读

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 2

Path?
> molly_struve/level-up-your-ruby-skillz-working-with-hashes-4bid

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### 阅读帖子

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 3

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

[...] # 这应该显示帖子的整个内容，段落之间换行！
```

#### 将帖子标记为已读

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 4

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [x] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### 优雅地退出

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 5

Bye bye!
```

如你所见，用户只键入DEV帖子的 `path` 。 `path` 是url中域名后面的文本。

例如，保存[本文](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc)，我们的用户需要输入的路径是后面的所有内容`https://dev.to/`即`unseenwizzard/learn-git-concepts-not-commands-4gjc`。

那么我们要如何检索帖子的作者、标题和内容。。。？

当然，我们可以爬虫！

**问题：我们将在哪里编写爬虫部分的代码**

你可以在readme的最后找到答案。

## 详细说明

这次你将在没有任何帮助的情况下编写代码， `rake` 只会给你风格的帮助👌

在前几天的livecodes更正的帮助下，可以自由尝试并在这个挑战上做TDD。

### 模型

正如你现在知道的，你应该先从你的模型开始。模型是我们需要的Ruby类，以便在我们的程序中操作数据。

在这里我们想查看DEV **posts**，所以让我们继续创建一个 `Post` 类。在编写代码之前，花点时间问问自己：

其状态：

- 我们需要在 `post` 中存储什么 **才能完成我们的用户故事**？

答案将给出实例变量。

其行为：

- 我们需要对post执行哪些转换？
- 我们需要将哪些状态暴露在阅读中？写作？

答案将提供公共实例方法。

如果找不到所有的实例变量和方法，请不要着急，稍后在编写repo和控制器时需要时，你会找到它们。当你认为你完成了，在 `irb`中测试你的类，修复bug，然后进入下一个类。

### 存储库

就像在cookbook一样，我们需要一个存储库来 **存储** 我们的帖子在内存和硬盘上。这个类需要在编模型后编码，两个类都是同一个 **数据** 块的一部分。

实现一个 `Repository` 类，它将充当假数据库。它应该连接到 `posts.csv` 文件使我们的应用程序持久化。

**注意：** 如果在解析csv时遇到 `csv invalid byte sequence in us-ascii` 错误，可以在调用 `CSV.foreach` 时加上 option

```ruby
CSV.foreach("posts.csv", encoding: 'ISO-8859-1') do |row|
  # [...]
```

### 控制器

控制器服务于用户情景。我们来看看：

- 作为用户，我可以列出我保存的所有帖子
- 作为一个用户，我可以添加一个我想稍后阅读的帖子
- 作为一个用户，我可以阅读我保存的帖子
- 作为一个用户，我可以将一篇帖子标记为已读

记住，控制器在模型-视图-控制器模式中扮演中枢角色。从每个操作中可以访问存储库和视图的能力是必要的（这将帮助你定义实例变量）。

对于每个用户故事，你需要在控制器中编写一个操作（实例方法）。

这是每个操作需要遵循的流程：

- 编写伪代码，将问题分解为小步骤，你可以轻松地在Ruby中进行翻译
- 记住，每个与数据有关的指令都将交给数据库，每个 `puts` 和 `gets` 都将由视图处理（同样，请考虑单一责任原则）
- 编写代码情景期间，你只需要在必要时自然地编写 `View`  类及其实例方法
- 每当出现新的需求（我们需要在回购或模型中使用新方法）时，请遵循流程并立即编写代码
- 定期测试代码（每2或3行代码）

要测试操作，可按照以下说明：

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
repo = Repository.new(File.join(__dir__, 'posts.csv'))
controller = Controller.new(repo)

controller.action_name # 替换为要测试的操作的真实名称
```

然后去测试：

```bash
ruby lib/test.rb
```

**提示**：如果你在搜刮时遇到`403 Forbidden Bots (OpenURI::HTTPError)`，有一个简单的方法，就是在HTTP请求的头文件中指定一个`User-Agent`。下面是一个使用`open-uri`的例子。

```ruby
USER_AGENT = "Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0"
html_content = URI.open(url, "User-Agent" => USER_AGENT).read
```

### 路由

在Cookbook上，我们给了你router路由。这次，试着自己编写你自己的路由代码吧！记住，在一天结束时，我们要调用 `app.rb` 里的 `router.run` ，这应要启动我们的应用程序！

### 把它们绑在一起

这次我们没有给你 `app.rb` 。别害怕，把问题从头开始。我们知道 `app.rb` 文件的目的是调用 `router.run`。
这意味着你需要实例化一个 `router.run`，它是我们的 `router` 类的一个实例。好的，这是一个 `Router.new(controller)`。这意味着我们需要一个 `controller`... 遵循这一思路将引导你了解整组代码。

准备就绪后，可以开始运行程序：

```bash
ruby lib/app.rb
```

### 顺便说一句...

那么，你应该在哪里编写程序的数据抓取部分呢？好吧，让我们重新阐述我们的问题。我们的程序应该能够实例化只有一个 `path` 的 `Post` 。

但是当我们实例化 `post` 时，我们希望它自动抓取标题、内容和作者。一个可以写这段代码的好地方可能是 `Post`的 `initialize` 方法。但那并不是我们要编码的地方。

假设我们在添加了一个 `Author` 模型，并且我们希望在抓取帖子时抓取关于帖子作者的信息。 `Post#initialize` 方法不再是一个好选择... 把它留在**controller**（在那里我们可以访问模型和存储库）是必要的，所以让我们在那里编写代码，并为这个挑战的扩展版本做好准备！

下一节课，如果我们想从模型-视图-控制器模式中提取这种特定的特性，我们将看到如何将 `Service` 类插入模型-视图-控制器模式内。
