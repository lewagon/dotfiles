## Background & Objectives

Play with the box model (`margin/border/padding/width/height`) by splitting your profile informations into different `<div>`.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/03-box-model/).

- You should start with the following structure for your page

```html
<div id="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

- The `<div id="container">` is here to center its content so that you don't have a full-screen page (which is very ugly).
- The `<div class="card"></div>` are here to display nicely each group of infos that fit together.
- Add a nice touch to these divs thanks to `background`, `border`, `border-radius` and `box-shadow` CSS properties.


## Tips & Resources

- Here is the div centering technique for the main container

```css
div{
  width: 500px;
  margin: 0 auto; /* you can change 0 if your want top-bottom margin */
}
```

- From now on, you must **absolutely** use your browser developer tool.