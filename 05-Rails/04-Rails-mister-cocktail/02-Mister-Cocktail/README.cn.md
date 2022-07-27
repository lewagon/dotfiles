## 背景和目标

现在是时候打造一个三模型的应用程序啦！相信你一定猜得到，在这个应用里会有很多`多对多`的关系。所以应该做什么呢？是时候创建一个鸡尾酒管理应用啦。我们想要储存我们最爱的鸡尾酒酒单。

## 生成Rails应用

你应该已经安装了[yarn](https://yarnpkg.com)，你可以用以下指令来检验：

```bash
yarn -v
# 你应该在这儿看到你的yarn版本
```

如果没有的话，你应该回到[macOS](https://github.com/lewagon/setup/blob/master/macOS.md#yarn), [Linux](https://github.com/lewagon/setup/blob/master/UBUNTU.md#yarn) or [Windows](https://github.com/lewagon/setup/blob/master/WINDOWS.md#yarn)设置的相应章节。

**注释**：你应该现在可以在不看以下的章节的新建一个应用啦！不要忘记加上`-d postgresql`（我们会在明天讨论这个内容）。

```bash
cd ~/code/<user.github_nickname>
rails new rails-mister-cocktail -d postgresql --skip-action-mailbox -T
cd rails-mister-cocktail
```

接下来我们需要给这个rails应用建一个postgresql数据库。

```bash
rails db:create
```

让我们来设置好git，并在github上建好一个repo，把刚刚上面建好的应用框架上传上去。

```bash
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

导入老师的测试来`rake`我们的进度。

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-mister-cocktail-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

接下来可以用下方指令来测试我们的代码：

```bash
rails db:migrate RAILS_ENV=test  # 如果你加了一个migration
rspec spec/models                # 开启测试
```

在我们正式开始写码之前，不要忘记给你的Rails应用设置好前端，就像今天早上的课上，让我们加好Bootstrap和它的JavaScript依赖项。

```bash
yarn add bootstrap @popperjs/core
```

以及安装一些我们需要的gems：

```ruby
# Gemfile
gem "autoprefixer-rails", "10.2.5"
gem "font-awesome-sass", "~> 5.15"
gem "simple_form"
```

在`config/initializers/assets.rb`加上下面这行

```rb
Rails.application.config.assets.paths << Rails.root.join("node_modules")
```

并运行

```bash
bundle install
rails generate simple_form:install --bootstrap
```

然后下载一些Le Wagon样式：

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/stylesheets/archive/master.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

最后导入Bootstrap JS库：

```js
// app/javascript/packs/application.js
import "bootstrap";
```

不要忘记经常`commit`和`push`。

## 详细说明

### 1 - 模型Models

前往[db.lewagon.com](http://db.lewagon.com)并且和你的伙伴一起绘制模式Schema。我们需要的表有`cocktails`, `ingredients`和`doses`。思考一下各个表之间的关系还有谁会储存着*应用references*。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/db.png)

**重点**
不要使用`rake`，但是可以用：

```bash
rspec spec/models
```

来只在`spec/models`文件夹里运行测试。请保证测试结果都变绿色了再继续挑战接下来的应用部分。

#### 属性

- 一杯**鸡尾酒cocktail**有一个名字name（例如`"Mint Julep"`, `"Whiskey Sour"`, `"Mojito"`）
- 一个**成分ingredient**有一个名字name（例如`"lemon"`, `"ice"`, `"mint leaves"`）
- 一个**剂量dose**是在一杯鸡尾酒里每个成分需要的量（例如Mojito鸡尾酒需要**6cl**的柠檬汁）。所以每个剂量会引用一个鸡尾酒cocktail，一个成分ingredient并有一段描述description。

#### 验证

- 一杯鸡尾酒cocktail必须有个唯一的名字name。
- 一个成分ingredient必须又个唯一的名字name。
- 一个剂量dose必须有一个描述description，一个鸡尾酒cocktail，一个成分ingredient并且[鸡尾酒cocktail, 成分ingredient]的搭配是唯一的。

#### 关联

- 一杯鸡尾酒cocktail有许多剂量doses
- 一杯鸡尾酒cocktail通过剂量doses有许多成分ingredient
- 一个成分ingredient有许多剂量doses
- 一个剂量dose属于一个成分ingredient
- 一个剂量dose属于一杯鸡尾酒cocktail
- 你不能删除一个成分ingredient如果它已经被至少一杯cocktail使用
- 你可以删除一杯鸡尾酒，你可以删除相关联的剂量doses（但不能删除成分ingredients因为它们有可能正被其他的鸡尾酒cocktails使用着）

### 2 - 成分ingredient的Seed

**我们的应用不允许用户去创造成分ingredients**
我们将会生成一个静态的成分数据来给用户做选择。创建Seed，例如：

```ruby
# db/seeds.rb
Ingredient.create(name: "lemon")
Ingredient.create(name: "ice")
Ingredient.create(name: "mint leaves")
```

**选做**：可以使用[这个JSON列表](http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list) (需要使用`open-uri`和`json`ruby库)来使用一些真实的成分数据。

### 3 - 鸡尾酒cocktails的路由Routing，控制器Controller，试图Views

**重点**
不要使用`rake`来编写应用部分。是时候在你的终端里启动`rails s`并在浏览器里打开[http://localhost:3000/](http://localhost:3000/)。功能请一个一个地进行开发：

- 从**路由route**开始
- 然后开始开发**控制器controller**
- 接下来开发**视图view**并刷新浏览器页面

当你的新功能完成了（并且看起来不错），就可以开始下一步并重复上面的步骤！

当你认为你完成了**整个**挑战，使用`rake`来保证它满足了说明里的所有要求。

**功能**
再强调一次，你必须对每个功能有一个精准的想法，才可以编写你的路由。以下是功能的列表：

- 用户可以看见鸡尾酒（cocktail）列表

```
GET "cocktails"
```

- 用户可以查看一杯鸡尾酒的细节，包括每个成分所需要的剂量

```
GET "cocktails/42"
```

- 用户可以创建一个新的鸡尾酒

```
GET "cocktails/new"
POST "cocktails"
```

### 4 - 剂量doses的路由Routing，控制器Controller，试图Views

- 用户可以在一个已有的鸡尾酒上添加一个新的剂量dose（一对成分ingredient/说明description）
- 查看`simple_form` [文档](https://github.com/heartcombo/simple_form#associations)中有关`f.association`的部分，来轻松地给我们的成分列表创建一个选项下拉列表。

```
GET "cocktails/42/doses/new"
POST "cocktails/42/doses"
```

- 用户可以删除已有鸡尾酒的剂量。我们如何再创建一个删除链接？

```
DELETE "doses/25"
```

我们需要一个`IngredientsController`嘛？

### 5 - 开始设计我们的应用

现在我们可以做一个精美的前端！加CSS啦！你可以把它变成一个名人堂/小红书页面的样子嘛？可以查看[dribbble](https://dribbble.com/)或者[onepagelove](https://onepagelove.com/) 来获取更多灵感。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_1.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_2.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_3.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_4.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_1.png)

不要忘记将本地图片储存在`app/assets/images`文件夹里。或者更好一些，你可以询问用户，让他们在创建新鸡尾酒的时候填写一个`image_url`图片的链接。

### 6 - 鸡尾酒show页面上的新剂量表单（选做）

尝试在鸡尾酒页面放入一个“新剂量表单”，而不是分开的另个页面上。路由有什么改变？控制器呢？

### 7 - 在成分选择上应用Select2下拉列表

让我们尝试在我们的rails应用中加一个npm包！让我们回到幻灯片看看如何将`select2`加到我们的成分选择下拉列表里。

### 8 - 让我们为这些出色的鸡尾酒加一些评论！（选做）

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_2.png)

### 9 - 进阶

- 添加一个搜索鸡尾酒的功能并且在搜索栏里添加使用`typed.js`。
- 在我们鸡尾酒列表上，当我们滚动页面的时候，可以使用一些漂亮的[页面滚动动画](https://michalsnik.github.io/aos/)。
