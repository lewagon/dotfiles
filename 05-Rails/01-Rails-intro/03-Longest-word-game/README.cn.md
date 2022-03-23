## 背景和目标

是时候开发一个非常酷的有网页界面的"最长单词游戏"了！可能对你们中间的一些人来说是熟悉的。

在正式开始之前，[阅读这些规则](https://github.com/lewagon/fullstack-challenges/tree/master/01-Ruby/06-Parsing/02-Numbers-and-Letters)。

⛔️ 在练习中，不要复制/粘贴代码，试着从头开始重新开发。

## 设置

现在没有`rake`了，所以不要在`fullstack-challenges`里面创建你的Rails应用。你应该在下面的目录里创建你的应用（Kitt将不能再显示你的分数了，伤心伤心💔）：

```bash
cd ~/code/<user.github_nickname>
rails new rails-longest-word-game --skip-active-storage --skip-action-mailbox
cd rails-longest-word-game
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## 详细说明

我们来思考一下游戏的用户界面(UI)。我们需要什么？

1. 一个页面用来显示游戏设置（随机字母），有一个表单，用户可以输入一个单词。一个按钮来提交表单。
2. 一个页面接受这个表单，计算用户得分并显示出来。

### 1 - 路由和控制器

使用正确的命令行命令来生成有`new`和`score`两个动作的`GamesController`控制器。`new`动作用于显示一个新的随机网格和一个表单。表单会被提交（使用`POST`）到`score`动作。

打开`routes.rb`文件，调整上一个命令自动生成的路由。最后，运行`rails routes`命令，应该返回类似下面这样的路由：

```bash
Prefix   Verb URI Pattern       Controller#Action
new      GET  /new(.:format)    games#new
score    POST /score(.:format)  games#score
```

### 2 - 生成一个新游戏

看看你的老代码。你如何生成一个有10个随机字母的数组`Array`？在`GamesController`控制器的`new`动作里，创建一个新的`@letters`实例变量用于保存这些随机字母。然后在视图里显示这些字母。就像这样：

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/new_game.png)

### 3 - 提交一个单词

在这些字母下面，我们需要添加一个表单让用户来填一个单词并提交。
在你的视图里添加一个表单`<form>` 。表单应该发送`POST`请求到`GamesController`控制器的`/score`动作。

你需要在`form`里添加下面这行代码：

```erb
<%= hidden_field_tag :authenticity_token, form_authenticity_token %>
```
这行代码会添加一个带有`authenticity_token`的隐藏的输入框，这保证了`POST`请求是来自于你的网站，而不是其它网站。阅读这个[stack overflow帖子](https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token)，如果你想知道更多关于[CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (需要VPN 🛡 )(跨站请求伪造cross-site request forgery)和为什么Rails会默认添加这一个安全层！


![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/new_game_with_form.png)

### 4 - 表单的另外一面

让我们来检查一下在`params`参数里得到了什么，来看看表单是不是设置正确了。
有两种方法，第一个是在控制器代码里添加`raise`：

```ruby
# app/controllers/games_controller.rb

# [...]
  def score
    raise
  end
```

到`/new`页面，填入一个单词并提交表单。你会在rails控制台底部得到一个**运行时错误(RuntimeError)**。你可以输入`params`来检查刚才提交表单发送了什么信息：

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/raise.png)

另外一个更加方便的方法是添加`pry-byebug`gem(你可以在`rails new`的时候不使用默认的`byebug`)，然后在控制器代码里添加`binding.pry`。这样你可以在终端里暂停Rails请求，检查，并输入`next`来执行下一行代码，或者输入`continue`来完成视图渲染。

```ruby
# Gemfile

# [...]
group :development, :test do
  # gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug'
end
```

你需要运行`bundle install`和`rails s`重启rails来让这些修改生效。

### 5 - 计算得分

是时候实现`GamesController#score`逻辑了。我们手边有所有的信息吗？我们还需要什么？我们需要通过`POST`传入更多信息吗？请阅读[`hidden_field_tag`](http://api.rubyonrails.org/v5.1/classes/ActionView/Helpers/FormTagHelper.html#method-i-hidden_field_tag)。

我们需要处理3种场景：

1. 从原始的网格不能生成一个正确的单词
2. 从网格来说，是一个正确的单词，但不是一个正确的英语单词
3. 从网格来说，是一个正确的单词，而且也是一个正确的英语单词

(你可以使用这个[API](https://wagon-dictionary.herokuapp.com/) 来检查一个单词是不是正确的。)

在结果的底部，添加一个`link_to`链接来返回新游戏页面。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/cant_be_built.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/not_english_word.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/congrats.png)

### 6 - 添加分数（选做）

用户可能会玩很多次游戏，保存每一次游戏的得分，并且汇总到一个总得分里面是很合理的。我们可以有一个规则，每一局游戏的得分是每一个正确的单词的字母的数量（你也可以更有创意，字母数量的平方？使用其它算法？）。

今天的重点不在数据库，所以我们不需要使用Active Record来帮助我们在两个HTTP请求之间保存、读取信息。在Rails里，存在另一个**跨** HTTP请求持久化保存信息的机制：[会话session](http://guides.rubyonrails.org/action_controller_overview.html#session)。

尝试使用一个Rails会话来保存，计算，并显示总得分。

### 7 - 测试（选做）

如果已经生成了`test/controllers/games_controller_test.rb`文件的话，需要删除该文件。我们要做[**系统测试**](http://guides.rubyonrails.org/testing.html#system-testing)。这类测试的目标是自动化所有要手动操作的"写代码 / 打开浏览器 / 刷新页面 / 检查是否正确"测试。所有你在浏览器里手动操作的测试都可以通过代码来做！


首先，要确保在你的电脑上有一个**最新**版本的Chrome（不是Chromium）。它同时支持OSX和Ubuntu系统。然后你还需要安装`chromedriver`（如果你已经在上一个练习里安装好了，直接跳过这一步）：

```bash
 # macOS
brew install --cask chromedriver

# Ubuntu
gem install chromedriver-helper
```

我们要使用无头Chrome浏览器来做系统测试。它是一个没有用户界面的浏览器，非常适合做这类自动化测试。打开以下文件并使用以下代码替换该文件里的**所有**内容：

```ruby
# test/application_system_test_case.rb
require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  Capybara.register_driver(:headless_chrome) do |app|
    capabilities = Selenium::WebDriver::Remote::Capabilities.chrome \
      chromeOptions: { args: %w[headless disable-gpu window-size=1280x760] }
    Capybara::Selenium::Driver.new app,
      browser: :chrome, desired_capabilities: capabilities
  end
  driven_by :headless_chrome
end
```
准备好了？让我们开始Rails测试。

在终端，运行以下代码来创建测试文件：

```bash
rails g system_test game
rails test:system # 应该返回0个测试用例，并且没有失败
```

非常好! 我们有一个全新的`test/system/games_test.rb`测试文件。我们需要测试什么？

1. 到`/new` 新游戏页面，并显示一个随机网格。
2. 你可以在表单里随机填一个单词，点击按钮，并得到一个信息说这个单词不在网格里。
3. 你可以在表单里填只有一个辅音字母的单词，点击按钮，并得到一个信息说这个单词不是一个正确的英语单词。
4. 你可以在表单里填一个**正确的**英语单词(难点在于要有随机性！)，点击按钮，并得到一个 "恭喜成功"的信息。

我们一起来做第一个：

```ruby
# test/system/games_test.rb
require "application_system_test_case"

class GamesTest < ApplicationSystemTestCase
  test "Going to /new gives us a new random grid to play with" do
    visit new_url
    assert test: "New game"
    assert_selector "li", count: 10
  end
end
```
在这个测试里，我要访问`/new`链接，并且确保我得到了游戏的10个字母。
该你了！尝试使用Capybara`fill_in`和`click_on`方法来实现其它3个测试。
