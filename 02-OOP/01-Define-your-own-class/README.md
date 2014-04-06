### Choose something generic to model
Restaurants, vehicles, users, games, recipes.. **It's your call !**

### What are the instance variables of your objects ?
What are the characteristics of a restaurant ? of a user ? of a game ? 
Choose some characteristics of your class you want to model. They will be your class instance variables, the `@things`.

### Define the constructor
`initialize` is the instance method called when instantiating a new object. For example :

```ruby
class Car
  # Instance method called when creating objects
  def initialize(model, brand, kilometers) 
    @model = model
    @brand = brand
    @kilometers = kilometers
  end
end

second_hand_panda = Car.new("Panda 4x4", "Renault", 30000) # What happened ?
# 1. Car#new creates a new object
# 2. Then calls the initialize instance method on it !
# 3. This method defines @model, @brand and @kilometers instance variables

new_testarossa = Car.new("Testarossa", "Ferrari", 0) 
# Same principles on a new Car object 
```

Now define the `initialize` method on the class you chose !

### Define accessors to your instance variables
Define setters and getters for your instance variables and test them in your main program

### Objectives

**DON'T GO TO THE NEXT STEP BEFORE SHOWING YOUR PROGRAM TO A COACH :)**

It will ensure your understand sufficiently the **concepts and syntax** of :
- class and objects
- instance variables and instance methods !
- the `initialize` constructor
- getters and setters methods
