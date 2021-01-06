## Background & Objectives

Today is your first day of JavaScript. The goal of this first day is for you to realize that it's a programming language, like Ruby. It has variables, functions, conditions, loops, etc.

Today we won't need the browser. Instead, we'll use [Node.js](https://nodejs.org/en/) to execute some JavaScript directly in our terminal.

Make sure that the following command returns a version greater than `10`:

```bash
node -v
```

If not, Node might not be installed on your system. Please have a look at the Setup section in the lecture slides.

## Install Eslint

#### If you are using Sublime Text:

Before starting, take the time to install **Eslint Sublime Linter** in Sublime Text: 

1. Open Sublime Text

    ```bash
    stt
    ```

2. In **Sublime Text**, open **Package Control**'s menu:

    ```bash
    # macOS
    cmd shift p

    # Ubuntu
    ctrl shift p
    ```

3. Type `install package` and select `Package Control: Install Package`
4. Type `SublimeLinter-eslint` and select it
5. Restart Sublime Text

#### If you are using Visual Studio Code:

Click on the [extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) page and click on **Install**.
You will get an alert asking you to open Visual Studio Code. The editor will open to the extension page.

![eslint_vscode](eslint_vscode.jpg)

Click on **Install on WSL:Ubuntu**. Click on **Reload required**.



It will highlight instantly your syntax errors / style offenses in Sublime Text / Visual Studio Code. Picking up the JavaScript syntax after Ruby may be tricky, so this should help you **a lot**.

## Specs

Let's start with a very simple algorithm. Open the `lib/even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `Number`) and returns a `String`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! The only exception to this rule is when you use a one-liner arrow function with [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Hint: remember the Ruby modulo operator? It also exists in JavaScript and might be useful!_

Run `rake` to check your style and the correctness of your function!

Once the first exercise is all green (style + tests), **please commit and push** 🙏

## About the testing setup

Open the `Rakefile` in Sublime Text. You will find two tasks:

- `eslint`, a [JavaScript linter](http://eslint.org/), the equivalent of Rubocop in the Ruby world.
- `mocha`, a [JavaScript testing framework](https://mochajs.org), the equivalent of Rspec in the Ruby world.

These two commands are run from the `node_modules` folder. It was created by running `yarn install` in the `04-FrontEnd` folder (`cd ../..`), reading the `package.json` file (open it!).
