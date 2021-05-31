## 设置

我们不想把你的个人资料网站存在`fullstack-challenges`中，因为我们想把它作为一个单独的项目用`git`来跟踪版本，所以让我们把该文件夹单独复制成一份:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## 创建仓库 Github repo

你可以**初始化（initialize）**一个git仓库，提交你的修改，并创建相关的Github repo：

```bash
git init
git add .
git commit -m "我的个人资料页"
gh repo create # 这将在Github上创建相关的repo!
```

要从浏览器中打开Github repo，你可以运行：

```bash
gh repo view --web
```

## 页面 Github Pages

[Github Pages](https://pages.github.com/)是Github的一个子服务，它可以在10秒内轻松部署任何**静态网站**（静态==不是Rails应用）。它基于一个名为`gh-pages`的"神奇"分支。当Github检测到这个分支时，它就会将你的网站放到网上。很酷吧？让我们创建这个神奇的分支并推送它。✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # 我们推送的是 gh-pages 这个分支，不是 master!
```

现在你可以建立URL`http://<user.github_nickname>.github.io/profile/`（这是Github自动建立的URL），打开来看看！再在Slack上把链接分享给你的小伙伴们吧。

从现在开始到今天结束，你将继续在你的`~/code/<user.github_nickname>/profile`目录和`gh-pages`分支上工作。这意味着你的配置文件的任何更新都应该通过以下的git命令推送到`http://<user.github_nickname>.github.io/profile/`：

```bash
git add .
git commit -m "修改个人页面"
git push origin gh-pages
```

## 将您的代码提交到Kitt

由于你没有在`fullstack-challenges`，你的作品将不会被提交到Kitt上，如果你想把这个挑战标记为完成，你可以进行操作以下：

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/05-Push-onGithub-Pages
cp -r ~/code/<user.github_nickname>/profile .
rm -rf profile/.git
git add .
git commit -m "将我的工作提交到Kitt"
git push origin master

```
