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

#### Super bicycle 
* in `bicycle.rb`, replace all the `"?"` in the `#quizz` method by the correct integer. Do you understand what the `super`keyword does? If you get it, you can re-implement `JellyBean#initialize` using the `super` keyword.

## Learning Badges
- Why do we make classes inherit from others? What's the point? 
- What's the syntax to do that? 
- What's the keyword to extend the behavior of an inherited method?
- Let's assume we have `class Bike < Vehicle` and we defined `Vehicle#drive`. If we implement `Bike#drive` which method will apply to `Bike` objects, `Vehicle#drive` or `Bike#drive` ? 
- Can you find some examples of object inheritance in Rails? For which objects?
- Digression: About `nil?` and inheritance, did you know ?
In the ruby doclook for the ruby implementation of the `nil?` method in the `NilClass` (which is the class of the nil object), and in the `Object` class which is the superclass of all ruby objects (the gran-daddy). Now try to figure out what happens exactly when you call `some_object.nil?`. If you find out the answer with so few clues, we'll pay you a beer :)