## Background & Objectives

Now that you are Bootstrap-grid experts, learn two advanced techniques very useful.

## Specs

99% of the time you face two issues using the grid:

- You need a **full-screen** wrapper around your grid.
- You need **inner cards** inside your grid to play with their border, margin, padding, etc.


Bootstrap beginners often write CSS directly on grid components (`.container`, `.row` or `.col`) to change their border, width, margin, padding, etc... By doing so **they break the grid**. In fact, grid dimensions are computed automatically by Bootstrap, so playing with grid elements is the best way to break the grid..

Instead, **you must use the following techniques.**

## Outside Wrapper

 If you need a special background, just put a wrapper around the container:

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

If you want to change border/padding/margin/etc of grid inner elements, just add cards **inside each col**:

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

Then you can write:

```css
/* You will not break the grid */
/* Because cards are not direct grid element (like container/row/col) */
.card-white {
  background: white;
  padding: 30px;
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 4px;
  margin: 20px 50px;
}
```

With these techniques, you can play on border, padding, margin without breaking the grid. Indeed, **you don't touch directly at grid components** (`container/row/col`). You can feel safe!

### Your turn

Apply these two techniques to reproduce [this page](http://lewagon.github.io/bootstrap-challenges/02-Advanced-Bootstrap-grid/), starting with the HTML skeleton we give you. You will have to code a bit of CSS for backgrounds, padding and margin. Of course you can combined the two techniques and having **both** a wrapper around your `.container` and cards inside your `.cols`.
