## Background & Objectives
- Learn to look for the right method on the ruby doc.
- Get familiar with IRB to experiment new methods and make them yours.

IRB is a [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for ruby. Basically, it works this way
 
1. It **R**-eads the expression written by the user, which can be any valid ruby expression like `"Hello"`, `2+2`, `"hello".upcase`,...
2. It **E**-valuates the result of this expression.
3. It **P**-rints this result.
4. It **L**-oops back to point 1, waiting for a new user input.

* **Experiment the following lines** on IRB:

```ruby
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".dowcase
[1, 2, 3].shuffle
```

In ruby, everything (a text, an integer, a floating number, an array..) is an object, i.e. an instance of a class. We can call methods on these objects. Such methods are called **instance methods** since they can be called only on instances of the class. The object on which we call the method is called the **receiver**.

## Specs
Find the right ruby methods of the [String class](http://ruby-doc.org/core-2.1.0/String.html), the [Fixnum class](http://www.ruby-doc.org/core-2.1.0/Fixnum.html), and the [Array class](http://ruby-doc.org/core-2.1.0/Array.html) to put in the canvas and make the tests pass.

Code is all about being smart and knowing how and where to look for the info you need ! The most difficult step is often to ask google the adequate question. To find the methods you need in this challenge, use:

* Google and [Stack Overflow](http://stackoverflow.com/)
* [The ruby doc](http://ruby-doc.org) when you have some intuition on the name of the method you are looking for.

When you think you have found the method you are looking for, and you think you know how to use it, use IRB to test this method on some personal example and make it yours! Experimenting on IRB is a crucial step for beginners.

## Learning Badges
Are you able to answer the following questions ? If not, you're not ready to move on !

- How many built-in ruby classes do you know ? Which ones ?
- What's the syntax to call a method on an object of these classes ?
- What should be the immediate 1st step when you are looking to perform a standard operation (sorting an array, upcasing a word, etc..) ?
- What's the second step, to make sure you really understand the method you found ?
