## Re-what? Reboot!

Regular expressions are advanced structures that you don't use every day. Don't work on the Regexp challenges unless you are clear on the following concepts:

- variable, assignment, re-assignment
- methods, arguments, return (and difference between `return` and `puts`)
- array manipulation and use of iterators (`each`, `map`, `select`..)
- hash manipulation
- strings and symbols

If these concepts are not 200% clear for you, **work on ReBoot challenges to rehearse core notions**.

### Reboot challenges

You will work on these challenges **from scratch without code canvas and without `rake`**. You will start every ReBoot challenge with the teacher on the screen, to help you write the pseudo-code and kickstart every challenge.

1. `Reboot-01-Calculator`: build a simple calculator with a command-line UI, first handling only additions, then all operations (mutliplications, substractions, divisions).
1. `Reboot-02-Horse-race`: code a program simulating a horse race, where you have to enter horse names, you then run the race (which will shuffle the horses array) and then the terminal outputs the race results. You can make your program much funnier using `say` to simulate the anchorman. That is pretty cool :)
1. `Reboot-03-Instacart`: implement a shopping cart, where ultimately you can
  - Add items with prices and amount in your cart.
  - Then checkout and the terminal will print you the detailed receipt.
  - Start with a very simple program without handling prices nor available stock, then improve it.

Above all:

- Start simple and always **write pseudo-code** before translating into ruby
- Start with the interface and then refacto your code with methods
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
