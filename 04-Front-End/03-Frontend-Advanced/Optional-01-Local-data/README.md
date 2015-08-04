## Background & Objectives

In this challenge you will add a new page to your site, connected to a mini YAML database of your choice.

## Specs

1. Create the magic `data` **folder** in the main directory and add a new `file.yml` of your choice (`products.yml`, `songs.yml`, `tracks.yml`, `recipes.yml`, `whatever.yml`).

```
.
├── source
│   ├── index.html.erb
│   ├── images
│   ├── javascripts
│   ├── layouts
│   └── stylesheets
└── data
    ├── products.yml
    ├── staff.yml
    └── whatever.yml
```

1. Add a new page to your website which will display all the items of your database. This can be a portfolio page `portfolio.html.erb`, a `pricing.html.erb` page, up to you.

Use a loop to repeat a stuctured div on all your items. Herebelow is our Styl.us example to give you the correct syntax.

**data/products.yml**

```yaml
- name: Kudoz
  picture: http://placehold.it/150x150
  summary: Tinder for job search
- name: Krawd
  picture: http://placehold.it/150x150
  summary: Market place for brands and designers
```

**source/products.html**

```erb
---
title: Le Wagon's products
---

<div class="container" id="pricing">
  <div class="row">
    <h1>Our students' products</h1>
    <% data.products.each do |product| %>
      <!-- HTML div that we want to repeat -->
      <div class="col-xs-12 col-sm-6 col-md-3 text-center">
        <div class="row">
          <div class="col-xs-3 col-sm-12">
            <%= image_tag product.picture, class: "img-circle img-responsive" %>
          </div>
          <div class="col-xs-9 col-sm-12">
            <h2><%= product.name %></h2>
            <p><%= product.summary %></p>
          </div>
        </div>
      </div>
    <% end %>
  </div>
</div>
```