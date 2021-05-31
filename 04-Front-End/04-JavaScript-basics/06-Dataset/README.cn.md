## 背景和目标

在前端开发中, **数据属性** 让你可以轻松地在JS里访问HTML里插入的值。

在这个挑战中，我们一起写一个能够解析HTML标签并提取数据属性然后生成`对象[Object]`的函数。

## 详细说明

实现`dataset`函数，使用一个 `element`参数（字符串类型`String`)并返回有正确的键和值的对象`Object`:

```js
const burger = `<div class="card" data-id="42" data-price="15" data-category="popular">
  <div class="card-category">Popular</div>
  <div class="card-description">
    <h2>The best burger in town (15€)</h2>
  </div>
</div>`;

dataset(burger);
// => { id: 42, price: 15, category: 'popular' }
```

- 它应该只返回**wrapping**元素的数据集，不论它的子元素是什么。
- 它应该返回正确的数据类型（在例子中，`42` 和 `15`应该是数字类型`number`。

### 帮助

别忘了用Chrome DevTools来调试代码！

当你想要在字符串里把**所有匹配的东西**配对，你可能想了解下[`g` modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters).

### 提升

我们不在`specs` 里测试，但你可以实现从 `kebab-case` 到 `lowerCamelCase` 键数据属性的转化:

```js
const element = `<div class="card" data-meal-id="42">ANY CONTENT</div>`;

dataset(element);
// => { mealId: 42 }
```

### 更进一步

从明天开始，我们会写在**浏览器**上运行的JavaScript代码, 在[DOM]环境下(https://en.wikipedia.org/wiki/Document_Object_Model) (需要VPN 🛡). 在这个环境下, 你可以在任何DOM中的HTML元素上调用 `.dataset`, and 它会返回和这个挑战中一样类型的对象!

这是一个相对方便的方法来吧你的HTML代码传到JavaScript代码上，来更好地回应DOM事件或远程呼叫服务器。

你会在接下来的几天里更多地学习这些应用。同时你也可以更多地阅读关于[数据集属性 dataset property]的内容(https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
