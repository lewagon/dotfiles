## 背景和目标

现在是时候打造一个三模型的应用程序啦！相信你一定猜得到，在这个应用里会有很多多对多的关系。所以应该做什么呢？是时候创建一个鸡尾酒管理应用啦。我们想要储存我们最爱的鸡尾酒酒单。

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

让我们来导入下方的详细来让我们可以`rake`我们的进度。

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

在我们正式开始写码之前，不要忘记给你的Rails应用设置好前端，就像今天早上的课上，让我们加好Bootstrap和它的JavaScript依赖。

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

在`config/asset.rb`加上下面这行

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




### 2 - 成分ingredient的Seed

### 3 - 鸡尾酒cocktails的路由Routing，控制器Controller，试图Views

### 4 - 剂量doses的路由Routing，控制器Controller，试图Views

### 5 - 开始设计我们的应用

### 6 - 鸡尾酒show页面上的新剂量表单（选做）

### 7 - 在成分选择上应用Select2下拉列表

### 8 - 让我们为这些出色的鸡尾酒加一些评论！（选做）

### 9 - 进阶

