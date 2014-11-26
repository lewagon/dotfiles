## Background & Objectives

The objective of this challenge is to build a 2-model Rails app with restaurant and anonymous reviews. You can refer to [Rails guide](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model) to see a similar example on articles and comments.

## Specs

### Active Record Models

#### Attributes
- A restaurant has a name, an address, a phone number, and a category (chinese, italian)
- A review has a content and a rating (between 0 and 5)

#### Associations
- A restaurant has many reviews
- A review belongs to a restaurant
- When you delete a restaurant in the DB, it should delete all related reviews (see the `dependent: :destroy` option of the `has_many` association)

#### Validation
- A restaurant must have at least a name and an address. The category should belong to a fixed list `["chinese", "italian", "japanese", "french", "belgian"]`
- A review must have a content and a rating. The rating should be a number between 0 and 5.

### Routing
Asking yourself what routes you need is an important step. It depends on what features you want for your app. Let's define our minimal product:

- A user can see the list of all restaurants.

```
GET "restaurants"
```
- He can add a new restaurant.

```
GET "restaurants/new"
POST "restaurants"
```

- He can see the details of a restaurant, with all reviews related to the restaurant.

```
GET "restaurants/38"
```

- He can add a new review to a restaurant

```
GET "restaurants/38/reviews/new"
POST "restaurants/38/reviews"
```

- And that's it!

A user cannot update / delete any restaurant or review. That will be the role of the admin (i.e. **you**) to make some curation for restaurants and reviews from the rails console.

We know that it's a pretty poor first version of the app. However, the goal is to force you to think about your routing and **to consider each route as a traduction of a real user-story or your product**, not to stupidly write 7 CRUD routes for any model of your app :)

Implement all the routes you need to build this product

**Hint:** to handle the route `GET "restaurants/38/reviews/new"`, you will have to use [nested resources](http://guides.rubyonrails.org/routing.html#nested-resources).

### Seeding
You can seed your restaurant database in `db/seeds.rb`. Ex:

```ruby
# db/seeds.rb

Restaurant.create(name: "Epicure, Bristol", address: "112 r. Fg St-Honoré 75008", phone: "01 53 43 43 40")
Restaurant.create(name: "L'atelier de Joel Robuchon", address: "133 av. des Champs-Élysées 75008", phone: "01 47 23 75 75")

# etc.
```

You will have to run `rake db:seed` to launch the seeding ruby script.

### Layout / Partial
Remember to refactor your views using layouts and partials. For example:

- The applicaton layout can include a Bootstrap navbar with links to the list of restaurants and to the restaurant creation form.

- Forms can be placed in partial, to make your HTML more readable.

When using Rails helper like `link_to` or `form_for`, you can pass a hash of HTML attributes. This allows you to add Bootstrap CSS class to your components. Herebelow some example.

#### [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)

```erb
<%= link_to "See details", @restaurant, class: "btn btn-primary"%>
```
Will generate  this HTML

```html
<a href="/restaurants/3" class="btn btn-primary">See details</a>
```

or, you can also pass the HTML content of the link in a block:

```erb
<%= link_to @restaurant, class: "image-link" do %>
  <%= image_tag @restaurant.picture %>
<% end %>
```

will generate this HTML

```html
<a href="/restaurants/3" class="image-link">
  <img src="/assets/...">
</a>
```

#### [form_for](http://guides.rubyonrails.org/form_helpers.html)

Be carefull, your reviews URLs are now nested in `/restaurants/:restaurant_id`. Hence, you cannot use `form_for` the same way you did with a non-nested resource. If you write:

```erb
<%= form_for(@review) do |f| %>
  <!-- [...] -->
<% end %>
```

It will generate this HTML

```html
<form action="/reviews">
  <!-- [...] -->
<% end %>
```

That's not what we want bacause **we haven't any route for `POST "reviews"`**. Instead you will have to use the nested resource syntax for `form_for`:

```erb
<%= form_for([@restaurant, @review]) do |f| %>
  <!-- [...] -->
<% end %>
```

This will will generate the following HTML form:

```html
<form action="/restaurants/42/reviews">
  <!-- [...] -->
<% end %>
```

This URL is consistent with the route `POST "restaurants/:restaurant_id/reviews"` you have defined in `routes.rb`. Yeah! For more insights, you can read [this post](http://stackoverflow.com/questions/2034700/form-for-with-nested-resources).


### Improve your app

**Once you have finished the first version of your resto-review app**, try to improve it by embedding your review form inside each restaurant's show view. In that case your new routing will be:

```
GET "restaurants"
GET "restaurants/new"
GET "restaurants/38"
POST "restaurants"
POST "restaurants/38/reviews"
```

Notice that we got rid of the route `GET "restaurants/38/reviews/new"` since the review form is **now embedded in the `restaurants/show.html.erb` view**.
