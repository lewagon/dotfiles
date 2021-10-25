## 背景和目标

在这个挑战中，我们想要再现当选择一个问题的**多种**可能的答案时，出现的现代网页应用的UX。

![突出显示的Gif动图](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/highlights.gif)

再一次，这是关于**选择** 元素, 把它们和一个事件**绑定**在一起，然后**回应** 它!

## 详细说明

启动你的本地网页服务器：

```bash
rake webpack
```

在浏览器中打开 [`localhost:8080`](http://localhost:8080)。

你应该可以看到一个有6个看起来可以点开的运动盒子的网格。当你在它们中的一个上悬停时，你可以看到UI在变化来建议你点击它。但是，当你点击的时候，什么也不会发生...暂时不会发生！我们来修改一下！

- 当你点击一项运动时，你应该在元素上切换 `active` 的css类 (这个挑战不需要你写任何CSS)
- 我们应该可以选择几项运动 (就好像它们是复选框）

在写代码前，我们用伪码把问题拆解成小的步骤！

这个练习没有测试，不过我们还是要检查你的代码样式！所以请运行 `rake`。

## 重构 (可选择完成)

当应当突出显示的部分实现了后，我们来让代码的可读性更强一些。

当你合并 `forEach` 和 `addEventListener` 时, 结果会有一些代码有 **3层** 的缩进，这让代码很难读。

好消息是，在JavaScript里，你可以用变量存储**函数** ! 用这种方式你可以直接引用变量而无需用**省略括号**的方式调用函数, 非常适合**回调**!

比如，你可以重构一下代码：

```js
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.currentTarget);
  });
});
```

把它变成:

```js
const displayClickedElement = (event) => {
  console.log(event.currentTarget);
};

const bindButtonToClick = (button) => {
  button.addEventListener('click', displayClickedElement);
}

buttons.forEach(bindButtonToClick);
```

到你来提取了:

- 在`bindSportToClick`箭头函数中的绑定逻辑，
- 在`toggleActiveClass`箭头函数中的点击事件回调。

最后，你的代码应该是易读的而且最多只有一层缩进！
