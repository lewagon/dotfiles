## 你今天的挑战

这一天分为**四个挑战**。只要完成所有的挑战，你应该就能在今天部署完成第一个微信小程序：_"F*** My Code"._

这是[Fmylife.com](https://fmylife.com)，用户分享他们的一些个人趣事，每条发布都以"FML"结尾。我们要做一个复制品，但主题是关于你作为程序员的新生活😆。

每次主讲老师演示完后，你将会尝试编写自己的代码!

**上午的挑战**

1. 创建一个着陆页面来迎接用户
2. 创建一个故事页面，展示我们的FMC故事
3. 用高级的WXML改进故事页面

**下午的挑战**

4. 创建一个发布页面并使用全局数据
5. 选做 - 使用缓存
6. 选做 - 登录用户

---

### 挑战1：创建一个着陆页面（Landing page）来迎接用户

## 背景和目标

第一个挑战的目标是了解一个应用程序的基本结构，特别是用WXML/WXSS编写的视图层。

## 详细说明

### 1. 设置您的应用程序

新建一个微信小程序，并将其命名为FMC。使用其设置文件`app.json`，用一个更好的名字和样式来自定义**导航栏**。

### 2. 使用页面数组

使用设置文件`app.json`在数组`pages:[]`中添加新的路由。

```
"pages/landing/landing"
```

⚠️警告：别忘了用逗号隔开每条路线! 如果你把数组`pages:[]`打乱了，你的应用就瘫痪了...

保存这个文件后，微信的IDE会给你生成一个新的页面文件夹，里面的所有文件都是供你使用的模板! 👏


### 3. 建立一个快速着陆页面（Landing page）

这个页面将迎接你的用户，并告知FMC应用程序背后的概念，给用户留下一个美好的第一印象!

使用并修改[Le wagonUI的横幅组件（Banner Component）](https://uikit.lewagon.com/documentation#banner)来节省时间。

**提示**：微信小程序**不能**加载带有本地文件`local file`的`background-image`的CSS(在你的目录内)....
这是框架的限制，以*保持你的应用程序的轻量级*。相反，你必须加载一个远程文件`remote file`🌏 ，并且它必须通过HTTPs!

让我们通过 style="" 的属性来使用一些`inline CSS`：

```
<view class="banner" style="height: 100vh; background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(https://www.lewagon.com/api/v1/cities/shenzhen/cover?width=1200);">
</view>
```
