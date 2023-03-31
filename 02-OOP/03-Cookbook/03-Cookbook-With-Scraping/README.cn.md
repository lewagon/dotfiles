⚠️ 这个练习 **没有 `rake`** 。 抱歉啦😉

现在我们想通过在网上寻找食谱来增强我们的应用。我们将使用[allrecipes](https://www.allrecipes.com)，因为它们的标记结构相当干整洁（使它们成为很好的爬虫的练习对象）。如果你想选择另一个菜谱网站，也可以！它只需要有一个**搜索**的功能，并且关键词可以在[查询字符串](https://en.wikipedia.org/wiki/Query_string)中传递。

## 设置

首先，将 Cookbook 的代码复制粘贴到今天的挑战的` lib` 文件夹中：

```bash
# 确保你在正确的目录中
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/03-Cookbook/03-Cookbook-With-Scraping

# 将你的代码从Cookbook的第一个练习中复制过来
cp -r ../02-Cookbook/lib .
```

在开始之前，运行粘贴好的Cookbook，确保当天的用户操作（list / add / remove）正常运行！

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

### 伪代码

对于这个新的 **用户操作**（也需要新的路由 _route_），我们需要：

1. 向用户请求要搜索的关键字
2. 使用我们的关键字向菜谱网站发出HTTP请求
3. 解析HTML文档以提取建议的前5个菜谱，并将它们存储在一个数组中
4. 在索引列表中显示它们
5. 询问用户要导入哪个菜谱（询问索引）
6. 把它加到 `Cookbook` 上

### 分析页面标记

首先，让我们看看如何从Web检索信息。

你可以使用 `curl` 命令在计算机上下载 HTML 文档。通过在终端中运行以下两个命令之一，将以下HTML页保存为本地工作目录中的 `.html` 文件：

```bash
curl --silent "https://www.allrecipes.com/search?q=strawberry" > strawberry.html
```

👆 **这一步非常重要**!

我们之所以将页面保留在硬盘上，是因为我们需要在上面运行数百次Ruby脚本来测试代码。打开磁盘上的文件要快得多，而不是每次都通过网络调用Marmiton/allrecipes（这可能也会导致我们被列入黑名单）。

### 用Nokogiri解析

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
doc = Nokogiri::HTML.parse(File.open(file), nil, 'utf-8')

# 由你来查找相关的CSS选择符。
```

你可以在一个临时文件中工作 -- 例如`parsing.rb` -- 找到正确的选择器和Ruby代码来获得你想从HTML中提取的数据。最开始，你可以用`puts`来展示提取的信息。一旦你找到了所有你需要的选择器，那就在cookbook中写下代码吧。

今天你将使用Nokogiri的`.search()`方法，它需要一个CSS选择器作为参数。

如果你不记得语法，可以看一下这个[专门的知识点清单](https://kitt.lewagon.com/knowledge/cheatsheets/nokogiri)。

### 使用 `open uri` 获取响应HTML数据

现在我们来试试在URL中传一个不同的查询字符串（不仅仅是`strawberry`）。使用[open-uri](https://ruby-doc.org/core/stdlibs/open-uri/OpenURI.html)库来从一个URI中获得HTML响应：

```ruby
require 'nokogiri'
require 'open-uri'
url = "http://the_url_here"
doc = Nokogiri::HTML.parse(open(url).read, nil, 'utf-8')

# 代码的其余部分
```

### `控制器` / `视图` / `路由器`

一旦有了这个解析逻辑，就可以在 `Controller` 中添加这个新的用户操作了。 使用上面的伪代码作为这个新方法的指南。对于第一次尝试，可以将工作解析代码直接复制粘贴到控制器中。

想想 **类** 应该用来保存从web解析的信息，它是什么？

试试运行你的coobook！

## 加 `@rating` 属性到 `Recipe`

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

## 加`@prep_time` 属性到 `Recipe`

同样，这个新属性应该是：
- 创建新菜谱时询问用户
- 导入新菜谱时从web解析
- 存储到CSV中
- 列出菜谱时打印

## （选做部分）服务（Service）

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
