## Background & Objectives

We'll stay in the terminal here with Node.js, and another exercise. The goal is to understand
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

## Further suggestions & resources

To iterate over a JavaScript object, your can use the [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method.

Here's an example:

```js
const character =  { name: 'Luke Skywalker', type: 'Jedi' };
Object.keys(character).forEach((key) => {
  const value = character[key];
  console.log(`The character ${key} is ${value}`);
});
```
