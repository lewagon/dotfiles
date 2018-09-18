## Background & Objectives

Practice the Bootstrap grid. Learn how to build various grids with different responsive behaviors.

## Specs

Here are [the smiley grids](http://lewagon.github.io/bootstrap-challenges/01-Pure-Bootstrap-grid/) that you must reproduce in this challenge. Each of these 3 grids has the same starting point:

```html
<div class="container">
  <div class="row">
    <!-- Different variants depending on responsive behavior -->
  </div>
</div>
```

After that, you'll have to add different `.col-??-??` inside the `.row` depending on the behavior you want.

## Further suggestions & resources

- When coding a grid, always start with the `.col` class for the smallest resolution `xs`. Ask yourself which proportion you want on mobile. Full screen (`.col-xs-12`)? Half screen (`.col-xs-6`)? 25%-screen (`.col-xs-3`)?.
- Then move on to the next resolution (`sm`) and repeat this thought process 🤔. And so on, and so on, until you get to `lg`.
- You are not obliged to write all the `xs/sm/md/lg` classes. If you don't write all of them, it's always the preceding class that applies. For instance a `<div class="col-xs-12 col-md-6">` will be full-screen from mobile to laptop, and then half-screen from laptop to larger screens (desktop).

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
