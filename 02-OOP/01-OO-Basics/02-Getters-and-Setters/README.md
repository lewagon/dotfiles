## Background & Objectives

A **getter** is a method that **requests** information from our instance variable. A **setter** is a method that **changes** information in our instance variable.

In this exercise, we are going to implement a simple vending machine (`VendingMachine` Ruby class) where a user can buy snacks for a given price. The user can go to the machine, insert some coins and then press a "Buy" button.

## Specs

**Do not run `rake` right away**. The goal of the exercise is for you to **read** some Ruby code, and trying to figure out what's missing in the `VendingMachine` class.

### Buying scenario

Open the `lib/buying_scenario.rb`, and read it line by line. You can do some [Rubber Duck Debugging](https://rubberduckdebugging.com/) where you explain line by line what the code does to your duck. Once you've done that, let's run the code:

```bash
ruby lib/buying_scenario.rb
```

The code will **fail** with an error message. That's the beginning of the exercise! You need to figure out what code you need to add in the `lib/vending_machine.rb` to make this scenario work!

### Refilling scenario

This scenario is simpler. Now we start with an empty vending machine, so a technician needs to come and refill it with some snacks!

```bash
ruby lib/refilling_scenario.rb
```

Same idea here, the code will fail. It's your job to figure out what to add into the `lib/vending_machine.rb` file!

### Finally, we can `rake`

When you are happy with how the two scenarios work, check that your code is correct with:

```bash
rake
```

There might be a little more work to do in your `VendingMachine` class 😉

## (Advanced) Some open questions 🤔

1. You may have noticed that in both scenario files, there is a `display` method. How could we refactor this code so that it may be more "object-oriented"? Doing so, how can we change our getters to expose **less** information to the external world? The concept you need to remember here is [**Encapsulation**](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).
2. You used a setter to update the amount of snacks when refilling. How could we change this code to use an instance method instead of this writer? Why is it better?
