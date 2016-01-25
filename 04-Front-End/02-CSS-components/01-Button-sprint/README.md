## Background & Objectives

Build three different button designs (2 imposed by us, one invented by you!). Here is [your objective](http://lewagon.github.io/html-css-challenges/08-button-sprint/). We already put the HTML code in `index.html`

```html
<a href="#" class="btn-medium">Write a story</a>
<a href="#" class="btn-treehouse">Start now</a>
<a href="#" class="btn-yours">Your call</a>
```

Your job to write the associated CSS code in `button.css`

## Tips & Resources

### Organize your CSS with components files

From this point, you will start organizing your CSS code with one file for each component. Think of a button as a standard UI component, such as avatar, card, list, navbar, tabs, form, etc.. All these UI components deserve a different CSS file. Your project architecture will look like

```
.
├── css
│   ├── components
│   │   └── button.css
│   └── style.css
└── index.html
```

Then in `style.css`

```css
/* Importing all components file */
@import url("components/button.css");

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
