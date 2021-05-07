## 背景和目标

是时候创建一个有3个模型的应用了！就像你猜想的那样，我们将会引入多对多关系(`n:n`)。那将是什么呢，为你自己创建一个观影清单应用。你可以创建清单来保存你喜欢的电影。

Now it's time to make a 3-model app! And you guessed it, we'll be introducing a many to many relationship (`n:n`). So what's the deal? Well, it’s time to build yourself a Watch List. You'll be able to create lists in which you will save your favourite movies.

## 生成Rails应用

如果你还没有安装`yarn`的话，我们要安装`yarn`！

```bash
# macOS
brew install yarn

# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

**注意**: 你现在应该可以在没有速查表的情况下完成这些步骤！不要忘了`--database=postgresql` （我们明天会学这个）。 😉
**Note**: You should now be able to run these steps without this cheat sheet! Don't forget the `--database=postgresql` (we will talk about this tomorrow). 😉

```bash
cd ~/code/<你的github用户名>
rails new rails-watch-list --database=postgresql --skip-action-mailbox -T
cd rails-watch-list
```

We then need to create the postgresql database for this new rails app.
我们要给这个新的rails应用创建postgresql数据库。
```bash
rails db:create
```

Let's set up git, create a repo on GitHub and push our skeleton.
我们设置git，在GitHub上创建一个代码仓库，并且推送我们的项目。
```bash
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

Let's import the teacher's spec to be able to `rake` our progress.
我们导入老师写好的spec来`rake`我们的进度。

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-watch-list-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

你可以测试你的代码：
You'll be able to test your code with:

```bash
rails db:migrate RAILS_ENV=test  # 如果你需要运行数据库迁移
rspec spec/models                # 运行测试
```

开始写代码之前，不要忘了设置Rails应用的前端。就像早上的课程里那样，设置Bootstrap和它的JavaScript依赖。
Before starting to code, don't forget to setup your Rails app for Front-end, like in this morning's lecture let's add Bootstrap and its JavaScript dependencies

```bash
yarn add bootstrap jquery popper.js
```

添加我们要用到的gem：
And add the gems we're going to need:

```ruby
# Gemfile
gem 'autoprefixer-rails'
gem 'font-awesome-sass', '~> 5.12.0'
gem 'simple_form'
```

```bash
bundle install
rails generate simple_form:install --bootstrap
```

Then let's download the Le Wagon's stylesheets:
下载Le Wagon的样式表stylesheets:

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/stylesheets/archive/master.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

To enable Bootstrap responsiveness you will also need to add the following to your `<head>`:
你需要在`<head>`里添加以下内容来启用Bootstrap响应式设计。
```html
<!-- app/views/layouts/application.html.erb -->

<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <!-- [...] -->
```

Finally let's import Boostrap JS library using webpack:
最后我们使用webpack来导入Boostrap JS库：
```js
// config/webpack/environment.js
const { environment } = require('@rails/webpacker')

// Bootstrap 4 has a dependency over jQuery & Popper.js:
// Bootstrap 4 依赖 jQuery 和 Popper.js:
const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

module.exports = environment
```
```js
// app/javascript/packs/application.js
import 'bootstrap';
```

Don't forget to `commit` and `push` your work often.
不要忘了经常提交`commit`和推送`push`你的代码。
## 详细说明Specs

### 1 - 模型Models

