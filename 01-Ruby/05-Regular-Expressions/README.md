## Re-what? Reboot!

Regular expressions are advanced structures. Don't work on the Regexp challenges unless you are completely clear on the following concepts:

- variable, assignment, re-assignment
- methods, arguments, return (and difference between `return` and `puts`)
- array manipulation and use of iterators (`each`, `map`, `select`..)
- hash manipulation
- strings and symbols

If these concepts are not clear for you, **join the "ReBoot" group, who will work during 2 days on new challenges**.

### Reboot challenges

You should work on these challenges **from scratch without code canvas and without `rake`**. Sometimes that's the best way to learn how to "think your code". Here are today's challenges



1. `01-calculator`: build a simple calculator with a command-line UI, first handling only additions, then all operations (mutliplications, substractions, divisions). Start with the interface coding a uber-simple version. Then improve it. Here is [a possible solution](https://gist.github.com/Papillard/e86694010d97ebafee68), don't look at it!
1. `02-horse_racing`: code a program simulating a horse race, where you have to enter horse names, you then run the race (which will shuffle the horses array) and then the terminal outputs the race results. You can make your program much funnier using `say` to simulate the anchorman. That is pretty cool :) Here is [one possible solution](https://gist.github.com/Papillard/4d38c112cacffa009b5c).
1. `03-instacart`: implement a shopping cart, where ultimately you can
  - Add items with prices and amount in your cart.
  - Then checkout and the terminal will print you the detailed receipt.
  - Start with a very simple program without handling prices nor available stock, then improve it.
  - Here is [one possible solution](https://gist.github.com/gabriel-dehan/b74a6e92deac876a80e1) and here is [another one](https://gist.github.com/Papillard/6bdf49d9ab63f79cf9cd). Be smart, don't look at these solutions when you start :)

Above all:

- Start simple
- Start with the interface and then refacto your code with methods
- **Write pseudo-code** before translating it into ruby
- **Code something that works before handling exception**.

### Advanced challenges

For the others, here is the roadmap of the day.

#### `01-Phone-regexp`
A simple challenge on regexp to detect phone patterns.

#### `02-Anagrams`
This challenge makes a small use of Regexp to detect "non-word" characters but this is not a pure "regexp challenge". You will mainly learn about the notion of time-complexity and try to enhance a program detecting anagrams.

#### `03-Mail-spotter`
A simple challenge on email Regexp, very useful in web apps.

#### `04-Word-frequency`
A challenge using Regexp to extract data from a text and compute the most frequent words in a given text (the Bible, Obama's inaugural address, etc..). You will have to filter stop-words like ("a", "the", "is"..) who will spoil your algorithm otherwise.
