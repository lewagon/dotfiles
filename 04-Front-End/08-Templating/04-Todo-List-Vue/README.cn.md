## 背景和目标

欢迎来到你的第一个Vue挑战！

[Vue](https://vuejs.org/guide/introduction.html)（发音为/vjuː/，类似于view）是用于构建用户界面的JavaScript框架。它建立在标准的HTML、CSS和JavaScript之上，并提供了一种声明性和基于组件的编程模型，帮助你高效地开发用户界面，无论是简单还是复杂。

你将通过构建一个待办事项列表APP学习Vue的基础知识。这个APP可以做到以下几点：

- 查看所有的待办事项
- 添加一个待办事项（可选）
- 删除一个待办事项（可选）

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### 设置

#### Vue

我们使用[Import Maps](https://vuejs.org/guide/quick-start.html#enabling-import-maps)导入Vue。确保你的HTML和JS中有以下代码。

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

让我们通过运行以下命令来启动本地Web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。如果你看到一个关于Vue的消息，那么你的项目就已经设置好了！

#### VSCode Vue高亮

让我们安装Vue语法高亮器，让我们的代码更容易读💅

```bash
code --install-extension Vue.volar
```

## 待办事项APP

### Vue热身

看一下`lib/to-do-list.js`文件。

```js
createApp({
  data() {
    return {
      message: "If you see this message in your browser, that means Vue is successfully mounted! 🙌"
    }
  }
}).mount('#todosContainer')
```

Vue实例已经被`createApp()`函数创建了。你将在`createApp()`中写你的组件。

`.mount("#todosContainer")`Vue实例上被调用。这意味着这个Vue实例将被挂载在具有css选择器`#todosContainer`的HTML元素上。

[`data`](https://vuejs.org/api/options-state.html#data)是一个组件选项。它返回一个普通的JavaScript对象。像`message`这样的属性可以通过`{{}}`在HTML中使用。

```html
<div id="app">
  {{message}}
</div>
```

### 1. 查看所有的待办事项

#### 数据

<details>
<summary markdown='span'>在一个Vue的实例里，我们应该把待办事项的数据放在哪里呢？</summary>

你有一个待办事项数组。

```js
[
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
]
```

我们可以把这个列表放在`data`选项中作为初始数据，并将它赋值给一个有意义的属性名称，比如`todos`或`items`。用有意义的方式命名事物是很重要的，这样你的代码对你未来的自己和其他人来说都是可读的。

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

#### 渲染列表

<details>
<summary markdown='span'>我们如何动态渲染列表呢？</summary>

我们可以使用内置指令[`v-for`](https://vuejs.org/api/built-in-directives.html#v-for)。它就像Ruby中的`.each`。阅读文档，并在`index.html`中编写你的代码，根据`todos`渲染你的待办事项列表。

ℹ️ 你已经在第一个挑战中编写了一个待办事项列表，所以可以随意重用你之前编写的一些HTML。
</details>

#### 属性绑定

<details>
<summary markdown='span'>我们如何将`done`与复选框绑定？</summary>

我们可以使用[`v-bind`](https://vuejs.org/api/built-in-directives.html#v-bind)来动态渲染HTML属性。在复选框的情况下，我们可以这样做：

```html
<input type="checkbox" v-bind:checked="theDoneBooleanGoesHere">
```
</details>

#### v-cloak 🧥

<details>
<summary markdown='span'>你有没有注意到，每次刷新页面，都会有一些未加载的HTML元素闪烁？</summary>

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/vue-un-compiled-flash.gif)

这是因为当我们刷新时，HTML还没有被编译。我们可以使用`v-cloak`来暂时隐藏未编译的HTML。阅读[文档](https://vuejs.org/api/built-in-directives.html#v-cloak)，并为你的APP实现这个小细节！记得在你改变CSS文件时**强制刷新**。

就是这样！恭喜你完成了你的第一个Vue APP！🥂继续尝试实现**创建**和**删除**操作吧！
</details>

### 2. 添加一个待办事项（选做）

<details>
<summary markdown='span'>当用户添加一个待办事项时会发生什么？</summary>

1. 用户填写待办事项内容。
2. 用户点击按钮。
3. 待办事项被添加并出现在列表中。

当按钮被点击时，Vue实例需要负责获取数据并将其添加到列表中。我们将创建一个名为`addTodo()`的[方法](https://vuejs.org/api/options-state.html#methods)来处理所有这些。

我们可以在`methods`选项中定义各种方法：

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

#### 事件绑定

当点击添加按钮时，`addTodo()`需要被触发。

<details>
<summary markdown='span'>我们如何将点击事件绑定到按钮上？</summary>

我们可以使用[`v-on`](https://vuejs.org/api/built-in-directives.html#v-on)来监听点击事件。

```html
<button v-on:click="addTodo">Add</button>
```

在浏览器控制台中检查，你能看到你在方法中`console.log`的东西吗？如果是这样，那么你的事件绑定就成功了！
</details>

#### Form Input Binding
#### 表单输入绑定

<details>
<summary markdown='span'>现在，我们如何将输入的数据传递给Vue实例呢？</summary>

我们可以使用[`v-model`](https://vuejs.org/guide/essentials/forms.html#form-input-bindings)。它和`v-bind`很相似。`v-bind`创建了一个**单向绑定**——从Vue实例到HTML。`v-model`是**双向的**。它经常用在表单中，因为我们需要将表单输入的状态与JavaScript中对应的状态同步。

要使用`v-model`，我们首先应该在`data()`选项中声明一个属性。

```js
data() {
  return {
    // ...
    newTodo: null
  }
},
```

然后我们将它绑定到HTML中的输入元素。

```html
<input v-model="newTodo" placeholder="Your to-do goes here" />
```

注意，`data()`中的每个属性都可以通过`this.propertyName`访问。现在你可以在Vue实例中通过`this.newTodo`访问用户的输入了。试一试吧！

##### addTodo()的伪代码

1. 根据用户输入构造一个待办事项对象。
2. 将它添加到`todos`列表中。

Vue有一个很酷的地方是它的[**响应式**](https://vuejs.org/guide/extras/reactivity-in-depth.html)。`data()`是响应式的，这意味着`data()`中的变化会触发DOM的更新。看看如何改变`this.todos`会自动更新DOM。

你可能还注意到，在添加一个待办事项之后，用户的输入仍然保留在输入框中。考虑到`v-model`的绑定是双向的，你会如何重置输入？
</details>

### 3. 删除一个待办事项（选做）

首先，你应该确保为待办事项元素添加一个删除按钮。你可以使用[Boostrap的关闭按钮](https://getbootstrap.com/docs/5.0/components/close-button/)，或者[fontawesome的垃圾桶图标](https://fontawesome.com/search?q=trash&o=r)。

其余的部分与添加待办事项非常相似。利用[Vue的文档](https://vuejs.org/guide/introduction.html)来实现以下步骤：

1. 将一个事件绑定到删除按钮上，触发一个方法。
2. 该方法从`todos`中删除待办事项。

<details>
<summary markdown='span'>问题和提示</summary>

❓ 这个方法如何知道要删除哪个待办事项呢？
❓ 每个待办事项的唯一标识符是什么？你可以用它来识别要删除的待办事项。

💡 你可以给方法传递一个参数。
💡 你可以在`v-for`中访问索引。
</details>

祝你好运！
