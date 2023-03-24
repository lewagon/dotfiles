## 背景和目标

建立一个[带粘性地图的结果页](https://lewagon.github.io/layouts-demo/campuses-with-map.html)。在这个练习中，请注意我们没有在`index.html`中的任何地方导入Bootstrap！你需要在`pages/cities.css`文件中不使用Bootstrap来实现这个布局。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/map-example.png)

## 开始挑战吧

1. 确保你理解`index.html`中的代码，以及我们给你的`components/navbar.css`和`components/card.css`中导航条和卡片的设计。如果你不完全理解，可以提个问（raise a ticket），有老师会讲解给你!
2. 回过头再来演练一下如何使用`flexbox`和`position: sticky`构建布局。
**不要使用浏览器的‘检查(Inspect)/查看元素’来作弊! 🔎**本次挑战的目标是教你如何自己构建布局。慢慢思考，有困难就问老师，但不要作弊😉!

要显示MapBox地图，你需要[获取MapBox API密钥](https://www.mapbox.com/account/access-tokens/)，并确保你将自己的密钥添加到`#map`图片元素的`src`属性的url中。

要测试您的代码并在浏览器中查看您的页面，请使用下面的命令启动一个Web服务器（不要只在浏览器中打开HTML文件）。

```
serve
```

正如你所看到的，我们已经为你编写了`card`组件，所以你要做的就是：

- 在`.card`的周边建立一个`.cards`的网格。
- 建立一个水平布局，让`.card`在左边，`#map`在右边。

**[小贴士]**在开始之前先画好HTML结构!

注意：如果你的页面似乎不能显示你当前的代码，不要忘记**硬刷新**你的浏览器(`cmd + shift + r`)来清除浏览器的缓存!

## 新的CSS组织

请注意，现在我们的CSS中有**两个文件夹**：

- `components`用于编码所有的图形组件。
- `pages`用于编码网站上不同页面的布局。

像往常一样，`style.css` 导入了所有其他样式表，并且在HTML中放入该css链接。
