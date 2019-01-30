## Background & Objectives

Time to build a full Product Hunt dashboard like [this one](http://lewagon.github.io/html-css-challenges/12-profile-with-products/)

## Further suggestions & resources

### Layout

The layout is pretty easy here since we are just re-using the profile header from our previous challenge:

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

You can put a wrapper around the products' container if you want to add a background-color (in our example, the background is white so we don't need a wrapper).

### Product design

First, you must think carefully about the HTML structure of each product. A bad HTML structure will over-complicate your CSS.

The structure of each product should look like this:

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
    <li><a href=""><i class="fas fa-heart"></i></a></li>
    <li><a href=""><i class="fas fa-share"></i></a></li>
    <li><a href=""><i class="fas fa-star"></i></a></li>
  </ul>
</div>
```

- `.product` is the **flex-box**
- `.product-upvote`, `.product-image`, `.product-body` and `.product-controls` are the **four flex items**

#### Flex-grow technique

The `.product` div is the main flexbox:

```css
.product {
  display: flex;
  align-items: center;
}
```

Then just make the `.product-body` item grow:

```css
.product-body {
  flex: 1 1 auto;
}
```

And that's it! Now, you just have to adjust padding on each flex-item.

#### List inline

For the list-inline, we have given you the code in `style.css` to save you some time.

#### Product arrow

For the product arrow, here is the CSS code to draw a triangle (pretty cool technique [from this post](https://css-tricks.com/examples/ShapesOfCSS/))

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

If you want hover effects with smooth transition, first add CSS transitions on the element concerned by hover effects:

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

Then define their `:hover` state, for example:

```css
/* 1 - Hover effects on product */

/* Background turns grey & cursor becomes Mickey Mouse's hand*/
.product:hover {
  background: #f7f7fa;
  cursor: pointer;
}
/* Upvote gets a bit bigger */
.product:hover .product-upvote {
  transform: scale(1.2);
}

/* 2 - Hover effects on product-upvote */

/* Text color turns blue */
.product-upvote:hover {
  color: #5898f1;
  cursor: pointer;
}
/* Arrow triangle turns blue */
.product-upvote:hover .product-arrow {
  border-bottom: 9px solid #5898f1;
}
```

Hover over the products on [our dashboard](http://lewagon.github.io/html-css-challenges/12-profile-with-products/) to see these effects in action.

### [Optional] Advanced Design

For an advanced design of a header like [this one](http://lewagon.github.io/html-css-challenges/12-profile-with-products-bis/), you should first improve the HTML structure of your `profile-header-infos`:

```html
<div class="profile-header-infos">
  <img src="your-picture.png" alt="">
  <div class="profile-header-username">
    <h1>papillard</h1>
    <h2>co-founder @LeWagon</h2>
  </div>
</div>
```

Then you have to <i>flexboxify</i> the `.profile-header-infos` div, and make the second flex-item grow.

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

Everything is so easy with flexbox 😊

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
