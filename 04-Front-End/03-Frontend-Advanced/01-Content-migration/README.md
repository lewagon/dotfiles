## Background & Objectives

The objective of this challenge is to migrate your Bootstrap landing page **content** into Middleman and start using templates and SASS. For migrating your CSS, wait for the next challenge.

- Fork our [middleman boilerplate](https://github.com/lewagon/middleman-boilerplate).
- Then rename your Github repo in the settings (since `middleman-boilerplate` is not a very glam name).
- Finally clone this renamed repo locally on your computer. Be carefull, don't clone it in **`fullstack-challenges`**. It's a new separated project with its own versionning. Clone it in `code/your_user_name/` at the same level as `fullstack-challenges` and `dotfiles`.

```
$ cd ~/code/username
$ git clone git@github.com:username/repo_name.git
```

You should have a folder tree like

```
.
├── fullstack-challenges
├── dotfiles
└── repo_name
```

Then to launch Middleman server

```
$ cd repo_name
$ middleman server
```

## Specs

In this challenge, you have to:

1. Migrate your home page **content** into the `index.html.erb` Middleman page
1. Create a new `contact.html.erb` page with team and contact infos
1. Put all common HTML parts (navbar / footer) in the `layout.html.erb`
1. Promises are made to be kept, here is our [home-made navbar template](https://github.com/lewagon/awesome-navbars/blob/master/templates/_navbar.html) that we have already included in the layout.
1. Don't forget to replace **all** `<a>` tags and `<img>` tags with the **correct helpers** (`image_tag`, `link_to`, `image-url`) to get rid of URL dependency in HTML and CSS files.


## Commit and deploy

Once you have finished your content migration, commit your work:

```
$ git add .
$ git commit -m "finish content migration in Middleman"
$ git push
```

Then deploy your site on Github-pages.

```
$ middleman deploy
```

This will work only of you have no error in your source code. If that's the case, you can normally visit your masterpiece on `http://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME`. In our case, have a look at http://lewagon.github.io/stylus to discover our final version of Styl.us.
