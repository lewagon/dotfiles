## Recap

So yesterday you've had your first introduction into Object Oriented Programming. These are big steps in your web development career. Before we continue on that path, let's do a recap to make sure you understand the concepts.

Let's create a Restaurant class:

- As a first step we need to create the file, and filename should match class name: `restaurant.rb`:

```ruby
# restaurant.rb
class Restaurant
end
```

- Let's define the "constructor", the method that is going to construct our objects. In ruby this method is called `initialize`:

```ruby
def initialize(name, city, capacity, category)
  @name = name
  @city = city
  @capacity = capacity
  @category = category
end
```

- Now let's create a new instance of this class:

```ruby
yaki = Restaurant.new("yaki", "Brussels", 35, "thai")
```

- What if you want to print out the name of yaki, how would you do that? You will have to create a getter for that or otherwise you can't access it:

```ruby
def name
  return @name
end
```

- Now let's say that the capacity changed and you need to change this for your yaki object, then you need a setter. But you should also create a getter to check if we actually changed it

```ruby
def capacity=(capacity)
  @capacity = capacity
end

def capacity
  return @capacity
end
```

- As you can see this is really annoying, if we have to do this for our 4 instance variables, it's just too much work and time consuming. Good for us there are some special methods we can use in Ruby to prevent us from having to define our own getters and setters all the time. The `attr_methods`. Let's refacto our class:

```ruby
class Restaurant
  attr_reader :name
  attr_accessor :capacity

  def initialize(name, city, capacity, category)
    @name = name
    @city = city
    @capacity = capacity
    @category = category
  end
end

yaki = Restaurant.new("yaki", "Brussels", 35, "thai")
p yaki.name
p yaki.capacity
yaki.capacity = 40
p yaki.capacity
```

- One more thing: let's add cool instance methods on our Restaurant class to handle reservations and opening hours.

```ruby
class Restaurant
  attr_reader :name, :clients
  attr_accessor :capacity

  def initialize(name, city, capacity, category)
    @name = name
    @city = city
    @capacity = capacity
    @category = category

    @clients = []
  end

  def add_reservation(name)
    @clients << name
  end

  def closed?
    !open?
  end

  def open?
   Time.now.hour > 18 and Time.now.hour < 22
  end
end

yaki = Restaurant.new("yaki", "Brussels", 35, "thai")
p yaki.name
p yaki.capacity
yaki.capacity = 40
p yaki.capacity

yaki.add_reservation("lien")
p yaki.clients
p yaki.open?

```

## Lecture

Now time to move on to the real content of the lecture. We'll see three important parts today:

- Inheritance
- Class methods
- `self`

### Inheritance

#### Restaurants

Let's stay in the food business but be more specific about restaurant kinds (because we're French 😉)

```ruby
class Fastfood
  attr_reader :name, :city, :preparation_time, :clients

  def initialize(name, city, preparation_time)
    @name = name
    @city = city
    @preparation_time = preparation_time
    @clients = []
  end

  def add_reservation(name)
    @clients << name
  end
end

class StarRestaurant
  attr_reader :name, :city, :stars, :clients

  def initialize(name, city, stars)
    @name = name
    @city = city
    @stars = stars
    @clients = []
  end

  def add_reservation(name)
    @clients << name
  end
end
```

Wow, lots of duplicated code here... Let's apply inheritance and put all common parts in the parent class:

```ruby
class Restaurant
  attr_reader :name, :city, :clients

  def initialize(name, city)
    @name = name
    @city = city
    @clients = []
  end

  def add_reservation(name)
    @clients << name
  end
end
```

Now how can we make our classes inherit from this? The syntax is pretty simple:

```ruby
class SuperClass
end

class SubClass < SuperClass
end
```

So for us:

```ruby
class Fastfood < Restaurant
  attr_reader :preparation_time

  def initialize(name, city, preparation_time)
    @name = name
    @city = city
    @preparation_time = preparation_time
    @clients = []
  end
end

class StarRestaurant < Restaurant
  attr_reader :stars

  def initialize(name, city, stars)
    @name = name
    @city = city
    @stars = stars
    @clients = []
  end
end

mcdonald = Fastfood.new("mcdo", "brussels", 5)
puts "#{mcdonald.name} takes #{mcdonald.preparation_time} minutes"
mcdonald.add_reservation("boris")
```

Let's add some behavior to our classes and play with it.

