## 背景和目标

本练习的目标是开发一个2个模型的Rails应用，一个restaurant模型和匿名的review模型。
你可以在这里看到一个类似的例子，使用articles和comments模型，[Rails guide](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model)。

## 生成Rails应用

你将使用一个外部的由老师编写的详细说明文件specs来测试你的Rails应用，这就是为什么要在命令里面指定`-T`，意思是不要生成Rails内置的测试文件。
以下是你将要运行的设置命令：

```bash
cd ~/code/<user.github_nickname>
rails new rails-yelp-mvp --skip-active-storage --skip-action-mailbox -T
cd rails-yelp-mvp
git add .
git commit -m "rails new"
gh repo create
git push origin master
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
git submodule add git@github.com:lewagon/fullstack-challenges-03-Rails-restaurant-reviews-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

开发你的app之前，记得遵守我们的[Rails前端指南](https://github.com/lewagon/rails-stylesheets/blob/master/README.md)，确保你使用了simple form, Bootstrap，而且有stylesheets文件夹(⚠️ 只做 **setup** 这个环节, 不要使用 **Bootstrap JS**，这是明天的内容！)。

### 测试你的代码
每次在你添加了一个数据库迁移文件之后（比如说 运行了`rails g model ...`之后），不要忘了在**测试数据库**上运行数据库迁移：

```bash
rails db:migrate RAILS_ENV=test  # 添加了一个数据库迁移之后运行
```
测试你的代码是非常简单方便的

```bash
rake

