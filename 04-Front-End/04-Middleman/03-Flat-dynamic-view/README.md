## Background & Objectives

Add a flat show view in your Airbnb static copycat. You should reproduce [this page](http://lewagon.github.io/middleman-airbnb/flats/seb.html). This template will be dynamic and able to display [Seb's flat](http://lewagon.github.io/middleman-airbnb/flats/seb.html), [Romain's flat](http://lewagon.github.io/middleman-airbnb/flats/romain.html) or [Anne's flat](http://lewagon.github.io/middleman-airbnb/flats/anne.html)

## Create a user YAML database

In Middleman `data` **folder** add a new `flats.yml`

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
    ├── products.yml
    └── flats.yml
```

This file should look like


```yaml
# data/flats.yml
seb
  owner_name: Sebastien Saunier
  picture: http://placehold.it/150x150
  owner_picture: http://placehold.it/150x150
  name: Seb's home
  summary: Charming room in Montmartre
  city: Paris, France
  wifi: true
romain
  owner_name: Romain Paillard
  picture: http://placehold.it/150x150
  owner_picture: http://placehold.it/150x150
  name: Romain's home
  summary: Nice flat in Piccadilly
  city: London, UK
  wifi: false
```

Be creative and don't hesitate to add cool data to your YAML (flat rating, pictures of different rooms, maximum number of guests, etc..).


## Loop with ERB

The content of `flats.yml` is accessible in the ruby hash `data.flats`. You can now replace your three static cards in `index.html.erb` by looping on data with `each`.


```erb
<!-- source/index.html.erb -->

<div class="container">
  <div class="row">
    <% data.flats.each do |owner, flat| %>
    <div class="col-xs-12 col-sm-4">
      <div class="card" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('<%= image_path flat.picture %>');">
        <div class="card-category"><%= flat.city %></div>
        <div class="card-description">
          <h2><%= flat.name %></h2>
          <p><%= flat.summary %></p>
        </div>
        <%= image_tag flat.owner_picture, class:"card-user avatar avatar-large" %>
        <%= link_to "", "#", class: "card-link" %>
      </div>
    </div>
    <% end %>
  </div>
</div>
```

Read more about data files on [Middleman documentation](https://middlemanapp.com/advanced/data_files/).

**Middleman vs. Rails**: in Rails you will have Active Record, so you will replace `data.flats` by `Flat.all` with the `Flat` model connected to your SQL database. I'm sure you see now how frontend and backend will magically connect :)

## Dynamic page

Time to generate a dynamic show view for each flat. Start by reading the section about [Middleman dynamic pages](https://middlemanapp.com/advanced/dynamic_pages/).

Then add to `config.rb` something like:


```ruby
["anne", "seb", "romain"].each do |name|
  proxy "/flats/#{name}.html", "/flats/show.html", :locals => { :owner => name }, :ignore => true
end
```

You have to **restart your server when you change the config** (the config is loaded when you launch the server).

Now create the dynamic template `/flats/show.html.erb`. Inside you can use the `owner` parameter which will be dynamic (worth `"romain"`, `"seb"`, `"anne"` depending on the URL) and use it as a key of the `data.flats` hash to access the info of corresponding flat, like below:


```erb
<!-- source/flats/show.html.erb -->
<% flat = data.flats[owner] %>
<%= image_tag flat.owner_picture, class: "img-circle" %>
<p><%= flat.owner_name %></p>
<h1><%= flat.description %></h1>
<p><%= flat.city %></p>

```

You can now access to `http://localhost:4567/flats/anne.html` (`owner = "anne"`) or `http://localhost:4567/flats/seb.html` (`owner = "seb"`). How cool?
