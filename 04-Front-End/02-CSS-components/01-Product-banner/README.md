## Background & Objectives

Build a beautiful banner with a linear gradient background.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/08-nice-banner/).

## Tips & Resources

### Organize your CSS with components files

From this point, you will start organizing your CSS code with different **components** files. Think of a banner as a standard UI component, such as avatars, cards, buttons, lists, navbars, navs, forms, etc.. All these UI components deserve a different CSS file. Your project architecture will look like

```
.
├── css
│   ├── banner.css
│   └── style.css
└── index.html
```

Then in `style.css`

```css
/* Importing all components file */
@import url("banner.css");

/* General style rules on fonts and colors */
body {
  margin: 0;
  font-family: Open-sans, sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
.text-center {
  text-align: center;
}
```

Then you just need to link the `style.css` file in your HTML `<head>`:

```html
 <link rel="stylesheet" href="css/style.css">
```

### Relative > absolute pattern

Here is an idea of the HTML markup

```html
<div class="banner text-center" style="background-image: url('https://unsplash.it/1000/400?image=0')">
  <div class="banner-gradient"></div>
  <div class="banner-content">
    <h1>Some Stuff</h1>
    <p>Very cool stuff, useful and smart</p>
  </div>
</div>
```

In this challenge you'll have to use the relative > absolute pattern seen in the lecture.

- First **pin** the `.banner` with `position: relative`
- Then position the gradient with respect to the banner thanks to `position: absolute` and make it cover all the banner area with

```css
.banner-gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```

### Linear gradient

[A bit of documentation on linear gradients](https://developer.mozilla.org/fr/docs/Web/CSS/linear-gradient). A nice one used in Product Hunt :

```css
background-image: linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%);
```

### z-index

For positioned element **only** (relative/absolute/fixed), you can play on the z-index, which will give you the order of the different positioned layer. For instance

```css
.banner {
  position: relative;
  z-index: 0;
}
.banner-gradient {
  position: absolute;
  z-index: 1;
}
.banner-text {
  position: relative;
  z-index: 2;
}
```

Here we want the gradient filter to be above the banner, and we want the banner text to be above the filter. Hence the order of the z-indexes. Notice that we have to position the banner-text since z-index works only with **positioned elements**.


