## 背景和目标

在这个练习中，我们想要复刻现代web应用程序表单中越来越常见的，当表单涉及到选择**多个**可能的答案时的用户体验：

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/highlights.gif)

同样，这个练习也是关于**选择**元素，**绑定**它们到一个事件上，然后**响应**它！

## 详细参数

像往常一样，在`localhost:8000`上在浏览器中打开html页面：

```bash
serve
```

在浏览器中打开[`localhost:8000`](http://localhost:8000)。

你应该会看到一个网格，里面有6个运动的方框，看起来像是可以点击的。当你将鼠标悬停在其中一个上时，你会看到UI会改变，提示你点击。然而，当你点击时什么都不会发生...但是！让我们来修复它！

- 当你点击一个运动时，你应该在元素上切换`active`css类（在这个练习中不需要写任何css）
- 我们应该能够选择多个运动（就像它们是复选框一样）

在编写任何代码之前，使用伪代码将问题分解成小步骤！

这个练习没有任何测试，但我们会检查你的代码风格！所以你需要运行`rake`。

## 重构（选做）

一旦高亮显示按预期工作，我们就来让代码更容易阅读。

当你将`forEach`和`addEventListener`结合起来时，你最终会得到一些代码，它有**3个层级**的缩进，这使得它很难阅读。

好消息是，在JavaScript中，你可以将**函数**存储在变量中！这样你就可以在不调用函数的情况下引用变量，**省略括号**，这对于**回调**来说是完美的！

例如，你可以把这段代码：

```js
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.currentTarget);
  });
});
```

重构成:

```js
const displayClickedElement = (event) => {
  console.log(event.currentTarget);
};

const bindButtonToClick = (button) => {
  button.addEventListener('click', displayClickedElement);
}

buttons.forEach(bindButtonToClick);
```

该你来提取出以下的方法了：

- `bindSportToClick`箭头函数来负责绑定部分的逻辑
- `toggleActiveClass`箭头函数来负责回调部分的逻辑

最后，你的代码应该很容易阅读，而且不超过1个缩进级别！
