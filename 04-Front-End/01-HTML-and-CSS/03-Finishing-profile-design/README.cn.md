## 设置

同样，如果你还没有复制上一次练习中的文件，让我们把上一次练习中的个人资料文件夹复制到本次挑战的当前目录中：

```bash
cp -r ../02-Fonts-and-colors/profile .
```

## 背景和目标

通过将您的个人资料信息分割到不同的`<div>`标签中，来玩转 盒子模型（Box Model）(`margin/border/padding/width/height`)。再使用高级CSS选择器（如id、class（类）、grouping、descendant（后代）等选择器）来设计和微调你的页面。

如果你的页面不能显示你当前的代码，不要忘记**硬刷新**你的浏览器(MacOS用 `cmd + shift + r`, Windows用 `ctrl` + `F5` )来清除浏览器的缓存!

## 详细说明

### 步骤1：盒子模型（Box Model）

这里是[你的目标](https://lewagon.github.io/html-css-challenges/03-box-model-and-selectors/)。

- 你应该在你的页面中使用以下结构：

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
</div>
```

- 这里的`<div class="container">`使用左右边距将页面内容居中，以防止它占据100%的窗口（那样不好看）。
- `<div class="card">`用于将信息分组到一个白色方框中。
- 为你的卡片添加很酷的装饰，使用CSS属性，如背景`background`，边界`border`，边界圆角`border-radius`和框架阴影效果`box-shadow`。记住保持简单，使用白色背景，微小的半径以及阴影（如你在课程视频中看到的那样）。

### 步骤2：选择器

任何时候，当你想为页面中的一个元素**命名**时，请问自己如下问题：

- 我应该用`class`还是`id`？它是唯一的还是可重复使用的？
- 我应该为我的`class`取什么名字？遵从`component-shape`的命名方式，如`button-round`, `card-square`。
- 我应该把这个设计的一个大类拆分成几个`class`吗？

下面是一个**坏的**CSS代码的例子：

```css
#home-page-first-image {
  border-radius: 50%;
}
.home-card {
  text-align: center;
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

而这里是**好的版本**：

```css
.img-circle {
  border-radius: 50%;
}
.text-center {
  text-align: center;
}
.card-white {
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

- 制作圆形图像（image circle）和文本居中是**常见的设计任务**。它们应该有属于自己的可重复使用的类，而不是混在其他CSS class或id中！
- 不要重复自己的工作，尽量使用**通用的类名**。把每一个CSS class都看作是一个可重复使用的设计，你可以在网站中任何地方应用。这个是CSS初学者的主要障碍。


## 进一步的建议和资源

### 主容器（Container）

这里是主容器的div居中技术：

```css
.container {
  width: 500px; /* 此处设置宽度*/。
  margin: 0 auto; /* 这将自动设置左/右边距*/。
}
```

### 内联清单

要设计你的图标列表，你必须通过**内联来改变列表项的`块`（`block`）行为**。下面是相应的CSS规则：

```css
.list-inline > li {
  display: inline-block;
  padding: 0px 20px;
}
```

即使是内嵌式，一个列表`<ul>`也有一些`padding-left`（内边距区域中左边的宽度）和要点（bullet points），你也必须要使用内联来得到一个更好看的列表：

```css
.list-inline {
  list-style: none;
  padding-left: 0px;
}
```

从这个练习开始往下，**重点是去使用浏览器的开发者工具“检查”（`inspect`）**，可以写最终的代码之前，在浏览器中来调整和测试你的CSS。

## 完成了吗？

一旦完成了，你就可以提交这个练习到github，并使用以下命令将代码复制到下一个练习文件夹：

```bash
# 提交代码到 GitHub
git add .
git commit -m "添加div到我的个人资料页面"
git push origin master

# 复制文件夹到下一个练习文件夹
cp -r profile ../04-Responsive-profile
```

