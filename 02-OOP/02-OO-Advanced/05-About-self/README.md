## Background & Objectives

You use the `self` keyword in Ruby to access the context that the program is currently working inside of.

The rule is simple. Used inside an instance method, `self` will point to the object on which the method is called. When used inside the class or module, or before the method name when defining a class method (i.e. `def self.method; end`), `self` represents the first class or module enclosing it.

There are basically 3 contexts:

1. The global or "main" context, which you can see by typing `self.inspect` in IRB console (**try it**)
2. The Class or Module context where the `self` keyword represents a Class or a Module
3. The Object context where `self` represents an **instance** of a class.

## Specs

### Get the winning combination

Look at the following code that contains nested module, class and methods. Implement the return of each method, so that you get the winning combination! When you are sure you have it, run the test to check it out!

### Chaining with self

In **animal.rb**, we give you a program which runs with errors. We tried to implement method chaining, but we failed miserably... There is a **very** small fix to make our program work - try to figure it out! **Hint:** this fix involves using `self` (obviously 😊)

This is what we want to be able to do:

```ruby
cat = Animal.new
cat.name("garfield").color("orange")
p cat
```
