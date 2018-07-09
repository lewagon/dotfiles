## Background & Objectives

Today is your first day of JavaScript. The goal of this first assignment is for you to realize that it's a programming language, like Ruby. It has variables, functions, conditions, loops, etc.

In this first assignment, we won't need the browser. Instead, we'll use [Node.js](https://nodejs.org/en/) to execute some JavaScript directly in our terminal.

Make sure that the following command returns a version greater than `4`:

```bash
node -v
```

If not, Node might not be installed on your system. Please have a look at the Setup section in the lecture slides.

## Specs

### 1st exercise - Even or Odd?

Let's start with a very simple algorithm. Open the `lib/01_even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `Number`) and returns a `String`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)!

_Hint: remember the Ruby modulo operator? It also exists in JavaScript and might be useful!_

Run `rake` to check your style and the correctness of your function! Once the first exercise is all green (style + tests), **please commit and push** 🙏

### 2nd exercise - Sum of negative numbers

Open the `lib/02_sum_of_negative.js`. Implement the `sumOfNegative` function which takes one parameter `numbers` (of type `Array`) and returns a `Number`: the sum of negative numbers in the array. For example:

- `sumOfNegatives([-1, 4, -2, 9, 18])` should return `-3`
- `sumOfNegatives([15, 16, 17, 1000])` should return `0`

👨‍🏫 Remember when TAs told you to "stop raking and test it yourself" in Ruby? That meant that you should call the method with your own test arguments at the bottom of the file and then run `ruby <file>` in the terminal. In JavaScript, you can use the same technique! Just call your method below its definition (above the `module.exports` line), like this:

```js
console.log(sumOfNegative([-4, 5, -2, 9]));
```

and then run this in the terminal:

```bash
node lib/02_sum_of_negative.js
```

If your code works, you should see `-6`. Add more `console.log` statements in the `sumOfNegative` function to debug your code.

## About the testing setup

Open the `Rakefile` in Sublime Text. You will find two tasks:

- `eslint`, a [JavaScript linter](http://eslint.org/), the equivalent of Rubocop in the Ruby world.
- `mocha`, a [JavaScript testing framework](https://mochajs.org), the equivalent of Rspec in the Ruby world.

These two commands are run from the `node_modules` folder. It was created by running `yarn install` in the `04-FrontEnd` folder (`cd ../..`), reading the `package.json` file (open it!).
