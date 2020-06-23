## Before you start

Don't forget, at 2pm you'll do your first paper quiz. No computer, no Google, just a pen and your brain. It's not an exam and you won't receive grades, so don't worry about that 😊, but it's very useful to find the areas you may be struggling with and to iron out your creases before we progress any further. Just take your time and try to answer everything as precisely as you can.

When the quiz is finished, a teacher will take each of you for a 15-min review to go through your answers and try to clarify anything you don't understand. It will help you know what to go back to over this weekend, and also whether or not you should join the Reboot group next Monday-Tuesday.

Good luck and happy quizzing!


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

Read the documentation about [Hashes](https://ruby-doc.org/core-2.6.6/Hash.html).
You'll use them all the time, so make friends with them 😊

**For this exercise, use `Strings` for your keys rather than `Symbols`, just for simplicity's sake**

## Specs

- Create a `poor_calories_counter` that returns the total number of calories for the three items of your order.
- **constraint**: your method should make use of a hash (obviously!)
- **constraint**: your method must use **our given calorie values**!

For example `poor_calories_counter("McChicken", "French Fries", "Sprite")` should return `730`.

## Key learning points

- What's a hash? When do you use them?
- How do you retrieve a value stored in a `Hash`?
