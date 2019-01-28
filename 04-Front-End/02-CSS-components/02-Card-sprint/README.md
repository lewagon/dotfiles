## Background & Objectives

Now let's move on to building a slightly more complex component. Work on building the three different card designs that we saw during the lecture. Here is [your objective](http://lewagon.github.io/html-css-challenges/TODO). We have already put the HTML code in `index.html`

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

Your job is now to write the associated CSS in `card.css`.

Don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!

## Organize your CSS with component files

From this point, you will start organizing your CSS code with **one CSS file for each component**. A button is a standard component, such as an avatar, a card, a list, a navbar, a tab, a form, etc. Each of these components deserve their own CSS file. Your project architecture will look like:

```
.
├── css
│   ├── components
│   │   ├── avatar.css
│   │   ├── banner.css
│   │   └── button.css
│   └── style.css
└── index.html
```

Then in `style.css`:

```css
/* Importing all components file */
@import url("components/avatar.css");
@import url("components/banner.css");
@import url("components/button.css");

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

## Don't forget the hover

Don't forget to design the `.btn:hover` state for each of your buttons.
