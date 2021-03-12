## Background and Objectives

Here is a little farming scenario, you'll build step by step to discover the benefits of inheritance.

It's a challenge where you have a lot of autonomy because it's how you'll learn the best! Follow the guidelines to develop the classes, then build a small scenario of your liking by planting some crops in your farm... Build, break things and enjoy!

![Crops](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/tiny-farm/crops.svg?sanitize=true)

## Specs

The farm has two kinds of **crops** (rice and corn).

Discuss with your buddy: how many classes do you think you need, and how would you structure them? 

Don't rake now! Wait until the very end of the challende, try to code everything by yourself first!


### Create the first class `Corn`
To start your farm, create a first class named `Rice` in `rice.rb`. Write those three methods:
  - `initialize`: sets the instance variable `@grains` to zero.
  - `water!`: adds 10 grains anytime it is called.
  - `ripe?` returns true if there are at least 30 grains.

Start your diary in `farming_diary.rb`:
The file contains some guidelines to help you figure out what you can do. But this it's your playground! You can add, change, delete and create everything you like. There is no rake on it and it's very important that you feel confortable with your own code.

Run your diary:

```bash
ruby lib/farming_diary.rb
```

Here is an example of a farmer's diary:

```bash
📝 Day One: planting corn
Today, I planted 1 corn crop in the field
After a good watering, the corn produced 5 grains
The corn crop is not ripe
```


### Duplicate `Corn` to create `Rice`
Create a `Rice` class in `rice.rb` and duplicate all the methods from the `Corn` class.
  - Adjust the grains production in `water!`: it adds 5 grains 
  - `ripe?` is the same.
  - Rice has a specific method called `transplant!` which produces 40 grains.

Continue your diary by planting some rice in the field.


### Refactor with the `Crop` class
If you feel unconfortable with duplicated code, you're right! That's where inheritance comes to the rescue: extract the commom methods and variables to keep the code DRY (Don't Repeat Yourself).
Now let's review our two classes, the crops share many similarities, it's time to refactor them and introduce a parent class:
  - Create a class `Crop` in a file `crop.rb` and move the common methods into it.
  - Make `Corn` and `Rice` classes inherit from `Crop`.

Reminder on how to extend a class:

```ruby
class Castle < Building
end
```

In your diary, don't miss the important part of watering the two crops (rice and corn together) in the same iteration! Take advantage that they both have the method `water!`.
