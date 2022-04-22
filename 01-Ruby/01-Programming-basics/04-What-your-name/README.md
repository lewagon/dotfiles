## Background and Objectives

- Validate once more your understanding of methods and variables.
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

Then, assuming you have entered "Boris" then "Alexandre" and finally "Papillard", the program should print a custom message like `Hello, Boris Alexandre Papillard!`.

- **constraint**: of course, your `interface.rb` program should use the `compute_name` method defined in the other file.
- **enhancement**: you can improve your `custom_message` by adding other information like the number of characters in your full name (for instance, `Boris Alexandre Papillard has got 25 characters, including spaces`), or other very important details...

## Key learning points

Again, ask yourself these questions and make sure you can answer all of them:

### On variables

- What are the variables in your code?
- Where do you assign values to these variables and where do you use them?
- What's the scope of a variable?

### On methods

- What is the method of your program? Where do you define it?
- Where do you call this method and with which arguments?
- What's the flow of your program when you try to read it line by line?

### On strings

- What's string interpolation? What's the syntax to "insert" some Ruby expression in a string?
- What's the difference between single-quotes `''` or double-quotes `""` when using string interpolation?

## Further suggestions & resources

- To get a user input or answer from the terminal you should use [gets](http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html). You will also need to [chomp](https://ruby-doc.org/core-2.5.3/String.html#method-i-chomp) the resulting string
- To print a question in the terminal, you should use [puts](https://ruby-doc.org/core-2.7.5/IO.html#method-i-puts)
