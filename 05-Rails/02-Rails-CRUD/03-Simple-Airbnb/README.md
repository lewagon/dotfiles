## Background & Objectives

We want to build a simple airbnb clone (like [this one](https://rails-simple-airbnb.herokuapp.com)). These should be all the user stories of our app:

- As a user, I can see all the available flats on our website
- As a user, I can post a flat to the website, specifying its name and address
- As a user, I can see detailed information of a given flat, including a nice little map if I get lost 😊
- As a user, I can edit the details of a flat if I made a mistake
- As a user, I can delete a flat from the website, in case I don't want to rent it anymore

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔

```bash
cd ~/code/<user.github_nickname>
rails new rails-simple-airbnb
cd rails-simple-airbnb
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

## Specs

### 1 - Model

Generate the `Flat` model through the right rails generator. It should have the following columns. Feel free to add as many as you want! 😊

- `name`, as a `string`
- `address`, as a `string`
- `description`, as a `text`
- `price_per_night`, as an `integer`
- `number_of_guests`, as an `integer`

### 2 - Controller & Routes

Generate an empty (no actions) `FlatsController` with the right rails generator.

We can start off by adding all our 7 CRUD routes in our `config/routes.rb` as we will be building them all! What keyword can you use to generate all of them directly?

### 3 - Seed

Let's create some flats in the `rails console` or even better, let's build a little seed for our app. This will help us to get started designing the views, even though we can't actually add a flat through our website. In the `db/seeds.rb` file, let's create around 4 flats. Here is one to get you started:

```ruby
Flat.create!(
  name: 'Light & Spacious Garden Flat London',
  address: '10 Clifton Gardens London W9 1DT',
  description: 'A lovely summer feel for this spacious garden flat. Two double bedrooms, open plan living area, large kitchen and a beautiful conservatory',
  price_per_night: 75,
  number_of_guests: 3
)
```

Do you remember why we use `.create!` instead of just `.create`? Ask around if you forgot. 😊

### 3 - As a user, I can see all the available flats

Let's add the correct action in our `FlatsController` (hint: it's `index` 😉). The action in the controller should fetch all flats in our database (we have Active Record for that!) and pass in onto the view.

The view should loop over these to display them, like in the screenshot below. Let start designing right from the begining. We can use [font awesome](http://fontawesome.io/icons/) or [materialize](http://materializecss.com/icons.html) for icons.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png)

### 4 - As a user, I can add a flat

Remember that to create a flat, we will need two routes. One route is there to display the new flat form, and another one is there to handle the `POST` request generated when submitting this form. Try to use directly the `form_for` helper in your view, and make the form look nice!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png)

### 5 - As a user, I can see detailed information of a given flat

Time to add the correct action to show all the information of a single given flat. How can we know what flat the user wants to have a look at?

Let's also update the `index.html.erb` view with the `link_to` helper to build the dynamic links.

You can use the [Google Maps Static Map API](https://developers.google.com/maps/documentation/static-maps/intro) to incorporate a map in your show view. It works with basic addresses so no need to geocode. 😊

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show.png)

### 6 - As a user, I can edit the details of a flat

We can also add the posibility to edit a flat, to remove typos after creating a flat. What about refactoring our `new.html.erb` form into a partial?

Don't forget to update the `index.html.erb` and `show.html.erb` with the new edit flat links!

### 7 - As a user, I can delete a flat from the website

Let's also add the ability to remove a flat from our website. How can we create a link to destroy a resource, and what action is it going to hit in the controller?

Once again, let's update all our view to put in this destroy link.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_2.png)

### 8 - Adding `picture_url` to the flat model (Optional)

- Add picture url attribute to the flat moodel, so we can display a nice banner picture in the show

### 9 - Filtering flats (Optional)

- Let's try to add a search bar to be able to filter flats in the index to find the perfect flat!

### 10 - Adding a second `User` model (Optional)

- Let's add a `User` model to our app (first, last, email, password)
- `SessionsController`
- Making sure user is loged in except index, show
- Setting the user on creation

### 11 - Authorizing the edit and destroy actions (Optional)

- Only the owner should be able to edit and destroy, let's make it happen!

### 12 - User Dashboard (Optional x2)

- Let's add a `dashboard` page do our app where a user can see all the flats he added to our website

### 13 - Map on index with markers (Optional x2)

- On the index page, let's build a static map AirBnB style!
