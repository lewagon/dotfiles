## Background & Objectives

- Learn to look for the right method in the Ruby doc.
- Get familiar with using IRB to experiment with new methods and make them yours.

IRB is a [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for Ruby. It works like this:

1. It **R**-eads the expression written by the user, which can be any valid Ruby expression like `"Hello"`, `2+2`, `"hello".upcase` ...
2. It **E**-valuates the result of this expression.
3. It **P**-rints this result.
4. It **L**-oops back to point 1, waiting for a new user input.

- **Experiment the following lines** on IRB:

```ruby
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".downcase
[1, 2, 3].shuffle
```

In Ruby, everything (text, an integer, a floating number, an array...) is an object. We can call methods on these objects. Such methods are called **instance methods** since they can only be called on instances of the class. The object on which we call the method is called the **receiver**.

## Specs

Find the right Ruby methods of the [String class](http://ruby-doc.org/core-2.5.3/String.html), the [Integer class](http://ruby-doc.org/core-2.5.3/Integer.html), and the [Array class](http://ruby-doc.org/core-2.5.3/Array.html) to plug in and make the tests pass.

Code is all about being smart and knowing how and where to look for the info you need! Often, the most difficult step is to ask google the right question. To find the methods you'll need for this challenge, use:

* Google and [Stack Overflow](http://stackoverflow.com/)
* [The Ruby doc](http://ruby-doc.org) if you have a rough idea of the method you are looking for.

When you think you've found the method you're looking for, and you think you know how to use it, use IRB to test this method on something! Experimenting on IRB is a crucial step for beginners.

## Key learning points

Are you able to answer the following questions? If not, you're not ready to move on!

- How many built-in Ruby classes do you know? Which ones?
- What's the syntax to call a method on an object of these classes?
- What should be the immediate 1st step when you're looking to perform a standard operation (sorting an array, upcasing a word, etc.)?
- What's the second step, to make sure you really understand the method you found?
