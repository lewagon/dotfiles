## Background & Objectives
- Use package of the standard library
- Work with CSV file input

To read in a csv file and extract its data you can use the csv package that comes with ruby standard library.

#### Ruby Standard Library
The [Ruby standard library](http://www.ruby-doc.org/stdlib-2.0.0/) includes all the convenient packages that come with your ruby installation. For instance the [date](http://www.ruby-doc.org/stdlib-2.1.1/libdoc/date/rdoc/index.html) package, if included in your ruby program, enables you to manipulate dates easily. A package is loaded at the beginning of your ruby file with

```ruby
require "date"
```

You have very usefull ruby packages in the standard library to
* read/write/parse files of different format (JSON, XML, CSV,...)
* use custom and convenient data stucture as YAML
* build HTTP server (webrick library)
* and so on..

## Specs
- implement `#most_successfull` that returns the nth movies published prior to a given year, and with maximum earnings.
- **constraint**: the returned list should be an array of movies. Each movie should be represented by a hash with keys `name`, `year` and `earnings`. Ex: `{:name=>"L'exorciste", :year=>1973, :earnings=>204565000}`

## Tips & Resources
- Make sure you specify the good `encoding` options for reading the CSV. Movies titles are given in French with special characters :) 