## Background & Objectives

Let's say you want to stay fit but keep eating McDonalds... You have the brilliant idea to write a quick method that computes the number of calories in a McDonalds order. Let's use the table below as our abridged McDonalds menu:

<table class="table">
  <thead>
    <tr>
      <th>Item</th>
      <th>Calories</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hamburger</td>
      <td>250</td>
    </tr>
    <tr>
      <td>Cheese Burger</td>
      <td>300</td>
    </tr>
    <tr>
      <td>Big Mac</td>
      <td>540</td>
    </tr>
    <tr>
      <td>McChicken</td>
      <td>350</td>
    </tr>
    <tr>
      <td>French Fries</td>
      <td>230</td>
    </tr>
    <tr>
      <td>Salad</td>
      <td>15</td>
    </tr>
    <tr>
      <td>Coca Cola</td>
      <td>150</td>
    </tr>
    <tr>
      <td>Sprite</td>
      <td>150</td>
    </tr>
  </tbody>
</table>

You need to store this information in a ruby [constant](http://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Variables_and_Constants#Constants) to create a kind of database.
For instance, below is an example of a `Hash` - `AGE_OF_STUDENTS` - that contains students and their ages:

```ruby
AGE_OF_STUDENTS = {
  "Peter" => 21,
  "George" => 22,
  "Mary" => 20
}
```

Read the documentation about [Hashes](https://ruby-doc.org/core-2.3.4/Hash.html).
You'll use them all the time, so make friends with them 😊

**For this exercise, use `Strings` for your keys rather than `Symbols`, just for simplicity's sake**

## Specs

- Create a `poor_calories_counter` that returns the total number of calories for the three items of your order.
- **constraint**: your method should make use of a hash (obviously!)
- **constraint**: your method must use **our given calorie values**!

For example `poor_calories_counter("Big Mac", "French Fries", "Coca Cola")` should return `920`.

Now, let's say you want to improve your calorie counter, so that it can accept a list of drinks, burgers, sides, **and MEALS**. Let's add these 3 meals to our menu:

<table class="table">
  <thead>
    <tr>
      <th>Meal</th>
      <th>Items in Meal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Happy Meal</td>
      <td>Cheese Burger, French Fries, Coca Cola</td>
    </tr>
    <tr>
      <td>Best Of Big Mac</td>
      <td>Big Mac, French Fries, Coca Cola</td>
    </tr>
    <tr>
      <td>Best Of McChicken</td>
      <td>McChicken, Salad, Sprite</td>
    </tr>
  </tbody>
</table>

You may want to store these meals in another constant. Note: don't try to pre-compute the calories for each meal,
just store the dishes that make up the meal. How do you think you could represent the dishes in each meal?

Let's now create a complete `#calories_counter` that will enable us to calculate calories by running:

```ruby
order = ["French Fries", "Happy Meal", "Sprite"]
puts calories_counter(order)
```

## Key learning points

- What's a hash? When do you use them?
- Can you figure out how you would have had to code your calorie counter using just arrays? Painful, right?
