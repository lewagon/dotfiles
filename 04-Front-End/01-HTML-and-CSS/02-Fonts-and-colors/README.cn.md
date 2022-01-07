## 设置

我们要继续建立我们的个人资料页面。如果你还没有把之前的文件复制到这个挑战的文件夹中，那么你可以运行以下代码，并添加一个CSS文件：

```bash
cp -r ../01-Profile-content/profile . # 不要忘记后面的点!
cd profile
touch style.css
```

## 背景和目标

添加简单的CSS规则来设计个人页面的**字体**和**颜色**。

如果你的页面一直没有显示你当前的代码的话，不要忘记**硬刷新**你的浏览器(`cmd + shift + r`)来清除浏览器的缓存！

## 详细说明

[这是一个你需要创建的例子](https://lewagon.github.io/html-css-challenges/02-fonts-colors-new/)。下面是要应用的CSS规则列表。

### 正文

为`<body>`选择一个好看的 背景颜色`background-color`，字体名称`font-family`，字体颜色`color`，字体大小`font-size`。**在body层级中设置这些字体规则,将应用于所有基本文本标签** (`<p>`，`<li>`等)。

### 页眉

- 为页眉选择一个好看的`color`和`font-family`(`<h1>`，`<h2>`，`<h3>`)。
- 为标题选择一个和谐的 字号`font-size` 和 行高`line-height`。
- 提示：**小的标题**更优雅。如果你查看这些网站([Medium](https://medium.com/)、[Airbnb](https://www.airbnb.com)等)，你会发现他们的标题的字号`font-size`都是比较小的。

### 链接

- 改变所有链接的`color`和 文本装饰`text-decoration`。
- 使用伪类`a:hover`为链接添加悬停效果。

## 进一步的建议和资源

- 在[Coolors](http://coolors.co/)或[Color hunt](http://colorhunt.co/)上寻找灵感，选择一个不错的配色方案。
- 在[Google fonts](https://www.google.com/fonts) (需要VPN 🛡 )上挑选字体。
- 在Google fonts中，**Open Sans**是`body`的标准选择。比如**Raleway**，**Varela**，**Poppins**，**Roboto**都是是几个不错的字体，可以用来做  `h1`，`h2`，`h3`。

例如，如果你想使用Open-Sans和Poppins(它们各自的字重不同)，你可以在`style.css`的顶部添加以下内容：

```css
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Poppins:wght@300;400;500;700");
```

然后你就可以把它应用在你的其他CSS中：

```css
body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300; /*如果你想要轻量级的字重*/
}
```

**你可以自由选择谷歌字体上的其他字体，发挥创意！😎🌈**

## 完成了吗？

一旦完成了，你就可以提交这个练习到github，并使用以下命令将代码复制到下一个练习文件夹：

```bash
# 提交代码到 GitHub
git add .
git commit -m "添加字体和颜色到我的个人资料页面"
git push origin master

# 复制文件夹到下一个练习文件夹
cp -r profile ../03-Finishing-profile-design
```
