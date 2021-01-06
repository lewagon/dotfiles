## Background & Objectives

The objective of this challenge is to build a two-model Rails API  (such as `Story` and `Comment`).
This is similar to the [Yelp MVP](https://kitt.lewagon.com/camps/194/challenges?path=05-Rails/03-Rails-story-Comments/02-Yelp-MVP) you built during Rails week



## Rails app generation

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔

You are going to use the minimal template. Here is the setup you need:

```bash
cd ~/code/<user.github_nickname>
rails new \
  --database postgresql \
  --skip-action-mailbox \
  stories-api
cd stories-api
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

Before starting to code your app, make sure you completed your WeChat Mini Program from the WeChat Frontend course with all the user stories specified in the [challenges of that day](https://kitt.lewagon.com/camps/236/challenges?path=04-Front-End/09-WX-MP-Frontend/01-WX-MP-Frontend-01). This is the frontend application for which you'll be making the API.

## Specs

### 1 - Models

Generate the `Story` model through the right rails generator. It should have the following columns. Feel free to add as many as your frontend app needs! 😊

- `name`, as a `string`
- `text`, as a `string`

Generate the `Comment` model (Comments are just visitor comments) - with the following columns.

- `name`, as a `string` for the commenter name
- `content`, as a `string`
- `story`, as `references` to link to the story the comment is for

Don't forget to add `has_many` to link the models together in code as well as in the database. Some validations would be nice too!

### 2 - Seed

Let's create some stories in the `rails console` or even better, let's build a little seed for our app.

This will help us to get started designing the api endpoints to show in the frontend app, even though we can't actually add a comment through our frontend (yet).

In the `db/seeds.rb` file, let's create around some stories with comments.

Tip: Use the [Faker](https://github.com/stympy/faker/) gem to spice up your data 🌶️🌶️🌶️  For example:

```ruby
Faker::TvShows::GameOfThrones.character #=> "Tyrion Lannister"

Faker::TvShows::GameOfThrones.quote #=> "Never forget who you are. The rest of the world won't. Wear it like an armor and it can never be used against you."
```

### 3 - Controller & Routes

We can start off by adding all CRUD routes in our `config/routes.rb` but do we need them all? What four actions are needed for CRUD with APIs? (hint: there is no need to send forms for `EDIT` or `NEW`, look through the rest of the steps to get all the actions.)

Generate the  `StoriesController` with the four API actions - using the rails generator, or creating them manually.

Namespace the api endpoints properly:  eg: `/api/v1/stories` - there's a simple routing command for namespacing. You can also use it to specific the format of the request (html or json).

Since we'll use stories endpoints to serve up comments, we won't need a `CommentsController`.


### 4 - Stories Index Page

Let's add the correct action in our `StoriesController` (hint: it's `index` 😉). The action in the controller should fetch all stories in our database (we have Active Record for that!) and pass in onto the json view:

```ruby
# app/views/api/v1/stories/index.json.jbuilder
json.stories do
  #Use jbuilder functions to show story data in an json array
end
```

Tip: Get to know jbuilder by just showing the first story with the needed fields for the endpoint (e.g. no `created_at`).  After that, try to show all the stories in an array.

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


### 5 - Story Show Page

Time to add the correct action to show all the information of a single given story. How can we know what story the user wants to have a look at?

Comments will be included along with the story's data:

```ruby
# app/views/api/v1/stories/show.json.jbuilder
json.extract! @story #... the story data
json.comments @story.comments do |comment|
   #... the comment data
end
```

If you're displaying the time of the comment, don't forget to use `strftime` to format the timestamp

Let's also update the frontend app's view (`show.js`)  to call the api to get the dynamic data.

### 6 - Story Create Page

Remember that to create a story in an API, we will need only one route. We do not need a new route to display the new story form, only a new route to handle the `POST` request generated when submitting this form.

Let's also update the frontend app's view (`create.js`)  to call the api to send the user generated data. What HTTP verb is appropriate for creating data? (GET, POST, PUT, or DELETE)


### 7 - Stories Edit Page

We can also add the ability to edit a story, to remove typos after creating a story. What about refactoring the frontend `create.wxml` form into a partial `form.wxml` to be used in `new.wxml` too?

Don't forget to update the `show.wxml` and `show.js` with the new edit story button!

### 8 - Story Delete Function

Let's also add the ability to remove a story from our app. How can we create a button to destroy a resource, and what action and verb is it going to hit in the controller?

Once again, also update the show view to put in this destroy button.


### 9 - Adding Comments  (Optional)

Let's add an API endpoint to create comments from the stories controller (storing the story of the comment as the story the endpoint belongs to). Lets update our show page with a button to allow the user to add a comment with his/her name and picture to be displayed next to the comment. We can also add a new page in the frontend for a form that will use this create comments endpoint.

For your routes, think about using nested routes to specifiy the story the new comment belongs to.


### 10 - Filtering stories (Optional)

Let's try to add a search bar to be able to filter stories in the index to find the perfect story!

- How can we find what the user is searching for?
- What active record method can we use to build a simple search engine? This can get you started `@stories = Story.where("name LIKE '%garden%'")`, make sure you understand this statement before going any further.
- How can we make sure the index page still works like a traditional index, even if the user isn't searching anything?
- How can we make sure the input is prefilled with the search query once the user searched?
