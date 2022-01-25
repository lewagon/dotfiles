## Background & Objectives

During your journey at Le Wagon, you will discover a lot of tools, services and languages. Here are the logos of the main ones, but they are all in black and white at the moment. This challenge is a game to reveal their colors, using regular expressions!

![Logos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/double-rainbow_logos.png)

## Specs

What are the logos actual colors? They are hidden in a **secret message**. Your mission is to build the correct regexes to extract them!

### The secret message

*Reveal the logos' colors: Elegant shapes, some have evolved to a very iconized style. Definitely a vivid color scheme with bright orange and shiny yellow, many shades of blue, oscillating between purple and indigo! but not much green*

### Code the regexes

Open `lib/double_rainbow.rb` where a series of methods await you, each one is designed to extract text from the secret message:
- Follow hints and instructions to build your regex.
- Each method **takes a string** as a parameter and **returns a string**

When your regex is correct, it will pick a color and unlock a badge.

Get help with [Rubular](http://rubular.com/)

### Test your code

You can test your code by calling your methods with the secret message and running `ruby lib/test.rb`:

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
require_relative "double_rainbow"

secret_message = "Reveal the logos' colors:\
 Elegant shapes, some have evolved to a very iconized style.\
 Definitely a vivid color scheme with bright orange and shiny yellow,\
 many shades of blue, oscillating between purple and indigo! but not much green"

puts last_five_letters(secret_message)
```

**NOTE:** Make sure you copy-paste the whole string including backslashes `\`: they [escape](https://blog.appsignal.com/2016/12/21/ruby-magic-escaping-in-ruby.html) the line breaks to keep `secret_message` a single-line string. Making your regular expressions match multiline strings can be harder than expected, as explained in this [StackOverflow answer](https://stackoverflow.com/questions/4257071/ruby-regex-matches-start-of-line-even-without-m-modifier/4257912#4257912)!
