## Guidelines

Winter is coming ⛄⛄⛄. We want to build a program to handle our gift list, mark items as bought and eventually find some inspiration from an external website like Etsy. This challenge should take you all day. 🎁

Like yesterday, start off by writing the pseudo-code in the group as a live-code 💻.

## Pseudo-code

First things first, let's brainstorm the **pseudo-code** together:

```ruby
# interface.rb

# Pseudo-code:
# 1. Welcome
# 2. Display menu (list / add / delete / mark )
# 3. Get user action
# 4. Perform the right action
```

## Step 1 - The menu loop 🎁

Start by building the main loop displaying the actions and getting user's input:

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

## Step 2 - List, Add, Delete 🎁🎁

Now let's implement the simple actions (`list`, `add`, `delete`).

- How do you model your `gift_list`?
- Do you use a hash? An array?

**Discuss that with your teacher before you start each action.**

## Step 3 - Mark an item as bought 🎁🎁🎁

We want to be able to mark any item as bought:

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

- How do you modify your `gift_list` to store the `status` of each item?
- How does it affect your code?

Again, **discuss with your teacher**

## Step 4 - Find ideas on Etsy 🎁🎁🎁🎁

You are out of ideas for Christmas and you want to find inspiration from [Etsy](https://www.etsy.com).
Add a new action `idea` to your menu (additionally to the `list`, `add`, `delete` and `mark` actions). Here is how this action could work:

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

For the scraper, here is a starting script to help you extract the data:

_Disclaimer: to prevent ip banishment from Etsy, we won't scrape Etsy in real time but we will download a html page and scrape it locally_

```bash
# Download the page to be scraped inside your working directory
curl "https://www.etsy.com/search?q=THE_ARTICLE_YOUR_ARE_LOOKING_FOR" > results.html
# get the path to the HTML file
pwd
```
```ruby
# lib/scraper.rb
require 'nokogiri'

filepath = "/path/to/the/HTML/file.html"
# 1. We get the HTML page content
html_content = File.open(filepath)
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.v2-listing-card .v2-listing-card__info .text-body').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

Once your scraper works on your `results.html` local file, update it to connect to Etsy's results page for any keywords and scrape the online page:

```ruby
require 'open-uri'
require 'nokogiri'

puts "What are you searching on Etsy?"
article = gets.chomp

# 1. We get the HTML page content thanks to open-uri
html_content = open("https://www.etsy.com/search?q=#{article}").read
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
doc.search('.v2-listing-card .v2-listing-card__info .text-body').each do |element|
  # 4. For each item found, we extract its title and print it
  puts element.text.strip
end
```

- Feel free to scrape another website adapting this script.
- Also, you can scrape other information than just the name (for example the price of the item).

## [OPTIONAL] Save gifts in a CSV file 🎁🎁🎁🎁🎁
We want to be able to retrieve the gift list any time we launch the app.
Create a file `gifts.csv` to persist your data locally.

Parsing CSV

```ruby
require 'csv'

csv_options = { col_sep: ',', quote_char: '"', headers: :first_row }
filepath    = 'gifts.csv'

CSV.foreach(filepath, csv_options) do |row|
  # TODO: build new gift from information stored in each row
end
```

Storing CSV

```ruby
require 'csv'

csv_options = { col_sep: ',', force_quotes: true, quote_char: '"' }
filepath    = 'gifts.csv'

CSV.open(filepath, 'wb', csv_options) do |csv|
  # We had headers to the CSV
  csv << ['name', 'price', 'bought']
  #TODO: store each gift
end
```

- Find the best moment to load the gifts.
- When do you need to save the gifts? 
