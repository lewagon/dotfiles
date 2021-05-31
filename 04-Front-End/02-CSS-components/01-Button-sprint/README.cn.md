## 背景和目标

制作三个不同的按钮设计（两个我们给出，一个你可以自由发挥）；这里是[你的目标](http://lewagon.github.io/html-css-challenges/08-button-sprint/)。我们已把HTML代码放在了`index.html`中。

```html
<a href="#" class="btn-medium">写一个故事</a>
<a href="#" class="btn-treehouse">现在开始吧</a>
<a href="#" class="btn-yours">属于你的按钮</a>
```

现在你要在`button.css`中编写相关的CSS。

如果你的页面一直不能显示你当前的代码, 不要忘记**硬刷新**你的浏览器(`cmd + shift + r`)来清除浏览器的缓存!

## 用组件（Component）文件来整理CSS

从这时起，你将开始组织你的CSS代码，**每个组件对应一个CSS文件**。按钮是一个标准的组件，如头像、卡片、列表、导航条、标签、表单等。这些组件都应该有自己的CSS文件，你的项目架构将是这样的：

```
.
├── css
│   ├── components
│   │   ├── avatar.css
│   │   ├── banner.css
│   │   └── button.css
│   └── style.css
└── index.html
```

然后在`style.css`中：

```css
/* 导入所有组件(components)文件 */
@import url("component/avatar.css");
@import url("component/banner.css");
@import url("component/button.css");

/* 字体和颜色的一般样式规则 */
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
```

那么在你的HTML文件中你只需要有**唯一的一个链接到`style.css`**：

```html
<head>
  <link rel="styleheet" href="css/style.css">
</head>
```

## 不要忘记悬停（Hover）

不要忘记为每个按钮设计`.btn:hover`的悬停状态。

## 链接的间距（Spacing）

你可能已经注意到，外边距属性的`margin-top`或`margin-bottom`默认并不适用你的链接。这是因为`<a>`标签是一个内联元素。如果你想在链接上用垂直间距，你需要将其`display`属性改为`inline-block`或`block`的"块"级元素。
