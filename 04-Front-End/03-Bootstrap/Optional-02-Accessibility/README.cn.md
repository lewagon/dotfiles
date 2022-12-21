## 背景和目标

作为开发人员，当我们编写代码时，我们倾向于关注网页在_我们看来的样子_，可能忽略了其他人的需求。可访问性是为每个人建立网站的艺术，就包括了一些有残疾和障碍人士。很多人访问网站时都会使用**辅助技术**，比如屏幕阅读器、放大软件来缩放内容、语音输入软件、替代性输入设备，如眼球追踪器、头部指示器等等。

编码的选择对这些技术如何衔接用户的障碍有着巨大的影响。但是，编写无障碍应用程序并不是一门晦涩的科学，也不是一门独立的语言，它只是一系列明智的原则。只要有正确的代码，你就能为每个人打造出美好的应用。


## 详细说明

这个挑战更像是一个教程。你将修复一个没有任何包容性的页面，并发现无障碍性的关键所在：**样式[Styling]**、**语义[Semantics]**、**[焦点Focus]**

![主要话题main topics](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/main-topics.png)

**设置**

先运行一个服务器：

```bash
cd accessibility-guidelines
serve
```

我们强烈建议使用 Chrome 浏览器。您将大量使用**开发者工具**面板，其中Chrome内置了许多有用的无障碍工具。打开开发者工具并将其放在右侧。

![Chrome 设置](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/chrome-setup.png)



## 样式

[样式专题](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/styling-topic.png)

细微的设计选择会使内容难以阅读。视觉障碍是非常普遍的，很大一部分人都戴着眼镜，色盲者看到的颜色是不同的光谱。风格化应用程序的目标是在漂亮的图形和可读性之间找到正确的平衡。


### 为UI警告添加文本

![Vision](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/vision.png)

1. 打开**渲染Rendering**面板（通过**更多工具**菜单）。
2. 找到最后一个菜单**模仿视觉缺陷 Emulate Vision Deficiencies**，测试所有的渲染差异。
页面中的注释`textarea`用粉色边框勾勒，指出错误。选择红色盲障碍或绿色盲障碍时很难辨别吧？
3. 打开`index.html`，在`textarea`下添加错误信息。

<details>
<summary markdown='span'>查看解决方案</summary>

```html
<p class="error-message">注释不能为空</p>
```
</details>

### 增加对比度

![对比](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/contrast.png)

1. 打开**元素**选项卡中的**样式**面板。
2. 检查主标题`<h1>`，注意对比度分数被标记为不足。太过相似的颜色容易融合在一起，降低可读性。
3. 为所有标题选择对比度合适的颜色。直接从**选色器**测试，实时查看差异。
![选色](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/color.png)
4. 更新`style.css`中的颜色选择。


### 让字体大小更舒适

![对比](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/font-size.png)

