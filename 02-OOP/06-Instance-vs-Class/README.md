### An example of class method : the fake parser
Class methods may be used in association with blocks to define "launcher" methods as `run`, `start`, `begin`, etc...
* Try to understand our `FakeParser` example and guess what the output of this program will be
* Then test it and compare the result with your expectation !

```ruby
class FakeParser
  
  def self.start(text_file, &block)
    block.call(FakeParser.new(text))
  end

  def initialize(text_file)
    @text_file = text_file 
  end
   
  def parse
    puts "Parsing beginning...."
    10.times {puts "Fake parsing of '#{@text_file}' in course.."}
    puts "End of Parsing :)"
    return nil
  end
  
end
  
FakeParser.start("some_text.txt") do |fp|
  fp.parse
end
```

### Your turn
* Write a `Restaurant` class with appropriate attributes (`name`, `address`, `rating`, `type_of_food`) and associated getters and setters if necessary. Your only constraint is to have a `@rating` attribute.

* Define an instance method `rate(rating)` enabling to rate a Restaurant object. This method should re-compute the restaurant average rating `@avg_rating` every time it's called with a new rating. This average rating should be accessible. 

* Enhance the `rate(rating)` method so that it also updates the total number of ratings **for all restaurants** (which could be useful info to print, to show to the world how much your resto app is used !!). Which kind of variable will you use to store the number of ratings ? 

* Code a **class** getter method `number_of_ratings` which returns the total number of ratings. How would you re-code this method using the `attr_reader` keyword?

* Do not forget to write tests in the driver code for each method you implement !

#### Digression: about the `new` and `initialize` methods.
Which one is an instance method ? Which one is a class method ? How do they articulate together ? Which one is sub-calling the other ?