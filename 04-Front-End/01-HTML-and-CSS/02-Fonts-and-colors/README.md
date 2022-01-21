## Setup

We want to continue building our profile page. If you haven't already, let's copy your profile into this challenge's folder and add a CSS file to it:

```bash
cp -r ../01-Profile-content/profile . # don't forget the trailing dot!
cd profile
touch style.css
```

## Background & Objectives

Add simple CSS rules to design **fonts** and **colors** for your profile page.

Don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!

## Specs

[This is an example](https://lewagon.github.io/html-css-challenges/02-fonts-colors-new/) of what you need to create. Here is a list of CSS rules to write:

### Body

Pick a nice `background-color`, `font-family`, `color`, `font-size` and `line-height` for the `<body>`. **Setting these font rules at the body-level will apply them on all basic text tags** (`<p>`, `<li>`, etc.).

### Headers

- Choose a nice `color` and `font-family` for headers (`<h1>`, `<h2>`, `<h3>`)
- Choose harmonious `font-size` and `line-height` for headers
- Hint: **small headers** are more elegant. If you check out any website ([Medium](https://medium.com/), [Airbnb](https://www.airbnb.com), etc.), you'll see that the `font-size` of their headers is quite small.

### Links

- Change the `color` & `text-decoration` of all the links
- Add hover effects to links using the pseudo-class `a:hover`.

## Further suggestions & resources

- Find inspiration on [Coolors](http://coolors.co/) or [Color hunt](http://colorhunt.co/) to choose an awesome color scheme.
- Pick your fonts on [Google fonts](https://www.google.com/fonts)
- On Google fonts, **Open Sans** is the standard choice for the `body`. **Raleway**, **Varela**, **Poppins**, **Roboto** are a few good ones you could use for `h1`, `h2`, `h3`.

For instance, if you wanted to use Open-Sans and Poppins (with different font-weights), you could add this at the top of your `style.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Poppins:wght@300;400;500;700");
```

Then you can apply it in the rest of your CSS:

```css
body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300; /* if you want the light version */
}
```

**Feel free to choose other fonts on Google fonts and be creative 😎🌈!**

## Finished?

Once you've finished you can push this exercise and copy the content to the next exercise folder with this command:

```bash
# Push to GitHub
git add .
git commit -m "Added fonts & colors to my profile page"
git push origin master

# Copy your profile into the next exercise folder
cp -r profile ../03-Finishing-profile-design
```
