## Background & Objectives

Define your own graphical variables for fonts and colors in `config/_variables.scss` and use them to over-ride Bootstrap theme. Then import your Airbnb CSS code in your Middleman project respecting the new organization of stylesheets. Finally refactor your code in SCSS.

## Define your own Bootstrap theme

Here is a roadmap of things to do:

1. In **`config/_variables.css.scss`** change the color and font scheme and define your own one.
1. In **`config/_bootstrap_variables.css.scss`** use **your SCSS variables** to over-ride **Bootstrap SCSS variables**.
1. Look at all [possible variables](http://getbootstrap.com/customize/#less-variables) that you can over-ride and try to add new ones to your `config/_bootstrap_variables.css.scss` file.

## Organize your code

1. Import the CSS code of your Bootstrap home in your Middleman project. For each piece of code, ask yourself:

**Where should I write it (`config/_variables.scss`? `layout`? `pages`? `components`?)**

Remember:

1. `config/_variables.scss` is in charge of fonts and colors.
1. The `components` folder represents 90% of your CSS code.
1. The `layout` folder gathers components present on all pages (e.g. navbar / footer).
- The `pages` folder has one file per page to handle small CSS adjustments (e.g. some `padding`/`margin` correction)

## Refactor your code

When it's done, it's time to refactor your CSS code into SCSS:

1. Use your SCSS variables from `config/_variables.scss` (e.g. `$red`) instead of hexadecimal values (e.g. `#D73B3A`). Your design will be more consistent as you will use same colors.
1. Go through [this guide](http://sass-lang.com/guide) and read more about SCSS. Re-write your code with nesting and chaining, as below:


```scss
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

## Commit & Deploy

Once you're done, commit and publish you changes:

```
$ git add .
$ git commit -m "finish style migration in Middleman"
$ git push
```

Don't forget to deploy your site:

```
$ middleman deploy
```
