## Background & Objectives

This is a very advanced exercise. We will now play with internalities of Ruby, and the way it handles `NoMethodError`.

### Specs

We want to create a `UberHash` class which will be able to store anything. A classic hash works like this:

```ruby
classic_hash = Hash.new
classic_hash[:color] = red
classic_hash[:color]
# => "red"
```

But we want to do that:

```ruby
uber_hash = UberHash.new
uber_hash.color
# => nil

uber_hash.color = "red"
uber_hash.color
# => "red"
```

You might think that you just have to put an `attr_accessor :color` on `UberHash`, and that's it, but wait! We want to store **any** possible property like that.

You will need to define a `method_missing` method in your class, and implement it. You can read [this article](http://www.trottercashion.com/2011/02/08/rubys-define_method-method_missing-and-instance_eval.html) to get a sense of how ruby calls instance methods.

Good luck!