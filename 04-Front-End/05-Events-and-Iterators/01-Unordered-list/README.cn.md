## 背景和目标

在这个练习中，我们希望你从原始数据中生成**无序列表**的HTML。

### 设置

让我们通过运行以下命令来启动本地web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。

在这个挑战中，我们有2个方式来测试我们的代码：
- 在浏览器中
- 在终端中

它们都测试相同的东西，但是在2个单独的界面中。

首先在浏览器中使用测试。完成后，使用`rake`在终端中测试。

## 详细参数

### 列表项生成器

首先实现`listItem`函数，它接受一个`content`参数（类型为`String`），并返回带有其内容的`<li>`元素：

```js
listItem('milk');
// => '<li class="list-group-item">milk</li>'

listItem('bread');
// => '<li class="list-group-item">bread</li>

listItem('butter');
// => '<li class="list-group-item">butter</li>
```

确保使用[ES6模板文字](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)而不是字符串串接（这不是现代写JavaScript的方法）。

💡 请注意，`content` 是`listItem` 函数的参数。你不需要担心内容是什么；现在你只需接知道它将作为参数传递进来就可以了。

_在这一部分，你无需担心调用函数，只需定义它。调用函数的步骤将稍后进行。_

### 无序列表生成器

当`listItem`函数通过所有测试后，继续编写`unorderedList`函数，它接受一个`items`参数（`Array`）并返回整个`<ul>`的HTML元素：

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

如果生成的字符串的缩进格式不是完美的，也没关系。不过**仅此一次哦！**

💡 注意，`items`是`unorderedList`函数的参数。类似于之前的部分，你不必担心提供实际的列表。当函数被调用时，你的函数可以处理任何数组。

_在这一部分，你无需担心调用函数，只需定义它。调用函数的步骤将稍后进行。_

### 显示列表

🚀 现在是调用我们的函数的时候了。

现在，调用你的`unorderedList`函数来生成杂货清单的HTML，并在`index.html`页面的`#list`元素中显示它。

杂货清单应该如下所示：

```js
const groceries = ['milk', 'butter', 'bread'];
```

### 使用`Map()`重构

如果你的解决方案通过使用`forEach()`的测试，最后一步是使用[`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)找到更好的解决方案！

这里有一个例子：

```js
const beatles = ["paul", "john", "ringo", "george"];
const upcasedBeatles = beatles.map(beatle => beatle.toUpperCase());
// => ["PAUL", "JOHN", "RINGO", "GEORGE"]
```
