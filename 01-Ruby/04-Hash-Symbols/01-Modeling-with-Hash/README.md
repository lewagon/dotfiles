## Background & Objectives

Let's say you want to stay fit but keep eating McDonalds... You have the brilliant idea to write a quick method that computes the number of calories in a McDonald order. Let's use the below as our abridged McDonalds menu:

<table class="table">
  <thead>
    <tr>
      <th>Item</th>
      <th>Calories</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cheese Burger</td>
      <td>290</td>
    </tr>
    <tr>
      <td>Big Mac</td>
      <td>300</td>
    </tr>
    <tr>
      <td>Mc Bacon</td>
      <td>400</td>
    </tr>
    <tr>
      <td>Royal Cheese</td>
      <td>130</td>
    </tr>
    <tr>
      <td>French Fries</td>
      <td>130</td>
    </tr>
    <tr>
      <td>Potatoes</td>
      <td>130</td>
    </tr>
    <tr>
      <td>Coca</td>
      <td>160</td>
    </tr>
    <tr>
      <td>Sprite</td>
      <td>170</td>
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

Read the documentation about [Hashes](http://www.ruby-doc.org/core-2.2.0/Hash.html).
You'll use them all the time, so make friends with them :)

**For this exercise, use `Strings` for your keys rather than `Symbols`, just for simplicity's sake**

## Specs

- Create a `poor_calories_counter` that returns the total number of calories for the three items of your order.
- **constraint**: your method should make use of a hash (obviously!)
- **constraint**: your method must use **our given calorie values** !

Now let's say you want to improve your calorie counter, so that it can accept a list of drinks, burgers, sides, **and MEALS**. Let's add these 3 meals to our menu:

<table class="table">
  <thead>
    <tr>
      <th>Item</th>
      <th>Calories</th>
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
      <td>Best Of Royal Cheese</td>
      <td>Royal Cheese, Salad, Sprite</td>
    </tr>
  </tbody>
</table>

You may want to store these meals in another constant. Note: don't try to pre-compute the calories for each meal,
just store the dishes that make up the meal. How do you think you could represent the dishes in each meal?

Enhance your method `#calories_counter` so that you can calculate calories by running:

```ruby
order = ["French Fries", "Happy Meal", "Sprite"]
puts calories_counter(order)
```

## Key learning points

- What's a hash? When do you use them?
- Can you figure out how you would have had to code your calorie counter using just arrays? Painful, right?
