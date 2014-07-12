We want to enhance our cookbook by finding recipes data from the web. We will use marmiton website, cause their markup structure is pretty clean (good candidate for parsing) and because we are french after all! Let's summarize the different tasks our program should take care of :

* Requesting marmiton website and getting the HTML response
* Parsing the HTML document to extract usefull recipe infos
* Storing these info in `Recipe` objects of our `Cookbook` object
* Storing these recipes in our CSV cookbook file

You will add your HTML scraper feature to your already existing cookbook app (from previous challenge).

### Analyze the page markup 
You can save an HTML document on your computer through `curl` command. Get the following HTML page saved as *marmiton.html* in your working directory by running :

```
curl http://www.marmiton.org/recettes/recherche.aspx?aqt=fraise > marmiton.html
````

### Parse with Nokogiri
Nokogiri is a cool and famous gem to parse HTML documents (not only). Here is how you can use it to parse a document once you know the CSS selectors of the elements you are interested in (we will re-explain CSS selector later on..).

```ruby
require 'nokogiri'
doc = Nokogiri::HTML(File.open('marmiton.html'))

doc.search('.m_search_result').each do |element|
    puts "#{element.search('.m_search_titre_recette > a').inner_text}"
    puts "Rating : #{element.search('.etoile1').size} / 5}"    
end
```

Try to enhance this small program to extract more recipe's info from the HTML file as :

* the cooking and preparation lengths (as 2 integers representing the number of minutes respectively for cooking and preparing)
* the description summary : a string of, let's say, the first 150 characters of the given description
* the number of votes on which the rating is based


### Get response HTML data using open-uri
Now that you know how to parse this HTML document the way you want, it's time to automate the first responsibility (requesting marmiton and getting returned HTML page). Use the [open-uri](http://www.ruby-doc.org/stdlib-1.9.3/libdoc/open-uri/rdoc/OpenURI.html) library to get the HTML response from a given uri. It's pretty simple, here is how it works basically :

```ruby 
require 'open-uri'
response = open("your_url_here")
puts response.inspect
```

### Enhance your CookBook
#### Funnier recipes
In the previous challenge, your recipe objects were rather simple, with just a single instance variable storing the recipe's name. Now it's the time to make funnier objects. Try to extract as much data as you can from marmiton scraping, and enhance your `Recipe` class adding these extra-attributes to the `Recipe` class

#### Make it connected
Enhance your cookbook adding a task to extract recipes from marmiton's website, after you enter an ingredient name.

```
-- My CookBook --

What do you wanna do?

1. Import recipes from marmiton [web_import]
2. List all recipes [list]
3. Add a recipe [add]
4. Delete a recipe [del <recipe_id>]
5. Exit

> web_import
Import recipes for which ingredient ?
> fraise
Importing recipe data from marmiton for 'fraise'...
```

This new task should

* add the recipes extracted from marmiton on you CSV data file 
* also add them to your cookbook.

#### New features
Add features to 

* mark recipes as tested in your CookBook 
* print a recipe's details

your interface should also be more user-friendly as below

```
-- Here are all your recipes --

1. [X] Crumpets (15 min)
2. [ ] Beans & Bacon breakfast (45 min)
3. [X] Plum pudding (90 min)
4. [X] Apple pie (60 min)
5. [ ] Christmas crumble (30 min)

What do you wanna do?

1. Import recipes from marmiton [web_import]
2. List all recipes [list]
3. See a recipe details [see <recipe_id>]
4. Mark a recipe [mark <recipe_id>]
5. Add a recipe [add]
6. Delete a recipe [del <recipe_id>]
7. Exit
```
Note that you will have to change you add action, now that your recipe model has more attributes than previously.

#### Extra 
On marmiton, it's possible to make more precise requests picking a difficulty for the recipes (difficulty goes from 1 to 4). Enhance your Cookbook by :

* Adding a difficulty attribute to your recipes.
* Modifying the web-import features so that we can import recipes with a given difficulty (you might want to make this argument optional keeping the old import feature possible). 
* Printing the difficulty when listing your cookbook's recipes.
* Adding a filter task to print a list of recipes for a given difficulty.
