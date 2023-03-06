## Background & Objectives

- Load some of the Ruby standard library
- Working with CSV file input

In order to read a CSV file and extract its data you can use the `csv` library which is part of the Ruby standard library. The CSV given as an example in `lib/movies.csv` has been taken from [IMDB](http://www.imdb.com/boxoffice/alltimegross).

#### Ruby Standard Library

The Ruby standard library includes all the convenient libraries that come with your Ruby installation. For instance the [date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html) library, if included in your Ruby program, enables you to manipulate dates easily. A library is loaded at the beginning of your Ruby file with:

```ruby
require "date"
```

Some are more useful than others, so make sure you have a read at the documentation!

## Specs

- Implement `#most_successful` that returns the movies (a certain `number` passed as a parameter) sorted by descending total earnings and published prior to `max_year`, with associated earnings.
- **Constraint**: the returned list should be an array of movies. Each movie should be represented by a hash with keys `name`, `year` and `earnings`. Ex: `{ name: "Avatar", year: 2009, earnings: 760505847 }`

## Further suggestions & resources

Make sure you specify the good `encoding` options for reading the CSV. Remember, some titles are given in French with special characters 😉
