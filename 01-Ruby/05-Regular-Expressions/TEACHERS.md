## Guidelines

### Morning lecture
- No special guidelines. Live-code all the regexps you like :). Give examples of codes both validating strings against regexps and matching data to extract info from texts.

- In case you haven't used regexp for a long time, remember the difference between `match` and `scan`

- You may also demo a small scraping like [LeBonCoin scraping](https://gist.github.com/Papillard/10654300) and use regexps to extract prices and other useful info from the texts parsed from HTML. It can be cool to show them their first gem.

- Don't forget to show them [rubular](http://rubular.com/)

### Day challenges

Before starting the challenges

- Ensure every student has a clean git status, and that he has pulled upstream. Otherwise students may work on old versions of the challenges :).

```
$ cd ~/code/${GITHUB_USERNAME}/fullstack-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

- Ensure they're connected on the class Slack

- Make a brief overview of the roadmap of the day with them, explaining the general idea behind each challenge.

#### Reboot group

Today and tomorrow, you should spend some time with the "ReBoot" group and propose them some extra challenges they should do on their own without code canvas (from scratch). First you should go on the white board with them and ask them questions on core notions. Here are some ideas for custom challenge:

1. A simple calculator, first handling only additions, then all operations (mutliplications, substractions, divisions).
1. Code a program simulating a horse race, where you enter horses, you run the race (which will shuffle the horses array) and then the command line outputs you the final results. You can make their program much funnier using `say` to simulate the anchorman. That is pretty cool :)
1. Implement [a shopping cart](https://gist.github.com/gabriel-dehan/b74a6e92deac876a80e1), where you can add items with prices in a certain amount in your cart. And then it prints you the bill on the terminal.
1. A [simple todo](http://youtu.be/vKZ3LiF6GJg?list=UUcOrCE3fuo2dkr5F_n9LalA) handling tasks and priorities
1. A todo but funnier where you store a wishlist of product and can scrape some inspiration on Etsy: [here is a solution](https://gist.github.com/Papillard/bec7546d2b921808be5f)
1. A [gift wishlist](https://gist.github.com/Papillard/24aa78105a741f129e35) connected to Etsy with a small scraping script.  
1. A loto game, [here is the interface](https://gist.github.com/Papillard/6e3708596071a3ea0648) you can make them code to start with.

Above all: 
- Start with simple questions
- Ask them to code the interface first
- Ask them to write pseudo-code before going into the ruby syntax
- Ask them to simplify the initial probem. **They have to code something that works before refactoring their code**.

### Live-code

#### General guidelines
- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)


#### Live-code details
- `O1-Enumerable`: correct just this one challenge, switching the live-coder for each iterator.
- Correct one of the extra "ReBoot" challenge. People of the advanced group may go home.
