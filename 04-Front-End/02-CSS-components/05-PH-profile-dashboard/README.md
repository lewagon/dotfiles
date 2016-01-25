## Background & Objectives

Time to build a full Product Hunt dashboard like [this one](http://lewagon.github.io/html-css-challenges/12-profile-with-products/)


## Tips & Resources

### Layout

The layout is pretty easy here

```html
<div class="profile-header-wrapper">
  ...
</div>

<div class="container">
  <div class="product"></div>
  <div class="product"></div>
  <div class="product"></div>
  ...
</div>
```

You can of course put a wrapper around the container if you want to have a background color (but in our example we keep a white background for product)

### Product design

First, you must think carefully about the HTML structure of each product. Bad HTML structure means impossible design.. It should look like this:

```html
<div class="product">
  <div class='product-upvote'>
    <div class="product-arrow"></div>
    <div class='product-count'>95</div>
  </div>
  <img class="product-image" src="...">
  <div class='product-body'>
    <h3>Kudoz</h3>
    <p>Tinder for job search</p>
  </div>
  <ul class="product-controls list-inline ">
    <li><a href=""><i class="fa fa-heart"></i></a></li>
    <li><a href=""><i class="fa fa-share"></i></a></li>
    <li><a href=""><i class="fa fa-star"></i></a></li>
  </ul>
</div>
```
#### Flexbox technic

The `<div class="product">` is the flexbox

```css
.product {
  display: flex;
  align-items: center;
}
```

Then you just have to make the `product-body` grow, and that's it !

```css
.product-body {
  flex: 1 1 auto;
}
```

You can then adjust paddings to fine-tune your flex items.


#### List inline

For the list-inline, we put you the code in `style.css` to make you save time

#### Product arrow

For the product-arrow, here is the CSS code to draw a triangle (pretty cool technic)

```css
.product-arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid transparent;
  border-bottom: 9px solid black;
  border-radius: 2px;
  margin: auto;
}
```

#### Hover effects

If you want nice hover effects with smooth transition, first put CSS transitions on the element concerned:

```css
.product {
  transition: all 0.15s ease;
}
.product-upvote {
  transition: all 0.15s ease;
}
.product-arrow {
  transition: all 0.15s ease;
}
```

Then define their hover state, for example:

```css
/* 1) Hover effects on product */
/* Background turns grey + cursor becomes Mickey Mouse's hand*/
.product:hover {
  background: #f7f7fa;
  cursor: pointer;
}
/* Upvote gets a bit bigger */
.product:hover .product-upvote {
  transform: scale(1.2);
}


/* 2) Hover effects on product-upvote */
/* Text color turns blue */
.product-upvote:hover {
  color: #5898f1;
  cursor: pointer;
}
/* Arrow triangle turns blue
.product-upvote:hover .product-arrow {
  border-bottom: 9px solid #5898f1;
}
```

Try to hover things on [the dashboard](http://lewagon.github.io/html-css-challenges/12-profile-with-products/) to see the link with this CSS code.


### Optional - More advanced header

If you want a more advanced design of the header like [this one](http://lewagon.github.io/html-css-challenges/11-profile-with-tabs-bis/), first you will have to make your HTML structure a bit richer:

```html
<div class="profile-header-wrapper">
  <div class="container profile-header-container">
    <div class="profile-header-infos">
      <img src="https://avatars0.githubusercontent.com/u/2471555?v=3&s=460" alt="">
      <div class="profile-header-username">
        <h1>papillard</h1>
        <h2>co-founder @LeWagon</h2>
      </div>
    </div>
    <div class="tabs">
      ...
    </div>
  </div>
</div>
```

Then you have to <i>flexboxize</i> the new `.profile-header-infos` div, and make the second flex-item grow.

```css
.profile-header-infos {
  display: flex;
  align-items: center;
}
.profile-header-username {
  flex: 1 1 auto;
  padding: 20px;
}
```

Everything is so cool with flexbox :)

