## Background & Objectives

It's time to finalize Airbnb Home by injecting the cards for features and flats within two grids.

## Specs

You must build [this final page](http://lewagon.github.io/bootstrap-challenges/09-Final-airbnb-home/index.html).

- For avatar and card components pick them in [Le Wagon library](http://lewagon.github.io/ui-components/) and put the CSS code in `avatar.css` and `card.css`.
- Think about the responsive behavior of each grid before coding it. Don't forget to put wrapper around the container and cards inside the col if needed (like in the second challenge of today).

## Further suggestions & resources

For the map section, the code is a bit complicated since it uses a bit of javascript. Here it is:

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
  styles: [] // TODO: replace [] by array from https://snazzymaps.com/
};

var map = new google.maps.Map(document.getElementById('map'), myOptions);
var marker = new google.maps.Marker({
  position: myLatlng,
  map: map,
  title: "You are here!"
});
</script>
```

You can pick a nice map theme on [Snazzy Maps](https://snazzymaps.com/) and replace the `[]` in the code above by the JavaScript Style Array you will copy on Snazzyp Maps.
