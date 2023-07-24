## 背景和目标

在这个练习中，我们来练习API技巧吧。让我们从一个简单的`GET`请求开始。在这里，我们将使用[MapBox Geocoding API](https://www.mapbox.com/search/)。我们想要构建一个工具，我们可以在其中输入一个地址，点击一个按钮，然后得到**GPS坐标**！最后，我们还会显示地图。

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="MapBox Geocoding demo" width="100%">
</div>

## 详细参数

开启你的本地web服务器：

```bash
serve
```

在浏览器中打开[`localhost:8000`](http://localhost:8000)。

### 地理编码

首先，你需要创建一个MapBox账户并获得一个API密钥（注册是免费的！）然后，阅读[MapBox Geocoding API文档](https://docs.mapbox.com/api/search/geocoding/)。它归结为使用地址作为查询字符串参数进行HTTP `GET`请求。

```javascript
'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR-API-KEY'
```

注意：对MapBox API的请求将需要你的API密钥作为请求中的参数之一。等你创建了一个账户并登录了，你可以在[账户页面](https://www.mapbox.com/account/)上找到你的密钥。

继续下一步，检查一下挑战模板中的`index.html`已经存在的表单。它包含一个`"text"`类型的`input`，用户可以在其中输入一个地址，以及一个`"submit"`类型的`input`，用于显示一个按钮。

使用`submit`事件来捕获用户提交表单的时刻。这时你就需要使用`fetch`触发API请求来查询MapBox Geocoding服务（下一节会详细介绍）。

当你从API获取数据时，首先`console.log()`你从MapBox获取的数据。这是一个巨大的JSON！现在你已经有了，找出GPS坐标埋在哪里，并在屏幕上显示它们。

提示：Mapbox首先返回经度（longitude），然后返回纬度（latitude）！

### （选做）显示地图

为了在指定的地址上显示一个带有图钉📌的MapBox地图，我们将使用第二个API，[MapBox JavaScript API](https://www.mapbox.com/mapbox-gl-js/api/)。

要使用它，将这一行添加到你的HTML文件的`head`中，这样你就可以使用MapBox的样式表来显示地图：

```html
<link href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css" rel="stylesheet">
```

要添加地图，你需要一个空的HTML元素。例如：

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

为了轻松地构建地图并在地图上添加一个图钉，我们将添加[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/install/)。

要在你的`#map` HTML元素中使用Mapbox GL JS显示地图，你需要在你的`index.html`中添加这些行：

```html
<script src='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css' rel='stylesheet' />
```

然后显示地图：

```javascript
mapboxgl.accessToken = "yourApiKey"
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [ -0.077, 51.533 ],
  zoom: 12
})
```

要将一个图钉添加到地图上，如果变量`map`保存了`mapboxgl`对象，你可以运行：

```js
new mapboxgl.Marker()
  .setLngLat([ -0.077, 51.533 ])
  .addTo(map)
```

地理编码愉快！🌎 🌍 🌏
