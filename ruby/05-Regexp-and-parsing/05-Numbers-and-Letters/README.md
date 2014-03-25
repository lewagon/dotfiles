I am sure you have already watched "Des chiffres et des lettres". The goal of this challenge is to write a simplified version of this game from the terminal where :

* you are given a random word-grid.
* you have to enter the longest english word you can find using only letters of this grid.
* after typing your best shot, you get your score altogether with the french definition of the word you picked up.

Here is how this should work

```
******** Welcome to the longest word-game !!********
Here is your grid :
Q E F G A J P S N
*****************************************************
What's your best shot ?
gaps
*****************************************************
You took 11.010275 seconds to answer !
Your word 'gaps' means: trou
4 Points
*****************************************************
```

This challenge will let you access a web-API, and parse JSON data returned by this API !! Pas mal de fun en perspective :)

## Tools !
This challenge is deliberately not guided. Here are some elements that will help you
* Write the pseudo code to figure out how to proceed before diving into the code
* You should use the [word-reference](http://www.wordreference.com/docs/api.aspx) api to get word french translation, in JSON format. In our code canvas, we give you our API key but you can also create your own key very easily !
* You should use the `open-uri` package from ruby standard library to make requests to this API and get the JSON result
* You should use the `json` package to parse returned JSON files.
* You should use the `rand` method or the array `shuffle` method to generate a random grid

## Make it funnier and more robust
* How do you deal with wrong user entries ? or non-english words ?
* What about making a funnier game with several rounds ?
* What about adding a time penalty ? Which rules to choose for this penalty ?



