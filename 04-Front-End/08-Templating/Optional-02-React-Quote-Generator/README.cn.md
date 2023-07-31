## Background & Objectives
## 背景和目标

More React in this challenge!
这个挑战里还有更多的React!

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. It is a very popular library, used by Facebook, Instagram, Netflix, Airbnb, and many other companies. React apps are made out of components: a piece of UI that has its own logic and appearance.
[React](https://reactjs.org/) 是一个用于构建用户界面的JavaScript库。它是一个非常流行的库，被Facebook、Instagram、Netflix、Airbnb和许多其他公司使用。React应用程序由组件组成：一个具有自己的逻辑和外观的UI片段。

In this challenge, you will build a Quote Generator app using the quotes of this [API](https://type.fit/api/quotes). You will learn how to:
在这个挑战中，你会建立一个使用这个[API](https://type.fit/api/quotes)的名言生成器应用程序。你将学习如何：

- Import and use React in our project
- 在我们的项目中导入和使用React
- Create a React component
- 创建一个React组件
- Render components in our app
- 在我们的应用程序中渲染组件

## Setup
## 设置

We need React so we need to import the React framework and [React DOM](https://reactjs.org/docs/react-dom.html). Lastly, React components are often written in JSX, but since we don't have a compiler in our project, we will do it the Rails way and import [htm](https://github.com/developit/htm), which enables us to write JSX-like syntax in plain JavaScript.
我们需要React，所以我们需要导入React框架和[React DOM](https://reactjs.org/docs/react-dom.html)。最后，React组件通常是用JSX编写的，但是由于我们的项目中没有编译器，所以我们将按照Rails的方式来做，导入[htm](https://github.com/developit/htm)，它使我们能够在纯JavaScript中编写类似JSX的语法。

In the head of our project, we already have these packages:
在我们项目的`<head>`中，我们已经有了这些库：

```html
<script type="application/javascript" src="https://unpkg.com/react/umd/react.production.min.js"></script>
<script type="application/javascript" src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script type="application/javascript" src="https://unpkg.com/babel-standalone"></script>
```

## Our first component
## 我们的第一个组件

Our `lib/index.jsx` file is already set up to render an `App` component:
我们的`lib/index.jsx`文件已经设置好了，可以渲染一个`App`组件：

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
现在让我们启动我们的服务器，你应该会看到一个消息，React已经成功挂载了！🥳

## Quote Generator
## 名言生成器

Now that our app is running and our first small component created, let's build our app!
现在我们的应用程序正在运行，我们已经创建了第一个小组件，让我们来构建我们的应用程序！

### Quote component
### 名言组件

Let's create a `Quote` component in the `lib/index.jsx` file (you should put it above the `App` component). This component will be a quote card, with the quote and the author. We will use a `div` element to create the card, and we will use a `p` element for the quote and a `span` element for the author.
让我们在`lib/index.jsx`文件中创建一个`Quote`组件（你应该将它放在`App`组件的上面）。这个组件将是一个名言卡，包含名言和作者。我们将使用一个`div`元素来创建卡片，我们将使用一个`p`元素来名言，一个`span`元素来表示作者。

```js
const Quote = () => {
  return (
    <div>
      <p>
        <span>“</span>
        Genius is one percent inspiration and ninety-nine percent perspiration.
        <span>“</span>
      </p>
      <span>- Thomas Edison</span>
    </div>
  );
}
```

### App component
### 应用组件

Now let's edit the `App` component to render the `Quote` component.
现在让我们编辑`App`组件来渲染`Quote`组件。

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
重新加载页面，你应该会看到我们的名言出现了！🥳

Let's improve the `App` component to render the quotes and also have a button to get a new quote. We will use a `div` element for the container, and a `button` element for the button.
让我们改进`App`组件来渲染名言，并且有一个按钮来获取一个新的名言。我们将使用一个`div`元素作为容器，一个`button`元素作为按钮。

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
让我们为我们的容器和根元素添加一些样式（在`style.css`中），这样我们的名言就会很好地显示：

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
刷新页面！我们的APP看起来应该好看多了！

### Fetching the quotes
### 获取名言

One quote is good, but it'll be better if we can get a selection of quotes, from the API! We will use the `fetch` function to do it. We will create a `useEffect` hook to fetch the quotes when the component is mounted. We will store the quotes in a `quotes` state, and we will use the `useState` hook to do it.
一句名言很好，但如果我们可以有一个从API来的名言选集就更好了！我们可以使用`fetch`函数来实现。我们将创建一个`useEffect`来在组件挂载时获取名言。我们将把名言存储在一个`quotes`状态中，我们将使用`useState`钩子来实现。

**Resources:**
**资源：**
- [`React.useState`](https://beta.reactjs.org/reference/react/useState) enables us to add a state variable to your component. Here we can store the array of quote, with an empty array `[]` as default.
- [`React.useState`](https://beta.reactjs.org/reference/react/useState)使我们可以向组件添加一个状态变量。在这里，我们可以存储名言数组，使用一个空数组`[]`作为默认值。
- [`React.useEffect`](https://beta.reactjs.org/reference/react/useEffect) lets us step outside React, to use an external system, here an API, in our component.
- [`React.useEffect`](https://beta.reactjs.org/reference/react/useEffect)让我们可以走出React，使用外部系统，在这里是一个API，在我们的组件中使用。

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
检查控制台，你应该会看到名言加载在`Quotes`中！它们现在保存在我们的`Container`组件的`state`中。

Let's create a function to get a random quote within the array. We have already seen how to get a random number in JavaScript during the HTTP & API lecture. We will use the `Math.random` function to get a random number between 0 and 1, and we will multiply it by the length of the array to get a random index.
让我们创建一个函数来获取数组中的一个随机名言。我们已经在HTTP和API讲座中看到了如何在JavaScript中获取一个随机数。我们将使用`Math.random`函数来获取0到1之间的随机数，然后将它乘以数组的长度来获取一个随机索引。

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
我们也需要为我们的应用程序添加一个额外的`state`，以便能够设置一个名言，并知道我们当前正在显示的是哪一个名言。

We can add it with:
我们可以用以下方式添加它：

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
让我们在`React.useEffect`中使用它，一旦我们有了所有的名言，就可以在我们加载页面时随机获取一句名言：

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
现在我们在加载页面时有了一个随机名言！🎉但它还没有出现在我们的页面上，我们只能在控制台中看到它。

Instead of our hard-coded quote in the `Quote` component, let's use the quote stored in the `currentQuote` state.
让我们使用存储在`currentQuote`里的名言，而不是在`Quote`组件中的暂时写的那个。

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

Pass the quote to the component as a `prop`. In ReactJS, the `props` are a type of object where the value of attributes of a tag is stored. In our case, we will pass the `currentQuote` as a `prop` to the `Quote` component.
并将名言作为`prop`传递给组件。在ReactJS中，`props`是一种对象类型，在这种对象中，标签的属性值被存储。在我们的例子中，我们将`currentQuote`作为`prop`传递给`Quote`组件。

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
重新加载页面。我们仍然会得到一个错误，因为`currentQuote`在开始时是`null`，而我们正在尝试访问`null`的`text`和`author`属性。

We can fix it by adding a condition to the `Quote` component, to display a loading message if the quote is `null`:
我们可以通过在`Quote`组件中添加一个条件来修复它，如果名言是`null`，则显示一个加载消息：

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
现在重新加载页面，你应该会看到一个随机名言！

### Adding a button to get a new random quote
### 添加一个按钮来获取一个新的随机名言

We already added a button in our App component, so let's add a function when we click on it to get a new quote.
我们已经在我们的App组件中添加了一个按钮，所以让我们添加一个函数，当我们点击它时，可以获取一个新的名言。

To do so, we can bind our existing `getNewQuote` function to the `onClick` event of the button:
为此，我们可以将现有的`getNewQuote`函数绑定到按钮的`onClick`事件上：


```js
const App = () => {
  // [...]
  return (
    <div className="container">
      <Quote quote={currentQuote} />
      <button className="btn btn-primary mt-3" onClick={getNewQuote(quotes)}>More inspiration</button>
    </div>
  );
}
```

Now click on the button to see a random new quote everytime! 🚀
现在点击按钮，每次都会看到一个随机的新名言！🚀

## Add some style
## 添加一些样式

Feel free to play with the style of the app to make it look even nicer or add a title! 💅
随意调整应用程序的样式，使它看起来更漂亮，或者添加一个标题！💅

## Going further
## 进一步

- [React文档](https://reactjs.org/docs/getting-started.html)
- [官方学习React课程](https://beta.reactjs.org/learn)，如果你喜欢这个挑战，并想在训练营之后进一步学习！
