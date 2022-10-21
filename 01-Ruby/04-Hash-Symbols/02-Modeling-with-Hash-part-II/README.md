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
      <td>Cheesy Combo</td>
      <td>Cheese Burger, Sweet Potatoes, Lemonade</td>
    </tr>
    <tr>
      <td>Veggie Combo</td>
      <td>Veggie Burger, Sweet Potatoes, Iced Tea</td>
    </tr>
    <tr>
      <td>Vegan Combo</td>
      <td>Vegan Burger, Salad, Lemonade</td>
    </tr>
  </tbody>
</table>

## Specs

You may want to store these meals in another constant. Note: don't try to pre-compute the calories for each meal,
just store the dishes that make up the meal. How do you think you could represent the dishes in each meal?

Let's now create a complete `#calories_counter` that will enable us to calculate calories by running:

```ruby
orders = ["Sweet Potatoes", "Cheesy Combo", "Lemonade", "Vegan Combo"]
puts calories_counter(orders)
# => 1395
```

## Key learning points

- How do you retrieve a value stored in an `Array` within a `Hash`?
- Which data structure would you use to store animal names, alphabetically sorted?
- Which data structure would you use to store animal names and colors?
