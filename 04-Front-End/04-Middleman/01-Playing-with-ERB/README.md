## Background & Objectives

Let's play with [Middleman](https://middlemanapp.com/), a nice tool coded in ruby to build **static websites**. You can use it for your personal website / portfolio or any freelance projects of static website with rich content and design.

The objective of today is to code a static version of Airbnb with a [home page](http://lewagon.github.io/middleman-airbnb/), a [team page](http://lewagon.github.io/middleman-airbnb/team.html), and a [dynamic flat page](http://lewagon.github.io/middleman-airbnb/flats/seb.html) (change `seb` by `romain` in the URL to see that it's dynamic).

But first let's get started with Middleman.

## Setup

- [Fork Le Wagon's Middleman boilerplate](https://github.com/lewagon/frontend-advanced-boilerplate/fork)


<a href="https://github.com/&lt;user.github_nickname&gt;/frontend-advanced-boilerplate/settings" target="_blank">your repo's setting</a>


```bash
$ cd ~/code/$GITHUB_USERNAME
$ git clone git@github.com:$GITHUB_USERNAME/repo_name.git
$ cd repo_name
$ bundle install
```

Here is what these commands do:

1. `cd` into your personal code folder.
1. Clone the repo on your computer. Be carefull, **don't clone the repo inside `fullstack-challenges`** but as a separated project in `~/code/$GITHUB_USERNAME`.
1. Jump into Middleman project and install all gems listed in the `Gemfile` with `bundle install`.

## Middleman commands

Then you can use two important Middleman commands:

```bash
$ middleman server # launch local server (Ctr + C to kill it)
$ middleman deploy # build HTML/CSS and push it on Github Pages
```

## Initial Bootstrap home


- Import the HTML of your Bootstrap Airbnb home in your Middleman project.
- Refactor the HTML code with ERB.
- Add a new team page to your project.


Normally you've coded your Bootstrap airbnb home (last Friday). But if you want, you can also start with [our version](https://github.com/lewagon/bootstrap-challenges/tree/master/11-Airbnb-search-form).

## Specs

In this challenge, you have to:

1. Migrate your home page **content** into the `index.html.erb` Middleman page
1. Create a new `team.html.erb` page with team members.
1. Put all common HTML parts (navbar & footer) in the `layout.html.erb`.
1. Replace **all** `<a>` tags and `<img>` tags with the **correct helpers** (`image_tag`, `link_to`, `image-url`).


## Commit and deploy

Once you have finished your content migration, commit your work:

```
$ git add .
$ git commit -m "finish content migration in Middleman"
$ git push origin master
```

Then build and push your site on Github Pages.

```
$ middleman deploy
```

You can now visit your masterpiece on `http://GITHUB_USERNAME.github.io/repo_name`. In our case, have a look at [http://lewagon.github.io/middleman-airbnb](http://lewagon.github.io/middleman-challenges).

