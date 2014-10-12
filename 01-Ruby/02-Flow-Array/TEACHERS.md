## Guidelines

### Morning lecture

#### Controlling the flow

- Start with a live code, not with the slides!
- Present the standard way ruby instuction ar read in a file, line-by-line, from top to bottom
- Then show how a simple method call can change the order of execution, break the flow yo!
- Introduce one-by-one the others structure on some personal examples you pick: `if..end`, `if !..end` `if..else..end`, `for..end`, `while/untill..end`
- Once you've finished your demo and anwsered questions, scroll quickly on the slides to show the students they have all the syntax elements written on the slides.

#### Arrays

- Again, start with a live-code. You can take the same example as the one used in the slides on the "Beatles". If you do so, students won't feel lost reading the slides after your talk.
- Your live-code should explain basic operations on array: how to define an array (eventually empty), get the value of a cell, change this value, append an new element, get the array size,..
- Go quickly on the slide after the live-code. The students should understand them at a glance if your live-code was good :)


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

1. `01-Sorting-the-wagon`: again, let the student improvise a bit and don't force him to respect the specs of the challenge exactly. Just help him go in the right direction and ask himself the good questions. What do you want ? Define an empty array ? Fill this array ? Output some infos ? Which infos ? In which format ? All these answers must be his programming choices.
1. `03-Black-Jack`: Pick some more advanced student for this one, to give a good example to the class. Again, start from scratch with him!


