## Background and Objectives

This challenge is an extension of the previous one: the farm welcomes its first animals!
And this time, you're going to explore different techniques of developments.

![Animals](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/tiny-farm/animals.svg?sanitize=true)


## Specs
The farm has two kinds of **animals** (cow and chicken).

Discuss with your buddy: how many classes do you think you need, and how would you structure them? 

Don't rake now! Wait until the very end of the challende, try to code everything by yourself first!


### Animals
You are now familiar with inheritance, let's try to create the classes starting from the parent class:

  - Create the three classes `Animal`, `Cow` and `Chicken` all at once. **Focus on the structure** and the correct inheritance.

Add methods:
  - `initialize` takes the name of the animal as a parameter and set a @name variable.
  - `hug` puts "Rebecca is happy" (for an animal named Rebecca)


### Cow
Cows inherit from animal but they have particularities, here are what you need to know:

  - You can **feed!** the cows.
  - Cows produce **milk**. Milk is increased by one when you feed them.
  - Cows can **talk**, a new method `talk` puts "moo".

This time, like in Test Driven Development, **call** the methods first and **code** them afterwards:
In your diary, create a new instance of `Cow` and call all the methods on it. For example, call `feed!` and test if the amount of milk produced is what you expected. Then adjust the methods through trials and errors.

Keep in mind to always use the keyword `super` when you need to call the parent method.


### Chicken

Here are the clues for the chickens:

  - Chickens have a **gender** in addition to a name: they can be `male` or `female`.
  - You can **feed!** the chickens.
  - Chickens produce **eggs** but only female can produce one when beeing fed.
  - Chickens can **talk** too: "cock-a-doodle-doo" if the chicken is a male, "cha-caw" if it is a female.
  - When receiving a **hug**, a chicken act as other animals but it puts an aditionnal line: "Laura is running away". Chickens don't have time for hugs!

When all the methods returns what you expect, you're done with the class. Have fun with your diary in `farming_diary.rb`!


## Take away

You've created inheritance with two different approaches:
- In the first challenge, you refactored two classes and moved common code to a parent class.
- In the second one, you designed the inheritance before coding the classes.

Both methods are valid, but taking time to design the structure before coding is always the best of all the ideas.

To implement methods and variables, you can:
- Code the method first and check afterwards if they work
or
- Call all the expected behaviours, and go back to the class to develop them.
