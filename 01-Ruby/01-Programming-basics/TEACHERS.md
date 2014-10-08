## Guidelines

## Morning lecture

1. **BUILT-IN OBJECTS**: spend some time (but not too much) on the slides. Then switch on IRB to live-code some examples (try to make it interactive and ask questions to the students)
1. **HOW TO RUN YOUR CODE?**: Here is the main message to give: IRB is the playground to make experiments, your ruby file is your source code! So play with IRB and then write your solution in your file, not the other way around. Show how to launch IRB (you have just used it before), how to quit it, and explain its outputs. Then show how to run a ruby script from the terminal and how to display results with `puts`. Make them understand that a ruby program can run without printing things on a terminal and that `puts` is just a usefull method as the terminal is our only interface at the moment (you can tease them & say that it will be a web page later on!)
1. **VARIABLES**: **Spend time on this**. Go to the white board to use the "shoes box" metaphora. A variable is like a **named** shoes box containing a value. Take your time on assignment and re-assignment coding few examples on a ruby file. Ask them questions to ensure they get it! Hammer on the fact that a **variable is not a string**, it has no `""`!
1. **METHODS**: Again **go slowly**, and live-code different examples to ensure they  really understand the difference between defining and calling a method, and the difference between parameters and arguments ! Also spend time on the notion of **return**. Make them understand that a method is like a black box or a factory. It **eats** values in input (the arguments), and then outputs the result. Give them this example, "A smart maths phD has given you the coolest machine learning method with 50 000 lines of code, but has forget about the return... Now you can't use it! what a shame". Hammer on the difference of `puts` and a method return, sometimes there's lot of confusion on this!

## Day challenges
- Before starting the challenges, ensure every student has a clean git status, and that he has pulled upstream, in case the challenges have been changed by the teachers. Otherwise students may work on old versions of the challenges :).
- Make a brief overview of the roadmap of the day with the class, explaining the idea behind each challenge.

## Live-code
The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!


### Challenges to live-code

1. `02-Experiment-methods`: just pick up some of the methods to live-code by a students, not all of them!
1. `03-What-your-name`: Pick another student. Do not make thim read the challenge README, but make him explain in his own words what his program should accomplish and what he is trying to do (no matter if it differs from the original README). If he gets a hard time writing some code, help him write some pseudo code in english in his ruby file. That's of great help with beginners.
1. `05-Stupid-coaching`: choose a more advanced student for this one so that he gives a good example to the class, and explain clearly how his methodology.


At the end of the live-code, ensure every `git status` is clean in the class!