## Background & Objectives

Inheritance is a core concept of OO programming. It allows us to "transfer" methods by defining subclasses (children) that inherit from superclasses (parents). A child class will inherit from its parents' methods.

Remember, the way we tell a Child class to inherit from a parent is like so:

```ruby
class ChildClass < ParentClass
end
```

## Specs

#### Dog inheritance

- We have created a `Dog` class with one instance method: `bark`.
- We have also created a `GermanShepherd` class in a separate file.
- Change the definition of the `GermanShepherd` class, so that it has the instance methods and behaviour of the `Dog` class. Don't forget to `require_relative` the correct file.
- For example, the code below should work:

```ruby
german_shepherd = GermanShepherd.new
p german_shepherd.bark # => "woof woof"
```

NOTE: do not add any code within the body of the `GermanShepherd` class!

## Key learning points

- What is the syntax when we want one class to inherit from another?
