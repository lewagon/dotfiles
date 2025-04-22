## 背景和目标

欢迎来到你的第一个React练习！

[React](https://reactjs.org/) 是一个用于构建用户界面的JavaScript库。它是一个非常流行的库，被Facebook、Instagram、Netflix、Airbnb和许多其他公司使用。React应用程序由组件组成：一个具有自己的逻辑和外观的UI片段。

通过构建一个待办事项列表APP，你将学习React的基础知识，你可以做到以下几点：

- 查看所有的待办事项
- 添加一个待办事项（选做）
- 删除一个待办事项（选做）

（是的，这和Vue练习中的功能是一样的💪）

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### 设置

#### React

React使用一种特殊的语法叫做[JSX](https://react.dev/learn/writing-markup-with-jsx)，它是一种模板语言，让我们可以在HTML中轻松地编写JavaScript表达式。它的语法与标准JavaScript有一点不同（我们很快就会看到这一点！）。好处是这种语法相当简单。粗糙的部分是，_浏览器实际上不能默认读取JSX文件_。所以我们必须在实际在浏览器中运行它们之前将它们转换为普通的JS文件。

所以，通常开发人员使用一个叫做**bundler**的东西，比如[Webpack](https://webpack.js.org/)来处理和打包所有的文件，并将它们转换成浏览器可以读取的“正常”JavaScript。这需要安装很多额外的东西，所以为了这个挑战，我们将避免这种复杂性。

相反，我们将加载一些外部脚本，这些脚本将安装React并为我们处理我们的文件：

```html
<script type="application/javascript" src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"></script>
<script type="application/javascript" src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"></script>
<script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
```

前两个库是React本身。第三个是Babel，它可以为我们处理JSX文件。你可能会注意到我们的`index.html`底部有这一行：

```html
<script src="lib/to-do-list.jsx" type="text/babel"></script>
```

`type="text/babel"`告诉Babel处理我们的JavaScript。所以，我们应该可以很好地写JSX💪你可能会注意到，我们在这个挑战中以与其他所有挑战不同的方式导入我们的脚本，因为这个设置目前与导入映射不兼容。但是不要担心——它不会影响你最终要写的代码。

_[注意：这意味着Babel将我们的JSX转换为JS**inside**用户的浏览器。这是低效的，因为理想情况下我们会提前转换所有的东西。换句话说，这种“轻量级”的设置对于这个挑战来说是完美的，但是一个真正的生产应用程序需要一些更多的设置。](https://babeljs.io/docs/babel-standalone#when-not-to-use-babelstandalone)_

让我们通过运行以下命令来启动本地Web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。如果你看到一个关于React的消息，那么你的项目就已经设置好了！

## 待办事项APP

### React热身

看一下`lib/to-do-list.jsx`文件。

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

一个React实例已经通过`ReactDOM.render`函数创建。你将在`App()`中编写你的组件。

`ReactDOM.render`实际上将React代码的结果放入DOM中。你不需要改变那一行，因为它将React代码连接到`<div id="root">`元素，这个元素已经包含在`index.html`文件中了。

我们的`App()`函数是大部分代码的所在地。它是一个[组件](https://react.dev/learn/your-first-component)，在React中，它是一个返回HTML的函数。注意模板代码，它将字符串变量`message`放在一个`<div>`中，如下所示：

```html
<div id="app">
  {message}
</div>
```

这是JSX语法。本质上，你只要想在HTML中写一个JavaScript表达式，就可以把`{}`放进去。例如，这也可以工作：

```html
<div id="app">
  The sum is {2 + 4}
</div>
```

### 1. 查看所有的待办事项

#### 数据

<details>
<summary markdown='span'>在React应用程序中，我们把待办事项数据放在哪里？</summary>

你有一个和之前几个练习相同的待办事项数组。

```js
[
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
]
```

这是一组可能随着时间而变化的数据。例如，我们可能想在将来从待办事项数组中添加或删除一个项目。我们如何在React中处理变化的数据？

我们使用[`React.useState`](https://react.dev/reference/react/useState)函数。这是一个React函数，或者，正如React的人们喜欢称呼它的那样，一个[hook](https://react.dev/reference/react)，它让我们定义变量，这些变量的值可能会随着时间的推移而改变。

让我们把我们的`App()`函数改成这样：

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

这段代码意味着我们现在将有两个变量：`todos`，它只是待办事项数组，和`changeTodos`，它是一个函数，当我们的数组应该改变时我们可以调用它（例如，如果我们想添加或删除一个元素）。由于我们现在只关心读取待办事项，而不是创建、编辑或删除它们，所以我们暂时不会使用`changeTodos`😌
</details>

#### 渲染列表

<details>
<summary markdown='span'>我们如何动态地渲染列表？</summary>

在React中，你可以在HTML中使用`{}`。在普通的Javascript中，如果我们想打印出列表中的每个元素，我们需要使用**迭代**。事实证明，在React中，你可以像在普通JS中一样使用迭代！最常用的运算符是`map`函数。之所以这样做，是因为`map`返回一个数组（在这种情况下是JSX元素的数组），而JSX支持将一个元素数组添加到DOM中。

这是一个它的工作原理的示例：

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

这将显示所有3种水果的列表🍎

你可能想知道`key`是什么意思。React更喜欢你为每个迭代的元素提供一个唯一的键。这有助于它跟踪元素是否被添加/删除，或者顺序是否改变。这与我们在数据库中为每条记录分配一个唯一的ID类似。我们今天不会太担心这个💆如果你有兴趣，可以阅读更多关于[为什么React需要keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys)的内容。在这个例子中，我们将使用数组中元素的索引。

你能用这个示例代码作为指南，试着想出如何在DOM中显示`todos`中的每个项目吗？

#### 属性绑定

<details>
<summary markdown='span'>我们如何将`done`与复选框绑定？</summary>

React使得在JSX语法中设置HTML属性变得很容易：

```js
function App() {
  const shouldBeChecked = true

  return (
    <input type="checkbox" checked={shouldBeChecked} />
  );
}

export default App;
```

我们所要做的就是使用`{}`来写一些JavaScript作为我们复选框上`checked`的值。

你能用这个原则来使你的复选框动态地匹配每个复选框上的`done`的值吗？
</details>

### 2. 添加一个待办事项（选做）

<details>
<summary markdown='span'>当用户添加一个待办事项时会发生什么？</summary>

1. 用户填写待办事项内容。
2. 用户点击按钮。
3. 待办事项被添加并出现在列表中。

当按钮被点击时，React应用程序需要负责获取数据并将其添加到列表中。我们将创建一个名为`addTodo()`的JavaScript函数来处理所有这些。

为了做到这一点，我们将使用`useState`创建一个新的变量`title`，当用户在输入框中输入时，它将更新（使用`onChange`事件）。

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

_提示：你可以潜在地使用JavaScript的[**spread operator**](https://www.educative.io/answers/what-is-the-spread-operator-in-javascript)来帮助你完成这部分。如果你想用一个现有的数组生成一个新的数组，并在其中添加一个额外的元素，那么spread operator就很有用。下面是一个语法示例：_

```js
const fruits = ['apple', 'banana', 'orange'];
const fruitsAndVegetables = [...fruits, 'cucumber', 'pepper'];
// the value of fruitsAndVegetables will be ['apple', 'banana', 'orange', 'cucumber', 'pepper']
```
</details>

#### 事件绑定

当点击添加按钮时，`addTodo()`需要被触发。

<details>
<summary markdown='span'>我们如何将点击事件绑定到按钮上？</summary>

我们可以在我们的`<button>`上使用`onClick`属性。

```html
<button type="button" onClick={addTodo}>Add Todo</button>
```

在你的浏览器控制台中看一看，你能看到你在方法中添加的`console.log`吗？如果是这样，那么你的事件绑定是成功的！
</details>

##### addTodo()的伪代码

1. 根据用户输入构造一个待办事项对象。
2. 将它添加到`todos`列表中。

在React中，如果你只是改变`todos`的值，比如`todos = SOMETHING_DIFFERENT`，它是不会有任何效果的。你必须使用`changeTodos`函数。

例如，下面的代码将把我们的`todos`设置为一个空数组`[]`：

```js
changeTodos([]);
```

根据这个例子，你可以试试把它设置成一个包含**所有现有的待办事项**和**我们想要添加的新的待办事项**的数组吗？
</details>

### 3. 删除一个待办事项（选做）

首先，你应该确保为待办事项元素添加一个删除按钮。你可以使用[Boostrap的关闭按钮](https://getbootstrap.com/docs/5.0/components/close-button/)，或者[fontawesome的垃圾桶图标](https://fontawesome.com/search?q=trash&o=r)。

其余的部分和添加待办事项非常相似。利用[React的文档](https://reactjs.org/docs/getting-started.html)来实现以下步骤：

1. 将一个事件绑定到删除按钮，触发一个方法。
2. 该方法从`todos`中删除待办事项。

<details>
<summary markdown='span'>问题和提示</summary>

❓ 这个方法如何知道要删除哪个待办事项？
❓ 每个待办事项的唯一标识符是什么？你可以用它来识别要删除的待办事项。

💡 你可以给一个方法传递一个参数。
💡 你可以在`map`中访问索引。
</details>

## 进一步

- [React文档](https://reactjs.org/docs/getting-started.html)
- [官方学习React课程](https://beta.reactjs.org/learn)，如果你喜欢这个挑战，并想在训练营之后进一步学习！
