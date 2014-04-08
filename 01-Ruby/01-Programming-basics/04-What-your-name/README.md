## Background and Objectives
- Validate one more time your understanding of methods and variables.
- Learn how to use string concatenation and interpolation
- Understand the difference between single and double quotes.

## Specs 

### compute_name.rb
- Implement `#compute_name` that builds full name from first, middle, and last name.
- **constraint**: you must use **string interpolation** with `#{}`

### interface.rb
The interface that you have to complete should work this way :

* it asks for your first name and let you write it in the terminal
* it asks for your middle name and let you write it in the terminal
* it asks for your last name and let you write it in the terminal

Then, assuming you have entered "Boris" then "Alexandre" and finally "Papillard", the program should print a custom message like `"Hello, Boris Alexandre Papillard !"`. 

* **constraint**: to build the `custom_message` string, you must use string concatenation this time, with the `+` operator.
* **enhancement**: your `custom_message` could also ìnform you about the number of characters in your name (for instance, "Boris Alexandre Papillard" has got 24 characters, including spaces), or other very important details...

## Learning Badges
Again, ask yourself these questions and make sure you can answer all of them:

### on variable
* What are the variables in my code ?
* Where do I assign values to these variables and where do I use them ?
* The 3 variables `first_name`, `middle_name`, and `last_name` are only defined in the `#name_from_terminal` method. Are they available outside this method ? 
* What's the scope of a variable ?
 
### on methods 
* What are the methods in my program ? Where do I define them ? 
* Where do I call them and with which arguments ?
* What's the flow of my program when I try to read it line by line ?

### on strings 
* What's string interpolation ? What's the syntax to "include" some ruby expression in a string ?
* What's the difference between single-quotes `''` or double-quotes `""` when using string interpolation ?


## Tips & Resources
* to get a user input from the terminal you should use <a href="http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html" target="_blank">gets</a>. You will also need to <a href="http://ruby-doc.org/core-2.0.0/String.html#method-i-chomp" target="_blank">chomp</a> the resulting string.
* to print question in the terminal, you should use <a href="http://www.ruby-doc.org/core-2.0.0/IO.html#method-i-puts" target="_blank">puts</a>


