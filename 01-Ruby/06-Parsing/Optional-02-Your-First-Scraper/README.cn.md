## 背景和目标

## 示例

首先，打开你的终端并安装[Nokogiri](http://www.nokogiri.org/)，这是一个非常有用的**gem**，当你想要爬取网页内容时会派上用场。

```bash
gem install nokogiri
```

然后，你可以运行以下的Ruby代码：

```ruby
require 'open-uri'
require 'nokogiri'

html_content = URI.parse('https://www.etsy.com/search?q=wallet').read
doc = Nokogiri::HTML.parse(html_content)

doc.search('.wt-grid .v2-listing-card__info .v2-listing-card__title').each_with_index do |element, index|
  puts "#{index + 1}. #{element.text.strip}"
end
```

如果你运行这段代码，它将打印出在[Etsy](https://www.etsy.com/search?q=wallet)第一页结果中找到的所有钱包。

它是如何工作的？

`search`方法采用一个[CSS选择器](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Selectors)，并查找页面中与之匹配的所有HTML元素。在这里，我们使用3个类来选择元素，因为[HTML源代码](https://support.mozilla.org/zh-CN/questions/873324)类似于：

```html
<div class="wt-grid">
  <div class="v2-listing-card__info">
    <div class="v2-listing-card__title">
      皮夹
    </div>
  </div>
</div>
```

## 规格

我们想要爬取[recipes.lewagon.com](https://recipes.lewagon.com/)上列出的**食谱**，用于给定的搜索词。打开`lib/scraper.rb`，并实现`scrape_recipes`方法。它应该**返回**在网站上找到的食谱数组。

这个方法应该能够成功地爬取搜索结果。因此，`scrape_recipes("巧克力")`和`scrape_recipes("花生")`都应该返回结果。所有城市的recipe网址都相同吗？

### 进一步探讨

想要了解更多关于Nokogiri的信息，可以查看我们的[专用备忘单](https://kitt.lewagon.com/knowledge/cheatsheets/nokogiri)。
