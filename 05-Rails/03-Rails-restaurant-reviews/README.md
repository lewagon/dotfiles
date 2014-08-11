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
- He can add a new restaurant.
- He can see the details of a restaurant, with all reviews related to the restaurant.
- He can add a new review to a restaurant, from the restaurant's show view.
- And that's it!

A user cannot update / delete any restaurant or review. That will be the role of the admin (i.e. **you**) to make some curation for restaurant and reviews from the rails console.

We know that it's a pretty poor first version. However, the goal is to force you to think about your routes, and not create 7 CRUD routes for any resources of your app!

List all the routes you need to build this product, and check the list with a teacher.

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

```html
<%= link_to "See details", @restaurant, class: "btn btn-primary"%>
<!--
<a href="/restaurants/3" class="btn btn-primary">See details</a>
-->
```

or, you can also pass the HTML content of the link in a block:

```html
<%= link_to @restaurant, class: "image-link" do %>
  <%= image_tag @restaurant.picture %>
<% end %>
<!--
<a href="/restaurants/3" class="image-link">
  <img src="assets/...">
</a">
-->
```

#### [form_for](http://guides.rubyonrails.org/form_helpers.html)

Here is an example of how you would generate a Bootstrap inline-form using the Rails `form_for` helper.

```html
<%= form_for @user, html: {class: "form-inline"} do |f| %>
  <div class="form-group">
    <%= f.label :name %>
    <%= f.text_field :name, class: "form-control", placeholder: "bob"%>
  </div>

  <div class="form-group">
    <%= f.label :email %>
    <%= f.email_field :email, class: "form-control", placeholder: "bob@gmail.com"%>
  </div>
  <%= f.submit "Log in", class: "btn btn-primary"%>
<% end %>
```
