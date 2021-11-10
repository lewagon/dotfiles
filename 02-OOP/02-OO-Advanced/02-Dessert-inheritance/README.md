## Background & Objectives

So why do we need inheritance? Because we don't want to have the same logic repeated in multiple places in our code! If multiple classes share some of the same behaviour then it may be time to introduce inheritance.

e.g. You want to code a generic `Parser` with the basic features (read a file, store its content, etc.). After a while, you decide you want to create more specific parsers like `XmlParser` or a `JsonParser` to handle specific formats. By making these new classes **children** of the `Parser` class, it means you don't have to re-write all the basic methods created in Parser, and you only need to create the methods that are **specific** to your XML or JSON needs. So inheritance keeps things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself)!

Read more about inheritance in [ruby learning](http://rubylearning.com/satishtalim/ruby_inheritance.html).

## Specs

#### Dessert inheritance

Complete the class `Dessert`

- Add getters and setters for `name` and `calories`
- Instance methods `Dessert#healthy?` should return `true` if a dessert has less than 200 calories
- `Dessert#delicious?` should return `true` for all desserts 😊

Complete `JellyBean` which inherits from `Dessert`

- Add a getter for `flavor`
- Modify `delicious?` to return `false` if the flavor is `"black licorice"` (but still `true` for everything else).

#### Super bicycle

- In `bicycle.rb`, replace all the `"?"` in the `#quiz` method by the correct integer.

#### (Optional)

- Do you know what the `super` keyword does? If you do, use it to rewrite your `JellyBean#initialize`, in `dessert.rb`, using the `super` keyword.

## Key learning points

- Why do we make classes inherit from others? What's the point?
- What's the keyword to extend the behavior of an inherited method?
- Let's assume we have `class Bike < Vehicle` and we defined `Vehicle#drive`. If we implement `Bike#drive` which method will apply to `Bike` objects, `Vehicle#drive` or `Bike#drive`?
- Digression: About `nil?` and inheritance. In the Ruby doc, look for the implementation of the `nil?` method in the `NilClass`, and in the `Object` class which is the superclass of all Ruby objects. Now try to figure out what happens exactly when you call `an_example_object.nil?`.
