## Background & Objectives

Today is your first day of JavaScript. The goal of this first assignment is for you to realize that it's a programming language, like Ruby. It has variables, functions, conditions, loops, etc.

In this first assignment, we won't need the browser. Instead, we'll use [Node.js](https://nodejs.org/en/) to execute somme JavaScript directly in our terminal.

Make sure that the following command returns a version older than `4`:

```bash
node -v
```

If not, Node might not be installed on your system. Please have a look at the Setup seciton in the lecture slides.

## Specs

### 1st exercise - Even or Odd?

Let's start with a very simple algorithm. Open the `lib/01_even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `Number`) and returns a `String`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

_Hint: the Ruby modulo operator that you know also exists in JavaScript_

Run `rake` to check your style and the correctness of your function! Once the first exercise is all green (style + tests), **please commit and push** 🙏

### 2nd exercise - Sum of negative numbers

Open the `lib/02_sum_of_negative.js`. Implement the `sumOfNegative` function which takes one parameter `numbers` (of type `Array`) and returns a `Number`: the sum of negative numbers in the array. For example:

- `sumOfNegatives([-1, 4, -2, 9, 18])` should return `-3`
- `sumOfNegatives([15, 16, 17, 1000])` should return `0`

👨‍🏫 Remember when TAs used to tell you "Stop raking, try your own test" in Ruby? That meant that you should call the method with your own test arguments at the bottom of the file and then run `ruby <file>` in the terinal. In JavaScript, you can use the same technique! Just call your method below its definition (above the `module.exports` line), like this:

```js
console.log(sumOfNegative([-4, 5, -2, 9]));
```

and then run in the terminal:

```bash
node lib/02_sum_of_negative.js
```

If your code works, you should see `-6`. Add more `console.log` statements in the `sumOfNegative` function to debug your code!

### 3rd exercise - Lord of the Rings

In this exercise, Hobbits, Elves, Dwarves and Eagles will battle against the evil Orcs, Wargs, Goblins, Uruk Hai and Trolls. Open the `lib/03_lord_of_the_rings.js` file. You will find three functions to implement.

The first function `isGood` takes a soldier type (`String`) as a parameter and should return `true` if this soldier belongs to the Good side.

- `isGood("Hobbit")` should return `true`
- `isGood("Uruk Hai")` should return `false`

The second function `buildSoldierMap` takes a `battlefield` (`String`) as a parameter and should return a `Map`. The map keys will be the soldier type and the values will be the number of soldiers of this type on the battlefield. Here are some examples of battlefield strings you need to parse (and convert to a Map):

- `Elves:5,Orcs:4`
- `Hobbits:4,Dwarves:1,Elves:1,Goblins:100,Uruk Hai:1`

Here is how you can use a JavaScript [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)

```js
const beatles = new Map();

// Create
beatles.set("john", "guitar");
beatles.set("paul", "bass");

// Read
console.log(beatles.get("paul"));

// Update
beatles.set("paul", "bass guitar");

// Delete
beatles.delete("paul");

// Loop
beatles.forEach((value, key) => {
  console.log(`${key} played the ${value}`);
});
```

The third function `whoWinsTheWar` will tie everything together. Given a `battlefield` parameter (`String`), it will return a `String` revealing the outcome of the war:

- `Tie` if the battlefield is empty or if Good and Evil have the same number of soldiers
- `Good` if Good soldiers outnumber Evil soldiers
- `Evil` if Evil soldiers outnumber Good soldiers

_NB: we simplify the war and do not take any concept of "worth" of each soldier type_

## About the testing setup

Open the `Rakefile` in Sublime Text. You will find two tasks:

- `eslint`, a [JavaScript linter](http://eslint.org/), the equivalent of Rubocop in the Ruby world.
- `mocha`, a [JavaScript testing framework](https://mochajs.org), the equivalent of Rspec in the Ruby world.

These two commands are run from the `node_modules` folder. It was created by running `yarn install` in the `04-FrontEnd` folder (`cd ../..`), reading the `package.json` file (open it!).
