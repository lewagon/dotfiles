## Setup

Again, let's continue building our profile page and copy our previous profile in the current directory of this challenge:

```bash
cp -r ../02-Fonts-and-colors/profile .
```

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

Here is the div centering technique for the main container:

```css
.container {
  width: 500px;   /* Set width */
  margin: 0 auto; /* Automatically set left/right margins */
}
```

From this exercise (and for next ones), you must **absolutely** use your developer tool to play with your CSS in the browser and test things.

## Make it responsive with media queries

If you want a responsive design, you can add media queries in CSS. They work a bit like an `if` statement in ruby. Basically **you can define CSS rules that will only apply if the window is smaller than a given width**. For instance, if you want a responsive container, you can build it like this:


```css
@media (max-width: 960px) {
  /* For a screen < 960px, this CSS will be read */
  .container {
    width: 700px;
  }
}
@media (max-width: 720px) {
  /* For a screen < 720px, this CSS will be read */
  .container {
    width: 500px;
  }
}
@media (max-width: 540px) {
  /* For a screen < 540px, this CSS will be read */
  .container {
    width: 300px;
  }
}
```

Try to resize your window to understand how media queries work.

### ⚠️⚠️⚠️ Be careful with media queries' order ⚠️⚠️⚠️

Such as for `if` statements in ruby, order matters! If several conditions are `true`, it's the last CSS rule that will be applied.

