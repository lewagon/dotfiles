## Background & Objectives

- Get some basic knowledge on what [time complexity](http://en.wikipedia.org/wiki/Time_complexity) means
- Learn to use `Hash` in programming algorithms

## Specs

Implement the 2 methods `#anagrams?(a_string, another_string)` and `#anagrams_on_steroids?(a_string, another_string)` that return whether or not two strings are anagrams (a boolean). Anagrams are strings where only the order of the characters differs.

- the first method `#anagrams?` should make use the ruby `sort` method.
- use a ruby `Hash` to improve the time complexity in the second implementation `#anagrams_on_steroids?(a_string, another_string)`, meaning that your second solution should be faster.

## Learning Badges

- What's the time complexity of `#anagrams?` and `#anagrams_on_steroids?` ? Which one is best ?

## Tips & Resources

- First learn more about what [time complexity](http://en.wikipedia.org/wiki/Time_complexity) means
- Try to google the time-complexity of ruby native `sort` method
- Learn more about [Hash](http://www.ruby-doc.org/core-2.1.2/Hash.html) as a data structure. How would you model the number of occurences of each character of a String using a ruby Hash? What's the link with the anagrams problem?
