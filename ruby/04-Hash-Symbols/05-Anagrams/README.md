<br>
Write 2 methods `anagrams?(a_string, another_string)` and `anagrams_on_steroids?(a_string, another_string)` that return whether or not two strings are anagrams. Anagrams are strings where only the order of the characters differs.
<br>
#### Let's do some maths :

* the first method `anagrams?` should use the ruby `sort` method. Given the length of the input words `n = a_string.length`, what's the complexity of this algorithm ? **You should write this complexity as a comment in your submitted code !**

* use a ruby `Hash` to improve this complexity ? What's you new complexity ? Again, write it in you code as a comment

<br>
#### Resources & Hints 
* First learn more about what [time complexity](http://en.wikipedia.org/wiki/Time_complexity) means
* try to google the time-complexity of ruby native `sort` method
* Learn more about [Hash](http://www.ruby-doc.org/core-2.0.0/Hash.html) as a data structure. How would you model the number of occurences of each character of a String using a ruby Hash ? What's the link with the anagrams problem ?