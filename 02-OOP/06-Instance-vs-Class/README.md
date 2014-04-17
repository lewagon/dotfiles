## Background & Objectives

- understand the difference between a class method and an instance method. 

When using a gem or a module of the standard library, you will often have to use class methods, which are **CALLED DIRECTLY ON THE CLASS**, not on instances of the class. Consider the following lines in IRB

```ruby
"this is a string object".upcase
["this", "is", "an", "array", "object"].shuffle
Time.now
a_time_object = Time.now
a_time_object.hour
```

Do you clearly distinguish one method that differs from the others in the examples above? Make sure you can find the intruse!

## Specs
- Write a `Restaurant` class with attributes of your choice (`name`, `address`, `type_of_food`...), and associated getters and setters if necessary (if you want a funnier class).
- **constraint:** your Restaurant class must have at least `@average_rating` and `@city` as instance variables.
- Define an instance method `#rate` enabling to rate a restaurant object. This method should re-compute the restaurant average rating `@average_rating` every time it's called with a new rating. This average rating should be accessible. 

- Define a **class** method `#filter_by_city(restaurants, city)` that returns all the restaurants in a given city (this return should be an array of restaurant objects). For instance:

```ruby
jules_verne = Restaurant.new("paris", "Jules Verne") 
tour_d_argent = Restaurant.new("paris", "Tour d'argent") 
bocuse = Restaurant.new("lyon", "Paul Bocuse") 
restos = [jules_verne, tour_d_argent, bocuse] 
Restaurant.filter_by_city(restos,"lyon") # => [bocuse]
```

## Learning Badges

Are you able to answer the following questions (go into the doc if necessary)?

- Among `#rate` and `#filter_by_city`, which one is an instance method? Which one is a class method?

- For each of the following methods, is it an instance method or a class method? 

```
- Date#today
- Twitter::REST::Client#follow (see https://github.com/sferik/twitter)
- String#upcase
- Nokogiri::HTML::Document#parse (http://nokogiri.org/Nokogiri/HTML/Document.html)
- Array#shuffle
```

- **optional:** Between the `new` and `initialize` methods. Which one is an instance method? Which one is a class method? How do they articulate together? Which one is sub-calling the other?
