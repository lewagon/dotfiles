At last, Rails!

## First week - Rails 101

This is the last "real week" on Kitt with day-by-day challenges. From next week, you'll start working on longer projects, either an Airbnb clone or your own personal project. For now, we will dive into the architecture of a fresh Rails app and try to understand what's going on. **We'll build one Rails app per day**.

### `01-Rails-intro` (Monday)

First day of Rails, introducing Rails flow: `routing > controller > view` without adding the model layer and explaining `params`. During this day, you'll have to transform old ruby challenges of 1st week into Rails apps.

### `02-Rails-CRUD` (Tuesday)

Here comes our good old friend Active Record again! One of the most important Rails lectures. Your lead-coach will code from scratch all of the 7 CRUD actions and introduce the `resources` routing. Pay attention!

### `03-Rails-restaurant-reviews` (Wednesday)

During this day, you will add a second model to a Rails app by building a 2-model clone of Yelp, with restaurants and reviews. Morning lecture is split between two independent parts:

1. **Beyond CRUD**: discover advanced routing and validations in Rails
1. **Rails frontend**: respect our setup to implement Bootstrap SASS + frontend libraries the good way, and switch from `form_for` to `simple_form_for` using Simple Form Bootstrap config.

### `04-Rails-mister-cocktail` (Thursday)

Morning talk is about deployment on [Heroku](http://heroku.com/). Then, you'll start working during 2 days on a cocktails app, with 3 models `Cocktail`, `Ingredient`, and `Dose`. You'll have to:

- Create your app with good Postgres config.
- Follow the frontend setup carefully to work on a nice-looking app.
- Deploy on Heroku from start, and try applying continuous deployment.

Tomorrow, we'll speak of image hosting on Amazon S3, and you will add an image upload feature to your cocktails app using Paperclip.

### `05-Mister-cocktail-final` (Friday)

Morning-talk is about image upload on [Amazon S3](https://aws.amazon.com/s3/), using the [Paperclip](https://github.com/thoughtbot/paperclip) gem. The course also explains how you can secure your API keys using the [Figaro](https://github.com/laserlemon/figaro) gem. **Listen carefully if you don't want to loose money because you have a security leak on Github.**

On Friday at 2pm, quizz time! Let's step back and rehearse all the core notions of Rails on a paper quizz.

- [Quizz in English](https://github.com/lewagon/quizzes/raw/gh-pages/pdf/4-rails-english.pdf)

## Second week - Airbnb

**AirBnB**! For the second week, we'll work as teams of 2 to 4. The goal is to start from scratch and build a MVP of AirBnB.

- First demo on Wednesday (5pm)
- Official demo on Friday (5pm)

**No live-code at 5pm for this week.** But you still have morning lecture at 9am on cool topics. So get up early! Here is the lectures' planning.

### `06-Airbnb-Devise`

2-parts morning lecture:

- Authentication with [Devise](https://github.com/plataformatec/devise) gem.
- Collaboration techniques with git & Github. You will discover how we work in a dev team using branches and pull requests. You will have to use this workflow within your Airbnb teams. You'll have 5 days to go as far as you can on your Airbnb clone.

### `07-Airbnb-Facebook-connect`

In the continuity of Devise course, we will teach you how to customize Devise to build a Facebook connect, you will use [Devise Omniauth integration](https://github.com/plataformatec/devise/wiki/OmniAuth%3A-Overview).

### `08-Airbnb-SMTP`

Morning lecture is about sending mail with the *SMTP* protocol. We will use the [Mandrill](https://www.mandrill.com/) SaaS to make our Rails app send automatic emails (order or signup confirmation, booking approval, etc..). At 5pm, every group should demo the current version of their Airbnb clone in front of the class.

### `09-Airbnb-Geocoder`

Morning lecture is about geocoding (with the `geocoder` gem) and Google API to add autocomplete on address form inputs.

### `10-Airbnb-Ajax-in-Rails`

Once you understand CRUD and can quickly re-create a rails scaffold, it's time to add some magic in the app with AJAX. You'll be able to talk to the server without reloading the page (think adding a new comment to a post, clicking on a 5-star rating item, removing something from a list, etc.)

### Projects prep (weekend)

You've worked well and we are really proud of you! Time to work on your projects. During this weekend, take 3 hours to think about your projects:

1. Write your user stories (< 15 user stories).
1. Draw mockups of your main views on a paperbook.
1. Start building your DB scheme on [db.lewagon.org](http://db.lewagon.org).
1. Start thinking about your routes.

Thanks to this work, you will save a lot of time on Monday to start on your projects.
