## Background & Objectives

Today, we have **three goals**:

1. Deploy Mister Cocktail on Heroku
2. Add the Image Upload features
3. There's a Rails Quiz at 2pm!

### Setup

We'll continue working on yesterday's code, so go back to your folder:

```bash
cd ~/code/<user.github_nickname>/rails-mister-cocktail
```

If you generated the rails app **without** the `--database` flag, we need to manually migrate this Rails app to Postgresql for heroku. You can check if the app is configured with postgresql if you have the `pg` gem in the gemfile.

If you need to change the app to postgres, open your Gemfile, find the `sqlite` line. **Replace** it with:

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

**Hint**: You can always build on top of [Le Wagon UI Kit](https://uikit.lewagon.com/)

Remember, until yesterday we used `image_tag` which creates an html `img` tag with the images from our assets. When using the UI components you need another rails helper - `image_path`! It will create the path for the image which is needed by the `background-image` property when you use it in html. If you use the `background-image` property in css, you can use the `asset-url` helper as shown in yesterday's lecture.


```erb
<%= image_tag "logo.png" %>
```

generates:

```html
<img src="assets/images/logo-d0667407[...]xazok09.png" />
```

```ruby
image_path("logo.png")
# => "assets/images/logo-d0667407[...]xazok09.png"
```

For the exercise however, we don't only want to access static images, but we want to give the user the possibility to upload their own pictures and show those for the cocktails. In order to include images from cloudinary you will need the 'cl_image_tag'.


### Cocktail Reviews (Optional)

If you're done with the images, try to add an anonymous review system to the cocktails.
