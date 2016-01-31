## Background & Objectives

The objective of this challenge is to import the HTML of your Bootstrap Airbnb home and refacto the code with ERB.

- Fork our [middleman boilerplate](https://github.com/lewagon/frontend-advanced-boilerplate).
- Rename your Github repo in the settings (`frontend-advanced-boilerplate` is not a very cool name).
- Then clone this renamed repo on your computer. Be careful, don't clone it in **`fullstack-challenges`** folder but as a new separated project.
- Also install all gems listed in the `Gemfile` with `bundle`

```
$ cd ~/code/$GITHUB_USERNAME
$ git clone git@github.com:$GITHUB_USERNAME/repo_name.git
$ cd repo_name
$ bundle install
```

Then you have two important Middleman commands:

```bash
$ middleman server # launch local server (Ctr + C to kill it)
$ middleman deploy # build HTML/CSS and push it on Github Pages
```

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

## Starting Bootstrap home

You can start with this [Airbnb Bootstrap home](https://github.com/lewagon/bootstrap-challenges/tree/master/11-Airbnb-search-form) if you don't have yours.
