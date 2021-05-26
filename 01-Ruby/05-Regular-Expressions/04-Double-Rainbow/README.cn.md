## 背景与目标

在你的Le Wagon旅程中，你将发现很多工具，服务以及语言。这里是其中最主要的那些的logo，但他们在此刻都是黑白的。这个挑战是一个游戏，使用正则表达式来揭秘他们的颜色！

![Logos](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/double-rainbow_logos.png)

## 详细说明

这些logo的真实颜色是什么？它们被藏在了一个**秘密消息**里。你的任务是开发正确的regex来获取它们！

### 秘密信息

*Reveal the logos' colors:
Elegant shapes, some have evolved to a very iconized style.
Definitely a vivid color scheme with bright orange and shiny yellow,
many shades of blue, oscillating between purple and indigo! but not much green*


### 编写regexes
打开 `lib/double_rainbow.rb`文件，里面已经有一系列的方法了。每个都是用来从秘密信息中提取文本的：
- 跟随提示以及指令来编写你的regex。
- 每个方法都**以一个字符串**作为参数，并**返回一个字符串**。

当你的regex正确了，它将选择一个颜色并解锁一个徽章。

从[Rubular](http://rubular.com/)获得帮助。

### 测试你的代码
你可以把秘密信息传进方法里来测试你的代码，并运行`ruby lib/test.rb`:

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
require_relative "double_rainbow"

secret_message = "Reveal the logos' colors:\
 Elegant shapes, some have evolved to a very iconized style.\
 Definitely a vivid color scheme with bright orange and shiny yellow,\
 many shades of blue, oscillating between purple and indigo! but not much green"

puts last_five_letters(secret_message)
```

**注意：** 确保你复制-粘贴整个字符串，包括反斜杠`\`：它们[跳过](https://blog.appsignal.com/2016/12/21/ruby-magic-escaping-in-ruby.html) 换行符，并确保`secret_message`是一个单行字符串。让你的正则表达式匹配多行字符串将比预期的更复杂，正如这篇文章[StackOverflow answer](https://stackoverflow.com/questions/4257071/ruby-regex-matches-start-of-line-even-without-m-modifier/4257912#4257912)中所解释的！



