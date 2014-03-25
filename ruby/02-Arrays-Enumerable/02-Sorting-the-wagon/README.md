## Background & Objectives
The [Array class](http://www.ruby-doc.org/core-2.1.1/Array.html) is one of the two main structures used to store and access data in ruby (the other being [Hash](http://www.ruby-doc.org/core-2.1.1/Hash.html). It's very important to know, how to create an array, and modify or access its content. An array, unlike a hash, is ordered, and each of its element can be accessed by its index.


* Work with array to store and access data.
* Learn about [sorting algorithms](http://en.wikipedia.org/wiki/Sorting_algorithm).
* If you're not already doing it systematically, learn to look for methods in the [ruby doc](http://ruby-doc.org/) :)

## Specs
### wagon_sort_.rb
- Implement `#wagon_sort` which should return the array of students' names, sorted alphabetically.
- **enhancement (optional)**: as a second step (after you are done with the terminal interface), your method should ignore cases, e.g. put `brice` before `Felix`. Still, it should keep the two names with their original case in the returned array.

### interface.rb
Implement a terminal interface. It should work like this:

```
$ ruby wagon_sort.rb
> Type a student:
> felix
> Type another student (or press enter to finish):
> cedric
> Type another student (or press enter to finish):
> brice
> Type another student (or press enter to finish):
>
> Congratulations ! Your Wagon has 3 students:
> blandine
> cedric
> felix
```

Make sure to test your program, both internally and from the command line (the user interface). Your program should :
1. Get every word inputed by the user and store it in a ruby array.
2. Ask for a new name to enter until the user press `Enter`. Then sort this array and output each of its elements (ordered alphabetically)

## Learning Badges
* Get familiar with array basic operations. What's the syntax for : creating an array ? appending a new element at the end of this array ? accessing its nth element ? modifying this element ? deleting a value at a given index ? 

## Tips & Resources
* You should be of course interested in the ruby doc of the [Array class](http://www.ruby-doc.org/core-2.1.1/Array.html).
* You should use the interactive ruby console (irb) to make "live" tests before coding you program.
