## 背景和目标

在本次挑战中，我们将仔细研究我们在讲座中看到的 Fork API。目的是更熟悉如何进行 API 请求、如何读取响应并使用响应将其插入到 HTML 中。

## 详细说明

你将编写一个搜索应用程序，用来筛选 [The Fork API](https://the-fork-api.students.lewagon.co/)里的餐厅。

你的目标是在 `index.js` 中实现搜索逻辑，以便在搜索时可以按类别进行筛选。

使用以下命令在浏览器中打开HTML页面：

```bash
serve
```

你将看到一个有所有不同餐厅类别的表单。

- 当我们选择一个类别并点击"搜索(Search)"时，页面**不应该**重新加载。我们的目标是在右侧显示筛选后的餐厅列表。
- 如果没有该类别的餐厅，那我们应该看到一个告诉我们没有符合条件餐厅的信息。
- 每次进行新的搜索时，列表应该先重置，再展示新的餐厅。
- 你可以使用 Bootstrap的[**flush list**](https://getbootstrap.com/docs/5.2/components/list-group/#flush)来展示餐厅。但你也可以发挥自己的创意！

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-1.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```

## 阅读文档

我们将使用[The Fork API](https://the-fork-api)。每次当我们使用新的 API 时，首先阅读文档以找到我们**需要的端口**并了解如何构建请求。这非常重要。

## 重构

一旦搜索可以按照预期运行了，我们就应该让我们使代码更易读，避免太多的缩进和嵌套，就像我们在前一个挑战中做的那样。

让我们创建两个新函数，从`addEventListener` 回提炼出一些逻辑：

- 首先写一个`insertResults`方法，它负责在列表中插入结果。它应该接受哪些参数呢？
- 第二个是`buildSearchUrl`方法，它负责找到我们选好的分类，并用这个分类来构建进行查询的 URL。它应返回**带有搜索查询参数的URL**。

结束的时候，你的代码应易于阅读，并且不应具有超过 1 个级别的锁紧！

## 展望未来

当搜索类别的功能完成后，你可以加入地理位置，这样我们就可以通过类别和位置进行搜索 🎉

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-2.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```
