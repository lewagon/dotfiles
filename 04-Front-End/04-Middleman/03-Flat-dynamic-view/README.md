## Background & Objectives

Let's create a dynamic template for the flat's show view. This template will inject different data depending on the URL, as with [Romain's flat](http://lewagon.github.io/middleman-airbnb/flats/monsieurpaillard.html), [Seb's flat](http://lewagon.github.io/middleman-airbnb/flats/ssaunier.html) and [Boris's flat](http://lewagon.github.io/middleman-airbnb/flats/papillard.html).

## YAML data

In a static website, it's often convenient to store some data in a structured text file (like a YAML file), and then use this data in your templates. Let's do this for flats.

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
    ├── users.yml
    └── flats.yml
```

YAML syntax is based on indentation and keys/values (a bit like JSON but without `{}`). Your YAML file should look like:

```yaml
# data/flats.yml
ssaunier:
  name: "Sebastien's home"
  description: "Charming room in Montmartre"
  city_name: "Paris, France"
  city_slug: "paris"
  wifi: false
  rating: 4
papillard:
  name: "Boris' home"
  description: Small flat in Tokyo
  city_name: "Tokyo, Japan"
  city_slug: "tokyo"
  wifi: true
  rating: 3
monsieurpaillard:
  name: Romain's home
  description: Nice flat in Piccadilly
  city_name: "London, UK"
  city_slug: "london"
  wifi: true
  rating: 5
```

Feel free to get creative and add **other keys/values to this YAML** (flat's rating, pictures of different rooms, maximum number of guests, etc.).

## Loop with ERB

In Middleman, the content of `flats.yml` is loaded in a ruby hash `data.flats`. You can now replace your static cards on the home page by using `each` to loop dynamically on your data:

```erb
<!-- source/index.html.erb -->

<div class="container" id="home-flats">
  <h2 class="text-center">Recent flats</h2>
  <div class="row">
    <% data.flats.each do |owner, flat| %>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="card" style="background-image: linear-gradient(-225deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%), url('https://kitt.lewagon.com/placeholder/cities/<%= flat.city_slug %>');">
          <div class="card-category"><%= flat.city_name %></div>
          <div class="card-description">
            <h3><%= flat.name %></h3>
            <p><%= flat.description %></p>
          </div>
          <%= image_tag "https://kitt.lewagon.com/placeholder/users/#{owner}", class:"card-user" %>
          <%= link_to "", "flats/#{owner}.html", class: "card-link" %>
        </div>
      </div>
    <% end %>
  </div>
</div>
```

How cool is that? Now you can add new flats on your homepage just by updating `flats.yml`. As usual, there is a ton of extra info in the [Middleman documentation](https://middlemanapp.com/advanced/data_files/).

## Middleman vs. Rails

In Rails, we will have a real DB (no more YAML file) and we will use Active Record to connect to it. The ERB template is very similar though. We won't use `data.flats` to retrieve all the the flats - all we need instead is `Flat.all`!

**Are you beginning to see how frontend and backend will magically connect?**

We hope so 😊

## Dynamic page

Time to generate a dynamic view for each flat. Start by reading the section about [Middleman dynamic pages](https://middlemanapp.com/advanced/dynamic_pages/).

Then add something like this to `config.rb`:

```ruby
["papillard", "ssaunier", "monsieurpaillard"].each do |name|
  proxy "/flats/#{name}.html", "/flats/show.html", locals: { owner: name }, ignore: true
end
```

Create the dynamic template `show.html.erb` in a new `flats` folder in `source`. In this template, `owner` will dynamically change to `"papillard"`, `"ssaunier"`, `"monsieurpaillard"`, etc. depending on the URL.

Don't forget to **restart your server when you change the config**.

You can now access the hash `data.flats` using the owner's name as a key, like this:

```erb
<!-- source/flats/show.html.erb -->

<!-- Access data.flats with owner's name as key -->
<% flat = data.flats[owner] %>

<!-- Inject flat data in template -->
<%= image_tag "https://kitt.lewagon.com/placeholder/users/#{owner}", class: "img-circle" %>
<p><%= flat.name %></p>
<h1><%= flat.description %></h1>
<p><%= flat.city_name %></p>
```

Now try to access:

- [http://localhost:4567/flats/ssaunier.html](http://localhost:4567/flats/ssaunier.html) (where `owner = "ssaunier"`)
- [http://localhost:4567/flats/papillard.html](http://localhost:4567/flats/papillard.html) (where `owner = "papillard"`)
- [http://localhost:4567/flats/monsieurpaillard.html](http://localhost:4567/flats/monsieurpaillard.html) (where `owner = "monsieurpaillard"`)
- etc.

Amazing right?

Now it's your turn to build a dynamic page like [this one](http://lewagon.github.io/middleman-airbnb/flats/monsieurpaillard.html). You don't have to copy the design exactly, just have fun with the data 🎉🎉🎉!
