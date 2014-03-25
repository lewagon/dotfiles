An anagram is a word obtained by rearranging the letters of another word. For example, "rats", "tars" and "star" are an anagram group because they are made up of the same letters.

Given an array of strings, write a method that groups them into anagram groups and returns the array of groups. Case doesn't matter in classifying string as anagrams (but case should be preserved in the output), and the order of the anagrams in the groups doesn't matter.

##### input
```ruby
['cars', 'for', 'potatoes', 'racs', 'four','scar', 'creams', 'scream']
```
##### output
```ruby
[["cars", "racs", "scar"], ["four"], ["for"], ["potatoes"], ["creams", "scream"]]
```

### Hint 
* You can quickly tell if two words are anagrams by sorting their letters, keeping in mind that upper vs lowercase doesn't matter !
* if you're curious (and patient) you can have a look at the different [sorting algorithms](http://en.wikipedia.org/wiki/Sorting_algorithm) and their associated time complexity. Also you can have a look at [this article](http://www.igvita.com/2009/03/26/ruby-algorithms-sorting-trie-heaps/) to know on which algorithm relies ruby `sort` method