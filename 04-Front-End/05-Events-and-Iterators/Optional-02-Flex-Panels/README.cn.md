## 背景和目标

让我们来玩一下 Flexbox 并回顾今天的主题：事件和迭代器！

提供了一个样板来帮助你入门，其中包含：

- `index.html` 包含你需要的所有 HTML 代码
- `application.css` 你将使用 Flexbox 来完成页面的样式
- `src/panels.js` 你最终将在这里编写你的 JavaScript 解决方案

### 设置

让我们运行一个本地 web 服务器：

```bash
serve
```

然后，在浏览器中打开 [`localhost:8000`](http://localhost:8000)。

### 详细参数

我们的目标是为你的页面编写一个整洁的 JavaScript 效果。为此，你需要使用 JavaScript 迭代器和 DOM 事件，以及一点点 CSS 样式。你还需要使用 FlexBox 来为页面添加样式，然后为其添加一个漂亮的 JavaScript 行为，这样我们就可以点击每个面板来显示完整的图像和相应的消息。

每当我们点击一个面板时，它都会展开并显示完整的文本，就像这样：

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-reference.gif)

### 使用 FlexBox 进行样式设置

我们有一个简单的 HTML 结构，其中包含面板。每个面板都有一个背景图像和一些文本，分为 3 个段落元素。

一开始看起来很奇怪，所以我们的第一步是让它看起来更漂亮。我们如何将图片并排放置？[Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox) 是你在这个练习的样式部分的朋友。在进行 JavaScript 部分练习之前，页面需要看起来像这样：

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-styled.png"  width="600" height="300">

**提示：**

- 想想为什么图片都挤在一起。我们如何让它们增长到占满屏幕的整个宽度？
- 不要忘记将每个单独的面板也设置为 flex 容器，以帮助样式化所有内容。 (考虑将 `display: flex` 添加到面板中)。
- 你可能会注意到每个面板的顶部和底部单词应该不可见。我们需要确保它们不可见，但仍然在页面上，这样它们就可以被移动到视图中。也许 [Translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) 可以帮助？

### JavaScript 问题分解

在你正确地排版页面之后，JavaScript 部分问题对你来说应该更清楚。

我们想要在点击相应的面板时将隐藏的单词带入视图。当面板增长时，它也会显示更多的图像。

**记住：**

- 选择正确的 HTML 元素
- 以点击的形式为它们添加事件监听器 (迭代的完美机会)。
- 当事件被触发时，需要发生什么。添加 `.open` 和 `.closed` 类怎么样？
- `flex-grow`属性是等比的。一个有`flex-grow: 2`的元素的变大的速度是一个有`flex-grow: 1`的两倍。
