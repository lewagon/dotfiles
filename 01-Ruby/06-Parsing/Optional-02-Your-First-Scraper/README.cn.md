## 背景与目标

## 例子

首先，打开你的终端，并安装[Nokogiri](http://www.nokogiri.org/)，当你要抓取网页内容时，这是一个非常有用的**gem**。

```bash
gem install nokogiri
```

然后，你可以运行下面的Ruby代码：

```ruby
require 'open-uri'
require 'nokogiri'

html_content = open('https://www.etsy.com/search?q=wallet').read
doc = Nokogiri::HTML.parse(html_content)

doc.search('.wt-grid .v2-listing-card__info .v2-listing-card__title').each_with_index do |element, index|
  puts "#{index + 1}. #{element.text.strip}"
end
```

如果你启动此代码，它将打印在[Etsy](https://www.etsy.com/search?q=wallet)上搜索钱包的第一页的结果。

它是如何工作的？

`search`方法采用[CSS 选择器（selector）](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors)并在页面中寻找所有与之匹配的HTML元素。这里我们使用一个**class**选择器`.card-meta-row`，因为该[HTML来源](https://support.mozilla.org/en-US/questions/873324)类似于：

```html
<div class="card-meta-row">
  Leather Wallet
</div>
```

## 详细说明

我们想要爬取某个城市在[craigslist](https://craigslist.org/) 上列出的**古玩（antiques）**。打开 `lib/scraper.rb`并完成`scrape_craiglist_antiques`方法。它应该返回一个网站上找到的古玩`数组（Array）`。

这个方法应该能够成功抓取伦敦和纽约。因此，`scrape_craiglist_antiques("london")`和`scrape_craiglist_antiques("newyork")`应该都能返回结果。所有城市的craiglist网址（url）都是一样的吗？
