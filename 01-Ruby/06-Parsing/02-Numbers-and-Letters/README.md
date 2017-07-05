## Background & Objectives

- Get familiar with parsing JSON format
- Learn how to separate responsibilities of your gaming program into several sub-methods

## Specs

If you watch French TV, you may have stumbled upon [_Des chiffres et des lettres_](https://en.wikipedia.org/wiki/Des_chiffres_et_des_lettres). For the English students, you might be more familiar with [Countdown](https://www.youtube.com/watch?v=GvV8aVEJmiU)!

The goal of this challenge is to write a simplified version of this game from the terminal where:

* you are given a random set of letters.
* you have to enter the longest english word you can find using only letters in the grid.
* after typing your answer, you get your score combined with the time you took, the french definition of the word you chose, and eventually an error message if you failed.

Here is how this should work, when running `ruby lib/interface.rb`:

```
******** Welcome to the longest word-game !********
Here is your grid:
Q F M R K L I T P
*****************************************************
What is your best shot?
lift
******** Now your results ********
Your word: lift
Time Taken to answer: 12.07916
Translation: soulever
Your score: 3.194722666666667
Message: well done!
```

This challenge will let you access a web-API, and parse JSON data returned by this API!

**Constraints**:

- For your code to pass the tests, you should consider the first translation among the principal translations given by the API. You will use the [Systran REST Translation API](https://platform.systran.net/reference/translation). Sign up on [http://www.systran.io/](http://www.systran.io/) and get your **server** API key on the [administration console](https://platform.systran.net/user/admin#/apiKeys). Look at the apple JSON translations: [https://api-platform.systran.net/translation/text/translate?source=en&target=fr&key=YOUR_API_KEY&input=apple](https://api-platform.systran.net/translation/text/translate?source=en&target=fr&key=YOUR_API_KEY&input=apple).
- Your grid should be a real random grid, making it possible to embed the same characters multiple times.
- Make sure you have something in place to check if the word exists in English, i.e. has a translation, and if every letter appears in the grid.
- If the word is not valid or is not in the grid, the score will be 0 and you should build a custom message to explain it to the player.
- Your score should depend on the time you take to answer plus the length of the word you found. The longer the word and the quicker the time, the better the score! Although feel free to invent your own penalty rules!
- The Systran API might stop to respond at some point (too many requests from you guys!). Try to implement a **fallback** strategy where you [`rescue` the error](http://rubylearning.com/satishtalim/ruby_exceptions.html), and consult at the built-in dictionary instead (English-only):

```ruby
words = File.read('/usr/share/dict/words').upcase.split("\n")
```

## Key learning points

- What's a JSON file? How is it close from the structure of a ruby hash?
- How could you refactor your code to separate the responsibilities of each method?

## Further suggestions & resources

This challenge is deliberately not guided. Here are some elements that will help you:

* Write the pseudo code to figure out how to proceed before diving into the code
* You can install the extension [Json Formatter for Chrome](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) to help you read a JSON rendered by an API.
* Use the `open-uri` package from ruby standard library to make HTTP requests to this API and get the JSON result. Use the `json` package to parse returned JSON files.
* For testing the grid inclusion, try making use of `Enumerable#all?`
