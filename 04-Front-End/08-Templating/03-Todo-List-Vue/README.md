## Background & Objectives

Welcome to your first Vue challenge!

[Vue](https://vuejs.org/guide/introduction.html) (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

You will learn the basics of Vue by building a to-do list APP, with which you can do the following:

- See all your to-do items
- Add a to-do item
- Remove a to-do item
- Mark/unmark a to-do item as done

![](https://raw.githubusercontent.com/lewagon/fullstack-images/templating/frontend/to-do-list-vue-user-flow.gif)

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
// javascript/application.js
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

Have a look at the `javascript/application.js` file.

```js
// javascript/application.js
createApp({
  data() {
    return {
      message: "If you see this message in your browser, that means Vue is successfully mounted! 🙌"
    }
  }
}).mount('#app')
```

A Vue instance is already created with `createApp()` function. You will code your component inside of `createApp()`.

`.mout("#app")` is called on the Vue instance. It means this Vue instance will be mounted on the HTML element that has the css selector `#app`.

[`data`](https://vuejs.org/api/options-state.html#data) is a component option. It returns a plain JavaScript object. The properties, like `message`, are made available in the HTML by `{{}}`.

```html
<div id="app">
  {{message}}
</div>
```


### 1. See all the to-do items

#### Data structure

Think about what a to-do item should *at least* contain? What kind of information?

- `title`: a string that contains what the item is about.
- `done`: a boolean that indicates whether the item is done or not.

A list of to-dos in `JSON` format should look like this:

```js
[
  { title: "Code a to-do list", done: true },
  { title: "Code a to-do list in Vue", done: false }
]
```

We can put this list in `data` option as initial data, and assign it to a meaningful property, like `todos` or `items`. It is important to name things in a meaningful way, so your code is readable to your future self and others.

```js
createApp({
  data() {
    return {
      todos: [
        { title: "Code a to-do list", done: true },
        { title: "Code a to-do list in Vue", done: false }
      ]
    }
  }
}).mount('#app')
```

#### List Rendering

How do we dynamically render the list?

We can use a built-in directives [`v-for`](https://vuejs.org/api/built-in-directives.html#v-for). It's like `.each` in Ruby. Read the documentation, and write your code in `index.html` to render your to-do list based on `todos`.

ℹ️ You already coded a to-do list in the first challenge so feel free to re-use some of the HTML you previously wrote.

#### Attribute Binding

The `done` boolean is represented by the checkbox.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/templating/frontend/to-do-checkbox.png)

A [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) is checked depending on the `checked` property.

```html
<!-- this checkbox is checked -->
<input type="checkbox" name="Checkbox 1" checked>

<!-- this checkbox is unchecked -->
<input type="checkbox" name="Checkbox 2">
```

We can use [`v-bind`](https://vuejs.org/api/built-in-directives.html#v-bind) to dynamically render HTML attributes. In the checkbox's case, we can do the following:

```html
<input type="checkbox" v-bind:checked="the_done_boolean_goes_here">
```


### 2. Add a to-do

What happens when a user adds a to-do?

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
}).mount('#app')
```

#### Event Binding

`addTodo()` needs to be triggered when the add button is clicked. We can use [`v-on`](https://vuejs.org/api/built-in-directives.html#v-on) to listen to the click event.

```html
<button v-on:click="addTodo">Add</button>
```

Check in your browser console, can you see the `console.log` you added in your method? If so, then your event binding is successful!

#### Form Input Binding

Now, how do we pass the input data to the Vue instance? We can use [`v-model`](https://vuejs.org/guide/essentials/forms.html#form-input-bindings). It's similar to `v-bind`. `v-bind` creates a **one-way binding** - from Vue instance to the HTML. `v-model` is **two-ways**. It's often used in forms, because we need to sync the state of form input with corresponding state in JavaScript.

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

You may also notice that after adding a to-do, user's input stays in the input field. Considering `v-model` is two-ways, how would you reset the input?


### 3. Delete a to-do

It is very similar to adding a to-do. Follow the steps, and take the advantage of [the documentation of Vue](https://vuejs.org/guide/introduction.html).

#### Delete button

If you haven't already, add a delete button to the to-do element. You can use [Boostrap's close button](https://getbootstrap.com/docs/5.0/components/close-button/), or [fontawesome's trash icon](https://fontawesome.com/search?q=trash&o=r).

#### Steps

1. Bind an event to the delete button that triggers a method
2. The method remove the to-do from `todos`

#### Question & Hint

❓How does this method know which to-do to delete?
❓What is the unique identifier of each to-do? You can use this to identify which to-do to delete.

💡You can pass an argument to a method.
💡You have access to index in `v-for`.


### 4. Mark as done

#### Upgrade the style

We want to also add a **cross** and make the text **gray** when marking a to-do as done, in addition to checkbox change.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/templating/frontend/cross-to-do-item.png)

We need to dynamically render some CSS clasess based on `done`. You can do `v-bind` on `class` attribute, and pass a JavaScript object, that's made of the pairs of **class name** and **a boolean** indicating whether the class will be applied or not:

```html
<div class="container" v-bind:class="{ 'cssClassName1': true, 'cssClassName2': false }">
  Hello
</div>
```

generates the following HTML:


```html
<div class="container cssClassName1">
  Hello
</div>
```

Find the Boostrap classes that gray out and cross out the text. Don't reinvent the wheel!

You may notice that checking and unchecking the to-do *doesn't* really make the text crossed and gray. Try and print the `done` property as itself in the HTML with `{{ todo.done }}` to see what it returns, and you will notice something. 👀 

Checking and unchecking the checkbox doesn't change `done`! 🫢

Because `v-bind` is only from the Vue instance to the HTML, it doesn't know what the user changes. Let's make this mark as done real by changing `v-bind` to `v-model`.

#### v-cloak 🧥

Did you notice that every time you refresh the page, there's a flash of unloaded HTML elements?

![](https://raw.githubusercontent.com/lewagon/fullstack-images/templating/frontend/vue-un-compiled-flash.gif)

That's because the HTML is not yet compiled when we refresh. We can use `v-cloak` to temporarily hide un-compiled HTML. Read [the documentation](https://vuejs.org/api/built-in-directives.html#v-cloak), and implement for your APP! Remember to **hard refresh** when you change the CSS file.


### 5. Persist data(Optional)

So far, each refresh will reset the to-do data. We can store the data in the browser with [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). `localStorage` is in ` UTF-16 string` format, so you need to turn the JavaScript object into a string (`JSON.stringify()`) when storing, and turn the string back into an object (`JSON.parse()`) when reading. Sound familiar? Yes, we have done it with Ruby before.

#### Set localStorage

To add data in `localStorage`, you can use `setItem()`.

```js
localStorage.setItem('myCat', 'Tom');
```

To read data from `localStorage`, you can use `getItem()`

```js
localStorage.getItem('myCat'); // => 'Tom'
```

To see the `localStorage` in your browser, open up the inspector. For Chrome, you can find it in `Application`.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/templating/frontend/browser-local-storage.png)

Each time `todos` property is updated, we should set `localStorage` with the newest `todos`. i.e. each time a to-do is added, deleted or updated(marked as done). Where should you set the localStorage in the Vue instance?

#### Read localStorage

We should read from the local storage, when the APP is first loaded. How do we tell our Vue instance to do so in a particular stage?

##### Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages. See all the [lifecycle hooks](https://vuejs.org/api/options-lifecycle.html).

We will read `localStorage` in [`mounted()`](https://vuejs.org/api/options-lifecycle.html).

```js
createApp({
  data() {
  // ...
  },
  methods: {
  // ...
  },
  mounted() {
    // TODO:
    // 1. Read todos from localStorage
    // 2. Set `this.todos` based on the data
  }
}).mount('#app')
```

Congratulations on your first Vue APP! 🥳
