## Background & Objectives

- Before starting, take some time to have a read of [time complexity](http://en.wikipedia.org/wiki/Time_complexity)
- Learn to use `Hash` in programming algorithms
- And if you didn't know... An anagram is a word or phrase formed by rearranging the letters of another word or phrase

## Specs

Implement the 2 methods `#anagrams?(a_string, another_string)` and `#anagrams_on_steroids?(a_string, another_string)` that check whether or not two strings are anagrams (returning a boolean).

- the first method `#anagrams?` should make use of the ruby `sort` method.
- use a ruby `Hash` to improve the time complexity in the second implementation `#anagrams_on_steroids?(a_string, another_string)`, meaning that your second solution should be faster.

## Key learning points

- What's the time complexity of `#anagrams?` and `#anagrams_on_steroids?`? Which one is best?

## Further suggestions & resources

- Try to google the time-complexity of ruby native `sort` method
- Learn more about [Hash](http://www.ruby-doc.org/core-2.4.0/Hash.html) as a data structure. How would you model the number of occurences of each character of a String using a ruby Hash? What's the link with the anagrams problem?
