## Background & Objectives

- Use package of the standard library
- Work with CSV file input

In order to read a CSV file and extract its data you can use the `csv` package that comes with ruby standard library.
The CSV given as an example in `lib/movies.csv` has been created from [IMDB](http://www.imdb.com/boxoffice/alltimegross).

#### Ruby Standard Library

The Ruby standard library includes all the convenient packages that come with your ruby installation. For instance the [date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html) package, if included in your ruby program, enables you to manipulate dates easily. A package is loaded at the beginning of your ruby file with

```ruby
require "date"
```

You have very useful ruby packages in the standard library to

- read/write/parse files of different format (JSON, XML, CSV,...)
- use custom and convenient data stucture as YAML
- and so on..

## Specs

- implement `#most_successful` that returns the nth movies published prior to a given year, and with maximum earnings.
- **constraint**: the returned list should be an array of movies. Each movie should be represented by a hash with keys `name`, `year` and `earnings`. Ex: `{ name: "Avatar", year: 2009, earnings: 760505847 }`

## Further suggestions & resources

- Make sure you specify the good `encoding` options for reading the CSV.
Movies titles are given in French with special characters :)
