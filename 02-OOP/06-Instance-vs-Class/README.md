## Background & Objectives

- understand the difference between a class method and an instance method. 

When using a gem or a module of the standard library, you will often have to use class methods, which are **CALLED DIRECTLY ON THE CLASS**, not on instances of the class. Consider the following lines in IRB

```bash
"this is a string object".upcase
["this", "is", "an", "array", "object"].shuffle
Time.now
a_time_object = Time.now
a_time_object.hour
```

Do you clearly distinguish one method that differs from the others in this example? Make sure you do!


## Specs
- Write a `Restaurant` class with attributes of your choice (`name`, `address`, `type_of_food`...), and associated getters and setters if necessary (if you want a funnier class).
- **constraint:** your Restaurant class must have an `@average_rating` instance variable!
- Define an instance method `#rate(rating)` enabling to rate a restaurant object. This method should re-compute the restaurant average rating `@average_rating` every time it's called with a new rating. This average rating should be accessible. 

- Define a **class** method `#categories` that return all the categories of Restaurant. **Constraint:** the return of `#categories` should be an array of strings, with at least these values =>`"thai"`, `"italian"`, `"bistrot"`. 

- **[VERY VERY VERY OPTIONAL]** Enhance your method `rate(rating)` so that it also updates a total number of ratings **for all restaurants**, which could be a useful info to print (to show to the world how much your resto app is used !!). Which kind of variable will you use to store this total number of ratings ? What type of accessors do you need to access this number of ratings running `Restaurant.number_of_ratings`. You may want to use a "class instance variable", which is a very advanced pattern :) Ask for help if you have a hard time on this!

## Learning Badges

Are you able to answer the following questions?

- Among `#rate` and `#categories`, which one is an instance method? Which one is a class method?

- For each of the following methods, is it an instance method or a class method? `Date#today`, `Twitter::REST::Client#follow` (see [twitter gem doc](https://github.com/sferik/twitter)), `String#upcase`, `Nokogiri::HTML::Document#parse` (see [nokogiri doc](http://nokogiri.org/Nokogiri/HTML/Document.html)), `Array#shuffle`.

- **optional:** Between the `new` and `initialize` methods. Which one is an instance method? Which one is a class method? How do they articulate together? Which one is sub-calling the other?