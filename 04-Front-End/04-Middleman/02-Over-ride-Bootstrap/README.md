## Background & Objectives

When you work on a Middleman project (or a Rails app), it's very important to organize your CSS code. Otherwise, you can loose a lots of time in the CSS if the code is messy. Here is Le Wagon's methodology:


- SCSS variables for fonts and colors are defined in `config/_variables.scss`.
- You can use these variables to over-ride your Bootstrap theme in `config/_bootstrap_variables.scss`
- Then your components file go in `components` (as usually).
- Special layout components, like `footer` and `navbar` go in a separated `layout` folder.
- Finally, small page adjustments must be put in the `pages`folder (with one SCSS file for each page like `_home.scss`, `_login.scss`, etc.).


## Your own Bootstrap theme

Here is a roadmap of things to do:

1. In **`config/_variables.css.scss`** change the color and font scheme.
1. In **`config/_bootstrap_variables.css.scss`** use your SCSS variables to over-ride **Bootstrap SCSS variables**.
1. Look at all [Bootstrap variables](http://getbootstrap.com/customize/#less-variables) that you can be overridden and add new ones to your `config/_bootstrap_variables.css.scss` file.

## Organize your code

If you haven't done it in the previous challenge, import the CSS code of your Bootstrap home in your Middleman project. For each piece of code, ask yourself: where should I write it? in `config/_variables.scss`? `layout`? `pages`? `components`?


## Refactor your code

It's time to refactor your CSS code into SCSS:

1. Replace hexadecimal values like `#D4312D` by using your SCSS variables like `$red` instead. Your design will be more consistent as you will always use same colors.
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

This SCSS code will generate the following CSS:


```scss
.banner {
  background: #5E74ED;
  color: white;
}
.banner  h1 {
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

Once you're done, commit and publish you changes:

```
$ git add .
$ git commit -m "Add CSS for colors and fonts and over-ride Bootstrap theme"
$ git push
```

Don't forget to deploy your site:

```
$ middleman deploy
```
