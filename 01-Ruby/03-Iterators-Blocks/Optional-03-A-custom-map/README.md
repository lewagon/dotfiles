## Background & Objectives

To better understand `yield`, let's try to reimplement the [`Enumerable#map`](https://ruby-doc.org/core-2.5.3/Enumerable.html#method-i-map) method without actually using it.


## Specs

### A custom map

In this exercise, you need to implement a `#my_map` method which will be called with a block, like the regular `Enumerable#map` method. You can use `Enumerable#each` in your code to iterate through elements.

Here are two examples that should work with your code:

```ruby
beatles = ["john", "paul", "george", "ringo"]
my_map(beatles) do |name|
  name.upcase
end
#=> ["JOHN", "PAUL", "GEORGE", RINGO"]
```

```ruby
numbers = [2, 4, 6, 8]
my_map(numbers) do |number|
  number * number
end
#=> [4, 16, 36, 64]
```


## Key learning points

- Re-consider all the iterators you used `#each_with_index`, `#select`, `#find`... Is it 100% clear that they are methods called with a block?
