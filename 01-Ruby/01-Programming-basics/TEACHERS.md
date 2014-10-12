## Guidelines

### Morning lecture

That's one of the most important lectures. Don't underestimate how hard it is for beginners to understand simple concepts: variable assignation, method definition vs method call, etc.. Above all, **avoid digressions**, even if an some guy asks you a very cool questions on `Proc` :). Stay in the scope and keep it simple, spending more time answering questions on simpler but more crucial questions.

#### Built-in objects

- Spend some time (but not too much) on the slides.
- Then switch on IRB to live-code some examples of simple statements on built-in objects (try to make it interactive and ask questions to the students)

#### How to run your code?

- The main message to give is the following: IRB is the playground to make experiments, your ruby file is your source code! So play with IRB and **then** write your solution in your file, not the other way around.
- Show how to launch IRB (you've just used it to demo built-in objects), how to quit it, and explain its outputs.
- Then show how to run a ruby script from the terminal and how to display results with `puts`. Make them understand that a ruby program can run without printing things on a terminal and that `puts` is just a usefull method as the terminal is our only interface at the moment (you can tease them & say that it will be a web page later on!)

#### Variables

- **Spend time on this!**. Start with the slides then go to the white board to make "shoes box" drawings. A variable is like a **named** shoes box containing a value. When we assign it, we put something in the shoes box. When we use it, we use its content. When we re-assign it, we change our shoes, etc..

- Take your time on assignment and re-assignment coding 2 or 3 different examples on a ruby file. Ask them questions to ensure they get it! Hammer on the fact that a **variable is not a string**, it has no `""`!

#### Methods

- Again **go slowly**, and live-code different examples to ensure they  really understand the difference between defining and calling a method, and the difference between parameters and arguments !

- Also spend time on the notion of **return**. Make them understand that a method is like a "black box" or a "factory". You feed it with values in input (the arguments) and then it outputs a result (the return). Here is a useful story to make them understand: "A smart ass phD has given you the coolest machine learning method ever with 50 000 lines of code. Unfortunately, he forgot about the return of his method... Now you can't use it! What a shame!".

- Hammer on the difference between `puts` and a method return, sometimes there's lot of confusion on this! **Force them to use the keyword `return`EXPLICITELY during the first week**

- substitution methodology: on the last slide, copy-paste the example in a ruby file (cf. below) and progressively replace nested values with their result to make them understand how we proceed (from right to left, form more nested to less nested, replacing a variable or method call by its value or return)

```ruby
def add(x, y)
  x + y
end

def double(x)
  2 * x
end
number = 3
number = double(add(double(add(number, 2)), double(number))) # replace step-by-step each part by its value
number = double(number - 22) # idem
```

### Day challenges
Before starting the challenges

- Ensure every student has a clean git status, and that he has pulled upstream. Otherwise students may work on old versions of the challenges :).

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

- Ensure they're connected on the class Slack

- Make a brief overview of the roadmap of the day with them, explaining the general idea behind each challenge.

### Live-code

#### General guidelines
- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)


#### Live-code details

1. `02-Experiment-methods`: just pick up some of the methods to live-code by a students, not all of them!
1. `03-What-your-name`: Pick another student. Do not make thim read the challenge README, but make him explain in his own words what his program should accomplish and what he is trying to do (no matter if it differs from the original README). If he gets a hard time writing some code, help him write some pseudo code in english in his ruby file. That's of great help with beginners. Spend time on this live-code proposing some refacto and enhancement of the program.
1. `05-Stupid-coaching`: you may be short on time for this one. Hencen choose a more advanced student so that he'll code faster and explain more clearly his methodology.


