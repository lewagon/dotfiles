## Background and Objectives

Here is a little farming scenario, you'll build step by step to discover the benefits of inheritance.


## Specs

The farm has two kinds of **crops** (rice and corn).

![Crops](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/crops.svg?sanitize=true)

Discuss with your buddy: how many classes do you think you need, and how would you structure them? 

Don't `rake` now! Wait until the very end of the challenge, try to code everything by yourself first!


### `Corn` class
To start your farm, create a first class named `Corn` in `corn.rb`. Write those three methods:
  - `initialize`: sets the instance variable `@grains` to zero.
  - `water!`: adds 10 grains anytime it is called.
  - `ripe?` returns true if there are at least 30 grains.

Open `farming_diary.rb`, and take care of the instructions below **"Day One"**.
There is no `rake` for this file, it's a playground to test your class. The guidelines help you figure out what you can do but you can add more tests if you like and tell your own story.

Run your diary:

```bash
ruby lib/farming_diary.rb
```

Here is an example of "Day One" in the diary:

```bash
📝 Day One: planting corn
Today, I planted 1 corn crop in the field
After a good watering, the corn produced 5 grains
The corn crop is not ripe
...
```

**Hint:** don't forget `require_relative 'crop'` at the top of the file.


### `Rice` class
Create a `Rice` class in `rice.rb` and copy/paste all the methods from the `Corn` class.
  - Adjust the grains production in `water!`: it adds 5 grains.
  - `ripe?` is the same.
  - `Rice` has a specific method called `transplant!` which produces 10 grains.

Continue your farming diary by planting some rice on **"Day Two"**.


### Refactor
If you felt uncomfortable when copy/pasting code, you were right! Duplicating code is more maintenance and a source of errors. That's where inheritance comes to the rescue to keep the code DRY (Don't Repeat Yourself).
The crops share many similarities, refactor them:
  - Introduce a parent class named `Crop` and move the shared methods into it.
  - Make `Corn` and `Rice` classes inherit from `Crop`.

Reminder on how to extend a class:

```ruby
class Castle < Building
end
```

In your diary, fill **"Day Three"**. Don't miss the important part of watering the two crops (rice and corn together) in the same iteration! Take advantage that they both have the method `water!`.


## Take away

Now it's time to `rake`!
Congratulations on taking time to test the classes before running the `rake`. It's an important path in your learning journey as a developer gaining autonomy.
