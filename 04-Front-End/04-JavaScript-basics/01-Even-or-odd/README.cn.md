## 背景和目标

今天是你学习JavaScript的第一天。今天的目标是你可以认识到JavaScript和Ruby一样，是一种编程语言。它也有变量，函数，条件，循环，等等。今天我们不会用到浏览器。取而代之的是用[Node.js](https://nodejs.org/en/)在终端直接执行JavaScript代码。

首先，请确认一下命令返回的版本比`10`更高：

```bash
node -v
```

如果不是的话，你的系统里可能没有安装Node. 请回到第一天Setup的课堂文档里找一下Node安装。

## 详细说明

让我们从一个简单的算法开始。打开文件`lib/even_or_odd.js` 。执行 `evenOrOdd`[偶数或奇数]函数。 它使用了一个参数 `number` (属于`number`类型)并且返回一个`string`[字符串]:

- 如果数字是偶数的话(0, 2, 4, 等等)，返回`"even"`。
- 如果数字是奇数的话(1, 3, 5, 等等)，返回`"odd"`。

**⚠️ 警告**: 在JavaScript中, 你需要 **明确地** 写出`return`[返回], 不然的话函数会返回`undefined`[未定义](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! 唯一的特例是当你使用带有[自身返回]特点的单行箭头函数的时候。(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _提示: 还记得Ruby的模块操作符吗？JavaScript里也有这个，它可能会很有帮助！_

运行`rake`来检查你的代码样式还有你的函数是否正确!

当第一个练习全部是绿色的时候（代码和样式都对）， **请提交到Github[commit and push]** 🙏

## 关于测试的设置

在代码编辑器中打开`Rakefile`。你会看到两个任务:

- `eslint`, 一个JavaScript代码检查器[JavaScript linter](http://eslint.org/), 在Ruby中和Rubocop一样。
- `mocha`, 一个JavaScript检测框架[JavaScript testing framework](https://mochajs.org), 在Ruby中和Rspec一样。

这两个命令是从 `node_modules` 文件里运行的.它是在运行`04-FrontEnd`文件里(`cd ../..`)的`yarn install`时读取`package.json`文件(打开它!)被创建的。
