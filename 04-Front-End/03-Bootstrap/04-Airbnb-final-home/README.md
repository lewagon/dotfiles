## Background & Objectives

A challenge to get you familiar with Bootstrap basic CSS classes:

- Text and list formatting `.text-center`, `.list-inline`)
- Button classes (`.btn`, `.btn-primary`, `.btn-lg`, etc..)
- Form classes (`.form-inline`, `form-control`)

## Specs

In this challenge, reproduce [this page](http://lewagon.github.io/bootstrap-challenges/08-Final-airbnb-home-without-grid/) by using Bootstrap classes as much as possible.

- Every time you need to design a component, look first in the [Bootstrap documentation](http://getbootstrap.com/) to see if there is a class for that.
- For the banner and the footer you will have to write your own CSS. For the banner, you can [pick it in Le Wagon library](http://lewagon.github.io/ui-components/#banner) to save time.



## Tips & Resources

- We put you a backStart by building your background image and logo before coding. You can find nice background images on [thestocks](http://thestocks.im/) or use placeholders for [unsplash.it](http://unsplash.it). For building your logo, find SVG icons on [NounProject](http://thenounproject.com/) or [IconMelon](http://iconmelon.com/). Don't hesitate to pimp these SVG icons with Sketch and add your own flavor.

- Look at our boilerplate, we force you to split your CSS code into several files. `style.css` is responsible for main styling (body backgrounds & colors, fonts, headers, links) and also imports the other files `banner.css`, `card.css`, `footer.css`, etc... which are responsible of other components' design. With this `import` mechanism, we only need to link the `style.css` in the `<head>` of the HTML file.

- For the map section, the code is a bit complicated since it uses a bit of javascript. Here it is:

```html
<div id="map" style="width: 100%; height: 400px;"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>

<script type="text/javascript">
var myLatlng = new google.maps.LatLng(48.852937,2.364178);

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
