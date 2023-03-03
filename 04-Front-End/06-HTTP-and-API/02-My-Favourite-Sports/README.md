## Background & Objectives

In this challenge, we want to reproduce the UX we tend to see more and more in modern web app forms when it comes to selecting **multiple** possible answers to a given question:

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/highlights.gif)

Again it will come down to **selecting** elements, **binding** them to an event and **reacting** to it!

## Specs

Start your local web server with:

```bash
serve
```

Open [`localhost:8000`](http://localhost:8000) in your browser.

You should see a grid of 6 sports boxes that look like they are clickable. When you hover over one of them, you see that the UI changes to suggest you to click. However, nothing happens when you click... yet! Let's fix that!

- When you click on a sport, you should toggle the `active` css class on the element (no need to write any css in this challenge)
- We should be able to select several sports (as if they were checkboxes)

Before writing any code, break down the problem in small steps using pseudo-code!

There aren't any tests for this exercise, but we check your style! So run `rake`.

## Refactoring (optional)

Once the highlighting works as expected, let's make the code more readable.

When you combine `forEach` and `addEventListener`, you end up with some code that has **3 levels** of indentation, which makes it hard to read.

Good news, in JavaScript, you can store **functions** in variables! That way you can refer to the variable without calling the function by **omitting the parentheses**, perfect for **callbacks**!

For instance, you can refactor this code:

```js
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.currentTarget);
  });
});
```

into:

```js
const displayClickedElement = (event) => {
  console.log(event.currentTarget);
};

const bindButtonToClick = (button) => {
  button.addEventListener('click', displayClickedElement);
}

buttons.forEach(bindButtonToClick);
```

Your turn to extract:

- the binding logic in a `bindSportToClick` arrow function,
- the click callback in a `toggleActiveClass` arrow function.

At the end, your code should be easily readable and have no more than 1 indentation level!
