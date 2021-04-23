## 背景和目标

使用微信的好处是它拥有所有的用户数据... 为什么不利用这个优势，让我们的用户可以直接**登录**呢？

## 详细说明

### 1. 获取珍贵的数据

把你的**着陆页按钮**变成一个Login（登录）!

- 添加一个`getUserInfo`的**open-type**和一个**bindgetuserinfo**事件处理。
- 你需要浏览[文档](https://developers.weixin.qq.com/miniprogram/en/dev/component/button.html)...

创建`getUserInfo`函数及其console.log其事件参数。😉

### 2. 来使用它吧!

使用App的globalData或缓存存储，以**全局地保存**这个用户数据。

**提升用户体验！** 🏗️

- 在应用程序中的某个地方显示用户的头像。
- 可以预填入名称输入的内容，甚至隐藏它？
