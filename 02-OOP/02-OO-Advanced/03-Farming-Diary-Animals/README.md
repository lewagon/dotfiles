## Background and Objectives

This challenge is an extension of the previous one: the farm welcomes its first animals!


## Specs
The farm has two kinds of animals: cows and chickens.

![Animals](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/animals.svg?sanitize=true)

Discuss with your buddy: how many classes do you think you need, and how would you structure them?

Don't `rake`! Wait until the very end of the challenge, follow the guidelines and let the farming diary guide you into coding the classes!


### Parent and children
We are now familiar with the benefits of inheritance, let's go ahead and:
- Create the three empty classes
- Set the proper inheritance relationship between the two children class and the parent class

Unlike in the previous challenge, let's start by coding the common behaviour in the parent class!

- An animal is initialized with a **name** and zero **energy**
- You can **feed** an animal: it will increase its **energy** by 1


### Cow
To figure out the `Cow` class, let's start by coding the **program** we want to run.
- Open the `lib/farming_diary.rb` interface and instantiate a new `Cow`
- Call the methods `feed!` and `talk` on your cow (even if the methods are not coded yet)
- Run the file with `ruby lib/farming_diary.rb` and solve one error message at a time by coding the `Cow` class

Here is what you need to know about cows:

- Each time you feed the cows, beyond gaining energy, they produce 2 liters of **milk**
- When cows `talk`, they say "moo"

Here is an example of the Cow day in the Farming Diary:

```bash
📝 Day Four: Cow
Marguerite produced 2 liters of milk
Marguerite says moo
[...]
```

### Chicken
Let's move on to the Day Five of our farming diary.
- Instantiate two chickens, a male and a female
- Fill in the TODOs with the appropriate code

Here is what you need to know about chickens:

- Chickens have a **gender**
- When you **feed** chickens, beyond gaining energy, females produce two **eggs** (and males none 🤷‍♂️)
- Chickens can talk: males say "cock-a-doodle-doo" and females say "cha-caw"

Here is an example of the Chicken day in the Farming Diary:

```bash
📝 Day Five: Chicken
Bob produced 0 eggs and says cock-a-doodle-doo
Alice produced 2 eggs and says chack-caw
[...]
```

## Take away

Congratulations! You can run the `rake` now to check that your code is properly organized.

In children class, there are 4 kinds of methods:
- methods that **inherit** from the parent class: the method is only defined in the parent class
- methods that **extend** the parent's method definition: the method is slightly different in the children classes
- methods that **override** the parent's method: definition is completely different than in the parent class
- methods that are specific to the child class: they are not defined in the parent class _at all_

Extending a method requires the `super` keyword: it acts as if you copied the body from the parent method and pasted it where `super` is invoked.
