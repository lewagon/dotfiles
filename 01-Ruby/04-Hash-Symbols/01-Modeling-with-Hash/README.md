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


Learn about ruby [hash](http://www.ruby-doc.org/core-2.2.0/Hash.html). They will be your best friends and you'll use them a lot ! As you see, hashes are unordered data structured where data is indexed by keys, whereas arrays are ordered data structures where elements are ordered by their index in the list.

**Use `String`s as hash keys, not `Symbol`, for simplicity's sake**

## Specs

- Implement `poor_calories_counter` that return the number of calories for the three courses of your order.
- **constraint**: your method should make use of a hash of course !
- **constraint**: your method should use **our given numbers of calories** !


Now let's say you want to enhance your calories counter, so that he can accepts indifferently a list of beverage, burgers, sides, **and MEALS**. Here are the 3 only meals we will impose:

- `"Happy Meal"` -> "Cheese Burger", "French fries", "Coca"
- `"Best Of Big Mac"` -> "Big Mac", "French fries", "Coca"
- `"Best Of Royal Cheese"` -> "Royal Cheese", "Potatoes", "Sprite"

Enhance your method `#calories_counter` so that you can calculate calories running

```ruby
orders = ["French fries", "Happy Meal", "Sprite"]
calories_counter(orders)
```


## Learning Badges

- What's a hash ? When do you use them ?
- Can you figure out how you would have done to code your calories counter using arrays ? painfull, no ?
