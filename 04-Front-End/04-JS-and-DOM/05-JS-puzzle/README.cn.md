## 背景和目标

我们来建一个拼图游戏吧 🧩
一旦你把拼图里的所有数字都移动到正确的位置，你就会收到一个通知，告诉你你赢了游戏。

![js-puzzle](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/js_puzzle.gif)

## 设置

和往常一样，你可以通过运行以下命令来测试你的代码：

```bash
serve
```

然后在浏览器中打开 [`localhost:8000`](http://localhost:8000)。

## 详细参数

在这个挑战中，我们使用了一个新的JavaScript概念：事件监听器。你下一节课才会学到更多关于事件监听器的知识，所以现在我们已经在挑战中为你写好了监听器。

```js
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
```

不要改变文件首尾的这段代码，你只需要编写里面的函数。

## 检查拼图是否可以移动

发生在事件监听器内部的代码被称为**回调函数**。
我们想在回调函数中移动拼图，但首先我们必须检查拼图是否可以移动。拼图只有在有空的（垂直或水平的）邻居时才能移动。

让我们实现`canMove`函数来检查拼图是否有一个空的空间在它旁边。这个函数应该有一个参数——拼图本身。

要检查拼图是否有一个空的空间在它旁边，你可能想看一下[cellIndex](http://help.dottoro.com/ljputote.php)和[rowIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/rowIndex)来计算拼图的位置。

如果你需要在`tr`或`td`上调用这些方法，请小心！

## 移动拼图

如果你可以移动拼图，那就让我们移动它吧。让我们实现`moveTile`函数，它应该将空的拼图与旁边的拼图交换。你需要将空拼图的`.empty`类切换到你刚刚点击的拼图上，并将你点击的拼图的数字切换到空拼图上。

## 当玩家赢得游戏时，告诉玩家

最后，我们必须在每次移动后检查玩家是否赢得了游戏。在这个游戏中，“赢”意味着拼图按升序排列。

让我们编写`checkIfPlayerWins`函数，如果拼图按正确的顺序排列，它应该显示一个提示。

现在你可以试着解决这个拼图了！
