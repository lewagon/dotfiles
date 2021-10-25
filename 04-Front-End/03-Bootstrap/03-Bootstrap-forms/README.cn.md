## 背景和目标

搭建一个[响应式报名表](https://lewagon.github.io/bootstrap-challenges/10-Login-form/)。

**⚠️在开始之前，请仔细阅读以下所有说明⚠️**。表单是网站中最重要的组件之一，所以你需要知道如何设计它们!

## 网格偏移技术

制作响应式表单的最佳技巧是将其注入Bootstrap网格中的一个具有`justify-content-center`对齐类的**行**中。**记住**每个`.row`都是一个flexbox，我们可以使用flexbox的对齐技巧来使得我们的表单变得响应式。

```html
<div class="container">
  <div class="row justify-content-center"> <div class="row justify-content-center">
    <div class="col-12 col-sm-4">
      <form action="">
        <!--你的表单内容 -->
      </form>
    </div>
  </div>
</div>
```

该表单在手机上将是全屏的。
- 在平板电脑和更大的设备上，它将被居中（归功于`justify-content-center`对齐类），并将占据33%的屏幕。
- 你也可以让它变得更有响应性（移动设备上的全屏，平板电脑上的半屏居中，笔记本电脑上的33%屏幕居中等等）。


## HTML表单

一个HTML `<form>` 是由不同的 `<input>`行组成的（即表单的每个字段）。每个输入可以有一个相关的`<label>`，也可以没有。提交表单的按钮也是一个带有`type="submit"`的输入。下面是一个表单的样子：

```html
<form action="#">
  <label for="your-email">您的电子邮件</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="sign In">
</form>
```

1. 有不同类型的 `<input>` (`type="text"`, `type="email"`, `type="date"`, 等)
2. `placeholder`是一个文本范例，当用户开始写作时，它就会消失。
3. 标签`for="something"`是与`id="something"`的输入链接在一起的。链接该标签和输入不仅是只是为了好玩。它允许我们在该行的任何地方点击，使光标跳转到相关的输入中（而不是必须在文本框内点击）。这是更好的用户体验!
4. `value`属性是在提交按钮上显示的文本。

而下拉列表有点不同。**他们有自己的`<select>`标签和`<option>`标签，用于列表中的每个选项**。它们的HTML：


```html
<label for="favorite">您最喜欢的语言是什么？</label>
<select id="favorite" name="language">
  <option value="ruby">Ruby</option>
  <option value="css">CSS</option>
  <option value="javascript">Javascript</option>
</select>
```


## Bootstrap表单类

现在我们来说说Bootstrap的表单类：

- 除了提交按钮，`.form-control`设计每个`<input>`或`<select>`。
- `.form-group`将每个`<input>`或`<select>`与其关联的`<label>`进行分组。

**带有标签的**Bootstrap表单示例：

```html
<form action="#">
  <div class="form-group">
    <label for="email">您的邮箱</label>
    <input type="email" id="email" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">您的密码</label>
    <input type="password" id="password" class="form-control">
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

**无标签**的Bootstrap表单示例：

```html
<form action="#">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

现在，如果你想要一个行内表单[inline form](https://getbootstrap.com/docs/4.2/components/forms/#inline-forms)，你可以**添加`.form-inline`类到`<form>`**中(与`.list-inline`类用于列表`<ul>`一样)：

```html
<form action="#" class="form-inline">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

## 在表单中注入`.form-row`

你也可以使用`.form-row`类在表单中注入一行。以下例子，可以在同一行有2个`input`:

```html
<form>
  <div class="form-row">
    <div class="col-6 form-group">
      <label>名</label>
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col-6 form-group">
      <label>姓</label>
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
  <!-- 下面是表单的其余部分 -->
</form>
```

## 轮到你了

- 你来建立一个[响应式注册表单](http://lewagon.github.io/bootstrap-challenges/10-Login-form/)。
- 试着在`components/form.css`中来设计。

注意：如果您的页面似乎无法显示您的当前代码，不要忘记**硬刷新**您的浏览器（`cmd + shift + r`）以清除您的浏览器缓存。
