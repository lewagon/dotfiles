## Guidelines

### Morning lecture

Start by reviewing core notions (class, instance variables, instance methods, accessors)

#### class vs. instance

- We've defined instance methods, **called on instances**
- Do you remember `Time.now` or `JSON.parse`? `#now` and `#parse` are called on the class directly, i.e. on the "cake mold", not on the cakes


```ruby
class House
  def self.price_per_meter(city)
    if city == "Paris"
      8000
    else
      2000
    end
  end
end

p House.price_per_meter("Paris")
p House.price_per_meter("Dublin")
```

**Disclaimer**: you won't define a lots of class methods in your ruby life, but you will use them a lot.

```ruby
House.floor_area
# read the error message with them to make them understand it's an instance method

House.new.price_per_meter("Paris")
# read the error message with them to make them understand it's an class method
```

How do we get the price of a house.

```ruby
def price
  @sq_meters * price_per_meter(@city)
end
# oups it will not work => read the error with them

def price
  @sq_meters * House.price_per_meter(@city)
end
# yes indeed !
```


Class methods are usefull. Imagine we have to instantiate a new object to have price/square_meter in Dublin, Paris, Lisboa.. How inconvenient!

#### class vs. instance

`self` references the context in which a method is called.. oups.. But what the hell does it mean? Make some puts-debugging with them

```ruby
class House
  # ...

  def price
    p self
    # ...
  end

  def self.price_per_meter
    p self
    # ...
  end
end

loft = House.new("Loft Montmartre")
loft.price

flat = House.new("Flat Dublin")
flat.price

House.price_per_meter
```

Explain the outputs for each method call. Explain that self points to the current object on which the method is called. The world `self` speaks to itself.


#### Inheritance

Consider houses, skyscrapers, castles.. What do they have in common? Which data? Which behavior?


Live-code a naïve implementation duplicating the `floor_area` method in each class. Then explain the inheritance pattern to DRY the code.

A good insight to give. There are **3 use cases**

1. You completely over-ride the method in the child class
1. You completely inherit the parent method without re-implementing it
1; You want a mix, you want to extend the method. For that you need to explain `super`


You can make them a quizz


```ruby
class Building()
  def who_am_i
    puts "I am a building"
  end
end

class House < Building
  def who_am_i
    puts "Before all.."
    super()
    puts "But more specifically, I am a house"
  end
end

House.new().who_am_i
```

Explain that world speak for themselves. `super` stands for "super-class" method.


### Day challenges

Before starting the challenges

- Ensure every student has a clean git status, and that he has pulled upstream. Otherwise students may work on old versions of the challenges :).

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

- Ensure they're connected on the class Slack

- Make a brief overview of the roadmap of the day with them, explaining the general idea behind each challenge.

### Live-code

#### General guidelines

- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)


#### Live-code details

- Either you live-code the bank account challenge in `01-OO-Basics`
- Or you let them play with their ruby gosu games (for the most advanced) and spend more time with people having difficulties from 5h30 pm to 9pm.

