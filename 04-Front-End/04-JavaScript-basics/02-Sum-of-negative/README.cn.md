## 背景和目标

在这个挑战里，你会需要编写**循环[loops]**, **条件[conditions]**代码，还会使用**数字[numbers]**。

让我们先熟悉下JavaScript的语法。

## 详细说明

打开文件`lib/sum_of_negative.js`. 实现`sumOfNegative`函数，它使用一个`numbers`参数（属于数组[array]类型)，然后返回一个`Number`: 数组中的负数之和。比如：

- `sumOfNegative([-1, 4, -2, 9, 18])` 应该返回`-3`
- `sumOfNegative([15, 16, 17, 1000])` 应该返回`0`

👨‍🏫 还记得我们学习Ruby的时候TA告诉你“不要一直rake而是自己检查”嘛？你应该在文件最下面使用自己的测试引数来调用方法，然后在终端上运行`ruby <file>`.在JavaScript里, 你也可以用这个方法! 你只需要在方法的定义下方调用它（在`module.exports`那一行的上方），就像这样：

```js
console.log(sumOfNegative([-4, 5, -2, 9]));
```

然后在终端运行以下代码:

```bash
node lib/sum_of_negative.js
```

如果你的代码正确的话，你应该可以看到`-6`。你可以在`sumOfNegative`函数里多加一些`console.log`语句来调试你的代码。
