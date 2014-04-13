## Background & Objectives
Inheritance is a core concept of OO programming. It enables to "transfer" methods by defining subclasses that inherit from superclasses (we also speak of children and parents). A child class will inherit from its parents' methods. Example: you want to code a generic `Parser` with elementary features (able to read a file, store its content, etc..). After a while, you decide you want more specific parsers like an `XmlParser` or a `JsonParser` to handle specific formats. By making these new classes children of the `Parser` class, they will inherit from its basic methods (we also speak of its public interface). Of course, they will extend this interface with their own specific methods. For instance, they are likely to have specific parsing methods to treat a file differently whether it's an XML file, a CSV, a JSON, etc... 

Read more about inheritance in [ruby learning](http://rubylearning.com/satishtalim/ruby_inheritance.html).

## Specs

#### Dessert inheritance

Complete the class `Dessert` :
- add getters and setters for name and calories. 
- instance methods `Dessert#healthy?` should return `true` if a dessert has less than 200 calories
- `Dessert#delicious?` should return `true` for all desserts :)


Complete `JellyBean` which extends `Dessert`
- add a getter and setter for `flavor`. 
- Modify `delicious?` to return false if the flavor is `"black licorice"` (but `delicious?` should still return true for all other flavors and for all non-JellyBean desserts).

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