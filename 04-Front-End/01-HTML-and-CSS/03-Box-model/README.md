## Background & Objectives

Play with the box model (`margin/border/padding/width/height`) by splitting your profile information into different `<div>`.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/03-box-model/).

- You should start with the following structure for your page

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

- The `<div class="container">` is here to center its content so that you don't have a full-width content (which is very ugly).
- The `<div class="card">` are here to display nicely each group of info.
- Add a nice touch to your cards thanks to `background`, `border`, `border-radius` and `box-shadow` CSS properties. Keep it simple, with white background and subtle radius and shadows (as in the Karr lecture).


## Tips & Resources

- Here is the div centering technique for the main container

```css
.container {
  width: 500px;   /* Set width
  margin: 0 auto; /* Automatically set left/right margins */
}
```

- From this exercise, you must **absolutely** use your developer tool to play with your CSS in the browser and make live experiments.
