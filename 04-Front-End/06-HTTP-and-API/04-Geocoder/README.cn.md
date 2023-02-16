## 背景和目标

在这个练习中，我们将练习AJAX技巧。让我们从一个`GET`请求开始。这里我们将使用[MapBox地理编码API](https://www.mapbox.com/search/). 我们想创建一个工具，它让我们可以输入一个地址，点击一个按钮，并得到**全球定位系统(GPS)坐标**！锦上添花的是，我们也将展示地图。


<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="MapBox Geocoding demo" width="100%">
</div>

## 详细说明

启动你的本地网络服务器：

```bash
rake webpack
```

### 地理编码

首先，你需要在MapBox创建一个帐户，并获取一个API密钥（可以免费注册！）然后，阅读[MapBox地理编码API文档](https://docs.mapbox.com/api/search/geocoding/)。归根结底，它使用地址作为字符串查询的参数来执行HTTP`GET`请求。


```js
'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR-API-KEY'
```

注意: 对Mapbox API的请求需要API密钥作为请求中的参数之一。在你创建帐户并登录后，你可以在[帐户页面](https://www.mapbox.com/account/)上找到你的密钥。

继续向HTML页面添加窗体。它应该包含一个 `"text"` 类型的 `input` ，用户可以在其中输入地址，以及一个 `"submit"` 类型的 `input` ，来显示按钮。

完成后，你可以使用 `submit` 事件来捕获用户发布窗体的时刻。这时，你会想要使用 `fetch` 触发对MapBox地理编码服务的AJAX查询（回到昨天课堂的幻灯片）。

像往常一样，从API获取数据时，首先 `console.log（）` 你从MapBox获取的内容。这是一个巨大的JSON！现在你知道了，找出GPS坐标都埋在哪里，然后在屏幕上显示出来。

提示：Mapbox首先返回经度坐标，然后返回纬度坐标！

### [可选]显示地图

要在MapBox地图显示带有标记的指定地址，我们将使用第二个API，[MapBox JavaScript API](https://www.mapbox.com/mapbox-gl-js/api/).

要使用它，你需要在HTML文件的 `head` 中添加这一行，这样就可以在你的地图上使用MapBox的样式表：

```html
<link href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css" rel="stylesheet">
```

要添加地图的话，你需要一个空的支持性HTML元素。例如：

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

为了方便地构建地图并向其添加标记，我们将使用[npm的mapbox-gl包](https://yarnpkg.com/en/package/mapbox-gl)。

你已经有一个 `package.json` 。因此，你只需要 `yarn add mapbox-gl` ， 在 `02-Geocoder/node_modules` 中把它下载到本地。

要使用 `mapbox-gl` 包在 `#map` 中显示地图，可以使用以下代码：

```js
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'yourApiKey';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [ -0.077, 51.533 ],
  zoom: 12
});
```

要向地图添加标记，如果变量 `map` 包含 `mapboxgl` 对象的话，你可以运行：

```js
new mapboxgl.Marker()
  .setLngLat([ -0.077, 51.533 ])
  .addTo(map);
```

地理编码愉快! 🌎 🌍 🌏
