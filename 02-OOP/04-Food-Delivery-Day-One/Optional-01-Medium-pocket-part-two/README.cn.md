## 背景和目标

你成功地完成了第一部分的送餐程序挑战，太棒了！
在这个挑战中，我们将用 `Author` 模型扩展 DEV Pocket 挑战（Cookbook 第一天的 optional challenge）。我们将对 `Post` 和`Author` 之间的以下关系进行建模：

![数据模式](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/pocket_reader.png)

我们希望将用户操作扩展到：

```bash
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. List authors         # 新
6. List author\'s posts  # 新
7. See author info      # 新
8. Exit
```

正如你可能想象的那样，当一篇帖子被保存时，关于作者的信息将会被删除。让我们继续思考一下我们的架构。

## 详细说明

首先导航到Cookbook 的 DEV Pocket挑战（Cookbook的第一个可选挑战）并下载解决方案。这将是你编写这个扩展版本的起点。

### 模型

首先，我们需要编写一个带有实例变量的 `Author` 模型，我们可以从架构中推断出实例变量。

**Author-posts 关系**

我们要在帖子posts和作者author之间建立的关系如下：

```
一个作者author可以写几篇帖子posts
一篇帖子post是作者author写的
```
这意味着在代码中：

- 我们需要在 `Author` 中添加一个 `@posts` 实例变量（并公开可阅）
- `@posts` 一列 ***`Post` 实例** 的数组
- 我们需要更新 `Post` 中的 `@author` 实例变量，使其不再存储名称，而是 **`author`实例**（并公开可阅）
- 我们需要在两个模型中都添加 `@id` ，以便在csv文件中保持这种关系
- 这种关系是由子类们（这里的帖子post）进行的，这意味着我们需要在 `posts.csv` 中有一个 `author_id` 列

要将帖子post与其作者author相关联，请考虑编写以下代码：

```ruby
# lib/models/author
class Author
  # [...]
  def add_post(post)
    @posts << post
    post.author = self  # <-- 你需要什么帖子post类的什么来写？
    what do you need in your Post class to write this?
  end
end
```

在 `irb`中测试你所编写的逻辑关系，修复错误，然后接下来搭建存储库。

### 存储库

`存储库` 应要成为 `PostRepository` 我们需要在csv机制中添加 `id` 和 `author_id` 。

**提醒一下，每当添加实例时，存储库的角色就是为实例提供id**

考虑将 `find(index)` 重命名为 `find_by_index(index)`。我们将保留以`id` 作为参数的方法的 `find` 名称。

我们需要编写一个 `AuthorRepository` 并将其链接到一个 `authors.csv` 文件。现在存储库没有什么吸引人的。

在 `PostRepository`中，我们需要更新 `load_csv` 方法，因为post与author对象相关。

在给定的post上，当我们从CSV读取 `author_id` 时，我们需要找到相应的author实例以将其与post对象相关联。这意味着：
- `PostRepository` 必须在 `AuthorRepository` 之后实例化
- `PostRepository` 应该可以访问 `@author_repo` 实例
-  `AuthorRepository` 应该有一个 `find(id)` 方法，该方法从其 `@authors` 数组返回正确的 `Author`实例

在编写我们软件的应用程序前，请确保你的存储库工作正常。

### 控制器

首先在 `PostsController`中重命名 `Controller` 。我们希望添加与作者相关的用户故事，它们将由 `AuthorsController` 处理。

在编写任何新的用户故事之前，请尝试运行现有的故事。由于我们所做的所有更改，你将发现一系列要修复的错误。

**修复保存帖子功能**

最困难的挑战就在眼前。我们说我们想在将帖子保存到我们的Pocket应用程序时搜集有关作者的详细信息。

我们已经知道如何抓取数据了。我们需要更新我们的爬虫代码，以获得作者的**昵称nickname**

多亏了这个昵称，你应该能够打开作者的页面并从中抓取作者的详细信息。

一旦拥有了创建post所需的所有数据，就可以开始实例化一个 `Post.new` 。对于 `Author.new` 也一样。在将它们添加到存储库之前，让我们暂停一分钟。

为了简单起见，让我们假设我们的用户很聪明，不会尝试保存已经保存的帖子。但是，如果你保存了同一作者的第二篇帖子，**你不想在存储库中重复该作者**！在 `PostsController#create` 操作中考虑以下步骤：

```ruby
def create
  # 1. Ask user for a post path (view)
  # 2. Scrape post (?)
  # 3. Scrape author (?)
  # 4. Find corresponding author (author repo)
  # 5. If we don't have it, save it and get it back with its id (author repo)
  # 6. Associate post to its author (model)
  # 7. Save post (post repo)

  # 1. 向用户请求帖子发布路径（视图）
  # 2. 抓取帖子数据（？）
  # 3. 抓取作者数据（？）
  # 4. 查找该作者（作者存储库）
  # 5. 如果我们没有它，保存它并用它的id（作者存储库）
  # 6. 将帖子与其作者（模型）关联
  # 7. 保存后（帖子存储库）
end
```

在 `PostsController` 中编写所有代码，直到操作正常运行。然后可以考虑在提取服务对象中进行爬虫。优秀的例子应该是：

```ruby
# lib/services/reader_scraper.rb
class ReaderScraper
  def initialize(post_path)
    @post_path = post_path
  end

  def call
    # Scrape post
    # [...]
    post = Post.new(post_attributes)
    # Scrape author
    # [...]
    author = Author.new(author_attributes)
    return { post: post, author: author }
  end
end
```

确保它仍然有效，然后继续下一个步骤。

**列出作者**

喔吼...，最难的部分已经过去了。接下来这个很简单！我们只需要要列出作者，所以让我们编写一个`AuthorsController`。

它需要访问author存储库和authors视图。视图必须在索引列表中显示作者姓名和关联的未读文章：

```bash
1. Magnus Skog
2. Molly Struve (2 unread)
```

**列出作者帖子**

我们在模型上的工作应该会让这个很代码很容易写。多亏了 `posts` getter，我们可以访问一个作者的所有帖子。编写伪代码，将问题分解为几个小步骤，测试并转到最后一个功能。

**查看作者详细信息**

一如往常，首先在伪代码中将操作分解成小步，然后在Ruby中逐行翻译并定期测试。

我们的用户在选择Molly Struve时必须在终端中看到以下内容：

```bash
1. Magnus Skog
2. Molly Struve (2 unread)
Index?
> 2

Molly Struve (molly_struve)

Elasticsearch wrangler. Speaker. Runner. Show Jumper. Always Ambitious. Never Satisfied.

54 posts published - 442 comments written
```

祝你建模愉快!
