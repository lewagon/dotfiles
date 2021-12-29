## How to run your code?

1. Experiment with IRB
2. `touch file.rb` and run it from terminal with `ruby file.rb`
3. Use `puts` to output results

## Built-in objects

1. Go through common objects on IRB (String, Integer, Float, Array, booleans)
2. Each object has **its own set of methods**, example:

```ruby
"boris".upcase # => "BORIS"
12.upcase      # => does not work!
12.even?       # => true
"boris".even   # => does not work!
```

### String

1. Explain simple or double quotes syntax
2. Show interpolation with double quotes
3. Convert strings to integer with `to_i`

```ruby
"yipi yeah".upcase   #=> "YIPI YEAH"
"Hello" == 'Hello'   #=> true

'two: #{1 + 1}'      #=> "two: #{1 + 1}"
"two: #{1 + 1}"      #=> "two: 2"

"1984".class        #=> String
"1984".to_i         #=> 1984
"1984".to_i.class   #=> Integer
```

### Integer

1. Show standard arithmetic with basic operations
2. Show one or two custom methods
3. Convert an integer to string with `to_s`

```ruby
1 + 2      #=> 3
2 * 4      #=> 8

20.even?   #=> true
20.odd?    #=> false

1984.to_s    #=> "1984"
```

### Array

1. Let's play 5 seconds (but we'll cover that tomorrow in details)

```ruby
["Huey", "Dewey", "Louie"].size    #=> 3
["Huey", "Dewey", "Louie"].sort    #=> ["Dewey", "Huey", "Louie"]
[3, 5, 1].sort                     #=> [1, 3, 5]
```

### Ruby doc is your friend!

1. Go on http://www.ruby-doc.org/core/
2. Choose a String method (e.g. `split`) with the class and test it in IRB

## Variables

1. They are the **elementary blocks of programming**.
2. Why variables? Store values to re-use them

```ruby
age = 17
puts "You are #{age} years old"

puts "Lucky you, it's your birthday"
age = age + 1
puts "You are now #{age}"
```

## Methods

1. **Factoring** your code
2. Why methods? **concise** way to call a Ruby code
3. Apply a Ruby code to **dynamic inputs**

Example **without** parameters

```ruby
require "date"

def tomorrow
  tomorrow_date = Date.today + 1
  return tomorrow_date.strftime("%B %d")
end

puts tomorrow
```

Example **with** parameters

```ruby
def full_name(first_name, last_name)
  name = first_name.capitalize + " " + last_name.capitalize
  return name
end

puts full_name("boris", "paillard")
puts full_name("sebastien", "saunier")
```

### Combining variables and methods

```ruby
def full_name(first_name, last_name)
  name = first_name.capitalize + " " + last_name.capitalize
  return name
end

boris_first_name = "boris"
boris_last_name = "paillard"
boris_full_name = full_name(boris_first_name, boris_last_name)
puts boris_full_name
```

### Parameters vs. arguments

```ruby
def new_population(population, births)
  return population + births
end

puts new_population(2000000, 300)
```

- Here `population` and `births` are **parameters**
- `2000000` and `300` are **arguments**
- Arguments are values taken by the parameters

### Conventions

1. Methods and variables in **snake_case** (explain what it means)
2. Without `return` a method returns the **last statement executed**.
2. methods ending with a `?`
3. destructive methods ending with a `!`
