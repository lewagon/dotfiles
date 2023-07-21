## 背景和目标

让我们创建一个JavaScript游戏吧：汽车比赛（Wagon Race） 🏎。 这是一个简单的游戏，你可以使用键盘使Wagon向前移动。 每个玩家都可以通过点击键盘来移动他们的Wagon（例如，玩家一的`Q`，玩家二的`P`）

这里的目标是学习更多关于JavaScript，DOM和异步事件处理的知识。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/wagon_race.gif)

### 设置

让我们通过运行以下命令来启动本地web服务器：

```bash
serve
```

然后，在浏览器中打开 [`localhost:8000`](http://localhost:8000)。

## 详细参数

在浏览器中打开 `index.html`。

#### HTML

你将从HTML中构建一个简单的双人游戏开始。 有几种不同的方法可以做到这一点，但这是其中一个例子：

```html
<table class="racer-table">
  <tr id="player1-race">
    <td></td>
    <td class="active"></td>
    <td></td>
    <td></td>
    etc.
  </tr>
  <tr id="player2-race">
    <td></td>
    <td></td>
    <td></td>
    <td class="active"></td>
    etc.
  </tr>
</table>
```

#### CSS

当你的HTML完成了，切换到CSS并设计你的赛道！ 例如：

```css
.racer-table td {
  height: 40px;
  width: 40px;
}
.racer-table td.active {
  background-repeat: no-repeat;
  background-size: 100%;
}
#player1-race td.active {
  background-image: url("images/player_1.png");
}
#player2-race td.active {
  background-image: url("images/player_2.png");
}
```

你需要通过将`active`类从一个`td`移动到下一个`td`来更新玩家的位置。 当然，还有其他解决方案来实现这个游戏。 使用表格和CSS类是一种选择。 只要确保你能够“手动”生成你可能需要的所有板视图。

在开始写JavaScript之前，尽可能多地聪明地完成HTML和CSS一般会更高效。 糟糕的前端开发人员花费时间编写长的JavaScript代码来更改CSS值，而不是用精炼的脚本来操纵现有CSS类。

#### JavaScript

在`lib/wagon_race.js`中写下你的所有代码。 我们需要一种方法来让JavaScript更新版面的状态。 创建简单的JavaScript函数来更新玩家的位置。 再次，有几种方法可以做同样的事情。 以下是一个例子：

- 从当前玩家的`td`中删除`active`类，并将该类添加到下一个`td`。
- 跟踪表中每个玩家的“索引”并增加它。

#### 绑定键盘

点击鼠标不够快。 而且你不能和别人一起玩！ 你可以考虑使用`keyup`事件：

```js
document.addEventListener("keyup", event => console.log(event));
```

_你明白为什么我们使用`keyup`而不是`keydown`吗？_

##### 开始比赛和赢得比赛 🏁

最后两件事：

- 找到一种方法来宣布比赛的获胜者
- 找到一种方法来重新开始游戏
