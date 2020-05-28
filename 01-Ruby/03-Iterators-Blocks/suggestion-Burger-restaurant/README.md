## Background & Objectives

This challenge is all about syntax. The first encounter with blocks and `yield` might be puzzling at first, let's practice it.

On this journey, you're about to open a **burger restaurant**. TODO



## Specs

Let's start by coding a simple `burger` method which takes 3 parameters (ingredient, sauce, topping) and returns the burger as an array of strings. For instance:

```ruby
burger("steak", "ketchup", "onions")
# => ["bread", "steak", "ketchup", "onions", "bread"]
```

Clients can choose from the menu which elements they want in their burgers:

![Burger Restaurant Menu](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-menu.svg?sanitize=true)

This means the burger method can only be called with arguments that are included in the lists above. However, our clients, when they order, can specify custom needs about the **main ingredient**, like the cooking they want for their steak, if they want a bigger portion, or more salt.

Our method is not able to receive this kind of special demands right now, so we need to rework it a bit.



### Something Special?

But before jumping in the code of the method, let's figure out a way to write down the special instructions to the kitchen (with this constraint of not passing the additional info through arguments). It's like writing a side note on the order, let's do it with a block in Ruby!

![Method call with side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-method.svg?sanitize=true)



### Back to the kitchen

![Side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-yield.svg?sanitize=true)

Great! We found a way to programmatically send the additional info to our cook in the kitchen. Now, let's make sure we change the code of the `burger` method to make it actually work!

Upgrade `burger` to welcome a block:  
- Use `yield` to call the block on the main `ingredient`.

The method must work **with or without a block**. Use the helper [`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F) to detect if a block is ready to use. Write a condition to apply yield only when a block is present.


### Prepare burgers

The clients are pouring in, they all want to taste your delicious burgers.  
Open `interface.rb`, a list of orders are waiting to be filled. Write down the instructions to prepare all the burgers, you can display the burgers with `puts` or `p`.


#### A little help with your first block

One of your customers asked for a bigger portion of fish. Transform your classical burger into a bigger burger for him, write a block to transform the string to uppercase:

 1. Call the method `burger` with "fish", "mayo" and "salad", **all lowercase letters**, and store the result in the variable `bigger_burger`.

 2. Append a block (side note in our story) with the custom instructions:
 	- it takes a string as an argument
 	- it transforms the string to uppercase

![Write block in Ruby](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-syntax.svg?sanitize=true)


You just wrote your first block, practice on your own with the other burgers!


