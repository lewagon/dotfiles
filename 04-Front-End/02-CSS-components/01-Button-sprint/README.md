## Background & Objectives

Work on three different button designs (two given by us, one of your choice). Here is [your objective](http://lewagon.github.io/html-css-challenges/08-button-sprint/). We have already put the HTML code in `index.html`

```html
<a href="#" class="btn-medium">Write a story</a>
<a href="#" class="btn-treehouse">Start now</a>
<a href="#" class="btn-yours">Your call</a>
```

Your job is now to write the associated CSS in `button.css`.

Don't forget to **hard refresh** your browser (`Cmd + Shift + R`) to clear your browser's cache if your page doesn't seem to display your current code!

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

## Spacing around a link

You might have noticed that `margin-top` or `margin-bottom` does not apply on your links by default. This is because the `<a>` tag is an inline element. If you want to apply vertical spacing to links you will need to change their `display` property to `inline-block` or `block`.