```ruby
class Restaurant
  def print_clients
    @clients.each_with_index do |client, index|
      puts "#{index + 1} - #{client}"
    end
  end
end

class FastFood < Restaurant
end

class StarRestaurant < Restaurant
  def print_clients
    puts "you don't have access to star restaurant clients!"
  end
end

mcdonald = Fastfood.new("mcdo", "berlin", 5)
mcdonald.add_reservation("boris")
mcdonald.add_reservation("seb")
mcdonald.add_reservation("romain")
mcdonald.print_clients

fancy_place = StarRestaurant.new("fancy", "paris", 4)
fancy_place.add_reservation("boris")
fancy_place.add_reservation("seb")
fancy_place.add_reservation("romain")
fancy_place.print_clients
```

Let's comment the outputs. As you see, if you apply an instance method on an object, ruby will first look in the object class if there is a corresponding method, if not it will look for this method in the parent class.

#### `super` keyword

Now, let's refacto our classes using `super` keyword:

```ruby
class Restaurant
  attr_reader :name, :city, :clients

  def initialize(name, city)
    @name = name
    @city = city
    @clients = []
  end

  def add_reservation(name)
    @clients << name
  end

  def print_clients
    @clients.each_with_index do |client, index|
      puts "#{index + 1} - #{client}"
    end
  end
end

class Fastfood < Restaurant
  attr_reader :preparation_time

  def initialize(name, city, preparation_time)
    super(name, city)
    @preparation_time = preparation_time
  end

  def print_clients
    puts "----#{@name}----"
    super
    puts "----------------"
  end
end

class StarRestaurant < Restaurant
  attr_reader :stars

  def initialize(name, city, stars)
    super(name, city)
    @stars = stars
  end

  def print_clients
    puts "you don't have access to star restaurants clients!"
  end
end

mcdonald = Fastfood.new("mcdo", "berlin", 5)
mcdonald.add_reservation("boris")
mcdonald.add_reservation("seb")
mcdonald.add_reservation("romain")
mcdonald.print_clients

fancy_place = StarRestaurant.new("fancy", "paris", 4)
fancy_place.add_reservation("boris")
fancy_place.add_reservation("seb")
fancy_place.add_reservation("romain")
fancy_place.print_clients
```

As you see, `super` is making a call to the method with the same name in the Super-Class (other word for Parent Class).

#### Disclaimer

As with `yield`, not often will you have to define your own parent/child classes, but you need to understand how it works, cause you will often inherit your classes from classes already coded by developers.

### Class Methods

Last week, we've seen things like this:

```ruby
require "nokogiri"
require "json"

# Playing with existing class methods
puts Time.now # => 2014-07-15 23:19:43 +0200
puts Nokogiri::HTML::Document.parse("<h1>Hello guys</h1>")
JSON.parse('{ "key": "value", "other_key": "other_value" }')
```

`now` and `parse` are methods called on the class `Time`, `JSON`, etc. not on instances of these classes. Methods like this, as you can guess, are called **class methods** and you can create them too if you want to.

```ruby
# Defining your own class methods

class Restaurant
  attr_accessor :name, :city, :clients

  def self.categories
    return %w(bistrot japanese italian french)
  end
  def self.price_for(category)
    case category
    when "japanese"
      price = 13
    when "italian"
      price = 20
    end
    return price
  end

  def initialize(name, city)
    @name, @city = name, city
    @clients = []
  end

  def print_clients
    @clients.each_with_index do |client, index|
      puts "Client ##{index + 1} => #{client}"
    end
  end
end

puts Restaurant.categories
puts Restaurant.price_for("italian")
```

As you see, `self` represent the class itself in this context. But put inside an instance method, `self` represents the instance on which the method is called. Let's see it with a nice example to understand.

### Self keyword

```ruby
class Chief
  attr_accessor :name, :years, :restaurant
  def initialize(name, years, restaurant)
    @name, @years = name, years
    @restaurant = restaurant
  end
end

class Restaurant
  attr_accessor :name, :city, :clients, :chief

  def initialize(name, city, chief_name, chief_years)
    @name, @city = name, city
    @clients = []
    @chief = Chief.new(chief_name, chief_years, self)
  end

  def print_clients()
    @clients.each_with_index do |client, index|
      puts "Client ##{index + 1} => #{client}"
    end
  end
end

bristol = Restaurant.new("Le Bristol", "Paris", "Frechont", 20)

frechont = bristol.chief

puts "#{frechont.restaurant.name}'s chief is #{frechont.name}"
puts "He's been cooking for about #{frechont.years} years"
```

As you see, here we need `self` in `Restaurant#initialize` in order to build a chief who is aware of the restaurant she/he cooks for! Otherwise it would be a terrible chief..
