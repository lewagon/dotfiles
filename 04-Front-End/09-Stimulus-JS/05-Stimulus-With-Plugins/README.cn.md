## Background & Objectives
## 背景和目标

When building an application, you might need to display some data with charts. For that, we usually use the [*Chart.js*](https://www.chartjs.org/docs/latest/) library.
在构建应用程序时，你可能需要使用图表来显示一些数据。为此，我们通常使用[*Chart.js*](https://www.chartjs.org/docs/latest/)库。

Let's have a bit of fun and display some World Stats (gender ratio, population year on year, religious communities in the world).
让我们来玩一玩这个工具！显示一些世界统计数据（性别比例、年度人口、世界宗教社区）。

## Setup
## 设置

Run the server from your terminal with:
从终端运行服务器：

```bash
serve
```

And visit `localhost:8000`. You can see we are using Bootstrap.
然后访问`localhost:8000`。你可以看到我们正在使用Bootstrap。

`Stimulus` is already setup in the `index.html` head.
`Stimulus`已经在`index.html`的`<head>`中设置好了。

However, you still need to get used to installing the JavaScript part yourself. In this challenge, we will create a separate controller for each type of chart.
然而，你需要习惯自己安装JavaScript部分。在这个挑战中，我们将为每种类型的图表创建一个单独的控制器。
- Import and register the Stimulus Controller in `index.js`.
- 在`index.js`中导入并注册Stimulus控制器。
- Create your controller file in the `controllers` folder and don't forget to kick-start with the Stimulus controller boilerplate.
- 在`controllers`文件夹中创建你的控制器文件，并不要忘记用Stimulus控制器模板启动。

If you have trouble remembering, how about taking a peak at previous challenges?
如果你记不起来了，那就看看之前的挑战吧？

## Specs
## 详细参数

We will import the `Chart.js` plugin with `importmap`.
我们将使用`importmap`导入`Chart.js`插件。

Then, we will use the plugin to implement 3 different types of charts in the challenge:
然后，我们将使用插件在挑战中实现3种不同类型的图表：
- a [doughnut chart](https://www.chartjs.org/docs/latest/charts/doughnut.html)
- 一个[环形图](https://www.chartjs.org/docs/latest/charts/doughnut.html)
- a [line chart](https://www.chartjs.org/docs/latest/charts/line.html)
- 一个[折线图](https://www.chartjs.org/docs/latest/charts/line.html)
- a [radar chart](https://www.chartjs.org/docs/latest/charts/radar.html)
- 一个[雷达图](https://www.chartjs.org/docs/latest/charts/radar.html)

Have a look at the documentation to understand how each type work.
看看文档，了解每种类型的工作原理。

### 1. Prepare your HTML
### 1. 准备你的HTML

There are 3 distinct sections in your HTML. In each, you will display each type of chart as indicated.
你的HTML中有3个不同的部分。在每个部分中，你将按照指示显示每种类型的图表。

### 2. Setup `Chart.js` with `importmap`
### 2. 使用`importmap`设置`Chart.js`

First, let's add these 2 lines in the `importmap` list:
首先，在`importmap`列表中添加这两行：

```html
{
  "imports": {
    ...,
    "chart.js": "https://ga.jspm.io/npm:chart.js",
    "@kurkle/color": "https://ga.jspm.io/npm:@kurkle/color"
  }
}
```

```html
{
  "imports": {
    ...,
    "chart.js": "https://ga.jspm.io/npm:chart.js@4.2.0/dist/chart.js",
    "@kurkle/color": "https://ga.jspm.io/npm:@kurkle/color@0.3.2/dist/color.esm.js"
  }
}
```

`Chart.js` needs another dependency called `@kurkle/color` to function.
`Chart.js`需要另一个名为`@kurkle/color`的依赖项才能正常工作。

Then, in your `index.js`, add these following lines at the top of your page:
然后，在你的`index.js`中，在页面顶部添加以下行：

```javascript
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
```

These lines will import all functions from the library.
这些行将从库中导入所有函数。

And this a bit lower down the page:
然后在页面的下面：

```javascript
const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);
Chart.register(...controllers);
```

These lines load the specific functions of each type of charts.
这些行加载每种类型图表的特定函数。

### 3. Understand the Chart.js plugin
### 3. 理解Chart.js插件

This is a [doughnut chart](https://www.chartjs.org/docs/latest/charts/doughnut.html). We are going to use it to represent the gender ratio worldwide.
这是一个[环形图](https://www.chartjs.org/docs/latest/charts/doughnut.html)。我们将使用它来表示世界范围内的性别比例。

As of 2020, according to the [INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/), the number of men and women in the world was roughly equal, More precisely, out of 1,000 people, 504 are men (50.4%) and 496 are women (49.6%).
2020年，根据[INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/)的数据，世界上男女人数大致相等，更确切地说，每1000人中，有504人是男性（50.4%），496人是女性（49.6%）。

Let's build an Object:
让我们来构建一个对象：

```javascript
const worldPopulation = {
  "men": 504,
  "women": 496
}
```

This Object will be used to build the `labels` and `data` arrays. (have a look at the Setup tab below the example in the documentation ).
这个对象将用于构建`labels`和`data`数组。（在文档示例下面的设置选项卡中查看）

Then, we need to pass some data to our instance of `Chart` later for the plugin to pick it up, like so:
然后，我们需要稍后将一些数据传递给`Chart`的实例，以便插件可以获取它，如下所示：

```javascript
const labels = ['Red', 'Blue', 'Yellow']
const data = [300, 50, 100]

new Chart(this.element, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: data,
      backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
});
```

Based on our `WorldPopulation` object, how can you build an array `labels` containing `"men"` and `"women"` and a second array `data` containing `504` and `496`?
根据我们的`WorldPopulation`对象，你要如何建`labels`数组，包括`"men"`和`"women"`和第二个数组`data`包含`504`和`496`？

Have a look at the existing methods on JavaScript objects like `Object.keys()` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) to give you an idea on how to create arrays based on an Object.
看看JavaScript对象上的现有方法，比如[MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)，给你一个基于对象创建数组的想法。

### 4. Implement the logic
### 4. 实现逻辑

Now that you have a better understanding of how the plugin works, let's implement the logic.
现在你对插件的工作原理有了更好的理解，让我们来实现这个逻辑。

Make sure to attach your Stimulus controller and define the correct target to render your chart.
确保附加你的Stimulus控制器并定义正确的目标来渲染你的图表。

Each chart will have a separate Stimulus controller. Let's call this one `DoughnutChartsController`.
每个图表都有一个单独的Stimulus控制器。让我们称之为`DoughnutChartsController`。

At the top of the page, import the `Chart.js` plugin:
在页面顶部，导入`Chart.js`插件：

```javascript
// ...
import { Chart } from "chart.js";
```

In your `connect()` method:
在你的`connect()`方法中：
- create your 2 `labels` and `data` arrays
- 创建你的2个`labels`和`data`数组
- create your `Chart` instance with the right `type`, `data` and `datasets` (always keep an eye on the documentation when using external libraries)
- 用正确的`type`、`data`和`datasets`创建你的`Chart`实例（使用外部库时，始终注意多看文档）
- pass background colors to your `datasets` for each label
- 为每个标签传递背景颜色到你的`datasets`

If needed, add some CSS to make the chart smaller.
如果需要，添加一些CSS使图表变小。

If you need anything else, have a look at the `options` alternatives.
如果你需要其他东西，看看`options`的替代方案。

### 5. Implement the line chart
### 5. 实现折线图

For the line chart, we'll go through the same process. This time, we will implement a year-on-year world population growth since 2010.
对于折线图，我们将按照同样的过程。这次，我们将实现2010年以来的年度世界人口增长。

Let's use this [resource](https://www.worldometers.info/world-population/world-population-by-year/).
让我们使用这个[资源](https://www.worldometers.info/world-population/world-population-by-year/)。

Build a `worldPopulationGrowth` Object with the following structure:
用以下结构构建一个`worldPopulationGrowth`对象：

```javascript
const worldPopulationGrowth = {
  "2020": 7794798739,
  // your turn now to fill the rest of the object until 2010
}
```

Then use this Object to build your `labels` and `data` arrays. Then, implement the `Chart` instance to render the line chart.
然后使用这个对象来构建你的`labels`和`data`数组。然后，实现`Chart`实例来渲染折线图。

### 6. Implement the polar area chart
### 6. 实现极地区域图

Let's have a look at the [Wikipedia](https://en.wikipedia.org/wiki/List_of_religious_populations) page about religious populations in the world.
让我们来看看维基百科关于世界宗教人口的页面。

Let's select 10 out of these and build an Object out of it:
让我们从中选择10个，并构建一个对象：

```javascript
const worldReligions = {
  "christianity": 2382000000,
  // 该你了，现在填写对象的其余部分，直到2010年
}
```

Then, let's re-use the same logic as before to implement the polar area chart.
然后，让我们重用之前的逻辑来实现极地区域图。
