## 背景和目标

在这个练习中，我们将从API中检索数据，并练习使用我们在讲座中看到的`template`元素来显示它。

## 详细参数

你将构建一个搜索应用程序，使用[The MealDB API](https://www.themealdb.com/api.php)搜索食谱并将其添加到收藏夹中。

你可以使用[这个端点](https://www.themealdb.com/api.php#:~:text=Filter%20by%20main%20ingredient)来按成分搜索食谱。

你的目标是在`index.js`中实现搜索逻辑，这样当你点击搜索时，我们就可以按成分进行过滤。

使用以下命令在浏览器中打开html页面：

```bash
serve
```

你应该看到一个带有搜索输入的表单。

- 当我们输入成分时，页面**不应该重新加载**，我们将使用模板元素在`#recipes-container`列表中显示每个食谱。
- 如果没有使用该成分的食谱，我们应该看到一个指示没有结果的消息。
- 一旦搜索可以工作了，挑战的第二部分将是通过点击书签图标来收藏你想要的食谱。
- 收藏后，该食谱将出现在`#favourites-container`列表中。

![App  boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-1.png)

## 搜索食谱

### 实现API调用

首先，让我们实现按成分搜索食谱的API调用。

让我们为`#search-input`输入添加一个事件监听器，并在用户点击搜索按钮时调用端点，将成分插入你正在调用的URL中。

你应该使用fetch和`console.log(data)`来查看API的响应。

### 显示结果

现在我们有了结果，让我们在`#recipes-container`列表中显示它们。首先让我们在HTML中创建一个具有以下结构的模板元素：

```html
<template id="recipe-template">
  <div class="col-5">
    <div class="card my-2 position-relative">
      <i class="fa-solid fa-bookmark text-danger ms-2 position-absolute top-0 end-0 p-2 fs-4"></i>
      <img src="" class="card-img-top" alt="">
      <div class="card-body d-flex">
        <h6 class="card-title">Recipe Title</h6>
      </div>
    </div>
  </div>
</template>
```

然后，让我们创建一个函数`insertRecipes`，它将在我们的列表中插入结果。它应该传递哪些参数？

让我们使用两个参数创建函数：`recipes`，`container`。第一个参数将是我们从API获取的食谱数组，第二个参数将是我们想要插入食谱的容器。

我们将使用`forEach`方法遍历食谱数组，对于每个食谱，我们将克隆模板元素，并将食谱数据插入到正确的位置。轮到你了！（提示：检查讲座笔记以查看如何克隆模板元素）

你应该看到一个使用你在搜索输入中输入的成分的食谱列表：

注意：你可以直接在浏览器中访问[这个端点](https://www.themealdb.com/api/json/v1/1/list.php?i=list)来查看你可以按成分搜索的完整列表。

![App  boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-2.png)

## 收藏食谱

### 为书签图标添加事件监听器

现在我们可以搜索食谱了，让我们添加收藏它们的功能。

让我们选择所有的`fa-bookmark`图标，并为每个图标添加一个`eventListener`。当我们点击其中一个时，我们将把食谱添加到`favourites`变量中，并在`#favourites-container`列表中显示所有食谱。`favourites`应该是什么数据类型？

我们只在按成分搜索后才会在食谱卡上看到书签图标。因此，我们需要在将食谱插入列表后，即在同一个`fetch`方法中，为书签图标添加事件监听器。

为此，让我们创建一个`addFavouriteListeners`函数，它将为书签图标添加事件监听器。它将选择所有的书签图标，并为每个图标添加一个`click`事件监听器。

### 将食谱添加到收藏夹列表中

为此，让我们创建一个函数`addRecipeToFavourites`作为每个收藏事件监听器的`callback`函数。

点击后，我们需要检索食谱的所有元素（它的`idMeal`，`strMeal`，`strMealThumb`），然后将它存储在`favourites`变量中。

我们需要将食谱作为此函数的参数传递，以便我们可以访问我们需要显示的数据。从`event`中，你可以重建食谱对象，这样我们就可以保存它的所有细节：

```js
const newRecipeToAdd = { idMeal: ..., strMeal: ..., strMealThumb: ... };
```

然后，我们可以将这个食谱对象增添到`favourites`变量中。

让我们克隆模板元素，并将食谱数据插入到正确的位置。等等！我们已经有一个可以做到这一点的方法了！

`insertRecipes`，以食谱列表和容器作为参数，并将食谱插入容器。让我们使用它！

![App  boilerplate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-recipe-book-3.png)

## 笔记

我们的应用程序使我们可以按成分搜索食谱并将其添加到我们的收藏夹中。这里的一个问题是，每次重新加载页面时，我们都会丢失我们的收藏夹。

为了解决这个问题，我们可以使用[`localStorage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)将我们的收藏夹存储在浏览器中。然后我们可以在页面加载时检索它们。但是不要担心，你将在下一课的挑战中了解更多关于`localStorage`的知识！

注意：Web应用程序实际上通常由两个应用程序组成：一个用于存储数据的后端，一个用于检索数据并使用框架显示数据的前端。在这个挑战中，我们创建了一个处理用户界面的前端应用程序，而我们正在从API中获取数据。

我们将在下一个模块中看到Rails同时处理这两个问题💪

## 附加题（选做）

- 使用`includes`方法来检查一个食谱是否已经被收藏。
- 在搜索后清除搜索输入。
- 添加一个按钮来清除收藏夹列表。
