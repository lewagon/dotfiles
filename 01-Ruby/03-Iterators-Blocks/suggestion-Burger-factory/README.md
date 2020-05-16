## Background & Objectives

This challenge is all about syntax. The first encounter with `Blocks`, `Procs` and `yield` might be puzzling at first, let's practice to be confident with the syntax.

On this journey, you're about to open a **burger restaurant**. You're expecting your first customers today! It's time to prepare every ~~~~~~~~~~~ Let's see how you deal with them.

## Specs

### Function basics 

#### `cook_burger`
First, your chef needs to implement a function that cooks on-demand burgers. It will picks up 3 ingredients and layer them between 2 slices of bread.

Open `burger_factory.rb` and declare a method named `cook_burger`:
- it takes 3 string parameters: `recipe`, `sauce`, and `topping`.
- it returns an array with the 3 ingredients listed above, between 2 strings "bread".

example:

```ruby
    cook_burger("fish", "mayo", "avocado")
    # => ["bread", "fish", "mayo", "avocado", "bread"]
```

#### `classical_burger`

There we are, your first customer enters the restaurant! He chooses you a burger whose main recipe is "steak", a "ketchup" sauce and "tomato" as topping.

In `burger_factory.rb`, call the method `cook_burger` with the chosen ingredients, and store the result in a variable named `classical_burger`.


So far, we've rehearsed function basics: declare a function with arguments, then call it. If this section is not clear, please ask a TA for help before moving on.


### Implement Yield

Your second customer is a very young kid, he wants a huge burger with the biggest ingredients of the restaurant. You are about to send the list to the chief, when the parents come politely to the counter, and ask you if you could downsize the portions a little bit. 

Think about it: this is your very first custom command!

Your processes are not tailored for this kind of situation so what are your options now? A quick meeting with the chief will fix it:
- You could create a function each time a new customer wants something special, but you both decide to rule out this option. It's too much work, too much maintenance and a bit messy. 
- Another idea would be to make your operation modular and able to get new instructions on the fly. Sounds good! You two quickly come up with a plan:

~~~~~~~~~~ ILLUSTRATION SIDE NOTE ~~~~~~~~~~~~
- You'll write a side note with custom instructions when needed, and handle it to the chief (block).
- The chief will apply those instructions anytime he layers an ingredient in the burger (yield).

#### `cook_burger` with yield

Update the `cook_burger` function to welcome a block: 
- Use `yield` to apply the block on every ingredient (except "bread").
- The function must work **with or without a block**. ~~~~~~~~~~ Use `block_given?` to write a condition statement.

You're ready to cook the kid's burger and add blocks to your method calls.


### Create Blocks

Practice with blocks, we'll help you with the first steps. ~~~~~~~~ we'll give you fewer instructions each time. 

#### `nuggets_burger`

1. Call your method `cook_burger` with "NUGGETS", "CAESAR", "ONIONS", all capital letters, and store the result in a variable named `nuggets_burger`.

2. Now prepare a block (side note) with the parents' instruction:
	- it takes a string as an argument
	- it downcases the string

3. Append the block at the end of the function call and you're done

**Anatomy of a block:**

```ruby
do |arg|
	# here 
end
```

#### `mayo_burger`

Pass "chicken", "barbecue" and "onions" to `cook_burger`. Add a block to replace any vowel by the sign "~".

 = cook_burger("chicken", "barbecue", "onions") do |ingredient|
  ingredient.tr("aeiou", "~")
end

### Advanced: Procs