## 背景和目标

现在让我们继续构建一个稍微复杂的组件，完成我们在课程中看到的三种不同的卡片设计。这里是[你的目标](http://lewagon.github.io/html-css-challenges/14-card-sprint/)。我们已经把开头的HTML代码放在`index.html`中：

```html
<div class="card-category">
  <!-- [ ... ] -->
</div>
<div class="card-product">
  <!-- [ ... ] -->
</div>
<div class="card-trip">
  <!-- [ ... ] -->
</div>
```

现在你要做的是在每张卡片中添加HTML，以及在`cards.css`中添加相关的CSS（所有三张卡片的CSS可以放在同一个文件中）。

**注意**: 在尝试构建`card-trip`时，先不要在右下角添加用户头像。我们会在完成卡片后再添加。

如果你的页面一直无法显示当前的代码，不要忘记**硬刷新**你的浏览器(`cmd + shift + r`)来清除浏览器的缓存!

## 用组件（component）文件来整理CSS

就像上一次练习一样，我们将使用新的专业结构来制作样式表。我们可以将不同卡片类的所有CSS放在一个CSS文件中:`cards.css`:

```
.
├── css
│   ├── components
│   │   └── cards.css
│   └── style.css
└── index.html
```

然后在`style.css`中:

```css
/* 从Google Fonts导入字体*/
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Raleway:wght@300;400;500;700");

/* 导入所有组件文件 */
@import url("component/cards.css");

/* 一般的字体和颜色 */
body {
  margin: 100px;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
a {
  text-decoration: none;
}
.text-center {
  text-align: center;
}

```

那么在你的HTML文件中只需要**唯一的一个链接来链接到`style.css`**：

```html
<head>
  <link rel="styleheet" href="css/style.css">
</head>
```

## 进一步的建议和资源

你已经设计好了三张卡片，让我们来更新你的上一张卡片`card-trip`，它的右下角有一个用户头像。对于将一个元素钉在另一个元素中的特定位置，我们将使用【相对>绝对模式】[Relative > Absolute pattern](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/)。以下是使用这种模式来定位元素的步骤：

### 将主div设置为相对定位`position: relative`：

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-relative.png)


### 将一个div钉在里面，用绝对定位"position: absolute"（相对于父级）：

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-top.png)

这将允许我们用`position: relative;`来定位子元素`.child`与父元素`.parent`的关系。然后你可以使用方向属性上`top`、下`bottom`、左`left`和右`right`来移动到处`.child`📐。

请注意，如果你添加了一个负值，比如`right: -20px`，这将使内侧的div**在父级div之外**移动20px。

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-bottom.png)

现在你可以用这个技巧在你的`.card-trip`上添加一个很酷的叠加头像，就像这样：

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/card-position.png" alt="" width="400">
</div>
