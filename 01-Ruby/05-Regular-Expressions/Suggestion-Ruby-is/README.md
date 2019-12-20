## Background & Objectives

This challenge is a riddle. You'll be provided with a long text telling the story of a first day at Le Wagon.
Inside this text, lies a secret message, follow the instructions to discover it.

## Specs

### `#find_word_at_index`

The function `#find_word_at_index` should return the word at a given index from a sentence.
Use regex to capture the word.

Reminder of how to use parenthesis to capture groups with regex:

```
match_data = "Capture me".match(/^(\w+) (\w+)$/)
puts match_data[2]
=> "me"
```

### `ruby_is`

Code the `ruby_is` function to find the secret message.
Take the 6th word of each sentence, then join them in a string to form the message.


## Further suggestions & resources

The message your discovered is the official description of Ruby.

Read more on [Ruby's website](https://www.ruby-lang.org/en/)