## Intro

1. Two-parts lecture.
1. First part on **iterators**, these very powerful methods on arrays.
1. Second part on **ruby blocks**, more advanced concepts.

## Rehearsal

Start with a quick rehearsal on array and range (5 minutes)


### Array

```ruby
# Recap on CRUD array actions
musicians = ['Jimmy Page', 'Robert Plant', 'John Paul Jones', 'John Bonham']
musicians.size                  # => 4
musicians[1]                    # => "Robert Plant"
musicians << 'Miles Davis'      # => [..., 'Miles Davis']
musicians[2] = "Michael Jackson"
```

### Range

Quickly introduce `Range`, collection of **successive** elements:

```ruby
0..10         # including upper bound
# => 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

0...10        # excluding upper bound
# => 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

(0..10).to_a  # conversion to array
# => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```


### Array iteration

1. Loop with `for` on range's indices
1. Loop with `for` on array's elements
1. Say **it's not idiomatic** to introduce iterators.

```ruby
# Looping on indices
for index in 0...(musicians.size) do
  musician = musicians[index]
  puts "#{index + 1} - #{musician}"
end

# Looping on elements
for musician in musicians
  puts "Listen to #{musician}"
end

# We have better methods in ruby!
```

## Iterators

1. Explain each iterator **with a live-code** (no theory!)
1. `#each`: Let's greet musicians one by one.
1. `#each_with_index`: Let's display an ordered list of musicians.
1. `#map`: Let's build arrays of **upcased musician names** or **musican first names**.
1. `#count`: Count musicians starting with "J"
1. `#select`: Extract musicians starting with "J"
1.  Many more => http://www.ruby-doc.org/core/Array.html
1. **Today's first challenge** = pick the right iterators from this documentation


What the hell was this?

```ruby
do |musician|
  musician.upcase
end
```

**Transition to next part** => This is a piece of code called a **block**


## Blocks


Blocks are pieces of code, a bit as **anonymous** methods.

1. Use the slides for this intro
1. Block Syntax (1-line or multi-line syntax)
1. Block return, explain **it returns last statement as a method**
1. Explain the block is just **an additional argument of the method**


## Define methods using blocks


### DISCLAIMER

- Advanced concept, normal if you struggle!
- You'll probably never have to **define** such methods in your ruby/Rails career.
- But you will **use** lots of them (like `each`, `map`, etc..)


### `yield` calls the block

1. `yield` is a Ruby keyword **executing** the block.
1. **Live-code**: let's code a `timer` method.
1. Go through the slides with schemes after you make this live-code.


Example **without block parameters**
```ruby
def timer
  start_time = Time.now
  yield
  puts "Elapsed time: #{Time.now - start_time}s"
end

timer() do
  puts "I'm doing something slow..."
  sleep(4)
  puts "I'm done :)"
end
# => I'm doing somethings slow...
# => I'm done :)
# => Elapsed time: 4s
```

Example **with block parameters**


```ruby
def greet(name)
  capitalized_name = name.capitalize
  puts yield(capitalized_name)
end

me = 'john'

greet(me) do |name|
  "Greetings, #{name}, you look quite fine today!"
end
# => "Greetings, John, you look quite fine today!"

greet(me) do |name|
  "Bonjour #{name}, comment allez-vous ?"
end
# => "Bonjour John, comment allez-vous ?"
```
