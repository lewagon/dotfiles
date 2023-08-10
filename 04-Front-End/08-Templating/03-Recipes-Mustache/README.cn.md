## 背景与目标

在这个挑战中，你将会用到[Mustache.js](https://github.com/janl/mustache.js)来创建一个看不同食谱的APP。

### 设置

让我们启动一个本地web服务器：

```bash
serve
```

然后，在浏览器中打开[`localhost:8000`](http://localhost:8000)。

### 数据

在`index.html`文件中，我们现在有：

```html
<script type="importmap">
  {
    "imports": {
      "mustachejs": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"
    }
  }
</script>
```

这意味着你已经可以使用Mustache.js了👨

在`lib/recipes.js`文件中，有一个为你准备的食谱列表。

```js
const recipes = [
  {
    name: "Coq au Vin",
    ingredients: ["chicken", "red wine", "bacon", "mushrooms", "onions", "garlic"],
    difficulty: 7
  },
  {
    name: "Ratatouille",
    ingredients: ["eggplant", "zucchini", "bell peppers", "tomatoes", "onions", "garlic"],
    difficulty: 3
  },
  {
    name: "Croissant",
    ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
    difficulty: 9
  },
  {
    name: "Bouillabaisse",
    ingredients: ["fish", "shellfish", "tomatoes", "fennel", "onions", "garlic", "saffron"],
    difficulty: 10
  }
]
```

请花一点时间看一下其中一个食谱，看看它的数据结构是如何设置的。例如：

```js
{
  name: "Croissant",
  ingredients: ["flour", "butter", "yeast", "sugar", "salt"],
  difficulty: 9
}
```

这是一个`Object`（类似于Ruby的`Hash`），所以它有**keys和values**。你需要记下这里有哪些keys以及values的类型（`String`，`Number`，`Array`等）。

这个挑战的目标是使用Mustache.js在DOM中显示这个数组的数据。

### HTML

这是一个食谱的HTML片段：

```html
<div class="col col-lg-4">
  <div class="card mb-3">
    <div class="card-header">
      <h2>Croissant</h2>
    </div>
    <div class="card-body">
      <h5 class="card-title">Ingredients:</h5>
      <ul class="list-group">
        <li class="list-group-item">Flour</li>
        <li class="list-group-item">Butter</li>
        <li class="list-group-item">Yeast</li>
        <li class="list-group-item">Sugar</li>
        <li class="list-group-item">Salt</li>
      </ul>
      <h5 class="card-title mt-3">Difficulty: 9/10</h5>
    </div>
  </div>
</div>
```

让我们把这个HTML放在`index.html`文件中的`<template>`标签中（这次还没有！）。确保给你的`<template>`一个`id`，这样你就可以很容易地在后面选中它💪

### 显示列表

然后，你需要遍历你的`recipes`（类似于前面的挑战），并在每个食谱的`<template>`中显示HTML。但是，这次让我们使用Mustache.js来做。下面是如何使用Mustache.js来渲染HTML的示例（在JS中）：

```js
// 假设我们在页面上有一个`<template>`元素，它的`id`是`#myTemplate`。
const template = document.querySelector("#myTemplate").innerHTML
const output = Mustache.render(template, {});
```

#### 使字段动态化

但是现在我们所有的食谱都是“Croissant”，因为我们的代码是固定写好的😿所以，让我们把它变成动态的！在Mustache模板中，你可以使用HTML中的mustaches来使模板的一部分动态化👨，就像这样：

```html
<template id="myTemplate">
  <div>{{ message }}</div>
</template>
```

然后，在JavaScript中，你可以像这样将信息传递到这些动态插槽中：

```js
const template = document.querySelector("#myTemplate").innerHTML;
const output = Mustache.render(template, { message: "Hello, world!" });
```

你能看到`Mustache.render`的第二个参数是一个JavaScript对象，它包含了所有的信息，根据对象中的keys来填充`{{ }}`之间的信息吗？

所以，现在轮到你了。试着在你的模板中使用`{{ }}` mustaches来动态地渲染`title`，`difficulty`和`ingredients`。

请注意，如果你想在Mustache.js中遍历一个数组，你可以这样做：

```html
<template id="musicians">
  {{#musicians}}
    <p>{{.}}</p>
  {{/musicians}}
</template>
```

```js
const template = document.querySelector("#musicians").innerHTML;
const output = Mustache.render(template, { musicians: ["Britney Spears", "Christina Aguilera", "Backstreet Boys"] });
```

`{{.}}`占位符代表`musicians`数组中的每个项目，它将在渲染过程中被相应的值替换。
