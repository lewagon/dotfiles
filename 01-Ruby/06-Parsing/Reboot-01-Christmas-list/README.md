## Guidelines

Winter is coming ⛄⛄⛄. Let's build an app to keep track of our list of Christmas gifts we want to buy. 

We want to build a program to handle our gift list, mark items as bought and eventually find some inspiration from an external website like Etsy. This challenge should take you all day. 🎁

Like yesterday, start off by writing the pseudo-code in the group as a live-code 💻.

_Note: The user can add **any** gift they want. There's no need to make a fixed list of possible gifts or anything of that sort._

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

Now let's implement the actions (`list`, `add`, `delete`).

- How do you model your `gift_list`?
- Do you use a hash? An array?

**Discuss that with your teacher before you start each action.**

```bash
ruby interface.rb

> Welcome to your Christmas gift list
> Which action [list|add|delete|quit]?
> list
> 1 - sockets
> 2 - ruby book
> 3 - macbook pro
> Which action [list|add|delete|quit]?
> add
> What gift would you like to add?
> lewagon socks
> "lewagon socks" was added to your Christmas gift list
> Which action [list|add|delete|quit]?
> Which item would you like to delete (give the number)?
> 1
> "sockets" was deleted from your Christmas gift list
> Which action [list|add|delete|quit]?
> quit
> Goodbye
```

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

## Step 4 - Find ideas from the internet 🎁🎁🎁🎁

You are out of ideas for Christmas and you want to find inspiration from the internet.
Today, we'll use scrape ["Letsy"](https://letsy.lewagon.com/), a fake version of Etsy, to find some gift ideas.
Unfortunately, we can't scrape [Etsy](https://www.etsy.com) directly because they have a strong anti-scraping system. But you can see an example of how to do this later in the solution video.

Add a new action `idea` to your menu (additionally to the `list`, `add`, `delete` and `mark` actions). Here is how this action could work:

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

For the scraper, here is a starting script to help you extract the data:

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

_Note there's some text in ALL_CAPS there that you need to replace with the correct values._

- Feel free to scrape another website adapting this script.
- What kind of data structure should your scraper return?
- Also, you can scrape other information than just the name. For example you could scrape the price of the item too. In this case, how should you update the data structure your scraper returns?

## [OPTIONAL] Save gifts in a CSV file 🎁🎁🎁🎁🎁
We want to be able to retrieve the gift list any time we launch the app.
Create a file `gifts.csv` to persist your data locally.

Parsing CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.foreach(filepath, col_sep: ',', quote_char: '"', headers: :first_row) do |row|
  # TODO: build new gift from information stored in each row
end
```

Storing CSV

```ruby
require 'csv'

filepath    = 'gifts.csv'

CSV.open(filepath, 'wb', col_sep: ',', force_quotes: true, quote_char: '"') do |csv|
  # We had headers to the CSV
  csv << ['name', 'price', 'bought']
  #TODO: store each gift
end
```

- Find the best moment to load the gifts.
- When do you need to save the gifts?


## Flashcards

To help you master the keys objectives of this reboot day you can redo the following deck of flashcards: **Hash & Symbols**.
