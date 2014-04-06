## Background & Objectives
- Get familiar with IRB to test your code and to grasp new ruby methods.
- Improve your problem-solving skills and learn to look for the right info on web resources.
- Understand how to find and use common methods of built-in ruby classes.

IRB is a [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for ruby. Basically, it works this way
 
1. It **R**-eads the expression written by the user, which can be any valid ruby expression like `"Hello"`, `2+2`, `"hello".upcase`,...
2. It **E**-valuates the result of this expression.
3. It **P**-rints this result.
4. It **L**-oops back to point 1, waiting for a new user input.

* **Experiment the following lines** on IRB:

```ruby
3 + 7                        
3.+(7)                        
3.send("+", 7)               
"Waou ".*(3)
"Waou ".*(3).+(" !!!!")
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".methods     
String.instance_methods       
String.methods                
"A string object".class.class 
```

In ruby, everything (a text, an integer, a floating number, an array..) is an object, i.e. an instance of a class. We can call methods on these objects. Such methods are called **instance methods** since they can be called only on instances of the class.

How does this **method call** work exactly when we plunge into ruby code ?

The object on which we call the method is called the **receiver**. When we call a method on the receiver, we send him a message, containing 

* The name of the method (like the "+" method in our example above)
* Additionnal parameters this method takes when being called. For instance, when we run `3 + 7`, what we do is
  * We send the message `"+"` with parameter `7` to our receiver `3`
  * This object `3` is an instance of the `Fixnum` class, and `+` is an instance method of this class

## Specs
Find the right ruby methods of the [String class](http://ruby-doc.org/core-2.1.0/String.html), the [Fixnum class](http://www.ruby-doc.org/core-2.1.0/Fixnum.html), and the [Array class](http://ruby-doc.org/core-2.1.0/Array.html) to put in the canvas and make the tests pass.

Code is all about being smart and knowing how and where to look for the info you need ! The most difficult step is often to ask google the adequate question. To find the methods you need in this challenge, use:

* Google and [Stack Overflow](http://stackoverflow.com/) to begin with
* [The ruby doc](http://ruby-doc.org) when you have some intuition on the name of the method you are looking for.

When you think you have found the method you are looking for, and you think you know how to use it, use IRB to test this method on a new example you invent and make this method yours! Experimenting on IRB is a crucial step for beginners.

## Learning Badges
Are you able to answer the following questions ? If not, you're not ready to move on !

- How many built-in ruby classes do you know ? Which ones ?
- What is a ruby object ?
- What's the syntax to call a method on an object ?
- What should be the immediate step when you are looking to perform a rather standard operation on a standard ruby object (of class String, Fixnum, Array,..) ?
- What's the second step, to make sure you understand how to call the method you have found before polluting your source code ?
