## Background & Objectives

Let's create a dynamic template for the flat's show view. This template will inject different data depending on the URL, see [Romain's flat](http://lewagon.github.io/middleman-airbnb/flats/romain.html), [Anne's flat](http://lewagon.github.io/middleman-airbnb/flats/anne.html), [Seb's flat](http://lewagon.github.io/middleman-airbnb/flats/seb.html).


## YAML data

In a static website, it's often very convenient to store data in structured text file (like YAML), and then inject this data in the templates. Let's do this for flats' data.

In Middleman `data` folder, add a new file `flats.yml`

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

YAML syntax is based on indentation and keys/values (a bit like JSON but without `{`, `:`, `,`). Your file should look like:


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

Be creative and **add extra data to this YAML** (flat rating, pictures of different rooms, maximum number of guests, etc..).


## Loop with ERB

Middleman makes your life easy. The content of `flats.yml` is loaded in a ruby hash `data.flats`. You can now replace your three static cards in `index.html.erb` by looping on data with `each`.


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

How cool is that? Now you can add flats on your home-page just by updating `flats.yml` file. You can find more infos on data in [Middleman documentation](https://middlemanapp.com/advanced/data_files/).

## Middleman vs. Rails

In Rails, we will have a real DB (not YAML files) and we will use Active Record to connect to this DB. That being said, the ERB template will be very similar. Just replace `data.flats` by `Flat.all` in the code above and that's it!

Do you see how frontend and backend will magically connect? We hope you do :)

## Dynamic page

Time to generate a dynamic view for each flat. Start by reading the section about [Middleman dynamic pages](https://middlemanapp.com/advanced/dynamic_pages/).

Then add to `config.rb` something like:


```ruby
["anne", "seb", "romain"].each do |name|
  proxy "/flats/#{name}.html", "/flats/show.html", :locals => { :owner => name }, :ignore => true
end
```

Don't forget to **restart your server when you change the config** (config is only loaded when you launch the server).

Create the dynamic template `/flats/show.html.erb`. In this template, `owner` will dynamically change (to `"romain"`, `"seb"`, `"anne"`, etc..) depending on the URL (`"/flats/romain.html"`, `"/flats/seb.html"`, `"/flats/anne.html"`, etc..).

You can now read in the hash `data.flats` using this key, like that:


```erb
<!-- source/flats/show.html.erb -->

<!-- Read from data.flats with owner's name as key -->
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


How cool? Your turn to build a dynamic page (a bit more sophisticated) like [this one](http://lewagon.github.io/middleman-airbnb/flats/romain.html))
