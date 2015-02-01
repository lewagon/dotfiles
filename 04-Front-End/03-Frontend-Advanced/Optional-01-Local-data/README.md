## Background & Objectives

In this challenge you will add a new page to your site, connected to a mini YAML database of your choice.

## Specs

1. Create the magic `data` **folder** in the main directory and add it a new `file.yml` of your choice (`products.yml`, `songs.yml`, `tracks.yml`, `recipes.yml`, `whatever.yml`).

```
.
├── source
│   ├── index.html.erb
│   ├── fonts
│   ├── images
│   ├── javascripts
│   ├── layouts
│   └── stylesheets
└── data
    ├── products.yml
    ├── staff.yml
    └── whatever.yml
```

1. Add a new page to your website which will dipslay all the items of your database. This can be a portfolio page `portfolio.html.erb`, a `pricing.html.erb` page, up to you.

Use a loop to repeat a stuctured div on all your items. Herebelow is our Styl.us example to give you the correct syntax.

**data/products.yml**

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
    <% data.products.each do |product| %>

      <!-- HTML div that we want to repeat -->
      <div class="col-xs-12 col-sm-6 col-md-3 text-center">
        <div class="row">
          <div class="col-xs-3 col-sm-12">
            <%= image_tag product.picture, class: "img-circle img-responsive" %>
          </div>
          <div class="col-xs-9 col-sm-12">
            <h2>
              <%= product.name %>
              <span class="label label-<%= product.color %>"><%= product.price %></span>
            </h2>
            <p><%= product.summary %></p>
          </div>
        </div>
      </div>

    <% end %>
  </div>
</div>
```