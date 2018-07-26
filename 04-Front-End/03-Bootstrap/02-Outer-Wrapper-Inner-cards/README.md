## Background & Objectives

Now that you are Bootstrap-grid experts, it's time to learn two very useful advanced techniques.

## Specs

99% of the time you face two issues using the grid:

- You need a **wrapper** around the grid to put a full-width background color for instance.
- You need to space **internal cards** and play with their `border`, `margin`, `padding`, etc.

Bootstrap beginners often write their CSS directly on grid components (`.container`, `.row` or `.col`) to change their `border`, `width`, `margin`, `padding`, etc... **⚠️ Never do that because it breaks the grid ⚠️**️. In fact, grid dimensions are computed automatically by Bootstrap, so changing the CSS of grid components is the easiest way to break it..

Instead, **you must use the following techniques**:

## Outside Wrapper

 If you need a special full-screen background, just put a wrapper around your container:

```html
<div class="wrapper-blue">
  <div class="container">
    <div class="row">
      <!-- all your cols -->
    </div>
  </div>
</div>
```

### Inside cards

If you want to space inner cards or change their `border`, `padding`, `margin`, etc... play with the CSS of inner cards, **not of the `.col`**:

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="card">
        <!-- card content -->
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="card">
        <!-- card content -->
      </div>
    </div>
  </div>
</div>
```

Then you can write:

```css
/* Now the grid won't break because you are manipulating the inner cards*/
.card {
  background: white;
  padding: 30px;
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 4px;
  margin: 20px 50px;
}
```

With these techniques, you can play with border/padding/margin without breaking the grid. You're safe now!

### Your turn

Apply these techniques to reproduce [this page](http://lewagon.github.io/bootstrap-challenges/02-Advanced-Bootstrap-grid/), starting with the HTML skeleton we give you. You will have to code a bit of CSS for backgrounds, padding and margin. Of course you can combine the two techniques and add **both** a wrapper around your `.container` and cards inside your `.cols`.

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
