## 背景和目标

在这个练习中，我们将使用[Vue](https://vuejs.org/)JavaScript框架。

Vue(读音 /vjuː/，类似于view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是,Vue被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

Vue的一大好处是，如果你使用它，你几乎再也不用手动`querySelector`或`addEventListener`！取而代之，你将在特定元素上使用常规的 `v-` HTML属性。

让我们一起开始我们的第一个Vue挑战练习！

## 模版

继续, 打开`index.html`和 `lib/index.js`然后查看里面的代码。

里面是一个带有许多选项框的HTML表单：
- 1x ”Check All“ 选项框
- 4x 带有各种种类名称的选项框

你可以启动webpack服务器：

```bash
yarn install
rake webpack
```

然后再在你的浏览器中打开相应网页：

```bash
open http://localhost:8080
```

你可以分别逐一的点击这些选项框，但是“Check All”选项框还没有一次性选择所有选项框的功能。这就是我们想要现在实现的功能，得益于JavaScript，和我们的新朋友:Vue.js。

## 第一步：安装Vue.js

**CDN**
对于制作原型或学习，你可以这样使用最新版本：

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

你可以复制这一行代码到`index.html`来使用Vue。

**NPM**
在用 Vue 构建大型应用时推荐使用**NPM**安装[1]。NPM 能很好地和诸如webpack或Browserify模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。

```bash
# 最新稳定版
npm install vue
```

接下来你可以继续使用Vue编写代码。

## 整体逻辑

我们需要做以下几件事：
- 检查“Check All”选项框的选择状态。
- 如果它被选择了，那么对于所有的目标选项框，我们将会`checked`属性改为`true`。
- 如果它没有被选择，那么对于所有的目标选项框，我们将会`checked`属性改为`false`。

## 选择`div`来进行交互

为了能够使用JS来和DOM交互，我们需要在我们的`new Vue({})`实例中使用`el`选项来选择我们想要控制的元素。这一次，我们可以选择整一个带有`container`类的`div`来和其中的所有元素进行交互。

## 监听一个事件
我们需要一个事件处理器在这里来监听`check-all`选项框的点击事件。所以，当每一次`check-all`选项框被点击时，一个方法（`checkAllBoxes`）将会被触发来帮我们实现上方所提到的逻辑。

除了我们之前学到的`querySelector`和`addEventListener`，你还记得我们在学习Vue的时候是如何处理事件的吗？

然后你需要在我们的`new Vue({})`实例中加一个`methods`选项并且在其中加入`checkAllBoxes`方法在里面。

<details>
  <summary markdown='span'>提示（先可以自己尝试，实在不行再打开提示哦！）</summary>  
  
  我们可以在`check-all`选项框中添加`v-on:click`或者它的缩写`@click`来监听它的`click`事件。

  ```html
  <input id='check-all' type="checkbox" class="form-check-input" @click="checkAllBoxes">
  ```

  ```js
  let app = new Vue({
    el: '#app',
    methods: {
      checkAllBoxes(event){
        // 这里添加代码
      }
    }
  })  
  ```
</details>

## 属性绑定

我们想要可以改变所有带有`check-all`和`checkbox-categoryName`的目标选项框。在Vue里，可以使用 _指令表达式_ 来帮助我们绑定属性。所以当`checkAllBoxes`方法被触发时，我们可以动态地操作属性的值。

<details>
  <summary markdown='span'>Hint</summary>  
  
  我们可以在选项框中使用`v-bind:checked`或者简写为`:checked`来实现动态操作。

  ```html
  <!-- index.html -->
  <!-- ... -->
  <input id='check-all' type="checkbox" class="form-check-input" :checked="allChecked" @click="checkAllBoxes">
  <!-- ... -->
  <input id='checkbox-appartment' type="checkbox" class="form-check-input" :checked="allChecked">
  <!-- ... -->
  ```

  ```js
  // index.js
  let app = new Vue({
    el: '#app',
    data: {
      // 把选项框默认为false
      allChecked: false,
    },
    methods: {
      checkAllBoxes(event){
        // 这里编写代码
      }
    }
  })  
  ```
</details>

## 操作属性

下一步就是去在`checkAllBoxes`方法中添加一些代码。请跟随我们一开始在`整体逻辑`中所提到的内容并想想我们该如何去操作`data`选项中的`allChecked`属性。

你现在已经有了所有你在这个挑战练习中所需要的东西。

记得在你的浏览器中去测试你的代码，并可以添加一些`console.log()`来了解你在`checkAllBoxes`方法中所处理的内容。

轮到你啦！