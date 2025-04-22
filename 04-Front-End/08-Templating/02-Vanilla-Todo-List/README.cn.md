## 背景和目标

在这个挑战里，你将创建**同样的待办事项列表**，但是这次，**使用 `<template>` 标签**。

### 设置

让我们通过运行以下命令来启动本地Web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。

### 数据和HTML

在你的`lib/to-do-list.js`文件中，你应该能够找到一个待办事项清单。

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true }
];
```

在`index.html`文件中，有一段待办事项HTML代码片段，这次是**在 `<template>` 标签中**，使用Bootstrap进行了样式设置。

```html
<template id="todoItemTemplate">
  <div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
    <input class="d-flex form-check-input me-1" type="checkbox">
    <div>To-do title...</div>
  </div>
</template>
```

### 选择 `<template>` 以动态生成HTML

现在你需要选择 `<template>` 标签并克隆它的内容。然后将标题插入到正确的位置，相应地更改 `checked` 属性，并将其插入到待办事项容器中。

还记得如何选择和克隆模板标签内的内容吗？这里有一个小例子。

```js
const template = document.querySelector("#idOfTheTemplate");
const clone = template.content.cloneNode(true);
```

如果你需要回顾一下知识，请回到今天的幻灯片。祝你好运！
