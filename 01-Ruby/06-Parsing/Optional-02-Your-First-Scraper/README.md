## Background & Objectives

## Example

First, open your terminal and install [Nokogiri](http://www.nokogiri.org/), a very useful **gem** when you want to scrape web page content.

```bash
gem install nokogiri
```

Then, you can run the following Ruby code:

```ruby
require 'open-uri'
require 'nokogiri'

html_content = URI.open('https://www.etsy.com/search?q=wallet').read
doc = Nokogiri::HTML.parse(html_content)

doc.search('.wt-grid .v2-listing-card__info .v2-listing-card__title').each_with_index do |element, index|
  puts "#{index + 1}. #{element.text.strip}"
end
```

If you launch this code, it will print all the wallets found of the first page of results on [Etsy](https://www.etsy.com/search?q=wallet)

How did it work?

The `search` method takes a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) and looks for all the HTML elements in the page that match it. Here we select the elements using 3 classes because the [HTML source](https://support.mozilla.org/en-US/questions/873324) is something like:

```html
<div class="wt-grid">
  <div class="v2-listing-card__info">
    <div class="v2-listing-card__title">
      Leather Wallet
    </div>
  </div>
</div>
```

## Specs

We would like to scrape **antiques** listed on [craigslist](https://craigslist.org/) for a given city. Open the `lib/scraper.rb` and implement the `scrape_craiglist_antiques` method. It should **return** an `Array` of antiques found on the website.

This method should scrape successfully for London and New York. Therefore `scrape_craiglist_antiques("london")` and `scrape_craiglist_antiques("newyork")` should all return results. Are the craiglist urls for all the cities the same?

### Going further

To get more information about Nokogiri, take a look at our [dedicated cheatsheet](https://kitt.lewagon.com/knowledge/cheatsheets/nokogiri).

