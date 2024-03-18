## Background & Objectives

In this exercise, we'll practise our API skills. Let's start simple with a `GET` request. Here we'll use the [MapBox Geocoding API](https://www.mapbox.com/search/). We want to build a tool where we can input an address, hit a button, and get the **GPS Coordinates** back! For the cherry on top, we'll display the map as well.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="MapBox Geocoding demo" width="100%">
</div>

## Specs

Start your local web server with:

```bash
serve
```

Open [`localhost:8000`](http://localhost:8000) in your browser.

### Geocoding

First, you will need to create a MapBox account and get an API key (it's free to sign up!) Then, read the [MapBox Geocoding API documentation](https://docs.mapbox.com/api/search/geocoding/). It boils down to doing an HTTP `GET` request with an address as a query string parameter.

```javascript
'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR-API-KEY'
```

NOTE: The request to the MapBox API will require your API key as one of the parameters in your request. You can find your key on your [account page](https://www.mapbox.com/account/) once you have created an account and signed in.

Go ahead and check out the form already present in the `index.html` challenge boilerplate. It contains an `input` of type `"text"` where a user can type an address in, and an `input` of type `"submit"` to display a button.

Use the `submit` event to catch the moment the form is posted by the user. That's when you'll want to trigger the API request to query the MapBox Geocoding service using `fetch` (more on this in the next lecture).

When you fetch data from an API, start by `console.log()`ing what you get back from MapBox. It's a massive JSON! Now you've got that, figure out where the GPS coordinates are buried and display them on screen.

Hint: Mapbox returns coordinates with longitude first, and latitude second!

### (OPTIONAL) Displaying a map

To display a MapBox Map with a marker at the specified address, we'll use a second API, the [MapBox JavaScript API](https://www.mapbox.com/mapbox-gl-js/api/).

To use it, add these lines in the `head` of your HTML file, so you can use MapBox's JavaScript and CSS for your map:

```html
<link href='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js'></script>
```

To add a map, you'll need an empty supporting HTML element. For instance:

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

To easily build the map and add a marker to it, we'll add [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/install/).

And then display a map:

```javascript
mapboxgl.accessToken = "yourApiKey"
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [ -0.077, 51.533 ],
  zoom: 12
})
```

To add a marker to the map, if the variable `map` holds the `mapboxgl` object, you can run:

```js
new mapboxgl.Marker()
  .setLngLat([ -0.077, 51.533 ])
  .addTo(map)
```

Happy geocoding! 🌎 🌍 🌏