和你的同伴一起在[db.lewagon.com](http://db.lewagon.com)画出数据库模式。我们需要三个数据库表，`movies`， `lists`和`bookmarks`。思考这些表之间的关系和*引用references*保存在哪一个表里。
Go to [db.lewagon.com](http://db.lewagon.com) and draw the schema with your buddy. The tables
we need are `movies`, `lists` and `bookmarks`. Think about the relations between the tables and who is storing the *references*. 😉

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/db.png)

**重要**
不要运行`rake`命令，而是运行:

```bash
rspec spec/models
```
来只运行`spec/models`文件夹里的测试。在继续开发应用部分之前确保这些测试都通过了（是绿色的）。
to only run tests in the `spec/models` folder. Make sure they're all green before moving on to the applicative part of the challenge.

#### 特性属性Attributes

- 一个 **movie** 有一个 **标题title** (就像 `"神奇女侠1984"`)，一个**概况overview** (`"Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s!"`)，一个 **poster url** 和一个 **rating** (6.9).
- A **movie** has a **title** (e.g. `"Wonder Woman 1984"`), an **overview** (`"Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s!"`), a **poster url** and a **rating** (6.9).
- 一个 **清单list** 有一个 **name** (就像 `"Drama"`, `"Comedy"`, `"Classic"`, `"To rewatch"`, ... )
- A **list** has a **name** (e.g. `"Drama"`, `"Comedy"`, `"Classic"`, `"To rewatch"`, ... )
- 一个 **bookmark** 把一个电影添加到一个清单 (就像 神奇女侠 被添加到了 "女性力量" 观影清单)。所以每一个**bookmark** 通过**comment**关联了一个电影和一个清单。**comment** 字段用于让用户给bookmark添加一个简短的注释（就像阿兰·图灵推荐了这部电影）。

- A **bookmark** adds a movie to a list (e.g. Wonder Woman has been added to the "Girl Power" watch list). So each **bookmark** references a movie and a list, with a **comment**. The **comment** field is for the user to add a little note on the bookmark (e.g. Alan Turing recommended this movie).

#### 验证

- 一个电影movie必须要有一个唯一的名称title
- 一个清单list必须要有一个唯一的名字name
- 一个书签bookmark必须关联一个电影movie和一个清单list，而且这个[电影movie, 清单list]组合必须要是唯一的。
- A bookmark must be linked to a movie and a list, and the [movie, list] pairings should be unique.
- 书签bookmark的comment字段不能少于6个字符。
- The comment of a bookmark cannot be shorter than 6 characters.

#### 关联Associations

- 一个清单list有多个书签bookmarks
- 一个清单list通过书签bookmarks有多个电影movies
- 一个电影movie有多个书签bookmarks
- A movie has many bookmarks
- 一个书签bookmark 属于一个电影 movie
- 一个书签bookmark 属于一个清单 list
- A bookmark belongs to a list
- You can’t delete a movie if it is referenced in at least one bookmark.
- 如果一个电影movie被一个或一个以上的书签bookmark引用了，这个电影不能被删除You can’t delete a movie if it is referenced in at least one bookmark.
- When you delete a list, you should delete all associated bookmarks (but not the movies as they can be referenced in other lists).
- 如果删除一个清单list，也需要删除所有关联的书签bookmark（但是不能删除关联的电影movies，因为这些电影可能被其它清单list引用）。
When you delete a list, you should delete all associated bookmarks (but not the movies as they can be referenced in other lists).

### 2 - 初始化电影movies

**我们的应用不允许用户创建电影movies**
相反，我们会生成一些固定的电影供用户选择。
就像这样：

```ruby
# db/seeds.rb
Movie.create(title: "Wonder Woman 1984", overview: "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s", poster_url: "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", rating: 6.9)
Movie.create(title: "The Shawshank Redemption", overview: "Framed in the 1940s for double murder, upstanding banker Andy Dufresne begins a new life at the Shawshank prison", poster_url: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: 8.7)
Movie.create(title: "Titanic", overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic.", poster_url: "https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", rating: 7.9)
Movie.create(title: "Ocean's Eight", overview: "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century.", poster_url: "https://image.tmdb.org/t/p/original/MvYpKlpFukTivnlBhizGbkAe3v.jpg", rating: 7.0)
```

### 选做:

使用faker gem创建一些有趣的电影[faker gem](https://github.com/faker-ruby/faker)。
Have fun and seed fake movies using the [faker gem](https://github.com/faker-ruby/faker).

Even better, seed real movies by using [this API](https://developers.themoviedb.org/3/movies/get-top-rated-movies) (with `open-uri` and `json` ruby libs).
或者更好的办法是使用这个接口来创建一些真实的电影[this API](https://developers.themoviedb.org/3/movies/get-top-rated-movies)(使用ruby的 `open-uri` 和 `json` 库)。

**API 设置**

使用这个API需要你注册并且生成一个API密钥。这个过程实在是太长了，在Le Wagon，我们给你提供了一个访问这个API的**代理**。多亏了这个代理，你可以使用这个API而必须要生成你自己的API密钥。在这个练习里你要使用这个代理工具。我们信任你！
The endpoints of the API requires you to sign up and generate an API key. Since the process of doing that is quite long, at Le Wagon, we kindly provided you with a **proxy** to that API. Thanks to this proxy, you'll be able to use that API without generating an API key yourself. You should use this tool for this challenge only! We trust you!

如何使用:

1. API要求使用：`https://api.themoviedb.org/3/movie/top_rated?api_key=<你的API密钥>`
2. 你要做的是使用`http://tmdb.lewagon.com`来替换链接里的`https://api.themoviedb.org/3`
3. 试一下[这里](http://tmdb.lewagon.com/movie/top_rated)

**电影的图片Movie Images**
仔细阅读这篇文章来理解如何从API获取电影的图片[文章](https://developers.themoviedb.org/3/getting-started/images)。
To understand how to get the movie images from the API, make sure to carefully read [this page](https://developers.themoviedb.org/3/getting-started/images) in the docs.

### 3 - 清单Lists的路由，控制器和视图

**重要**
不要使用`rake`命令来开发应用部分。是时候在终端里运行`rails s`了，在浏览器打开[http://localhost:3000/](http://localhost:3000/)。始终要这样开发：
Don't use `rake` to code the applicative part. It's time to launch a `rails s` in your terminal and open a browser at [http://localhost:3000/](http://localhost:3000/). Always code in silo:

- 从**路由route**开始,
- 然后再是**控制器controller**,
- 最后才开发**view视图**，并且要刷新浏览器

一个功能已经开发好了（而且看起来也很好），重复以上流程，继续开发下一个功能！
When your feature is done (and looks good), move on to the next one and repeat the process!

你觉得你已经完成了**整个**挑战，运行`rake`命令确保开发的应用满足了详细说明里的所有要求。
When you think you're done with the **whole** challenge, use `rake` to make sure it satisfies the specs.

**功能**
再次强调，要开发路由，你必须要对应用的功能有一个非常精确的认识。以下是功能列表：
Once again, you must have a precise idea of the features of your app in order to build your routes. Here is the list of features:

- 用户可以看到所有的清单lists

```
GET "lists"
```

- 用户可以看到一个给定清单list的详细信息和名字

```
GET "list/42"
```

- 用户可以创建一个新的清单list

```
GET "lists/new"
POST "lists"
```

### 4 - 书签bookmarks的路由，控制器和视图

- 用户可以给现有的清单list添加一个新的书签bookmark（电影/清单 组合）
- A user can add a new bookmark (movie/list pair) to an existing list
- 阅读 `simple_form`文档里关于`f.association`的部分，给我们的电影创建一个下拉选择框。[文档](https://github.com/heartcombo/simple_form#associations) about `f.association` to easily create a select dropdown for our list of movies.
- Checkout `simple_form` [docs](https://github.com/heartcombo/simple_form#associations) about `f.association` to easily create a select dropdown for our list of movies.

```
GET "lists/42/bookmarks/new"
POST "lists/42/bookmarks"
```

- 用户可以从清单list里面删除一个书签bookmark。如何创建一个删除链接？

```
DELETE "bookmarks/25"
```

我们需要一个`MoviesController`控制器吗?

### 5 - 设计Design as we go

开发一个非常好看的前端！和CSS好好玩一玩！😊 去 [dribbble](https://dribbble.com/) 或者 [onepagelove](https://onepagelove.com/) 找一些灵感。

Now time to make a nice front-end! Time to play around with CSS! 😊 Go check out [dribbble](https://dribbble.com/) or [onepagelove](https://onepagelove.com/) for inspiration.

不要忘了也可以在`app/assets/images`文件夹里使用本地图片。或者更好的办法是，当用户创建一个新的清单list的时候，让用户填入图片地址`image_url`。
Don't forget you can have local images in the `app/assets/images` folder. Or even better, you can ask the user for an `image_url` when the user adds a new list.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/homepage.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/showpage.png)

### 6 - 新建书签bookmark的表单放在清单list的show页面（选做）New bookmark form on the list show page (Optional)

尝试把"新建书签bookmark的表单"放在清单list页面，而不是一个单独的页面。这样创建书签的时候你就不需要离开清单list页面来添加一个新的电影了！路由会有哪些改变？控制器有哪些改变？
Try to put the "New bookmark form" on the list page itself, not on a separate page, so you won't have to leave the list page to add a new movie! What changes in the routes? And in the controllers?

### 7 - 电影的下拉选择框使用Select2(选做)
我们在Rails应用里添加一个npm包！我们按照课件来把`select2`添加到电影的下拉选择框里。
Let's try adding an npm package to our rails app! Let's follow the slides to see how we can add `select2` to our movies dropdown.

### 8 - 清单的点评List reviews (选做)
任何人都可以对我们的电影收藏做评价（告诉我们他们的想法）。给我们的清单添加一些点评reviews！
Everyone should be able to comment and tell us what they thought of our movie collection. Let's add some reviews to our lists!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/reviews.png)

### 9 - 更进一步

- 添加搜索电影的功能。
- Adding a possibility to search for movies.
- Adding `typed.js` to have some funky title on our home page.
- 使用`typed.js`在主页添加一些有趣的标题。
- 当我们向下滚动一个清单list的show页面的时候，可以使用一些用于书签bokmarks的非常好的[滚动动画](https://michalsnik.github.io/aos/) animations for our bookmarks as we scroll down a list show page.
- Some nice [animate on scroll](https://michalsnik.github.io/aos/) animations for our bookmarks as we scroll down a list show page.
- 在点评reviews表单里使用[jquery-bar-rating](http://antennaio.github.io/jquery-bar-rating/)来显示星级，而不是常规的输入框
- Using [jquery-bar-rating](http://antennaio.github.io/jquery-bar-rating/) to display stars instead of a normal input in the reviews form.
