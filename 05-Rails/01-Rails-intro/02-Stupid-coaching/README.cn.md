## 设置

你应该已经安装好`rails`了。用以下指令来检查：

```bash
rails -v
# 你应该在这儿看到你的rails版本
```

如果没有的话，请回到[macOS](https://github.com/lewagon/setup/blob/master/macos.md#installing-some-gems), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#installing-some-gems) 或者 [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#installing-some-gems)的相关章节去设置。

## 背景和目标

还记得第一周的Ruby吗？我们开发的程序的用户界面只有终端。这些日子已经过去了，我们现在使用Rails！。这意味着：

- 程序的用户界面是**浏览器**
- 和Rails应用交互的唯一方式就是通过**HTTP 请求**

现在不需要运行`rake` 命令了。同时，不要在`fullstack-challenges`文件夹下创建你的Rails应用。

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching --skip-active-storage --skip-action-mailbox
cd rails-stupid-coaching
git add .
git commit -m "rails new"
gh repo create --public --source=.
```

```bash
git push origin master
```

我们使用`--skip-active-storage`来跳过安装[Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html)。 Active Storage 让上传文件到云存储更容易了，但是我们现在还不需要，因为它会给我们的应用添加不必要的路由。

**目标**: 我们要开发一个有2个页面的Rails应用：

1. 第一个页面是有一个输入框的表单页面，用户可以输入一个问题来问教练(Coach)
2. 提交表单之后，会重定向（redirect）到另一个页面，用户可以看到他/她的问题和教练的回答

就是这样！

## 详细说明

熟悉[Rails基础命令](http://guides.rubyonrails.org/command_line.html#command-line-basics)。对这个练习，你至少需要掌握以下内容：

- 创建一个新的Rails应用
- 在本地开启应用的网络服务器
- 通过命令行生成一个控制器(controller)
- 使用相关的`rails`命令来查看路由(routes)

### 运行rails服务器

每一个网络应用开发者都是运行一个本地服务器并且打开浏览器测试**实时开发的**功能来开始工作的。继续：

- 在终端运行一个本地服务器
- 在浏览器打开 [localhost:3000](http://localhost:3000)！你应该会看到Rails欢迎页面。

每次你写了一些代码之后，保存文件，刷新浏览器。你可能会看到很多错误信息，但是熟悉这些错误信息是非常重要的。这样你会理解Rails的执行流程和学会如何修复问题！

### 生成控制器

凡事有轻重缓急，我们先生成一个`QuestionsController`控制器，将会用于两个页面。还记得对应的`rails`命令吗？

### 显示表单：`/ask`

我们想给我们的用户在[localhost:3000/ask](http://localhost:3000/ask)显示一个有表单(`<form>`)的页面。在Rails，这是一个用户故事，所以除了HTML文件之外，我们还需要其它代码来实现这个用户故事。Rails里的每一个用户动作(user action)，我们都需要开发**(i) 一个路由(route), (ii) 一个动作(action), 和 (iii) 一个视图(view)**。 还记得MVC模式吗？

**路由(Route)**

写一个简单的路由来实现`GET /ask` 的HTTP请求到questions控制器的`ask`动作。提示：Rails里一个路由的代码是这样的模式：

```ruby
verb "url", to: "controller#action"
```

**控制器(Controller)**

设置**路由**之后，是时候开发**动作(action)**了。继续在你的`QuestionsController`控制器添加一个`ask`动作！我们需要在这里定义一个实例变量吗？开发视图的时候我们会弄明白的！

你还记得如何在终端显示你所有的路由吗？

<details><summary markdown='span'>查看答案
</summary>

```bash
rails routes
```

你会看到以下结果：

```
前缀(Prefix)  动词(Verb)  URI模式(URI Pattern)  控制器(Controller)#动作(Action)
ask          GET        /ask(.:format)       questions#ask
```
</details>

**视图(View)**

让我们来创建一个视图，这是显示form的最后一步！你还记得视图应该放在哪个文件夹，应该如何命名吗？
这是Rails的其中一个约定，[动作视图约定](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/rails/rails-intro/index.html?title=Rails+Basics#/6/6)。

在[localhost:3000/ask](http://localhost:3000/ask)刷新页面，如果你的文件命名正确的话，最终你会看到一个没有任何错误的页面。现在这个页面还是空的，让我们来添加表单(`<form>`)。还记得语法吗？

```html
<form action="???" data-turbo="false">
  <input type="text" name="???">
  <input type="submit" value="Ask!">
</form>
```

`<form>`标签的原生行为是生成一个被`method`和`action`属性所定义的HTTP请求。

- `method`属性决定了HTTP请求的**动词**(默认是`GET`)
- `action`属性决定了提交表单的时候触发的HTTP请求的**url**

在`<input>`标签，`name`属性让你可以设置对应参数的**键(key)**。

现在我们想让表单触发我们的**第二个用户故事**： 回答(`answer`)，应该被路由映射到`/answer`。替换上面代码里的`???`，并且尝试提交表单。

你应该会得到一个**路由错误(routing error)**，我们现在来开发回答(`answer`)！

### 显示教练的回答：`/answer`

是时候去实现`answer`动作里的逻辑了（用户旅程的第二步）。第二个用户故事，我们也按照和第一个用户故事`1. 显示表单`同样的方法来开发：

- 开发一个**路由**
- 开发一个**动作** (在控制器里)
- 开发**视图**

确保你经常在浏览器里刷新页面让Rails的执行流程来驱动你的开发！

`answer.html.erb`页面将会显示你的问题和教练的回答。控制器需要从参数`params`里读取问题并且保存到一个实例变量`@answer`里，用于视图显示。这里是你需要处理的两个HTTP请求：

- [localhost:3000/answer?question=hello](http://localhost:3000/answer?question=hello)
- [localhost:3000/answer?question=what time is it?](http://localhost:3000/answer?question=what time is it?)

如果你不记得教练的逻辑，在这里：

1. 如果问题是`I am going to work`，教练会回答`Great!`。
2. 如果问题以`?`结尾，教练会回答`Silly question, get dressed and go to work!`。
3. 其它任何问题，教练会回答`I don't care, get dressed and go to work!`

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/hello_there.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/can_i_go.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/ask.png)

