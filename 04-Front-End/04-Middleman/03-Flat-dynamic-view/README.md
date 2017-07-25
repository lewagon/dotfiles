## Background & Objectives

Let's create a dynamic template for the flat's show view. This template will inject different data depending on the URL, as with [Romain's flat](http://lewagon.github.io/middleman-airbnb/flats/romain.html), [Anne's flat](http://lewagon.github.io/middleman-airbnb/flats/anne.html) and [Seb's flat](http://lewagon.github.io/middleman-airbnb/flats/seb.html).

## YAML data

In a static website, it's often convenient to store some data in a structured text file (like a YAML file), and then use this data in our templates. Let's do this for flats.

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

YAML syntax is based on indentation and keys/values (a bit like JSON but without `{}`). Your YAML file should look like:

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

Feel free to get creative and add **other keys/values to this YAML** (flat's rating, pictures of different rooms, maximum number of guests, etc.).

## Loop with ERB

In Middleman, the content of `flats.yml` is loaded in a ruby hash `data.flats`. You can now replace your static cards on the home page by using `each` to loop dynamically:

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
        <%= link_to "#", "flats/#{owner}.html", class: "card-link" %>
      </div>
    </div>
    <% end %>
  </div>
</div>
```

How cool is that? Now you can add new flats on your homepage just by updating `flats.yml`. As usual, there is a ton of extra info in the [Middleman documentation](https://middlemanapp.com/advanced/data_files/).

## Middleman vs. Rails

In Rails, we will have a real DB (no more YAML) and we will use Active Record to connect to it. The ERB template is very similar though. Just replace `data.flats` with `Flat.all` and that's it!

**Are you beginning to see how frontend and backend will magically connect?**

We hope so 😊

## Dynamic page

Time to generate a dynamic view for each flat. Start by reading the section about [Middleman dynamic pages](https://middlemanapp.com/advanced/dynamic_pages/).

Then add something like this to `config.rb`:

```ruby
["anne", "seb", "romain"].each do |name|
  proxy "/flats/#{name}.html", "/flats/show.html", locals: { owner: name }, ignore: true
end
```

Don't forget to **restart your server when you change the config**.

Create the dynamic template `/flats/show.html.erb`. In this template, `owner` will dynamically change to `"romain"`, `"seb"`, `"anne"`, etc. depending on the URL.

You can now access the hash `data.flats` using the owner's name as a key, like this:

```erb
<!-- source/flats/show.html.erb -->

<!-- Access data.flats with owner's name as key -->
<% flat = data.flats[owner] %>

<!-- Inject flat data in template -->
<%= image_tag flat.owner_picture, class: "img-circle" %>
<p><%= flat.owner_name %></p>
<h1><%= flat.description %></h1>
<p><%= flat.city %></p>
```

Now try to access:

- [http://localhost:4567/flats/anne.html](http://localhost:4567/flats/anne.html) (where `owner = "anne"`)
- [http://localhost:4567/flats/seb.html](http://localhost:4567/flats/seb.html) (where `owner = "seb"`)
- [http://localhost:4567/flats/romain.html](http://localhost:4567/flats/romain.html) (where `owner = "romain"`)
- etc.

Amazing right?


Now it's your turn to build a dynamic page like [this one](http://lewagon.github.io/middleman-airbnb/flats/romain.html).
