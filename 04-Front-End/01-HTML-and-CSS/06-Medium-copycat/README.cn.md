## 背景和目标

让我们来模仿设计一个[Medium文章](https://lewagon.github.io/medium-copycat/)，然后用GitHub Pages进行部署!

## 设置

首先，我们需要创建所有我们需要的文件/文件夹：

```bash
mkdir medium-article
touch medium-article/index.html
touch medium-article/style.css
```

这次不需要图片文件夹，因为我们将使用[unsplash](https://source.unsplash.com/)的占位符（placeholders）代替。

## 详细说明

一篇Medium的文章看起来[像这样](https://medium.com/le-wagon/from-bootstrapping-to-building-a-brand-that-scales-26b0eda92ddb)。我们要编写一个[简化版](https://lewagon.github.io/medium-copycat/)。

在开始编写代码之前，先分析一下页面的结构，想想组成页面的不同元素。想想你将需要的不同类（class），更好的是用纸笔画出HTML结构，这将有助于你的代码编写。以下是我们需要的元素：
- 一个带有背景图片的横幅（banner），包含标题和描述。
- 一个居中的容器，用于放置文章内容（有左/右自动边距）。
- 这个容器内有：标题、段落和链接。
- 注意：容器的响应式 + 链接上好看的悬停效果。

## 进一步的建议和资源

### 高级的链接

- 检查[Medium的例子]中的链接(https://lewagon.github.io/medium-copycat/) => 我们可以看到在`hover`上的CSS是如何改变的（`background-image: linear-gradient ...`）？
- 在`a`上添加一个 `linear-gradient`，在`a:hover`上添加一个深色的，来重现那些高级的链接。

### 容器（Container）

- 使用`width`和`margin: 50px auto`将其居中。
- 容器还不是响应式的时候:
  - 将`width`改为 `max-width`(方法不当)
  - 增加媒体查询（好的办法)

下面是一个例子，说明如何在992px宽或更小的屏幕上调整容器的大小：

```css
/* Media queries 媒体查询 */
@media(max-width: 992px) {
  .container {
    width: 700px;
  }
}
```

确保调整所有其他屏幕尺寸(`576px`, `768px`, `992px`和`1200px`)的容器大小。

## 可选 - 将代码提交至GitHub Pages

如果你想，你可以将你的页面推送到GitHub Pages! 如果你这样做，我们将再次需要将你的作品复制到fullstack challenges**之外的**文件夹中，这样我们就可以用git来跟踪它：

```bash
cp -r ./medium-article ~/code/<user.github_nickname>/medium-article
cd ~/code/<user.github_nickname>/medium-article

git init
git add index.html style.css
git commit -m "My medium copycat"
gh repo create --public --source=.
git push
gh repo view --web
```

然后，让我们创建神奇的`gh-pages`分支：

```bash
git checkout -b gh-pages
git push origin gh-pages
```

去到`http://<user.github_nickname>.github.io/medium-article/`看你模仿Medium的项目吧!
