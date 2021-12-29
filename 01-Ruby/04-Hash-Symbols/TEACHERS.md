## Intro

1. We gonna start with quick rehearsal on data type we know
2. Then first part on **Hash**
3. Second part on **Symbol**
4. Few words on CSV/JSON files and the way we can extract data as array/hash

## Rehearsal

```ruby
42                          # Integer
1.25                        # Float
true                        # Boolean
"hello world"               # String
[ "a", "e", "i", "o", "u" ] # Array
```

## From arrays to hash

Start by taking an example with two arrays

```ruby
students =     [ "Peter", "Mary", "George", "Emma" ]
student_ages = [ 24     , 25    , 22      ,  20    ]
```

1. Write a program to display the list of students with their age with `each_with_index`
2. Is it a good modeling? What if there are **10K students**? Hard to maintain, we can do better.
3. What if we could do `students_age["Peter"]`? We can with Hash. Introduce it:

```ruby
students_age = {
  "Peter" => 24,
  "Mary" => 25,
  "George" => 22,
  "Emma" => 20
}
```

## `Hash`

1. Explain that a hash is a **collection of key/value pairs**.
2. It has **unique keys** as a dictionary.
3. Go through basic CRUD operation on `Hash`
4. Explain how `each` works on a hash
5. Show some custom methods from the doc like `has_key?`

```ruby
# Defining a hash
empty_hash = {}
paris = {
  "country" => "France",
  "population" => 2211000
}

# Reading keys
paris["country"]     # => "France"
paris["population"]  # => 2211000

# Adding key/value
paris["star_monument"] = "Tour Eiffel"

# Updating value
paris["population"] = 2211001

# Deleting key/value
paris.delete("star_monument")

# each
paris.each do |key, value|
  puts "Paris #{key} is #{value}"
end

# Custom methods
p paris.has_key?("country")
p paris.has_key?("language")
p paris.keys
p paris.values
```

### Similar to `Array`?

Explain `Array` are accessed by **indexes**, `Hash` by **keys**

```ruby
cities = [ "London", "Paris", "NYC" ]
city = {
  "name" => "Paris",
  "population" => 2211000
}

# Difference between Array and Hash
cities[0]    # => "London"
city["name"] # => "Paris"
```

### More readable for rich data

Ask the class which one they prefer?

```ruby
cities = [ ["London", "England", "Big Ben"], ["Paris", "France", "Tour Eiffel"]]
puts cities[1][2]
```

or:

```ruby
cities = {
  "London" => { "country" => "England", "monument" => "Big Ben" },
  "Paris" => { "country" => "France", "monument" => "Tour Eiffel" }
}
puts cities["Paris"]["monument"]
```

## `Symbol`

1. Explain that `Symbol` is a cousin of `String` used for **text identifiers**
2. Start coding a city hash with string keys.
3. **Refacto with symbols** explaining it's more adapted.
4. Introduce the new hash syntax when keys are symbols

```ruby
# Not good!
paris = {
  "country" => "France",
  "population" => 2211000
}

# country and population are identifiers, not data, so:
paris = {
  :country => "France",
  :population => 2211000
}

# Refacto with new syntax
paris = {
  country: "France",
  population: 2211000
}

# New syntax does not change the way we read a key
p paris[:population]
```

### `Symbol` vs `String`

Tell the students strings are for **data**. symbols for **identifiers**.

```ruby
# Text data => String
"Sebastien Saunier"
"seb@lewagon.org"
"ruby on Rails"
"Paris"

# Text identifiers => Symbol
:fullname
:email
:skill
:city
```

## `Hash` as last method argument

1. Explain hash are often used as last optional argument
2. Code with them an **HTML generator**
3. Tease them saying Rails will use similar helper methods generating HTML.

```ruby
def tag(name, content, attrs = {})
  flat_attrs = attr.map { |key, val| "#{key}='#{val}'" }.join(" ")
  "<#{name} #{flat_attr}>#{content}</#{name}>"
end

tag("h1", "Hello world")
# => <h1>Hello world"</h1>

tag("h1", "Hello world", { class: "bold" })
# => <h1 class='bold'>Hello world</h1>

tag("a", "Le Wagon", { href: "http://lewagon.org", class: "btn" })
# => <a href='http://lewagon.org' class='btn'>Le Wagon</a>
```

Note: You should not reveal the solution and live code it with students. Start by showing them that we need to do "<h1  ATTRIBUTES >" + content "</h1>", then telling them that we will focus on ATTRIBUTES. Usually they will start with #each, and guide them to use #map in the end.

## Extracting data from CSV/JSON files

1. Explain it's easy to extract data as array or hash from standard files like CSV/JSON.
2. Introduce CSV and JSON with the slides.
3. Don't spend too much time => **full course on Parsing is next Tuesday**.
4. If you have time, play a bit with GitHub API building an interactive program getting info on a user from the terminal.
5. You can install [JSON Viewer Chrome extension](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) to make JSON readable on your browser.

GitHub API URL for user: https://api.github.com/users/ssaunier
