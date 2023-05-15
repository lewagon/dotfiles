## 背景和目标

在本次挑战中，我们将仔细研究我们在讲座中看到的 Fork API。目的是更熟悉如何进行 API 请求、如何读取响应并使用响应将其插入到 HTML 中。

## 详细说明

你将编写一个搜索应用程序，用来筛选 [The Fork API](https://the-fork-api.students.lewagon.co/)里的餐厅。

您的目标是在 `index.js` 中实现搜索逻辑，以便在单击搜索时可以按类别进行过滤。

使用以下命令在浏览器中打开 HTML 页面：

```bash
serve
```

您将看到一个带有所有不同餐厅类别的表单。

- 当我们选择一个类别并点击“搜索”时，页面不应重新加载，目标是在右侧显示过滤后的餐厅列表。
- 如果该类别没有餐厅，我们应该看到一个指示没有结果的消息。
- 在显示新餐厅之前，每次进行新搜索时列表都应该重置。
- 您可以使用 Bootstrap 的 flush list 来显示餐厅。但是如果您喜欢，可以随意创意！

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

我们将使用 [The Fork API](https://the-fork-api)，因此，当我们使用新的 API 时，首先阅读文档以找到我们需要的端点并了解如何构建请求非常重要。

重构
一旦搜索按预期工作，让我们使代码更易读，避免太多的缩进级别，就像我们在前一个挑战中做的那样。

让我们创建两个新函数，以从 addEventListener 回调中提取一些逻辑：

- 首先是一个 insertResults 方法，它将在我们的列表中插入结果。哪些参数应该传递给它？
- 第二个是一个 buildSearchUrl 方法，它将查找选择的类别并构建我们需要进行查询的 URL。它应返回带有搜索查询参数的 URL。

最后，您的代码应易于阅读，并且不应具有超过 1 个缩进级别！

## 接下来

一旦您的搜索适用于类别，让我们加入位置，这样我们就可以通过类别和位置进行搜索 🎉

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-2.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```
