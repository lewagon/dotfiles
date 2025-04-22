## 指引

冬天来了 ⛄⛄⛄。我们想要构建一个程序，用来处理我们的礼物清单，标记已经买好的东西，并最终找从外部网站到一些灵感，例如Etsy。这个挑战应该会花去你一整天的时间。🎁

像昨天那样，首先以现场编码 💻的方式在小组中写下伪代码。

_注意：用户可以添加他们想要的**任何**礼物。无需列出可能的礼物清单或任何类似内容。_

## 伪代码

首先，让我们一起头脑风暴**伪代码**：

```ruby
# interface.rb

# 伪代码（Pseudo-code）:
# 1. 欢迎
# 2. 显示菜单 (列表list / 添加add / 删除delete / 标记mark )
# 3. 得到用户的行为Get user action
# 4. 采取正确的行动
```

## 步骤1 - 菜单循环 🎁

以构建一个主要循环开始，展示行动并获取用户的输入：

```bash
ruby interface.rb

> Welcome to your Christmas gift list
> Which action [list|add|delete|quit]?
> list
> TODO: list items
> Which action [list|add|delete|quit]?
> add
> TODO: ask user an item and add it to gift list
> Which action [list|add|delete|quit]?
> delete
> TODO: ask user the index of item to delete and delete it
> Which action [list|add|delete|quit]?
> quit
> Goodbye
```

## 步骤2 - 列出（List），添加（Add），删除（Delete） 🎁🎁

现在，让我们完成简单的行动（`list`, `add`, `delete`）。

- 如何为你的`gift_list`建模？
- 你会使用哈希（hash）？还是数组（array）？

** 在你开始每一个行动之前，先和你的老师讨论一下**

## 步骤3 - 标记为已购买 🎁🎁🎁

我们想要能够标记任何项目为已购买：


```bash
ruby interface.rb

> Welcome to your Christmas gift list
> Which action [list|add|delete|mark|quit]?
> list
> 1 - [ ] sockets
> 2 - [X] ruby book
> 3 - [ ] macbook pro
> Which action [list|add|delete|mark|quit]?
> mark
> Which item have you bought (give the index)?
> 3
> Which action [list|add|delete|mark|quit]?
> list
> 1 - [ ] sockets
> 2 - [X] ruby book
> 3 - [X] macbook pro
```

- 你如何修改你的`gift_list`以存储每一项目的`status`？
- 它将如何影响你的代码？

同样，**和你的老师进行讨论**

##步骤4 - 在Etsy上找到灵感 🎁🎁🎁🎁

你对圣诞节的想法已经用尽，想从互联网上找到灵感。
今天，我们将使用 ["Letsy"](https://letsy.lewagon.com/) 这个虚假的 Etsy 版本来找一些礼物的想法。
不幸的是，我们无法直接爬取 [Etsy](https://www.etsy.com)，因为他们有强大的反爬虫系统。但是你可以在解决方案视频中看到如何做到这一点的示例。

在你的菜单中添加一个新的动作 `想法`（除了 `列表`、`添加`、`删除` 和 `标记` 动作）。以下是这个动作的工作方式：

```bash
What are you looking for?
> Jeans
Here are results for "Jeans":
1 - Levis Blue Jeans
2 - Vintage Jeans
3 - Cargo Jeans Pants
4 - White Jeans
etc.
Pick one to add to your list (give the number)
> 2
"Vintage Jeans" added to your wishlist
```

对于爬虫，这是一个起始脚本，可以帮助你提取数据：

```ruby
# lib/scraper.rb
require 'open-uri'
require 'nokogiri'

url = "THE_URL_FROM_THE_INTERNET_YOU_WANT_TO_SCRAPE"
# 1. We get the HTML page content
html_content = URI.parse(url).read
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML.parse(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.CSS_CLASS_YOU_FIND_ON_THE_PAGE').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

- 你可以更改这个脚本，让它爬取另一个网站
- 另外，你不仅可以抓取名称，还可以抓取其他信息（例如商品的价格）。

## [选做题]将礼物保存为CSV文件🎁🎁🎁🎁🎁
我们想要在每次启动程序时，提取礼物清单。
创建一个文件`gifts.csv`，将你的数据永久地保存在本地。

解析CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.foreach(filepath, col_sep: ',', quote_char: '"', headers: :first_row ) do |row|
  # TODO: 以每一行存储的信息，构建新的礼物
end
```

存储CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.open(filepath, 'wb', col_sep: ',', force_quotes: true, quote_char: '"') do |csv|
  # CSV有标题
  csv << ['name', 'price', 'bought']
  #TODO: 存储每个礼物
end
```

- 找到加载礼物的最佳时机。
- 什么时候你需要保存礼物？

## 记忆卡片（Flashcards）

 你可以重新做组记忆卡片，来帮助你巩固今天的知识：**Hash & Symbols**。
