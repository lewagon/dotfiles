## Background & Objectives
- Get familiar with ruby input/output on terminal, to play with your programs
- Understand IN-DEPTH the concepts of [variables](http://en.wikipedia.org/wiki/Program_variable), methods, variable assignation, method definition and method call.

## Specs
### Compute the age
- Complete the method `age_in_days(day, month, year)` that returns your age in days, given your day, month, and year of birth. 
- **Constraint**: The method should return an object of the `Fixnum` class.

### Build the interface
- Complete the code in `lib/interface.rb` that starts a simple terminal interface to test your program. To launch this code, you just have to run the following commands (changing the path with **your** Github username) :

```
cd ~/code/username/kitt/ruby/Wagon-0
ruby 03-Age-in-days/lib/interface.rb
```

- **Enhancement** : Are there some repetitive lines of code in `#age_from_terminal` ? How do you refactor these lines and make your code DRY ?


## Learning Badges
The following questions may seem obvious to most of you, **but make 100% you can answer precisely all of them**. Because variables and methods are the milestones of programming, and you should have a in-depth understanding of these concepts.

### On variables
- What is a variable ? What are the different variables in the "age_in_days.rb" and "interface.rb" files?
- Why do we use variables ?
- Suppose we have a very long program that uses 10000 times the value `1985` for the year of birth.. Now suppose we made a mistake and that this year should be `1986`. What's the interest of defining and using a variable `year = 1985` instead of the raw value '1985` ?
- What is defining a variable ? What's the syntax to define a variable ?
- Can we use a variable that has not been defined ?
- Can we assign a new value to a variable already defined ? How ?
- Are you able to describe with the right words what we do **exactly** in these two lines of code?
```ruby
some_number = 1
some_number = some_number * 2
```
- What are the good conventions for naming variables in ruby (you can google the answer)?

### On methods
- What is a method ? what are the methods in your program ?
- What's the difference between defining a method and calling a method ?
- Where do we define methods in this program ? Where do we call them ?
- What's the return of a method ?
- Does a method systematically return something ?
- What is the simple ruby convention for a method's return ?

## Tips & Resources
* You may want to use the [Date class](http://www.ruby-doc.org/stdlib-2.1.1/libdoc/date/rdoc/Date.html), that we load in our file with the line `require 'date'`
* Use the interactive ruby console (IRB) to make "live" experiments. Especially to test the type of objects that tested methods return.
* To read a user input from the terminal you should use [gets](http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html). You will also need to [chomp](http://ruby-doc.org/core-2.0.0/String.html#method-i-chomp) the resulting string, and convert it to integer.
* As you see from code canvas, ruby uses the `puts` method to output values on the terminal.



