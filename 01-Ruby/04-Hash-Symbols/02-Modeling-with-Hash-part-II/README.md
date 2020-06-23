## Background & Objectives

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

## Specs

You may want to store these meals in another constant. Note: don't try to pre-compute the calories for each meal,
just store the dishes that make up the meal. How do you think you could represent the dishes in each meal?

Let's now create a complete `#calories_counter` that will enable us to calculate calories by running:

```ruby
orders = ["French Fries", "Happy Meal", "Sprite", "Best Of McChicken"]
puts calories_counter(orders)
```

## Key learning points

- How do you retrieve a value stored in an `Array` within a `Hash`?
- Which data structure would you use to store animal names, alphabetically sorted?
- Which data structure would you use to store animal names and colors?

