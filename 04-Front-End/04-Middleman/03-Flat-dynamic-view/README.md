## Background & Objectives

First create a YAML database for your flats. Then add a dynamic flat template able to display [Romain's flat](http://lewagon.github.io/middleman-airbnb/flats/romain.html), [Anne's flat](http://lewagon.github.io/middleman-airbnb/flats/anne.html), [Seb's flat](http://lewagon.github.io/middleman-airbnb/flats/seb.html), etc..

## Create a flats YAML database

In Middleman `data` folder add a new `flats.yml`

```
.
├── source
│   ├── index.html.erb
│   ├── images
│   ├── javascripts
│   ├── layouts
│   └── stylesheets
└── data
    ├── team.yml
    └── flats.yml
```

This file should look like


```yaml
# data/flats.yml
seb:
  owner_name: Sebastien Saunier
  picture: http://placehold.it/150x150
  owner_picture: http://placehold.it/150x150
  name: Seb's home
  summary: Charming room in Montmartre
  city: Paris, France
  wifi: true
romain:
  owner_name: Romain Paillard
  picture: http://placehold.it/150x150
  owner_picture: http://placehold.it/150x150
  name: Romain's home
  summary: Nice flat in Piccadilly
  city: London, UK
  wifi: false
```

Be creative and **don't hesitate to add extra data to your YAML** (flat rating, pictures of different rooms, maximum number of guests, etc..).


## Loop with ERB

The content of `flats.yml` is accessible in the ruby hash `data.flats`. You can now replace your three static cards in `index.html.erb` by looping on data with `each`.


```erb
<!-- source/index.html.erb -->

<div class="container">
  <div class="row">
    <% data.flats.each do |owner, flat| %>
    <div class="col-xs-12 col-sm-4">
      <div class="card" style="background-image: url('<%= image_path flat.picture %>');">
        <div class="card-category"><%= flat.city %></div>
        <div class="card-description">
          <h2><%= flat.name %></h2>
          <p><%= flat.summary %></p>
        </div>
        <%= image_tag flat.owner_picture, class:"card-user avatar avatar-large" %>
        <%= link_to "flats/#{owner}.html", "#", class: "card-link" %>
      </div>
    </div>
    <% end %>
  </div>
</div>
```

**Take time to really understand this code**. Then read more about data files on [Middleman documentation](https://middlemanapp.com/advanced/data_files/).

## Middleman vs. Rails

In Rails you will have Active Record, so you will replace `data.flats` by `Flat.all` with the `Flat` model connected to your SQL database. Do you see how frontend and backend will magically connect? :)

## Dynamic page

Time to generate a dynamic show view for each flat. Start by reading the section about [Middleman dynamic pages](https://middlemanapp.com/advanced/dynamic_pages/).

Then add to `config.rb` something like:


```ruby
["anne", "seb", "romain"].each do |name|
  proxy "/flats/#{name}.html", "/flats/show.html", :locals => { :owner => name }, :ignore => true
end
```

You must **restart your server when you change the config** (config is only loaded when you launch the server).

Create the dynamic template `/flats/show.html.erb`. In this ERB template, `owner` will dynamically change to `"romain"`, `"seb"`, `"anne"`, etc.. depending on the URL. You can then extract from the hash `data.flats` infos about the owner's flat:


```erb
<!-- source/flats/show.html.erb -->

<!-- Read from data.flats with owner key -->
<% flat = data.flats[owner] %>

<!-- Inject flat data in template -->
<%= image_tag flat.owner_picture, class: "img-circle" %>
<p><%= flat.owner_name %></p>
<h1><%= flat.description %></h1>
<p><%= flat.city %></p>

```

Now try to access:

- [http://localhost:4567/flats/anne.html](http://localhost:4567/flats/anne.html) (where `owner = "anne"`)
- [http://localhost:4567/flats/seb.html](http://localhost:4567/flats/anne.html) (where `owner = "seb"`)
- [http://localhost:4567/flats/romain.html](http://localhost:4567/flats/anne.html) (where `owner = "romain"`)
- etc...


How cool?
