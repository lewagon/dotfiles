## Background & Objectives

A challenge to get you familiar with Bootstrap CSS classes:

- utilities classes (`.text-center`, `.list-inline`, etc..)
- UI components classes (`.btn-primary`, `.form-inline`, etc..)

## Specs

In this challenge, reproduce [this page](http://lewagon.github.io/bootstrap-challenges/03-bootstrap-mockup-v1/) by using Bootstrap classes as much as possible. Every time you need to style something, look in the Bootstrap documentation if there is a class for that. Here are some instructions to help you in this challenge:

1. For the banner, feature section and footer, you will have to write a bit of personal CSS. In fact, there is no Bootstrap class for image backgrounds, or for custom color backgrounds.
1. The [Bootsrap navbar code](http://getbootstrap.com/components/#navbar-default) given in the official documentation is a bit too complicated and not very convenient (their brand is not an image but just a text..). Use [our own navbar code](https://github.com/lewagon/awesome-navbars/blob/master/templates/_navbar.html) which is much better!

## Tips & Resources

- Start by building your graphical elements (SVG icons, background image) before coding. You can find nice background images on [thestocks](http://thestocks.im/)). For picking nice SVG icons, [NounProject](http://thenounproject.com/) and [IconMelon](http://iconmelon.com/) are good options. Don't hesitate to modify a bit the SVG icons with Sketch to add your own flavor. We gave you some images in the `images` folder to start with. Feel free to replace them by your own ones!

- Look at our boilerplate, we force you to split your CSS code into 3 files. `style.css` is responsible for main styling (fonts, background, colors, headers, links) and imports the other files `banner.css` and `footer.css`, which are responsible for the banner and footer design. With this `import` mechanism, we only need to link the `style.css` in the `<head>` of the HTML file.

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