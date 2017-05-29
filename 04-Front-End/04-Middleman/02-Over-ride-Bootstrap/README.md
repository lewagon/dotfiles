## Background & Objectives

When you work on a Middleman project (or even a Rails app), **it's crucial to organize your CSS code**. Otherwise, you will loose an incredible amount of time. Here is Le Wagon's methodology:

- Define your SCSS variables for fonts and colors in `config/_variables.scss`.
- Use these variables to over-ride your Bootstrap theme in `config/_bootstrap_variables.scss`
- Code your components in `components` (as you already know).
- For special layout's components (like `footer`, `navbar`), put them in a separated `layout` folder.
- Finally, code small page's adjustments in the `pages` folder (with one SCSS file for each page, e.g. `_home.scss`, `_login.scss`, etc..).

## Your own Bootstrap theme

Here is a roadmap of things to do:

1. In **`config/_variables.css.scss`** change the color and font scheme.
1. In **`config/_bootstrap_variables.css.scss`** use your SCSS variables to over-ride **Bootstrap SCSS variables**.
1. Look at all [Bootstrap variables](http://getbootstrap.com/customize/#less-variables) that can be customized and add new ones to `config/_bootstrap_variables.css.scss`.

## Organize your code

If you haven't done it in the previous challenge, import the CSS code of your Airbnb home in your Middleman project. For each piece of code, ask yourself: where should I write it? in `config/_variables.scss`? `layout`? `pages`? `components`? Following Le Wagon's guidelines.

## Refactor your code

Time to refactor your CSS code into SCSS:

1. Replace hexadecimal values like `#D4312D` by SCSS variables like `$red`. Your design will be more consistent since you will use same colors everywhere.
1. Go through [this guide](http://sass-lang.com/guide) and read more about SCSS. Re-write your code with **nesting** and **chaining**, as below:

```sass
.banner {
  background: $blue;
  color: white;
  h1 {
    font-size: 50px;
  }
  a {
    color: $red;
    &:hover {
      color: darken($red, 10%);
    }
  }
}
```

This SCSS code will generate the following CSS:

```css
.banner {
  background: #5E74ED;
  color: white;
}
.banner h1 {
  font-size: 50px;
}
.banner a {
  color: #D4312D;
}
.banner a:hover {
  color: #C22F2F;
}
```

Assuming that `$red: #D4312D;` and `$blue: #5E74ED;`.

## Commit & Deploy

Once you're done, commit and publish your changes:

```bash
git add .
git commit -m "Add CSS for colors and fonts and over-ride Bootstrap theme"
git push
```

Don't forget to deploy your site:

```bash
middleman deploy
```
