## Background & objectives

In this challenge, you will learn to how **use the global storage** to send data from page to page.

You will also discover new components such as a **form** and a **tab bar** for navigation!

## Specs

### 1. From Global to Local

Each Page (e.g `stories.js`) has its own separate *local* data to render in its view.

Fortunately, the whole App (`app.js`) shares a *global* data storage we can access everywhere. That's where you want to save anything to re-use. Example: your user information!

Although the [documentation here](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/app.html) says very little about it, note that WXML can't directly access the *global* data storage. You'll have to go through the *local* data first!

```js
//app.js
App({
  globalData: {
  	userInfo: { nickName: "salmon", gender: 1 }
  }
})
// setting globalData
```

```js
//page.js
let app = getApp() // register the app instance

Page({
  data: { userInfo: app.globalData.userInfo }
})
// take from app.globalData and set the local data
```

```html
<!-- index.wxml -->
<view>Hello {{userInfo.nickName}}</view>
<!-- display our local data -->
```

Following this logic, you want to:

- Use `App.js` to add a **globalData** storage with our `stories` array
- At the top of `stories.js`, use getApp() to get an instance of your App
- Inside your `stories.js` **onShow function**, reset your **local storage** to equal the globalData storage

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

**Check the view again.**

If all goes well, your **WX:FOR** loop still renders all your stories!

### 2. Let's post new stories!

You want to **add one new route** on your app to let users POST a new FMC story.

- Edit your `app.json` file to add one new "post" page.
- Still in `app.json`, create a new 'tabBar'! We'll use it to navigate between our 2 main tabs: **stories** on the left, **post** on the right. Check the [settings documentation](https://developers.weixin.qq.com/miniprogram/en/dev/framework/config.html) to implement the tabBar object correctly.

**Test it now!** In your simulator, now you should be able to switch tabs back & forth. Take the time to [set a nice icon](https://www.iconfont.cn/)?

**Let's design a nice form now** 🎨

- In your `post.wxml` view page, use the [form](https://developers.weixin.qq.com/miniprogram/en/dev/component/form.html) component and its **bindsubmit** attribute.
- We'll need two [inputs](https://developers.weixin.qq.com/miniprogram/en/dev/component/input.html) (name and content), and of course one button to submit the form!

Do you know how to **receive this form data** inside the logical layer `post.js`? it's via the `bindsubmit` of your form!

Create a function called **formSubmit**. This function receives an `event` argument with all your form data 😉

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

Go ahead and **implement this function**:

- taking the values of your form inputs
- saving them inside your App's `globalData`*
- switching the user back to the stories page thanks to the [`wx.switchTab`](https://developers.weixin.qq.com/miniprogram/en/dev/api/ui-navigate.html#wxswitchtabobject) API

*👉 *tip: remember how we've used `getApp()` to get an instance of the App inside our page!*

**Test and test again!** use console.log at every step! 🤓
