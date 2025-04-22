## 背景和目标

这是一个简单的挑战，包含操作基础HTML标签，以及创建一个包含标题、文本、列表和图片的个人资料卡片。

## 设置

进入你的 配置文件`profile` ，创建一个`images`目录来存储你所有的图片：

```bash
cd profile
mkdir images
code .
```

## 本地服务器（Local Server）

你可以通过在你的终端中输入以下命令来启动本地的网页服务器webserver（只要确保你在练习的文件夹中）：

```bash
serve
```

已在 别名[alias] 中定义(https://github.com/lewagon/dotfiles/blob/f894306fd81502f1fe513dd253e3129f4b56874d/aliases#L7)

- 您现在可以在[http://localhost:8000](http://localhost:8000)上访问您的文件。
- ⚠️ 现代浏览器会缓存给定**url**所返回的**文件**。它在内存中保存了一个你的HTML(`http://localhost:8000`)、CSS(`http://localhost:8000/style.css`)甚至是你的图片(`http://localhost:8000/images/logo.png`)的版本! 有时候，旧的版本依然存在，而你最新的代码没有被读到。要解决这个问题，请使用`cmd + shift + r`来 **硬刷新[Hard Refresh]** 你的页面（这个过程中会清除缓存）。👌

## 详细说明

（使用正确的HTML标签）建立一个简单的HTML个人资料页面，包含以下元素。

- 你的个人照片
- 标题和副标题，写上你的名字和你的职位（你现在可以写上程序员 💻 ）。
- 一段自我描述
- 一个按钮
- 一个你的社交媒体链接列表

一张图片胜过千言万语，[所以这里是你在这次挑战中应该搭建的东西 👉 ](https://lewagon.github.io/html-css-challenges/01-profile-content-new/)

## 进一步的建议和资源

### 找到**好的**图片

在开始写代码之前，先准备好你的个人资料图片文件。在这个练习中，你可以使用你在**Facebook**（或者其他社交媒体）的个人资料图片，并将其保存在`images`文件夹中。

### HTML技巧

- 不要忘记基本的结构标签`<html>`、`<body>`、`<head>`。
- 不要忘记页面`<head>`中的`<title>`，以及其他重要的元标签，如`<meta charset="utf-8">`。
- 你可以使用[Font Awesome](https://fontawesome.com/icons)来找很酷的图标(例如用于社交网络)。这是一个很有用的库，因为所有的图标都可以看做是一种**字体**。你可以很容易地去调整它们的大小，改变它们的颜色，甚至添加动画效果。要导入Font Awesome，只需将下方链接添加到你的`<head>`中。

```html
<!-- Fontawesome Stylesheet -->
<link rel="styleheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">。
```

- 你可以在你的链接上使用`target="_blank"`属性，一旦点击它们就会在新的标签页上打开。

## 缩进或混乱

**花时间仔细地缩进你的HTML**。HTML代码有很多嵌套，比Ruby多得多。如果你不缩进，那你的代码就玩完了。

你看下面哪种代码更容易理解？

这个：

```html
<ul>
    <li><a href="#">
        <i class="fab fa-facebook-f"></i> Facebook
  </a>
</li><li>
  <a href="#">
    <i class="fab fa-linkedin-in"></i> Linkedin
      </a></li>
<li> <a href="#">
  <i class="fab fa-twitter"></i> Twitter
    </a>
  </li>
    </ul>
```

还是这个：

```html
<ul>
  <li>
    <a href="#">
      <i class="fab fa-facebook-f"></i> Facebook
    </a>
  </li>
  <li>
    <a href="#">
      <i class="fab fa-linkedin-in"></i> Linkedin
    </a>
  </li>
  <li>
    <a href="#">
      <i class="fab fa-twitter"></i> Twitter
    </a>
  </li>
</ul>
```

记得缩进你的HTML！你的代码应该看起来像一队[V型排列的鸭群](https://upload.wikimedia.org/wikipedia/commons/0/0b/Eurasian_Cranes_migrating_to_Meyghan_Salt_Lake.jpg) (需要VPN 🛡 )! 🦆🦆🦆

## 完成了吗？

一旦完成了，你就可以提交这个练习的代码给github，并使用以下命令将内容复制到下一个练习文件夹：

```bash
# 提交代码到 GitHub
git add .
git commit -m "添加内容到我的个人资料页面"
git push origin master

# 复制文件夹到下一个练习文件夹
cp -r ../profile ../../02-Fonts-and-colors
```



