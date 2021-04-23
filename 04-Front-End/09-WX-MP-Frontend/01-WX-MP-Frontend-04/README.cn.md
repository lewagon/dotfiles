## 背景和目标

在这个挑战中，你将学习如何**使用全局存储**将数据从页面发送到页面。

您还将发现新的组件，如**表单**和用于导航的**tab bar**!

## 详细说明

### 1. 从Global（全局）到Local（本地）

每个页面(如`stories.js`)都有自己独立的*local*数据要呈现。

好处是，整个App（`app.js`）共享一个*global*的数据存储，我们可以在任何地方访问。这里也就是你用来保存任何东西以重复使用的地方。例如：你的用户信息!

虽然[文档](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/app.html)对此说得很少，但请注意，WXML不能直接访问*全局global*存储数据。你必须先将其存到*本地local*数据!

```js
//app.js
App({
  globalData: {
  	userInfo: { nickName: "salmon", gender: 1 }
  }
})
// 设置 globalData
```

```js
// page.js
let app = getApp() // 获取app实例

Page({
  data: { userInfo: app.globalData.userInfo }
})
// 从app.globalData中获取并设置本地数据。
```

```html
<!-- index.wxml -->
<view>Hello {{userInfo.nickName}}</view>
<!-- 显示我们的本地数据 -->
```

按照这个逻辑，你需要：

- 用`App.js`在我们的 `stories` 数组中添加一个**globalData**的存储
- 在`stories.js`的顶部，使用getApp()来获取你的App的实例
- 在你的 `stories.js` **onShow函数**中，将**本地存储**重置为等于全局存储的数据

```js
Page({

      ...

      data: {
        stories: []
      }

      onShow: function () {
        this.setData({
          stories: app.globalData.stories
        })
      }

      ...

    })
```

**再次检查视图**。

如果一切顺利，您的 **WX:FOR** 循环仍然会渲染您的所有故事!

### 2. 让我们发布新的故事!

你想在你的应用上**添加一个新的路由**，让用户发布一个新的FMC故事。

- 编辑你的`app.json`文件，添加一个新的"post"页面。
- 还是在`app.json`中，创建一个新的"tabBar"！我们将用它来导航。我们将用它来浏览我们的2个主要标签。左边是**stories**，右边是**post**。检查[设置文档](https://developers.weixin.qq.com/miniprogram/en/dev/framework/config.html)以正确实现tabBar对象。

**现在测试一下！**在你的模拟器中，现在你应该能够来回切换标签。花时间[设置一个漂亮的图标](https://www.iconfont.cn/)？

**现在让我们设计一个漂亮的表单** 🎨。

- 在你的`post.wxml`视图页中，使用[表单form](https://developers.weixin.qq.com/miniprogram/en/dev/component/form.html)组件和它的**bindsubmit**属性。
- 我们需要两个[input](https://developers.weixin.qq.com/miniprogram/en/dev/component/input.html)(名称和内容)，当然还需要一个按钮来提交表单！

你知道如何在你的`post.wxml`视图页中**接收这个表单数据**吗？

是通过你的表单的`bindsubmit`属性哦!

创建一个名为**formSubmit**的函数。这个函数接收一个`event`参数，里面有你所有的表单数据😉。

```js
Page({
  ...
  formSubmit: function (event) {
    console.log(event.detail.value.name)
    console.log(event.detail.value.content)
  }
  ...
})
```

请继续**实现这个函数**。

- 拿到你的表格输入值。
- 将它们保存在您的App的`globalData`中。
- 通过[`wx.switchTab`](https://developers.weixin.qq.com/miniprogram/en/dev/api/ui-navigate.html#wxswitchtabobject)将用户切换回故事页面。

*👉 *提示：记住我们是如何使用`getApp()`来获取我们页面里面的App实例的！* 🤓

**测试，再测试!** 有任何进展都记得使用console.log! 🤓
