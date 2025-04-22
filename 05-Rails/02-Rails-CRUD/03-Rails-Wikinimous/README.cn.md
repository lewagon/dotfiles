## 背景和目标

我们想开发一个匿名的维基网站(就像 [这个](https://wikinimous.lewagon.com))，任何人都可以创建新文章或者更新现有的文章。

现在没有`rake`了，所以不要在`fullstack-challenges`里面创建你的Rails应用⛔

```bash
cd ~/code/<user.github_nickname>
rails new rails-wikinimous --skip-active-storage --skip-action-mailbox
cd rails-wikinimous
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## 详细说明

### 1 - 模型Model

使用正确的Rails生成器来生成`Article`模型。它至少应该包括以下字段：

- `title`, 数据类型是字符串 `string`
- `content`, 数据类型是文本 `text`

可以随时在控制台`rails console`测试你的模型：

```ruby
new_article = Article.new(title: 'The meaning of life', content: "It's 42!")
new_article.valid?  # => should be `true`
new_article.save    # => should not display rollback warnings
Article.last        # => should be the one you just saved
```

### 2 - 初始化

在`Gemfile`添加[`faker` gem](https://github.com/stympy/faker)并且运行`bundle install`。

在`db/seeds.rb`文件里使用这个gem生成10篇文章。代码完成之后，运行：

```bash
rails db:seed
```

### 3 - 路由，控制器和视图

生成你的控制器，并且实现所有的7个增删查改CRUD默认动作来列出所有文章，显示，创建，更新和删除一篇文章，就像我们在任务清单管理应用里做的那样。

你现在可以在路由里直接使用`resources` 快捷方法。

看一下这个[应用](https://wikinimous.lewagon.com)来看看我们的应用应该开发成什么样子。😉

### 4 - 前端（选做）

**安装Bootstrap样式**

跟着[这个文档](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css)来安装Bootstrap在你的Rails应用上。你可以复制粘贴下方代码在`application.html.erb`的`head`中添加一个`link`标签：

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

你现在可以在你Rails应用的各个页面里使用Bootstrap class啦！🎉

**安装Font Awesome**

在你的layout里的`head`中添加下方的`link`标签：

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

你现在可以随意使用任何[免费的Font Awesome图标](https://fontawesome.com/search?m=free)啦！ 🎉
