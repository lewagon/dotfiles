### Roadmap of the day

#### Set-up
Before starting the challenges, ensure you have a clean git status and that you have pulled upstream. Otherwise you may work on old versions of the challenges.

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

Ensure you're connected on Slack.

#### Disclaimer

Regular expressions are advanced structures. Don't work on the Regexp challenges unless you are completely clear on the following concepts:

- variable, assignment, re-assignment
- methods, arguments, return (and difference between `return` and `puts`)
- array manipulation and use of iterators (`each`, `map`, `select`..)
- hash manipulation
- strings and symbols

If these concepts are not clear for you, **join the "ReBoot" group, who will work during 2 days on new challenges to rehearse core notions**. For the others, here is the roadmap of the day.

#### `01-Phone-regexp`
A simple challenge on regexp to detect phone patterns.

#### `02-Anagrams`
This challenge make use of Regexp to detect "non-word" characters but this is nor a pure regexp-challenge. You will learn about the time-complexity and try to enhance an algorithm enabling to detect anagrams.

#### `03-Mail-spotter`
A simple challenge on email Regexp, very usefull in web apps.