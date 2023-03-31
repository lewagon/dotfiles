## Background & Objectives

Welcome to your first React challenge!

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. It is a very popular library, used by Facebook, Instagram, Netflix, Airbnb, and many other companies. React apps are made out of components: a piece of UI that has its own logic and appearance.

In this challenge, you will build a Quote Generator app using the quotes of this [API](https://type.fit/api/quotes). You will learn how to:

- Import and use React in our project
- Create a React component
- Render components in our app

## Setup

We need React so we need to import the React framework and [React DOM](https://reactjs.org/docs/react-dom.html). Lastly, React components are often written in JSX, but since we don't have a compiler in our project, we will do it the Rails way and import [htm](https://github.com/developit/htm), which enables us to write JSX-like syntax in plain JavaScript.

In the head of our project, let's add the import of these packages:

```html
  <script type="importmap">
    {
      "imports": {
        "htm": "https://cdn.esm.sh/v45/htm@3.1.0/es2021/htm.js",
        "react": "https://cdn.esm.sh/v45/react@17.0.2/es2021/react.js",
        "react-dom": "https://cdn.esm.sh/v45/react-dom@17.0.2/es2021/react-dom.js"
      }
    }
  </script>
```

We have already created the `lib/components/htm_create_element.js` file for you. This file is a wrapper around the `htm` package that we imported. It allows us to use the `htm` function to create React components with a JSX-like syntax.

Now let's import ReactDOM at the top of our `index.js` file, as well as the function from the `htm` package (we don't need to import anything from the React package, as it's already imported in the `htm_create_element` file):

```js
import { render } from 'react-dom';
import h from './components/htm_create_element.js';
```

## Our first component

Let's create an `App.js` file in the `components` folder. This file will contain our app that will render our first React component.

We need to import React and `h` at the top, and we will create our first component to render: an `h1` title for now!

```js
import h from './htm_create_element.js';

export default function App() {
  return h`<h1>Hello world</h1>`; // Your first component rendered!
}
```

To render it, we need to select the `#root` element in our HTML filem which we will do it in the `index.js` file:

```js
const rootNode = document.getElementById('root');
render(h`<${App} />`, rootNode);
```

We are using the `h` function to describe which component we want to render. The last line is equivalent, in JSX syntax, to:

```jsx
render(<App />, rootNode);
```

But since we are not using a compiler, we do it the Rails way, using the `htm` package.

Now let's launch our server, you should see the **Hello world** title! 🥳

## Quote Generator

Now that our app is running and our first small component created, let's build our app!

### Quote component

Let's create a `Quote.js` component in the `components` folder. This component will be a quote card, with the quote and the author. We will use a `div` element to create the card, and we will use a `p` element for the quote and a `span` element for the author.

```js
// components/Quote.js
import React from 'react';
import h from './htm_create_element.js';

export default function Quote() {
  return h`
    <div>
      <p>
        <span>“</span>
        Genius is one percent inspiration and ninety-nine percent perspiration.
        <span>“</span>
      <p/>
      <span>- Thomas Edison</span>
    </div>`;
}
```

### App component

Now let's edit the `App.js` component to render the `Quote` component.

```js
// components/App.js
// [...]
import Quote from './Quote.js'; // Import the component

export default function App() {
  return h`<${Quote} />`; // And render it here!
}
```

Reload the page, you should see our quote appear! 🥳

Let's improve the `App` component to render the quotes and also have a button to get a new quote. We will use a `div` element for the container, and a `button` element for the button.

```js
// components/App.js
export default function App() {
  return h`
    <div className="container">
      <${Quote} />
      <button className="btn btn-primary mt-3">More inspiration</button>
    </div>`;
}
```

Let's add some style to our container and root element so our quotes will show nicely:

```css
#root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e6cba1;
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.container {
  width: 550px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 40px;
  font-size: 1.3rem;
}
```

Reload the page. Our app should look better already!

### Fetching the quotes

One quote is good, but it'll be better if we can get a selection of quotes, from the API! We will use the `fetch` function to do it. We will create a `useEffect` hook to fetch the quotes when the component is mounted. We will store the quotes in a `quotes` state, and we will use the `useState` hook to do it.

**Resources:**
- [`useState`](https://beta.reactjs.org/reference/react/useState) enables us to add a state variable to your component. Here we can store the array of quote, with an empty array `[]` as default.
- [`useEffect`](https://beta.reactjs.org/reference/react/useEffect) lets us step outside React, to use an external system, here an API, in our component.

```js
// components/App.js
// [...]
import { useState, useEffect } from 'react'; // Don't forget this line at the top of the file

export default function App() {
  const [quotes, setQuotes] = useState([]);
  console.log("Quotes: ", quotes);

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => (setQuotes(data));
  }, []);

  return h`
    <div className="container">
      <${Quote} />
      <button className="btn btn-primary mt-3">More inspiration</button>
    </div>`;
}
```

Check the console, you should see the quotes loaded in the `Quotes`! They are now saved in the `state` of our `Container` component.

Let's create a function to get a random quote within the array. We have already seen how to get a random number in JavaScript during the HTTP & API lecture. We will use the `Math.random` function to get a random number between 0 and 1, and we will multiply it by the length of the array to get a random index.

```js
// components/App.js
// [...]

export default function App() {
  // [...]
  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // [...]
```

We also need to add an extra `state` to our app to be able to set a quote and know which one we are currently showing.

We can add it with:

```js
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null); // Add this line
```

We now have a state `currentQuote`, `null` by default because the quotes won't be loaded yet.

Let's create another function `getNewQuote()` that will get a random quote and set it as the current quote.

```js
  const getNewQuote = (quotes) => {
    const newQuote = getRandomQuote(quotes);
    setCurrentQuote(newQuote);
  };
```

Let's use it from the `useEffect`, once we will have all the quotes available, to have a random quote when we load the page:

```js
console.log("currentQuote: ", currentQuote);
useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
        getNewQuote(data);
      });
  }, []);
```

Now we have a random quote when we load the page! 🎉 But it doesn't appear in our page yet, we can only see it in the console.

Instead of our hard-coded quote in the `Quote` component, let's use the quote stored in the `currentQuote` state.

```js
// components/Quote.js
// [...]

export default function Quote({ quote }) {
  return h`
    <div className="quote">
      <p className="quote-text">${quote.text}</p>
      <p className="quote-author">${quote.author}</p>
    </div>`;
}
```

and pass the quote to the component as a `prop`. In ReactJS, the `props` are a type of object where the value of attributes of a tag is stored. In our case, we will pass the `currentQuote` as a `prop` to the `Quote` component.


```js
// components/App.js
// [...]

export default function App() {
  // [...]
  return h`
    <div className="container">
      <${Quote} quote=${currentQuote} />
      <button className="btn btn-primary mt-3">More inspiration</button>
    </div>`;
}
```

Reload the page. We are still getting an error though, because the `currentQuote` is `null` at the beginning, and we are trying to access the `text` and `author` properties of `null`.

We can fix it by adding a condition to the `Quote` component, to display a loading message if the quote is `null`:

```js
// components/Quote.js
// [...]

export default function Quote({ quote }) {
  if (quote === null) {
    return h`<p>Loading...</p>`;
  }

  return h`<>
      <p>
        <span>“</span>
        ${quote.text}
        <span>“</span>
      <p/>
      <span>- ${quote.author}</span>
    </>`;
}
```

Now reload the page, and you should see a random quote!

### Adding a button to get a new random quote

We already added a button in our App component, so let's add a function when we click on it to get a new quote.

To do so, we can bind our existing `getNewQuote` function to the `onClick` event of the button:

```js
// components/App.js
// [...]

export default function App() {
  // [...]
  return h`
    <div className="container">
      <${Quote} quote=${currentQuote} />
      <button className="btn btn-primary mt-3" onClick=${() => getNewQuote(quotes)}>More inspiration</button>
    </div>`;
}
```

Now click on the button to see a random new quote everytime! 🚀

## Add some style

Feel free to play with the style of the app to make it look even nicer or add a title! 💅

## Going further

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Official Learn React track](https://beta.reactjs.org/learn) if you enjoyed this challenge and wants to go further after the bootcamp!
