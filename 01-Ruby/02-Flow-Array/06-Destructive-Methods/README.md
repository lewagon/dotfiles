## Background & Objectives

Destructive methods modify their **receiver** (objects on which they are called).
They are dangerous in a way. Therefore a good **convention** is to name them with a final exclamation mark `!`.

## Specs

- Implement `#horse_racing_format!` that modifies the array it takes in as an argument to make it more friendly for the race anchorman
- **constraint**: The method should reverse the array, prepend the horse position, and add a exclamation mark at the end of the horse name string.

e.g. `["Abricot du Laudot", "Black Caviar", "Brigadier Gerard"]` should become `["3-Brigadier Gerard!", "2-Black Caviar!", "1-Abricot du Laudot!"]` after formatting.
That's the only format the anchorman can understand!

**🤔 Tip:** Don't hesitate to open the file in the `spec` folder and **read the test code** to understand what's going on. This is the code which gets executed when you run `rake` in your terminal.

## Further suggestions & resources

- Needless to say, you should be using destructive iterators within your method 😊

## Key learning points

As you've probably already realized, a method is not only used to return the result of a calculation... A method can also be used to perform actions on objects that it will modify. Make sure your are comfortable with the following notions before moving on:
- What's an object id? Type `"something".object_id` in IRB to figure it out.
- What's an object equality? When you use `a==b` in a conditional statement, do you test object equality? What do you test exactly?
