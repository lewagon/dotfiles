## Background & Objectives

The objective of this challenge is to migrate your Bootstrap landing page **content** into Middleman and start using templates and SASS. For migrating your CSS, wait for the next challenge.

- Fork our [middleman boilerplate](https://github.com/lewagon/middleman-boilerplate). Be carefull
- Rename the Github repo in the settings. Choose the name of your startup (like Stylus in our case).
- Then clone this repo locally on your computer. Be carefull, don't clone it in **`fullstack-challenges`**. It's a new separated project with its own versionning. Clone it in `code/your_user_name/` at the same level as `fullstack-challenges`

## Start and deploy scripts

In this boilerplate, we provide you two scripts (for Mac and for Windows)

- **`osx_start.command`** (resp. **`windows_start.command`**) will start a local server to run your website and listen for change in your code. Just double-click this file to launch the server.
- **`osx_deploy.command`** (resp. **`windows_deploy.command`**) enables to deploy you website on [Github Pages](https://pages.github.com/), a very cool sub-service of Github.

## Specs

In this challenge, you have to:

1. Migrate your home page **content** into the `index.html.erb` Middleman page
1. Create a new `contact.html.erb` page with team and contact infos
1. Put all common HTML parts (navbar / footer) in the `layout.html.erb`
1. Promises are made to be kept, here is our [home-made navbar template](https://github.com/lewagon/awesome-navbars/blob/master/templates/_navbar.html) you can use in the layout.
1. Don't forget to replace **all** `<a>` tags and `<img>` tags with the **correct helpers** (`image_tag`, `link_to`, `image-url`) to get rid of URL dependency in HTML and CSS files.

Before coding, **start your server** with the start script. Once you've finished this challenge.

- Commit and publish you change using on github.

```
$ git add .
$ git commit -m "finish content migration in Middleman"
$ git push
```

- Deploy your site on Github page by double-clicking on the deploy script.

- You can then visit your masterpiece on `http://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME`. In our case, have a look at http://lewagon.github.io/stylus to discover the final version of stylus.
