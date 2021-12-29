## Background & Objectives

The first encounter with blocks and `yield` might be puzzling at first, let's practice it. The objectives here are:
- Implement some basic method using `yield`, to understand the inner mechanics.
- Learn the syntax for calling a method with a block.
- Understand what happens when you pass a parameter to the block.

On this journey, you're about to open a **burger restaurant**, from the kitchen to the counter you'll implement methods to prepare burgers for your first customers.

## Specs

### Step 1: Basic burger

Let's start by coding a simple `burger` method which takes 3 parameters, patty, sauce and topping, and returns the burger as an array of strings. For instance:

```ruby
burger("steak", "ketchup", "onions")
# => ["bread", "steak", "ketchup", "onions", "bread"]
```

Customers can compose their burgers by picking one of each:

![Burger Restaurant Menu](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-menu.svg?sanitize=true)

### Step 2: On-demand burger

The `burger` method can only be called with arguments that are included in the lists above. However, our customers, when they order, often specify custom needs about the **patty**, like the cooking they want for their steak, if they want a bigger portion, or a replacement.

Our method is not able to receive this kind of special demands right now, so we need to rework it a bit.

But before jumping in the code of the method, let's figure out a way to write down the special instructions to the kitchen (with this constraint of not passing the additional info through arguments). It's like writing a side note on the order:

![Method call with side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-method.svg?sanitize=true)

Let's do it with a block in Ruby!

```ruby
burger("steak", "ketchup", "onions") do |patty|
  "grilled #{patty}"
end
```

Great! We found a way to transform our patty without altering the argument. Now we expect the above call to return:

```ruby
# => ["bread", "grilled steak", "ketchup", "onions", "bread"]
```

Let's modify our method to make it happen!

#### Back to the kitchen

`yield` is the keyword you need to execute the block, it will take place in your method to apply on-demand instructions to the patty.

![Side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-yield.svg?sanitize=true)

Upgrade `burger` to welcome a block:
- Place `yield` where you want to invoke the block
- The block will transform the `patty` only

The method must work **with or without a block**. Use the [`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F) method to detect if a block has been given to `burger` during its call.

### Step 3: Prepare burgers

The customers are pouring in, they all want to taste your delicious burgers.
Open `interface.rb`, a list of orders are waiting to be filled. Write down the instructions to prepare all the burgers, you can display the burgers with `puts` or `p` afterwards.

#### A little help with your first block

One of your customers asked for a bigger portion of fish. Transform your classical burger into a bigger burger for him, write a block to transform the string to uppercase:
 1. Call the method `burger` with "fish", "mayo" and "salad", **all lowercase letters**, and store the result in the variable `bigger_burger`.
 2. Append a block (side note in our story) with the custom instructions:
 	- it takes a string as an argument
 	- it transforms the string to uppercase

![Write block in Ruby](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-restaurant-syntax.svg?sanitize=true)

You just wrote your first block, practice on your own with the other burgers!
