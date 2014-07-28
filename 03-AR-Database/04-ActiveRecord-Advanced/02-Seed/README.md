## Background & Objectives

A database full of data is much funnier, right? In this challenge, you are going to populate your database.

## Getting started (READ THIS!)

Before starting the exercices, be sure to follow the following steps:

* Go to the exercice directory
* Install the exercice dependencies with `bundle install`

## Specs

You'll scrap Hackernews data to populate your database and use the Faker gem to create reallistic users.


### 1. Create some users

Open `db/seed.rb`, use the [Faker gem](https://github.com/stympy/faker) to create some users.

### 2. Scrapping Hackernews

Still in `db/seed.rb` use what you've learned so far to get some content from [Hackernews](https://news.ycombinator.com/).

You need to obtain _name_, _source url_, _rating_ and _creation date_ for several posts and insert it in your database.

**Don't forget to associate your posts with the users created above!**

### 3. Run the seeding script

Once you're done with your seeding ruby script, you need to run it.

Go to the `lib` folder and run the following command:

    rake db:seed

This rake task will execute your script to populate your database.

### 4. Complete the interface

Complete the interface to use you models and allow users to log in with their email and consult his/her hacker news.
