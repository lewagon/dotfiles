## Background & Objectives

It's time to finalize Airbnb Home by injecting the cards for features and flats into two grids.

## Specs

Your task is to build [this final page](http://lewagon.github.io/bootstrap-challenges/09-Final-airbnb-home/index.html).

- Get your avatar and card components from the [Le Wagon UI Kit](https://uikit.lewagon.com/) and put the CSS code in `avatar.css` and `card.css`.
- Think about the responsive behavior of each grid before coding it. Don't forget to put wrapper around the container and cards inside the col if needed (like in today's second challenge).

## Further suggestions & resources

For the map section, the code is a bit complicated because it uses a bit of javascript. Here it is:

```html
<div id="map" style="width: 100%; height: 400px;"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>

<script type="text/javascript">
var myLatlng = new google.maps.LatLng(48.8655909, 2.378983);

var myOptions = {
  zoom: 16,
  center: myLatlng,
  scrollwheel: false,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  styles: [] // TODO: replace [] with an array from https://snazzymaps.com/
};

var map = new google.maps.Map(document.getElementById('map'), myOptions);
var marker = new google.maps.Marker({
  position: myLatlng,
  map: map,
  title: "You are here!"
});
</script>
```

You can pick a nice map theme from [Snazzy Maps](https://snazzymaps.com/) and replace the `[]` in the code above with the JavaScript Style Array they provide.

Feel free to play with your Lat & Lng coordinates too! 🌍
