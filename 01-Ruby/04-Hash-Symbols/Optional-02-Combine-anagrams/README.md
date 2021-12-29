An anagram is a word obtained by rearranging the letters of another word. For example, "SPOT", "OPTS", "POTS" and "POST" are an anagram group because they are made up of the same letters.

Given an array of strings, write a method that groups them into anagram groups and returns the array of groups. Case doesn't matter in classifying string as anagrams (but should be preserved in the output), and the order of the anagrams in the groups doesn't matter either.

## Specs

##### input

```ruby
# input
['cars', 'for', 'POTATOES', 'racs', 'four', 'scar', 'creams', 'SCREAM']

# output
[["cars", "racs", "scar"], ["four"], ["for"], ["POTATOES"], ["creams", "SCREAM"]]
```

### Hints

* You can quickly tell if two words are anagrams by sorting their letters, keeping in mind that upper vs lowercase doesn't matter!
* If you're curious (and patient) you can have a look at the different [sorting algorithms](http://en.wikipedia.org/wiki/Sorting_algorithm) and their associated time complexity. Also you can have a look at [this article](http://www.igvita.com/2009/03/26/ruby-algorithms-sorting-trie-heaps/) to learn about which algorithms rely on the Ruby `sort` method.
