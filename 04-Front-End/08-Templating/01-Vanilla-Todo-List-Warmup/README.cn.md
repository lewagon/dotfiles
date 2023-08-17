## 背景和目标

欢迎来到你的第一个Templating挑战！在这个挑战中，你将通过制作一个静态的待办事项列表来练习使用JavaScript渲染HTML。

**🛑 在这个挑战中不要使用 `<template>` 标签。这是下一个挑战中的内容。你可以在这个挑战中使用字符串插值。**

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-static.png)

### 设置

让我们通过运行以下命令来启动本地Web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。

### 数据和HTML

在你的`lib/to-do-list.js`文件中，你应该能够找到以下两段代码。

1. 数据：待办事项数组

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
];
```

- `title`：一个包含项目内容的字符串。
- `done`：一个布尔值，表示项目是否完成。

2. 模板：一个待办事项HTML代码片段

```html
<div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
  <input class="d-flex form-check-input me-1" type="checkbox">
  <div>To-do title...</div>
</div>
```

### 动态生成HTML

轮到你来显示待办事项了！想想你如何根据`todos`数组动态生成HTML。

#### 如何动态渲染复选框

[复选框](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)根据`checked`属性是否存在而被选中。

```html
<!-- this checkbox is checked -->
<input type="checkbox" name="Checkbox 1" checked>

<!-- this checkbox is unchecked -->
<input type="checkbox" name="Checkbox 2">
```

在JavaScript中，你可以将元素的`checked`属性设置为`true`或`false`。

```js
const checkbox = document.querySelector("input[type=checkbox]")
checkbox.checked = true; // renders a checked checkbox
checkbox.checked = false // renders an unchecked checkbox
```

现在，轮到你根据每个待办事项的`done`值来设置`checked`属性的值了！
