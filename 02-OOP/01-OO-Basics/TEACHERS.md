Software are not one-file programs. They are made of different files and different objects communicating with each other.

From day-one @Le Wagon, you've been manipulating classes without knowing it, `String`, `Array`, etc. They're the built-in classes. Now you'll see how to define your own classes!

In a class you'll find:

1. **data / state** => instance variables
2. **behavior**  => instance methods.

**Example**: a string is made of data (the chain of characters itself) + behavior (all the methods that can be called like `downcase`, `split`, etc.).

The class is like a cake pan. The cakes created with the cake pan are the instances of the class. That's a good way to see class and instances.

## A Car class

Let's code a `Car` class.

```ruby
class Car
end
```

- What are the characteristics of a car? How do you describe it?
- What are the characteristics of a car "at inception", at **t=0**, when we first create it? The brand? The color? The number of kilometers?

```ruby
class Car
  def initialize(color, brand)
    @color = color
    @brand = brand
    @engine_started = false
  end
end
```

### Instance variables

What are these strange notations: `@engine_started`, `@color`, `@brand`? These are instance variables, variables that represent the internal state of **each instance** and that are accessible in every instance method of the class.

#### Instance methods

Let's add some behavior to start our car.

```ruby
class Car
  def initialize(color, brand)
    @color = color
    @brand = brand
    @engine_started = false
  end
  def start_engine
    @engine_started = true
  end
end

ferrari = Car.new("red", "ferrari")
# --------------------------
#| @color => "red"          |
#| @brand => "ferrari"      |
#| @engine_started => false |
# --------------------------

peugeot = Car.new("blue", "peugeot")
# --------------------------
#| @color => "blue"         |
#| @brand => "peugeot"      |
#| @engine_started => false |
# --------------------------

ferrari.start_engine
# --------------------------
#| @color => "red"          |
#| @brand => "ferrari"      |
#| @engine_started => true  |
# --------------------------
```

You have noticed that from now on, we define methods **in the class** (not in the main program) and then these methods are called **on instances** of the class. That is why they are called instance methods.

### Accessors

How do we print some car's color?

```ruby
p my_car.color
# Read the error message when the getter is not defined!
```

Ok we need a getter

```ruby
class Car
  def color
    @color
  end
end
```

What if we have 10 instance variables (`@color`, `@brand`, `@kms`, `@engine_started`, etc.)

```ruby
class Car
  def color
    @color
  end
  def brand
    @brand
  end
  def kms
    @kms
  end
  # ...like so boring...
end
```

Well there's a shortcut

```ruby
class Car
  attr_reader :color, :brand, :km, :engine_started
end
```

This Ruby syntax is far more convenient than writing all methods manually, right? Let's do the same adding writers on `@color` and `@brand`

```ruby
class Car
  attr_writer :color, :brand
end
```

Finally we can just re-write it:

```ruby
class Car
  attr_reader :km, :engine_started
  attr_accessor :color, :brand
end
```
