## Background & Objectives

In this challenge, you will create the **same to-do list**, but this time, **with the `<template>` tag**.

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

### Data and HTML

There is a list of to-dos prepared for you in the `lib/to-do-list.js` file.

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
];
```

There is also a piece of to-do HTML, this time **in a `<template>` tag**, styled with Bootstrap in `index.html` file.

```html
<template id="todoItemTemplate">
  <div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
    <input class="d-flex form-check-input me-1" type="checkbox">
    <div>To-do title...</div>
  </div>
</template>
```

### Select `<template>` to generate HTML dynamically

Now you need to select the `<template>` tag and clone its content. Then insert the title into the right place, change the `checked` property accordingly, and insert it into the to-dos container.

Remember how to select and clone the content inside of the template tag? Here's a quick example.

```js
const template = document.querySelector("#idOfTheTemplate");
const clone = template.content.cloneNode(true);
```

Go back to today's slides if you need to refresh the knowledge. Good luck!
