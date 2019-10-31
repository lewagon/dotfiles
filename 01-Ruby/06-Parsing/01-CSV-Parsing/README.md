## Background & Objectives

- Using a package of the standard library
- Working with CSV file input

In order to read a CSV file and extract its data you can use the `csv` package that comes with ruby standard library.
The CSV given as an example in `lib/movies.csv` has been taken from [IMDB](http://www.imdb.com/boxoffice/alltimegross).

#### Ruby Standard Library

The Ruby standard library includes all the convenient packages that come with your ruby installation. For instance the [date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html) package, if included in your ruby program, enables you to manipulate dates easily. A package is loaded at the beginning of your ruby file with:

```ruby
require "date"
```

There are loads more useful ones in there too, so make sure you have a read!

## Specs

- implement `#most_successful` that returns the movies (a certain `number` passed as a parameter) published prior to a given year, with associated earnings.
- **constraint**: the returned list should be an array of movies. Each movie should be represented by a hash with keys `name`, `year` and `earnings`. Ex: `{ name: "Avatar", year: 2009, earnings: 760505847 }`

## Further suggestions & resources

- Make sure you specify the good `encoding` options for reading the CSV.
Remember, some titles are given in French with special characters 😉
