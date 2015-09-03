## Introduction
Let's start with a recap of something important you've seen this week:

[Here](http://karr.lewagon.org/lectures/ruby/03-iterators-blocks/#/1/1) you'll see a visual presentation of an array! Above it we actually created it with the syntax we know. We could have also done this with %w (because it's an array of Strings!). There are certain methods you can call on the array, this is nothing new. All things you've seen in the past days.

So to recap this in code, let's see this code:

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

So first of all, you'll see 3 different ways to create an array:

- The first one is just going to create an empty array
- The second one will create an array of strings
- The third one will create the same array as the second one (but it's shorter writing)

Let's loop over both of the arrays, one time with the for loop and one time with the each method, much more the "ruby way":

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
Now what if we also want to print the index (the position of the element in the array)? We could rewrite the for to take the index into account:

```ruby
for index in 0...(coaches.size) do
  coach = coaches[index]
  puts "#{index + 1} - #{coach}"
end
```

This works, but this is not really how _real_ rubyist like to write code. There is actually a method that you can use that will take the index into account to that feels more ruby-like: [each_with_index](http://ruby-doc.org/core-2.2.2/Enumerable.html#method-i-each_with_index). Let's take a look at the docs: we see that it now calls a block (we'll explain in a few moments what those are exactly) just like the each method, but instead of calling it with one argument, now it will call the block with two arguments: the item and its index and this for each item in the array.

Let's rewrite our previous for loop into an each_with_index:

```ruby
coaches.each_with_index do |coach, index|
  puts "#{index + 1} - #{coach}"
end
```

### `map` method
Now as you've seen I didn't capitalize any of the names, let's say I want to do this without having to rewrite my original declaration of the array? What we can do is create a new empty array `capitalized_coaches` and then loop over our original coaches and for each coach capitalize the name and put that String into our new array. Let's do that:

```ruby
capitalized_coaches = []
coaches_shorter.each do |coach|
  capitalized_coaches << coach.capitalize
end
p capitalized_coaches
```

Let's rewrite this method in a more general syntax, so we can call it with different arrays:
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

When you see this: a method that takes an array and returns an array, from now one you need to think `.map` method! Now how does this method works? The basic syntax looks like this:

```ruby
new_array = original_array.map do |element|
  do_something_with(element)
end
```
So what will happen is that with map it's still going to loop over the array but while it's looping over the elements, it's putting the elements to a new array. So let's rewrite our `capitalize_array()` method we just created:

```ruby
def capitalize_array_with_map(array)
  return array.map do |element|
    element.capitalize
  end
end

capitalized_coaches = capitalize_array_with_map(coaches)
p capitalized_coaches
```

So from now on, whenever you have an array and you give that to a method asking for a new array, you want to use the map method for this!

### Other methods
Now we'll go over some other you can perform on an Array.

#### `count`
Let's say you want to know how many coaches have the letter 'a' in their name, we can actually use the count method for that. Let me show you this:

```ruby
coaches_with_a_count = coaches_shorter.count do |coach|
  # return a boolean (true / false)
  coach.include?("a")
end

p coaches_with_a_count
```

The count method will increment the counter with one whenever the statement in the block returns true. So as soon as the coach name does has an a, it will be incremented.

Note that if you would do the following statement: `coaches_with_a_count = coaches_shorter.count('a')` it will not count the coaches with the letter a, but it will actually count how many elements in your array are equal to "a". So in our case it will return a 0.

Btw, you could've also done this with an each, but it's less time consuming to immediately use the right method, but for those who are interested, here is how it would look like with each:

```ruby
counter = 0
coaches.each do |coach|
  counter+= 1 if coach.include?("a")
end
p counter
```

#### `select`
Now, let's say we don't want to know how many coaches have the letter 'a' included in their name, but we want to have an array with those coaches. Lets create a method that uses each to do this.

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

Note that we're not using map because when you use map you want your new array to have as many elements as your orginal array, while for this it's not the case.

Now, as you probably already guesses, there is actually a method called `select` that works just like `count` that we can use for these kind of problems, let's rewrite our method using select:

```ruby
def array_with_a(array)
  array.select do |element|
    element.include?("a")
  end
end

p array_with_a(coaches)
```

Comparable to the count method, select is going to save the element whenever the statement in the block is true. If it's false, the element will just be ignored and not be saved to a new array.

If you compare both methods, the one using each and the one select, they both will give you the same result, but using select makes it more readable. You have to imagine that often your code will be read by other developers (and maybe they'll work on it further) of you'll work on projects with other people. You're going to be happy when they've written code that can be easily read. So try to use the correct methods when you're doing your challenges or writing code.

If you feel up to it, you can even make the method more generic: cause what if we don't want the coaches with the letter "a" but the ones with the letter "o"? All we need to do is, add an extra parameter to our original method and use this one within our method and when we call the method we should not only pass the array but also the letter:

```ruby
def array_with(array, letter)
  array.select do |element|
    element.include?(letter)
  end
end

p array_with(coaches, "o")

```

#### `reduce`
Now I'll show one last method that you can use, there are plenty of other methods, but I don't want to spoil all the fun that you can have exploring it yourself. For this method we're going to use a different array, because it will make more sense. Let's use an array with grades. I prepared this in another file: grades.rb

Let's say that for this array we want to have the sum of all the elements in that array. Now, how would we try to accomplish that? You could use each and loop over all your elements and keep the sum somewhere. But just like with map whenever you have at the start an array and you just want one element in the end, you should have the reflex to use `reduce`.

Lets first write it with an each and then see how we can change this and use reduce:

```ruby
sum = 0
grades.each do |grade|
  sum += grade
end

p sum
```

The syntax for reduce is a little different than the syntax we used for .map or .select or .count. The syntax looks like this:

```ruby
  total = array.reduce(initial) do |memo, element|
    memo + element
  end
```

So in this case you need to tell Ruby with which initial value you want to start your computements you'll make in your block. This initial value will be givin to memo and then everytime you do an operation that new value will once again be givin to memo. If you don't give an initial value then the first value of your array will be used. Let's show this with an example:

```ruby
sum = grades.reduce(0) do |temp_sum, grade|
  temp_sum + grade
end

p sum
```

A little sidenote: if you would go look at the Ruby doc for [reduce](http://ruby-doc.org/core-2.1.0/Enumerable.html#method-i-reduce) you'll notice that actually the method can accept different arguments. So you actually don't always have to use a block if you're going to use a simple operator (like determine the sum). You can rewrite the method to one sentence:

```ruby
p grades.reduce(:+)
```

### Recap
So we've discussed a few methods that are available for you to use when you're working with arrays:
- `.each_with_index`: when you need to loop over your array and you need the index of the element
- `.map`: when you start with one array and you need another array returned with the same number of elements
- `.count`: when you need to get the number of elements that are valid for a certain statement
- `.select`: when you don't need the count of the elements that are valid for a certain statement, but the actual elements
- `.reduce`: when you have an array and you want just one element in return, for example when you need to take the sum of the elements in the array

Btw: these type of methods are called iterators because they iterate over an Enumerable (in our case we've been working with arrays).

### Blocks
I said earlier that I was going to explain `blocks` better. Now what exactly are blocks? Let's go back to one of our examples earlier today and open block.png. So you can see that we have a simple each here. The part from `do` until `end` is the block. An important part of the block is the word that is between the pipelines, this is actually the parameter. When you hear parameter you should thin about a method. For example the method we made earlier `def capitalize_array(array)` where array is a parameter of the method `capitalize_array`. Now you can actually see the block as a method, but without a name, so basically an anonymous method.

So what's between the block is the content of the method, the parameter between the pipelines and in our case each is going to take care of calling the content of the anonymous method with the right parameter.

Now the last days we've been using methods that use blocks, but now we're going to write our own blocks. A small but important disclaimer is that this is actually advanced coding. So don't be traumatized if this is getting a bit over your head. We're doing this because we want you to be able to understand blocks, you will almost never write your own blocks in your developer career.

But let's dive into an example so it becomes more clear to you. Open timer.rb. You'll see some very simple code, run it and see what happens. Now let's add an extra step:

```ruby
start = Time.now
puts "I'm going to fake being busy again"
sleep(1)
puts "Wasn't that long this time, was it?"
stop = Time.now
puts "Elapsed time: #{stop - start}"
```

Now this all works, but we do see some duplicate code. Basically the first part of the code is almost the same as the part we just added. When you see that, you should realize that we can probably make a method out of it. So let's rewrite this within a method `execute_with_timer`:

```ruby
def execute_with_timer
  start = Time.now
  # execute the code
  stop = Time.now
  puts "Elapsed time: #{stop - start}"
end
```

So now how do we get our code (the puts and the sleep) into that `#execute the code` part? If we were just passing a String or an Integer, we could've just called the method with a parameter, but we actually have an entire block of code. This is a good time to write our own block.

Now let's write our own block and see if it works:

```ruby
def execute_with_timer
  start = Time.now
  # execute the code
  stop = Time.now
  puts "Elapsed time: #{stop - start}"
end

execute_with_timer do
  puts "I'm pretending to be busy"
  sleep(2)
  puts "I'm done pretending"
end
```

If we execute this, the only ouput we get is something like this: `Elapsed time: 5.0e-06`. If we look at our code we actually see that we had a commented sentence that said 'execute the code' but we're still not doing anything there. So here comes the mindblowing part, if we change that line with the keyword `yield` or block will actually be called. Let's try it out and then I'll explain it!

We can actually add our second part from earlier and call the method again:

```ruby
execute_with_timer do
  puts "I'm pretending to be busy"
  sleep(2)
  puts "I'm done pretending"
end

```

So what actually happens is:
- you call your method with the block
- it's executing the first line `start = Time.now`
- with yield it's calling the block you called the method with, so now it will execute the block:
  - puts ..
  - sleep
  - puts ..
- it goes back to your method executing `stop = Time.now` and the puts
- it's finished with the method and it is finished

(You can find this finished version in timer_block.rb)

This all here is purely to demonstrate you how blocks (and thus how you use each, select, count, ..) works. Once again, don't worry this is a complex subject and you don't need to be able to write your own blocks all the time. It's more important you kind of understand it.


### Yield
See yield as a placeholder for a block of code, yield is actually saying 'execute this code'.

Let's do another example: open yield.rb, it's a simple method. You should be able to understand what it does when you execute it.

Now what if we want to customize the output of the method more, like sometimes we want to say goodmorning, good afternoon, ... We could change our method and add an extra parameter, like this:

```ruby
def say_hello(name, intro)
  name = name.capitalize
  return "#{intro} #{name}"
end

p say_hello("lien", 'morning')
```

This was very simple, but what if we wanted sometimes to write the intro before the name, but other times we want it the other way around? This could get complicated to write that in the method, we would need to add an extra parameter and if statement. But actually we can use blocks!

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

Now we're using yield again and it's even passing a parameter!

