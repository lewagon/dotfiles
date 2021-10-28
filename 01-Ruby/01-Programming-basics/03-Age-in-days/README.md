## Background & Objectives

- Get familiar with requiring external scripts and calling methods from them
- **Fully** understand the concepts of [variables](http://en.wikipedia.org/wiki/Program_variable), variable assignation, method definition and method calls.

## Specs

### Compute the age

- Complete the method `age_in_days` defined in the `lib/age_in_days.rb` file. This method takes 3 arguments (`day`, `month` and `year`) and should return a `Integer` which is your age in days (the number of days you've lived on planet Earth).

### Interactive Program

- Once your method `age_in_days` is correct, we want to use it in `lib/interface.rb` which runs a command line tool. To launch this program, just run this in your terminal:

```bash
ruby lib/interface.rb
```

You'll see that your program says you are `0 years old`. You must change the code so that the program uses your `age_in_days` method. Note: it is available in the `interface.rb` file because we wrote the `require_relative` command at the beginning of the file.

- **Enhancement**: Are there some repetitive lines of code in `interface.rb`? Could you refactor those lines and make your code DRY?

## Further suggestions & resources

- You may want to use the [Date class](https://ruby-doc.org/stdlib-2.2.10/libdoc/date/rdoc/Date.html), which we load into our file using the line `require 'date'`
- Use the interactive Ruby console (IRB) to experiment.
- As you can see from the given code, Ruby uses the `puts` method to output values (show you things!) to the terminal.

## Key learning points

The following questions may seem obvious to most of you, **but make 100% sure you can precisely answer all of them**. Variables and methods are the cornerstones of Ruby programming, and you should have an in-depth understanding of these concepts.

### On variables

- What is a variable? What are the different variables in your program?
- What does "defining a variable" mean? What's the syntax to define a variable?
- Can we use a variable that has not been defined?
- Can we assign a new value to a variable already defined? How?
- Are you able to describe with the right words **exactly** what we do in these two lines of code below?

```ruby
some_number = 1
some_number = some_number * 2
```

- What's the proper convention for naming variables in Ruby (you can google the answer)?

### On methods

- What is a method? What are the methods in your program?
- What's the difference between defining a method and calling a method?
- Where do we define methods in this program? Where do we call them?
- What's the return value of a method?
- What is the simple Ruby convention for a method's return?

### Extra

- How do you get a value from a user on the terminal?
- Why are we using the `chomp` method?
- What about `to_i`? What does this method do?
