## Guidelines

### Morning lecture

#### Introduction

Software are not one-file programs. They are made of different files and different classes communicating with each other. From day-one @Le Wagon, you've been manipulating classes without knowing it, `String`, 'Array', etc... They're the built-in classes. Now you'll see how to define your own classes !


Explain to the students that a class includes:

1. **data / state** => through instance variables
2. **behavior**  => through instance methods. 

**Example**: a string is made of data (= the chain of characters itself) + behavior (= all the methods that can be called like `downcase`, `split`, etc.).

**Spend time on the "cake pan" metaphora to explain the difference between the class and the instances**. "The cake pan is the class, the cakes created with the cake pan are the instances", repeat it again and again, as much as needed.

#### My first class

Here the best option is to live-code all the concepts directly and discuss them with the class. Spend some time on the filename convention:

- `Car` => `car.rb`
- `SportCar` => `sport_car.rb`

Make the live-code interactive. Ask them:

- What are the characteristics of a car? How do you describe its state?
- What are the characteristics of a car "at inception", at **t=0**, when we create it? The brand? The color? The number of kilometers? live-code the corresponding constructor `#initialize` with relevant arguments.


```ruby
# example
def initialize(color)
  p "initialize called with #{color}"
  @color = color
  @engine_started = false
end
```

#### Instance variables

What are these strange notations: `@engine_started`, `@color`, `@brand`? These are instance variables, variables that represent the internal state of **each instance** and that are accessible in every instance method of the class.

#### Instance methods

Let's add some behavior to start our car => instance methods

Go to the white-board and make the drawings below to make them understand instance variable (we make our drawings in ruby since we are geeks :)).

```ruby
class Car
  def initialize(color, brand)
    @color = color
    @brand = brand
    @engine_started = false
  end
  def start_engine
    @engine_started = true
  end
end

ferrari = Car.new("red", "ferrari")
# --------------------------
#| @color => "red"          |
#| @brand => "ferrari"      |
#| @engine_started => false |
# --------------------------

peugeot = Car.new("blue", "peugeot")
# --------------------------
#| @color => "blue"         |
#| @brand => "peugeot"      |
#| @engine_started => false |
# --------------------------

ferrari.start_engine
# --------------------------
#| @color => "red"          |
#| @brand => "ferrari"      |
#| @engine_started => true  |
# --------------------------
```


Explain that it differs from what they've done from the beginning. Now they define methods **in the class**, not in the main program, and they call these methods **on the instances**

### Accessors

Can they think of the most elementary instance methods? How do we print some car's color? its number of kilometers?

```ruby
# example
p my_car.kms

# Make them read the error message when the getter is not defined !!
```
Then code some setter `color=(color)`. **Disclaimer**: explain that the good practice is to code our own writers like `paint(new_color)`, but that they still should understand the notation `attr_writer` if they see it.

**Good pedagogical tips on accessors:**

- imagine you have 5 instance methods you want to access in read mode => it makes 3 x 5 = 15 lines of code just to add this poor behavior to you class. What a pollution! That will make them understand `attr_reader`.

- Do we need accessors on all instance variables? Nope! think of your car. You wan't to start the engine by turning the key, not by getting your hands in the engine and connecting some cables like a thief. In the same way `@engine_started` should not be exposed directly but it should be manipulated through the class interface `start_engine` or `turn_key_on`. This is called encapsulation (http://en.wikipedia.org/wiki/Encapsulation_(object-oriented_programming).

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
- For this live code, it can be fun to improvise on a class proposed by one of the student. Be sure it's fun first ! Then ask them to progressively add cool data and behavior to their class. It can be a `Restaurant` with reviews, a `Girlfriend` that can be dated ;) anything that makes them enthusiastic!

