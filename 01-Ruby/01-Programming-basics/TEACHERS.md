## Running your code

To run your ruby code, the easy way it to use IRB (Interactive Ruby). Let's launch it on our terminal and type basic code.

```
$ irb
> 2 + 4
> puts "Hello"
> exit
```

Cool to have a playground to experiment things, but real-life is about writing and saving code files. How to run a ruby script from a `.rb` file? Well:

```
$ touch test.rb
$ ruby path/to/test.rb
```

Easy as pie! Now you know 2 different ways of running ruby code, IRB for experiments, `ruby` command to run your own ruby files.


## Built-in objects

In ruby as in any modern programming language, you have a lot of built-in objects:

- texts: `String`
- integers: `Fixnum`
- floating numbers: `Float`
- arrays: `Array`
- etc..

These objects all have operators and methods. Read the [ruby doc](http://ruby-doc.org/core-2.2.3/) to discover these methods! Let's play with these objects on IRB, make basic operations on strings and fixnums, and speak of string interpolation.

```
$ irb
> "Sponge Bob".class                #=> String
> 12.class                          #=> Fixnum
> 3.14.class                        #=> Float
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

A variable is like a **named** box containing a value. When we define it, we put a value in the box. When we use it, we use this value. When we re-assign it, we change this value. Here's a simple example:

```ruby
name = "boris"
puts name

name = "Sebastien"
puts name

name = name + " Saunier"
puts name

age = 31
age += 1

puts "Happy Birthday, #{name}, you now are a big #{age}-old boy"
```

Do you get it?

#### Methods

Nice to have variable to store values, but we also need methods to compute results depending on different inputs. Here is how we define a method:


```ruby
def add(x, y)
  return x + y
end
```

The method is named `add`. It takes two **parameters** `x` and `y` and it `return` their sum. It's cool to define methods because you can re-use code by calling the method and you can call it with different values (the `arguments`):

```ruby
add(2, 4)
add(5, 3)
add(8, 3)
```

Now, let's take some time to understand the difference between `puts` and `return`. Sometimes it's hard to understand for beginners. When you `puts` a value on the terminal, it's just to check your program outputs. But at the end of the day, **what really matters is the method return**! Let's take this example.

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

In the beginning, we'll force you to write `return` keyword explicitely at the end of your methods, in order to make sure **you control what your methods return**. Please understand that `puts` is just a way to test your code outputting stuff on the terminal, nothing more.
