## Background & Objectives

In this challenge you will add a new page to your site, connected to a mini-database of your choice.

## Specs

### Content

1. Create the magic `data` **folder** in the main directory and add it a new `file.yml` of your choice (`products.yml`, `songs.yml`, `tracks.yml`, `recipes.yml`, `whatever.yml`).
1. Add a new page to your website which will dipslay all the items of your database. This can be a portfolio page `portfolio.html.erb`, a `pricing.html.erb` page, up to you.

Use a loop combined with a partial to repeat a stuctured div on all your items. Herebelow is our Styl.us example to give you the correct syntax.

**data/pens.yml**

```yaml
- name: Styl.smart
  picture: http://placehold.it/150x150
  summary: The <strong>smartest</strong> Stylus.<br>Write no more typos..
  price: 199€
  color: primary
- name: Styl.speed
  picture: http://placehold.it/150x150
  summary: The <strong>quickest</strong> Stylus.<br>Write texts before you do..
  price: 299€
  color: warning
```

**source/pricing.html**
```erb
---
title: Find the stylus that suits you
---

<div class="container" id="pricing">
  <div class="row">
    <h1>Styl.you</h1>
    <% data.pens.each do |pen| %>
      <%= partial(:offer, locals: {pen: pen}) %>
    <% end %>
  </div>
</div>
```

**source/_offer.html**
```erb
<div class="col-xs-12 col-sm-6 col-md-3 text-center">
  <div class="pen">
    <div class="row">
      <div class="col-xs-3 col-sm-12">
        <%= image_tag pen.picture, class: "img-circle img-responsive" %>
      </div>
      <div class="col-xs-9 col-sm-12">
        <h2>
          <%= pen.name %>
          <span class="label label-<%= pen.color %>"><%= pen.price %></span>
        </h2>
        <p><%= pen.summary %></p>
      </div>
    </div>
  </div>
</div>
```

### Style

1. It's time to style your partial in a new stylesheets. Create a page level stylesheet, e.g. `pages/pricing.css.scss`, `portfolio.css.scss` or `pages/playlist.css.scss` to write your code.