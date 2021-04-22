## 背景和目标

我们已经有了一些经验，也建立了一些基本的组件，现在来看看如何使用它们，并将它们组合成一个真正的着陆页（Landing page）! 任何网站都必须有一个**漂亮的着陆页（Landing Page）**。因为那是是访客看到的第一个页面，需要足够好，才能将他们转化为客户💰。
在这个挑战中，你将重现一个经典的着陆页设计，比如[这个](https://arthur-littm.github.io/startup-landing/)!

你的着陆页**至少**应该包括以下内容：

一个**主题图片（Hero）/横幅（Banner）**部分，来呈现你的产品与其呼吁。
- 一个**过程/主题内容**部分（可以用什么组件来分解你的产品/服务的不同方面）。
- 一个**页脚**。

## 设计模型（Mockup）

⚠️ **绝不要在没有完成模型设计的情况下就开始编码！** ⚠️


在接下来的几周里，你将学习如何像专业人员一样使用[Figma](https://www.figma.com/)来设计你的页面，但今天你可以使用笔和纸来设计页面的不同部分。

对于这个练习，你应该有：

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/startup-landing-drawing.png" alt="" width="100%">
</div>

⚠️如果你不能100%确定自己画的结构是正确的，请先向老师确认后再开始写代码!

## 详细说明

建立一个包含以下元素的着陆页面：

一个**主题图片（Hero）/横幅（Banner）**部分。
- 一个**过程/主题内容**部分。
- 一个**页脚**。

## 进一步的建议和资源

- [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox)
- [字体对](https://fontpair.co/)
- [Startup illustrations（创业图解）](https://undraw.co/illustrations)
- [图标](https://www.flaticon.com/)
- [Coolors（颜色选择器）](https://coolors.co/)

## 完成了吗？

一旦你完成了，你可以提交这个练习到[Github pages](https://pages.github.com)，并且分享到你的slack上。

首先，从`fullstack-challenges`中复制一份出来，这样我们就可以把它作为一个单独的`git`项目来版本跟踪。

```bash
cp -r ../03-Landing-page/landing ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/landing
```

然后，用`git`开始跟踪项目，并提交到到`gh-pages`分支。

```bash
git init
git add .
git commit -m "我的着陆页"
gh repo create
git push origin master # 先提交到 master
# 然后提交到 "gh-pages "分支
git co -b gh-pages
git push origin gh-pages
```
