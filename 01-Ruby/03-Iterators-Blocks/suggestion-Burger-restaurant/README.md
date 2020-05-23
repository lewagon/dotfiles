## Background & Objectives

This challenge is all about syntax. The first encounter with blocks and `yield` might be puzzling at first, let's practice it.

On this journey, you're about to open a **burger restaurant**. On your very first day, you put a single burger on the menu. Customers can choose the cooking of the steak.

![Side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-menu.svg?sanitize=true)



## Specs

The preparation of the burgers is handled by a method named `burger`. You don't need to write it for the moment, the specs includes it for you, you can call it as stated below.

```ruby
	burger("steak", "ketchup", "onions")
	# => ["bread", "steak", "ketchup", "onions", "bread"]
```

It takes strings of 3 ingredients and returns an array of the chosen recipe layered between two slices of bread.
When a client wants some special cooking for the steak, a block is appended to the order with custom instructions.

![Method](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-method.svg?sanitize=true)


### Prepare burgers

The first clients are pouring in. Some burgers are already on the grill, the chief awaits for the cooking instructions of the steaks. You're in charge of taking orders and write the side note.  
Open `burger_restaurant.rb`, write a block for each burger to match the customer needs:
- they all take a string as a parameter
- they return the string modified

![Yield](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-yield.svg?sanitize=true)


### In the kitchen

The rush hour is over, you head to the kitchen to have a talk with the chief:
- You: "Everything is automated, how do you manage to cook on-demand steak?"
- Chief: "There's a `yield` in the method"
- You: "A `yield`?"
- Chief: "The `yield` executes the **block**, it's like adding instructions on the fly to the method"

![Side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-side-note.svg?sanitize=true)

#### Advanced: code the `burger` method

You've run the provided `burger` method, do you feel like coding it?

In `burger_restaurant.rb`, declare a method named `burger`:
- it takes 3 string parameters: `steak`, `sauce`, and `topping`.
- it returns an array with the 3 ingredients listed above, between 2 strings of "bread".
- place it a the top of the file, before the method calls


Upgrade `burger` to welcome a block: 
- Use `yield` to call the block on the `steak` ingredient.
- The method must work **with or without a block**. Use the helper [`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F) to detect if a block is ready to use. Write a condition to apply yield only when a block is present.
