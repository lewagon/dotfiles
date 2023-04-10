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

There is a list of to-dos prepared for you in `lib/to-do-list.js` file.

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

There is also a piece of to-do HTML, styled with Bootstrap in `index.html` file.

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

You can insert `checked` into the input element depending on the `done` value of each to-do.
