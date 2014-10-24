## Guidelines

### Morning lecture

#### Iterators

A good way to introduce iterators is to start from a simple `for` loop on an array of your choice (like the musicians array in the slides). Ask them to help you code the `for` loop to print musicians names (they should know how to do it). Then introduce the `each` syntax and explain how it works. 

As a next step, you can ask them how to they would print the musicianc + its position in the `for` loop. Grrr.. how ugly it us for a rubyist !! It's time for you to show them `each_with_index` and spread the world on how cool iterators are.

After this teasing on `each` and `each_with_index`, go along different treatments on your musician array with `map`, `select`, `count`.. Each time, **let the students guess how they would write the code**. They sometimes get it good because iterators are very natural at the end.


**Important messages to convey**:

These powerfull methods (`map`, `count`, `select`,..) are **just methods** as the ones they have already used on strings (`downcase`, `split`,..). They just have a different syntax and operate complex treatments on arrays.

`each`? `each_with_index`? `select`? `map`? How to choose? Ask yourself

1. Which elements of the array do I need to access? Just the cell value? This value + its index?
1. Which treatment am I trying to accomplish? Which value do I want to get in return? A number? A modified array? a string?


Scroll quickly the slides up to the **Blocks** chapter. They should have no questions if your live-code was good :)

#### Blocks

It may be more convenient to start with the slides to introduce block syntax, since there isn't much thing to demo.

You can speak of blocks as pieces of code that can be passed to a method as any standard argument. They are used to String or Fixnum arguments, right? Well that's just a new kind of argument with a more complicated syntax.


**Define methods using blocks?**

WWhy defining methods using blocks?

**Good story to tell them**: Back in the day, imagine Matz wants to code a method that counts odd numbers in an array. Then a new one to count even numbers. Then a new one to count strings beginning with a "J".. etc.. etc.. He'll have to define an infinite number of methods for an infinite number of conditons.. That's where blocks come into play! They enable to have only one `count`method and to make it generic passing the condition as a block of code. Yeah baby!!


**Disclaimer** It's important to make this disclaimer to the class, otherwise some students will feel depressed :) They won't have to use the `yield` keyword every day in their ruby career. We mention it to make them understand the inner mechanics. However, they will have to **use** a lot of methods using blocks (like iterators) so they should get used to the `{}` and `do..end` syntaxes. 


To explain the `yield` keyword a good example is worth long speeches. In your live-code, start with a simple version without block argument, then add one block argument. Finally mix method arguments with block arguments. Every time, follow the flow of the program with the class and substitute `yield` arguments with their values explicitely.

Here are 2 cool examples that work pretty well. Feel free to pick one of them! 

**A timer**

```ruby
# version without block argument

def timer
  start_time
  yield
  Time.now - start
end

timer do
  puts "Hello"
  sleep(3)
end

# adding a block argument

def timer
  start_time
  yield("Hello")
  Time.now - start
end

timer do |word|
  puts word
  sleep(3)
end

# mixing method arguments with block arguments

def timer(str)
  start_time
  yield(str)
  Time.now - start
end

timer("Hello") do |word|
  puts word
  sleep(3)
end

```

**A "complexity-faker"**

```ruby
# version without block argument

def fake_complexity()
  puts "Launching very smart computation with the most clever algorithm...."
  sleep(1)
  puts ".."
  sleep(1)
  puts "...."
  sleep(1)
  puts "......."

  result = yield

  puts "Pfiou... That was some hard maths.."
  return result
end

sum = fake_complexity(6) do
   1 + 1
end

puts sum

# adding a block argument 

def fake_complexity()
  puts "Launching very smart computation with the most clever algorithm...."
  sleep(1)
  puts ".."
  sleep(1)
  puts "...."
  sleep(1)
  puts "......."

  result = yield(3)

  puts "Pfiou... That was some hard maths.."
  return result
end

sum = fake_complexity(6) do |num|
   2 * num
end

puts sum

# mixing block and method arguments

def fake_complexity(num)
  puts "Launching very smart computation with the most clever algorithm...."
  sleep(1)
  puts ".."
  sleep(1)
  puts "...."
  sleep(1)
  puts "......."

  result = yield(num, 3)

  puts "Pfiou... That was some hard maths.."
  return result
end

sum = fake_complexity(6) do |num, factor|
   num * factor
end

puts sum

```


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
- `O1-Enumerable`: correct just this one challenge, switching the live-coder for each iterator.
