## Background & Objectives

Now that you are Bootstrap-grid experts, learn 2 advanced techniques very useful.

## Specs

99% of the time you face two issues using the grid:

- You need a **full-screen** wrapper around your grid.
- You need **inner cards"** inside your grid to play on their border, margin, padding, etc.


Bootstrap beginners often try to change directly grid components (`.container`, `.row` or `.col`) playing on their border, width, padding, etc... By doing so, **they break the grid**. Indeed, `.col` dimensions are computed automatically by Bootstrap so if you add them border, padding, or margin, you just break them.

Instead, use the 2 following techniques.

## Outside Wrapper

Put a wrapper around the container if you need a special background.

```html
<div class="wrapper-blue">
  <div class="container">
    <div class="row">
      <!-- all you cols -->
    </div>
  </div>
</div>
```

### Inside cards

Put cards **inside each col** if you want to play on their border/padding/margin/etc..

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="card-white">
        <!-- card content -->
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="card-white">
        <!-- card content -->
      </div>
    </div>
  </div>
</div>
```

```css
.card-white {
  background: white;
  padding: 30px;
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 4px;
  margin: 20px 50px;
}
```

With these techniques, you can play on border, padding, margin without crashing the grid. Indeed, **you don't touch directly at grid components** (`container/row/col`). You can feel safe!

### Your turn

Apply these two techniques to reproduce [this page](http://lewagon.github.io/bootstrap-challenges/02-Advanced-Bootstrap-grid/), starting with the HTML skeleton we give you. You will have to code a bit of CSS for backgrounds, padding and margin. Of course you can combined the two techniques and having **both** a wrapper around your `.container` and cards inside your `.cols`.
