## Introduction

Let's start with a recap of important things you've seen this week:

[Here](http://karr.lewagon.org/lectures/ruby/03-iterators-blocks/#/1/1). Remember: **in programming, index starts at 0**. So to recap array manipulation, let's see this code:

```ruby
# How can you make a new array?
empty_array = []
p empty_array

# You can also create it with values
coaches = ['lien', 'boris', 'xavier', 'simon', 'teddy']
p coaches

# Or a shorter way to write this
coaches_shorter = %w(lien martin xavier simon teddy anne loucas olivier)
p coaches_shorter
```

So at the end, 3 different ways to create an array:

- The first one is just going to create an empty array
- The second one will create an array of strings
- The third one is a shortcut syntax for the second one.

Let's loop on this arrays, using either the `for loop and or the `each` method (much more the "ruby way"):

```ruby
for coach in coaches
  p coach
end

coaches_shorter.each do |coach|
  puts coach
end

coaches_shorter.each { |coach| puts coach}
```

### What if we want more?

Now what if we also want to print the index (the position of the element in the array)? We could rewrite the for loop:

```ruby
for index in 0...(coaches.size) do
  coach = coaches[index]
  puts "#{index + 1} - #{coach}"
end
```

This works, but this is not really how _real_ rubyist like to write code. There is actually a method that is made to get each index-value pair when going through the array: `each_with_index`. [Let's take a look at the docs](http://ruby-doc.org/core-2.2.2/Enumerable.html#method-i-each_with_index): we see that this method should be called with a 2-parameters block.

Let's rewrite our previous for loop into an each_with_index:

```ruby
coaches.each_with_index do |coach, index|
  puts "#{index + 1} - #{coach}"
end
```

### `map` method

How can we transform the original array an capitalize words..

```ruby
capitalized_coaches = []
coaches_shorter.each do |coach|
  capitalized_coaches << coach.capitalize
end
p capitalized_coaches
```

Let's embed it in a method:
```ruby
def capitalize_array(array)
  capitalized_array = []
  array.each do |element|
    capitalized_array << element.capitalize
  end
  return capitalized_array
end

capitalized_coaches = capitalize_array(coaches)
p capitalized_coaches
```

Well there're should be a quicker way of mapping an array into a new one.. Yes, there's `map` the iterator made for that.

```ruby
new_array = original_array.map do |element|
  do_something_with(element)
end
```

Let's rewrite our `capitalize_array()` method we just created:

```ruby
def capitalize_array_with_map(array)
  return array.map { |element| element.capitalize }
end

capitalized_coaches = capitalize_array_with_map(coaches)
p capitalized_coaches
```

So from now on, whenever you want to transform an array into a new one, just use `map`.

### Other methods

Now we'll go over some other usefull iterators.

#### `count` method

Let's say you want to know how many coaches have the letter 'a' in their name, we can actually use the `count` method for that. Let me show you this:

```ruby
coaches_with_a_count = coaches_shorter.count do |coach|
  # return a boolean (true / false)
  coach.include?("a")
end

# One-line block notation

coaches_with_a_count = coaches_shorter.count { |coach| coach.include?("a") }

p coaches_with_a_count
```

The count method will increment the counter with one whenever the statement in the block returns true. So as soon as the coach name does include a "a", it will be incremented. Btw, you could've also done this with an each, but it's less time consuming to immediately use the right method, but for those who are interested, here is how it would look like with each:

```ruby
counter = 0
coaches.each do |coach|
  counter+= 1 if coach.include?("a")
end
p counter
```

#### `select` method

Now, let's say we don't want to know how many coaches have the letter 'a' included in their name, but we want to have an array with those coaches. Lets create a method that uses `each` to do this.

```ruby
def array_with_a(array)
  new_array = []
  array.each do |element|
    new_array << element if element.include?("a")
  end
  return new_array
end

p array_with_a(coaches)

```

Now, as you probably already guess, there is actually a method, called `select`, that does this job:

```ruby
def array_with_a(array)
  array.select { |element| element.include?("a") }
end

p array_with_a(coaches)
```

If you feel up to it, you can even make the method more generic: cause what if we don't want the coaches with the letter "a" but the ones with the letter "o"? All we need to do is, add an extra parameter to our original method and use this one within our method and when we call the method we should not only pass the array but also the letter:

```ruby
def array_with(array, letter)
  array.select do |element|
    element.include?(letter)
  end
end

p array_with(coaches, "o")
```

#### `reduce` method

Now let's see one last method that you can use, there are plenty of other methods, but we don't want to spoil all the fun that you can have exploring it yourself. We want to compute the average of a grades array. Let's try with `each`

```ruby
grades = [10, 14, 8,  20, 16, 11, 15]

sum = 0
grades.each do |grade|
  sum += grade
end

p sum.fdiv(grades.count)
```

Well again, there's a method designed for that, `reduce`:

```ruby
total = array.reduce(initial) do |memo, element|
  memo + element
end
```

In this case you need to tell Ruby which initial value you want to start with and the operation you'll then apply. In our case:

```ruby
sum = grades.reduce(0) do |temp_sum, grade|
  temp_sum + grade
end

p sum.fdiv(grades.count)
```

If you look at the Ruby doc for [reduce](http://ruby-doc.org/core-2.1.0/Enumerable.html#method-i-reduce) you'll notice that the method accepts different arguments. So you can actually rewrite your code this way:

```ruby
sum = grades.reduce(:+)
```

### Recap

So we've discussed a few methods very powerfull on arrays:

- `.each_with_index`: when you need to loop over your array and you need the index of the element
- `.map`: when you need to transform an array into a new one
- `.count`: when you need count the number of elements verifying a condition
- `.select`: when you need to extract the array of elements verifying a condition
- `.reduce`: when you have global operation to perform on all the array elements.

Btw: these type of methods are called iterators because they iterate over an Enumerable (in our case we've been working with arrays).

### Blocks

We've used ruby blocks a lot, either with the `do..end` notation or the `{}` for 1-line blocks. Now what exactly are blocks? You can actually see them as methods, but without name, so basically an anonymous method. What's between pipes `||` are the block parameter, such as methods parameters are between `()`.

We've been **using** methods that call blocks, but now we're going to define them. A small but important disclaimer: this is advanced coding. So don't panic if this is getting a bit over your head. We're doing this because we want you to be able to understand blocks, you will almost never write your own block-methods in your developer career.

Let's dive into an example so it becomes clear to you:

```ruby
start = Time.now
sleep(1)
stop = Time.now
puts "Elapsed time: #{stop - start}"
```

Here we make our program sleep 1 second. But wouldn't it be great to get duration of any ruby code executed?

```ruby
def execute_with_timer
  start = Time.now
  # execute the code
  stop = Time.now
  puts "Elapsed time: #{stop - start}"
end
```

Now let's add some magic with the `yield` keyword, **that's the keyword calling the block**:

```ruby
def execute_with_timer
  start = Time.now
  yield
  stop = Time.now
  puts "Elapsed time: #{stop - start}"
end

execute_with_timer do
  puts "I'm pretending to be busy"
  sleep(2)
  puts "I'm done pretending"
end
```

So what actually happens is:
- You call your method with a block
- It's executing the first line `start = Time.now`
- With `yield` it's executing the block, so for our block it will:
  - puts ..
  - sleep
  - puts ..
- It goes back to `stop = Time.now` and then puts time elapsed

### Yield

`yield` is actually saying 'execute the code in the block'.

We are going to add parameters to our block. Let's start with this simple method

```ruby
def say_hello(name, intro)
  name = name.capitalize
  return "#{intro} #{name}"
end

p say_hello("boris", 'morning')
```

This is very simple, but what if we want different greetings in different languages. Actually we can use blocks!

```ruby
def say_hello(name)
  name = name.capitalize
  yield(name)
end

french_message = say_hello("john") do |name|
  "bonjour #{name}"
end

dutch_message = say_hello("anne") do |name|
  "#{name}! Goeiemorgen"
end

p french_message
p dutch_message
```

Now we're using yield again and it's even passing a parameter! Go through this code peacefully to follow its flow, yo!

### Recap of daily basis workflow

It's time for a first recap on the daily basis workflow (should also be posted on the Slack channel of the batch):

 ```
 Goodmorning! Here's a recap of some things that are good to keep in mind!

*Daily*
- Start the day with a nice `git status`
- If your status isn't clean, clean it up!

  - _Red_ means there's still some files you need to add with `git add`
  - _Green_ means there's still some files you need to commit with `git commit`
  - After adding and commiting always push!

- Try to `add`, `commit` and `push` after each completed segment of the exercise!
- End the day with a clean `git status` too! Make it a habbit to check your status before shutting down your computer.

- Lectures start at *09:00*! Don't miss them! If you miss a lecture you risk not having the necessary information to complete the exercises.
- The day ends between 18:00 and 19:00! Don't leave before the live code.

- Work together with your buddy! Look at each other's screen a lot, ask questions, talk, have a good time. Communication is key in the pair-programming system and two minds can achieve more than one.

- Place tickets if you're stuck on an exercise for *more than 15 minutes*!
- Place tickets if you want a teacher or TA to have a look at your code in general.
- Place tickets!

- If you finish all the mandatory exercises don't forget the optional ones! They're a really good test of the skills you pick up during the day.

*Things you can do to prepare for the next day*
- Sleep! Being well-rested and on-time makes the lectures easier to follow and it keeps your mind clear.
- Read the slides for tomorrow's lecture on Karr.
- Have a quick look at tomorrow's exercises but don't start them yet! It would be unfair to your buddy.

*Testing your code*
- Use `irb` to run pieces of Ruby code and see what happens.
- Use the terminal with `ruby file_name.rb` to execute your `.rb` file to see what happens and read possible errors.
- `rake` it and read the error messages well!
```
