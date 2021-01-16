## Background & Objectives

The objective of this challenge is to build a two-model Rails app with a restaurant and anonymous reviews.
You can refer to the [Rails guide](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model) for a similar example using articles and comments.

## Rails app generation

You are going to use external specs written by the teachers to test your rails app, that is why we specify `-T` which means, don't generate the inbuilt rails tests. Here is the setup you need:

```bash
cd ~/code/<user.github_nickname>
rails new rails-yelp-mvp --skip-active-storage --skip-action-mailbox -T
cd rails-yelp-mvp
git add .
git commit -m "rails new"
gh repo create
git push origin master
echo "gem 'rspec-rails', '4.0.0.beta3', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
git submodule add git@github.com:lewagon/fullstack-challenges-03-Rails-restaurant-reviews-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

Before starting to code your app, follow [our Rails Frontend guide](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) to make sure you can use simple form, Bootstrap, and have a cool stylesheets folder (⚠️ only do the **setup** section, don't try to implement **Bootstrap JS**, we will cover that tomorrow!).

### Testing your code

Whenever you add migrations to your app (e.g. after a `rails g model ...`), don't forget to also run the migrations **on the test database** we use in our specs:

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
```

Then testing your code is as simple as usual with a good ol'

```bash
rake

# [...]
# Failed examples:
#
# rspec ./spec/controllers/restaurants_controller_spec.rb:84 # RestaurantsController should exist
# rspec ./spec/controllers/reviews_controller_spec.rb:77 # ReviewsController should exist
# rspec ./spec/models/restaurant_spec.rb:13 # Restaurant has a name
# rspec ./spec/models/restaurant_spec.rb:18 # Restaurant has an address
# rspec ./spec/models/restaurant_spec.rb:23 # Restaurant has a phone number
# rspec ./spec/models/restaurant_spec.rb:28 # Restaurant has a category
# rspec ./spec/models/restaurant_spec.rb:33 # Restaurant name cannot be blank
# rspec ./spec/models/restaurant_spec.rb:40 # Restaurant address cannot be blank
# rspec ./spec/models/restaurant_spec.rb:47 # Restaurant category cannot be blank
# rspec ./spec/models/restaurant_spec.rb:54 # Restaurant neptunian is not a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant chinese is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant italian is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant japanese is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant french is a valid category
# rspec ./spec/models/restaurant_spec.rb:62 # Restaurant belgian is a valid category
# rspec ./spec/models/restaurant_spec.rb:70 # Restaurant has many reviews
# rspec ./spec/models/restaurant_spec.rb:75 # Restaurant should destroy child reviews when destroying self
# rspec ./spec/models/review_spec.rb:20 # Review has a content
# rspec ./spec/models/review_spec.rb:25 # Review has a rating (stored as integer)
# rspec ./spec/models/review_spec.rb:30 # Review content cannot be blank
# rspec ./spec/models/review_spec.rb:37 # Review rating cannot be blank
# rspec ./spec/models/review_spec.rb:44 # Review parent restaurant cannot be nil
# rspec ./spec/models/review_spec.rb:51 # Review rating should be an integer
# rspec ./spec/models/review_spec.rb:58 # Review rating should be a number between 0 and 5
```

If you have trouble running `rake`, you may need to run `bin/rake`. It means that your `$PATH` does not contain the `./bin` folder, something you can fix in your dotfiles' zshrc (see [our default conf](https://github.com/lewagon/dotfiles/blob/master/zshrc#L16-L18))

## Specs

### Models

#### Schema

- A restaurant has a `name`, `address`, `phone_number`, `category`, and can have many reviews.
- A review has a `rating`, `content`, and belongs to a restaurant.

Make sure you think twice before choosing the data type, it might not always be your first guess!

