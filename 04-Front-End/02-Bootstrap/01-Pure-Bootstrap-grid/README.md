## Background & Objectives

Practice the Bootstrap grid. Learn how to build various grids with different responsive behaviors.

## Specs

Here is [the smiley grids](http://lewagon.github.io/bootstrap-challenges/01-Pure-Bootstrap-grid/) you should reproduce in this challenge. Each of these 4 grids has the same starting point:

```html
<div class="container">
  <div class="row">
    <!-- Different options depending on your grid -->
  </div>
</div>
```

And then you will add different `.col-??-??` depending on each behavior you want.

## Tips & Resources

- When designing grids, always start writing your `.col` classes for the smallest resolution `xs`. Asking yourself which proportion you want for this resolution (full screen (`.col-xs-12`)? half screen (`.col-xs-6`)? 25%-screen (`.col-xs-3`)?. Then move on to the next size (`sm`) and repeat this introspection work. And so on and so on until you get to `lg`.

- Notice that you are not obliged to write all the `xs/sm/md/lg` classes. If you forgot one, the immediate preceding class applies. For instance a `<div class="col-xs-12 col-md-6">` will be full-screen from mobile to laptop, and then half-screen from labtop to larger screens (desktop).

- The 4th smiley grid is a bit tricky. You'll have to nest rows. Here is how you do this:

```html
<div class="container">
  <div class="row">
    <div class="col-sm-3">
      <!-- No nesting here -->
      <div class="col-sm-12"></div>
    </div>
    <div class="col-sm-9">
      <!-- Here we nest two rows -->
      <div class="row">
        <!-- A first one with two cols -->
        <div class="col-sm-6"></div>
        <div class="col-sm-6"></div>
      </div>
      <div class="row">
        <!-- A second one with just one col -->
        <div class="col-sm-12"></div>
      </div>
    </div>
  </div>
</div>
```
