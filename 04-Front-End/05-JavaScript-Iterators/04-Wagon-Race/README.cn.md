## 背景和目标

让我们来做一个JS游戏：Wagon赛车🏎. 它是一个简单的游戏，你可以用键盘来让小货车向前移动。每一个玩家会用一个键来移动他们的小货车(e.g. 第一个玩家用`Q` , 第二个玩家用`P`)。

这个练习的目标是更多地练习JavaScript, 文档对象模型(DOM), 和异步事件处理。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/wagon_race.gif)

## 详细说明
启动你的本地网页服务器：

```bash
rake webpack
```
然后去 http://localhost:8080

#### HTML

你将从用HTML创建一个简单的两个玩家分数板开始。有几种不同的方法，以下是其中一个例子。

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

当你完成了HTML后，转到CSS并设计你的赛道！示例如下：

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

如果你想更新一个玩家的位置，可以把`active` 类从一个`td`移到下一个。当然，还有其它的方法可以实现这个游戏。还有一个选择是使用表格和一个CSS类。只需要确保你可以“手动地”产出所有你需要的得分板的视图。

大部分情况下，一个好的方法是在写JavaScript代码前，先尽可能多地写出好的HTML标记和CSS类。不大行的前端开发者通常花时间写很长的会改变CSS值的JS代码, 而不是写能够好好利用现有CSS类的简洁的代码。

#### JavaScript

把所有代码写在 `lib/wagon_race.js` 文件里. 我们需要想办法让JavaScript更新得分板的状态。需要创建可以更新玩家分数的简单的JS函数。再次声明，做到这个有不同的方法。一个例子是：

- 在当前玩家的`td` 上删除`active` 类(class)，然后把这个类添加到下一个 `td`上。
- 在表格中追踪每个玩家的"索引"(index)并增加。


#### 和键盘绑定

点击按钮并不够快。而且你不可以和别人一起玩儿！可以看一下 `keyup` 事件:

```js
document.addEventListener("keyup", event => console.log(event));
```

_你知道为什么我们用`keyup` 事件而不是 `keydown`吗?_

##### 开始比赛并获胜 🏁

最后两件事情:

- 想办法宣布获胜者
- 想办法重启游戏
