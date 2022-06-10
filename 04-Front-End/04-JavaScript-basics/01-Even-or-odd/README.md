## Background & Objectives

Today is your first day of JavaScript. The goal of this first day is for you to realize that it's a programming language, like Ruby. It has variables, functions, conditions, loops, etc.

Today we won't need the browser. Instead, we'll use [Node.js](https://nodejs.org/en/) to execute some JavaScript directly in our terminal.

You should already have `node` installed with a version greater than `10`. Check it with:

```bash
node -v
# You should see your node version here
```

If not, go back to the dedicated section of the [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) or [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs) setup.

## Specs

Let's start with a very simple algorithm. Open the `lib/even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `number`) and returns a `string`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! The only exception to this rule is when you use a one-liner arrow function with [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Hint: remember the Ruby modulo operator? It also exists in JavaScript and might be useful!_

Run `rake` to check your style and the correctness of your function!

Once the first exercise is all green (style + tests), **please commit and push** 🙏

## About the testing setup

Open the `Rakefile` in your text editor. You will find two tasks:

- `eslint`, a [JavaScript linter](http://eslint.org/), the equivalent of Rubocop in the Ruby world.
- `mocha`, a [JavaScript testing framework](https://mochajs.org), the equivalent of Rspec in the Ruby world.

These two commands are run from the `node_modules` folder. It was created by running `yarn install` in the `04-FrontEnd` folder (`cd ../..`), reading the `package.json` file (open it!).
