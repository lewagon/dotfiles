## Background & Objectives

Let's say you want to stay fit but keep eating McDonalds... You have the brilliant idea to write a quick method that computes the number of calories in a McDonald order. We consider the following items on the menu (with their respective number of calories).

| Item          | Calories |
| ------------- |---------:|
| Cheese Burger | 290      |
| Big Mac       | 300      |
| Mc Bacon      | 400      |
| Royal Cheese  | 130      |
| French Fries  | 130      |
| Potatoes      | 130      |
| Coca          | 160      |
| Sprite        | 170      |

You want to store this information in a ruby [constant](http://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Variables_and_Constants#Constants) and treat it as your database.
For instance, below is an example of a `Hash` about students and their ages stored in the constant `STUDENTS_WITH_AGE`:

```ruby
STUDENTS_WITH_AGE = {
  "Peter" => 21,
  "George" => 22,
  "Mary" => 20
}
```

Read the documentation about [Hashes](http://www.ruby-doc.org/core-2.2.0/Hash.html).
They will be your best friends and you'll use them a lot!
As you see, `Hashes` are unordered data structured where data is indexed by **unique** keys,
whereas `Arrays` are ordered data structures where elements are retrieved by index (`0`, `1`, `2`...)

**Use `Strings` as hash keys, not `Symbols`, for simplicity's sake**

## Specs

- Implement `poor_calories_counter` that return the number of calories for the three courses of your order.
- **constraint**: your method should make use of a hash of course !
- **constraint**: your method should use **our given numbers of calories** !

Now let's say you want to enhance your calories counter, so that he can accepts indifferently a list of beverage, burgers, sides, **and MEALS**. Here are the 3 only meals we will impose:

| Meal                 | Dishes                            |
| -------------------- | ----------------------------------|
| Happy Meal           | Cheese Burger, French Fries, Coca |
| Best Of Big Mac      | Big Mac, French Fries, Coca       |
| Best Of Royal Cheese | Royal Cheese, Potatoes, Sprite    |

You may want to store these meals in another constant. Don't try to pre-compute the calories for each meal,
just store which dishes compose a meal. How are can you represent the dishes of the meal?

Enhance your method `#calories_counter` so that you can calculate calories by running:

```ruby
order = ["French Fries", "Happy Meal", "Sprite"]
puts calories_counter(order)
```

## Key learning points

- What's a hash ? When do you use them ?
- Can you figure out how you would have done to code your calories counter using arrays ? painfull, no ?
