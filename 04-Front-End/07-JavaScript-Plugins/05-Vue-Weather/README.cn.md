## 背景和目标

在这个挑战中，我们将使用[OpenWeatherMap API](https://openweathermap.org/)! 我们将再次练习AJAX，并了解如何向用户询问他们的当前位置！

## 详细说明

启动你的本地网络服务器：

```bash
rake webpack
```

打开[`localhost:8080`](http://localhost:8080/)然后打开控制台。

### 获取你的API密钥 (你和你的伙伴需要1个）

首先，去[OpenWeatherMap API](https://home.openweathermap.org/users/sign_up)并创建一个帐户来获取API密钥。你应该在这里找到它(https://home.openweathermap.org/api_keys). 你们都将在同一时间创建帐户，这可能会在Open Weather激活钥匙过程中造成一些延迟。为避免此问题，**与你的伙伴共享API密钥**以限制要激活的密钥数量。

你可以免费执行60次调用/分钟，这对于这个挑战来说应该足够了。

### 实时天气

阅读[实时天气 API 文档](https://openweathermap.org/current) 来找到我们想要调用 `fetch` 的端点。找到它了吗？**不要忘了url总是以 `http://`开头** (或 `https://`).

在编写任何代码之前，请你尝试在浏览器中打开url以查看是否收到响应。如果你得到一个 `401` ，这意味着你忘了传送你的API密钥！可以使用 `appid` 参数将其添加到url的**查询字符串**：

```bash
&appid=YOUR_API_KEY
```

当浏览器显示了API的响应后，让我一起看看如何来写后面的JS代码。

**小提醒：你应该使用Vue来写代码**

回到前面的Vue挑战/课堂笔记，来复习Vue的内容，查看如何使用Vue。

### 在页面中显示数据

使用API返回的数据，你可以创建以下页面：

![实时天气](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/weather_api.png)

**别着急** 进入代码:

- 从用笔和纸设计HTML开始 ✏️
- 用相关属性（ 大部分都是 `id` ）对HTML进行编码
- 编写JS代码，在正确的地方放入数据
- 编写你的CSS代码，让它闪闪发光 ✨

要获得摄氏温度，可以在请求的url中添加 `&units=metric` 。

要从iconid获得图标的图像，你可以使用这个URL：`https://openweathermap.org/img/w/{iconId}.png`。

### 吉隆坡的天气怎么样？

现在，让我们添加一个 `<form>` 和一个有 `type=“text”` 的 `<input>` 来请求任何城市的天气！添加一个 `submit` 按钮并监听窗体的 `submit` 事件来进行新的API调用。

你的页面应该更新和显示正确的数据，而无需重新加载！如果你的HTML重新加载，这意味着你忘记了使用**prevent**。。。

![吉隆坡的天气](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/weather_in_kuala_lumpur.png)

### 获取当前地点

最后但同样重要的是，让我们添加一个链接以获取**当前位置**的天气。

首先，在HTML中，移除链接中的`d-none`：

```html
<a href="" class="d-none position"><i class="bi bi-geo-alt"></i></a>
```

你可以看到一个地点的图标出现了。

我们可以用浏览器原生的[`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)。

```js
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
});
```

看到你从浏览器获取了什么吗？你的GPS坐标。

我们的代码目前使用城市**名称**来获取天气。幸运的是，还有一个端点在url中采用**坐标**。你可以向下滚动一点[在文档中](https://openweathermap.org/current)找到以纬度和经度为参数的端点。

请继续在Vue中定义另一个 `fetchWeatherByCoordinates` 方法，以使你传送的url适应 `fetch` 请求。

如果你的HTML页面重新刷新了，那意味着你在某些地方忘记使用`prevent`了。

### 是时候重新组织你的代码了！

你还没完成所有事情。当所有特性都运行时，我们很容易想让代码保持原样。如果你想在未来节省大量时间，那么重新组织代码来让它在长期运行中可维护是关键。

有发现什么相似的代码嘛？你可以使用不同的函数方法去重新组织你的代码。
