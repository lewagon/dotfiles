## Background & Objectives

During your journey at Le Wagon, you'll learn a lot of tools, services and languages.
Here are the logos of the main ones, but they are all black and white at the moment!
This challenge is a regex game to reveal their colors.

![Logos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/double-rainbow_logos.png)



## Specs

So, what colors are the logos? All color names are hidden in **secret messages**. Your mission is to build the correct regexes to extract them!

Open `lib/double_rainbow.rb` where a series of methods await you, each one is an enigma to solve.

- **Use a regex** to extract the color name from `secret_message`
- Follow hints and instructions to build the regex
- Each method **returns a string**

**Example**

```ruby
secret_message = "123goodLUCK"
secret_message.match(/\D+/)[0]

# => "goodLUCK"
```

Get help with [Rubular](http://rubular.com/)
