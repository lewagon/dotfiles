## 背景和目标

每次重启应用，你的帖子数据都会消失! 为了保留信息，我们需要将其保存在用户的**手机缓存中**。

## 详细说明

- 当用户提交一个新的FMC故事时，将故事保存到手机缓存中。查看[setStorage API文档](https://developers.weixin.qq.com/miniprogram/en/dev/api/data.html#wxsetstoragesynckeydata)来了解如何操作。
- 使用控制台("调试器"/"debugger")中名为**"存储/Storage"**的标签页来检查手机缓存!
- 当应用程序启动或页面显示时，从缓存存储中获取stories，并将其加载到本地数据中*。查看[getStorage API文档](https://developers.weixin.qq.com/miniprogram/en/dev/api/data.html#wxgetstoragesynckey)
*_小贴士：腾讯其实提供了一个缓存存储的用例！看看你App的 `onLaunch`_
