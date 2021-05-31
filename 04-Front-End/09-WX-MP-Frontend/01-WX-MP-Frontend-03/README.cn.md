## 背景和目标

本次挑战的目标是练习高级WXML属性来制作动态视图。

## 详细说明

我们想在**stories故事页面**展示多个故事，而去不重复使用相似的WXML标记。

### 1. 从数据开始!

- 在`stories.js`中，找到顶部的数据键。在里面添加一个`stories`数组。

```js
//stories.js
data: {
  stories: []
}
```

- 每个故事将是一个**新的对象**，存储在`stories`数组中。
- 每个故事都会有一个**内容**和**名称**。

```js
{ content: "做一个小程序很有趣! FMC", 名称: "Yinghui"},
```

你要创建2-5个故事。然后成功保存这些本地数据后，你可以在控制台的**AppData**选项卡（"调试器"/"debugger"）中预览它。所有这里存储的东西都会在我们的WXML模板中！

### 2. 渲染一个列表

现在我们可以使用 [`WX:FOR`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/list.html)这个控件属性来渲染故事列表。

在你的**stories.wxml**页面中：

- 将你的卡片组件包裹在`<view>`或`<block>`元素周围（它们是一样的，都只是容器）。
- 使用`wx:for`控制属性为你的stories数组的每个项目来重复使用这个容器元素。
- 使用`wx:for-item`来指定数组中当前元素的变量名。
- 在你的卡片中使用一些`{{胡子}}`语法，来显示你的故事的**内容**和**名称**！

### 3. 使用条件

如果我们没有**故事可以展示**呢？空空如也的页面就不那么美好了! 😱

我们可以使用[`WX:IF`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/conditional.html)控件属性来预判这种情况。

- 制作一张卡片，写上欢迎词。"*这里还空荡荡的哦!*"
- 如果``stories``数组是空的，则渲染这张卡片!

👉提示：空数组的长度等于0。

