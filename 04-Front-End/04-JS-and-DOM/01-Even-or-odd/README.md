## Background & Objectives

Welcome to your first day of JavaScript! 🎉 JavaScript is a programming language, just like Ruby. So, today, the goal is for you to get comfortable with the basics, like variables, functions, conditions, loops, etc. You'll also learn how to select and manipulate elements from the DOM with JavaScript.

In today's challenges, you will test your code in two different ways:
- In the browser (by clicking around on the page and checking if things work as expected or you see any errors in the console)
- In the terminal (by running tests with the `rake` command)

## Coding with your browser

One of the special superpowers of JavaScript is that browsers can execute JavaScript code. Browsers can't run Ruby, for example. Let's try using `console.log` (the equivalent to `puts` in Ruby) and see if it prints in the browser's console.

To test your code in the browser, launch your program with the `serve` command and go to [http://localhost:8000](http://localhost:8000).

```bash
serve
```

When you open your browser, you will see a list of checks which are red. Your goal is to fix the `evenOrOdd` function so that all the checks pass. Whenever you make a change in your JS file you need to **refresh the browser** to see your code reflected.

Try to put a `console.log(number)` in your `evenOrOdd` function, open your browser's console and have a look. You should see 3 results: `0`, `1` and `2`. These come from the `check` function in the `event_or_odd_examiner.js` file in the `spec` folder.

As long as the `evenOrOdd` function is not done, the tests will be red. They will turn green once you have implemented the correct function.

## Specs

Let's start with a very simple algorithm. Open the `lib/even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `Number`) and returns a `String`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! The only exception to this rule is when you use a one-liner arrow function with [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

_Hint: Remember the Ruby modulo operator? It also exists in JavaScript and might be useful!_

## Testing with the terminal

The second way to test our code is in the terminal. We'll use our beloved `rake` command to run the tests.

For that, we'll use [Node.js](https://nodejs.org/en/) to execute some JavaScript directly in our terminal.

You should already have `node` installed with a version greater than `10`. Check it with:

```bash
node -v
# You should see your node version here
```

If not, go back to the dedicated section of the [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) or [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs) setup.

If running `rake` outputs an error, you need to run:

```bash
nvm list
```
and then choose the version you have installed, for example:

```bash
nvm use 16.15.1
```

Now, make sure all your tests in the terminal are also green. Then, **please commit and push** 🙏.

## VSCode tips

On Setup day you installed the `eslint` extension in your text editor which checks the style of your JavaScript code, so it will tell you when there is a missing semicolon. If you don't see this extension in VSCode run:

```bash
code --install-extension dbaeumer.vscode-eslint
```
