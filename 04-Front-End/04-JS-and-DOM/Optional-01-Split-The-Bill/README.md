## Background & Objectives

For the first part of this exercise you need to make the tests in the browser pass. The goal is to understand
how to manipulate a JavaScript [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

Afterwards you need to change the HTML and write a new JavaScript function to display the results in the browser.

In this exercise, you can run your tests:
- in the browser (run `serve` and follow the flow)
- in the terminal with a `rake` command

## Specs

You went on a trip with a group of friends. Each one of you paid for different things (food, car, hotel, etc.), and now
it's time to balance the books! Who owes money to the group, and who spent too much? Let's find out!

Suppose the group is represented with the following object:

```js
const group = {
  "john"  : 120,
  "paul"  :  30,
  "ringo" : 150,
}
```

It means that John spent 120€, Paul spent 30€ and Ringo spent 150€.

Implement the method `splitTheBill(group)` which should return how much money the group
should give back to each individual. In our example it should return:

```js
{
  "john"  :  20,
  "paul"  : -70,
  "ringo" :  50
}
```

## Hint

To iterate over a JavaScript object, your can use the [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method.

Here's an example:

```js
const character =  { name: 'Luke Skywalker', type: 'Jedi' };
Object.keys(character).forEach((key) => {
  const value = character[key];
  console.log(`The character ${key} is ${value}`);
});
```

## Display the results

Once you have implemented the `splitTheBill(group)` function all the tests should be green.

Now it's time to update the HTML file and add a list of who has to pay how much. First create a list with empty values in the `index.html` file and then complete the `updatePriceList()` function in your JS file to display the correct values.
