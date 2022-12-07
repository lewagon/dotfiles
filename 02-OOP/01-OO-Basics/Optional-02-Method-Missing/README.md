## Background & Objectives

This is a very advanced exercise. We will now play with internalities of Ruby, and the way it handles `NoMethodError`.

### Specs

We want to create a `UberHash` class which will be able to store anything. A classic hash works like this:

```ruby
classic_hash = Hash.new
classic_hash[:color] = "red"
classic_hash[:color]
# => "red"
```

But we want to do this instead:

```ruby
uber_hash = UberHash.new
uber_hash.color
# => nil

uber_hash.color = "red"
uber_hash.color
# => "red"
```

You might think that you just have to put an `attr_accessor :color` on `UberHash`, and that's it, but wait! We want to store **any** possible property like that.

If you try to call an instance method that wasn't defined in the class, Ruby calls a `method_missing` built-in method that raises a `NoMethodError`.

To prevent the `NoMethodError` to be raised, you can define **your own** `method_missing` instance method in your class, and implement it to do whatever you want!

You can read [this article](https://manny.codes/3-practical-uses-of-ruby-method-missing/) to get a sense of how and when Ruby calls `method_missing` ([docs here](https://ruby-doc.org/core-2.7.4/BasicObject.html#method-i-method_missing)).

You may also want to read how Ruby lets you dynamically [get](https://ruby-doc.org/core-2.7.4/Object.html#method-i-instance_variable_get) or [set](https://ruby-doc.org/core-2.7.4/Object.html#method-i-instance_variable_set) an instance variable.

Good luck!
