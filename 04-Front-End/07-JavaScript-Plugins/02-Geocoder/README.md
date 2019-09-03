## Background & Objectives

In this exercise, we'll practise our AJAX skills. Let's start simple with a `GET` request. Here we'll use the [MapBox Geocoding API](https://www.mapbox.com/search/). We want to build a tool where we can input an address, hit a button, and get the **GPS Coordinates** back! For the cherry on top, we'll display the map as well.


<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="MapBox Geocoding demo" width="100%">
</div>

## Specs

You can launch your local server with:

```bash
rake webpack
```

### Geocoding

First, you will need to create an account with MapBox and get and API key (it's free to sign up!) Then, read the [MapBox Geocoding API documentation](https://www.mapbox.com/api-documentation/#geocoding). It boils down to doing an HTTP `GET` request with an address as a query string parameter.

```js
'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR-API-KEY'
```

NOTE: The request to the MapBox API will require your API key as one of the parameters in your request. You can find your key on your [account page](https://www.mapbox.com/account/) once you have created an account and signed in.

Go ahead and add a form to your HTML page. It should contain an `input` of type `"text"` where a user can type an address in, and an `input` of type `"submit"` to display a button.

Once that's done, use the `submit` event to catch the moment the form is posted by the user. That's when you'll want to trigger the AJAX query to the MapBox Geocoding service using `fetch` (go back to yesterday's lecture slides).

As always when you fetch data from an API, start by `console.log()`ing what you get back from MapBox. It's a massive JSON! Now you've got that, figure out where the GPS coordinates are buried and display them on screen.

HINT: Mapbox returns coordinates with longitude first, and latitude second!

### [OPTIONAL] Displaying a map

To display a MapBox Map with a marker at the specified address, we'll use a second API, the [MapBox JavaScript API](https://www.mapbox.com/mapbox-gl-js/api/).

To use it, add this line in the `head` of your HTML file, so you can use MapBox's stylesheet for your map:

```html
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.1/mapbox-gl.css' rel='stylesheet' />
```

To add a map, you'll need an empty supporting HTML element. For instance:

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

To easily build the map and add a marker to it, we'll use [npm's mapbox-gl package](https://yarnpkg.com/en/package/mapbox-gl).

You already have a `package.json` so you just need to `yarn add mapbox-gl` to download it locally in `02-Geocoder/node_modules`.

To display a map in your `#map` with the `mapbox-gl` package you can use these lines:

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

To add a marker to the map, if the variable `map` holds the `mapboxgl` object, you can run:

```js
new mapboxgl.Marker()
  .setLngLat([ -0.077, 51.533 ])
  .addTo(map);
```

Happy geocoding! 🌎 🌍 🌏
