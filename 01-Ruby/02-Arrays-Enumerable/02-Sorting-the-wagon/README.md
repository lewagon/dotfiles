## Background & Objectives

The [Array class](http://www.ruby-doc.org/core-2.1.1/Array.html) is one of the two main structures used to store and access data in ruby (the other being [Hash](http://www.ruby-doc.org/core-2.1.1/Hash.html)). It's very important to know how to create an array, and modify or access its content. An array, unlike a hash, is ordered, and each element can be accessed by its index.

* Work with array to store and access data.
* Learn about [sorting algorithms](http://en.wikipedia.org/wiki/Sorting_algorithm).
* If you're not already doing it systematically, learn to look for methods in the [ruby doc](http://ruby-doc.org/) :)

## Specs

- Implement a `wagon_sort` method which should take as argument an array of student names and return a copy sorted alphabetically.
- The method should be case insensitive, e.g. put `brice` before `Felix`.
- The method should keep the original spelling of names.

### Interactive command

Open the `interface.rb` file and make sure to use the
`wagon_sort` method. It should work like this:

```bash
$ ruby lib/interface.rb
Type a student name:
felix
Type another student name (or press enter to finish):
cedric
Type another student name (or press enter to finish):
brice
Type another student name (or press enter to finish):

Congratulations! Your Wagon has 3 students:
- blandine, cedric and felix
```

## Learning Badges

Get familiar with array basic operations. You should know the syntax used to:

- create an array
- append a new element to the array
- access the nth element
- update an element
- delete a value at a given index

## Tips & Resources

* You should be of course interested in the ruby doc of the [Array class](http://www.ruby-doc.org/core-2.1.1/Array.html).
* As always, you can run `irb` to quickly test some ruby code.
