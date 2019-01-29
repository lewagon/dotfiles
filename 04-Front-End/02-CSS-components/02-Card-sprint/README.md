## Background & Objectives

Now let's move on to building a slightly more complex component. Work on building the three different card designs that we saw during the lecture. Here is [your objective](http://lewagon.github.io/html-css-challenges/14-card-sprint/). We have already put the starting HTML code in `index.html`

```html
<div class="card-category">
  [   ]
</div>
<div class="card-product">
  [   ]
</div>
<div class="card-trip">
  [   ]
</div>
```

Your job is now to add the content for each card and the associated CSS in `card.css`.

NOTE: Try builiding the `card-trip` without the user avatar in the bottom right hand corner for now. We will add that after we complete our cards.

Don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!

## Organize your CSS with component files

Much like in the last exercise, we will use the new professional structure for our stlesheets. We can put all the css for our differenc card classes in one css file: `card.css`:

```
.
├── css
│   ├── components
│   │   └── card.css
│   └── style.css
└── index.html
```

Then in `style.css`:

```css
/* Importing all components file */
@import url("components/card.css");

/* General style rules for fonts and colors */
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
```

Then you just need **one unique link to `style.css`** in your HTML file:

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

## Further suggestions & resources

Now that you have designed your three cards, lets update your last card `card-trip` with a user avatar in the bottom right hand corner. For pinning an element to a specific position within another element, we will use the [Relative > Absolute pattern](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/). Below are the steps for positioning an element using this pattern:

1. Pin the main div with `position: relative`:
TODO SKETCH

2. Put the inside div in `position: absolute`. This will allow us to position the inside div in relation to the next parent div with position relative (the main div in our example) using the position attributes `top`, `bottom`, `left` and `right`. Be aware, if you add a style rule on the insed div of `top: 10px`, this will shift the inside div 10px **down** from where it would usually be.
TODO SKETCH

3. Now you can play with the inside `div`. Use this technique to position the user avatar in the bottom right and corner of our `card-trip`.
