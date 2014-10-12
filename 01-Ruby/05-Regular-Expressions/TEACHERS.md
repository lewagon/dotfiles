## Guidelines

### Morning lecture
- No special guidelines. Live-code all the regexps you like :). Give examples of codes validating strings against regexps, and matching data to extract infos from texts.

- You may demo a small scraping like [LeBonCoin scraping](https://gist.github.com/Papillard/10654300) and make use of regexps to extract prices and other infos from the strings parsed from HTML (it's cool to show them their first gem).

- Don't forget to show http://rubular.com/

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

Today and tomorrow, you should spend some time with the "ReBoot" group and propose them some extra challenges they should do on their own without code canvas (from scratch). First you should go on the white board with them and ask them questions on core notions. Here are some ideas for custom challenge:

1. A simple calculator, first handling only additions, then all operations.
1. Implement a shopping cart, where you can add items with prices in a certain amount in your cart. And then it prints you the invoice on the terminal.
1. Code a program simulating a horse race, where you enter horse name, you run the race (which will shuffle the horse array) and then it gives you the final results. Make their program much funnier using `say` to simulate the anchorman. That is cool :)
1. A [simple todo](http://youtu.be/vKZ3LiF6GJg?list=UUcOrCE3fuo2dkr5F_n9LalA) handling tasks and priorities

Above all, start with simple questons, asking them to code subsets of the final program. They'll be quickly lost otherwise.

### Live-code

#### General guidelines
- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)


#### Live-code details
- `O1-Enumerable`: correct just this one challenge, switching the live-coder for each iterator.
