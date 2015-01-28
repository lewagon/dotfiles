## Background & Objectives

Now that you are Bootstrap-grid experts, learn more advanced but very usefull techniques with the grid.

## Specs

99% of the time you face two issues using the grid:

- You need a **full-screen** background around your grid.
- You need to insert some kind of **inner "cards"** into your grid.

You should never change the width, border, and lateral paddings of the grid components (`.container`, `.row` or `.col`). Because if you do so, **you will break the grid**. So here is how you can do:

- **full-screen** background: place a background div **around** the grid.

```html
<div class="bg-blue">
  <div class="container">
    <div class="row">
      <!-- all you cols -->
    </div>
  </div>
</div>
```

```css
.bg-blue {
  background: #3079AB;
  color: white;
}
```

- **inner "cards"**: place nice divs **inside the col**

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

With these two techniques, you can put as much padding, border, margin as you want and you will never break the grid, since you never touch directly at grid components (`container/row/col`).

### Your turn

Apply these two techniques to reproduce [this page](http://lewagon.github.io/bootstrap-challenges/02-Advanced-Bootstrap-grid/), starting with the HTML skeleton we give you. You will have to code a bit of CSS for backgrounds, padding and margin.
