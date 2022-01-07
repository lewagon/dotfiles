## Background & Objectives

Now let's move on to building a slightly more complex component. Work on building the three different card designs that we saw during the lecture. Here is [your objective](http://lewagon.github.io/html-css-challenges/14-card-sprint/). We have already put the starting HTML code in `index.html`

```html
<div class="card-category">
  <!-- [ ... ] -->
</div>
<div class="card-product">
  <!-- [ ... ] -->
</div>
<div class="card-trip">
  <!-- [ ... ] -->
</div>
```

Your job is now to add HTML inside each card, and the associated CSS in `cards.css` (the CSS for all three cards can go in the same file).

**NOTE**: Try building the `card-trip` without the user avatar in the bottom right hand corner for now. We will add that after we complete our cards.

Don't forget to **hard refresh** your browser (`Cmd + Shift + R`) to clear your browser's cache if your page doesn't seem to display your current code!

## Organize your CSS with component files

Much like in the last exercise, we will use the new professional structure for our stylesheets. We can put all the css for our different card classes in one css file `cards.css`:

```
.
├── css
│   ├── components
│   │   └── cards.css
│   └── style.css
└── index.html
```

Then in `style.css`:

```css
/* Import fonts from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Raleway:wght@300;400;500;700");

/* Importing all components file */
@import url("components/cards.css");

/* General for fonts and colors */
body {
  margin: 100px;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
a {
  text-decoration: none;
}
.text-center {
  text-align: center;
}

```

Then you just need **one unique link to `style.css`** in your HTML file:

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

## Further suggestions & resources

Now that you have designed your three cards, let's update your last card `card-trip` with a user avatar in the bottom right hand corner. For pinning an element to a specific position within another element, we will use the [Relative > Absolute pattern](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/). Below are the steps for positioning an element using this pattern:

### Set the main div as `position: relative`:

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-relative.png)

### Pin a div inside with `position: absolute` (relative to parent)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-top.png)

This will allow us to position the `.child` in relation to the `.parent` with `position: relative;`. You can then use the directional attributes `top`, `bottom`, `left` and `right` to move the `.child` around 📐.

Be aware, if you add a negative value like `right: -20px`, this will shift the inside div 20px **outside** the parent div.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/position-bottom.png)

Now you can play this technique to add a cool overlay avatar on your `.card-trip` like below.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/card-position.png" alt="" width="400">
</div>
