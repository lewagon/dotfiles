## Background & Objectives

## Exemple

First, open your terminal and install [Nokogiri](http://www.nokogiri.org/),
a **gem** very useful when you want to scrape web page content.

```bash
gem install nokogiri
```

Then, you can run the following Ruby code:

```ruby
require "open-uri"
require "nokogiri"

doc = Nokogiri::HTML(open('https://www.etsy.com/search?q=wallet'))
doc.search('.card-title').each_with_index do |element, index|
  puts "#{index}. #{element.text.strip}"
end
```

If you launch this code, it will print all the wallets found of
the first page of results on [Etsy](https://www.etsy.com/search?q=wallet)

How did it work?

The `search` method takes a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) and look for all HTML
element in the page matching it. Here we used a **class** selector `.card-title`
because the [HTML source](https://support.mozilla.org/en-US/questions/873324)
was something like:

```html
<div class="card-meta-row">
  <div class="card-meta-row-item card-title selected-color">
    Engraved Picture Wallet Insert - Back Engraving Too - the WOW factor - Him or Her - Laser Engraved - Handwritten Wallet Insert GIFT
  </div>
</div>
```

## Specs

We would like to scrape **antiques** listed on [Craiglist](http://www.craiglist.com)
for a given city. Open the `lib/scraper.rb` and implement the `scrape_craiglist_antiques` method. It should **return** an `Array` of antiques found on the website.
