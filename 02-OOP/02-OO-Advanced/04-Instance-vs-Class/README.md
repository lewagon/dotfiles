## Background & Objectives

- understand the difference between a class method and an instance method.

When using a gem or a module of the standard library, you will have to use class methods that are **CALLED DIRECTLY ON THE CLASS**, not on instances of the class. Consider the following lines in IRB:

```ruby
"this is a string object".upcase
["this", "is", "an", "array", "object"].shuffle
Time.now
a_time_object = Time.now
a_time_object.hour
```

Can you spot the one method that differs from the others? Make sure you can find the intruder!

## Specs

- Create a `Restaurant` class with two instance variables, `@city` and `@name`, set with the two parameters of `initialize`.
- Define an instance method `#rate(new_rate)` enabling the rating of a restaurant object. This method should re-compute the restaurant average rating `@average_rating` every time it's called with a new rating. This `@average_rating` should be accessible to the external world.
- Define a **class** method `.filter_by_city(restaurants, city)` that returns all the restaurants in a given city (this return should be an array of restaurant objects). For instance:

```ruby
jules_verne = Restaurant.new("paris", "Jules Verne")
bluebird = Restaurant.new("london", "Bluebird")
daniel = Restaurant.new("new york", "Daniel")
restaurants = [jules_verne, bluebird, daniel]
Restaurant.filter_by_city(restaurants, "london") # => [ #<Restaurant:0x007f9a43bb7eb8 @city="london", @name="Bluebird"> ]
```

## Key learning points

Are you able to answer the following questions? (Go into the doc if necessary)

- Among `#rate` and `.filter_by_city`, which one is an instance method? Which one is a class method?
- Look at the list below. Which ones are which?

```ruby
Date.today
Twitter::REST::Client#follow (see https://github.com/sferik/twitter)
String#upcase
Nokogiri::HTML::Document.parse #(see http://www.rubydoc.info/gems/nokogiri/Nokogiri/XML/Document)
Array#shuffle
```

- **optional:** Looking at the `new` and `initialize` methods, which one is an instance method? Which one is a class method? How do they relate to each other? Which one is sub-calling the other?
