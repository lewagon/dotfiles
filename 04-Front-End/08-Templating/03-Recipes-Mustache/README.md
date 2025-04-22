## Background & Objectives

In this challenge, you will use [Mustache.js](https://github.com/janl/mustache.js) to create an application for chefs to view various recipes.

## Setup

Let's launch a local web server by running:

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

There is a list of recipes prepared for you in `lib/recipes.js` file.

```js
const recipes = [
  {
    name: "Coq au Vin",
    ingredients: ["chicken", "red wine", "bacon", "mushrooms", "onions", "garlic"],
    difficulty: 7
  },
  {
    name: "Ratatouille",
    ingredients: ["eggplant", "zucchini", "bell peppers", "tomatoes", "onions", "garlic"],
    difficulty: 3
  },
  {
    name: "Croissant",
    ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
    difficulty: 9
  },
  {
    name: "Bouillabaisse",
    ingredients: ["fish", "shellfish", "tomatoes", "fennel", "onions", "garlic", "saffron"],
    difficulty: 10
  }
]
```

Please take a second to look at one of the recipes to see how it's data structure is set up. For example:

```js
{
  name: "Croissant",
  ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
  difficulty: 9
}
```

This is an `Object` (similar to a Ruby `Hash`), so it has **keys and values**. You'll want to make a note for yourself of what keys are present here and what types the values are (`String`, `Number`, `Array`, etc.).

The goal of this challenge is to display the data from this array in the DOM using Mustache.js.

### HTML

Here's the snippet for the HTML for one recipe:

```html
<div class="col col-lg-4">
  <div class="card mb-3">
    <div class="card-header">
      <h2>Croissant</h2>
    </div>
    <div class="card-body">
      <h5 class="card-title">Ingredients:</h5>
      <ul class="list-group">
        <li class="list-group-item">Flour</li>
        <li class="list-group-item">Butter</li>
        <li class="list-group-item">Yeast</li>
        <li class="list-group-item">Sugar</li>
        <li class="list-group-item">Salt</li>
      </ul>
      <h5 class="card-title mt-3">Difficulty: 9/10</h5>
    </div>
  </div>
</div>
```

Let's put this HTML inside of a `<template>` tag in the `index.html` file (it's not there yet this time!). Make sure to give your `<template>` an `id` so that you can easily access it later 💪

### Displaying the List

Then, you'll want to iterate over your `recipes` (similarly to the previous challenge) and display the HTML in the `<template>` for each recipe. But, this time, let's use Mustache.js to do it. Here's an example of how to use Mustache.js to render HTML (in the JS):

```js
// Assuming we have a `<template>` element on the page with the `id` `#myTemplate`:
const template = document.querySelector("#myTemplate").innerHTML
const output = Mustache.render(template, {});
```

### Making the Fields Dynamic

But now all our recipes will say "Croissant" since we hard-coded that part 😿 So, let's make it dynamic! In a Mustache template, you can make a part of the template dynamic by using...mustaches in the HTML 👨 like this:

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

So, now it's your turn. Try to use `{{ }}` mustaches in your template to dynamically render the `title`, `difficulty`, and `ingredients`.

Note that if you want to iterate over an array in Mustache.js, you can do it like this:

```html
<template id="musicians">
  {{#musicians}}
    <p>{{.}}</p>
  {{/musicians}}
</template>
```

```js
const template = document.querySelector("#musicians").innerHTML;
const output = Mustache.render(template, { musicians: ["Britney Spears", "Christina Aguilera", "Backstreet Boys"] });
```

The `{{.}}` placeholder represents each item in the `musicians` array, and it will be replaced with the corresponding value during rendering.

Enjoy!
