## Background & Objectives

A few small exercises here to get you manipulating arrays, hashes and blocks. Ready to consolidate your Ruby skills?

## Specs

Write a method `array_to_hash` which takes an `Array` as an argument and returns a `Hash`.

- If no block is given, then the hash keys should just be the indexes of the elements in the array, converted as `String`.
- If a block is given, call it passing the array index and use what's returned as the hash key.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/array_to_hash.png)

## Resource

You may want to look at [`Kernel#block_given?`](http://ruby-doc.org/core/Kernel.html#method-i-block_given-3F)
