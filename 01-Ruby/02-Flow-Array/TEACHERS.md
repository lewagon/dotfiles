## Guidelines

### Morning lecture

#### Controlling the flow

- A cool way to start is to explain the standard way ruby instuctions are read in a file => **line-by-line, top to bottom**, at least at this point of their ruby career :)
- Show how a simple method breaks the flow yo! Follow the flow with them on simple examples.
- Introduce one-by-one the other structure modifying the flow: `if..end`, `if !..end` `if..else..end`, `for..end`, `while/untill..end`. For each structure, pick some cool & simple example of your choice.
- Once you've finished these demos and anwsered questions, scroll quickly on the slides to show them they can retrieve the syntax there. 

#### Arrays

Here you can make a very basic live-code (with the "Beatles example" in the slide or some other one you pick). Define an empty array, append it few elements, access elements with their index, compute the array size, change some cell value. Keep it very elementary and ask them questions to see if they get it.

Go quickly on the slide after the live-code. The students should understand them at a glance if your live-code was good :)

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


