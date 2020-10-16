⚠️ There's **no `rake`** for this exercise. Sorry 😉

So now we want to enhance our cookbook by finding recipes online. We will use
[🇫🇷 Marmiton](http://www.marmiton.org) or [🇬🇧 allrecipes](https://www.allrecipes.com), because their markup structure is pretty clean (making them good candidates for scraping). If you want to choose another recipe website, please go ahead! It just needs to have a **search** feature where the search keywords are passed in the [query string](https://en.wikipedia.org/wiki/Query_string).

## Setup

First, let's copy paste your Cookbook's code in today's challenge `lib` folder:

```bash
# make sure you're in the right directory
cd ~/code/<user.github_nickname>/fullstack-challenges/02-OOP/04-Cookbook-Day-Two/01-Cookbook-Advanced

# copy your code from Cookbook Day 1
cp -r ../../03-Cookbook-Day-One/02-Cookbook/lib .
```

You can also take the solution from the livecode as a starting point for today (ask your teacher to share it in Slack).

Before starting, run your pasted cookbook to make sure that day one's user actions (list / create / destroy) are working!

```bash
ruby lib/app.rb
```

## 1 - Import recipes from the web

You can scrape from any recipe website that you know, but good ones are [allrecipes](https://www.allrecipes.com) or [Marmiton](http://www.marmiton.org/) for the french speakers. Here's how this feature should work:

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

### Pseudo-code

For this new **user action** (hence new _route_), we need to:

1. Ask a user for a keyword to search
2. Make an HTTP request to the recipe's website with our keyword
3. Parse the HTML document to extract the first 5 recipes suggested and store them in an Array
4. Display them in an indexed list
5. Ask the user which recipe they want to import (ask for an index)
6. Add it to the `Cookbook`

### Analyze the page markup

First, let's have a look at how we'll retrieve information from the Web.

You can download an HTML document on your computer with the `curl` command. Get the following HTML page saved as a `.html` file in your working directory by running one of these two commands in the terminal:

```bash
curl --silent 'https://www.marmiton.org/recettes/recherche.aspx?aqt=fraise' > fraise.html
curl --silent 'https://www.allrecipes.com/search/?wt=strawberry' > strawberry.html
```

👆 **This step is really important**!

The reason why we keep the page on our hard drive is that we need to run Ruby scripts over it hundreds of times to test our code. It's much faster to open the file on disk rather than making a network call to Marmiton / allrecipes every time (that would probably also get us blacklisted).

### Parsing with Nokogiri

Nokogiri is a cool and famous gem used to parse HTML documents (it does other stuff too!) Here is how you can use it to parse a document once you know the CSS selectors of the elements you are interested in. CSS selectors will be explained later, but the gist of it is that you can select all elements with a given `class` attribute by creating the query `.class`.

For instance, if you want to find all elements with the `student` class in the following HTML, you will use the query `".student"`

```html
<ul>
  <li class="student">John</li>
  <li>Paul</li>
  <li class="student">Ringo</li>
</ul>
```

You can use the following boilerplate code to start:

```ruby
require 'nokogiri'
file = 'fraise.html'  # or 'strawberry.html'
doc = Nokogiri::HTML(File.open(file), nil, 'utf-8')

# Up to you to find the relevant CSS query.
```

You can work in a temporary file -- `parsing.rb` for instance -- to find the right selectors and the ruby code to get all the data you want to extract from the HTML. You can start by just displaying the information extracted with `puts`. Once you found all the selectors you need, go on and code the action in your cookbook.

For today you will be using the Nokogiri `.search()` method, which takes a CSS selector as a parameter. If you don't remember the syntax have a look at this section of the [parsing lecture](https://kitt.lewagon.com/karr/karr.kitt/lectures/ruby/06-parsing-storing-data/index.html?title=Parsing+%26+Storing+Data&program_id=1#/3/6).

**Resource**: Want to dive deeper in Nokogiri? Here's a [good Nokogiri scraping guide](https://www.sitepoint.com/nokogiri-fundamentals-extract-html-web/).

### Get response HTML data using `open-uri`

Time to use your parsing code on a live URL with different queries (not just `[fraise|strawberry]`). Use the [open-uri](http://www.ruby-doc.org/stdlib/libdoc/open-uri/rdoc/OpenURI.html) library to get the HTML response from a given URI:

```ruby
require 'nokogiri'
require 'open-uri'
url = "http://the_url_here"
doc = Nokogiri::HTML(open(url), nil, 'utf-8')

# Rest of the code
```

### `Controller` / `View` / `Router`

Once you have this parsing logic, time to add this new user action in your `Controller`. Use the pseudo-code above as a guide of this new method. For your first attempt, you can copy-paste the working parsing code into your controller.

Think about the **class** that should be used to hold information parsed from the web, what is it?

Try it live running your Cookbook!

## 2 - Add a `@rating` property to `Recipe`

This new property should be:

- Asked to the user when creating a new recipe
- Parsed from the web when importing a new recipe
- Stored in the CSV
- Printed when listing the recipes

## 3 - (User Action) Mark a recipe as done

Once you're done with the "Search", try to add a feature to mark a recipe as done:

```bash
-- Here are all your recipes --

1. [X] Crumpets (3 / 5)
2. [ ] Beans & Bacon breakfast (4 / 5)
3. [X] Plum pudding (3 / 5)
4. [X] Apple pie (4 / 5)
5. [ ] Christmas crumble (5 / 5)
```

## 4 - Add a `@prep_time` property to `Recipe`

Again, this new property should be:

- Asked to the user when creating a new recipe
- Parsed from the web when importing a new recipe
- Stored in the CSV
- Printed when listing the recipes

## 5 - (Optional) Service

Try to extract the **parsing** logic out of the controller and put it into a [**Service Object**](http://brewhouse.io/blog/2014/04/30/gourmet-service-objects.html):

```ruby
class ScrapeAllrecipesService # or ScrapeMarmitonService
  def initialize(keyword)
    @keyword = keyword
  end

  def call
    # TODO: return a list of `Recipes` built from scraping the web.
  end
end
```
