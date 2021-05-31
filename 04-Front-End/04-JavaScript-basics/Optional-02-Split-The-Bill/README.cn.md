## 背景和目标

我们会依然在终端使用Node.js，并且我们还有一个练习. 我们的目标是搞明白如何操控JavaScript对象[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

## 详细说明

你和一群朋友出去旅行。你们每一个人都给不一样的东西付钱（食物，车，酒店，等等），现在你们要算账了！谁欠大家钱，谁又花得太多？我们来找答案！

假设这群人被下面这个对象所表述：

```js
const group = {
  "john"  : 120,
  "paul"  :  30,
  "ringo" : 150,
}
```

意思是John花费了120€, Paul花费了30€，Ringo 花了150€.

实现`splitTheBill(group)` 方法 -- 返回小组应该给每个人多少钱。在我们例子中它应该返回:

```js
{
  "john"  :  20,
  "paul"  : -70,
  "ringo" :  50
}
```

## 更多建议和资源

迭代JavaScript对象，你可以用[`Object.keys()`]方法(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 。

示例:

```js
const character =  { name: 'Luke Skywalker', type: 'Jedi' };
Object.keys(character).forEach((key) => {
  const value = character[key];
  console.log(`The character ${key} is ${value}`);
});
```
