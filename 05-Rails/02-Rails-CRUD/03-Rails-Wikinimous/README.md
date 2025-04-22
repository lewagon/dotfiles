## Background & Objectives

We want to build an anonymous wiki (like [this one](https://wikinimous.lewagon.com)) where anyone can create a new article or update an existing one.

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-wikinimous --skip-active-storage --skip-action-mailbox
cd rails-wikinimous
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## Specs

### 1 - Model

Generate the `Article` model through the right Rails generator. It should have at least the following columns:

- `title`, as a `string`
- `content`, as a `text`

Don't hesitate to crash test your new model in the `rails console`:

```ruby
new_article = Article.new(title: 'The meaning of life', content: "It's 42!")
new_article.valid?  # => should be `true`
new_article.save    # => should not display rollback warnings
Article.last        # => should be the one you just saved
```

### 2 - Seed

Add the [`faker` gem](https://github.com/stympy/faker) to your `Gemfile` and run `bundle install`. Use this gem to generate 10 fake articles in `db/seeds.rb`. When your code is done, you can run:

```bash
rails db:seed
```

### 3 - Routes, Controller & Views

Generate your controller, and implement all 7 CRUD default actions to list, show, create, update and destroy an article, like we did for the task manager.

You can now directly use the `resources` shortcut in your routes.

Have a look at the [live app](https://wikinimous.lewagon.com) to see what it should look like. 😉

### 4 - Front-end

**Install Bootstrap stylesheets**

Following [the documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css), install Bootstrap to your Rails app by copy-pasting the link tag in the `head` of the `application.html.erb` layout:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

You can now use any Bootstrap class anywhere in your Rails views 🎉

**Install Font Awesome**

Add Font Awesome `link` tag in the `head` of your layout:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

You can now use any of the [free Font Awesome icons](https://fontawesome.com/search?m=free) 🎉
