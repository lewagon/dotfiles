## Background & Objectives

The goal of the two next challenges is to reproduce [this website](http://lewagon.github.io/karr-examples-frontend-02/), which has the following characteristics :

- it has a [home page](http://lewagon.github.io/karr-examples-frontend-02/) with
  - a bootstrap navbar with links to the about page and to social networks
  - a nice banner with a background image
  - a responsive list of 4 features
  - a nice footer
  - an form in a bootstrap modal to order an icecream toggled when you click on the banner button

- it also has a [about page](http://lewagon.github.io/karr-examples-frontend-02/about.html)

## Specs

Your project should have a `index.html` file for the home page and a `about.html` file for the about page.

## Tips

This is a 2-steps project. In this first part, don't bother about over-riding the navbar style or the Bootstrap button's color. We will see how to do that tomorrow! Just focus on a pure-Bootstrap mockup. Here are some pieces of advice:

- Modify step-by-step the HTML of the navbar you picked in [Bootstrap components](http://getbootstrap.com/components) to keep just the links you need.
- Use the grid system cautiously to have the good display of the features on all media (desktop, tablets, mobile).

You will have to create several pages, and you will see your code is not DRY. It's fine for now, but you will see that using Rails, we can introduce a template system to keep our HTML DRY.