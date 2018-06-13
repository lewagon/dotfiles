## Background & Objectives

Blocks are chunks of code enclosed between `{}` (for single-line blocks) or between `do..end` (for multi-line blocks).

Many methods can just be called **with a block** given after the list of arguments. In fact, that's exactly what you did with all these iterators! This block is executed any time the keyword `yield` appears in the method definition. Use the resources to learn more about blocks. The objectives here are:

- Learn the syntax for calling a method with an implicit block (either single-line or multi-line).
- Understand what happens when you pass a parameter to the block.
- Implement some basic methods using `yield`, to understand the inner mechanics.

## Specs

### Timer method

Implement a block-timer in `#timer_for` that allows you to track the duration (in seconds) of the execution of any given block. It should work this way:

```ruby
timer_for do
  (1..10000000).to_a.shuffle.sort
end
#=> 3.313461
```

### A custom map

To better understand `yield`, let's try to reimplement the [`Enumerable#map`](https://ruby-doc.org/core-2.4.0/Enumerable.html#method-i-map) method without actually using it. In this exercise, you need to implement a `#my_map` method which will be called with a block, like the regular `Enumerable#map` method. You can use `Enumerable#each` in your code to iterate through elements.

```ruby
beatles = ["john", "paul", "george", "ringo"]
my_map(beatles) do |name|
  name.upcase
end
#=> ["JOHN", "PAUL", "GEORGE", RINGO"]
```

### HTML generator method

Implement the `#tag` method that builds the HTML tags around the content we give it in the block. For instance:

```ruby
tag("h1") do
  "Some Title"
end
#=> "<h1>Some Title</h1>"
```

This method accepts a second optional parameter (see section below on arguments with default value), enabling to pass an array with one HTML attribute name and its value, like `["href", "www.google.com"]`.

```ruby
tag("a", ["href", "www.google.com"]) do
  "Google it"
end
#=> '<a href="www.google.com">Google it</a>'
```

You may need to know that to include a `"` symbol inside a string delimited by double quotes,
you need to **escape** this character with an antislash: `\"`.

The cool thing about this method is that you can nest method calls:

```ruby
tag("a", ["href", "www.google.com"]) do
  tag("h1") do
    "Google it"
  end
end
# => '<a href="www.google.com"><h1>Google it</h1></a>'
```

Cool right?

#### Arguments with default value

In ruby you can supply a default value for an argument. This means that if a value for the argument isn’t supplied, the default value will be used instead, e.g.:

```ruby
def sum(a, b, c = 0)
  return a + b + c
end

sum(3, 6, 1) # => 10
sum(4, 2)    # => 6
```

Here, the thrid argument is worth `0` if we call `sum` with only two arguments.

## Key learning points

- What's a block?
- What's the syntax if the block has only 1 ruby instruction in it? several?
- Re-consider all the iterators you used `#each_with_index`, `#select`, `#find`... Is it 100% clear that they are methods called with a block?
- Could you figure out approximately how the `map` iterator is coded for instance?
