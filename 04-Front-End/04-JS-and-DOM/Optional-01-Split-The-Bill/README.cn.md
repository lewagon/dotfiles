## 背景和目标

第一部分的练习中，你需要让浏览器中的测试通过。目标是理解
如何操作JavaScript [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)。

之后，你需要改变HTML并编写一个新的JavaScript函数来在浏览器中显示结果。

在这个练习中，你可以运行你的测试：
- 在浏览器中（运行`serve`并按照流程操作）
- 在终端中使用`rake`命令

## 详细参数

你和一群朋友一起去旅行。你们每个人都为不同的东西付钱（食物、汽车、酒店等），现在是时候算个账了！谁欠团队的钱，谁花得太多了？让我们来看看吧！

假设这个团队用下面的对象来表示：

```js
const group = {
  "john"  : 120,
  "paul"  :  30,
  "ringo" : 150,
}
```

这意味着John花了120元，Paul花了30元，Ringo花了150元。

实现`splitTheBill(group)`方法，它应该返回团队应该给每个人多少钱。在我们的例子中，它应该返回：

```js
{
  "john"  :  20,
  "paul"  : -70,
  "ringo" :  50
}
```

## 提示

要遍历JavaScript对象，你可以使用[`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)方法。

这是一个例子：

```js
const character =  { name: 'Luke Skywalker', type: 'Jedi' };
Object.keys(character).forEach((key) => {
  const value = character[key];
  console.log(`The character ${key} is ${value}`);
});
```

## 显示结果

一旦你实现了`splitTheBill(group)`函数，所有的测试都应该是绿色的。

现在是时候更新HTML文件并添加一个列表，列出谁需要支付多少钱。首先在`index.html`文件中创建一个空值列表，然后在你的JS文件中完成`updatePriceList()`函数，以显示正确的值。
