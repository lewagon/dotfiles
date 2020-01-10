## Background & Objectives

During your journey at Le Wagon, you'll learn a lot of tools, services and languages.
Here are the logos of the main ones, but they are all black and white at the moment!
This challenge is a regex game to reveal their colors.

![Logos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/double-rainbow_logos.png)



## Specs

So, what colors are the logos? The information have been hidden in sentences, by our best secret agents. Your mission is to build regex to reveal the tricks!

Open `lib/double_rainbow.rb` where a series of functions await you!

- Follow hints and instructions to **return a string**
- **Use a regex** to extract that string from the `sentence` parameter

We gave you the sample sentences to test your code in [Rubular](http://rubular.com/)


### What color is Heroku?
To find out, code a regex in `color_of_heroku`:
- Return everything non-digit

```ruby
sentence = "purple79589"
```


### What color is postgreSQL?
To find out, code the regex in `color_of_postgresql`:
- Return the last 6 characters of the sentence

```ruby
sentence = "somewhatbetweenblueandindigo"
```


### What color is CSS3?
To find out, code the regex in `color_of_css3`:
- The word contains exactly 4 letters
- It's located between a space and a comma

```ruby
sentence = %({
  Roses are red,
  Violets are blue,
  Sugar is sweet,
  And so are you.
})
```


### What color is rake?
To find out, code the regex in `color_of_rake`:
- Find the word located before a question mark

```ruby
sentence = "red or green?"
```


### What color is Javascript?
To find out, code the regex in `color_of_javascript`:
- Find the word containing two consecutive "l"

```ruby
sentence = "black letters on a yellow background"
```


### What color is HTML5?
To find out, code the regex in `color_of_html5`:
- The word contains exactly 6 letters
- It's composed with letters from "a" to "r" only

```ruby
sentence = %({
  The new logo of Firefox has evolved to a more iconized style.
  The color scheme stays the same, with red, orange and yellow shades.
})
```


### What color is Ruby?
You probably know this one already!
Let's make sure, code the regex in `color_of_ruby`:
- capture all the capital letters in the sentence
- return a string formed with the letters you found

```ruby
sentence = %({
  Ruby is a dynamic open source programming language.
  Elegant syntax, easy to write...Definitely a progammer's best friend.
})
```

**Code Hint:** what is more suitable between `match` and `scan`?
