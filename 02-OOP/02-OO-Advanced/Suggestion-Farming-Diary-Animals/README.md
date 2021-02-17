## Background and Objectives

This challenge is an extension of the previous one. The farm welcomes its first animals!
TODO: different approach

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
  - `feed` returns "Rebecca is eating" for an animal named Rebecca
  - `collar` returns "Name: Rebecca"


### Cow
Cows inherit from animal but they have particularities.
This time, we're going to explore a different technique to implement them: **call** the methods first and **code** them afterwards.

Create a new instance of `Cow` in `farming_diary.rb` and call all the methods on it. Now go back to the `Cow` class to implement the following clues:

  - Cows produce **milk**. Milk is increased by one anytime the cow is beeing fed.
  - Cows can **talk**, a new method `talk` returns "moo"

In your diary, feed the cow and test if the amount of milk produced is what you expected. Adjust the methods through trials and errors. Does this process remind you of Test Driven Development (TDD)?


### Chicken

Here are the clues for the chicken:

  - Chickens have a gender in addition to a name.
  - Chickens produce eggs but only female can produce one when beeing fed.
  - Chickens can talk: "cock-a-doodle-doo" if the chicken is a male, "cha-caw" if it is a female.
  - A chicken's collar reads "Name: Rebecca, female". A little different from the basic animals.

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
