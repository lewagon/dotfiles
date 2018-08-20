## Background & Objectives

In this exercise, we'll practise our AJAX skills. Let's start simple with a `GET` request. Here we'll use the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro). We want to build a tool where we can input an address, hit a button, and get the **GPS Coordinates** back! For the cherry on top, we'll display the map as well.


<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax_geocoder.gif" alt="Google Geocoding demo" width="100%">
</div>

## Specs

You can launch your local server with:

```bash
rake webpack
```

### Geocoding

Read the [Google Geocoding API documentation](https://developers.google.com/maps/documentation/geocoding/intro). It boils down to doing an HTTP `GET` request with an address as a query string parameter.

```js
'https://maps.googleapis.com/maps/api/geocode/json?address=16 Villa Gaudelet Paris'
```

Go ahead and add a form to your HTML page. It should contain an `input` of type `"text"` where a user can type an address in, and an `input` of type `"submit"` to display a button.

Once that's done, use the `submit` event to catch the moment the form is posted by the user. That's when you'll want to trigger the AJAX query to the Google Geocoding service using `fetch` (go back to yesterday's lecture slides).

As always when you fetch data from an API, start by `console.log()`ing what you get back from Google. It's a massive JSON! Now you've got that, figure out where the GPS coordinates are buried and display them on screen.

### [OPTIONAL] Displaying a map

To display a Google Map with a marker at the specified address, we'll use a second API, the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript).

⚠️ Google only allows the use of its API to those who create an [API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) and provide billing details.

Don't worry, you get $200 free usage every month for Maps, Routes, or Places.

You will get the error `You have exceeded your request quota for this API` until you enable billing and add an API key.

For more information about Google's pricing, [read this guide](https://cloud.google.com/maps-platform/user-guide/pricing-changes/).

To use it, add this line to the bottom of your HTML file, just **before** you require `build/application.js`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

To add a map, you'll need an empty supporting HTML element. For instance:

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

To easily build the map and add a marker to it, we'll use [npm's gmaps package](https://yarnpkg.com/fr/package/gmaps).

You already have a `package.json` so you just need to `yarn add gmaps` to download it locally in `01-Geocoder/node_modules`.

To display a map in your `#map` with the `gmaps` package you can use these lines:

```js
import GMaps from 'gmaps';

const map = new GMaps({ el: '#map', lat: 48.8648482, lng: 2.3798534, zoom: 14 });
```

To add a marker to the map, if the variable `map` holds the `GMaps` object, you can run:

```js
const marker = { lat: 48.8648482, lng: 2.3798534 };
map.addMarkers([ marker ]);
```

Happy geocoding! 🌎 🌍 🌏
