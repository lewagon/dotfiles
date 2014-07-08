## Background & Objectives
- Get familiar with requiring external scripts and calling functions from them
- FULLY understand the concepts of [variables](http://en.wikipedia.org/wiki/Program_variable), methods, variable assignation, method definition and method call.

## Specs
### Compute the age
- Complete the method `age_in_days(day, month, year)` that returns your age in days, given your day, month, and year of birth.
- **Constraint**: The method should return an object of the `Fixnum` class.

### Complete the interface
- Complete the code in `lib/interface.rb` that starts a simple terminal interface to test your program. To launch and try this code, you just have to run the following command:

```
ruby lib/interface.rb
```

- **Enhancement** : Are there some repetitive lines of code in `interface.rb` ? Could you refactor those lines and make your code DRY ?


## Learning Badges
The following questions may seem obvious to most of you, **but make 100% sure you can answer precisely all of them**. Because variables and methods are the cornerstones of programming, and you should have an in-depth understanding of these concepts.

### On variables
- What is a variable? What are the different variables in your program?
- What does "defining a variable" mean? What's the syntax to define a variable?
- Can we use a variable that has not been defined?
- Can we assign a new value to a variable already defined? How?
- Are you able to describe with the right words what we **exactly** do in these two lines of code below?

```ruby
some_number = 1
some_number = some_number * 2
```

- What are the good conventions for naming variables in ruby (you can google the answer)?

### On methods
- What is a method? What are the methods in your program?
- What's the difference between defining a method and calling a method?
- Where do we define methods in this program? Where do we call them?
- What's the return value of a method?
- What is the simple ruby convention for a method's return?

### Extra
- How do you get a value from a user on the terminal?
- Why are we using the `chomp` method?
- What about `to_i`? What does this method do?

## Tips & Resources
* You may want to use the [Date class](http://www.ruby-doc.org/stdlib-2.1.1/libdoc/date/rdoc/Date.html), that we load in our file with the line `require 'date'`
* Use the interactive ruby console (IRB) to make "live" experiments.
* As you can see from the given code canvas, ruby uses the `puts` method to output values on the terminal.



