## Background & Objectives

Let's play with [Middleman](https://middlemanapp.com/), a nice tool coded in ruby to build **static websites**. You can use it for your personal website or portfolio, or for any freelance frontend project with rich content and design.

The objective of today is to code a static version of Airbnb with a [home page](http://lewagon.github.io/middleman-airbnb/), a [team page](http://lewagon.github.io/middleman-airbnb/team.html), and a [dynamic flat page](http://lewagon.github.io/middleman-airbnb/flats/seb.html) (change `seb` by `romain` in the URL to see that the flat's page is dynamic).

But first, let's get started with Middleman!

## Middleman setup

### Fork and clone the boilerplate

<ol>
  <li>
    <a href="https://github.com/lewagon/frontend-advanced-boilerplate/fork" target="_blank">Fork Le Wagon's Middleman boilerplate</a>
  </li>
  <li>
    Go to <a href="https://github.com/&lt;user.github_nickname&gt;/frontend-advanced-boilerplate/settings" target="_blank">your repo's settings</a> and change the name to <code>airbnb-static</code>
  </li>
</ol>

![change repo name](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/settings-rename-repo.png)

Now let's clone the project and install missing gems:

```bash
$ cd ~/code/<user.github_nickname>
$ git clone git@github.com:<user.github_nickname>/airbnb-static.git
$ cd airbnb-static
$ bundle install
```

This is a new separated project, so **we don't clone it inside `fullstack-challenges`**.

### Middleman commands

To start a web-server:

```bash
$ middleman server # launch local server (Ctr + C to kill it)
```

When you want to build your HTML/CSS code and deploy it with Github Pages, first commit your work:

```
$ git add .
$ git commit -m "finished some work"
```

And when your `git status` is clean, deploy your website:

```bash
$ middleman deploy # deploy website on Github Pages
```

## Home Page

Let's get back our Airbnb home-page (built last Friday) and include it in Middleman. You can find it in the `home-page-html-css` folder of the exercise.

1. Copy the page content in the `index.html.erb` template
1. Add missing SCSS partials in Middleman `components` stylesheets  (e.g. `_banner.scss`, `_card.scss`, `_feature.scss`)
1. Add `_footer.scss` in Middleman `layout` stylesheets. Even if the footer is a component, it's a good practice to put all "layout components" in a separated directory (just to organize the code).

## Footer & Layout

The footer should not be only in the `index.html.erb` template. In fact, the footer is on every page of the website.

To avoid repeating the footer's code in every template of the project, put it in the `layout.erb` file, i.e. the common skeleton of all templates:

```erb
<!-- layouts/layout.erb -->
<%= partial "navbar" %>   <!-- call _navbar.html.erb partial -->
<%= yield %>              <!-- Page content is injected here -->
<%= partial "footer" %>   <!-- call _footer.html.erb partial -->
```

Then add a ERB partial `_footer.html.erb` with your footer code:

```html
<!-- _footer.erb -->

<div id="footer">
  <!-- Your footer code goes here -->
</div>
```

- By using a layout, all common parts (navbar, footer, analytics, etc..) are **coded just once in the layout**.
- By using ERB partials, HTML code is more concise and easy to read.

## Team Page

Add a second page `team.html.erb` to your website with your team's members, like [this one](http://lewagon.github.io/middleman-airbnb/team.html).

Put real pictures of you and your buddy of course. Don't forget that you are using ERB now, and you can write **ruby code that will generate HTML code**, like:

```erb
<ul class="list-inline text-center">
  <% ["boris", "seb", "romain"].each do |member| %>
    <li>
      <%= image_tag "#{member}.png", class: "img-circle" %>
      <h3><%= member.capitalize %></h3>
    </li>
  <% end %>
</ul>
```

This ERB code will generate this HTML code:

```html
<!-- HTML output -->
<ul class="list-inline text-center">
  <li>
    <img src="images/boris.png" alt="">
    <h3>Boris</h3>
  </li>
  <li>
    <img src="images/seb.png" alt="">
    <h3>Seb</h3>
  </li>
  <li>
    <img src="images/romain.png" alt="">
    <h3>Romain</h3>
  </li>
</ul>
```

## Helpers

Helpers are ruby method that you will use in your templates to generate `<a>`, `<img>`, `<link>`, etc.. Most helper methods can be called with an optional hash of attributes (like `class` and `id`). For instance:

```erb
<%= image_tag "example.png", class: "img-rounded avatar" %>
```

Or

```erb
<%= link_to "Meet the team", "team.html", class: "btn btn-primary" %>
```

You can have a look at [Middleman documentation for helpers](https://middlemanapp.com/basics/helper_methods/).

**Your turn to replace all your `<a>` and `<img>` using the right helper methods.**

## Commit and deploy

Now that you have a working Middleman project with a home and a team page, time to commit your work and deploy:

```
$ git add .
$ git commit -m "finished home and team page"
$ git push origin master
$ middleman deploy
```

Visit your masterpiece on <a href="http://&lt;user.github_nickname&gt;.github.io/airbnb-static" target="_blank">https://&lt;user.github_nickname&gt;.github.io/airbnb-static</a>.
