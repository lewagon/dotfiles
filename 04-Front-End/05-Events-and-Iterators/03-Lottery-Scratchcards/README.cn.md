## 背景和目标

在前端网页开发中，**数据属性（data attributes）**是一种非常方便的方式，可以将值注入和存储在HTML中，以便你可以轻松地在JavaScript中获取它们。

还记得吗？你已经使用过属性了，例如**id**，**class**，**href**，**style**等。这些是用于特定目的的标准属性。但有时我们需要在HTML中存储其他类型的数据，并创建自己的属性来实现此目的。这就是**数据属性**的用武之地。

在这个挑战中，你将学习如何通过JavaScript与这些数据属性进行交互。

## 设置

首先运行服务器并转到[localhost:8000](http://localhost:8000)。

```bash
serve
```

## 我们要构建的是什么

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/scratchcards.gif"  width="800" height="552">

让我们准备好玩抽奖吧 🎲

你的任务是销售彩票刮刮卡。如果你打开你的[localhost:8000](http://localhost:8000)，你应该会看到一张刮刮卡网格。但这些刮刮卡是空白的！

每张刮刮卡的购买价格为10元。但是，用户不知道他们每张刮刮卡能赢多少钱。可能是一分钱，也可能是几千欧元。他们必须在购买后“刮”掉刮刮卡，才能看到他们赢得了多少钱。这就是为什么屏幕上没有显示实际金额 😶‍🌫️

## 购买刮刮卡

首先，我们想要构建一个行为，让用户可以用10元购买一张刮刮卡。用户可以通过点击这些刮刮卡之一来实现这一点。所以，让我们来思考一下这个步骤：

1. 从页面上选择所有的刮刮卡（使用`querySelector`或`querySelectorAll`）。
2. 监听用户何时点击这些刮刮卡。
3. 当他们这样做时，从他们拥有的金额中减去`10`。不要担心他们赢了多少钱（这是下一节）。
4. 在页面上显示他们的余额。

你会注意到在我们的HTML中有：

```html
<div id="footer" class="footer">
  Your balance is: <span id="balance">100</span>€
</div>
```

所以，你会想要在这里显示用户拥有的金额。用户从100元开始（如HTML中所写）。当然，他们的余额不能低于`0`，因为这个时候游戏就结束了 👾

如果在浏览器中，每次你点击一张刮刮卡，余额就会减少10元，直到达到0元，那么你就能知道这个方法是OK的。

## 计算赢得的金额

如果用户知道每张刮刮卡能赢多少钱，那就不好玩了！那么，这些信息藏在哪里呢？

如果你看一下HTML，你会注意到每张刮刮卡看起来像这样：

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

关键细节是`data-amount="5"`。这张卡会赢得我们5元 🎉

那么，我们如何从JavaScript访问这个数据属性呢？**你需要使用[dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)来做这个**。数据集是一个JavaScript属性，它允许我们从HTML元素访问数据属性。下面是一个语法示例：

```js
// 如果我们在HTML中有：<div id="hotel" data-name="Azure Ocean"></div>

const hotel = document.querySelector("#hotel");
console.log(hotel.dataset.name);
// 这将打印出Azure Ocean
```

`hotel.dataset.name`语法让你想起了什么？是的，`dataset`是一个`Object`（就像Ruby中的`Hash`）它有HTML中的`data-`属性的键！所以，如果我们有`data-name="Azure Ocean"`，那么`dataset.name`将返回给我们`"Azure Ocean"`。

回到我们的刮刮卡，让我们应用这个原则，将你赢得的金额添加到总金额中：

1. 找到你的代码中负责减去`10`的地方。你将保留减去`10`的这部分（因为这是所有刮刮卡的成本），但你将修改这段代码，让它也要_添加_赢得的金额。
2. 获取你从DOM中得到的刮刮卡元素，并使用`dataset`来获取`data-amount`。_注意：`dataset`属性是字符串类型，所以如果你想要其他类型的数据，你可能需要转换。_
3. 将这个金额添加到用户的余额中。

如果你点击卡片，你发现有时程序会将金额添加到用户的余额中，而不是总是减去10欧元，那么你就知道你成功了。

## 刮卡

唯一的问题是，现在你可以点击同一张刮刮卡多次！这意味着如果用户找到了一张赢得刮刮卡，他们可以一直点击下去。

如果你再看一下HTML，你会注意到：

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

还有一个`data-scratched="false"`属性，我们还没有用过。你可以在一个HTML元素上有很多个数据属性（只要它们的名称不同），所以在这里使用`data-amount`和`data-scratched`是没有问题的。

以下是你的任务：

1. 当用户点击一张刮刮卡时，你可以设置它的`data-scratched`属性，使得`data-scratched="true"`吗？_提示：如果你做得正确，CSS已经设置好了，当你点击它时，你会注意到卡片颜色变浅。_
2. 如果用户试图点击同一张卡片多次，你能让用户不可以购买多次吗？

## 在卡片上显示赢得的金额

最后，作为我们应用程序的一个额外的改进，当你点击一张卡片时，你能让这张卡片显示用户从这张卡片赢得的金额吗？
