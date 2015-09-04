## Recap
So today's lecture is about hashes, but before we dive into it, let's take a quick look to the types in Ruby you already know.

```ruby
# String
"Hello"
"Tomorrow you can sleep in!"

# Fixnum
42

# Float
3.1415

# Boolean
true
false

# Arrays
[]

array = []
array << "friday"

puts array.first # or puts array[0]
array[0] = "Friday!!!"
puts array.first
```

## Hashes

Now let's take a look at this code

```ruby
# index =>      0        1          2          3        4
students =      ["John", "Mathieu", "Jolien", "Wendy", "Anna"]
students_ages = [22,      24,        22,       39,      36]
```

There are two arrays: one with student names and the other with student ages. How do we print student names altogether with their age?

What we could do is loop over the students with an `each_with_index`, since the `students` array and the `student_ages` array have that in common! Let's do that:

```ruby
students.each_with_index do |student, index|
  age = students_ages[index]
  puts "#{student} (#{age})"
end
```
Now this works, but there are some potential risks with this:

- what if both of the arrays aren't in the same order?
- what if you want to delete a student?
- or add one?
- ...

It's clear that this is not good.. and we need something else! It would be nice if we could do something like this: `student["Peter"]` and get Peter's age. This is where hashes come in play, let's rewrite our two arrays using one hash:

```ruby
students = {
  "John" => 22,
  "Mathieu" => 24,
  "Jolien" => 22,
  "Wendy" => 39,
  "Anna" => 36
}
```

You can compare a hash to a dictionary, within the dictionary you'll find words and definitions for those words, all the words are unique. There's never the same word twice being defined. A hash is a bit the same:

- Our unique keys in the hash are: `"John"`, `"Mathieu"`... so the names
- The value associated to each key is the age `22`, `24`...

Note that hashes don't have indexes because there is no order in a hash (which you do have with an array). So what if we want to get Anna's age?

```ruby
p students["Anna"]
```
Now what if we want to print out all the students with their age again? Luckily for us, we can also use the [each](http://ruby-doc.org/core-1.9.3/Hash.html#method-i-each) method. When you look at the docs you'll see that for a hash, `each` works this way:

```ruby
# general syntax
hash.each do |key, value|
end
```

Let's write our code to print the students with their age:

```ruby
students.each do |name, age|
  puts "#{name} (#{age})"
end
```

### Hashes with more information
What if we want to add more information about the student than just the age? We could put an array in the value field, but then we would bounce onto the same problem as earlier again, and get hard time with indexes. What we can do is use a hash again:

```ruby
students = {
  "John" => {
    "age" => 22,
    "native_language" => "English"
  },
  "Mathieu" => {
    "age" => 24,
    "native_language" => "French"
  },
  "Jolien" => {
    "age" => 22,
    "native_language" => "Dutch"
  },
  "Wendy" => {
    "age" => 39,
    "native_language" => "English"
  },
  "Anna" => {
    "age" => 36,
    "native_language" => "Dutch"
  }
}
```

So now you can add new fields within every student hash as you wish. Of course, our previous each is not going to work anymore, let's test it. So now it's printing out the entire hash instead of just the age. That's not what we want of course. Let's see how we can fix this!

```ruby
students.each do |name, student|
  age = student["age"]
  puts "#{name} (#{age})"
end
```

### Recap Hash:
Play around in `irb`:

```
students = {}
students.class
students.length
students["Peter"] = 30
students["Wendy"] = 25
students["Wendy"] += 1
```

Important to remember

- Keys are unique
- There is no order

### Hash Methods
Yesterday we went over some methods that you can use on Arrays, now lets look on some that you can use on Hashes:

```ruby
p students.has_key?("Wendy")
students.delete("Wendy")
p students.has_key?("Wendy")
p students.empty?
p students.keys
p students.values
```

### Symbols
Let's go to another example with hashes.

```ruby
paris = {
  "name" => "Paris",
  "population" => 2211000
}

london = {
  "name" => "London",
  "population" => 8308000
}
```

Now we have two hashes in two variables. But imagine you would have 1000 cities, the identifiers `"name"` and `"population"` will be 1000 times saved in our system. In ruby when working with hashes when you're using internal identifiers you should use symbols instead!

Let's rewrite both our hashes to use symbols:

```ruby
paris = {
  :name => "Paris",
  :population => 2211000
}

london = {
  :name => "London",
  :population => 8308000
}
```

The good thing about using symbols is that it is unique and in our memory it will only exist ones, if you have 2 hashes or 1000, it doesn't matter.

Now actually, if you've done codeacademy, you'll have seen a different way of writing these symbols. That is actually the new ruby syntax. But it's important you know both ways, cause in examples online or older projects, you'll see them too. Let's take a look at how to write this in the new syntax:

```ruby
paris = {
  name: "Paris",
  population: 2211000
}

london = {
  name: "London",
  population: 8308000
}
```

### Let's play!
Now what if we want to use our london hash to print out something like `"The name is London. The population is 8308000"`

```ruby
london.each do |key, value|
  p "The #{key} is #{value}"
end
```

How do I print out just the name of the city?

```ruby
p london[:name]
```
### Hash as a method parameter
We've seen methods taking arrays as parameters, but you'll also see lots of methods taking a hash of "options" as a parameter. For instance.

```ruby
def tag(name, content, attributes = {})
  html_attributes = ""
  attributes.each do |key, value|
    html_attributes << " #{key}='#{value}'"
  end
  return "<#{name}#{html_attributes}>#{content}</#{name}>"
end

p tag("h1", "Hello world")
# => <h1>Hello world"</h1>

p tag("h1", "Hello world", { class: "bold" })
# => <h1 class='bold'>Hello world"</h1>

p tag("a", "Le Wagon", { href: "http://lewagon.org", class: "btn" })
# => <a href='http://lewagon.org' class='btn'>Le Wagon</a>
```

You'll see this a lot in Rails!

## Data Formats
### CSV
CSV is a file format where the data is comma separated. It's easy to read it in ruby and get each line as a ruby array! Let's play with it. Here is a simple CSV file.

```
# cities.csv
Paris,2211000,"Tour Eiffel"
London,8308000,"Big Ben"
```

And here's the parsing script. How simple!

```ruby
require "csv"
CSV.foreach("cities.csv") do |row|
  # row is an array. For first iteration:
  # row[0] is "Paris"
  # row[1] is 2211000, etc.
end
```

### JSON
While reading JSON files in ruby, you will often obtain a hash or an array of hashes. See this JSON file

```
# cities.json
[
  {
    "name": "Paris",
    "population": 2211000
  },
  {
    "name": "London",
    "population": 8308000
  }
]
```

Let's parse it in ruby, no big deal here.


```ruby
require "json"

json_string = File.read("#{File.dirname(__FILE__)}/paris.json")
cities = JSON.parse(json_string)
# => [{ "name" => "Paris", "population" => 2211000 }, { "name" => "London", "population" => 8308000 }

cities.each do |city|
  puts "#{city['name']} has #{city['population']} inhabitants"
end
```

**Disclaimer:** A JSON is neither a hash nor an array. It's a **structured text file** than can be easily parsed as ruby array or hashe. But it's still a text file, that you can read either in ruby, or in python, or in C++, or in whatever language you like. But it's cooler and simpler in ruby right? ;)
