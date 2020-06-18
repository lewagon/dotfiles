At last, Rails!

## First week - Rails 101

This is the last "real week" on Kitt with day-by-day challenges. From next week, you'll start working on longer projects, either an Airbnb clone or your own personal project. For now, we will dive into the architecture of a fresh Rails app and try to understand what's going on. **We'll build one Rails app per day**.

### `01 Routing, Controllers & Views`

Your first day will introduce the standard Rails flow of `routing > controller > view` without adding the model layer and explaining `params`. Over the course of the day, you'll be transforming old ruby challenges from Week 1 into Rails apps.

### `02 Models & CRUD`

Here comes our old friend Active Record again! **One of the most important Rails lectures.** Your lead coach will code all of the 7 CRUD actions from scratch and introduce the `resources` routing. Pay attention! 🤓

### `03 Advanced Routing`

Today you will add a second model to a Rails app by building a two model clone of Yelp, with restaurants and reviews. The morning lecture is about going **Beyond CRUD** with advanced routing and validations in Rails.

### `04 Rails frontend`

Learn the best setup for implementing Bootstrap SASS + frontend libraries, and switch from `form_for` to `simple_form_for` using Simple Form Bootstrap config.

Learn about the asset pipeline and webpacker.

For the exercises, you'll start a two-day build of a cocktail app, with 3 models `Cocktail`, `Ingredient`, and `Dose`. You'll have to:
- Follow the frontend setup carefully to work on a nice-looking app.

### `05 Hosting & Image Upload`

This  morning lecture has 2 parts:
**Hosting**: Deployment on [Heroku](http://heroku.com/)

**Image Upload**: We'll host images on [Cloudinary](http://cloudinary.com/), using [ActiveStorage](https://guides.rubyonrails.org/v6.0.1/active_storage_overview.html). The course also explains how you can secure your API keys using the [dotenv](https://github.com/bkeepers/dotenv) gem. **Listen carefully if you don't want your bank details stolen on Github.**

On Friday at 2pm, **quiz time**! Your last one! Don't be sad 😢

We'll take a step back and check you've grasped all the core notions of Rails.

## Second week - Airbnb

**AirBnB**! For the second week, we'll work in your project teams of 3 or 4. The goal is to start from scratch and build an MVP of AirBnB - you'll have 5 days to go as far as you can on your clone.

- First demo on Wednesday (5pm)
- **Official demo on Friday! (5pm)**

**No live-code at 5pm for this week.** But you still have morning lecture at 9am on cool topics. So get up early! Here is an overview of what will be covered:

### `06 Devise`

2-parts morning lecture:

- Authentication with [Devise](https://github.com/plataformatec/devise) gem.
- Collaboration techniques with git & Github. You will discover how to work in a dev team using `branches` and `pull requests`. It's a system you will use for every dev project you ever do, so pay attention!

### `07 Pundit`

Following on from Devise, we will teach you how to handle **authorization** in your Rails app and make sure only the restaurant creator can update it or destroy it!

### `08 Geocoding`

Morning lecture on geocoding (with the `geocoder` gem) plus a bit about using the Google API to add autocomplete on address form inputs.

Then, at 5pm, every group should demo the current version of their Airbnb clone in front of the class.

### `09 Search`

Today's lecture covers the search topic, from the search 101 using ActiveRecord to stronger solutions like ElasticSearch or Algolia.

### `10 Airbnb Ajax in Rails`

Once you understand CRUD and can quickly re-create a rails scaffold, it's time to add some extra wizardry using AJAX. You'll be able to talk to the server without reloading the page (adding new comments to posts / clicking on star ratings / removing something from a list, etc.)

### Projects prep (weekend)

You've done amazing things - we are really proud of you!

Now, it's time for the Grand Finale - your projects. Take a bit of time over the weekend to think about your projects:

- Write your user stories (not more than 15).
- Draw mockups of your main views on a paper.
- Start building your DB schema on [db.lewagon.com](http://db.lewagon.com).
- Start thinking about your routes.

If you can get most of this done, you'll save a lot of time on Monday and be able to start on your projects without too much fuss.
