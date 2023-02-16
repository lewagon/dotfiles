## 背景和目标

在这个挑战中，我们将使用[OpenWeatherMap API](https://openweathermap.org/)! 我们将再次练习AJAX，并了解如何向用户询问他们的当前位置！
## 详细说明

启动你的本地网络服务器：

```bash
serve
```

打开[`localhost:8000`](http://localhost:8000/)然后打开控制台。

### 获取你的API密钥 (你和你的伙伴需要1个）

首先，去[OpenWeatherMap API](https://home.openweathermap.org/users/sign_up)并创建一个帐户来获取API密钥。你应该在这里找到它(https://home.openweathermap.org/api_keys). 你们都将在同一时间创建帐户，这可能会在Open Weather激活钥匙过程中造成一些延迟。为避免此问题，**与你的伙伴共享API密钥**以限制要激活的密钥数量。

你可以免费执行60次调用/分钟，这对于这个挑战来说应该足够了。

### 实时天气

阅读[实时天气 API 文档](https://openweathermap.org/current) 来找到我们想要调用 `fetch` 的端点。找到它了吗？**不要忘了url总是以 `http://`开头** (或 `https://`).

在编写任何代码之前，请你尝试在浏览器中打开url以查看是否收到响应。如果你得到一个 `401` ，这意味着你忘了传送你的API密钥！可以使用 `appid` 参数将其添加到url的**查询字符串**：

```bash
&appid=YOUR_API_KEY
```
当浏览器显示了API的响应后，你可以开始在 `lib/index.js` 中编写 `fetch` 请求。

还记得语法吗？继续写码然后 `console.log()` 你从API得到的回应来确保一切正常。

### 在页面中显示数据

使用API返回的数据，你可以创建以下页面：

![实时天气](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/weather_api.png)

**别着急** 进入代码:

- 从用笔和纸设计HTML开始 ✏️
- 用相关属性（ 大部分都是 `id` ）对HTML进行编码
- 编写JS代码，在正确的地方放入数据
- 编写你的CSS代码，让它闪闪发光 ✨

**提示:** 要获得摄氏温度，可以在请求的url中添加 `&units=metric` .

### 吉隆坡的天气怎么样？

现在，让我们添加一个 `<form>` 和一个有 `type=“text”` 的 `<input>` 来请求任何城市的天气！添加一个 `submit` 按钮并监听窗体的 `submit` 事件来进行新的API调用。

你的页面应该更新和显示正确的数据，而无需重新加载！如果你的HTML重新加载，这意味着你忘记了**阻止**某事。。。

![吉隆坡的天气](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/weather_in_kuala_lumpur.png)

### 从NPM添加 Select2 包

在早上的课堂上你看过了如何添加[select2](https://select2.org/):

1. 用 yarn下载 `jquery` and `select2`

    ```bash
    yarn add jquery select2
    ```

2. 在 `index.html` 文件添加一个select (删除input):

    ```html
    <select id="city-input" class="select2"></select>
    ```

3. 激活 `select2` :

    ```js
    import $ from 'jquery';
    import 'select2';

    $('#city-input').select2();
    ```

现在我们想在不改变HTML文件的情况下注入一个城市列表。幸运的是, select2 [有这个选项](https://select2.org/data-sources/arrays)!

在你的代码里复制粘贴这个数组，来让它传给 `select2`:

```js
const cities = ["Amsterdam","Bali","Barcelona","Belo Horizonte","Berlin","Bordeaux","Brussels","Buenos Aires","Casablanca","Chengdu","Copenhagen","Kyoto","Lausanne","Lille","Lisbon","London","Lyon","Madrid","Marseille","Melbourne","Mexico","Milan","Montréal","Nantes","Oslo","Paris","Rio de Janeiro","Rennes","Rome","São Paulo","Seoul","Shanghai","Shenzhen","Singapore","Stockholm","Tel Aviv","Tokyo"];

$('#city-input').select2({ data: cities, width: '100%' }); // <-- add the `data` and `width` options
```

你应该看到城市出现在select，但没有设计地很好。这很正常，因为我们还没有在代码中包含select2的css！为此，请你把它添加到HTML的 `<head>` 中：

```html
<link rel="stylesheet" href="node_modules/select2/dist/css/select2.css">
```

是不是好多了?

### 获取当前地点

最后但同样重要的是，让我们添加一个链接以获取**当前位置**的天气。
我们可以用浏览器原生的[`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).

在 `index.html` 文件里添加一个 `<a>` 标签，然后和以下的回调绑定：

```js
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
});
```

看到你从浏览器获取了什么吗？你的GPS坐标。我们的代码目前使用城市**名称**来获取天气。幸运的事，还有一个端点在url中采用**坐标**。你可以向下滚动一点[在文档中](https://openweathermap.org/current)找到以纬度和经度为参数的端点。

请继续定义另一个 `fetchWeatherByCoordinates` 方法，以使你传送的url适应 `fetch` 请求。

### 是时候重新组织你的代码了！

你还没完成所有事情。当所有特性都运行时，我们很容易想让代码保持原样。如果你想在未来节省大量时间，那么重新组织代码来让它在长期运行中可维护是关键。

还记得规则吗？

- 在单独的文件中编写函数
- 在 `lib/index.js` `import` 它们来调用

写码愉快!
