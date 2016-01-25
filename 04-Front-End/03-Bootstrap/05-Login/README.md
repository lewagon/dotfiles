## Background & Objectives

A challenge to get you familiar with Bootstrap CSS classes:

- utilities classes (`.text-center`, `.list-inline`, etc..)
- UI components classes (`.btn-primary`, `.form-inline`, etc..)

## Specs

In this challenge, reproduce [this page](http://lewagon.github.io/bootstrap-challenges/06-Bootstrap-mockup-without-grid/) by using Bootstrap classes as much as possible. Every time you need to style something, look in the Bootstrap documentation if there is a class for that. Here are some instructions to help you in this challenge:

1. For the banner, the cards section and the footer, you will have to write a bit of personal CSS. In fact, there is no Bootstrap class for image backgrounds, or for custom card design.
1. The [Bootsrap navbar code](http://getbootstrap.com/components/#navbar-default) given in the official documentation is a bit too complicated and not very convenient (e.g. the brand is a text, not an image..). Wait for tomorrow and we will give you a cool home-made navbar template!

## Tips & Resources

- Start by building your background image and logo before coding. You can find nice background images on [thestocks](http://thestocks.im/) or use placeholders for [unsplash.it](http://unsplash.it). For building your logo, find SVG icons on [NounProject](http://thenounproject.com/) or [IconMelon](http://iconmelon.com/). Don't hesitate to pimp these SVG icons with Sketch and add your own flavor.

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