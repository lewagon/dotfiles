## Background & Objectives

You can serve this exercise for a visual interface, but we'll stay in the terminal to rake the code. The goal is to understand
how to manipulate a JavaScript [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

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

## Display the values

Once you have implemented the `splitTheBill(group)` you can rake it to check your code.

Now it's time to update the HTML file and add a list of who has to pay how much. First write this list with empty values and then complete the `updatePriceList()` function in your JS file to insert the correct values into the HTML.
