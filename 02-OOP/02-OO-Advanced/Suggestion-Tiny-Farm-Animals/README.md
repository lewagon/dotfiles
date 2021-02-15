## Background and Objectives

This challenge is an extension of the previous one. The farm welcomes its first animals!
TODO: different approach


## Specs
TODO:



### Animals
You are now familiar with inheritance, let's try to create the classes starting from the parent class:

  - Create the three classes `Animal`, `Cow` and `Chicken` all at once. **Focus on the structure** and the correct inheritance.


Add methods:
  - `initialize` takes the name of the animal as a parameter and set a @name variable.
  - `feed` returns "Polly is eating" for an animal named Polly
  - `collar` returns "My name is Polly"


#### Cow
TODO: abstraire
`Cow` inherit from the class `Animal` but it has some particularities:
  - In `initialize`, set a variable `@milk` to zero. Remember to also set the name (use `super` to call the parent method).
  - `feed` increases `@milk` by one, then it returns "Polly is eating". Use `super` here too.
  - A new method `talk` returns "moo"

Add new adventures about cows in your farming diary in `farming_diary.rb`, this time, you're completly on your own. You have enough material to write a fun diary.


#### Chicken

Chickens have more particularities and this time, we're going to explore a different technique.

Create a new chicken in your diary and call all the methods on it. Now adjust them with the following clues:

  - Chickens have a gender in addition to a name.
  - Chickens have eggs but only female can increase it when beeing fed.
  - Chickens can talk: "cock-a-doodle-doo" if the chicken is a male, "cha-caw" if it is a female.
  - A chicken's collar reads "My name is Polly, female". A little different from the basic animals.
TODO: afterwards
When all the methods returns what you expect, you're done with the class.
In this part, you called the methods first and filled them afterwards. It's like making a list of all the behaviour and properties you need and code them afterwards. It may remind you of Test Driven Development.
