To read in a csv file and extract its data you can use the csv package that comes with ruby standard library.

## Ruby Standard Library
The [Ruby standard library](http://www.ruby-doc.org/stdlib-2.0.0/) includes all the convenient packages that come with your ruby installation. For instance the [cmath](http://www.ruby-doc.org/stdlib-2.0.0/libdoc/cmath/rdoc/index.html) package, if included in your ruby program, enables you to make computations on complex numbers. You include a package with `require` and then you can use its function

```ruby
require "cmath"
CMath.sqrt(-9)  #=> 0+3.0i
```
You have very usefull ruby packages in the standard library to
* read/write/parse files of different format (JSON, XML, CSV,...)
* use custom and convenient data stucture as YAML
* build HTTP server (webrick library)
* and so on..

## Back to our cookbook
Write a program that takes the recipe file as input and works this way :
```
> ruby cookbookpro.rb
We have recipes for : 
- Entree
- Plat Principal
- Dessert
- Sauce

Which category are you interested in ?

> Plat Principal

Here are the recipes of the category : Plat Principal
- Poule au pot
- Lotte a l'armoricaine
- Bar roti
- Boeuf bourguignon
- Poulet basquaise
- Pot-au-feu
- Couteaux a la plancha

Now which recipe ?

> Pot-au-feu
Pot-au-feu
************************************
difficulty : difficile
preparation : 20 min
cooking : 3h
************************************
```

## What if ?
How will you handle the case of the user entering a wrong category/recipe (either typo, or category/recipe not existing..) ?




