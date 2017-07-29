## Background & Objectives

Today is your first day of JavaScript. The goal here is for you to realize that it's
a programming language, like Ruby. It has variables, functions, conditions, loops, etc.
In this first exercise, we won't need the browser. Instead, we'll use the power of [Node.js](https://nodejs.org/en/) to execute somme JavaScript directly in our terminal.

We'll start with a simple exercise that you should remember very fondly from Ruby week. It's your age... in... days! 😊

## Setup

**If you are on Ubuntu, make sure you have the `node` command**. If not, run this:

```bash
sudo ln -s "$(which nodejs)" /usr/bin/node
```

If you are on Mac OSX, you can ignore this.

## Specs

In `lib/age_in_days.js`, implement the function `ageInDays(day, month, year)` which will return the number of days lived until this very day. You can run `rake` to check your work.

## Further suggestions & resources

You may want to read the [Date documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
on Mozilla Developer Network (the **best** one out here. Do not use the `w3schools` website). **Do not** use external libraries, just pure JavaScript.

Remember, to debug something, it's not `puts` like in Ruby, it's:

```js
console.log(someVariable);
```
