## Background & Objectives

In this challenge, we want you to generate the HTML of an **unordered list** from raw data.

## Specs

### List item generator

Implement first the `listItem` function which takes one `content` parameter (of type `String`) and returns the `<li>` tag with its content:

```js
listItem('milk');
// => '<li class="list-group-item">milk</li>'
```

### Unordered list generator

When the `listItem` function passes all the tests, go on and code the `unorderedList` function which takes one `items` parameter (`Array`) and returns the whole `<ul>`'s HTML:

```js
> const items = [ 'milk', 'butter', 'bread' ];
> console.log(unorderedList(items));
// <ul class="group-list">
//   <li class="group-list-item">milk</li>
//   <li class="group-list-item">butter</li>
//   <li class="group-list-item">bread</li>
// </ul>
```

**For once, in this specific case**, we won't mind if the indentation in the generated code isn't perfect!
