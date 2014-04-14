## Background & Objectives

Grasp the basics of object-oriented programming while writing your very first class.

## Specs

Choose something from the real world you want to model. Restaurants, vehicles, users, games, recipes.. *It's your call !*

Once chosen, create a file in the `lib` directory which has the name of your object.
For instance, if you chose to model Restaurants, create the `restaurant.rb` file:

```bash
$ touch lib/restaurant.rb
```

### What are the inner properties of your objects?

What are the characteristics of a restaurant? of a user? of a game?
Choose some characteristics of your class you want to model. They will be your **instance variables**, the `@properties`.

### Define the constructor

`initialize` is the instance method called when calling `new` on your class. For instance:

```ruby
class Car
  def initialize(model, brand, kilometers)
    @model = model
    @brand = brand
    @kilometers = kilometers
  end
end

second_hand_panda = Car.new("Panda 4x4", "Renault", 30_000)

new_testarossa    = Car.new("Testarossa", "Ferrari", 0)
```

Now define the `initialize` method on the class you chose!

### Define accessors to your instance variables

Define setters and getters for your instance variables and test them inside `irb`.
For instance:

```bash
$ irb
irb> require_relative "lib/restaurant.rb"
irb> restaurant = Restaurant.new("La Palmeraie")
irb> restaurant.name
```

## Learning Badges

Show your code to a teacher. He will ensure your understand sufficiently the **concepts and syntax** of:

- class and objects
- instance variables and instance methods!
- the `initialize` constructor
- getters and setters methods

## Tips & Resources

You can have a look at this [beginner's guide](http://docs.ruby-doc.com/docs/beginner-fr/xhtml/ch04s02.html) in French.