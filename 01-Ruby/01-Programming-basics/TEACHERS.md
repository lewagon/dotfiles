## Running your code

To run your ruby code, the easy way it to use IRB (Interactive Ruby). Let's launch irb on our terminal and type basic ruby `2 + 4`, `puts "Hello"`.. That's an awesome playground to experiment things right? Let's quit it with `exit`.

Cool to have a playground, but real-life is about writing code files that we can save. How to run a ruby script from an `.rb` file ! Well, let's `$ touch test.rb`, write a bit of ruby that puts stuff in this file, and then launch the script with the command `$ ruby path/to/test.rb`. Easy as pie!

Now you know 2 different ways of running ruby code, IRB for experiments, `ruby` command to run your ruby files.


## Built-in objects

In ruby, you already have a lot of built-in objects:

- texts: `String`
- integers: `Fixnum`
- floating numbers: `Float`
- arrays: `Array`
- etc..

These objects all have operators and methods you can use. Read the [ruby doc](http://ruby-doc.org/core-2.2.3/) to discover these methods ! But first, let's play with built-in objects on IRB, and make basic operations on strings and fixnums.

```
$ irb
> "Sponge Bob".class              #=> String
> 12.class                        #=> Fixnum
> 3.14.class                      #=> Float
> ['Huey', 'Dewey', 'Louie'].class  #=> Array

# Playing with operators on integers
> 3 + 5
> 3 - 5
> 3 * 5

# Playing with operators on strings
> "Sponge" + " " + "Bob"

# Interpolation and simple/double quotes
> 'two: #{1 + 1}'
> "two: #{1 + 1}"

# Cool methods => read the doc
> "Sponge Bob".upcase
> "Sponge Bob".split("")
> ['Huey', 'Dewey', 'Louie'].sort

> exit
```

## Variables

A variable is like a **named** box containing a value. When we define it, we put a value in the box. When we use it, we use this value. When we re-assign it, we change this value. Let's code some example together :

```ruby
name = "boris"
puts name

name = "Sebastient"
puts name

name = name + " Saunier"
puts name

age = 31
age += 1

puts "Happy Birthday, #{name}, you now are a big #{age}-old boy"
```

Do you get it?

#### Methods

Nice to have variable to store values, but we also need methods to compute results depending on different "input values" = the method arguments. Here is how we define a method:


```ruby
def add(x, y)
  return x + y
end
```

Here the method is named `add`. It take two **parameters** `x` and `y` and it `return` their sum. It's cool to define methods because you can re-use code by calling the method and you can call it with different values, the `arguments`:

```ruby
add(2, 4)
add(5, 3)
add(8, 3)
```

Let's take some time to understand the difference between `puts` and `return`, since sometimes it causes trouble to beginners. When you puts a value on the terminal, it's just to check your program outputs. But at the end of the day, **what really matters is the method return** ! Let's take this example

```ruby
def add(x, y)
  puts x + y
end

total = add(3, 2)
puts total # oups....

def add(x, y)
  return x + y
end

total = add(3, 2)
puts total # yeah!!
```

When you first begin, let's write the keyword `return` at the end of our methods to make sure **we control what it returns**, even if this keyword is optional in ruby.

#### Live-Code

You can write them on the board.

**Question 1**: Write a method which **returns** the number of days since last Xmas.

You can role play. Say you are a client and you want this method.

If they manage to have a first version working for the current year, say you're not happy as the next year your method does not work anymore :(

Then again, say you're not happy because 7 days a year it does not work (after X-mas).

Possible solution:

```ruby
require 'date'

def days_since_christmas
  today = Date.today
  if today.month == 12 && today.day >= 25
    (Date.today - Date.new(today.year, 12, 25)).to_i
  else
    (Date.today - Date.new(today.year - 1, 12, 25)).to_i
  end
end
```

**Question 2**:

Write a game. The computer picks a number between 1 and 100. Then the user guesses until he/she finds the correct answer.

When the program is done, ask the student to pick between 1 and 100, and for each wrong guess, indicate to the user if his/her guess is bigger or smaller than the computer's pick.
