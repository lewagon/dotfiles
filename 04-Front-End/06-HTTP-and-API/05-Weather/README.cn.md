## 背景和目标

在这个挑战中，我们将使用[OpenWeatherMap API](https://openweathermap.org/)! 我们将再次练习AJAX，并了解如何向用户询问他们的当前位置！

## 详细说明

启动你的本地网络服务器`localhost:8000`：

```bash
serve
```

### 获取你的API密钥 （你和你的伙伴需要1个）

首先，去[OpenWeatherMap API](https://home.openweathermap.org/)并创建一个帐户来获取API密钥。你应该在[这里](https://home.openweathermap.org/api_keys)找到它。你们都将在同一时间创建帐户，这可能会在Open Weather激活钥匙过程中造成一些延迟。为避免此问题，**与你的伙伴共享API密钥**以限制要激活的密钥数量。

你可以免费执行60次调用/分钟，这对于这个挑战来说应该足够了。

### 实时天气

阅读[实时天气 API 文档](https://openweathermap.org/current) 来找到我们想要调用 `fetch` 的端点。找到它了吗？**不要忘了url总是以 `http://`开头** (或 `https://`).

在编写任何代码之前，请你尝试在浏览器中打开url以查看是否收到响应。如果你得到一个 `401` ，这意味着你忘了传送你的API密钥！可以使用 `appid` 参数将其添加到url的**查询字符串**：

```bash
&appid=YOUR_API_KEY
```

一旦你成功在浏览器里展示了API的响应的结果，让我们开始JavaScript的部分。

### 在页面中显示数据

使用API返回的数据，你可以创建以下页面：

![实时天气](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/weather_api.png)

想要得到摄氏度的温度，你可以在请求的url中添加 `&units=metric` .

想要得到图标图片，你可以使用这个url: `https://openweathermap.org/img/w/{iconId}.png`

### 吉隆坡的天气怎么样？

现在，让我们监听 `<form>` 上的 `submit` 事件，以获取来自 `<input>` 的用户数据，并在进行API调用之前自定义URL。

你的页面应该更新并显示正确的数据，而不需要重新加载！如果你的页面重新加载，这意味着你忘了**prevent（阻止）**一些东西...

![吉隆坡的天气](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/weather_in_kuala_lumpur.png)

### 获取当前位置的天气

现在，我们想要能够获取我们当前位置的天气。

首先，在HTML中，从链接中删除 `d-none` 类：

```html
<a href="" class="d-none position"><i class="bi bi-geo-alt"></i></a>
```

你可以看到一个位置图标出现了。

我们可以使用浏览器原生的 [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) 来获取用户的**当前位置**：

```javascript
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data)
})
```

看到你从浏览器获取了什么吗？你的GPS坐标。

我们的代码目前使用城市**名称**来获取天气。幸运的事，还有一个端点在url中采用**坐标**。你可以向下滚动一点[在文档中](https://openweathermap.org/current)找到以纬度和经度为参数的端点。

那继续吧，添加一个事件监听器，当你点击位置图标时，它将调用API，该API将检索用户的当前位置并相应地更新页面。

如果你的HTML页面重新加载，这意味着你忘了**prevent（阻止）**一些东西...

### 是时候重构你的代码了！

你还没有完成。当你的功能可以工作时，我们很容易就不想再写了。但是重组你的代码，使它能够长期维护，会为你未来节省大量的时间。

你看到了一些共同的代码吗？你应该能够将代码重构为单独的方法，以获得更好的可读性🙌
