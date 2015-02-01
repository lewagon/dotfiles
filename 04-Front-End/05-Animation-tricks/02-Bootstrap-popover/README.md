## Background & Objectives
A challenge to play with nice Bootstrap components: [popovers](http://getbootstrap.com/javascript/#popovers).

## Specs

Starting with the index page we give you, reproduce [this Beatles page](http://lewagon.github.io/bootstrap-challenges/05-bootstrap-popover/) where a nice popover appears when you hover on a Beatles picture.

The popover is not the most accessible Bootstrap component. Here is a roadmap:

- Give a class of your choice to the element triggering the popover, here the Beatles images. Example:

```html
<img src="images/ringo.png" alt="Ringo" class="img-popover">
```

- Now that these elements have a class, you can define some jQuery event on them using the Bootstrap `popover` function. You can write this code at the bottom of you `index.html` page, in a `<script>` section (we already prepared this section for you).


```javascript
$(document).ready(function(){
  $(".img-popover").popover({
    html: true,
    trigger: "hover",
    placement: "bottom"
  });
})
```

- The `placement` js option allows you to give a direction to the popover (top/right/bottom/left) while the `html: true` option allows you to write the popover content right into the HTML in a `data-content` attribute on each image. Example:

```html
<img src="images/ringo.png" alt="Ringo" class="img-popover" data-content="<img src='images/ringo.png' class='img-circle img-responsive'><h4>Ringo</h4><p class='text-muted'>Ringo Starr</p>">
```

- Cherry on the cake, popover divs inserted by Bootstrap all have a `class="popover"` so that you can even re-design your popover div as you wish in `popover.css`. Example:

```css
.popover {
  text-align: center;
  width: 150px;
  padding: 10px 30px;
}
```

Your turn to build the best popovers!