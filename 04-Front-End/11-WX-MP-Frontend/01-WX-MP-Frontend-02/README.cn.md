## 背景和目标

本次挑战的目的是为了练习更多的微信模板语言。

## 详细说明


### 1. 在你的应用程序中再设置一个页面

使用设置文件`app.json`在数组`pages:[]`中再次添加新的路由（route）。

```
"page/stories/stories"
```

### 2. 创建一个小标题开始

让我们重新使用我们着陆页上的[横幅组件](https://uikit.lewagon.com/documentation#banners)，并把它变成一个漂亮的标题！我们可以使用 `inline CSS`再次定制它的大小，例如100px的高度。

### 3. 然后为我们的故事制作一张卡片...

我们将需要一个卡片组件来显示我们的FMC故事：每个卡片将包含**内容**和**作者**。

我们可以再次使用[Le Wagon的卡片组件](https://uikit.lewagon.com/documentation#card_product)来节省时间（但不需要产品图片）。

只要一个故事就够了，这里做的事是模板化。

### 4. 数据绑定（Data binding）介绍

WXML不仅仅是HTML：它是一种**模板语言**，允许我们[注入JavaScript变量，甚至在本地数据中循环](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/data.html)! 当你使用这种语法时：`{{变量或操作}}`，既`{{variable or operation}}`，奇迹就会发生。

我们称它为**胡子语法（mustache syntax）**👨，它将JS和HTML双向连接......

**从JS到WXML**

- 将‘Who is here?’存储在`stories.js`页面数据中的`text`变量中:

```js
//stories.js
Page({
  data: {
    text: 'Who is here?'
  }
})
```

- 在你的`stories.wxml`页面中显示文本:


```html
<!— stories.wxml -->
<view>{{text}}</view>
```

任何存储在`text`中的字符串都会动态地显示在您的视图中 🤓

**从WXML到JS ⬅️**。

- 创建一个带有 "bindtap" 属性的按钮，并以函数名作为值:
 
```html
<!— stories.wxml -->
<button bindtap="clickMe">{{text}}</button>
```

- 在你的Page对象中定义这个新函数:

```js
//stories.js
Page({
  clickMe: function() {
    this.setData({ text: "Hello World" })
  }
})
```

你很棒！你有一个按钮向逻辑层(JavaScript文件)发出`bindtap`事件，并有一个函数将本地数据重新设置为另一个字符串后，立即呈现在视图中。

⚠️不要破坏Page对象! **每个键值对（key-value pair）都用逗号链起来**。注意Page对象包含框架提供的不同键（keys），如`onReady`、`onShow`等等。我们称它们为[生命周期函数](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/page.html)。

### 选做内容：

将着陆页中的`<navigator>`转化为`<button>`元素，在**bindtap**上调用这个函数。

```js
//landing.js
goToStoriesPage: function() {
  wx.navigateTo({
    url: '/pages/stories/stories'
  })
}
```
