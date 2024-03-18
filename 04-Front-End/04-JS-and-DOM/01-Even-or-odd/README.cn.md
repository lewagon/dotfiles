## 背景与目标

今天是你学习JavaScript的第一天。第一天的目标是让你们认识到这是一门编程语言，就像Ruby一样。它有变量、函数、条件、循环等。此外，你还可以用 JavaScript从DOM中选择和操作元素。

在这项练习中，我们将通过两个部分来测试我们的代码：
- 在浏览器中
- 在终端

## 在浏览器中编码

JavaScript是一种前端语言。这意味着它是在浏览器中执行的。我们将使用 `console.log` 函数在终端中打印一些值。

要在浏览器中测试代码，请使用 `serve` 命令启动程序，并转到 [http://localhost:8000](http://localhost:8000)。

```bash
serve
```

打开浏览器后，你会看到一个红色框的检查列表。你的目标是修正`evenOrOdd`函数，使所有检查都能通过。每当你对JS文件进行修改时，都需要**刷新浏览器**，以便看到你的代码改变反映出来。

请尝试在`evenOrOdd`函数中加入`console.log(number)`，打开浏览器的控制台（console）并查看。你应该会看到3个结果： `0`、`1`、`2`。这些结果来自 `spec`文件夹中`event_or_odd_examiner.js`文件中的`check`函数。

只要`evenOrOdd`函数没有完成，测试就会显示为红色。一旦执行了正确的函数，它们就会变成绿色。

## 详细参数

让我们从一个非常简单的算法开始。打开 `lib/even_or_odd.js` 文件。执行 `evenOrOdd` 函数，该函数接收一个参数`number`（类型为 `number`）并返回一个字符串`string`：

- 如果数字是偶数（0、2、4 等），则返回`"even"`
- 如果数字是奇数（1、3、5 等），则返回`"odd"`

**⚠️ 警告**： 在 JavaScript 中，需要**明确地**写入`return`关键字，否则[函数将返回`未定义`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)！唯一例外是当你使用一个带有[隐式返回]的单行箭头函数时(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body)。

_提示：还记得 Ruby 的模除（modulo）运算符吗？在JavaScript中它也存在，也许会帮上忙呢！_

## 使用终端测试

测试代码的第二个过程是在终端进行。我们将使用老朋友 `rake` 命令来运行测试。

为此，我们将使用 [Node.js](https://nodejs.org/en/) 在终端中直接执行一些 JavaScript。

你应该已经安装了版本大于 `10`的 `node`。用下面的命令检查一下吧：

```bash
node -v
# 你应该会看到node版本
```

如果没有，请返回之前的设置的专用文档：[macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs)、[Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) 或 [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs)。

如果运行 `rake` 输出错误，则需要运行：

```bash
nvm list
```

然后选择已安装的版本，例如：

```bash
nvm use 16.15.1
```

现在，确保终端中的所有测试也是绿色的。然后，**commit和push到GitHub** 🙏 。

## VSCode 提示

在安装当天，你在文本编辑器中安装了 `eslint` 扩展包，它可以检查 JavaScript 代码的样式，因此当缺少分号时，它会告诉你。如果在 VSCode 中看不到该扩展，请运行：

```bash
code --install-extension dbaeumer.vscode-eslint
```
