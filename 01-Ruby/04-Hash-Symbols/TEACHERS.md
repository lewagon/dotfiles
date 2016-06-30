## Intro

1. Rehearsal on data type we know
1. First part on **Hash**
1. Second part on **Symbol**
1. Few words on CSV/JSON files and their easy "translation" to arrays and hashes

## Rehearsal

```ruby
42                          # Fixnum
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
1. Ask the class if it's a good modeling? What if there are **10k students**?
1. Hard to maintain, we have to do better.
1. What if we could do `students_age["Peter"]`? We can!


```ruby
students_age = {
  "Peter" => 24,
  "Mary" => 25,
  "George" => 22,
  "Emma" => 20
}
```


## `Hash`

1. Explain that a hash is a **collection of key/value** with **unique keys as in a dictionary**.
1. Go through basic CRUD operation on `Hash`
1. Explain how `each` works
1. Show some custom methods from the doc like `has_key?`


```ruby
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
city.each do |key, value|
  puts "The city #{key} is #{value}"
end

# Custom methods
p paris.has_key?("country")
p paris.has_key?("language")
p students.keys
p students.values
```


### Similar to `Array`?

```ruby
cities = [ "London", "Paris", "NYC" ]
city = {
  "name" => "Paris",
  "population" => 2211000
}
```

`Array` are accessed by **indexes**, `Hash` by **keys**

```ruby
cities[0]    # => "London"
city["name"] # => "Paris"
```


### More readable for rich data


Ask the class which one they prefer?

```ruby
cities = [ ["London", "England", "Big Ben"], ["Paris", "France", "Tour Eiffel"]]

cities = {
  "London" => { "country" => "England", "monument" => "Big Ben" },
  "Paris" => { "country" => "France", "monument" => "Tour Eiffel" }
}
```

Now ask them what's the more intuitive to **use**?

```ruby
cities[1][2]
cities["Paris"]["monument"]
```


## `Symbol`

1. Explain that `Symbol` is a cousin of `String` used for **text identifiers**
1. Start with hash with string keys.
1. **Refacto with symbols** explaining it's more adapted.
1. Introduce the new hash syntax when keys are symbols


```
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

# refacto with new syntax
paris = {
  country: "France",
  population: 2211000
}

p paris[:population] # new syntax does not change how we read a key
```


### `Symbol` vs `String`

Tell them strings are for **data**. symbols for **identifiers**.

```
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
1. Code with them an **HTML generator**
1. Tease them saying Rails will use such helper methods


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

## Data Format

1. Tell them it's very easy to extract data as array or hash from standard files like CSV/JSON.
1. Introduce CSV and JSON and the way we can parse them with the slides.
1. Tell them there is a full course about Parsing the next Tuesday.
1. If you have time, play a bit with Github API building an interactive program getting info on a user from the terminal. Of course, show them that the JSON returned by the API is easily transformed into a readable hash.
1. You can install [JSON Viewer Chrome extension](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) to make JSON API responses readable on your browser.


Example: [GitHub Api: `/users/ssaunier`](https://api.github.com/users/ssaunier)
