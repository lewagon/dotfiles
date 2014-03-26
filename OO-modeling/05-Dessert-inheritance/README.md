Inheritance is a core concept of OO programming. It enables to define subclasses that inherit from superclasses (we speak of children and parents) and to transfer methods from the parent class to its children. For instance you may want to code a generic class `Parser` which have some elementary features (reading the file, printing a welcome message, storing the file's content in a string). Then you may code many children class like `XmlParser` or `JsonParser` for parsing specific formats. By making these classes children of the `Parser` class, they will inherit basic methods from this superclass. Of course, they will also have their own specific methods. For instance, they are likely not to analyze the string built from the file in the same way, depending whether it's an XML file or a CSV, etc... 

Read more about inheritance in [ruby learning](http://rubylearning.com/satishtalim/ruby_inheritance.html).

### Dessert inheritance

* Create a class `Dessert` with getters and setters for name and calories. Define instance methods `healthy?`, which returns true if a dessert has less than 200 calories, and `delicious?`, which returns true for all desserts.

* Create a class `JellyBean` that extends `Dessert`, and add a getter and setter for `flavor`. Modify `delicious?` to return false if the flavor is "black licorice" (but delicious? should still return true for all other flavors and for all non-JellyBean desserts).

Here is the framework (you may define additional helper methods) :

```ruby
class Dessert
  def initialize(name, calories)
    # your code goes here
  end

  def healthy?
    # your code goes here
  end

  def delicious?
    # your code goes here
  end
end

class JellyBean < Dessert
  def initialize(name, calories, flavor)
    # your code goes here
  end

  def delicious?
    # your code goes here
  end
end
```

### Use super to call for superclass method
* Study the bycicle example below to understand what super does

* **Once you get it, re-implement `JellyBean#initialize` using the `super` keyword.**

```ruby
class Bicycle  
  attr_reader :gears, :wheels, :seats  
  def initialize(gears = 1)  
    @wheels = 2  
    @seats = 1  
    @gears = gears  
  end  
end  
  
class Tandem < Bicycle  
  def initialize(gears)  
    super(gears)
    @seats = 2  
  end  
end  

# our Bicycle object
b = Bicycle.new
puts b.gears  
puts b.wheels  
puts b.seats  

# our Tandem object inheriting from bicycle
t = Tandem.new(2)  
puts t.gears  
puts t.wheels  
puts t.seats
```
#### Digression: About `nil?` and inheritance, did you know ?
In http://ruby-doc.org/core-2.0.0/ look for the ruby implementation of the `nil?` method in the `NilClass` (which is the class of nil object), and in the `Object` class which is the superclass of all ruby objects (the gran-daddy). Now try to figure out what happens exactly when you call `some_object.nil?`. If you find out the answer with so few clues, we'll pay you a beer :)