## Background & Objectives

In this challenge, you'll need to write **loops**, **conditions** and play with **numbers**.

Let's familiarise with JavaScript's syntax.

## Specs

Open the `lib/sum_of_negative.js`. Implement the `sumOfNegative` function which takes one `numbers` parameter (of type `array`) and returns a `number`: the sum of negative numbers in the array. For example:
- `sumOfNegative([-1, 4, -2, 9, 18])` should return `-3`
- `sumOfNegative([15, 16, 17, 1000])` should return `0`

👨‍🏫 Remember when TAs told you to "stop raking and test it yourself" in Ruby? That meant that you should call the method with your own test arguments at the bottom of the file and then run `ruby <file>` in the terminal. In JavaScript, you can use the same technique! Just call your method below its definition (above the `module.exports` line), like this:

```js
console.log(sumOfNegative([-4, 5, -2, 9]));
```

and then run this in the terminal:

```bash
node lib/sum_of_negative.js
```

If your code works, you should see `-6`. Add more `console.log` statements in the `sumOfNegative` function to debug your code.
