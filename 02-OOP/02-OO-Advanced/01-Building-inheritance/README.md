## Background & Objectives

Inheritance is a core concept of OO programming. It allows us to "transfer" methods by defining subclasses (children) that inherit from superclasses (parents). A child class will inherit from its parents' methods.

Remember, the way we tell a Child class to inherit from a parent is like so:

```ruby
class ChildClass < ParentClass
end
```

## Specs

#### Building inheritance

- We have created a `Building` class with three instance variables, `@name`, `@width` and `@length`, set with the three parameters of `initialize`.
- We have also create a `House` class that is empty.
- Change the definition of the `House` class, so that it has the instance variables and behaviour of the `Building` class.
- For example, the code below should work:

```ruby
cottage = House.new("Country Cottage", 20, 40)
cottage.floor_area # => 800
```

NOTE: do not add any code within the body of the `House` class!


## Key learning points

- What is the syntax when we want one class to inherit from another?

