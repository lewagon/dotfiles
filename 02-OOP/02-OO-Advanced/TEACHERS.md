## Recap

So on the previous block you've had your first introduction to Object Oriented Programming. These are big steps in your web development career. Before we continue on that path, let's do a recap to make sure you understand the concepts.

Let's create a House class:

- As a first step we need to create the file, and filename should match class name: `house.rb`:

```ruby
# house.rb
class House
end
```

- Let's define the "constructor", the method which is going to be executed when we build objects. In Ruby this method is called `initialize`:

```ruby
def initialize(name, width, length)
  @name = name
  @width = width
  @length = length
end
```

- Now let's create a new instance of this class:

```ruby
country_side_house = House.new("My blue house", 500, 400)
p my_country_side_house #=> ?????
```

- What if you want to print out the name, width and length of the house, how would you do that? You will have to create a getter for that or otherwise you can't access it:

```ruby
def name
  return @name
end

def width
  return @width
end

def length
  return @length
end
```

- As you can see this is really annoying, if we have to do this for our 3 instance variables, it's just too much work and time consuming. Good for us there are some special methods we can use in Ruby to prevent us from having to define our own getters and setters all the time. The `attr_methods`. Let's use it:

```ruby
class House
  attr_reader :name, :width, :length

  def initialize(name, width, length)
    @name = name
    @width = width
    @length = length
  end
end

my_country_side_house = House.new("My blue house", 500, 400)
p my_country_side_house.name
p my_country_side_house.length
p my_country_side_house.width
```

## Lecture

Now time to move on to the real content of the lecture. We'll see three important parts during this block:

- Inheritance
- Class methods
- Self

Imagine you had three classes, each one to create a different type of building. Make sure you create 3 files to show the students about the `require_relative` concept again.

```ruby
# house.rb  
class House
end
```

```ruby
# skyscraper.rb
class Skyscraper
end
```

```ruby
# castle.rb
class Castle
end
```

- They share some properties. They all have a `name`, a `width` and a `length`. For every building we have a way to calculate the floor area. You can create 3 files and repeat 3 times the same thing to show them the power of inheritance later and the DRY principle.

```ruby
class House
  attr_reader :name, :width, :length
  def initialize(name, width, length)
    @name = name
    @width, @length = width, length
  end

  def floor_area
    @width * @length
  end
end

class Skyscraper
  attr_reader :name, :width, :length
  def initialize(name, width, length)
    @name = name
    @width, @length = width, length
  end

  def floor_area
    @width * @length
  end
end

class Castle
  attr_reader :name, :width, :length
  def initialize(name, width, length)
    @name = name
    @width, @length = width, length
  end

  def floor_area
    @width * @length
  end
end
```

### First chapter: Inheritance

- Wow, lots of duplicated code here... let's respect the principle Don't Repeat Yourself. Let's apply the concept of inheritance and put all common parts in the parent class. We can make our classes inherit from a more generic SuperClass/ParentClass called Building. The syntax of inheritance is pretty simple:

```ruby
class SuperClass
end

class SubClass < SuperClass
end
```

```ruby 
# building.rb
class Building
  attr_reader :name, :width, :length

  def initialize(name, width, length)
    @name = name
    @width, @length = width, length
  end

  def floor_area
    @width * @length
  end
end
```
```ruby 
# house.rb
require_relative "building" # don't forget the require_relative 'building' here

class House < Building
end

some_house = House.new("White House", 26, 51)
some_house.name #=> "White House"
some_house.floor_area #=> 1326
```

```ruby 
# skyscraper.rb
require_relative "building"

class Skyscraper < Building
end

some_skyscraper = Skyscraper.new("Empire State Building", 50, 60)
some_skyscraper.name #=> "Empire State Building"
some_skyscraper.floor_area #=> 3000
```

```ruby
# castle.rb
require_relative "building"

class Castle < Building
end

some_castle = Castle.new("Tower of London", 32, 35)
some_castle.name #=> "Tower of London"
some_castle.floor_area #=> 1120
```

- Let's add some behavior to our classes and play with it. Only a castle may have a butler, so it's a specific behavior.

```ruby
class Castle < Building
  attr_accessor :butler

  def has_a_butler?
    @butler != nil
  end
end

some_castle = Castle.new("Chambord", 156, 117)
some_castle.has_a_butler? # => false
some_castle.butler = "George"
some_castle.has_a_butler? # => true

some_house = House.new("White House", 26, 51)
some_house.has_a_butler? #=> Undefined method `has_a_butler?`
```

#### `super` keyword

We all know that a Castle in usually bigger than a House (bigger floor_area). How can we make sure that this behavior is translated into code? We need to change an inherited method. This can be done with the `super` keyword, which calls the parent's method with the same name. Now, let's refacto our classes using `super` keyword:

```ruby
class Castle < Building
  # A castle always has a garden of 300 sq. m
  def floor_area
    super + 300  # `super` calls `floor_area` of `Building`
  end
end

some_castle = Castle.new("Tower of London", 32, 35)
some_castle.floor_area # => 1420
```

As you see, `super` is making a call to the method with the same name in the parent class.

#### Wrap up the inheritance chapter

