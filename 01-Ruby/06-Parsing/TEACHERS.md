## Guidelines

### Morning lecture

#### Data formats
Start by describing quickly CSV, XML, and JSON data formats. For CSV, explain that they may encounter different formatting (e.g. comma or semi-coma delimiters, quotes or no-quotes around each cell, etc.).


#### Parsing and storing CSV
- Make the demo parsing and storing beers in a CSV
- Ask them what’s the `row` class when parsing the CSV? with or without the headers ?
- Explain the need of quotes delimiters for cell (e.g. ambiguity if the texts include comas themselves..)
- speak of IO read/write mode if you want.

#### Parsing and storing XML
**Go quicly on these slides and don't do the corresponding live-code** (CSV and JSON are more important)

#### Playing with web-services
Make the live-code on the Chuck Norris API, showing that it returns JSON, that can be parsed into ruby hash.


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

#### Reboot group

You should continue working on simple challenges with the ReBoot group. Here is a list of possible challenge, but feel free to invent your own!

1. A simple calculator, first handling only additions, then all operations.
1. Implement a [shopping cart](https://gist.github.com/gabriel-dehan/b74a6e92deac876a80e1), where you can add items with prices in a certain amount in your cart. And then it prints you the bill on the terminal.
1. Code a program simulating a horse race, where you enter horses, you run the race (which will shuffle the horses array) and then the command line outputs you the final results. You can make their program much funnier using `say` to simulate the anchorman. That is pretty cool :)
1. A [simple todo](http://youtu.be/vKZ3LiF6GJg?list=UUcOrCE3fuo2dkr5F_n9LalA) handling tasks and priorities
1. A loto game, [here is some interface as an example](https://gist.github.com/Papillard/6e3708596071a3ea0648) you can make them code to start with.

If some of the students of the ReBoot group are more advanced than others, you can ask them to make their todo-list or shopping cart persistent, by writing/reading in a CSV file (for that, they will have to use the morning lecture about parsing/storing data).

### Live-code

#### General guidelines
- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)


#### Live-code details
- `O2-Numbers-and-letter`: correct just this one challenge, switching the live-coder every 15 minutes to keep them awaken ;)
