## Before you start

Reminder, **no live-code tonight as you will pitch your idea in front of the class instead**!

## Evening Pitch session

If you've done your homework 😀, you should have uploaded your product pitch [here](https://kitt.lewagon.com/camps/<user.batch_slug>/products). You will have 2 to 3 minutes to pitch your idea in front of the class in the evening.

## Background & Objectives

Let's play with [Middleman](https://middlemanapp.com/), a very nice tool to generate static websites in ruby. You can use it for your personal website or portfolio, or for any freelance frontend project with rich content and design.

The objective of today is to code a static version of Airbnb with:
- A [home page](http://lewagon.github.io/middleman-airbnb/)
- A team page similar to our [about page](http://lewagon.github.io/middleman-airbnb/about.html)
- A [dynamic flat page](http://lewagon.github.io/middleman-airbnb/flats/ssaunier.html) (change `ssaunier` to `monsieurpaillard` in the URL to see it in action).

But first, let's get started with Middleman!

## Getting started

We will create our Middleman projects using [Le Wagon's Middleman template](https://github.com/lewagon/middleman-template)

In your terminal, check you have Middleman:

```bash
gem install middleman
# You should have a version >= 4.2.1
```

Then run the following code (line by line, making sure every command works before proceeding to the next one)

```bash
cd ~/code/<user.github_nickname>
middleman init middleman-airbnb -B -T lewagon/middleman-template
cd middleman-airbnb

git init
git add .
git commit -m 'Generated a new project with lewagon/middleman-template'

hub create    # To create a repo on GitHub
git remote -v # Check that the `origin` remote is set.
git push origin master
```

You should be able to run:

```bash
middleman server
```

And go to [localhost:4567](http://localhost:4567)

### Deployment

Make sure that your `git status` is clean and run:

```bash
middleman deploy
```

This should build your Middleman project and push it to the `gh-pages` of your GitHub repository. Then go to `<user.github_nickname>.github.io/middleman-airbnb/` to see it live 🚀 !

## Building your layout

Let's start with the layout, i.e. the common HTML skeleton of all your pages. It should be organized this way:

```erb
<!-- layouts/layout.erb -->
<%= partial "layouts/navbar" %>   <!-- inject layouts/_navbar.html.erb -->
<%= yield %>                      <!-- Page content is injected here -->
<%= partial "layouts/footer" %>   <!-- inject layouts/_footer.html.erb -->
```

- Don't forget to add ERB partials `layouts/_navbar.html.erb` and `layouts/_footer.html.erb` in your projects.
- For the HTML and the CSS of the navbar and footer, feel free to re-use [Le Wagon's navbar](http://lewagon.github.io/ui-components/#navbar) and [Le Wagon's footer](http://lewagon.github.io/ui-components/#footer) to save time.
- Don't forget to use the `image_tag` helper for your logo (as in the lecture) instead of a raw `<img>` tag.
- Also, take your time to add the corresponding SCSS files `components/_navbar.scss` (should already be there) and `components/_footer.scss` in your stylesheets and `@import` these two files in `components/_index.scss`


Just to recap:
- Using a layout means that all the common parts (navbar, footer, analytics, etc.) **only have to be coded once**.
- ERB partials make your HTML code way more concise and readable.

## Home-page content

- Add a banner and a grid of flat-cards inside your home-page `index.html.erb`
- Again you can re-use [Le Wagon's cards](http://lewagon.github.io/ui-components/#cards) and [Le Wagon's banner](http://lewagon.github.io/ui-components/#banner)
- Don't forget to add the corresponding SCSS files `components/_banner.scss`and `components/_cards.scss` in your stylesheets and `@import` these two files in `components/_index.scss`


## Team Page

Time to add a second page `team.html.erb` to your website with your buddy of the day, similar to our [about page](http://lewagon.github.io/middleman-airbnb/about.html). Don't forget to put real pictures of you and your buddy (take the image from the `Classmates` page or use Kitt's placeholder service like this `https://kitt.lewagon.com/placeholder/users/papillard`).

Also remember that you are using ERB now, so you can **write ruby to generate HTML code**. It means we can now do awesome stuff like this:

```erb
<ul class="list-inline text-center">
  <% ["papillard", "ssaunier", "monsieurpaillard"].each do |gh_username| %>
    <li>
      <%= image_tag "https://kitt.lewagon.com/placeholder/users/#{gh_username}", class: "img-circle" %>
      <h3><%= gh_username.capitalize %></h3>
    </li>
  <% end %>
</ul>
```

Then your ERB code will generate this HTML code:

```html
<!-- HTML output -->
<ul class="list-inline text-center">
  <li>
    <img src="https://kitt.lewagon.com/placeholder/users/papillard" alt="" class="img-circle">
    <h3>Papillard</h3>
  </li>
  <li>
    <img src="https://kitt.lewagon.com/placeholder/users/ssaunier" alt="" class="img-circle">
    <h3>Ssaunier</h3>
  </li>
  <li>
    <img src="https://kitt.lewagon.com/placeholder/users/monsieurpaillard" alt="" class="img-circle">
    <h3>Monsieurpaillard</h3>
  </li>
</ul>
```

Awesome right? 😲

## Helpers and link to the team

Helpers are ruby methods that you will use in your templates to generate `<a>`, `<img>`, `<link>`, etc. Most helper methods can be called with an optional hash of attributes (like `class` and `id`). For instance:

```erb
<%= image_tag "example.png", class: "img-rounded avatar" %>
```

Or

```erb
<%= link_to "Meet the team", "team.html", class: "btn btn-primary" %>
```

You can have a look at [Middleman documentation for helpers](https://middlemanapp.com/basics/helper_methods/).

**Add a link to your new team page in the navbar**.

## Commit and deploy

Now that you have a working Middleman project with a home and a team page, it's time to `commit` your work and `deploy`:

```bash
git add .
git commit -m "finished home and team page"
git push origin master
middleman deploy
```

Visit your masterpiece at <a href="http://&lt;user.github_nickname&gt;.github.io/middleman-airbnb/" target="_blank">https://&lt;user.github_nickname&gt;.github.io/middleman-airbnb</a>.
