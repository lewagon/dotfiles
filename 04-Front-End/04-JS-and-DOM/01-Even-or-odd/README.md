## Background & Objectives

Today is your first day of JavaScript. The goal of this first day is for you to realize that it's a programming language, like Ruby. It has variables, functions, conditions, loops, etc. Additionally, you can also select and manipulate elements from the DOM with JavaScript.

We will work directly in the browser to execute some JavaScript code.

Lauch your program with the `serve` command and go to [http://localhost:8000](http://localhost:8000).

```bash
 serve
```

## Specs

Let's start with a very simple algorithm. Open the `lib/even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `number`) and returns a `string`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! The only exception to this rule is when you use a one-liner arrow function with [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Hint: Remember the Ruby modulo operator? It also exists in JavaScript and might be useful!_


Once the first exercise is all green (style + tests), **please commit and push** 🙏

## About the testing setup

When you open your browser you will see a list of checks which are red. Your goal is to fix the `evenOrOdd` function so that all the checks pass. Whenever you make a change in your JS file you need to **refresh the browser** to see your code reflected.

On Setup day you installed  the `eslint` extension in yout text editor which checks the style of your JavaScript code, so it will tell you when there is a missing semicolon. If you don't see this extension in VSCode run:

```bash
code --install-extension dbaeumer.vscode-eslint
```
