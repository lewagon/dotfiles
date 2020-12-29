## Background & Objectives

We want to build a simple airbnb clone (like [this one](https://rails-simple-airbnb.herokuapp.com)). These should be all the user stories of our app:

- As a user, I can see all the available flats on our website
- As a user, I can post a flat to the website, specifying its name and address
- As a user, I can see detailed information of a given flat
- As a user, I can edit the details of a flat if I made a mistake
- As a user, I can delete a flat from the website, in case I don't want to rent it anymore

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔

```bash
cd ~/code/<user.github_nickname>
rails new rails-simple-airbnb --skip-active-storage --skip-action-mailbox
cd rails-simple-airbnb
git add .
git commit -m "rails new"
gh repo create
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

### 4 - As a user, I can see all the available flats

Let's add the correct action in our `FlatsController` (hint: it's `index` 😉). The action in the controller should fetch all flats in our database (we have Active Record for that!) and pass in onto the view.

The view should loop over these to display them, like in the screenshot below. Let start designing right from the begining. We can use [font awesome](https://fontawesome.com/icons) or [materialize](http://materializecss.com/icons.html) for icons.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png)

### 5 - As a user, I can add a flat

Remember that to create a flat, we will need two routes. One route is there to display the new flat form, and another one is there to handle the `POST` request generated when submitting this form. Try to use directly the `form_for` helper in your view, and make the form look nice!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index.png)

### 6 - As a user, I can see detailed information of a given flat

Time to add the correct action to show all the information of a single given flat. How can we know what flat the user wants to have a look at?

Let's also update the `index.html.erb` view with the `link_to` helper to build the dynamic links.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show.png)

### 7 - As a user, I can edit the details of a flat

We can also add the posibility to edit a flat, to remove typos after creating a flat. What about refactoring our `new.html.erb` form into a partial?

Don't forget to update the `index.html.erb` and `show.html.erb` with the new edit flat links!

### 8 - As a user, I can delete a flat from the website

Let's also add the ability to remove a flat from our website. How can we create a link to destroy a resource, and what action is it going to hit in the controller?

Once again, let's update all our view to put in this destroy link.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_2.png)

### 9 - Adding `picture_url` to the flat model (Optional)

Let's add a picture url attribute to the flat model (just storing a string of a picture url). Let update our new and edit forms to allow the user to specify a flat picture to be displayed throughout the website. We can also update our index and show pages with the new picture.

For your seed, you can find nice images of houses on [unsplash](https://unsplash.com/search/photos/house).

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/show_2.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_3.png)

### 10 - Filtering flats (Optional)

Let's try to add a search bar to be able to filter flats in the index to find the perfect flat!

- How can we find what the user is searching for?
- What active record method can we use to build a simple search engine? This can get you started `@flats = Flat.where("name LIKE '%garden%'")`, make sure you understand this statement before going any further.
- How can we make sure the page still works like a traditional index, even if the user isn't searching anything?
- How can we make sure the input is prefilled with the search query once the user searched?

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/simple-airbnb/index_4.png)
