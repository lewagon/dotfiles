## Recap

So on the previous block you've had your first introduction to Object Oriented Programming. These are big steps in your web development career. Before we continue on that path, let's do a recap to make sure you understand the concepts.

Let's create a `Wizard` class:

- As a first step we need to create the file, and filename should match class name: `wizard.rb`:

```ruby
# wizard.rb
class Wizard
end
```

- Let's define the "constructor", the method which is going to be executed when we build objects. In Ruby this method is called `initialize`:

```ruby
def initialize(name, health)
  @name = name
  @health = health
end
```

- Now let's create a new instance of this class:

```ruby
merlin = Wizard.new("Merlin", 400)
p merlin #=> ?????
```

- What if you want to print out the name & health of the wizard, how would you do that? You will have to create a getter for that or otherwise you can't access it:

```ruby
def name
  return @name
end

def health
  return @health
end
```

- As you can see this is really annoying, if we have to do this for our 3 instance variables, it's just too much work and time consuming. Good for us there are some special methods we can use in Ruby to prevent us from having to define our own getters and setters all the time. The `attr_methods`. Let's use it:

```ruby
class Wizard
  attr_reader :name, :health
  def initialize(name, health)
    @name = name
    @health = health
  end
end

merlin = Wizard.new("Merlin", 400)
merlin.name #=> "Merlin"
merlin.health #=> 400
```

## Lecture

Now time to move on to the real content of the lecture. We'll see three important parts during this block:

- Inheritance
- Class methods
- Self

Imagine you had three classes, each one to create a different type of character. Make sure you create 3 files to show the students about the `require_relative` concept again.

```ruby
# wizard.rb  
class Wizard
end
```

```ruby
# warrior.rb
class Warrior
end
```

- They share some properties. They all have a `name`  and a `health`. For every character, we can calculate their total power. You can create 2 files and repeat 2 times the same thing to show them the power of inheritance later and the DRY principle.

```ruby
class Wizard
  attr_reader :name, :health
  def initialize(name, health)
    @name = name
    @health = health
  end

  def total_power
    @health * 1.5
  end
end

class Warrior
  attr_reader :name, :health
  def initialize(name, health)
    @name = name
    @health = health
  end

  def total_power
    @health * 1.5
  end
end
```

### First chapter: Inheritance

- Wow, lots of duplicated code here... let's respect the principle Don't Repeat Yourself. Let's apply the concept of inheritance and put all common parts in the parent class. We can make our classes inherit from a more generic SuperClass/ParentClass called `Character`. The syntax of inheritance is pretty simple:

```ruby
class SuperClass
end

class SubClass < SuperClass
end
```

```ruby 
# character.rb
class Character
  attr_reader :name, :health
  def initialize(name, health)
    @name = name
    @health = health
  end

  def total_power
    @health * 1.5
  end
end
```
```ruby 
# wizard.rb
require_relative "character" # don't forget the require_relative 'character' here

class Wizard < Character
end

merlin = Wizard.new("Merlin", 400)
merlin.name #=> "Merlin"
merlin.health #=> 400
```

```ruby 
# wizard.rb
require_relative "character"

class Wizard < Character
end

athena = Wizard.new("Athena", 300)
athena.total_power #=> 450
```

- Let's add some behavior to our classes and play with it. Only a wizard can cast a spell. Let's add a method `cast_spell?` to the Wizard class:

```ruby
class Wizard < Character
  def can_cast_spell?
    return true # All wizards can cast spells
  end
end

merlin = Wizard.new("Merlin", 400)
merlin.can_cast_spell? #=> true

athena = Warrior.new("Athena", 300)
athena.can_cast_spell? #=> Undefined method `can_cast_spell?`
```

```ruby
class Warrior < Character
  def can_cast_spell?
    return false # No warrior can cast spells
  end
end

athena = Warrior.new("Athena", 300)
athena.can_cast_spell? #=> false
```

#### `super` keyword

We all know that a Warrior is more powerful than a Wizard (bigger total_power). How can we make sure that this behavior is translated into code? We need to change an inherited method. This can be done with the `super` keyword, which calls the parent's method with the same name. Now, let's refactor our classes using `super` keyword:

```ruby
class Warrior < Character
  def total_power
    # @health * 1.5 * 2 can be refactored to:
    super * 2  # `super` calls `total_power` of `Character`
  end
end
athena = Warrior.new("Athena", 300)
athena.total_power #=> 900
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
# wizard.rb
class Wizard # This is a class Wizard
end
merlin = Wizard.new("Merlin", 400) # This is an instance of the class Wizard
```

Instance Methods
```ruby
class Merlin < Character
  def can_cast_spell?
    return true
  end
end

# The can_cast_spell? method is an instance method
# We can call the instance method can_cast_spell? on a single Wizard instance
p wizard.can_cast_spell? #=> true

# We cannot call the instance `method can_cast_spell?` on the `Wizard` class directly
p Wizard.can_cast_spell? #=> Undefined method `can_cast_spell?` for Wizard
```

- Instance methods are called on instances
- Class methods are called on classes.

What are class methods?

- The are called on the class directly.
- `Wizard.spells`

```ruby
class Wizard < Character
  def self.spells
    return ["Fireball", "Magic Missile", "Lightning Bolt"]
  end
end
```

- Note the self on the method definition. In terms of way to remember it, you can use the following metaphor: Self represents the ceiling he is inside of. Here the ceiling of self in the class. So self represents the class itself.
- You can't call class methods on instances!

```ruby 
merlin = Wizard.new("Merlin", 400)
merlin.spells #=> Undefined method `spells` for #<Wizard:0x00007f8b1b0b3b10>
```

When to create class methods and why?

```ruby 
class Wizard < Character
  # [...]
end

def self.spell_details(spell)
  case spell
  when "Fireball"
    return "A ball of fire that crisps the competition"
  when "Magic Missile"
    return "A missile of magic that never misses its target"
  when "Lightning Bolt"
    return "A bolt of lightning that strikes the target"
  else
    return "Unknown spell"
  end
end

puts Wizard.spell_details("Fireball") #=> "A ball of fire that crisps the competition"
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
class Wizard
  def self.spell_details(spell)
    # [...]
  end
end
```

- Inside of an instance method: self refers to the instance on which the instance method was called.

Self is not mandatory:
```ruby
class Wizard
  # [...]

  def introduce
    return "Hi, my name is #{@name} and I am a #{self.battle_rank} wizard"
  end

  def battle_rank
    if @health > 100
      "legendary"
    elsif @health > 80
      "seasoned"
    elsif @health > 50
      "intermediate"
    else
      "novice"
    end
  end
end
```

When do we actually need it explicitly? Let's now see the case in which Self is mandatory
```ruby
class Warrior < Character
  # [...]
  attr_reader :wizard

  def join_forces(wizard)
    @wizard = wizard
    @wizard.warrior = self # if this warrior instance is athena, then this will set the wizard's warrior to athena
  end
end

class Wizard < Character
  # [...]
  attr_reader :warrior

  def banish_demons
    return "Finished banishing demons with the help of #{self.warrior.name}"
  end
end

athena = Warrior.new("Athena", 300)
merlin = Wizard.new("Merlin", 400)
puts athena.join_forces(merlin)
puts merlin.banish_demons
```
As you see, here we need `self` in `Warrior#join_forces` in order to set the warrior of the wizard to the warrior instance. If we don't use `self`, we can't access the warrior instance of the wizard.

As a key takeway, `self` represents the instance it is inside of, if its ceiling is a class, it represents the class, if it is inside of an instance method it represents the instance(mandatory or not)


