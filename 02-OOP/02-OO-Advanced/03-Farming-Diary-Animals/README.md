## Background and Objectives

This challenge is an extension of the previous one: the farm welcomes its first animals!


## Specs
The farm has two kinds of **animals** (cows and chickens).

![Animals](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/animals.svg?sanitize=true)

Discuss with your buddy: how many classes do you think you need, and how would you structure them?

Don't `rake` now! Wait until the very end of the challenge, try to code everything by yourself first!


### Structure
You are now familiar with the benefits of inheritance, let's figure out the classes we need!
- Create the three `Animal`, `Cow` and `Chicken` classes all at once and leave them empty
- Set the proper inheritance in the two appropriate classes

Unlike in the previous challenge, let's start by coding the common behaviour in the parent class!

- An animal is initialized with a **name**
- You can **feed** an animal: it will increase its **weight** by 1


### Cow

To figure out the `Cow` class, let's start by coding the **program** we want to run.
- Open `farming_diary.rb` and create a new instance of `Cow`.
- Call the methods `feed!` and `talk` on your cow (even if the class is not ready yet).
- Run the file with `ruby lib/farming_diary.rb`. Solve one error message at a time by adding the right code to your `Cow` class, and keep going until everything works as expected.

Here is what you need to know about cows:

- A cow has a starting **weight** of `400_000` (grams).
- Each time you feed the cows, they produce one gallon of **milk**.
- Cows can `talk`, they say "moo".

**Reminder:** always use the keyword `super` when you need to call the parent method.

Here is an example of the Cow day in Farming Diary:
```bash
📝 Day Four: Cow
Rebecca produced 1 liter(s) of milk
Rebecca says moo
```

### Chicken

You're completly free to run your tests and choose your methodology. Don't be afraid to make mistakes, explorations is the best way to learn and have fun. Discuss with your buddy!

Here are a series of clues for the chickens:

  - Chickens **weight** 800 (grams)
  - Chickens have a **gender**, they can be `male` or `female`.
  - You can `feed!` the chickens. If they are female they produce **eggs** (one every time).
  - Chickens can `talk` too: "cock-a-doodle-doo" if the chicken is a male, "cha-caw" if it is a female.

When all the methods returns what you expect, you're done with the chicken. Have fun!



## Take away

Congratulations! You can run the `rake`now and check if everything is OK.

You've created inheritance with two different approaches:
- In the first challenge, you refactored two classes and moved shared methods to a parent class.
- In the second one, you designed the inheritance before coding the classes.

Both methods are valid, but taking time to design the structure before coding is always the best of all the ideas.

To implement methods and variables, you did:
- Code class first and check afterwards if they work
- Call all the methods and go back to the class to develop them.
