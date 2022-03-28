## Background & Objectives

In this exercise, we will use the [Vue](https://vuejs.org/) JavaScript framework. 

Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. 

The big upside of Vue is that if you use it, you will almost never have to do a manual `querySelector` or `addEventListener` anymore! Instead you will use conventional `v-` HTML attributes on specific element.

Let's start our first challenge with Vue!

## Boilerplate

Go ahead, open your `index.html` and look at the code inside.

It's an HTML form with category checkboxes:
- 1x checkbox "Check All"
- 4x checkbox with Categories

You can launch the webpack server:
```bash
yarn install
rake webpack
```

and open the page in your browser:
```bash
open http://localhost:8080
```

You can check these checkboxes individually, but the "Check all" checkbox is not yet checking all the checkboxes. This is the behaviour we want to implement thanks to JavaScript, and our new friend: Vue.js.


## Getting Started: Vue.js installation

**CDN**
For prototyping or learning purposes, you can use the latest version with:

```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

You can paste this line of code to `index.html` to use Vue.

**NPM**
NPM is the recommended installation method when building large scale applications with Vue. It pairs nicely with module bundlers such as Webpack or Browserify. Vue also provides accompanying tools for authoring Single File Components.

```bash
# latest stable
npm install vue
```

And now you can start to work with Vue in your code.

## The logic

Here is what we have to do:
- Check the status of the "Check All" checkbox.
- If it's checked, then, for all the checkbox targets, we will change their `checked` attribute to `true`.
- If it isn't checked, then, for all the checkbox targets, we will change their `checked` attribute to `false`.

## Select the `div`

To be able to interact with the DOM, we will need an `el` option inside our `new Vue({})` instance to select the div we want to interact with. This time, we can select the whole container so that we can interact with all the elements inside.

## Listen to an event
In order to handle the click event happening on the `check-all` checkbox, we will need an event handler here. Hence, whenever the `check-all` checkbox is clicked, a method (`checkAllBoxes`) is triggered to help us execute the logic.

Instead of `querySelector` and `addEventListener`, do you still remember how we handle events using Vue?

You should then add a `methods` option in our `new Vue({})` instance and edit the `checkAllBoxes` method there.

<details>
  <summary markdown='span'>Hint</summary>  
  
  We can attach `v-on:click` or `@click` as shortcut on the `check-all` checkbox to listen to its `click` event.

  ```html
  <input id='check-all' type="checkbox" class="form-check-input" @click="checkAllBoxes">
  ```

  ```js
  let app = new Vue({
    el: '#app',
    methods: {
      checkAllBoxes(event){
        // Code Here
      }
    }
  })  
  ```
</details>

## Bind the attribute

We want to be able to change the `checked` attribute for all targeted checkboxes, which includes `check-all` and `checkbox-categoryName`. In Vue, there is the _directive expression_ that can help us bind an attribute. Hence whenever `checkAllBoxes` method is triggered, we can manipulate the value of any attributes dynamically.

<details>
  <summary markdown='span'>Hint</summary>  
  
  We can attach `v-bind:checked` or `:checked` in shortcut on targeted checkboxes to enable dynamic manipulations.

  ```html
  <!-- index.html -->
  <!-- ... -->
  <input id='check-all' type="checkbox" class="form-check-input" :checked="allChecked" @click="checkAllBoxes">
  <!-- ... -->
  <input id='checkbox-appartment' type="checkbox" class="form-check-input" :checked="allChecked">
  <!-- ... -->
  ```

  ```js
  // index.js
  let app = new Vue({
    el: '#app',
    data: {
      // Set the default to false for all the checkboxes
      allChecked: false,
    },
    methods: {
      checkAllBoxes(event){
        // Code Here
      }
    }
  })  
  ```
</details>

## Manipulate the attribute

The next step is to add some code in the `checkAllBoxes` method. Follow the logic we discussed at the beginning and think about how we want to manipulate the `allChecked` property in `data`.

You've got everything in hand to tackle the rest of this challenge.

Remember to try the behaviour of your code in the Browser (test manually), and feel free to add `console.log` to understand what you're dealing with in the `checkAllBoxes` methods.

Your turn!