# [...]
# Failed examples:
#
# rspec ./spec/controllers/restaurants_controller_spec.rb:84 # RestaurantsController should exist
# rspec ./spec/controllers/reviews_controller_spec.rb:77 # ReviewsController should exist
# rspec ./spec/models/restaurant_spec.rb:13 # Restaurant has a name
# rspec ./spec/models/restaurant_spec.rb:18 # Restaurant has an address
# rspec ./spec/models/restaurant_spec.rb:23 # Restaurant has a phone number
# rspec ./spec/models/restaurant_spec.rb:28 # Restaurant has a category
# rspec ./spec/models/restaurant_spec.rb:33 # Restaurant name cannot be blank
# rspec ./spec/models/restaurant_spec.rb:40 # Restaurant address cannot be blank
# rspec ./spec/models/restaurant_spec.rb:47 # Restaurant category cannot be blank
# rspec ./spec/models/restaurant_spec.rb:54 # Restaurant neptunian is not a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant chinese is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant italian is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant japanese is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant french is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant belgian is a valid category
# rspec ./spec/models/restaurant_spec.rb:70 # Restaurant has many reviews
# rspec ./spec/models/restaurant_spec.rb:75 # Restaurant should destroy child reviews when destroying self
# rspec ./spec/models/review_spec.rb:20 # Review has a content
# rspec ./spec/models/review_spec.rb:25 # Review has a rating (stored as integer)
# rspec ./spec/models/review_spec.rb:30 # Review content cannot be blank
# rspec ./spec/models/review_spec.rb:37 # Review rating cannot be blank
# rspec ./spec/models/review_spec.rb:44 # Review parent restaurant cannot be nil
# rspec ./spec/models/review_spec.rb:51 # Review rating should be an integer
# rspec ./spec/models/review_spec.rb:58 # Review rating should be a number between 0 and 5
```
如果运行`rake`不顺利的话，你需要运行`bin/rake`。这意味着你的环境变量`$PATH`没有包含`./bin` 文件夹，你可以通过dotfiles的zshrc来修复这个问题(查看[我们的默认配置](https://github.com/lewagon/dotfiles/blob/master/zshrc#L16-L18))。

## 详细说明

### 模型Models

#### 模式Schema

- 一个 restaurant 有 `name`, `address`, `phone_number`, `category`这些字段，会有很多个reviews。
- 一个 review 有 `rating`, `content`这些字段，而且属于一个restaurant。

在你选择数据类型的时候一定要仔细思考一下，第一次想到的不一定是正确的。

**问题**: 你可以在这里画出这个简单的数据库模式吗[db.lewagon.com](http://db.lewagon.com)? 和你的伙伴讨论一下。

#### 验证Validation

- 一个 restaurant 必须要有name，address 和 category。
- 一个 restaurant的 category 必须在这个固定的清单里: `["chinese", "italian", "japanese", "french", "belgian"]`。
- 一个restaurant被删除之后，它所有的reviews也必须被删除。
- 一个 review 必须属于一个restaurant。
- 一个 review 必须要有content 和 rating。
- 一个 review 的 rating 必须是一个介于0和5之间的整数。

在开发路由层之前，验证所有的模型测试。你可以使用下面的命令：
```bash
rspec spec/models
```
来选择性地运行`spec/models`文件夹下面的测试。

你也可以使用`rails console` 来手动测试你的代码。在每次代码修改之后，不要忘了使用`reload!`!

```bash
rails c
> bristol = Restaurant.new(name: "Epicure", category: "french")
> bristol.valid?              # 应该返回 false
> bristol.address = "75008 Paris"
> bristol.valid?              # 应该返回 true
> bristol.save                # 写入数据库，并设置id
> yummy = Review.new(content: "yummy yummy", rating: 4)
> yummy.restaurant = bristol  # 设置外键restaurant_id
> yummy.save
> bristol.reviews             # 应该包含 yummy review
> yummy.restaurant            # 应该返回 bristol restaurant
```

### 初始化

- 在`db/seeds.rb`文件，使用至少5条有效的restaurant数据记录来初始化数据库。
- 运行 `rails db:seed` 命令来执行初始化代码。

### 路由Routing / 控制器Controllers

在开发网站应用的过程中，问问你自己需要哪些路由是一个非常重要的步骤。**路由应该精确模拟了产品的用户故事**。 我们在这里定义我们的最小可行性产品（Minimum Viable Product）：

- 访客可以看到所有的restaurants列表。

```
GET "restaurants"
```
- 访客可以添加一个新的restaurant，而且会被重定向（redirect）到新添加的restaurant的`show` 页面。

```
GET "restaurants/new"
POST "restaurants"
```

- 访客可以看到一个restaurant的详细信息，包括它所有的reviews。

```
GET "restaurants/38"
```

- 访客可以给一个restaurant添加一个新的review。

```
GET "restaurants/38/reviews/new"
POST "restaurants/38/reviews"
```

- 就这么多了!


在我们的最小可行性产品MVP, 访客不可以更新或者删除任何的restaurant或者review。这是admin用户才可以做的 (比如说 **你**) - 如果你想更新/删除任何数据库记录的话，做为开发者你有权限从`rails console`去操作数据库。


我们知道这只是一个最基础的最小可行性产品，但是我们想让你理解的是**一个路由就是一个用户故事的体现**。在你的应用里，不要为所有的模型盲目地写下7个增删查改CRUD路由。这很容易让你被自己的产品搞糊涂，从而忘了你的最小可行性产品到底是什么。


现在是时候实现这个产品所需要的所有路由了！

**提示:** 你需要使用[嵌套资源](http://guides.rubyonrails.org/routing.html#nested-resources)来处理路由`GET "restaurants/38/reviews/new"`。

### 视图Views

现在把我们的注意力转向前端，因为前端是我们的用户所看到的！如果在练习开始的时候你没有做设置，要遵循这个[指南](https://github.com/lewagon/rails-stylesheets/blob/master/README.md)来设置你的Rails前端(⚠️ 只做 **setup** 这个环节, 不要使用 **Bootstrap JS**，这是明天的内容！)。

#### 布局Layout / 局部视图partials

记得使用布局和局部视图来重构你的视图。就像这样：

- 应用布局applicaton layout可以包括一个Bootstrap导航栏，链接到restaurants的列表页面和创建restaurant的表单页面。
- 表单可以放到一个局部视图`partial`，这让你的HTML代码易读性更好。

#### 帮助方法Helpers

使用Rails帮助方法的时候，就像`link_to`方法，你可以传递一个包括了HTML属性的哈希hash做为参数。这让你可以把Bootstrap CSS类名称添加到链接里。下面是一个例子：


##### [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)

```erb
<%= link_to "See details", restaurant_path(restaurant), class: "btn btn-primary"%>
```

生成以下的HTML代码：

```html
<a href="/restaurants/3" class="btn btn-primary">See details</a>
```

##### [form_for](http://guides.rubyonrails.org/form_helpers.html)

注意了 - 你的reviews链接是嵌套在`/restaurants/:restaurant_id`里面的。这意味着你不能像非嵌套资源那样使用`form_for`。 如果你写了这样的代码:

```erb
<%= form_for(@review) do |f| %>
  <!-- [...] -->
<% end %>
```

会生成这样的HTML代码：

```html
<form action="/reviews">
  <!-- [...] -->
</form>
```

这不是我们想要的结果，因为**我们没有一个路由是`POST "reviews"`**。我们必须要使用符合嵌套资源语法规则的`form_for`：

```erb
<%= form_for [@restaurant, @review] do |f| %>
  <!-- [...] -->
<% end %>
```
会生成这样的HTML表单：

```html
<form action="/restaurants/42/reviews">
  <!-- [...] -->
</form>
```

这个URL是和你在`routes.rb`里定义的路由`POST "restaurants/:restaurant_id/reviews"`保持一致的。可以看一下这篇[文章](http://stackoverflow.com/questions/2034700/form-for-with-nested-resources)，有更多的信息。

**提示:** 安装[simple_form](https://github.com/plataformatec/simple_form) gem， 可以使用更轻量化语法的而且和bootstrap兼容的表单。

### 改进你的应用

**一旦完成了restaurant-review应用的第一个版本**, 尝试去改进它，把review表单嵌入restaurant的详细页面。这意味着你的路由看起来要像这样：

```
GET "restaurants"
GET "restaurants/new"
GET "restaurants/38"
POST "restaurants"
POST "restaurants/38/reviews"
```

请注意我们不再使用路由`GET "restaurants/38/reviews/new"`。这是因为review 表单**现在已经被嵌入了`restaurants/show.html.erb` 视图**。 🛏
