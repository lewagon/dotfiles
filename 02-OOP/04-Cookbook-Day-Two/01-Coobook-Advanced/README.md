We want to enhance our cookbook by finding recipes data from the web. We will use
[Marmiton](http://www.marmiton.org/), because their markup structure is pretty clean (good candidate for parsing).

Let's summarize the different tasks our program should take care of:

* Requesting marmiton website and getting the HTML response
* Parsing the HTML document to extract useful recipe info
* Storing these info in `Recipe` objects of our `Cookbook` object
* Storing these recipes in our CSV cookbook file

You will add your HTML scraper feature to your already existing cookbook app (from previous challenge). You can copy paste your code from Day one and put it into today's folder with this command:

```bash
$ cp -r ../../03-Cookbook-Day-One/01-Cookbook/lib .
```

It will add a lib folder with your previous code from which you can start.

### Analyze the page markup

You can save an HTML document on your computer through `curl` command. Get the following HTML page saved as *marmiton.html* in your working directory by running :

```
curl http://www.marmiton.org/recettes/recherche.aspx?aqt=fraise > marmiton.html
````

The reason why we dump the page on our hard drive is that we'll run a Ruby script over it a hundred times
to test our code. It will be faster to open the file on disk rather than to make a network call to Marmiton.

### Parse with Nokogiri

Nokogiri is a cool and famous gem to parse HTML documents (not only). Here is how you can use it to parse a document once you know the CSS selectors of the elements you are interested in. CSS selectors will be explained later, but the gist of it is that you
can select all elements with a given `class` attribute by creating the query `.class`.

For instance, if you want to find all elements with the `student` class in the following HTML, you will use the query `".student"`

```html
<ul>
  <li class="student">John</li>
  <li>Paul</li>
  <li class="student">Ringo</li>
</ul>
```

For the Marmiton page you dumped, you can use the following boilerplate code to start.

```ruby
require 'nokogiri'
doc = Nokogiri::HTML(File.open('marmiton.html'), nil, 'utf-8')

doc.css('.m_contenu_resultat').each do |element|
  puts element.search('.m_titre_resultat > a').inner_text
end
```

Try to extract that information:

- The cooking and preparation lengths, that you can store as strings.
- The description summary: a string of, let's say, the first 150 characters of the given description
- The number of votes on which the rating is based


### Get response HTML data using `open-uri`

Now that you know how to parse this HTML document the way you want, it's time to automate the first responsibility (requesting marmiton and getting returned HTML page). Use the [open-uri](http://www.ruby-doc.org/stdlib-2.2.2/libdoc/open-uri/rdoc/OpenURI.html) library to get the HTML response from a given URI. You just open a URL:

```ruby
require 'open-uri'
response = open("http://your_url_here")
doc = Nokogiri::HTML(response, nil, 'utf-8')
```

### Enhance your CookBook

#### More advanced recipes

In the previous challenge, your recipe objects were rather simple, with just a single instance variable storing the recipe's name. Try to extract as much data as you can from the Marmiton scraping, and enhance your `Recipe` class with new instance variables. You'll have some changes to make to the `Cookbook` as well for the CSV serialization/deserialization.

#### Search on Marmiton

Enhance your cookbook adding a task to extract recipes from marmiton's website.
The goal is to show the user search results and ask **which result** to import (only one).

```
-- My CookBook --

What do you wanna do?

1. Import recipes from marmiton
2. List all recipes
3. Add a recipe
4. Delete a recipe
5. Exit

> 1
Import recipes for which ingredient ?
> fraise

Looking for "fraise" on Marmiton...
10 results found!

1. Tarte aux Fraises
2. Clafouti aux Fraises
3. Fraises à la Chantilly
[...]

Please type a number to choose which recipe to import
> 2
Importing "Clafouti aux Fraises"...
```

#### Mark as tested

Once you're done with the "Search", try to add a feature to mark a recipe as tested:

```
-- Here are all your recipes --

1. [X] Crumpets (15 min)
2. [ ] Beans & Bacon breakfast (45 min)
3. [X] Plum pudding (90 min)
4. [X] Apple pie (60 min)
5. [ ] Christmas crumble (30 min)
```

#### Difficulty

On marmiton, it's possible to make more precise requests picking a difficulty for the recipes (difficulty goes from 1 to 4).

Enhance your Cookbook by:

* Adding a difficulty attribute to your recipes.
* Modifying the web-import features so that we can import recipes with a given difficulty (you might want to make this argument optional keeping the old import feature possible).
* Printing the difficulty when listing your cookbook's recipes.
* Adding a filter task to print a list of recipes for a given difficulty.

### Sinatra

Once you've done all the above, ask your teacher to form a group to show you the web micro-framework [Sinatra](http://www.sinatrarb.com/) and try to move your Cookbook to the web!