**Question**: Can you draw this simple schema at [db.lewagon.com](http://db.lewagon.com)? Discuss with your buddy.

#### Validation

- A restaurant must have a name, an address and a category.
- A restaurant's category must belong to this fixed list: `["chinese", "italian", "japanese", "french", "belgian"]`.
- When a restaurant is destroyed, all of its reviews must be destroyed as well.
- A review must belong to a restaurant.
- A review must have content and a rating.
- A review's rating must be a number between 0 and 5.

Validate all model tests before moving to the routing layer. You can use this command:

```bash
rspec spec/models
```
to selectively run tests in the `spec/models` folder.

You can also manually test your code with the `rails console`. Don't forget to `reload!` between each code change!

```bash
rails c
> bristol = Restaurant.new(name: "Epicure", category: "french")
> bristol.valid?              # Should return false
> bristol.address = "75008 Paris"
> bristol.valid?              # Should return true
> bristol.save                # Insert into DB and set id
> yummy = Review.new(content: "yummy yummy", rating: 4)
> yummy.restaurant = bristol  # Set foreign key restaurant_id
> yummy.save
> bristol.reviews             # Should contain the yummy review
> yummy.restaurant            # Should return the bristol restaurant
```

### Seed

- Seed your restaurant database in `db/seeds.rb` with at least 5 valid restaurant records.
- Run `rails db:seed` to launch the seeding script.

### Routing / Controllers

Asking yourself what routes you need is a very important step in your web-app building process. **Routes should exactly mirror your product's user stories**. So let's define our minimal product here:

- A visitor can see the list of all restaurants.

```
GET "restaurants"
```
- A visitor can add a new restaurant, and be redirected to the `show` view of that new restaurant.

```
GET "restaurants/new"
POST "restaurants"
```

- A visitor can see the details of a restaurant, with all the reviews related to the restaurant.

```
GET "restaurants/38"
```

- A visitor can add a new review to a restaurant

```
GET "restaurants/38/reviews/new"
POST "restaurants/38/reviews"
```

- And that's it!


In our MVP, a visitor cannot update / delete any restaurant or review. This is the role of the admin (i.e. **you**) - as a developer you have the power to manipulate the DB from the `rails console` if you want to update / delete any record.

We know it's a pretty basic MVP, but we just need you to understand that **each route is the embodiment of a user-story**. Don't just blindly write 7 CRUD routes for every model in your app. It's the best way to get confused by your own product and forget what your MVP really is.

Now, it's time to implement all the routes you need to build this product!

**Hint:** to handle the route `GET "restaurants/38/reviews/new"`, you will have to use [nested resources](http://guides.rubyonrails.org/routing.html#nested-resources).

### Views

Let's turn our attention to frontend, because that is what our users are going to see! Follow [this guide](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) to set up your Rails frontend if you haven't done it at the beginning of the challenge (⚠️ only do the **setup** section, don't try to implement **Bootstrap JS**, we will cover that tomorrow!).

#### Layout / partials

Remember to refactor your views using layouts and partials. For example:

- The applicaton layout can include a Bootstrap navbar with links to the list of restaurants and to the restaurant creation form.
- Forms can be placed in a `partial` to make your HTML more readable.

#### Helpers

When using a Rails helper like `link_to`, you can pass it a hash of HTML attributes. This allows you to add Bootstrap CSS classes to your links. Example below:

##### [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)

```erb
<%= link_to "See details", restaurant_path(restaurant), class: "btn btn-primary"%>
```

This generates the following HTML:

```html
<a href="/restaurants/3" class="btn btn-primary">See details</a>
```

##### [form_for](http://guides.rubyonrails.org/form_helpers.html)

Be careful though - your reviews URLs are now nested in `/restaurants/:restaurant_id`. This means you can't use `form_for` the same way you did with a non-nested resource. If you write:

```erb
<%= form_for(@review) do |f| %>
  <!-- [...] -->
<% end %>
```

It will generate this HTML:

```html
<form action="/reviews">
  <!-- [...] -->
</form>
```

That's not what we want because **we don't have a route for `POST "reviews"`**. Instead, you will have to use the nested resource syntax for `form_for`:

```erb
<%= form_for [@restaurant, @review] do |f| %>
  <!-- [...] -->
<% end %>
```

This will generate the following HTML form:

```html
<form action="/restaurants/42/reviews">
  <!-- [...] -->
</form>
```

This URL is now consistent with the route `POST "restaurants/:restaurant_id/reviews"` you have defined in `routes.rb`. Yeah! For a bit more info on this, have a read of [this post](http://stackoverflow.com/questions/2034700/form-for-with-nested-resources).

**Hint:** Install the [simple_form](https://github.com/plataformatec/simple_form) gem to get bootstrap-compatible forms with a lighter syntax.

### Improve your app

**Once you have finished the first version of your resto-review app**, try to improve it by embedding your review form inside each restaurant's show view. This means your new routing will look like this:

```
GET "restaurants"
GET "restaurants/new"
GET "restaurants/38"
POST "restaurants"
POST "restaurants/38/reviews"
```

Notice that we got rid of the route `GET "restaurants/38/reviews/new"`. This is because the review form is **now embedded in the `restaurants/show.html.erb` view**. 🛏
