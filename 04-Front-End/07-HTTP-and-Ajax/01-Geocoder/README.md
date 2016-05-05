## Background & Objectives

In this exercise, we'll write our first AJAX request. Let's start simple with a `GET` request. We'll use the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro). We want to build a tool where we can input an address, hit a button, and get the **GPS Coordinates** back! Ice on the cake, we'll try to display a map as well.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax_geocoder.gif)

## Specs

### Geocoding


Read carefully the [Google Geocoding API documentation](https://developers.google.com/maps/documentation/geocoding/intro). It boils down to doing a HTTP `GET` request with an address as a query string parameter.

```
https://maps.googleapis.com/maps/api/geocode/json?address=16%20Villa%20Gaudelet%20Paris
```

Go ahead, add a form to your HTML page. It should contain an input where a user can type an address in, and a button to submit the form. Then use the jQuery `submit` event to catch when the form is posted by the user. That's when you'll want to run the AJAX query to the Google Geocoding service with an `$.ajax()` call.

In the `success` callback, try to `console.log()` what the API gave you back. It's a big JSON, look at it! Then figure out where the GPS coordinates are and display them on screen.

### [OPTIONAL] Displaying a map

To display a Google Map with a marker at the specified address, we'll use a second API, the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript).


To use it, add to your HTML this line at the bottom of your file, just **before** the requiring of `app.js`:

```html
<script src="https://maps.googleapis.com/maps/api/js"></script>
```



To add a map, you'll need an empty supporting HTML element. For instance:

```html
<div id="map" style="height: 300px"></div>
```

Once again, please read at the [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript).

To display a map in your `#map` element, you can use those lines:

```js
var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 48.8648482, lng: 2.3798534 },
  zoom: 14  // Change this value from 0 to 18
});
```

To add a marker to the map, if the variable `map` holds the `google.maps.Map` object, you can run:

```js
var marker = new google.maps.Marker({
  map: map,
  position: { lat: 48.8648482, lng: 2.3798534 }
});
```

If you get the following warning, you can **ignore** it for this exercise.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/google_maps_api_warning.png)

Happy geocoding!