- Inheritance is used when classes need to share behavior and properties
- Subclasses inherit methods and instance variables from parents
- On top of that, subclasses can define more instance variables and methods
- Use super to access the parent method with the same name
- As with `yield`, not often will you have to define your own parent/child classes, but you need to understand how it works, cause you will often inherit your classes from classes already coded by developers.
- But you'll often inherit from Rails classes (ActiveRecord::Base, ActionController::Base, ...)

### Second chapter: Class Methods

- Remind the students about the difference between instance and class
- A class is used to create instances using the `new` method

```ruby
# castle.rb
class Castle # This is a class Castle
end
my_castle = Castle.new("Tower of London", 32, 35) # This is an instance of the Castle class
```

Instance Methods
```ruby
class Castle < Building
  def has_a_butler?
    @butler != nil
  end
end

# The has_a_butler? method is an instance method
# We can call the instance method has_a_butler? on a single Castle instance
p my_castle.has_a_butler? #=> false

# We cannot call the instance method has_a_butler on the Castle class directly
p Castle.has_a_butler? #=> Undefined method `has_a_butler?` for Castle
```

- Instance methods are called on instances
- Class methods are called on classes.

What are class methods?

- The are called on the class directly.
- `Castle.categories`

```ruby
class Castle < Building
  def self.categories
    return ["Medieval", "Norman", "Ancient"]
  end
end
```

- Note the self on the method definition. In terms of way to remember it, you can use the following metaphor: Self represents the ceiling he is inside of. Here the ceiling of self in the class. So self represents the class itself.
- You can't call class methods on instances!

```ruby 
some_castle = Castle.new("Tower of London", 32, 35)
some_castle.categories #=> Undefined method `categories`
```

When to create class methods and why?

```ruby 
class House < Building
  # [...]
end

def self.price_per_square_meter(city)
  case city
  when "Paris" then 9000
  when "Brussels" then 3000
  else raise Exception.new("No data for #{city}")
  end
end

puts House.price_per_square_meter("Paris") # => 9000
```
- In a nutshell, You create a class method if it does not need/is not relevant to a single instance. You will use class methods more than you define them.

Last week, we've seen real world examples:

```ruby
require "nokogiri"
require "json"

# Playing with existing class methods
puts Time.now # => 2014-07-15 23:19:43 +0200
puts Nokogiri::HTML::Document.parse("<h1>Hello guys</h1>")
JSON.parse('{ "key": "value", "other_key": "other_value" }')
```

`now` and `parse` are methods called on the class `Time`, `JSON`, etc. not on instances of these classes. Methods like this, as you can guess, are called **class methods** and you can create them too if you want to.

As you see, `self` represent the class itself in this context. But put inside an instance method, `self` represents the instance on which the method is called. Let's see it with a nice example to understand.


### Third chapter: Self keyword

- 2 use cases:
  - Inside a Class definition, to define Class methods (as we just did in the second chapter of the lecture)
  - Inside an instance method


- Inside a class definition - To define Class methods.
```ruby
class House
  def self.price_per_square_meter(city)
    # [...]
  end
end
```

- Inside of an instance method: self refers to the instance on which the instance method was called.

Self is not mandatory:
```ruby
class Skyscraper < Building

  def initialize(name, width, length, height)
    super(name, width, length)
    @height = height
  end 

  def type_of_owner
    if @height > 50
      "this #{self.capitalized_name} is a skyscraper for Spider-Man."
    else
      "this #{self.capitalized_name} is a skyscraper for beginners"
    end
  end

  def capitalized_name
    @name.capitalize
  end
end

nyc_skyscraper = Skyscraper.new("empire State Building", 30, 60, 381)
nyc_skyscraper.type_of_owner # => "This Empire State Building is a skyscrapper for Spider-Man."
```

When do we actually need it explicitly? Let's now see the case in which Self is mandatory
```ruby
class Butler
  def initialize(castle)
    @castle = castle # We want @castle to store an instance of Castle.
  end

  def clean_castle
    puts "#{@castle.name} is cleaned!"
  end
end

class Castle < Building
  attr_reader :butler, :ruler

  def initialize(name, width, length, ruler)
    super(name, width, length)
    @ruler = ruler
    @butler = Butler.new(???) # We need to pass the current instance of Castle
  end
end

class Castle < Building
  attr_reader :butler, :ruler

  def initialize(name, width, length, ruler)
    super(name, width, length)
    @ruler = ruler
    @butler = Butler.new(self)
  end

  def ownership_details
    "#{@name} is ruled by #{ruler_name}"
  end

  def ruler_name
    @ruler.capitalize
  end
end

aladdin_castle = Castle.new("The magical Sultan palace", 410, 520, 'Aladdin')
aladdin_castle.ownership_details # => "The magical sultan palace is ruled by Aladdin"
aladdin_castle.butler.clean_castle # => "The magical sultan palace is cleaned!"
```
As you see, here we need `self` in `Castlet#initialize` in order to build a Butler who is aware of the Castle she/he works for!

As a key takeway, self represents the ceiling he is inside of, if its ceiling is a class, it represents the class, if it is inside of an instance method it represents the instance(mandatory or not)


