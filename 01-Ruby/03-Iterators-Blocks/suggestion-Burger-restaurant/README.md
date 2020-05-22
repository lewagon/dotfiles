## Background & Objectives

This challenge is all about syntax. The first encounter with blocks and `yield` might be puzzling at first, let's practice the syntax.

On this journey, you're about to open a **burger restaurant**. You and the chief are very confident with the organisation but things won't turn out as planned, let's see how you deal with the situation!



## Specs

### Methods basics

burger_factory.rb => burger_restaurant.rb
cook_burger => prepare_burger => burger
arguments vs parameters
illustration de chaque burger pour l'ordre des paramètres
travailler sur les cuissons
carte fixe : signifier
instructions hors de la carte ==> justification de l'existence du block



#### Prepare processes // TODO
The chief is in the kitchen, help him write a method that cooks burgers with 3 ingredients between 2 slices of bread.

Open `burger_factory.rb` and declare a method named `cook_burger`:
- it takes 3 string parameters: `steak`, `sauce`, and `topping`.
- it returns an array with the 3 ingredients listed above, between 2 strings of "bread".

```ruby
    cook_burger("fish", "ketchup", "avocado")
    # => ["bread", "fish", "ketchup", "avocado", "bread"]
```

//TODO illustration de la construction d'un burger


#### Prepare a burger

There we are, the grand opening! On your very first day, you only have a few ingredients in your stocks and can only sell classical burgers with "steak", "ketchup" and "onions".

Cook your first burger:  
In `burger_factory.rb`, call the method `cook_burger` with "steak", "ketchup" and "onions". Store the result in the variable named `classical_burger`.


So far, we've rehearsed method basics, if this section is not clear, please ask a TA for help before continuing.


### Customise your burger // TODO

The first customer is very hungry, he'd like a bigger portion of everything!  
Wow, you didn't expect a custom order today... Your method only deals with standard orders for now. It's time to make it modular and able to get new instructions on the fly. Here is the plan:
- When you get a special order, you'll write a side note with custom instructions (**block**).
- The chief applys those instructions anytime he layers an ingredient in the burger (**yield**).
![Side note](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-factory-side-note.svg?sanitize=true)

Update `cook_burger` to welcome a block: 
- Use `yield` to call the block on every ingredient (except "bread").
- The method must work **with or without a block**. Use the helper [`block_given?`](https://ruby-doc.org/core-2.7.0/Kernel.html#method-i-block_given-3F) to apply yield only when a block is given.

You're ready to cook on-demand custom orders!


### Create Blocks

Cook more burgers to practice with blocks, we'll give you fewer instructions each time.

#### `bigger_classical_burger`

The second customer asked for bigger portions, remember? Transform your classical burger into a bigger burger for him, write a block to transform all the ingredients to uppercase:

1. Call the method `cook_burger` with "steak", "ketchup" and "onions", **all lowercase letters**, and store the result in the variable `bigger_classical_burger`.

2. Append a block (side note in our story) with the custom instructions:
	- it takes a string as an argument
	- it transforms the string to uppercase

![Yield](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/burger-factory-yield.svg?sanitize=true)


#### `classical_burger_with_mayo` // TODO fondant plutot que mayo

The third customer would like mayo on each ingredient.
Pass "steak", "ketchup" and "onions" to `cook_burger`. Add a block to replace any vowel by the sign "~".


#### `vegan_burger`

The last customer wants a classical burger, but asks for a vegan option. The chief receives a side note: please replace "steak" by "tofu" at the last minute in this burger.
Make it happen!

