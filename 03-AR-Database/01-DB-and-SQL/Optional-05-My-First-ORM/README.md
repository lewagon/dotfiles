## Background & Objectives

Congrats for reaching this exercise. We will now do some meta-programing;
code that produces code. We can write code to dynamically generate classes,
or methods inside a class. This is very powerful, and quite easily done with Ruby.

Think about your `Post` class. You have methods like `save`, `self.find` and `self.all`.
Imagine having another model, say `User`. You'll need the exact same methods right?

This means we want `Post` and `User` to share a common behavior, which can be
achieved through inheritance:

```ruby
class Record
  # The shared code
end

class Post < Record
end

class User < Record
end
```

## Specs

Implement the `Record` class so that it has all the behavior expected from
a model (`save`, `destroy`, `self.find` and `self.all`).

**Do not** write any code in your `Post` and `User` classes! This constraint
will help you discover Ruby awesomeness.

## Further suggestions & resources

- There is a [`send`](http://stackoverflow.com/questions/3337285/what-does-send-do-in-ruby) method on all classes.
- You can dynamically set an instance variable with [`instance_variable_set`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_set)
- You can dynamically read an instance variable with [`instance_variable_get`](http://ruby-doc.org/core-2.5.3/Object.html#method-i-instance_variable_get)
