## Background & Objectives
Let's say you want to stay fit but keep eating McDonalds... You have the brilliant idea to write a quick function that computes the number of calories in a McDonald order. We consider the following products (with their respective number of calories).

* "Cheese Burger" : 290
* "Big Mac" : 300
* "Mc Bacon" : 400
* "Royal Cheese" : 130
* "French fries" : 130
* "Potatoes" : 130
* "Coca" : 160
* "Sprite" : 170


Learn about ruby [hash](http://www.ruby-doc.org/core-2.0.0/Hash.html). They will be your best friends and you'll use them a lot ! As you see, hashes are unordered data structured where data is indexed by keys, whereas arrays are ordered data structures where elements are ordered by their index in the list.

## Specs
- Implement `poor_calories_counter` that return the number of calories for the three courses of your order.
- **constraint**: your method should make use of a hash of course !
- **constraint**: your method should use **our given numbers of calories** !


Now let's say you want to enhance your calories counter, so that he can accepts indifferently a list of beverage, burgers, sides, **and MEALS**. Here are the 3 only meals we will impose :
* "Happy Meal" : "Cheese Burger", "French fries", "Coca"
* "Best Of Big Mac" : "Big Mac", "French fries", "Coca"
* "Best Of Royal Cheese" : "Royal Cheese", "Potatoes", "Sprite"
- enhance your method `#calories_counter` so that you can calculate calories running `calories_counter("French fries", "Happy Meal", "Sprite")`

For the second method `calories_counter(*orders)`, you should read [this article](http://endofline.wordpress.com/2011/01/21/the-strange-ruby-splat/) on ruby splat to understand the strange syntax for the parameter `*orders`.

## Learning Badges
- What's a hash ? When do you use them ?
- Can you figure out how you would have done to code your calories counter using arrays ? painfull, no ?

## Tips & Resources
- Document yourself on the [splat operator](http://endofline.wordpress.com/2011/01/21/the-strange-ruby-splat/) used by the enhanced method `#calories_counter`
