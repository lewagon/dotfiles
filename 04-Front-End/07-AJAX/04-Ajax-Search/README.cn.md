## 背景和目标

在这个挑战中你会使用[OMDb API](https://www.omdbapi.com/) (The Open Movie Database)。这个API将让你可以根据关键字检索电影信息。

在这个练习中，你需要实现一个`GET`请求发送到OMDb API，以便检索你想要的电影信息，并实现一个回调函数来在DOM中为每个电影注入一个卡片。

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-search.gif)

## 资源

[OMDb API文档](https://www.omdbapi.com/)

## 详细说明

在终端中使用`serve`启动你的本地服务器，然后打开`localhost:8000`。

### 视图逻辑

在这个练习的`index.html`文件中，你会发现一个页面分为两个主要部分：

* 一个带有文本输入框和提交按钮的**表单**，用于输入你的搜索并将其发送到API
* 一个带有 `movie-cards` id的**div**，你将在其中为每个电影注入一个卡片

下面是你向API发出请求应该使用的URL结构：

```
http://www.omdbapi.com/?s=MOVIE_TITLE&apikey=YOUR_API_KEY
```

例如，这是搜索`Harry Potter`电影的请求：

```
http://www.omdbapi.com/?s=Harry Potter&apikey=adf1f2d7
```

这里有3个API密钥可以用来发送请求（如果你的请求不再起作用，请随时更改）：

```
- adf1f2d7
- 48727053
- 8691812a
```

在`lib/index.js`文件中编写你的JavaScript代码。

### 捕获电影标题并发出请求

添加适当的事件监听器来捕获用户在点击`Search`按钮或按下键盘的`enter`键时输入的关键字。

然后将这个关键字存储在一个变量中，并构建你将在`fetch`请求中使用的url。

不要忘记这个API将返回一个JSON，所以你需要在访问结果之前进行几次操作。

在每一步中，考虑添加一些`console.log`来查看你正在操作的对象。

### 为每个电影向DOM插入一个卡片

一旦你能够`console.log` API请求的结果，就开始实现回调函数，它将在带有`movie-cards` id的div中为每个电影插入一个卡片。

这是你可以使用的卡片的html（但是请随意创建你自己的）：

```html
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="card mb-2">
    <img src="https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg" class="card-img-top" alt="Harry Potter and the Half-Blood Prince">
    <div class="card-body">
      <span class="badge bg-primary mb-2">2009</span>
      <h5 class="card-title">Harry Potter and the Half-Blood Prince</h5>
    </div>
  </div>
</div>
```

### 选做：在`keyup`的时候刷新结果

现在所有的逻辑都已经实现了，试着更新你的代码，每当用户输入一个新的字母时刷新结果。

搜索愉快！
