## Background & Objectives

In front-end web development, **data attributes** are a pretty handy way to inject values in your HTML that you can easily access in your JavaScript.

In this challenge, let's write a function that parses an HTML tag and extracts its data attributes into an `object`.

## Specs

Implement the `dataset` function which takes one `element` parameter (of type `String`) and returns an `Object` with the right keys and values:

```js
const burger = `<div class="card" data-id="42" data-price="15" data-category="popular">
  <div class="card-category">Popular</div>
  <div class="card-description">
    <h2>The best burger in town (15€)</h2>
  </div>
</div>`;

dataset(burger);
// => { id: 42, price: 15, category: 'popular' }
```

- It should only return the dataset of the **wrapping** element regardless of its children
- It should cast the values to the right type (in the example, `42` and `15` should be `number`s)

### Help

Don't forget to use your Web browser devtools to debug!

When you want to match **all the matching occurrences** in your string, you may want to look into the [`g` modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters).

### Improvements

We don't test this in the `specs` but you can implement the translation of "compound" data attributes from `kebab-case` to `lowerCamelCase` keys:

```js
const element = `<div class="card" data-meal-id="42">ANY CONTENT</div>`;

dataset(element);
// => { mealId: 42 }
```

### Going further

Starting tomorrow, we'll write JavaScript that runs in the **browser**, in the context of a [DOM](https://en.wikipedia.org/wiki/Document_Object_Model). In this context, you'll be able to call `.dataset` on any HTML element selected from the DOM, and it will return the same kind of objects as in this challenge!

This is a pretty handy way to pass data from your HTML to your JavaScript code, to react dynamically to DOM events or make remote calls to a server.

You'll learn more about these applications in the following days, in the meantime, you can read more about the [dataset property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
