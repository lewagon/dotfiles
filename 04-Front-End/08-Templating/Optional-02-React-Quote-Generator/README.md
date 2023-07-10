## Background & Objectives

More React in this challenge!

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. It is a very popular library, used by Facebook, Instagram, Netflix, Airbnb, and many other companies. React apps are made out of components: a piece of UI that has its own logic and appearance.

In this challenge, you will build a Quote Generator app using the quotes of this [API](https://type.fit/api/quotes). You will learn how to:

- Import and use React in our project
- Create a React component
- Render components in our app

## Setup

We need React so we need to import the React framework and [React DOM](https://reactjs.org/docs/react-dom.html). Lastly, React components are often written in JSX, but since we don't have a compiler in our project, we will do it the Rails way and import [htm](https://github.com/developit/htm), which enables us to write JSX-like syntax in plain JavaScript.

In the head of our project, we already have these packages:

```html
    <script type="application/javascript" src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
```

## Our first component

Our `lib/index.jsx` file is already set up to render an `App` component:

```js
const App = () => {
  const message = "If you see this message in your browser, that means React is successfully mounted! 🙌";

  return (
    <div id="quoteGeneratorContainer">
      {message}
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Now let's launch our server, you should see a message that React is successfully mounted! 🥳

## Quote Generator

Now that our app is running and our first small component created, let's build our app!

### Quote component

Let's create a `Quote` component in the `lib/index.jsx` file (you should put it above the `App` component). This component will be a quote card, with the quote and the author. We will use a `div` element to create the card, and we will use a `p` element for the quote and a `span` element for the author.

```js
const Quote = () => {
  return (
    <div>
      <p>
        <span>“</span>
        Genius is one percent inspiration and ninety-nine percent perspiration.
        <span>“</span>
      <p/>
      <span>- Thomas Edison</span>
    </div>`
  );
}
```

### App component

Now let's edit the `App` component to render the `Quote` component.

```js
const App = () => {
  return (
    <div id="quoteGeneratorContainer">
      <Quote />
    </div>
  );
}
```

Reload the page, you should see our quote appear! 🥳

Let's improve the `App` component to render the quotes and also have a button to get a new quote. We will use a `div` element for the container, and a `button` element for the button.

```js
const App = () => {
  return (
    <div id="quoteGeneratorContainer">
      <div className="container">
        <Quote />
        <button className="btn btn-primary mt-3">More inspiration</button>
      </div>
    </div>
  );
}
```

Let's add some style (in `style.css`) to our container and root element so our quotes will show nicely:

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
- [`React.useState`](https://beta.reactjs.org/reference/react/useState) enables us to add a state variable to your component. Here we can store the array of quote, with an empty array `[]` as default.
- [`React.useEffect`](https://beta.reactjs.org/reference/react/useEffect) lets us step outside React, to use an external system, here an API, in our component.

```js
// [...]
const App = () => {
  const [quotes, setQuotes] = React.useState([]);
  console.log("Quotes: ", quotes);

  React.useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => (setQuotes(data));
  }, []);

  return (
    <div id="quoteGeneratorContainer">
      <div className="container">
        <Quote />
        <button className="btn btn-primary mt-3">More inspiration</button>
      </div>
    </div>
  );
}
```

Check the console, you should see the quotes loaded in the `Quotes`! They are now saved in the `state` of our `Container` component.

Let's create a function to get a random quote within the array. We have already seen how to get a random number in JavaScript during the HTTP & API lecture. We will use the `Math.random` function to get a random number between 0 and 1, and we will multiply it by the length of the array to get a random index.

```js
// [...]

const App = () => {
  // [...]
  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // [...]
}
```

We also need to add an extra `state` to our app to be able to set a quote and know which one we are currently showing.

We can add it with:

```js
  const [quotes, setQuotes] = React.useState([]);
  const [currentQuote, setCurrentQuote] = React.useState(null); // Add this line
```

We now have a state `currentQuote`, `null` by default because the quotes won't be loaded yet.

Let's create another function `getNewQuote()` that will get a random quote and set it as the current quote.

```js
  const getNewQuote = (quotes) => {
    const newQuote = getRandomQuote(quotes);
    setCurrentQuote(newQuote);
  };
```

Let's use it from the `React.useEffect`, once we will have all the quotes available, to have a random quote when we load the page:

```js
console.log("currentQuote: ", currentQuote);
React.useEffect(() => {
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
const Quote = ({ quote }) => {
  return (
    <div className="quote">
      <p className="quote-text">
        <span>“</span>
        {quote.text}
        <span>“</span>
      </p>
      <span className="quote-author">- {quote.author}</span>
    </div>
  );
}
```

and pass the quote to the component as a `prop`. In ReactJS, the `props` are a type of object where the value of attributes of a tag is stored. In our case, we will pass the `currentQuote` as a `prop` to the `Quote` component.

```js
// components/App.js
// [...]

const App = () => {
  // [...]
  return (
    <div className="container">
      <Quote quote={currentQuote} />
      <button className="btn btn-primary mt-3">More inspiration</button>
    </div>
  );
}
```

Reload the page. We are still getting an error though, because the `currentQuote` is `null` at the beginning, and we are trying to access the `text` and `author` properties of `null`.

We can fix it by adding a condition to the `Quote` component, to display a loading message if the quote is `null`:

```js
const Quote = ({ quote }) => {
  if (quote === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="quote">
      <p className="quote-text">
        <span>“</span>
        {quote.text}
        <span>“</span>
      </p>
      <span className="quote-author">- {quote.author}</span>
    </div>
  );
}
```

Now reload the page, and you should see a random quote!

### Adding a button to get a new random quote

We already added a button in our App component, so let's add a function when we click on it to get a new quote.

To do so, we can bind our existing `getNewQuote` function to the `onClick` event of the button:

```js
const App = () => {
  // [...]
  return (
    <div className="container">
      <Quote quote={currentQuote} />
      <button className="btn btn-primary mt-3" onClick={() => getNewQuote(quotes)}>More inspiration</button>
    </div>
  );
}
```

Now click on the button to see a random new quote everytime! 🚀

## Add some style

Feel free to play with the style of the app to make it look even nicer or add a title! 💅

## Going further

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Official Learn React track](https://beta.reactjs.org/learn) if you enjoyed this challenge and wants to go further after the bootcamp!
