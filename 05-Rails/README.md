At last, Rails!

## First week - Rails kickoff

This is the last real week on Kitt with "real challenges". We will dive into the architecture of a fresh Rails app and try to understand what's going on. **We'll build one rails app per day**.

### `01-Rails-intro` (Monday)
1st day of Rails, introducing Rails flow: routing > controller > view without the model layer and explaining Rails `params`. During the challenges, you'll have to transform vanilla ruby challenges of the first week into Rails application.

### `02-Rails-CRUD` (Tuesday)
Here comes our good old friend Active Record again! One of the most important Rails lectures: your lead-coach will code from scratch the 7 CRUD actions and introduce the `resources` routing.

### `03-Rails-restaurant-reviews` (Wednesday)
During this day, you will add a second model to a Rails app by building a 2-model clone of Yelp, with restaurants and reviews. 2 lectures in the morning:

1. Beyond CRUD: discover advanced routing and validations in Rails
1. Rails frontend: respect our frontend setup to implement Bootstrap SASS + frontend libraries the good way and replace `form_for` by `simple_form_for`

### `04-Rails-mister-cocktail` (Thursday)
Morning talk is about deployment on Heroku. Then, you'll start working during 2 days on a cocktails app, with 3 models `Cocktail`, `Ingredient`, and `Dose`. You'll have to:

- Create your app with good Postgres config.
- Follow the frontend setup from the beginning to work on a nice-looking app.
- Deploy on Heroku ASAP, and try applying continuous deployment.

Tomorrow, we'll speak of image upload on Amazon S3, and you will add image upload to your cocktails app.

### `05-Mister-cocktail-final` (Friday)
Morning-talk is about image upload on [Amazon S3](https://aws.amazon.com/s3/), using the [Paperclip](https://github.com/thoughtbot/paperclip) gem. The course also explains how you can secure your API keys using the [Figaro](https://github.com/laserlemon/figaro) gem.

**Listen carefully if you don't want to loose money because you have pushed your tokens on Github!**

## Second week - Airbnb

**AirBnB**! For the second week, we'll work as teams of 2 to 4. The goal is to start from scratch and build a MVP of AirBnB.

- First demo on Wednesday 5pm
- Official demo on Friday 5pm

Don't be shy! Be proud :)

### `06-Airbnb-Day-1`

2-parts morning lecture:
- authentication with Devise gem.
- we will then brief you about collaboration techniques with git & Github. You will discover how we work in a dev team using branches and pull requests. You will have to use this workflow within your Airbnb teams. You'll have 5 days to go as far as you can on your Airbnb clone.dans leur clone d'AirBnB.

### `06-Airbnb-Day-2`
In the continuity of Devise course of yesterday, we will teach you how to customize Devise to build a Facebook connect.

### `06-Airbnb-Day-3`
Morning lecture is about sending mail with the *SMTP* protocol. We will use the *Mandrill* SaaS to make our Rails app send automatic emails (order confirmation, signup confirmation, booking approval, etc..). At 5pm, every group should demo the current version of their Airbnb in front of the class.

### `06-Airbnb-Day-4`
Morning talk is about geocoding (with the `geocoder` gem) and Google API to add autocomplete on address form inputs.

### `06-Airbnb-Day-5`
Morning talk about building an "admin space" using ActiveAdmin gem. Final demos are at 5pm.

You've worked well! Relax during this weekend and take time to think about your projects to save time on Monday's kickoff

- Write your user stories.
- Start drawing mockup of your main views.
- Start drawing your DB scheme.
- Start thinking about your routing.

That will help you save time on Monday.


