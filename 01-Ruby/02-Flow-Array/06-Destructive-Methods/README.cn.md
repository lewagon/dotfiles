<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

破坏性方法会修改它们的**接收器**（它们被调用的对象）。
在某种意义上说，它们是危险的。因此一个好的**惯例**是以一个感叹号`!`结尾的方式来命名它们。

## 详细说明

- 完成`#horse_racing_format!`，该方法修改了它用来作为参数的数组，以使其对于比赛的主持人更友好。
- **约束条件**：该方法应该反转数组，预置马的位置，并在马的名字字符串最后加上感叹号。

例如，`["Abricot du Laudot", "Black Caviar", "Brigadier Gerard"]`在格式编排后应该变为`["3-Brigadier Gerard!", "2-Black Caviar!", "1-Abricot du Laudot!"]`。
这是主持人能理解的唯一格式！

## 进一步建议 & 资源

- 不用说，你应该在你的方法（method）中使用破坏性迭代器（iterator）😊

## 关键学习要点

正如你可能已经意识到的，方法（method）不仅用于返回计算的结果...方法也可以被用于对需要修改的对象执行操作。在继续之前，请确保你习惯了下列概念：

- 说明是对象id？在IRB中键入`"something".object_id`把它弄明白。
- 什么是对象相等性？ 当你在条件语句中使用`a==b`时，你是在测试对象相等性吗？你到底测试了说明？


