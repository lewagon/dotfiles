## Background & Objectives

Today, we have **three goals**:

1. Deploy Mister Cocktail on Heroku
2. Add the
3. There's a Rails Quizz at 2pm!

### Setup

We'll continue working on yesterday's code, so go back to your folder:

```bash
cd ~/code/<user.github_nickname>/rails-mister-cocktail
```

We generated this rails app **without** the `--database` flag, so we need to manually migrate this Rails app to Postgresql.

Open your Gemfile, find the `sqlite` line. **Replace** it with:

```ruby
# Gemfile
gem "pg"
```

Open the `config/database.yml` file, **delete** everything in it and replace it with:

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: 5

development:
  <<: *default
  database: rails-mister-cocktail_development

test:
  <<: *default
  database: rails-mister-cocktail_test
```

Open your terminal and run:

```bash
rails db:create
rails db:migrate
rails db:seed
```

### First Deployment

Go back to the lecture and follow the step to deploy your app in production on Heroku. You will need to sign up to the service.

### Image Upload

The goal is to **add a picture** to the `Cocktail` model. The user should be able to
upload an image that will then be displayed on the `index` view
of `Cocktail` as a thumbnail. On the `show` view of `Cocktail`, the same
image should be displayed, but bigger!

Even though it's a simple app, try your best to make something beautiful using Bootstrap, a few nice font, and all your creativity 🎨😊🎨

**Hint**: You can always build on top of [lewagon/ui-components](http://lewagon.github.io/ui-components/)

### (Optional) Cocktail Reviews

If you're done with the images, try to add an anonymous review system to the cocktails.
