## Background & Objectives

In some web applications, you may want to display data with charts 🎨 like pie, line, or bar charts. In this challenge, we will use the popular [*Chart.js*](https://www.chartjs.org/docs/latest/) library.

Let's have a bit of fun and display some World Stats (gender ratio, population by year, and breakdown of religious communities in the world).

## Setup

Run the server in your terminal with:

```bash
serve
```

And visit `localhost:8000`.

Bootstrap is already installed, and `Stimulus` is already setup in the `index.html` head.

However, you will still need to install `Chart.js` yourself in the next step. And, we will be creating **3 separate Stimulus controller files** in `lib/controllers/` to handle each type of chart. For each one, you will need to:

- Create your controller file in the `controllers` folder and don't forget to kick-start with the Stimulus controller boilerplate.
- Import and register the Stimulus Controller in `index.js`.

If you have trouble remembering how to do this, you can look at the previous challenges from today 💡

## Specs

First, we will install Chart.js with `importmap`. Stimulus is already added in the boilerplate, but you will need to add Chart.js yourself (instructions below).

Then, we will use Chart.js to implement 3 different types of charts in the challenge:
- a [doughnut chart](https://www.chartjs.org/docs/latest/charts/doughnut.html)
- a [line chart](https://www.chartjs.org/docs/latest/charts/line.html)
- a [polar chart](https://www.chartjs.org/docs/latest/charts/polar.html)

Have a look at the documentation to understand how each type work. Once you have an understanding of what they each look like, let's proceed following the steps below.

### 1. HTML structure

You'll notice, in the `index.html` file, there are 3 headers: "Gender Ratio", "World Population", and "Religious Communities". We'll want to put the chart for each of these near its respective header.

_Note: The HTML structure is already set up for you, but you'll want to take a second to look at the file and make sure you understand it._

### 2. Setup `Chart.js` with `importmap`

In the `index.html`, you may notice that Stimulus is already installed via `importmap`. You'll want to add these two lines to the `<script type="importmap"></script>` in order to install `Chart.js`:

```html
{
  "imports": {
    ...,
    "chart.js": "https://ga.jspm.io/npm:chart.js@4.2.0/dist/chart.js",
    "@kurkle/color": "https://ga.jspm.io/npm:@kurkle/color@0.3.2/dist/color.esm.js"
  }
}
```

`Chart.js` needs another dependency called `@kurkle/color` to function, which is why we are importing it as well.

Then, in your `lib/index.js`, add these following lines at the top of your page:

```javascript
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
```

These lines will import all functions from the library.

And a bit lower down the page:

```javascript
const charts = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);
Chart.register(...charts);
```

These lines [load all the functions for every chart type that Chart.js has available](https://www.chartjs.org/docs/latest/getting-started/usage.html).

### 3. Build a doughnut chart

Whenever you are creating a chart, there will be two steps:

1. Find the numbers you want to display (the **data**) and represent it in JavaScript as an `Object`.
2. Use Chart.js to take that `Object` and render it as a chart.

Chart.js has many different types of charts it can create. We'll start with a [doughnut chart](https://www.chartjs.org/docs/latest/charts/doughnut.html). We are going to use it to represent the gender ratio worldwide.

As of 2020, according to the [INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/), the number of men and women in the world was roughly equal, More precisely, out of 1,000 people, 504 are men (50.4%) and 496 are women (49.6%).

Let's build a JavaScript `Object` to represent this data:

```javascript
const worldPopulation = {
  "men": 504,
  "women": 496
}
```

We will use this `Object` to build the `labels` and `data` arrays, which are required by Chart.js to render the chart. Here's a sample from the Chart.js docs of what the data structure should look like (with some random sample data):

```javascript
data = {
    datasets: [{
        data: [300, 50, 100]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
```

Here's a sample of how we could build a bar chart with Chart.js using that data:

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

Based on our `worldPopulation` object, how can you build an array `labels` containing `"men"` and `"women"` and a second array `data` containing `504` and `496`?

Have a look at the existing methods on JavaScript objects like `Object.keys()` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) to give you an idea on how to create arrays based on an Object.

### 4. Implement the logic

Now that you have a better understanding of how the plugin works, let's implement the logic.

First, we'll want to make a new Stimulus controller for the doughnut chart. Then, we'll need to add a `data-controller` attribute to the correct HTML element to connect it to the page.

Each chart will have a separate Stimulus controller. Let's call this one `DoughnutChartsController`.

At the top of the file, import the `Chart.js` plugin:

```javascript
// lib/controllers/doughnut_charts_controller.js
import { Chart } from "chart.js";
```

Inside the `class` definition, you can define your `worldPopulation` object:

```javascript
// lib/controllers/doughnut_charts_controller.js
export default class extends Controller {
  worldPopulation = {
    // [...]
  };
}
```

Which means you can refer to it inside any methods you define with `this.worldPopulation`.


In your `connect()` method:
- create your `labels` and `data` arrays
- create your `Chart` instance with the right `type`, `data` and `datasets` (always keep an eye on the documentation when using external libraries)
- pass background colors to your `datasets` for each label

💡 A key question to consider is when should the chart get rendered? Should it be right on page load? Or after the user clicks on or interacts with something? Remember that the `connect()` method in Stimulus triggers whenever the controller is connected to the page, usually on initial load. This should help you determine where to put the bulk of your code.

If needed, add some CSS to make the chart smaller.

If you need anything else, have a look at the `options` for Chart.js doughnut charts.

### 5. Implement the line chart

For the line chart, we'll go through the same process. This time, we will display a chart of world population growth by ear since 2010.

Let's use this [resource](https://www.worldometers.info/world-population/world-population-by-year/).

Build a `worldPopulationGrowth` Object with the following structure:

```javascript
const worldPopulationGrowth = {
  "2020": 7794798739,
  // your turn now to fill the rest of the object until 2010
}
```

Then use this Object to build your `labels` and `data` arrays. Then, implement the `Chart` instance to render the line chart.

💡 Remember that you'll want to have a separate Stimulus controller for this chart. Let's call it `LineChartsController`.

### 6. Implement the polar area chart

Let's have a look at the [stats](https://worldstatistics.net/the-largest-religions-in-the-world-2025/) page about religious populations in the world.

Let's select 10 out of these and build an Object out of it:

```javascript
const worldReligions = {
  "christianity": 2437876925,
  // your turn now to fill the rest of the object until 2010
}
```

Then, let's use the same logic as before to implement the polar area chart.
