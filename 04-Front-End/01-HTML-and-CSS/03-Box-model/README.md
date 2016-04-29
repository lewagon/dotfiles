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

- The `<div class="container">` is here to center the page content with some left/right margin so that it does not take 100% of the window (which would be ugly).
- The `<div class="card">` is here to group some info into a nice white box.
- Add a cool touch to your cards thanks to `background`, `border`, `border-radius` and `box-shadow` CSS properties. Keep it simple, with white background and subtle radius and shadows (as in the Karr lecture).

## Further suggestions & resources

- Here is the div centering technique for the main container:

```css
.container {
  width: 500px;   /* Set width
  margin: 0 auto; /* Automatically set left/right margins */
}
```

- From this exercise (and for next ones), you must **absolutely** use your developer tool to play with your CSS in the browser and make experiments.
