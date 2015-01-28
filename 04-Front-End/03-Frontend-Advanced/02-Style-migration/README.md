## Background & Objectives

In this challenge, you will adopt a very clean organization of your styleheets. You will also refactor your CSS code into SASS, using variables, chaining and nesting to have a DRY $ very efficient design.

## Specs

Here is a roadmap of things to do:

1. Change **`config/variables.css.scss`** and **`config/bootstrap_variables.css.scss`** with your own values for colors and fonts.
1. Import you old CSS code. Ask yourself in which folder you should put this CSS code (`layout`? `pages`? `components`?) and how you should name the `.scss` file you create. Take your time. CSS is not a sprint, the more organized your CSS code is, the better your design will be.

When it's done, it's time to refactor your CSS code into SASS:

1. Clean redundant code using **SASS variables**, selector **nesting** & **chaining**. No more duplication!
1. Check if all your CSS classes are necessary of if some of them can already be handled in `config/variables.css.scss` or `config/bootstrap_variables.css.scss`. The less code you write, the more maintainable your project is.

## Commit & Deploy

Once you're done:

- Commit and publish you changes.

```
$ git add .
$ git commit -m "finish content migration in Middleman"
$ git push
```

- Don't forget to deploy your site with the deploy script.
