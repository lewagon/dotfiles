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

Today, the "ReBoot" group should keep working on simple challenges to master core notions. Don't be disappointed! You'll be able to parse and store data later on in you ruby life. For the others, here's teh roadmap.

#### `01-CSV-parsing`
A challenge to make you read data from a CSV file of american movies and find most successful blockbusters.

#### `02-Numbers-and-letters`
This challenge is quite sophisticated. You have to re-code the french game "Des chiffres et des lettres", that gives you a random grid of letters and ask you to find the longest word in this grid. To decide if a word exists, we'll make use of the WordReference API that responds "a JSON of different translations" for any given word.