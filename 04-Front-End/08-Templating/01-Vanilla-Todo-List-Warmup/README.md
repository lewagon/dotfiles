## Background & Objectives

Welcome to your first templating challenge! In this challenge, you will practice rendering HTML with JavaScript by making a static to-do list.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-static.png)

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

### Data and HTML

In your `lib/to-do-list.js` file, you should be able to find the following two pieces of code.

1. Data: an array of to-do items

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
];
```

- `title`: a `string` that contains what the item is about.
- `done`: a `boolean` that indicates whether the item is done or not.

2. Template: a piece of to-do HTML code

```html
<div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
  <input class="d-flex form-check-input me-1" type="checkbox">
  <div>To-do title...</div>
</div>
```

### Generate HTML dynamically

Your turn to display the todos! Think about how you can dynamically generate the HTML based on the `todos` array.

#### How to render checkbox dynamically

A [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) is checked depending on whether the `checked` attribute is present.

```html
<!-- this checkbox is checked -->
<input type="checkbox" name="Checkbox 1" checked>

<!-- this checkbox is unchecked -->
<input type="checkbox" name="Checkbox 2">
```

In JavaScript, you can set the `checked` attribute on the input element to `true` or `false`.

```js
const checkbox = document.querySelector("input[type=checkbox]")
checkbox.checked = true; // renders a checked checkbox
checkbox.checked = false // renders an unchecked checkbox
```

Now, your turn to set the `checked` attribute's value depending on the `done` value of each to-do.
