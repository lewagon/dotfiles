## Background & Objectives

Shopping can be annoying, right? Given you're now a fluent Ruby coder, you'll probably find it much more entertaining to code your own shopping cart!

We've started the work for you: you'll find a `interface.rb` file ready to take your shopping list in, and two files `store.rb` and `cart.rb` that contain the store and shopping cart logic.

You need to complete those three files so that the whole thing works correctly. Implement the methods in `store.rb` and `cart.rb` and initialize the `cart` variable in `interface.rb`.
You can try out your code by running `ruby lib/interface.rb`.

By the time you have it working and passing tests, you should feel comfortable with hashes and enumerating them!

## Specs

Take the time to think about the data structures that will best describe a store inventory and a shopping cart. Then:

- implement all functions in `store.rb` and `cart.rb`
- don't forget to initialize the `cart` variable in `interface.rb`!
- check that all tests pass and that your code is working properly by running `lib/interface.rb`

Here's the list of the products and their prices, that should be available in the store:
- yogurts: 2€
- meat: 7€
- vegetables: 5€
- potatoes: 2€
- rice: 1€

As an extra, improve the `cart_to_s` method so that instead of returning something like `meat, vegetables, vegetables, meat, yoghurt, vegetables`, you'd return `meat x 2, vegetables x 3, yoghurt`.

## Key learning points

* Why did you use the data types that you chose for the store and shopping cart? Could you have used something else?
* What are the iterators you used?

## Further suggestions & resources

* Have a look at the methods from the [Enumerable doc](http://ruby-doc.org/core-2.5.3/Enumerable.html)!
