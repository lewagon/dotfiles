## Background & Objectives

Welcome to your first Vue challenge!

[Vue](https://vuejs.org/guide/introduction.html) (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

You will learn the basics of Vue by building a to-do list APP, with which you can do the following:

- See all your to-do items
- Add a to-do item(Optional)
- Remove a to-do item(Optional)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### Setup

#### Vue

We [import Vue with Import Maps](https://vuejs.org/guide/quick-start.html#enabling-import-maps). Make sure you have the following code in your HTML and JS.

```html
<!-- index.html -->
<head>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      }
    }
  </script>
</head>
```

```js
// lib/to-do-list.js
import { createApp } from 'vue'
// ...
```

Let's launch a local webserver by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser. If you see a message about Vue, then your project is set up with Vue!

#### VSCode Vue Highlighter

Let's install Vue syntax highlighter to make our code look nicer 💅

```bash
code --install-extension Vue.volar
```

## The To-do APP

### Vue Warm Up

Have a look at the `lib/to-do-list.js` file.

```js
createApp({
  data() {
    return {
      message: "If you see this message in your browser, that means Vue is successfully mounted! 🙌"
    }
  }
}).mount('#todosContainer')
```

A Vue instance is already created with `createApp()` function. You will code your component inside of `createApp()`.

`.mount("#todosContainer")` is called on the Vue instance. It means this Vue instance will be mounted on the HTML element that has the css selector `#todosContainer`.

[`data`](https://vuejs.org/api/options-state.html#data) is a component option. It returns a plain JavaScript object. The properties, like `message`, are made available in the HTML by `{{}}`.

```html
<div id="app">
  {{message}}
</div>
```

### 1. See all the to-do items

#### Data

<details>
<summary markdown='span'>In a Vue instance, where do we put the to-do items data?</summary>


You have the same to-do items in an array.

```js
[
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
]
```

We can put this list in `data` option as initial data, and assign it to a meaningful property, like `todos` or `items`. It is important to name things in a meaningful way, so your code is readable to your future self and others.

```js
createApp({
  data() {
    return {
      todos: [
        { title: "Code a to-do list", done: false },
        { title: "Eat breakfast", done: true },
        { title: "Do some exercise", done: false },
        { title: "Water the plants", done: true }
      ]
    }
  }
}).mount('#todosContainer')
```
</details>

#### List Rendering

<details>
<summary markdown='span'>How do we dynamically render the list?</summary>

We can use a built-in directives [`v-for`](https://vuejs.org/api/built-in-directives.html#v-for). It's like `.each` in Ruby. Read the documentation, and write your code in `index.html` to render your to-do list based on `todos`.

ℹ️ You already coded a to-do list in the first challenge so feel free to re-use some of the HTML you previously wrote.
</details>

#### Attribute Binding

<details>
<summary markdown='span'>How do we bind `done` with the checkbox?</summary>

We can use [`v-bind`](https://vuejs.org/api/built-in-directives.html#v-bind) to dynamically render HTML attributes. In the checkbox's case, we can do the following:

```html
<input type="checkbox" v-bind:checked="theDoneBooleanGoesHere">
```
</details>

#### v-cloak 🧥

<details>
<summary markdown='span'>Did you notice that every time you refresh the page, there's a flash of unloaded HTML elements?</summary>

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/vue-un-compiled-flash.gif)

That's because the HTML is not yet compiled when we refresh. We can use `v-cloak` to temporarily hide un-compiled HTML. Read [the documentation](https://vuejs.org/api/built-in-directives.html#v-cloak), and implement for your APP! Remember to **hard refresh** when you change the CSS file.

That's it! Congratulations on your first Vue APP! 🥂 Move on to the optionals to try implementing **Create** and **Delete** actions!
</details>

### 2. Add a to-do(Optional)

<details>
<summary markdown='span'>What happens when a user adds a to-do?</summary>

1. User fills in the to-do title
2. User clicks a button
3. the to-do is added and appears on the list.

When the button is clicked, the Vue instance needs to take care of getting the data and adding it to the list. We will create a [method](https://vuejs.org/api/options-state.html#methods) called `addTodo()` to take care of all these.

Methods are defined in `methods` option:

```js
createApp({
  data() {
  // ...
  },
  methods: {
    addTodo() {
      console.log("Adding a todo...")
    }
  }
}).mount('#todosContainer')
```
</details>

#### Event Binding

`addTodo()` needs to be triggered when the add button is clicked.

<details>
<summary markdown='span'>How can we bind the click event to the button?</summary>

We can use [`v-on`](https://vuejs.org/api/built-in-directives.html#v-on) to listen to the click event.

```html
<button v-on:click="addTodo">Add</button>
```

Check in your browser console, can you see the `console.log` you added in your method? If so, then your event binding is successful!
</details>

#### Form Input Binding

<details>
<summary markdown='span'>Now, how do we pass the input data to the Vue instance?</summary>

We can use [`v-model`](https://vuejs.org/guide/essentials/forms.html#form-input-bindings). It's similar to `v-bind`. `v-bind` creates a **one-way binding** - from Vue instance to the HTML. `v-model` is **two-ways**. It's often used in forms, because we need to sync the state of form input with corresponding state in JavaScript.

To use `v-model`, we should first have a property declared in `data()` option.

```js
data() {
  return {
    // ...
    newTodo: null
  }
},
```

Then we bind it to the input element in HTML.

```html
<input v-model="newTodo" placeholder="Your to-do goes here" />
```

Note that every property in `data()` is accessible with `this.propertyName`. Now you can access user's input with `this.newTodo` in the Vue instance. Try it out!


##### Pseudo-code for addTodo()

1. Construct a to-do object based on user input.
2. Add it to the `todos` list.

One thing cool about Vue is its [**reactivity**](https://vuejs.org/guide/extras/reactivity-in-depth.html). `data()` is reactive, meaning that changes in `data()` trigger an update in the DOM. See how changing `this.todos` automatically updates the DOM.

You may also notice that after adding a to-do, user's input stays in the input field. Considering that `v-model`'s binding is two-ways, how would you reset the input?
</details>

### 3. Delete a to-do(Optional)

First, you should make sure to add a delete button to the to-do element. You can use [Boostrap's close button](https://getbootstrap.com/docs/5.0/components/close-button/), or [fontawesome's trash icon](https://fontawesome.com/search?q=trash&o=r).

The rest of is very similar to adding a to-do. Take the advantage of [the documentation of Vue](https://vuejs.org/guide/introduction.html) to implement the following steps:

1. Bind an event to the delete button that triggers a method
2. The method remove the to-do from `todos`

<details>
<summary markdown='span'>Question & Hint</summary>

❓ How does this method know which to-do to delete?
❓ What is the unique identifier of each to-do? You can use this to identify which to-do to delete.

💡 You can pass an argument to a method.
💡 You have access to index in `v-for`.
</details>

Good luck!