### `/answer` 到 `/ask`的链接

- 使用Rails帮助方法`link_to`在`answer.html.erb`页面添加一个到`/ask`页面的链接。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/bottom_link.png)

### 开发设计好看的页面！

我们还没有开始讲解Rails项目的前端，但是你可以自己开始做一点儿！

**关于SCSS**

[.scss](https://sass-lang.com/guide)是一个文件扩展，让你写css代码更加容易！浏览器只支持css，所以Rails有内部魔法来**预处理**scss文件并且把它翻译成"普通"css。你需要掌握的`scss`的主要特性是：

1. 变量Variables

    ```scss
    // 定义一个变量
    $gray: #F4F4F4;

    body {
      background: $gray; // 使用这个变量
    }
    ```

2. 嵌套

    ```scss
    .banner {
      background: red;
      h1 {
        font-size: 50px;
      }
    }
    ```

3. 链接

    ```scss
    a {
      color: grey;
      &:hover {
        color: black;
      }
    }
    ```

在接下来的几天里，我们也会学习如何组织分散在多个文件里的样式表文件，并且使用`import`关键词来导入它们！

现在，只需要打开（或创建）`app/assets/stylesheets/questions.scss`文件。你可以直接编写一些scss代码，保存，刷新页面！你应该尝试让页面的设计至少和下面的截图相匹配。

### 测试（选做）

⚠️ 如果你现在对Rails内部还是觉得很不自在，请直接跳过这一节。在完成最长单词游戏练习之后你可以随时回到这里。

如果已经生成了`test/controllers/questions_controller_test.rb`文件的话，需要删除该文件。我们要做[**系统测试**](http://guides.rubyonrails.org/testing.html#system-testing)。这类测试的目标是自动化所有要手动操作的"写代码 / 打开浏览器 / 刷新页面 / 检查是否正确"测试。所有你在浏览器里手动操作的测试都可以通过代码来做！

我们要使用无头Chrome浏览器来做系统测试。它是一个没有用户界面的浏览器，非常适合做这类自动化测试。

在运行系统测试之前，要确保在你的电脑上有一个**最新**版本的Chrome（不是Chromium）。它同时支持OSX和Ubuntu系统。

然后你还需要安装`chromedriver`：

```bash
 # macOS
brew install --cask chromedriver

# Ubuntu
gem install chromedriver-helper
```

安装完成之后，打开以下文件并使用以下代码替换该文件里的**所有**内容：

```ruby
# test/test_helper.rb
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  fixtures :all
end

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new(args: %w[no-sandbox headless disable-gpu window-size=1400,900])
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end
Capybara.save_path = Rails.root.join('tmp/capybara')
Capybara.javascript_driver = :headless_chrome
```

在以下文件里**更新**这一行代码：

```ruby
# test/application_system_test_case.rb
require "test_helper"
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome # 更新这一行代码
end
```

准备好了？让我们开始Rails测试。
在终端，运行以下代码来创建测试文件：

```bash
rails g system_test questions
```

用代码编辑器打开生成的文件，写下你的第一个测试：

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  test "visiting /ask renders the form" do
    visit ask_url
    assert_selector "p", text: "Ask your coach anything"
  end
end
```

在终端运行测试：

```bash
rails db:migrate
rails test:system
```
如果你仔细查看测试场景的话，你可以看到：

1. 打开`/ask`页面
2. 确保页面被正确渲染了，而且我们可以看到`Ask your coach anything`

非常好！这是我们的第一个功能测试。接下来我们想测试什么？如果你想一下你手动做了什么，其实就是输入一些文字（不同的场景）并且点击按钮提交。让我们用测试来做这些！

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  # [...]

  test "saying Hello yields a grumpy response from the coach" do
    visit ask_url
    fill_in "question", with: "Hello"
    click_on "Ask"

    assert_text "I don't care, get dressed and go to work!"
  end
end
```

对这些语法感到好奇？这是**capybara** gem！在需要自动点击链接，按钮，或者填写表单的测试场景下非常有用。看一下它的[DSL](https://github.com/teamcapybara/capybara#the-dsl) （领域特定语言Domain Specific Language）。

该你了✌️！尝试在你的系统测试里实现其它测试场景。

**屏幕快照(Screenshots)**

在测试里和`binding.pry`等同的是截取屏幕快照。我们在`Gemfile`的`:test`组里添加`launchy` gem：

```ruby
# Gemfile
group :test do
  # [...]
  gem 'launchy'
end
```

运行`bundle install`。你只需要在你的代码里写一行：

```bash
take_screenshot
```
这行代码运行之后，将会在无头Chrome浏览器里自动截屏。截屏文件会被保存在`tmp/screenshots`文件夹。
