## Background & Objectives

- Get familiar with parsing JSON format
- Learn how to separate responsabilities of your gaming program in several sub-methods

## Specs

I am sure you have already watched "Des chiffres et des lettres". The goal of this challenge is to write a simplified version of this game from the terminal where :

* you are given a random word-grid.
* you have to enter the longest english word you can find using only letters of this grid.
* after typing your best shot, you get your score altogether with the time you took, the french definition of the word you picked up, and eventually some message explaining why you failed.

Here is how this should work, when running `ruby lib/interface.rb`:

```bash
******** Welcome to the longest word-game !********
Here is your grid :
["Q", "F", "M", "R", "K", "L", "I", "T", "P"]
*****************************************************
What's your best shot ?
lift
******** Now your results ********
Your word: lift
Time Taken to answer: 12.07916
Translation: soulever
Your score: 3.194722666666667
Message: well done
```

This challenge will let you access a web-API, and parse JSON data returned by this API!

**Constraints**:

- For your code to pass the tests, you should consider the first translation among the principal translations given by the API. You will use the [Systran REST Translation API](https://platform.systran.net/reference/translation). Sign up on [http://www.systran.io/](http://www.systran.io/) and get your **server** API key on the [administration console](https://platform.systran.net/user/admin#/apiKeys). Look at the apple JSON translations: [https://api-platform.systran.net/translation/text/translate?source=en&target=fr&key=YOUR_API_KEY&input=apple](https://api-platform.systran.net/translation/text/translate?source=en&target=fr&key=YOUR_API_KEY&input=apple).
- Your grid should be a real random grid, hence possibly embed same characters multiple times.
- Make sure you check if the word is an english word, i.e. has a translation, and if it is well included in the grid.
- If the word is not valid or is not in the grid, the score will be 0 and you should build a custom message to explain it to the player.
- Your score should depend on the time you take to answer, and of the length of the word you found. The longer word the user finds and the quicker he answers, the better score he gets. Saying that, feel free to invent your own penalty rules!
- The Systran API might stop to respond at some point (too much requests from you guys!). Try to implement a **fallback** strategy where you [`rescue` the error](http://rubylearning.com/satishtalim/ruby_exceptions.html), and look at the built-in dictionary (English-only):

```ruby
words = File.read('/usr/share/dict/words').upcase.split("\n")
```

## Key learning points

- What's a JSON file ? How is it close from the structure of a ruby hash ?
- How could you refactor your code to separate the responsabilities of each method ?

## Further suggestions & resources

This challenge is deliberately not guided. Here are some elements that will help you

* Write the pseudo code to figure out how to proceed before diving into the code
* You can install the extension JSONView for [Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc) or [Firefox](https://addons.mozilla.org/fr/firefox/addon/jsonview/) to help you read a JSON rendered by an API.
* Use the `open-uri` package from ruby standard library to make HTTP requests to this API and get the JSON result. Use the `json` package to parse returned JSON files.
* For testing the grid inclusion, make use of `Enumerable#all?`
