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
```

确保使用[ES6模板文字](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)而不是字符串串接（这不是现代写JavaScript的方法）。

### 无序列表生成器

当`listItem`函数通过所有测试后，继续编写`unorderedList`函数，它接受一个`items`参数（`Array`）并返回整个`<ul>`的HTML元素：

```js
> console.log(unorderedList(['milk', 'butter', 'bread']));
// <ul class="list-group">
//   <li class="list-group-item">milk</li>
//   <li class="list-group-item">butter</li>
//   <li class="list-group-item">bread</li>
// </ul>
```

如果生成的字符串的缩进格式不是完美的，也没关系。不过**仅此一次哦！**

### 显示列表

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
