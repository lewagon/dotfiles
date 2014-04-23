## Background & Objectives

Shopping is not fun, right? Now that you are a fluent Ruby coder, you find it much
more funny to code your own shopping cart, right?!

We've started the work for you: you'll find a `interface.rb` file ready to take
your shopping list in, and two files `store.rb` and `cart.rb` that contain the
store and shopping cart logic.

You need to complete those three files so that the whole thing works correctly.
Implement the methods in `store.rb` and `cart.rb` and initialize the `cart` variable
in `interface.rb`.
You can try out your code by running `ruby lib/interface.rb`.

When you have it working and passing tests, you should feel comfortable with hashes
and enumerating them!


## Specs

Take the time to think about the data structures that will best describe a store
inventory and a shopping cart. Then:

* implement all functions in `store.rb` and `cart.rb`
* don't forget to initialize the `cart` variable in `interface.rb`!
* check that all tests pass

As an extra:
* Improve the `cart_to_s` method so that instead of returning something like
"meat, vegetables, vegetables, meat, yoghurts, vegetables", you'd return
"meat x 2, vegetables x 3, yoghurts".


## Learning Badges

* How do you justify the data types you have used for the store and shopping cart?
Could you have used something else?
* What are the iterators you have used?


## Tips & Resources

* Have a look at the methods from [`Enumerable`](http://ruby-doc.org/core-2.1.1/Enumerable.html)!
