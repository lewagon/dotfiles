## Background & Objectives

In this challenge, you will create the **same to-do list**, but this time, **with **[Mustache.js](https://github.com/janl/mustache.js) tag.

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

### Data

In the `index.html` file, we now have:

```html
<script type="importmap">
  {
    "imports": {
      "mustachejs": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"
    }
  }
</script>
```

This means you're already all set to use Mustache.js 👨

As before, there is a list of to-dos prepared for you in `lib/to-do-list.js` file.

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true },
];
```

### HTML

Here's the snippet for the HTML for one to-do that we used in the previous challenges:

```html
<div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
  <input class="d-flex form-check-input me-1" type="checkbox" />
  <div>Water the plants</div>
</div>
```

Let's put this HTML inside of a `<template>` tag in the `index.html` file (it's not there yet this time!). Make sure to give your `<template>` an `id` so that you can easily access it later 💪

### Displaying the List

Then, you'll want to iterate over your `todos` (similarly to the previous challenge) and display the HTML in the `<template>` for each to-do. But, this time, let's use Mustache.js to do it. Here's an example of how to use Mustache.js to render HTML (in the JS):

```js
# Assuming we have a `<template>` element on the page with the `id` `#myTemplate`.
const template = document.querySelector("#myTemplate").innerHTML
const output = Mustache.render(template, {});
```

#### Making the Title Dynamic

But now all our tasks will say "Water the plants" since we hard-coded that part 😿 So, let's make it dynamic! In a Mustache template, you can make a part of the template dynamic by using...mustaches in the HTML 👨 like this:

```html
<template id="myTemplate">
  <div>{{ message }}</div>
</template>
```

Then, in the JavaScript, you can pass information into these dynamic slots like this:

```js
const template = document.querySelector("#myTemplate").innerHTML;
const output = Mustache.render(template, { message: "Hello, world!" });
```

Can you see how the second argument to `Mustache.render` is a JavaScript object that contains all the pieces of information to fill in between the `{{ }}` mustaches based on the keys in the object?

So, now it's your turn. Try to use `{{ }}` mustaches in your template to dynamically change the title of each task.

#### Making the Checkbox Dynamic

But, still, all our checkboxes will show as unchecked by default 🥶 They're static/hard-coded and should be dynamic because each to-do needs to have its corresponding checkbox be either checked or unchecked based on the true/false value of `done`. So, let's use some `{{ }}` mustaches to fix the problem!

Hint: Just like how we used `{{ }}` mustaches for the content of an HTML tag, you can also use them as the value for HTML attributes like `class="{{ myClassNames }}"`.
