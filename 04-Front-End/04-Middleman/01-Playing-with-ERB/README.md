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
$ cd ~/code/$GITHUB_USERNAME
$ git clone git@github.com:$GITHUB_USERNAME/airbnb-static.git
$ cd airbnb-static
$ bundle install
```

Note that this is a new independent project, so we don't clone it inside `fullstack-challenges`.


### Middleman commands

There are two important Middleman commands:

```bash
$ middleman server # launch local server (Ctr + C to kill it)
```

Then when you want to build your HTML/CSS code and push it online using Github Pages, first commit your work:

```
$ git add .
$ git commit -m "finish content migration in Middleman"
$ git push origin master
```

And then, when your `git status` is clean, deploy your website:

```bash
$ middleman deploy # deploy website on Github Pages
```


## Home Page

Let's start by getting back our Bootstrap home-page built last Friday and include it in our Middleman project. We give you this home-page in the exercise's folder in the `home-page-html-css` folder. **Now your job to include it in Middleman**.

- Copy the content in the `index.html.erb` template
- Add SCSS partials in Middleman `components` stylesheets (`_banner.scss`, `_card.scss`, `_feature.scss`)
- Add `_footer.scss` in Middleman `layout` stylesheets. The footer can be seen as a components but it's good practice to group all "layout components" in another directory (to organize the code).
- Don't forget

## Footer & Layout

The footer's HTML code should not be in the `index.html.erb` template only. In fact, the footer is present on every page of the website. Put the footer code in the `layout.erb` file, which is the common skeleton of all the pages:

```erb
<!-- layouts/layout.erb -->
<%= partial "navbar" %>   <!-- call _navbar.html.erb partial -->
<%= yield %>              <!-- Page content is injected here -->
<%= partial "footer" %>   <!-- call _footer.html.erb partial -->
```

Then add a ERB partial `_footer.html.erb` with your footer code:

```erb
<!-- _footer.erb -->

<div id="footer">
  <!-- Your footer code goes here -->
</div>
```

- By using a layout, all common parts (like navbar / footer) are **coded just once**.
- By using ERB partials, your HTML code is more concise and clear.


## Team Page

Add a second page `team.html.erb` to your website, with your team members like [this one](http://lewagon.github.io/middleman-airbnb/team.html). Put real pictures of you and your buddy of course. Don't forget that you are using ERB now, and you can write **ruby code that will generate HTML code**, like:


```erb
<!-- Playing with ERB -->
<ul class="list-inline text-center">
  <% ["boris", "seb", "romain"].each do |member| %>
    <li>
      <%= image_tag "#{member_image}.png", class: "img-circle" %>
      <h3><%= member.capitalize %></h3>
    </li>
  <% end %>
</ul>
```

This ERB code will generate this HTML code:
```erb
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

You must replace **all** `<a>` tags and `<img>` tags with the [correct helpers method](https://middlemanapp.com/basics/helper_methods/) (`image_tag`, `link_to`, `image-url`).


## Commit and deploy

You have a working Middleman project with a home and a team page, time to commit your work and deploy:

```
$ git add .
$ git commit -m "finish content migration in Middleman"
$ git push origin master
$ middleman deploy
```

You can now visit your masterpiece on <a href="https://&lt;user.github_nickname&gt;.github.io/airbnb-static" target="_blank">https://&lt;user.github_nickname&gt;.github.io/airbnb-staticg</a>.
