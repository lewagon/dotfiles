## Background & objectives

The benefit of using WeChat is all its user data... Why not taking advantage of it, allowing our users to **login**?

## Specs

### 1. Get the golden data

Change your **landing page button** to turn it into a Login! 

- add an **open-type** of `getUserInfo` and a **bindgetuserinfo** handler. 
- You'll need the [documentation](https://developers.weixin.qq.com/miniprogram/en/dev/component/button.html)...

Create the `getUserInfo` function and console.log its event parameter 😉

### 2. Use it!

**Persist** this user data globally, using your App's globalData or the cache storage.

**Improve the user experience!** 🏗️

- Display the avatar of your user somewhere in the app
- Pre-fill the name input, or even hide it?
