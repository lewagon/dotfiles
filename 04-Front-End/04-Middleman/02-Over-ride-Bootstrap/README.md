## Background & Objectives

In this challenge, you will adopt a very clean organization of your styleheets. You will also refactor your CSS code into SCSS code using variables.

## Define your own Bootstrap theme

Here is a roadmap of things to do:

1. In **`config/variables.css.scss`** change the color and font scheme and define your own one.
1. In **`config/bootstrap_variables.css.scss`** use **your SCSS variables** to over-ride **bootstrap SCSS variables**.
1. Look at all [Bootstrap variables](http://getbootstrap.com/customize/#less-variables) and try to add new ones to your `config/bootstrap_variables.css.scss` file.

## Organize your code

1. Import the CSS code of your Bootstrap home in your Middleman project. For each piece of code, ask yourself:

- In which folder should I write it (`config/variables`? `layout`? `pages`? `components`?)

Remember:

1. `config/variables` is in charge of fonts and colors.
1. 90% of your CSS code is `components` design
1. The `layout` is a folder to gather components used on all pages (e.g. navbar / footer).
- The `pages` folder will have one file per page to handle small CSS adjustments (e.g. some padding/margin correction)

## Refactor your code

When it's done, it's time to refactor your CSS code into SCSS:

1. Use **your SCSS variables** (e.g. `$red`) instead of hexadecimal values (e.g. `#D73B3A`). Your design will be more consistent.
1. Go through [this guide](http://sass-lang.com/guide) to discover more about SCSS. Re-write your code with nesting and chaining, as below:


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

Once you're done:

- Commit and publish you changes.

```
$ git add .
$ git commit -m "finish style migration in Middleman"
$ git push
```

- Don't forget to deploy your site

```
$ middleman deploy
```
