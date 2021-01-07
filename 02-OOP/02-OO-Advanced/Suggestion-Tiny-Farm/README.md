## Background and Objectives

TODO: chaque classe un fichier
TODO: orienter interface en premier

This challenge is a farming game that you'll be building step by step.
TODO:
You learnt how to build classes, in this challenge you'll discover more about the benefits of inheritance.

At any time, you can crash test the classes in `scenario.rb`. This file is all yours, there is not rake on it and it's very important that you feel confortable with everything your create. You can build a small scenario of your liking by planting some crops and shelter new animals, that's how we learn the best. Build, break things and enjoy!


## Specs

Run the game to have a first glance at what you're building.

```ruby
ruby lib/interface.rb
```
TODO:
The player can plant corn and rice in the fields. There's also a barn to shelter cows and a coop for the chickens. Maybe you noticed some more options but let's keep them for later.

What you need to think about right know is how to organize the code. Discuss with your buddy, how many classes do you think you need, and how would you structure them? 


### Crops

Crops **age** every day and produce **grains**.

#### Create the first class `Corn`
To start your farm, create a first class named `Corn` in `crop.rb`. Write those three methods:
 - `initialize`: sets two intance variables `@grains` and `@age` to zero.
 - `ripe?` returns true if the crop has produced some grains and false otherwise.
 - `one_day_passes!`: age the crop by one day. When it reaches 3 days, it starts producing 10 grains on daily basis.

You'll find an example of tests in `scenario.rb`, make your own.

Now let's plant some corn in game! Open `interface.rb`:
 - complete the "crop" menu part: instanciate a `Corn` crop and add it to the array `corn_field`
 - run the game and test it, one corn crop should appear in the field.

#### Duplicate `Corn` to create `Rice`
Create a `Rice` class in `crop.rb` and duplicate all the methods from the `Corn` class.
  - adjust the grains production in `one_day_passes!`: when the rice crop reaches 2 days, it starts producing 5 grains every day.
  - add a specific method on Rice that differs from the corn: `irrigate!` adds 40 grains any time it is called.

Make rice crop playable in the game:
  - in `interface.rb`, complete the "rice" menu part.

#### Refactor with the `Crop` class
The two crops share many similarities, it's time to refactor to keep the code DRY:
  - Create a class `Crop` in `crop.rb` and move the common methods into it.
  - Make `Corn` and `Rice` classes inherit from `Crop`.
  - Don't forget to use `super` in `one_day_passes!` to call the parents method

Remember how to extend a class
```ruby
class Castle < Building
end
```


Let's review what you've built do far. First you created the children classes, then you refactored with a parent class.
What you've done here TODO: 2 step create the children classes and deduplicate with the parent class, from bottom to top classes. In the next chapter, you'll explore the other way round.


### Animals
You are now familiar with inheritance, let's try to create the classes starting from the parent class!

- Create the structures of the three classes `Animal`, `Cow` and `Chicken` all at once. **Focus on the structure** and the correct inheritance.
- 




## Take away


