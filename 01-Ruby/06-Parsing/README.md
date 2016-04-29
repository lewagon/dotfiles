## Re-what? Reboot!

Today, the "ReBoot" group should keep working on simple challenges to master core notions. Don't be disappointed! You'll be able to parse and store data later on in your ruby life.

### Reboot challenges

`01-Instacart`: This challenge will keep you busy all the day.

1. Build a gift wishlist, where you can:
  - List products in your wishlist
  - Add a new product to your list (e.g. "Jeans", "Socks", etc..)
  - Delete an item you don't want in your list anymore
  - Mark any item as "checked" when you've bought it
  - It's like a basic todolist with products instead of tasks.
2. Improve your program with a search engine based on Etsy, to find some inspiration for your gifts. It should work like that:

```bash
What do you search on Etsy?
> Jeans
Here are Etsy results for "Jeans":
1 - Blue Jeans Levis..
2 - Vintage Jeans..
3 - Jeans Pants etc etc..
4 - White jeans..
etc..

Pick one to add to your list (give the number)
> 2
"Vintage Jeans.." added to your wishlist
```

- First start with basic feature (list/add/delete/mark) before working on the search engine
- Think about the best ruby structure to model your wishlist (a hash? an array of hashes?). Take user inputs into consideration (product name? product index?) to choose the most adapted stucture.
- Code the Etsy scraper separately with your teacher, before using it in your wishlist program.

Again here is a [possible solution](https://gist.github.com/Papillard/24aa78105a741f129e35) but be smart and don't look at it before having worked on the challenge!

### Advanced challenges

For the others, here is the roadmap of the day.

#### Parsing

As a developer, you will often have to manipulate structured data files such as CSV, JSON, HTML. Some examples:

- CRM systems as Mailchimp allow you to export CSV files (e.g. lists of emails)
- most common web APIs return JSON files
- all websites return HTML files accessible thanks to their URL.

Knowing to read these files and transform them into friendly ruby objects (array, hash) is really convenient. This is what developers call **parsing**. Parsing HTML files has its little nickname: it's called **scraping**. You may want to parse files for many reasons:

- Populate your initial database with cool real-life data
- Build growth hacking scripts by parsing files containing emails, twitter username, etc..

#### `01-CSV-parsing`

A challenge to make you parse a CSV file of american movies and find most successful blockbusters.

#### `02-Numbers-and-letters`

A sophisticated challenge. You have to re-code the french game "Des chiffres et des lettres" that gives you a random grid of letters and ask canditate to find the longest valid word in this grid. To decide whether a word exists or not, we'll make use of the WordReference API that responds "a JSON file of various translations" for any given word.

#### `Optional-01-Text-Analyzer`

Read from a text file and count most frequent words.

#### `Optional-02-Your-first-scraper`

A useful challenge to scrape your first HTML file from etsy.com.
