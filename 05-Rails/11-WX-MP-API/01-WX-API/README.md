## Background & Objectives

The objective of this challenge is to build a two-model Rails API  (such as `Restaurant` and `Review`).
This is similar to the [Yelp MVP](https://kitt.lewagon.com/camps/194/challenges?path=05-Rails/03-Rails-restaurant-reviews/02-Yelp-MVP) you built during Rails week



## Rails app generation

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔

You are going to use the minimal template. Here is the setup you need:

```bash
cd ~/code/<user.github_nickname>
rails new \
  --database postgresql \
  -m "https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb" \
  restaurants-api
cd restaurants-api
git add .
git commit -m "rails new"
hub create
git push origin master
```

Before starting to code your app, make sure you completed your WeChat Mini Program from the WeChat Frontend course with all the user stories (CRUD). This is the frontend application for which you'll be making the API. 

You can also use the [solution](https://github.com/dounan1/meal-match) from the WeChat Frontend course as the API's frontend.



## Specs

### 1 - Models

Generate the `Restaurant` model through the right rails generator. It should have the following columns. Feel free to add as many as your frontend app needs! 😊

- `name`, as a `string`

- `address`, as a `string`

- `description`, as a `string`

- `image`, as an `string`

Generate the `Comment` model (reviews are just visitor comments) - with the following columns.

- `name`, as a `string` for the commenter name

- `image`, as a `string` for the commenter profile

- `content`, as a `string`

- `restaurant`, as `references` to link to the restaurant the comment is for

Don't forget to add `has_many` to link the models together in code as well as in the database. Some validations would be nice too!

### 2 - Seed

Let's create some restaurants in the `rails console` or even better, let's build a little seed for our app. This will help us to get started designing the api endpoints to show in the frontend app, even though we can't actually add a comment through our app. In the `db/seeds.rb` file, let's create around 4 restaurants with 3 comments each. Here is one to get you started:

```ruby
Restaurant.create!(name: "#{Faker::Commerce.color} #{Faker::Food.spice.split.first}".titlecase, address: "#{Faker::Address.community}", description: "#{Faker::Company.buzzword} #{Faker::Food.ingredient}".capitalize, image: "http://askwomenonline.org/wp-content/uploads/2017/12/hummus-recipe-760x428.jpg")
Restaurant.create!(name: "#{Faker::Commerce.color} #{Faker::Food.spice.split.first}".titlecase, address: "#{Faker::Address.community}", description: "#{Faker::Company.buzzword} #{Faker::Food.ingredient}".capitalize, image: "https://img.grouponcdn.com/deal/8DDtq5XRzVnLXEUnPHPd/p2-2048x1229/v1/c700x420.jpg")
Restaurant.create!(name: "#{Faker::Commerce.color} #{Faker::Food.spice.split.first}".titlecase, address: "#{Faker::Address.community}", description: "#{Faker::Company.buzzword} #{Faker::Food.ingredient}".capitalize, image: "https://assets.epicurious.com/photos/57a384e73a12dd9d5602415e/2:1/w_1260%2Ch_630/mango-salad.jpg")
Restaurant.create!(name: "#{Faker::Commerce.color} #{Faker::Food.spice.split.first}".titlecase, address: "#{Faker::Address.community}", description: "#{Faker::Company.buzzword} #{Faker::Food.ingredient}".capitalize, image: "https://media-cdn.tripadvisor.com/media/photo-s/11/76/1c/72/stock-burger-co.jpg")

Restaurant.all.each do |restaurant|
  Comment.create!(restaurant: restaurant, content: "#{Faker::Hipster.sentence(2, false, 0)}", name: "#{Faker::Name.first_name}", image: "https://kitt.lewagon.com/placeholder/users/gabriel-dehan")
  Comment.create!(restaurant: restaurant, content: "#{Faker::Hipster.sentence(2, false, 0)}", name: "#{Faker::Name.first_name}", image: "https://kitt.lewagon.com/placeholder/users/graysdays")
  Comment.create!(restaurant: restaurant, content: "#{Faker::Hipster.sentence(2, false, 0)}", name: "#{Faker::Name.first_name}", image: "https://kitt.lewagon.com/placeholder/users/alex-felix")
end
```

Do you remember why we use `.create!` instead of just `.create`? Ask around if you forgot. 😊 Also try more ways to fake the data - and find better [Faker](https://github.com/stympy/faker) functions that'll spice up your data 🌶️🌶️🌶️.

### 3 - Controller & Routes

We can start off by adding all CRUD routes in our `config/routes.rb` but do we need them all? What four actions are needed for CRUD with APIs? (hint: there is no need to send forms for `EDIT` or `CREATE`, look through the rest of the steps to get all the actions.)

Generate the  `RestaurantsController` with the four API actions - using the rails generator, or creating them manually.

Namespace the api endpoints properly:  eg: `/api/v1/restaurants` - there's a simple routing command for namespacing. You can also use it to specific the format of the request (html or json).

Since we'll use restaurants endpoints to serve up comments, we won't need a `CommentsController`.


### 4 - Restaurants Index Page

Let's add the correct action in our `RestaurantsController` (hint: it's `index` 😉). The action in the controller should fetch all restaurants in our database (we have Active Record for that!) and pass in onto the json view:

```ruby
# app/views/api/v1/restaurants/index.json.jbuilder
json.restaurants do
  #Use jbuilder functions to show restaurant data in an json array
end
```

Tip: Get to know jbuilder by just showing the first restaurant with the needed fields for the endpoint (e.g. no `created_at`).  After that, try to show all the restaurants in an array.

Let's also update the frontend app's view (`index.js`)  to call the api to get the dynamic data:

```js
wx.request({
  url: YOUR_API_ROUTE,
  method: AN_HTTP_VERB(like GET, POST, PUT, DELETE),
  success(res) {
    // what to do with the API data
    // 1. save it to a local variable
    // 2. set page's data with that local variable
  }
})
```


### 5 - Restaurant Show Page

Time to add the correct action to show all the information of a single given restaurant. How can we know what restaurant the user wants to have a look at?

Comments will be included along with the restaurant's data:

```ruby
# app/views/api/v1/restaurants/show.json.jbuilder
json.extract! @restaurant #... the restaurant data 
json.comments @restaurant.comments do |comment|
   #... the comment data
end
```

If you're displaying the time of the comment, don't forget to use `strftime` to format the timestamp

Let's also update the frontend app's view (`show.js`)  to call the api to get the dynamic data.

### 6 - Restaurant Create Page

Remember that to create a restaurant in an API, we will need only one route. We do not need a new route to display the new restaurant form, only a new route to handle the `POST` request generated when submitting this form. 

Let's also update the frontend app's view (`create.js`)  to call the api to send the user generated data. What HTTP verb is appropriate for creating data? (GET, POST, PUT, or DELETE)


### 7 - Restaurants Edit Page

We can also add the ability to edit a restaurant, to remove typos after creating a restaurant. What about refactoring the frontend `create.wxml` form into a partial `form.wxml` to be used in `new.wxml` too?

Don't forget to update the `show.wxml` and `show.js` with the new edit restaurant button!

### 8 - Restaurant Delete Function

Let's also add the ability to remove a restaurant from our app. How can we create a button to destroy a resource, and what action and verb is it going to hit in the controller?

Once again, also update the show view to put in this destroy button.


### 9 - Adding reviews  (Optional)

Let's add an API endpoint to create comments from the restaurants controller (storing the restaurant of the comment as the restaurant the endpoint belongs to). Lets update our show page with a button to allow the user to add a comment with his/her name and picture to be displayed next to the comment. We can also add a new page in the frontend for a form that will use this create comments endpoint. 

For your routes, think about using nested routes to specifiy the restaurant the new comment belongs to.


### 10 - Filtering restaurants (Optional)

Let's try to add a search bar to be able to filter restaurants in the index to find the perfect restaurant!

- How can we find what the user is searching for?
- What active record method can we use to build a simple search engine? This can get you started `@restaurants = Restaurant.where("name LIKE '%garden%'")`, make sure you understand this statement before going any further.
- How can we make sure the index page still works like a traditional index, even if the user isn't searching anything?
- How can we make sure the input is prefilled with the search query once the user searched?