1. 打开Chrome设置（`cmd ,`或`ctrl ,`）。
2. 选择**外观**菜单
3. 将默认的字体大小从`Medium`改为`Very Large`，然后回到[localhost:8000](http://localhost:8000)。你可能以为会看到文字变大。其实它并没有什么变化，这是因为有些字体大小是以像素为单位设置的。只有相对的[单位units](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)才会按照浏览器的默认值按比例变化。
4. 在`styles.css`中用相对单位(`rem`)代替字体大小。增加`<p>`的字体大小，更舒适。使用Blurred vision模拟器来测试你的变化。


### 允许应用程序具有响应性

![ Viewport视窗](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/viewport.png)

1. 在开发者工具中，点击**切换设备工具栏[Toggle device toolbar]**按钮。
2. 选择一个移动预设(mobile preset)。你的页面看起来比预期的要小，而且缩小了。这是手机显示网页内容方式的结果：它们以更大的宽度呈现，并将整个页面放大。这是有意为之，因为大多数网站都是针对水平屏幕进行优化的。
3. 在`index.html`中，强制[viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)将设备尺寸视为页面的宽度。在`<head>`中添加必要的meta标签。

<details>
<summary markdown='span'>查看解决方案</summary>

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
</details>


## 语义

![语义学专题](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/semantics-topic.png)

![语义](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/semantics.svg)

这两个网站看起来很相似，但实际上却有很大的不同。第一个是依靠CSS来组织页面的显示。第二个则是依靠HTML元素的自然作用。最后的结果是一样的吗？**不一样，因为辅助技术是无法准确描述第一种**。

在幕后，辅助技术依靠代码来渲染页面，就像浏览器一样。但它需要一个**语义**信息的叠加，才能够命名，并且向用户描述这些元素。例如，要对`<a>`标签进行可理解的音频描述。

![音频](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/audio.png)

工具除了阅读之外，还可以做很多事情，它们扩展了导航功能。VoiceOver建立了主要元素的摘要，可以直接访问，这里是一个标题列表：

![VoiceOver](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/voiceover.png)

语义信息是从以下方面推断的：
- 本地[HTML5元素](https://developer.mozilla.org/en-US/docs/Glossary/semantics)，如标题、导航等。它们具有隐含的作用，被广泛的辅助工具所理解。
- [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)，一套完整的属性，可以修补缺失的信息。对了，你可以在Bootstrap组件中找到很多aria属性的例子。Bootstrap很[符合可访问性标准](https://getbootstrap.com/docs/4.5/getting-started/accessibility/)，一定要保留这些属性，它们很有用!

![用户交互 User Interface](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/user-interface.svg)

### 使用正确的HTML标签

尽可能地利用HTML标签的本地作用和行为。例如，总是使用`<a>`或`<button>`来表示可点击元素。在你的代码中添加一个`cursor: pointer;`的css规则是一个[代码异味 code smell](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%A0%81%E5%BC%82%E5%91%B3)!

![无障碍面板 Accessibility panel](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/accessibility.png)

1. 打开**可访问性**面板。
2. 使用**检查工具**，检查`<h1>`标签和一个`<div>`。
3. 每次都要看一下面板中的可访问性属性。`role`属性是最重要的一个属性。
如果你喜欢探索更多的内容，可以在页面中逛逛。你会发现，**非语义**元素和**语义**元素之间有很大的区别，比如`<div>`或`<span>`，它们只是通用的容器，而`<h1>`、`<nav>`等**语义**元素则有特定的角色作用`role`。
4. 用正确的HTML5标签替换通用的`<div>`标签：
  - 使用`<header>`、`<main>`和`<footer>`的结构
  - `<h2>`和`<h3>`作为标题
  - `<p>`作为段落

### 连接相互作用的元素

输入元素有很多特定的属性来转述它们的复杂行为。看到它们的`name`属性了吗？它填充了另一个标签的文本，标签[`标签 label`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)。标签（lables）总是与输入（inputs）在一起的。

1. 当你点击 "样式" 二字时，它会选择相关的复选框。
2. 当你尝试点击 "是" 的时候，和之前的测试相比，似乎坏了。这是因为 "是" 在HTML中没有被标记为标签`label`。
3. 打开`index.html`，给单选按钮 "是" 和 "否" 添加缺失的标签，`for`属性指向输入的`id`。
4. "缩放比例 "的输入应该填写数字，但声明的类型是`text`。找一个更合适的[输入类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input)，以便能正确描述。

<details>
<summary markdown='span'>查看解决方案</summary>

```html
<input type="radio" name="explanations" id="yes">
<label for="yes">是</label>
<input type="radio" name="explanations" id="no">
<label for="no">否</label>
```
</details>

### 补充缺失的信息

当信息只是视觉上的，或者不能没有上下文的时候，我们必须用语义代码来支撑，为所有用户提供类似的体验。当没有原生的HTML元素与情况相关时，[ARIA属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)就会派上用场。

1. 用[`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img)属性为图片添加替代性描述。
2. "点击这里"("click here")的链接太过模糊，用明确的意图代替文字，既使用"无障碍原则"。
3. 给没有文字的按钮添加ARIA属性。
4. 在`html`标签中指定语言：`<html lang="en">`。如果这个属性缺失，屏幕阅读器将回退到它们的默认语言。
5. 在`<head>`中插入页面的`<title>`，它将在切换标签页时被读取。

<detail>
<summary markdown='span'>查看导航按钮的解决方案</summary>
    
```html
<button class="toggle-nav" aria-label="Toggle menu"></button>
```
</details>

<details>
<summary markdown='span'>查看页脚链接的解决方案</summary>

```html
<a href="#top" class="to-top" aria-label="Back to top"></a>
```
</details>

<details>
<summary markdown='span'>查看标题的解决方案</summary>

```html
<title>可访问性准则</title>
```
</details>


## 焦点（Focus）

![焦点话题Focus topic](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/focus-topic.png)

你有没有注意到在表单中输入时的蓝色轮廓？有些开发人员用CSS删除它，因为它不适应他们的设计。请不要这样做! 这个蓝色轮廓是一个**焦点环**，它对键盘用户非常重要。

只有交互式元素才能接受焦点，内容项（文本和图片）是不能接受焦点的。焦点从元素跳转到元素的顺序与HTML相同。尽管可以用[`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)属性来管理顺序，但这被认为是一种反模式（anti-pattern）。

![链接Link](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/link.png)

1. 练习只用键盘导航。
    - `⇥` TAB在页面中向前移动，`⇧` Shift + `⇥` TAB向后移动
    - `↑ ↓ ← →` 箭头键选择表单中的数值
    - 用 Space 空格键勾选复选框
    - `↵` 回车提交

    你有没有注意到，你按了三次TAB都没有任何反馈？其实你聚焦了隐藏的导航部件的三个链接。提示：当一个元素在你的眼里是隐藏的，并不意味着它真的在代码中被隐藏了。

2. 在`focus.css`中切换导航[`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)。
    <details>
    <summary markdown='span'>查看解决方案</summary>

    ```css
    nav.close ul {
      visibility: hidden;
    }
    ```
    </details>

3. 现在CSS已经固定了，打开导航，再试着将其聚焦。我们需要修复最后一件事：第一个被聚焦的应该是导航链接。打开`index.html`，将`<nav>`代码移到`<main>`容器之前。


## （选做） 测试结果


### LightHouse (Google)
Lighthouse是一个审计工具，用于测试可访问性和其他方面。你可以在上面测试你修复的页面。
[Lighthouse 解释](https://developers.google.com/web/tools/lighthouse/) (需要VPN 🛡 )。如果你在第一次启动时遇到困难，请尝试重启Chrome。


### 微软的无障碍见解手册 Accessibility Insights (Microsoft)
安装[Accessibility Insights](https://accessibilityinsights.io)以运行审计。


### 屏幕阅读器
- [旁白 VoiceOver on Mac](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=7) (需要VPN 🛡 )
- [NVDA for Windows](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=9) (需要VPN 🛡 )


## 阅读更多

- [developer.google上的"无障碍"](https://developers.google.com/web/fundamentals/accessibility/)
- ["Accessible to all" on web.dev](https://web.dev/accessible/)
- [Adobe博客上的"The POUR Methodology"](https://theblog.adobe.com/design-with-accessibility-in-mind-the-pour-methodology/)
- [a11y项目](https://www.a11yproject.com/)
- ["A11ycasts with Rob Dodson" on Youtube](https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [视障人士如何浏览网络](https://uxdesign.cc/how-visually-impaired-people-navigate-the-web-7f9eab9d9c37)
- ["An overview of accessible web applications and widgets" on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)
