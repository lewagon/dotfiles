## Background & Objectives

Let's combine the power of enumerables (`#each`, `#map`, etc.) and blocks (and `yield`). We'll want to create a **splitter** method which will take an array and divide it into two groups according to an arbitrary rule. You might want to split by age if we're talking about a group of people.

## Specs

### Size Splitter

Implement a first method `size_splitter` which takes two parameters: an array, and a integer (the `size`). We will assume that the array only contains words of type `String`, and that the arbitrary rule is to form two groups: the first one with words of the given size (second parameter of the method), and the other group with all the other words.

The `size_splitter` method should return an array of two arrays - the two groups defined above - with the contents sorted **alphabetically**.

```ruby
words = %w(dog data ask my win two beer as)
result = size_splitter(words, 3)

# result => [["ask", "dog", "two", "win"], ["as", "beer", "data", "my"]]
```

### (Advanced) Block Splitter

In the previous exercise, the arbitrary rule was fixed. What if we wanted to let the method caller choose which rule to apply? We can do so with the power of blocks and `yield`!

Write a `block_splitter` method so that the following example works:

```ruby
beatles = [ "John", "Paul", "Ringo", "George" ]
result = block_splitter(beatles) { |beatle| beatle.start_with?("P") }

# result => [ [ "Paul" ], [ "John", "Ringo", "George" ] ]
```
