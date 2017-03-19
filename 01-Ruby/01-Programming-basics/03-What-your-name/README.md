## Background and Objectives

- Validate one more time your understanding of methods and variables.
- Learn how to use string interpolation.
- Understand the difference between **single** and **double** quotes.

## Specs

### Compute name

- Implement the `compute_name` method defined in the `lib/compute_name.rb` file. Given the `first_name`, `middle_name` and `last_name`, it should return the full name of the person.
- **constraint**: You must use **string interpolation** with `#{}` to build this full name.

### Interactive Program

The `lib/interface.rb` file contains a program to interact with a user. Try it now with:

```bash
ruby lib/interface.rb
```

Then, assuming you have entered "Boris" then "Alexandre" and finally "Papillard", the program should print a custom message like `"Hello, Boris Alexandre Papillard !"`.

* **constraint**: of course, your `interface.rb` program should use the `compute_name` method defined in the other file.
* **enhancement**: you can improve your `custom_message` by adding other information like the number of characters in your full name (for instance, "Boris Alexandre Papillard" has got 24 characters, including spaces), or other very important details...

## Key learning points

Again, ask yourself these questions and make sure you can answer all of them:

### on variable

* What are the variables in your code ?
* Where do you assign values to these variables and where do you use them ?
* What's the scope of a variable ?

### on methods

* What is the method of your program ? Where do you define it ?
* Where do you call this method and with which arguments ?
* What's the flow of your program when you try to read it line by line ?

### on strings

* What's string interpolation ? What's the syntax to "insert" some ruby expression in a string ?
* What's the difference between single-quotes `''` or double-quotes `""` when using string interpolation ?

## Further suggestions & resources

* to get a user input from the terminal you should use <a href="http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html" target="_blank">gets</a>. You will also need to <a href="http://ruby-doc.org/core-2.2.0/String.html#method-i-chomp" target="_blank">chomp</a> the resulting string.
* to print question in the terminal, you should use <a href="http://www.ruby-doc.org/core-2.2.0/IO.html#method-i-puts" target="_blank">puts</a>
