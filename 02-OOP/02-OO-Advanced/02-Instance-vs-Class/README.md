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
- Create a `Restaurant` class with two instance variables, `@city` and `@name`, set with the two parameters of `initialize`.
- Define an instance method `#rate(new_rate)` enabling to rate a restaurant object. This method should re-compute the restaurant average rating `@average_rating` every time it's called with a new rating. This `@average_rating` should be accessible to the external world.
- Define a **class** method `#filter_by_city(restaurants, city)` that returns all the restaurants in a given city (this return should be an array of restaurant objects). For instance:

```ruby
jules_verne = Restaurant.new("paris", "Jules Verne")
tour_d_argent = Restaurant.new("paris", "Tour d'argent")
bocuse = Restaurant.new("lyon", "Paul Bocuse")
restos = [jules_verne, tour_d_argent, bocuse]
Restaurant.filter_by_city(restos,"lyon") # => [ #<Restaurant:0x007f9a43bb7eb8 @city="lyon", @name="Paul Bocuse"> ]
```

## Key learning points

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
