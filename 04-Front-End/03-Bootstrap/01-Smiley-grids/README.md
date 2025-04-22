## Background & Objectives

Practice the Bootstrap grid. Learn how to build various grids with different responsive behaviors.

## Specs

Here are [the smiley grids](http://lewagon.github.io/bootstrap-challenges/01-New-Bootstrap-grid/) that you must reproduce in this challenge. Each of these 3 grids has the same starting point:

```html
<div class="container">
  <div class="row">
    <!-- Different variants depending on responsive behavior -->
  </div>
</div>
```

After that, you'll have to add different `.col-??-??` inside the `.row` depending on the behavior you want.

⚠️ **Don't break the grid**

Do NOT add Bootstrap grid classes on the same level as other CSS.

```html
<div class="container">
  <div class="row">
    <!-- 👎 -->
    <div class="card bg-light col-6">
      😀
    </div>
  </div>
</div>
```

Instead build a grid around the content, and insert it inside like this:


```html
<div class="container">
  <div class="row">
    <!-- 👍 -->
    <div class="col-6">
      <div class="card bg-light">
        😀
      </div>
    </div>
  </div>
</div>
```

## Further suggestions & resources

- When coding a grid, always start with the `.col` class for the smallest resolution. Ask yourself which proportion you want on mobile. Full screen (`.col-12`)? Half screen (`.col-6`)? 25%-screen (`.col-3`)?.
- Then move on to the next resolution (`sm`) and repeat this thought process 🤔. And so on, and so on, until you get to `xxl`.
- You are not obliged to write all the `sm/md/lg/xl/xxl` classes. If you don't write all of them, it's always the preceding class that applies. For instance a `<div class="col-12 col-lg-6">` will be full-screen for screens less wide than 960px wide and half-screen for screens wider than 960px.

NB: don't forget to **hard refresh** your browser (`Cmd` / `Ctrl` + Shift + R`) to clear your browser's cache if your page doesn't seem to display your current code!
