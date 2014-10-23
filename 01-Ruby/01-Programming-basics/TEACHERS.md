## Guidelines

### Morning lecture

That's one of the most important lectures. It's very difficult for beginners to understand simple concepts: variable assignation, method definition vs method call, etc.. **Try to avoid digressions**, even if some smart guy asks you a very cool questions on `Proc` :). Stay in the scope and keep it simple, spending more time answering questions on simple (but crucial) concepts.

#### Built-in objects

Spend some time on the slides. You may switch on IRB to live-code examples of small operations on built-in objects.

#### How to run your code?

Explain that IRB is the **playground to make experiments**, your ruby file is your source code. So play with IRB and **then** write your solution in your file, not the other way around. Show them how to launch IRB, how to quit it, and explain its outputs.

A cool thing to do is to ask the class a simple treatment (capitalize word, count letters, etc..) and then show them the overall methodology to find the answer => **Google/StackOverflow/ruby doc/IRB to experiment**.

Now show them how to run a ruby script from the terminal and how to display results with `puts`. **Very important**: make them understand that a ruby program can run without printing things on a terminal and that `puts` is just a usefull method as the terminal is our only interface at the moment (you can tease them & say that it will be a web page later on). 

#### Variables

**Spend time on this**. Go along the slides. Go to the white board to make "shoes box" drawings. Whatever it takes to make them understand. Here is some way of explaining it: a variable is like a **named** shoes box containing a value. When we define it, we put a value in the shoes box. When we use it, we use this value. When we re-assign it, we change this value, etc, etc..

Take your time on assignment and re-assignment coding 2 or 3 different examples of you choice in a ruby file. Ask them questions to ensure they get it! Hammer on the fact that a **variable is not a string**, it has no `""` :)

#### Methods

Again **go slowly**, and live-code different examples to ensure they  really understand the difference between defining and calling a method, and the difference between parameters and arguments. 

Spend time on the notion of **return**. A good way of explaining a method is to see it as "black box" or a "factory". You feed it with values in input (the arguments) and then it outputs a result (the return). Here is a useful story to make them understand: "A smart ass phD has given you the coolest machine learning method ever, with 50 000 lines of code. Unfortunately, he forgot about the return of his method... Now you can't use it! What a shame!".


```ruby
# My PhD friend defining his method
def coolest_algo_ever(number)
  # 50 000 lines of cool code manipulating the number"
  return "Oups I just forgot how return is important :)"
end

# Now me using his method :)
coolest_result = coolest_algo_ever(3)

puts coolest_result + 10 # oups... it does not work :)
```

Hammer on the difference between `puts` and a method return, sometimes there's lot of confusion on this! **Force them to use the keyword `return` EXPLICITELY during the first week**


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


