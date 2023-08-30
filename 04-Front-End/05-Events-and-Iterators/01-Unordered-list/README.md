## Background & Objectives

In this challenge, we want you to generate the HTML of an **unordered list** from raw data.

### Setup

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser.

In this challenge, we will also have 2 processes to test our code:
- In the browser
- In the terminal

They both test the same things but in 2 separate interfaces.

Start by working with the tests in the browser. When you are done, use `rake` to test in the terminal.

## Specs

### List item generator

Implement first the `listItem(content)` function which takes one `content` parameter (of type `String`) and returns the `<li>` tag with its content:

```js
listItem('milk');
// => '<li class="list-group-item">milk</li>'

listItem('bread');
// => '<li class="list-group-item">bread</li>

listItem('butter');
// => '<li class="list-group-item">butter</li>
```

Make sure you use [ES6 template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) and not concatenation (not the modern way to do this in JavaScript).

💡 Note that `content` is a parameter to the function `listItem`. You don't need to worry about what the content will be; just accept for now that it will get passed in as an argument when the function is called.

_You don't need to worry about calling the function in this section, only defining it. That step will come later._

### Unordered list generator

When the `listItem` function passes all the tests, go on and code the `unorderedList(items)` function which takes one `items` parameter (`Array`) and returns the whole `<ul>`'s HTML:

```js
> console.log(unorderedList(['milk', 'butter', 'bread']));
// <ul class="list-group">
//   <li class="list-group-item">milk</li>
//   <li class="list-group-item">butter</li>
//   <li class="list-group-item">bread</li>
// </ul>

> console.log(unorderedList(['apple', 'strawberry', 'orange']));
// <ul class="list-group">
//   <li class="list-group-item">apple</li>
//   <li class="list-group-item">strawberry</li>
//   <li class="list-group-item">orange</li>
// </ul>
```

**Just this once**, we won't mind if the indentation in the generated string isn't perfect!

💡 Note that `items` is a parameter to the function `unorderedList`. Similarly, to the previous section, you shouldn't worry about providing the actual list. Your function should work with any array when it's called.

_You don't need to worry about calling the function in this section, only defining it. That step will come later._

### Display the list

🚀 Now, it's time to **call our function**.

Call your `unorderedList` function to generate the HTML of the groceries list and display it in the `#list` element of the `index.html` page.

The groceries list should look as follows:
```js
const groceries = ['milk', 'butter', 'bread'];
```

### Refactoring with `Map()`

If your solution passes the tests using `forEach()`, the last step is to find a better solution using [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)!

Here's an example:

```js
const beatles = ["paul", "john", "ringo", "george"];
const upcasedBeatles = beatles.map(beatle => beatle.toUpperCase());
// => ["PAUL", "JOHN", "RINGO", "GEORGE"]
```
