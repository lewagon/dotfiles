## Background & Objectives

Now it's time to make a 3-model app! And you guessed it, we'll be introducing a many to many relationship (`N:N`). So what's the deal? Well, it’s time to build yourself a Watch List. You'll be able to create lists in which you will save your favourite movies.

## Rails app generation

```bash
cd ~/code/<user.github_nickname>
rails new rails-watch-list -d postgresql --skip-action-mailbox -T
cd rails-watch-list
```

We then need to create the postgresql database for this new rails app.

```bash
rails db:create
```

Let's set up git, create a repo on GitHub and push our skeleton.

```bash
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

Let's import the teacher's spec to be able to `rake` our progress.

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-watch-list-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

You'll be able to test your code with:

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
rspec spec/models                # Launch tests
```

Before starting to code, don't forget to setup your Rails app for Front-end, like in this morning's lecture let's remove Stimulus, add Vue, Bootstrap and its JavaScript dependencies:

Let's first remove Stimulus related codes and install Vue.

Remove the codes below in your repo:

```rb
# config/importmap.rb
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
```

```js
// app/javascript/application.js
import "controllers"
```

And the folders below:

<pre class="bash hljs">
.
└── <strong style="color: #117B8D">app</strong>
    └── <strong style="color: #117B8D">javascript</strong>
        └── <strong style="color: #117B8D">controllers</strong>
</pre>

Adding required gems for this challenge:

```ruby
# Gemfile
gem "autoprefixer-rails"
gem "bootstrap"
gem "font-awesome-sass", "~> 6.1"
gem "simple_form", github: "heartcombo/simple_form"
gem "sassc-rails" # Uncomment this line
```

Install Bootstrap and Vue using importmap:

```bash
importmap pin bootstrap
```

```rb
# config/importmap.rb

# add these two lines
pin "vue", to: 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.min.js'
pin_all_from "app/javascript/components", under: "components"
```

```bash
mkdir app/assets/javascript/components
bundle install
rails generate simple_form:install --bootstrap
```

