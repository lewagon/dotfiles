## 指引

冬天来了 ⛄⛄⛄。我们想要构建一个程序，用来处理我们的礼物清单，标记已经买好的东西，并最终找从外部网站到一些灵感，例如Esty。这个挑战应该会花去你一整天的时间。🎁

像昨天那样，首先以现场编码 💻的方式在小组中写下伪代码。

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

##步骤4 - 在Esty上找到灵感 🎁🎁🎁🎁

你想不出要为圣诞节买什么，想从[Etsy](https://www.etsy.com)上面获取灵感。
在你的菜单上增加一个`idea`行动（除了“列表”，“添加”，“删除”和“标记”行动之外）。以下是该行动的工作方式：


```bash
What are you looking for on Etsy?
> Jeans
Here are Etsy results for "Jeans":
1 - Levis Blue Jeans
2 - Vintage Jeans
3 - Cargo Jeans Pants
4 - White Jeans
etc.
Pick one to add to your list (give the number)
> 2
"Vintage Jeans" added to your wishlist
```

对于爬虫，这里是一个入门脚本，帮助你提取数据：
_免责声明：为了避免Etsy封禁IP，我们不会实时爬取Etsy的实时数据，但是我们将下载一个html页面并在本地进行爬取_


```bash
# 在你工作目录里下载爬取的页面
curl -H "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0"  https://www.etsy.com/search?q=THE_ARTICLE_YOUR_ARE_LOOKING_FOR > results.html
# 得到HTML文件的路径
pwd
```
```ruby
# lib/scraper.rb
require 'nokogiri'

filepath = "/path/to/the/HTML/file.html"
# 1. 我们拿到了HTML页面内容
html_content = File.open(filepath)
# 2. 我们从这个文件构建了一个 Nokogiri 文档
doc = Nokogiri::HTML.parse(html_content)

# 3. 我们在HTML文档中搜索包含这个项目标题的正确的元素
doc.search('.v2-listing-card__info .v2-listing-card__title').each do |element|
  # 4. 对于每个找到的元素，我们提取它的标题并打印出来
  puts element.text.strip
end
```
一旦你的爬虫在你的本地文件`results.html`上正常工作，你就可以让它连接到Esty关于任何关键词的结果页，并爬取在线页面：

```ruby
require 'open-uri'
require 'nokogiri'

puts "What are you searching on Etsy?"
article = gets.chomp

# 1. 多亏了open-uri，我们得到了HTNML页面内容
html_content = URI.open("https://www.etsy.com/search?q=#{article}", "User-Agent" => "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0").read
# 2. 我们从这个文件构建了一个 Nokogiri 文档
doc = Nokogiri::HTML.parse(html_content)

# 3. 我们在HTML文档中搜索包含这个项目标题的正确的元素
doc.search('.v2-listing-card__info .v2-listing-card__title').each do |element|
  # 4. 对于每个找到的元素，我们提取它的标题并打印出来
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
