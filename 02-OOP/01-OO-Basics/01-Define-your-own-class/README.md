## Background & Objectives

Grasp the basic concepts of object-oriented programming while writing your very first class.

## Specs

Choose something from the real world that you would like to model. Restaurants, vehicles, users, games, recipes.. *It's your call!*

Once chosen, create a file in the `lib` directory which has the name of your object.
For instance, if you chose to model Restaurants, create the `restaurant.rb` file:

```bash
touch lib/restaurant.rb
```

You can safely delete the `.gitkeep` file. This file is only there so that git sees the otherwise empty folder. 

## Convention

**Pay attention** to your class file and your class name. Remember, `lower_snake_case(.rb)` for file name,
`UpperCamelCase` for class name in the class definition. **Both must be singular!** Remember, the class is the structure that allows you to create lots of different restaurants (with `.new`).

### What are the inner properties of your objects?

What are the characteristics of a restaurant? Of a user? Of a game?
Choose some characteristics of your class that you want to model. They will be your **instance variables**, sometimes named **properties**.

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

### Define an instance method

Time to add some **behavior** to your class with an **instance method**.

Here's an example of how we might want to use a `start` instance method on a `Car` class:

```ruby
require_relative "lib/car"
car = Car.new("T", "Ford", 0)
car.start
```

