Write a program that takes a filename and a parameter n and prints the n most common words in the file, and the count of their occurrences, in descending order. This should work this way (taking the bible in input as an example):

```ruby
most_common_words('source-text.txt', 3)  # prints => 
> 'lord': 8722 occurrences
> 'God': 7380 occurrences
> 'Jesus': 2617 occurrences
```

## Get rid of the noise
Add a filter to your method to get rid of common words as ("a", "the", "is", ...). Here is some help:
* such common words are called stop-words. [Here](http://en.wikipedia.org/wiki/Stop_words) you can find some lists of English stop-words, which you can use to build a stop-words array that you will use in your program.

## Be creative
Run your program on some original text (political speech, fairy tale, etc...)