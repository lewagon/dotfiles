## Background & Objectives

Now that you are Bootstrap-grid experts, learn more advanced but very useful techniques with the grid.

## Specs

99% of the time you face two issues using the grid:

- You need a **full-screen** background around your grid.
- You need to insert some kind of **inner "cards"** inside your grid.

But here is the problem. You cannot change directly width, border, and lateral paddings of grid components (`.container`, `.row` or `.col`). Otherwise **you will break the grid**.

So how can you do? Read what follows to figure out :)

### Full-screen background

Place a full-screen background div **around** the grid.

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

### Inner "cards"

Place your designed divs **inside each col**

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

With these two techniques, you can put as much padding, border, margin as you want without crashing the grid. Indeed, **you don't touch directly at grid components** (`container/row/col`). You only design divs placed around or inside the grid. You can feel safe!

### Your turn

Apply these two techniques to reproduce [this page](http://lewagon.github.io/bootstrap-challenges/02-Advanced-Bootstrap-grid/), starting with the HTML skeleton we give you. You will have to code a bit of CSS for backgrounds, padding and margin.
