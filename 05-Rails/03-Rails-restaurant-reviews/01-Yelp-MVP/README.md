## Background & Objectives

The objective of this challenge is to build a 2-model Rails app with restaurant and anonymous reviews.
You can refer to the [Rails guide](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model) to see a similar example on articles and comments.

## Rails app generation

You are going to use external specs written by the teachers to test your rails app. Here is the setup you need:

```bash
$ cd ~/code/<user.github_nickname>
$ rails new -T lacuillere
$ cd lacuillere
$ git init
$ git add .
$ git commit -m "rails new"
$ hub create
$ git push origin master
$ echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
$ bundle install
$ git submodule add git@github.com:lewagon/fullstack-challenges-03-Rails-restaurant-reviews-specs.git spec
$ git add .
$ git commit -m "Prepare rails app with external specs"
```

### Testing your code

Whenever you add migrations to your app (e.g. after a `rails g model ...`), don't forget to also run the migrations **on the test database** we use in our specs:

```bash
$ bin/rake db:migrate RAILS_ENV=test  # If you added a migration
```

Then testing your code is as simple as usual (a good old rake):

```bash
$ bin/rake
```

If you want the ability to just run `rake`, sync your dotfiles:

```bash
$ cd ~/code/<user.github_nickname>/dotfiles
$ git remote add upstream git@github.com:lewagon/dotfiles.git
$ git pull --no-edit upstream master
$ source ~/.zshrc
$ cd ~/code/<user.github_nickname>/lacuillere
$ which rake  # should be `bin/rake`
$ rake        # should now work
```

## Specs

### Models

#### Schema

- A restaurant has a name, an address, a phone number, a category (chinese, italian...) and many reviews
- A review has a content and a rating (between 0 and 5) and references a restaurant

**Question**: Can you draw this simple schema at [db.lewagon.org](http://db.lewagon.org)? Discuss with your buddy.

#### Validation

- A restaurant must have at least a name and an address.
- The restaurant category should belong to a fixed list `["chinese", "italian", "japanese", "french", "belgian"]`.
- A review must have a parent restaurant.
- A review must have a content and a rating. The rating should be a number between 0 and 5.
- When a restaurant is destroyed, all reviews should be destroyed as well.

Validate all models tests before moving to the routing layer. You can use this command:

```bash
$ bin/rspec spec/models
```

to selectively run tests in the `spec/models` folder.

You can also manually test your code with the `rails console`. Do not forget to `reload!` between each code change!

```bash
$ rails c
> bristol = Restaurant.new(name: "Epicure", category: "french")
> bristol.valid?  # Should return false
> bristol.address = "75008 Paris"
> bristol.valid?  # Should return true
> yummy = Review.new(content: "yummy yummy", rating: 4)
> yummy.restaurant = bristol
> yummy.save
> bristol.reviews   # Should contain the yummy review
> yummy.restaurant  # Should return the bristol restaurant
```

### Seed

- Seed your restaurant database in `db/seeds.rb` with at least 5 valid restaurant records.
- Run `rake db:seed` to launch the seeding script.

### Routing / Controllers

Asking yourself what routes you need is a very important step in your web-app building process. **Routes should exactly mirror your product's user stories**. So let's define our minimal product here:

- A visitor can see the list of all restaurants.

```
GET "restaurants"
```
- He can add a new restaurant, and be redirected to the `show view` of that new restaurant.

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

In our MVP, a visitor cannot update / delete any restaurant or review. This is the role of the admin (i.e. **you**) who will have to make some curation from his rails console.

We know it's a pretty poor MVP. However, we want you to understand that **each route is a traduction of a user-story or your product**. Don't write stupidly 7 CRUD routes for any model of your app. It's the best way to get lost and to forget what your MVP really is.

Implement all the routes you need to build this product

**Hint:** to handle the route `GET "restaurants/38/reviews/new"`, you will have to use [nested resources](http://guides.rubyonrails.org/routing.html#nested-resources).


### Views

Let's care about our front-end, because that is what our users see! Follow [this guide](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) to setup your Rails frontend.


#### Layout / partials

Remember to refactor your views using layouts and partials. For example:

- The applicaton layout can include a Bootstrap navbar with links to the list of restaurants and to the restaurant creation form.

- Forms can be placed in partial, to make your HTML more readable.

#### Helpers

When using Rails helper like `link_to`, you can pass a hash of HTML attributes. This allows you to add Bootstrap CSS class to your links. Herebelow some example.

##### [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)

```erb
<%= link_to "See details", @restaurant, class: "btn btn-primary"%>
```
Will generate  this HTML

```html
<a href="/restaurants/3" class="btn btn-primary">See details</a>
```

##### [form_for](http://guides.rubyonrails.org/form_helpers.html)

Be careful, your reviews URLs are now nested in `/restaurants/:restaurant_id`. Hence, you cannot use `form_for` the same way you did with a non-nested resource. If you write:

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

That's not what we want because **we don't have any route for `POST "reviews"`**. Instead you will have to use the nested resource syntax for `form_for`:

```erb
<%= form_for [@restaurant, @review] do |f| %>
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

**Tips:** Install the [simple_form](https://github.com/plataformatec/simple_form) gem to have bootstrap-compatible forms with a lighter syntax.

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
