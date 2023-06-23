## Background & Objectives

Welcome to your first React challenge!

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. It is a very popular library, used by Facebook, Instagram, Netflix, Airbnb, and many other companies. React apps are made out of components: a piece of UI that has its own logic and appearance.

You will learn the basics of React by building a to-do list APP, with which you can do the following:

- See all your to-do items
- Add a to-do item(Optional)
- Remove a to-do item(Optional)

(Yes, this is the same functionality as in the Vue challenge 💪)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### Setup

#### React

React uses a special syntax called [JSX](https://react.dev/learn/writing-markup-with-jsx), which is a templating language that lets us easily write Javascript expressions inside of our HTML. The syntax of it does differ a little bit from standard JavaScript (we'll see this shortly!). The nice thing about this is that the syntax is fairly simple. The rough part is that _browsers can't actually read JSX files by default_. So we have to convert them to normal JS files before we can actually run them in the browser.

So, usually developers use what's called a **bundler** like [Webpack](https://webpack.js.org/) to process all the files and convert them into "normal" JavaScript that browsers can read. This requires installing a lot of additional stuff, so we're going to avoid this complexity just for the sake of this challenge.

Instead, we're going to load some external scripts that will install React and process our files for us:

```html
    <script type="application/javascript" src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
```

The first two libraries are React itself. The third is Babel, which can process our JSX files for us. You may notice this line at the bottom of our `index.html`:

```html
<script src="lib/to-do-list.jsx" type="text/babel"></script>
```

The `type="text/babel"` tells Babel to process our JavaScript. So, we should be all good to write JSX 💪 You may notice that we're importing our scripts slightly differently in this challenge from all the others, because this setup isn't compatible with import maps at the moment. But don't worry - it won't affect the code you'll end up writing.

_[Note: This means that Babel converts our JSX into JS **inside** of the user's browser. This is inefficient because ideally we would convert everything in advance. In other words, this "lightweight" setup is perfect for the purposes of this challenge, but a real production app would require some more setup.](https://babeljs.io/docs/babel-standalone#when-not-to-use-babelstandalone)_

Let's launch a local web server by running:

```bash
serve
```

Then, open [`localhost:8000`](http://localhost:8000) in your browser. If you see a message about React, then your project is set up with React.

## The To-do App

### React Warm Up

Have a look at the `lib/to-do-list.jsx` file.

```js
const App = () => {
  const message = "If you see this message in your browser, that means React is successfully mounted! 🙌";

  return (
    <div id="app">
      {message}
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

A React instance is already created with `ReactDOM.render` function. You will code your component inside of `App()`.

`ReactDOM.render` actually puts the results of the React code into the DOM. You won't need to change that line, as it connects the React code to the `<div id="root">` element that's already included for you in the `index.html` file.

Our `App()` function is where most of the code will go. It's a [component](https://react.dev/learn/your-first-component), which, in React, is a function that returns HTML. Notice the templating code that puts the string variable `message` inside of a `<div>` like so:

```html
<div id="app">
  {message}
</div>
```

This is JSX syntax. In essence you just stick `{}` into your HTML anytime you want to write a JavaScript expression. For example, this would also work:

```html
<div id="app">
  The sum is {2 + 4}
</div>
```

### 1. See all the to-do items

#### Data

<details>
<summary markdown='span'>In a React app, where do we put the to-do items data?</summary>


You have the same to-do items in an array.

```js
[
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
]
```

This is data that could potentially change over time. For example, we might want to add or remove an item from our to-do items array in the future. How do we handle changing data in React?

We use the [`React.useState`](https://react.dev/reference/react/useState) function. This is a React function, or, as React people like to call it, a [hook](https://react.dev/reference/react), that lets us define variables whose values might change over time in our app.

Let's change our `App()` function like this:

```js
const App = () => {
  const [todos, changeTodos] = React.useState(
    [
      { title: "Code a to-do list", done: false },
      { title: "Eat breakfast", done: true },
      { title: "Do some exercise", done: false },
      { title: "Water the plants", done: true }
    ]
  )

  return (
    <div id="app"></div>
  );
}
```

This code means that we will now have access to two variables: `todos`, which is just the array of to-dos, and `changeTodos`, which is a function we could call when our array should change (for example, if we want to add or remove an element). Since we're only worrying about _reading_ our to-dos for now, not creating, editing, or deleting them, we won't use `changeTodos` much at the moment 😌
</details>

#### List Rendering

<details>
<summary markdown='span'>How do we dynamically render the list?</summary>

In React, you use `{}` whenever you want to put Javascript inside your HTML. In normal Javascript, if we wanted to print out each element in a list, we'd need to use **iteration**. It turns out in React, you can use iteration just like in normal JS! The most common operator is the `map` function. The reason for this is that `map` returns an array (in this case of JSX elements), and JSX supports adding an array of elements to the DOM.

Here's a sample of how it works:

```js
function App() {
  const [items, changeItems] = React.useState(['apple', 'banana', 'orange']);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default App;
```
</details>

This would display a list of all 3 fruits 🍎

You may be wondering what the `key` means. React prefers it if you give it a unique key for each element that you iterate over. This helps it keep track if elements are added/removed, or if the order changes. It's similar to how we assign a unique ID to each record in the database. We won't worry about this too much for today💆  If you are interested, read more about [why React need keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys). In this example, we will be using the index of the element in the array.

Can you use this sample code as a guide to try to figure out how you might display each item in `todos` in the DOM?

#### Attribute Binding

<details>
<summary markdown='span'>How do we bind `done` with the checkbox?</summary>

React makes it easy to set HTML attributes in JSX syntax:

```js
function App() {
  const shouldBeChecked = true

  return (
    <input type="checkbox" checked={shouldBeChecked} />
  );
}

export default App;
```

All we have to do is to use `{}` to write some JavaScript as the value for `checked` on our checkbox.

Can you use this principle to make your checkboxes dynamically match the value of `done` on each checkbox?
</details>

### 2. Add a to-do (Optional)

<details>
<summary markdown='span'>What happens when a user adds a to-do?</summary>

1. User fills in the to-do title.
2. User clicks a button.
3. the to-do is added and appears on the list.

When the button is clicked, the React app needs to take care of getting the data and adding it to the list. We will create a JavaScript function called `addTodo()` to take care of all these.

In order to do this, we'll create a new variable `title` using the `useState` hook that will update whenever the user types in the input (using the `onChange` event).


```js
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const addTodo = () => {
    console.log("Adding a todo...");
    // TODO: add a new to-do based on the title to the `todos` array
    setTitle('');
  }

  return (
    <div id="app">
      <h1>To-Do List</h1>
      <form>
        <label htmlFor="todoTitle">Title:</label>
        <input type="text" id="todoTitle" value={title} onChange={handleTitleChange} />
        <button type="button" onClick={addTodo}>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

_Hint: You can potentially use JavaScript's [**spread operator**](https://www.educative.io/answers/what-is-the-spread-operator-in-javascript) to help you on this part. The spread operator is useful if you want to take an existing array and generate a new array with an additional element in it. Here's a sample of the syntax:_

```js
const fruits = ['apple', 'banana', 'orange'];
const fruitsAndVegetables = [...fruits, 'cucumber', 'pepper'];
// the value of fruitsAndVegetables will be ['apple', 'banana', 'orange', 'cucumber', 'pepper']
```
</details>

#### Event Binding

`addTodo()` needs to be triggered when the add button is clicked.

<details>
<summary markdown='span'>How can we bind the click event to the button?</summary>

We can use the `onClick` attribute on our `<button>`.

```html
<button type="button" onClick={addTodo}>Add Todo</button>
```

Check in your browser console, can you see the `console.log` you added in your method? If so, then your event binding is successful!
</details>

##### Pseudo-code for addTodo()

1. Construct a to-do object based on user input.
2. Add it to the `todos` list.

In React, if you just change the value of `todos` like `todos = SOMETHING_DIFFERENT`, it won't work. You'll have to use the `changeTodos` function.

For example, the below code would set our `todos` equal to an empty array `[]`:

```js
changeTodos([]);
```

Now, instead of setting it to an empty array, can you set it to a new array with **all the existing todos** AND **the new one we want to add**?
</details>

### 3. Delete a to-do (Optional)

First, you should make sure to add a delete button to the to-do element. You can use [Boostrap's close button](https://getbootstrap.com/docs/5.0/components/close-button/), or [fontawesome's trash icon](https://fontawesome.com/search?q=trash&o=r).

The rest of is very similar to adding a to-do. Take the advantage of [the documentation of React](https://reactjs.org/docs/getting-started.html) to implement the following steps:

1. Bind an event to the delete button that triggers a method.
2. The method removes the to-do from `todos`.

<details>
<summary markdown='span'>Question & Hint</summary>

❓ How does this method know which to-do to delete?
❓ What is the unique identifier of each to-do? You can use this to identify which to-do to delete.

💡 You can pass an argument to a method.
💡 You have access to index in `map`.
</details>

## Going further

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Official Learn React track](https://beta.reactjs.org/learn) if you enjoyed this challenge and wants to go further after the bootcamp!