Then let's download the Le Wagon's stylesheets:

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/stylesheets/archive/vue.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-vue app/assets/stylesheets
```

Finally let's import the Boostrap JS library using Webpack:

```js
// app/javascript/application.js
import "bootstrap";
```

Don't forget to `commit` and `push` your work often.

## Specs

### 1 - Models

Go to [db.lewagon.com](http://db.lewagon.com) and draw the schema with your buddy. The tables
we need are `movies`, `lists` and `bookmarks`. Think about the relations between the tables and who is storing the *references*. 😉

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/db.png)

**Important**
Don't use `rake` but:

```bash
rspec spec/models
```

to only run tests in the `spec/models` folder. Make sure they're all green before moving on to the applicative part of the challenge.

#### Attributes

- A **movie** has a **title** (e.g. `"Wonder Woman 1984"`), an **overview** (`"Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s!"`), a **poster url** and a **rating** (6.9).
- A **list** has a **name** (e.g. `"Drama"`, `"Comedy"`, `"Classic"`, `"To rewatch"`, ... )
- A **bookmark** adds a movie to a list (e.g. Wonder Woman has been added to the "Girl Power" watch list). So each **bookmark** references a movie and a list, with a **comment**. The **comment** field is for the user to add a little note on the bookmark (e.g. Alan Turing recommended this movie).

#### Validation

- A movie must have a unique title and an overview.
- A list must have a unique name.
- A bookmark must be linked to a movie and a list, and the [movie, list] pairings should be unique.
- The comment of a bookmark cannot be shorter than 6 characters.

#### Associations

- A list has many bookmarks
- A list has many movies through bookmarks
- A movie has many bookmarks
- A bookmark belongs to a movie
- A bookmark belongs to a list
- You can’t delete a movie if it is referenced in at least one bookmark.
- When you delete a list, you should delete all associated bookmarks (but not the movies as they can be referenced in other lists).

### 2 - Seed the movies

**Our app will not allow users to create movies**.
Instead, we will generate a static seed of movies to choose from.
Write this seed, for example

```ruby
# db/seeds.rb
Movie.create(title: "Wonder Woman 1984", overview: "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s", poster_url: "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", rating: 6.9)
Movie.create(title: "The Shawshank Redemption", overview: "Framed in the 1940s for double murder, upstanding banker Andy Dufresne begins a new life at the Shawshank prison", poster_url: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: 8.7)
Movie.create(title: "Titanic", overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic.", poster_url: "https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", rating: 7.9)
Movie.create(title: "Ocean's Eight", overview: "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century.", poster_url: "https://image.tmdb.org/t/p/original/MvYpKlpFukTivnlBhizGbkAe3v.jpg", rating: 7.0)
```

### Optional:

Have fun and seed fake movies using the [faker gem](https://github.com/faker-ruby/faker).

Even better, seed real movies by using [this API](https://developers.themoviedb.org/3/movies/get-top-rated-movies) (with `open-uri` and `json` ruby libs).

**API Setup**

The endpoints of the API requires you to sign up and generate an API key. Since the process of doing that is quite long, at Le Wagon, we kindly provided you with a **proxy** to that API. Thanks to this proxy, you'll be able to use that API without generating an API key yourself. You should use this tool for this challenge only! We trust you!

Here's how it works:

1. the API would say: use `https://api.themoviedb.org/3/movie/top_rated?api_key=<your_api_key>`
2. What you should do is replace this part of the url `https://api.themoviedb.org/3` by `http://tmdb.lewagon.com`
3. You can [try it here](http://tmdb.lewagon.com/movie/top_rated)

**Movie Images**

To understand how to get the movie images from the API, make sure to carefully read [this page](https://developers.themoviedb.org/3/getting-started/images) in the docs.

### 3 - Routing, Controller, Views for Lists

**Important**

Don't use `rake` to code the applicative part. It's time to launch a `rails s` in your terminal and open a browser at [http://localhost:3000/](http://localhost:3000/). Always code in silo:

- start with the **route**,
- then start coding the **controller**,
- finally start coding the **view** and refresh your browser.

When your feature is done (and looks good), move on to the next one and repeat the process!

When you think you're done with the **whole** challenge, use `rake` to make sure it satisfies the specs.

**Features**
Once again, you must have a precise idea of the features of your app in order to build your routes. Here is the list of features:

- A user can see all the lists

```
GET "lists"
```

- A user can see the details of a given list and its name

```
GET "lists/42"
```

- A user can create a new list

```
GET "lists/new"
POST "lists"
```

### 4 - Routing, Controller, Views for bookmarks

- A user can add a new bookmark (movie/list pair) to an existing list
- Checkout `simple_form` [docs](https://github.com/heartcombo/simple_form#associations) about `f.association` to easily create a select dropdown for our list of movies.

```
GET "lists/42/bookmarks/new"
POST "lists/42/bookmarks"
```

- A user can delete a bookmark from a list. How can we make a delete link again?

```
DELETE "bookmarks/25"
```

Do we need a `MoviesController`?

### 5 - Design as we go

Now time to make a nice front-end! Time to play around with CSS! 😊 Go check out [dribbble](https://dribbble.com/) or [onepagelove](https://onepagelove.com/) for inspiration.

Don't forget you can have local images in the `app/assets/images` folder. Or even better, you can ask the user for an `image_url` when the user adds a new list.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/homepage.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/showpage.png)

### 6 - New bookmark form on the list show page (Optional)

Try to put the "New bookmark form" on the list page itself, not on a separate page, so you won't have to leave the list page to add a new movie! What changes in the routes? And in the controllers?

### 7 - Tom Select on the movies dropdown (Optional)

Let's add a JavaScript package to our Rails app! You can have a look at the lecture and try to apply `select2` to your movies dropdown.

Using importmap to install `select2`:

```bash
importmap pin select2
```

To do so:
- Setting Vue, create a Vue instance and select the page in `el` property.
- Using the movies dropdown `select` tag
- Adapt one of the [basic examples](https://tom-select.js.org/examples/) code snippets to instanciate a Tom Select in the Vue instance.

### 8 - List reviews (Optional)

Everyone should be able to comment and tell us what they thought of our movie collection. Let's add some reviews to our lists!

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/reviews.png)

### 9 - Going further

- Adding a possibility to search for movies.
- Adding [typed.js](http://www.mattboldt.com/demos/typed-js/) to have some funky title on our home page.
- Some nice [animate on scroll](https://michalsnik.github.io/aos/) animations for our bookmarks as we scroll down a list show page.
- Using [`star-rating.js`](https://github.com/pryley/star-rating.js/blob/master/README.md) to display stars instead of a normal input in the reviews form.

Again, use Vue when implementing JavaScript behavior in your app ⚠️
