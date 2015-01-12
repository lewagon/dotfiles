## Background & Objectives

## Exemple

First, open your terminal and installed [Nokogiri](http://www.nokogiri.org/),
a **gem** very useful when you want to scrape web page content.

```bash
$ gem install nokogiri
```

Then, you can run the following Ruby code:

```ruby
require "open-uri"
require "nokogiri"

doc = Nokogiri::HTML(open('https://www.etsy.com/search?q=wallet'))
doc.search('.title').each do |element|
  puts element.text
end
```

If you launch this code, it will print all the wallets found of
the first page of results on [Etsy](https://www.etsy.com/search?q=wallet)

How did it work?

The `search` method takes a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) and look for all HTML
element in the page matching it. Here we used a **class** selector `.title`
because the [HTML source](https://support.mozilla.org/en-US/questions/873324)
was something like:

```html
<div class="listing-detail">
  <div class="listing-title">
    <a class="title" href="[...]">
      Handmade BLACK Leather iPhone 6 PLUS Wallet Clutch Case - Rustic Design Signature Hand-Stitching by JooJoobs [065]
    </a>
  </div>
  <div class="listing-info clearfix">
    <div class="listing-maker">
      <a href="[...]">
        JooJoobs
      </a>
    </div>
    <!-- [...] -->
  </div>
</div>
```

## Specs

We would like to scrape **antiques** listed on [Craiglist](http://www.craiglist.com)
for a given city. Open the `lib/scraper.rb` and implement the `scrape_craiglist_antiques` method. It should **return** an `Array` of antiques found on the website.

