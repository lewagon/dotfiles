## Background & Objectives

Now it's time to get familiar with the methods of the [Enumerable](http://ruby-doc.org/core/Enumerable.html) module. The `Enumerable` module is included in collection classes like `Array` and `Hash`. Some of these methods take a block of instructions when executed. The objective of this exercise is not to understand the syntax of a Ruby block (you'll see that soon), but to learn how to use these methods that are very convenient when you want to perform operations on collections.

- **Main lesson to learn**: when you want to perform an operation on a collection (like an array), 95% of the time there is an iterator for the exact thing you're looking for! just look for the good `Enumerable#method` in the doc 😊
- Understand how each iterator works, what it returns, how it applies the block to the elements of the collection.

## Specs

- Implement each method in the code canvas `lib/enumerable.rb`. For each method, we tell you which iterator to use, because we are nice 😊

## Key learning points

- What is an iterator? Which ones do you know?
- Can you choose one of them and explain exactly how it works?
