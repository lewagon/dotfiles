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

### Database Setup

If you followed the commands yesterday, your database should already be correctly set up to deploy to Heroku 🚀

Let's check to make sure. Please open the `Gemfile`. Do you have this 👇 line in there?

```ruby
# Gemfile
[...]
gem "pg"
```

✅ If yes, continue on to the next section (First Deployment).

❌ If no, we'll need to change some configuration files. Please follow the instructions under the "Change DB to Postgres" disclosure section here:

<details>
<summary markdown='span'>Change DB to Postgres</summary>
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

production:
  <<: *default
  database: rails_watch_list_production
  username: rails_watch_list
  password: <%= ENV["RAILS_WATCH_LIST_DATABASE_PASSWORD"] %>
```

Open your terminal and run:

```bash
rails db:create
rails db:migrate
rails db:seed
```
</details>

### First Deployment

Go back to the lecture and follow the step to deploy your app in production on Heroku. You will need to sign up to the service, and redeem your Free Credits

### Image Upload

We are already getting our `Movie` instances' posters from our seeds and thanks to the [TMDB API](https://developers.themoviedb.org/3). But it's not possible to do the same thing with the `List` model, since the user creates lists themself and may want to upload different images (that may not have anything to do with the movies in that list). So, the goal is to **add a user-uploaded picture** to the `List` model, so that each list will be better illustrated.

The user should be able to upload an image that will then be displayed on the `#index` view of `List` as a thumbnail/cover. On the `#show` view of a `List`, the same image should be displayed, but bigger, followed by the movies that have been saved to it!

Even though it's a simple app, try your best to make something beautiful using Bootstrap, a few nice font, and all your creativity 🎨😊🎨

**Hint**: You can always build on top of [Le Wagon UI Kit](https://uikit.lewagon.com/)

For an overview about all the image helpers rails provides (`image_tag`, `image_path`, `asset-url`, ...) check out the [cheatsheet](https://kitt.lewagon.com/knowledge/cheatsheets/rails_image_helpers) 👈

### List Reviews (Optional)

If you're done with the images, try to add an anonymous review system to the movie lists so that everyone can comment on the movie selection of our lists!

## Going further

Congrats on completing the Watch list challenge. You can now share your amazing app with the whole world!

There is one problem though.. Anyone can create a list, add a bookmark to your lists, or delete your bookmarked movies. Also reviews are completely anonymous. 😔

In the next session we'll see how we can fix that problem. We'll introduce user authentication and user authorization during the next two sessions. 😉
