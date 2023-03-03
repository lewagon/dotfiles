## Background & Objectives

Today is your first day of JavaScript. The goal of this first day is for you to realize that it's a programming language, like Ruby. It has variables, functions, conditions, loops, etc. Additionally, you can also select and manipulate elements from the DOM with JavaScript.

In this challenge, we will have 2 processes to test our code:
- In the browser
- In the terminal

## Coding with your browser

JavaScript can be a front-end language. It means that it is executed in the browser. We will use the `console.log` function to print some values in the terminal.

To test your code in the browser, launch your program with the `serve` command and go to [http://localhost:8000](http://localhost:8000).

```bash
 serve
```

When you open your browser, you will see a list of checks which are red. Your goal is to fix the `evenOrOdd` function so that all the checks pass. Whenever you make a change in your JS file you need to **refresh the browser** to see your code reflected.

Try to put a `console.log(number)` in your `eventOrOdd` function, open your browser's console and have a look. You should see 3 results: `0`, `1` and `2`. These come from the `check` function in the `event_or_odd_examiner.js` file in the `spec` folder. 

As long as the `eventOrOdd` function is not done, the tests will be red. They will turn green once you have implemented the correct function.

## Specs

Let's start with a very simple algorithm. Open the `lib/even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `number`) and returns a `string`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! The only exception to this rule is when you use a one-liner arrow function with [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Hint: Remember the Ruby modulo operator? It also exists in JavaScript and might be useful!_

## Testing with the terminal

The second process to test our code is in the terminal. We'll use our beloved `rake` command to run the tests.

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
