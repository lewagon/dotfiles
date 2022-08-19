## Background & Objectives

Let's say you want to stay fit while learning how to code :)  You have the brilliant idea to write a quick method that computes the number of calories in a restaurant order. Let's use the table below as our abridged restaurant menu:

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
      <td>Veggie Burger</td>
      <td>540</td>
    </tr>
    <tr>
      <td>Vegan Burger</td>
      <td>350</td>
    </tr>
    <tr>
      <td>Sweet Potatoes</td>
      <td>230</td>
    </tr>
    <tr>
      <td>Salad</td>
      <td>15</td>
    </tr>
    <tr>
      <td>Iced Tea</td>
      <td>70</td>
    </tr>
    <tr>
      <td>Lemonade</td>
      <td>90</td>
    </tr>
  </tbody>
</table>

You need to store this information in a Ruby [constant](https://www.rubyguides.com/2017/07/ruby-constants/) to create a kind of database.
For instance, below is an example of a `Hash` - `AGE_OF_STUDENTS` - that contains students and their ages:

```ruby
AGE_OF_STUDENTS = {
  "Laura" => 23,
  "Peter" => 20,
  "Mary" => 27
}
```

Read the documentation about [Hashes](https://ruby-doc.org/core-2.7.5/Hash.html).
You'll use them all the time, so make friends with them 😊

**For this exercise, use `Strings` for your keys rather than `Symbols`, just for simplicity's sake**

## Specs

- Create a `poor_calories_counter` that returns the total number of calories for the three items of your order.
- **constraint**: your method should make use of a hash (obviously!)
- **constraint**: your method must use **our given calorie values**!

For example `poor_calories_counter("Cheese Burger", "Sweet Potatoes", "Iced Tea")` should return `600`.

## Key learning points

- What's a hash? When do you use them?
- How do you retrieve a value stored in a `Hash`?
