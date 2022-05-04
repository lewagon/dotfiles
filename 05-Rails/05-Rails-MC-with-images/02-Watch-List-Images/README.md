## Background & Objectives

Today, we have **three goals**:

1. Deploy our Watch List on Heroku
2. Add the Image Upload features
3. Take the Rails Quiz!

### Setup

We'll continue working on yesterday's code, so go back to your folder:

```bash
cd ~/code/<user.github_nickname>/rails-watch-list
```

If you generated the rails app **without** the `-d` flag, we need to manually migrate this Rails app to Postgresql for Heroku. You can check if the app is configured with Postgresql if you have the `pg` gem in the Gemfile.

If you need to change the app to Postgresql, open your Gemfile, find the `sqlite` line. **Replace** it with:

```ruby
# Gemfile
[...]
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
  database: rails-watch-list_development

test:
  <<: *default
  database: rails-watch-list_test
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

We are getting our `movies` posters from our seeds and thanks to the [TMDB API](https://developers.themoviedb.org/3) but one movie poster doesn't represent what an entire list is about, so the goal is to **add a picture** to the `List` model, so that each list will be better illustrated.

The user should be able to upload an image that will then be displayed on the `index` view of `List` as a thumbnail/cover. On the `show` view of a `List`, the same image should be displayed, but bigger, followed by the movies that have been saved to it!

Even though it's a simple app, try your best to make something beautiful using Bootstrap, a few nice font, and all your creativity 🎨😊🎨

**Hint**: You can always build on top of [Le Wagon UI Kit](https://uikit.lewagon.com/)

For an overview about all the image helpers rails provides (`image_tag`, `image_path`, `asset-url`, ...) check out the [cheatsheet](https://kitt.lewagon.com/knowledge/cheatsheets/rails_image_helpers) 👈

### List Reviews (Optional)

If you're done with the images, try to add an anonymous review system to the movie lists so that everyone can comment on the movie selection of our lists!

## Going further

Congrats on completing the Watch list challenge. You can now share your amazing app with the whole world!

There is one problem though.. Anyone can create a list, add a bookmark to your lists, or delete your bookmarked movies. Also reviews are completely anonymous. 😔

In the next session we'll see how we can fix that problem. We'll introduce user authentication and user authorization during the next two sessions. 😉
