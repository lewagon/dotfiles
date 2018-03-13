## Background & Objectives

When you work on a Middleman project (or even a Rails app), **it's crucial to organize your SCSS code**. If you don't, you will lose an incredible amount of time. Here is Le Wagon's methodology:

- Define your SCSS variables for fonts and colors in `config/_fonts.scss` and `config/_colors.scss`.
- Use these variables to over-ride Bootstrap SCSS variables in `config/_bootstrap_variables.scss`
- Code your components in `components` (as you already know).
- To build layouts (like a layout for a [user's dashboard](https://lewagon.github.io/layouts-demo/grid-layout.html) `_user_dashboard.scss`), add SCSS partials in the `layouts` folder.
- Finally, for specific design adjustments on a page, code the SCSS in the `pages` folder (with one SCSS file for each page, e.g. `_home.scss`, `_team.scss`, etc.).

## Your own Bootstrap theme

Here is a roadmap of things to do:

- In `config/_fonts.scss` and `config/_colors.scss` change the color and font scheme. Be creative!
- In `config/_bootstrap_variables.scss` use your SCSS variables to over-ride **Bootstrap SCSS variables**.
- Look at all of the [Bootstrap variables](http://getbootstrap.com/customize/#less-variables) that can be customized and add new ones to `config/_bootstrap_variables.scss` to experiment things.


## Refactor your code

Time to refactor your CSS code into SCSS:

1. Replace hexadecimal values like `#D4312D` with SCSS variables like `$red`. Not only your design will be more consistent as you will use the same colors everywhere, but if you ever wanted to change the colour of your `$red` slightly, you would only need to change one line of code!
1. Go through [this guide](http://sass-lang.com/guide) and read more about SCSS. Re-write your code with **nesting** and **chaining**, as below:

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

Once you're done and you have a cool design, `commit` your changes:

```bash
git add .
git commit -m "Added CSS for colors and fonts to over-ride Bootstrap theme"
git push origin master
```

Don't forget to `deploy` your site:

```bash
middleman deploy
```
