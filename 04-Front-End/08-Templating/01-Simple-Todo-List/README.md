## Background & Objectives

Welcome to your first templating challenge! You will code a simple to-do list APP, in which the user can **add a to-do** and **mark a to-do** as done.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/simple-to-do.gif)

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

### To-do item HTML

Let's start by coding the HTML. Here is how a to-do item should look like. You can use Bootstrap to style your HTML! Open your `index.html` and start coding a single to-do item.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-item-layout.png)

### List rendering

Now you have the HTML of a to-do item, let's think about how can we generate the to-dos dynmically with `insertAdjacentHTML`.

A to-do item should at least contain the following information:

- `title`: a `string` that contains what the item is about.
- `done`: a `boolean` that indicates whether the item is done or not.

A list of to-dos in `JSON` format should look like this:

```js
const todos = [
  { title: "Code a to-do list", done: true },
  { title: "Code a to-do list in Vue", done: false }
]
```

In `lib/to-do-list.js`, use the above JSON to generate the to-do HTML dynamically, and insert it into the DOM one by one.

#### How to render checkbox dynamically

A [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) is checked depending on whether the `checked` attribute is present.

```html
<!-- this checkbox is checked -->
<input type="checkbox" name="Checkbox 1" checked>

<!-- this checkbox is unchecked -->
<input type="checkbox" name="Checkbox 2">
```

You can insert `checked` into the input element depending on the `done` value of each to-do.

### Add a to-do

We want to allow the user to add a to-do.

#### HTML

Let's add the input field HTML to the bottom of the to-do list.

```html
<div class="input-group">
  <input type="text" class="form-control p-2 rounded" placeholder="Your task goes here">
  <button class="btn btn-primary" type="button">Add</button>
</div>
```

#### Event Binding

Once the user fill in the input, and click the button, the to-do should be added to the list. So we should add an `eventListener` to the button to listen to the `click` event. When clicked, it should trigger a function that takes the form input, and use it to generate a new to-do item, which is inserted to the bottom of the list.
