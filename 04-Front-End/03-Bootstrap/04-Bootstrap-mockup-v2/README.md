## Background & Objectives

A challenge to put all your Bootstrap skills together (utility classes, grid) and build a nice home page. For this challenge, continue to work on the previous project. No need to start from scratch!

## Specs

Improve your previous page using Bootstrap grid to get [this final result](http://lewagon.github.io/bootstrap-challenges/07-Bootstrap-mockup-with-grid/). Notice that the **cards are injected in the grid this time**, that's the main difference with the previous challenge. Remember the two grid techniques you saw previously and re-apply them on your page.

## Tips & Resources

It's always simpler to start coding grid **without content**, and insert content in the `.col` **as a second step**.

```html
<!-- Example of pure grid code without content -->
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-6"></div>
    <div class="col-xs-12 col-sm-6"></div>
    <div class="col-xs-12 col-sm-6"></div>
    <div class="col-xs-12 col-sm-6"></div>
  </div>
</div>
```