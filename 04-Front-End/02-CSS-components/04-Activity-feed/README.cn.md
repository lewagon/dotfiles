## 背景和目标

搭建一个类似于Dribbble的[活动推送](http://lewagon.github.io/html-css-challenges/13-activity-feed/)。

1. 创建你的`avatar`CSS组件。
2. 在`tabs.css`和`notification.css`中实现你的标签和通知设计。

但是首先，**阅读所有以下的说明**!

## 标签页设计（Tab design）

该标签页的设计非常简单。它的HTML看起来是这样：

```html
<div class="tabs">
  <a href="#" class="tab active">旅行</a>
  <a href="#" class="tab">招待</a>
</div>
```

完成后：

- 把`.tabs`设为flexbox
- 在每个`.tab`上加一些`padding`
- 你甚至不需要 `space-between`或者`align-items`，因为标签页已经有了相同的 `height`
- 你也可以使用`.tab:active`和`.tab:hover`来设计标签页的**激活**和**悬停**状态。你可能需要使用`opacity`和`border-bottom`😬

## 通知设计（Notification design）

关于`.notification`的设计，**回到幻灯片！** 这是使用flexbox的一个经典用例，通知的主体是通过`flex-grow`来推开其他的部件。

完成后，就只需要微调你的`margin`、`padding`，挑选字体和颜色的设计。

现在开始做一个超酷的活动推送吧！🚀🚀

## [额外提示] 用户图像

对于你的活动推送中的用户图片，你可以使用我们建立的一个占位符服务，通过其GitHub用户名可以获取任何Kitt用户的Github图片。 你只需使用这个URL：`https://kitt.lewagon.com/placeholder/users/<user.github_nickname>`，然后用几个不同的Github用户名试试吧。

## [额外提示] 首子选择器和尾子选择器

你可以用这些选择器来选择第一个（或最后一个通知）。

```css
.notification:first-child {
  /* 第一个元素的CSS代码用class="notification" */
}
.notification:last-child {
  /* 最后一个元素的CSS代码用class="notification" */
}
```

一个好用的方法：你可以在最后一个通知中去掉`border-bottom`。

如果你的页面不能显示你当前的代码，不要忘记**硬刷新**你的浏览器(`cmd + shift + r`)来清除浏览器的缓存!
