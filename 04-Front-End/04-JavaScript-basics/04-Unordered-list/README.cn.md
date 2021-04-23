## 背景和目标

在这个挑战中，我们希望你可以使用未经处理的数据来生成一个**未排序列表**的HTML。

## 详细说明

### 列表项生成器

首先实现`listItem`函数- 使用`content`参数（属于字符串`String`类型)，然后返回有内容的`<li>`标签:

```js
listItem('milk');
// => '<li class="list-group-item">milk</li>'
```

请确认你用的是[ES6 模板字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)，而不是串联起来的（不是当下流行的方法）。

### 未排序列表生成器

当`listItem`函数通过了所有的测试，继续写`unorderedList`函数- 使用`items`参数(数组类型`Array`)并返回全部`<ul>`的HTML:

```js
> console.log(unorderedList(['milk', 'butter', 'bread']));
// <ul class="list-group">
//   <li class="list-group-item">milk</li>
//   <li class="list-group-item">butter</li>
//   <li class="list-group-item">bread</li>
// </ul>
```

**就这一次**, 我们不会介意生成的字符串的缩排是否完美！


###  更进一步

如果你的代码用了`forEach()`通过了测试,你可以尝试用[`map()`]写出更好的答案(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)!

比方说:

```js
const beatles = ["paul", "john", "ringo", "george"];
const upcasedBeatles = beatles.map(beatle => beatle.toUpperCase());
// => ["PAUL", "JOHN", "RINGO", "GEORGE"]
```
