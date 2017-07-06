## Background & Objectives

Small exercises to make you manipulate arrays, hashes and blocks, and consolidate your ruby skills on this!

## Specs

Write a method `array_to_hash` which takes an `Array` as an argument
and return a `Hash` built from this array.

- If no block is given, then the hash keys should just be integer indexes of elements in the array, converted as `String`.
- If a block is given, call it passing the array index and use what's returned as the hash key.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/array_to_hash.png)

## Resource

You may want to look at `[Kernel#block_given?](http://ruby-doc.org/core/Kernel.html#method-i-block_given-3F)`
