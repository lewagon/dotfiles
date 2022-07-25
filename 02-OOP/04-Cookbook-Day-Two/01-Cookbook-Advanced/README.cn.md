⚠️ 这个练习 **没有 `rake`** 。 抱歉啦😉

所以现在我们想通过在网上找到食谱来增强我们的cookbook。我们将使用
[🇫🇷 Marmiton](http://www.marmiton.org) 或 [🇬🇧 allrecipes](https://www.allrecipes.com)，因为它们的标记结构非常干净（这使它们成为好的爬虫候选者）。如果你想选择其他食谱网站，请继续！它只需要有一个 **搜索** 功能，搜索关键字中传递在[query string](https://en.wikipedia.org/wiki/Query_string) (需要VPN 🛡 ).

## 设置

First, let's copy paste your Cookbook's code in today's challenge `lib` folder:
首先，将 Cookbook 的代码复制粘贴到今天的挑战的` lib` 文件夹中：

```bash
# 确保你在正确的目录中
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/04-Cookbook-Day-Two/01-Cookbook-Advanced

# 从第一天的Cookbook Day 复制你的代码
cp -r ../../03-Cookbook-Day-One/02-Cookbook/lib .
```

你也可以把livecode中的答案作为今天的出发点（让你的老师在Slack上分享）。

在开始之前，运行粘贴好的Cookbook，确保当天的用户操作（list/create/destroy）正常运行！

```bash
ruby lib/app.rb
```

## 从web导入食谱

你可以从任何你知道的菜谱网站上爬虫，但好的网站是[allrecipes](https://www.allrecipes.com)或法语的[Marmiton](http://www.marmiton.org/)。以下是此功能的工作原理：

```bash
-- My CookBook --
What do you want to do?

1. List all recipes
2. Add a recipe
3. Delete a recipe
4. Import recipes from the Internet
5. Exit

> 4
What ingredient would you like a recipe for?
> strawberry

Looking for "strawberry" recipes on the Internet...

1. Strawberry shortcake
2. Strawberry slushie
3. Strawberry martini
[...] display only the first 5 results

Which recipe would you like to import? (enter index)
> 2
Importing "Strawberry slushie"...
```

### 伪码

对于这个新的 **用户操作**（因此是新的路由 _route_），我们需要：

1. 向用户请求要搜索的关键字
2. 使用我们的关键字向菜谱网站发出HTTP请求
3. 解析HTML文档以提取建议的前5个菜谱，并将它们存储在一个数组中
4. 在索引列表中显示它们
5. 询问用户要导入哪个菜谱（询问索引）
6. 把它加到 `Cookbook` 上

### 分析页面标记

首先，让我们看看如何从Web检索信息。

你可以使用 `curl` 命令在计算机上下载 HTML 文档。通过在终端中运行以下两个命令之一，将以下HTML页保存为工作目录中的 `.html` 文件：

```bash
curl --silent "https://www.allrecipes.com/search/results/?search=strawberry" > strawberry.html
```

👆 **这一步非常重要**!

我们之所以将页面保留在硬盘上，是因为我们需要在上面运行数百次Ruby脚本来测试代码。打开磁盘上的文件要快得多，而不是每次都通过网络调用Marmiton/allrecipes（这可能也会导致我们被列入黑名单）。

### Nokogiri解析

Nokogiri是一个很酷和著名用于解析HTML文档的gem，（它也可以做其他事情！）下面是当你知道感兴趣的元素的CSS选择符后，如何使用它来解析文档。CSS选择符将在后面解释，但是它的要点是，你可以通过创建查询 `.class`来选择具有给定 `class`属性的所有元素。

例如，如果你想在下面的HTML中查找所有带有 `student` 类的元素，你将使用 `".student"` 去查询

```html
<ul>
  <li class="student">John</li>
  <li>Paul</li>
  <li class="student">Ringo</li>
</ul>
```

你可以使用以下样板代码开始：

```ruby
require 'nokogiri'
file = 'fraise.html'  # 或 'strawberry.html'
doc = Nokogiri::HTML(File.open(file), nil, 'utf-8')

# 由你来查找相关的CSS选择符。
```

需要可以在一个临时文件（例如，`parsing.rb`中工作）中找到正确的选择符和ruby代码，以获取要从HTML中需要提取的所有数据。你可以从用 `puts` 显示提取的信息开始。一旦你找到了所有你需要的选择符，继续在你的 cookbook 中编码操作。

今天你将使用Nokogiri `.search（）` 方法，它将CSS选择符作为参数。如果你不记得语法，请看一下的这一节课[解析课](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data#/3/6).

**资源**：想深入Nokogiri吗？这是一个[好的Nokogiri爬虫指南](https://www.sitepoint.com/nokogiri-fundamentals-extract-html-web/).

### 使用 `open uri` 获取响应HTML数据

是时候用你的爬虫代码，在实时URL上使用解析代码了。（不仅仅是 `[fraise|strawberry]` ）。 使用[open uri](http://www.ruby-doc.org/stdlib/libdoc/open-uri/rdoc/OpenURI.html)从给定URI获取HTML响应的库：

```ruby
require 'nokogiri'
require 'open-uri'
url = "http://the_url_here"
doc = Nokogiri::HTML(open(url).read, nil, 'utf-8')

# 代码的其余部分
```

### `控制器` / `视图` / `路由器`

一旦有了这个解析逻辑，就可以在 `Controller` 中添加这个新的用户操作了。 使用上面的伪代码作为这个新方法的指南。对于第一次尝试，可以将工作解析代码直接复制粘贴到控制器中。
想想 **类** 应该用来保存从web解析的信息，它是什么？

试试运行你的coobook！

## 加一个 `@rating` 属性到 `Recipe`

此新属性应为：

- 创建新菜谱时询问用户
- 导入新菜谱时从web解析
- 存储到CSV中
- 列出菜谱时打印

## （用户操作）将菜谱标记为已完成

完成“搜索”后，尝试添加一个功能，将菜谱标记为已完成：

```bash
-- Here are all your recipes --

1. [X] Crumpets (3 / 5)
2. [ ] Beans & Bacon breakfast (4 / 5)
3. [X] Plum pudding (3 / 5)
4. [X] Apple pie (4 / 5)
5. [ ] Christmas crumble (5 / 5)
```

## 加一个 `@prep_time` 属性到 `Recipe`

同样，这个新属性应该是：

- 创建新菜谱时询问用户
- 导入新菜谱时从web解析
- 存储到CSV中
- 列出菜谱时打印

## （选做部分）服务

尝试从控制器中提取 **解析** 逻辑并将其放入[**服务对象**](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial):

```ruby
class ScrapeAllrecipesService # or ScrapeMarmitonService
  def initialize(keyword)
    @keyword = keyword
  end

  def call
    # 要做的事: 返回一列爬虫创建的 `菜谱` 列表
  end
end
```
