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
gh repo create --public --source=.
git push origin master
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
git submodule add git@github.com:lewagon/fullstack-challenges-03-Rails-restaurant-reviews-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

## Front-end setup

### Install Bootstrap stylesheets

Following [the documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css), install Bootstrap stylesheets to your Rails app by copy-pasting the link tag in the `head` of the `application.html.erb` layout:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

You can now use any Bootstrap class anywhere in your Rails views 🎉

### Simple Form gem

To add [Simple Form](https://github.com/heartcombo/simple_form) to your app, add the gem to your Gemfile:

```ruby
# Gemfile
# [...]
gem "simple_form", github: "heartcombo/simple_form"
```

Then run:

```bash
bundle install
rails generate simple_form:install --bootstrap
```

### Testing your code

Whenever you add migrations to your app (e.g. after a `rails g model ...`), don't forget to also run the migrations **on the test database** we use in our specs:

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
```

Then testing your code is as simple as usual with a good ol'

```bash
rspec
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
- A review must have a content.
- A review must have a rating.
- A review's rating must be a number between 0 and 5.
- A review's rating must be an integer. For example, a review with a rating of 2.5 should be invalid!

Validate all model tests before moving to the routing layer. You can use this command:

```bash
rspec spec/01_models
```
to selectively run tests in the `spec/01_models` folder.

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

##### [simple_form_for](https://github.com/heartcombo/simple_form)

Since we installed Simple Form, we are going to use the `simple_form_for` helper instead of `form_with` from now on.

Your reviews URLs are now nested in `/restaurants/:restaurant_id`. This means you can't use `simple_form_for` the same way you did with a non-nested resource. If you write:

```erb
<%= simple_form_for(@review) do |f| %>
  <!-- [...] -->
<% end %>
```

It will generate this HTML:

```html
<form action="/reviews">
  <!-- [...] -->
</form>
```

That's not what we want because **we don't have a route for `POST "reviews"`**. Instead, you will have to use the nested resource syntax for `form_with`:

```erb
<%= simple_form_for [@restaurant, @review] do |f| %>
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

To run the appropriate tests for this version, run the command `rspec -t refactoring`.
