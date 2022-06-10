## 设置

我们不想把你的个人资料网站存在`fullstack-challenges`中，因为我们想把它作为一个单独的项目用`git`来跟踪版本，所以让我们把该文件夹单独复制成一份:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## 创建仓库 GitHub repo

你可以**初始化（initialize）**一个git仓库，提交你的修改，并创建相关的GitHub repo：

```bash
git init
git add .
git commit -m "我的个人资料页"
```

然后我们使用GitHub CLI（命令行界面)来创建关联的Github代码仓。Github CLI让你可以在终端与Github进行互动。

### 使用 `gh` 互动模式

```bash
gh repo create # 这个命令会打开创建Github代码仓的互动模式
```

你会看到一些问题，问你想如何创建你的Github代码仓：

**What would you like to do?（你想干什么？）**
选择 _Push an existing local repository to GitHub_，因为你已经用`git init`创建了本地的代码仓。

**Path to local repository (.)（本地文件夹的路径）**
直接敲击回车键来选择默认选项 -- 当前文件夹（.）

**Repository name (profile)（代码仓名称）**
直接敲击回车键来选择默认选项 -- 也就是当前文件夹的名称。如果你希望你的Github代码仓是另一个名字的话，先输入这个名字，再敲回车键。

**Description（描述）**
直接敲击回车键，暂时把它留成空白吧。如果你想写描述放在Github上的话，可以先输入描述，再敲击回车键。

**Visibility（隐私）**
选择 _Public_ 然后敲击回车键，这样大家都可以看到你的代码仓。别害羞 ：）

**Add a remote? (Y/n)（添加一个remote？）**
输入`Y`，然后敲击回车。增添一个remote的意思就是把你的Github的代码仓和本地的代码仓相连，这样你就可以用git把代码上传到Github了。

**What should the new remote be called? (origin)（新的remote应该叫什么？（origin））**
直接敲击回车键来选择默认选项（origin）-- 这是标准的主要remote名称。

**Would you like to push commits from the current branch to the "origin"? (Y/n)（你想从当前分支上传commits到“origin”吗？）**
输入`Y` 然后敲击回车键，这样你就可以从本地git代码仓上传到刚创建的Github代码仓了。

### 用一行`gh`命令

如果你想用一行代码创建一个**公开的**代码仓，那么你可以直接运行下面的命令：

```bash
gh repo create --public --source=.
```

你还可以在终端用`gh`操作浏览器打开Github 代码仓：

```bash
gh repo view --web
```

你可以在gh[快速指南](https://kitt.lewagon.com/knowledge/cheatsheets/gh_cli)里找到更多的信息。

## 页面 GitHub Pages

[GitHub Pages](https://pages.github.com/)是GitHub的一个子服务，它可以在10秒内轻松部署任何**静态网站**（静态==不是Rails应用）。它基于一个名为`gh-pages`的"神奇"分支。当GitHub检测到这个分支时，它就会将你的网站放到网上。很酷吧？让我们创建这个神奇的分支并推送它。✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # 我们推送的是 gh-pages 这个分支，不是 master!
```

现在你可以建立URL`http://<user.github_nickname>.github.io/profile/`（这是GitHub自动建立的URL），打开来看看！再在Slack上把链接分享给你的小伙伴们吧。

从现在开始到今天结束，你将继续在你的`~/code/<user.github_nickname>/profile`目录和`gh-pages`分支上工作。这意味着你的配置文件的任何更新都应该通过以下的git命令推送到`http://<user.github_nickname>.github.io/profile/`：

```bash
git add .
git commit -m "修改个人页面"
git push origin gh-pages
```

## 将您的代码提交到Kitt

由于你没有在`fullstack-challenges`，你的作品将不会被提交到Kitt上，如果你想把这个挑战标记为完成，你可以进行操作以下：

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/05-Push-on-Github-Pages
cp -r ~/code/<user.github_nickname>/profile .
rm -rf profile/.git
git add .
git commit -m "将我的工作提交到Kitt"
git push origin master

```
