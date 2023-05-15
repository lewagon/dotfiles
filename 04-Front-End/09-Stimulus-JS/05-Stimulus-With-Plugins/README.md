## Background & Objectives

When building an application, you might need to display some data with charts. For that, we usually use the [*Chart.js*](https://www.chartjs.org/docs/latest/) library.

Let's have a bit of fun and display some World Stats (gender ratio, population year on year, religious communities in the world).

## Setup

Run the server from your terminal with:

```bash
serve
```

And visit `localhost:8000`. You can see we are using Bootstrap.

`Stimulus` is already setup in the `index.html` head.

However, you still need to get used to installing the JavaScript part yourself. In this challenge, we will create a separate controller for each type of chart.
- Import and register the Stimulus Controller in `index.js`.
- Create your controller file in the `controllers` folder and don't forget to kick-start with the Stimulus controller boilerplate.

If you have trouble remembering, how about taking a peak at previous challenges?

## Specs

We will import the `Chart.js` plugin with `importmap`.

Then, we will use the plugin to implement 3 different types of charts in the challenge:
- a [doughnut chart](https://www.chartjs.org/docs/latest/charts/doughnut.html)
- a [line chart](https://www.chartjs.org/docs/latest/charts/line.html)
- a [radar chart](https://www.chartjs.org/docs/latest/charts/radar.html)

Have a look at the documentation to understand how each type work.

### 1. Prepare your HTML

There are 3 distinct sections in your HTML. In each, you will display each type of chart as indicated.

### 2. Setup `Chart.js` with `importmap`

First, let's add these 2 lines in the `importmap` list:

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

Then, in your `index.js`, add these following lines at the top of your page:

```javascript
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
```

These lines will import all functions from the library.

And this a bit lower down the page:

```javascript
const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);
Chart.register(...controllers);
```

These lines load the specific functions of each type of charts.

### 3. Understand the Chart.js plugin

This is a [doughnut chart](https://www.chartjs.org/docs/latest/charts/doughnut.html). We are going to use it to represent the gender ratio worldwide.

As of 2020, according to the [INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/), the number of men and women in the world was roughly equal, More precisely, out of 1,000 people, 504 are men (50.4%) and 496 are women (49.6%).

Let's build an Object:

```javascript
const worldPopulation = {
  "men": 504,
  "women": 496
}
```

This Object will be used to build the `labels` and `data` arrays. (have a look at the Setup tab below the example in the documentation ).

Then, we need to pass some data to our instance of `Chart` later for the plugin to pick it up, like so:

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

Based on our `WorldPopulation` object, how can you build an array `labels` containing `"men"` and `"woman"` and a second array `data` containing `504` and `496`?

Have a look at the existing methods on JavaScript objects like `Object.keys()` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) to give you an idea on how to create arrays based on an Object.

### 4. Implement the logic

Now that you have a better understanding of how the plugin works, let's implement the logic.

Make sure to attach your Stimulus controller and define the correct target to render your chart.

Each chart will have a separate Stimulus controller. Let's call this one `DoughnutChartsController`.

At the top of the page, import the `Chart.js` plugin:

```javascript
// ...
import { Chart } from "chart.js";
```

In your `connect()` method:
- create your 2 `labels` and `data` arrays
- create your `Chart` instance with the right `type`, `data` and `datasets` (always keep an eye on the documentation when using external libraries)
- pass background colors to your `datasets` for each label

If needed, add some CSS to make the chart smaller.

If you need anything else, have a look at the `options` alternatives.

### 5. Implement the line chart

For the line chart, we'll go through the same process. This time, we will implement a year-on-year world population growth since 2010.

Let's use this [resource](https://www.worldometers.info/world-population/world-population-by-year/).

Build a `worldPopulationGrowth` Object with the following structure:

```javascript
const worldPopulationGrowth = {
  "2020": 7794798739,
  // your turn now to fill the rest of the object until 2010
}
```

Then use this Object to build your `labels` and `data` arrays. Then, implement the `Chart` instance to render the line chart.

### 6. Implement the polar area chart

Let's have a look at the [Wikipedia](https://en.wikipedia.org/wiki/List_of_religious_populations) page about religious populations in the world.

Let's select 10 out of these and build an Object out of it:

```javascript
const worldReligions = {
  "christianity": 2382000000,
  // your turn now to fill the rest of the object until 2010
}
```

Then, let's re-use the same logic as before to implement the polar area chart.
