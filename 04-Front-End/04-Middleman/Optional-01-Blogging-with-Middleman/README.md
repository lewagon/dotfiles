## Background & Objectives

Read about the blogging extension in the [Middleman documentation](https://middlemanapp.com/basics/blogging/).

## Starting a brand new Middleman app including a blog

```bash
cd ~/code/<user.github_nickname>
cat <<EOF  > Gemfile
source "https://rubygems.org"
gem "middleman", "3.4.1"
gem "middleman-blog", "3.5.3"
EOF
bundle install
bundle exec middleman init YOUR_FIRST_MIDDLEMAN_BLOG --template=blog
rm Gemfile*
cd YOUR_FIRST_MIDDLEMAN_BLOG
bundle install
bundle binstub middleman-core
middleman article YOUR_FIRST_ARTICLE
stt
```

Have a look at the blog structure and write your first article using markdown syntax.

Now you can run:

```bash
middleman server
```

You can see your first Middleman blog on [http://localhost:4567](http://localhost:4567)

Find your first article url on [http://localhost:4567/__middleman/sitemap/](http://localhost:4567/__middleman/sitemap/)

Configure your app to add a blog:

```ruby
# config.rb
activate :blog do |blog|
  blog.prefix = 'blog'
end
```

Create your first article:

```bash
middleman article YOUR_FIRST_ARTICLE
```

Write your first article with markdown syntax. (You will find it in `source/blog`)

Launch `middleman server` and go to [http://localhost:4567/__middleman/sitemap/](http://localhost:4567/__middleman/sitemap/) to find your first article's url.

Now you can create a page which lists all your articles:

```bash
touch source/blog/index.html.erb
```

```erb
<!-- source/blog/index.html.erb -->
<ul class="list-unstyled">
  <% blog.articles.each do |article| %>
    <li><a href="<%= article.url %>"><%= article.title %></a> <span><%= article.date.strftime('%b %e %Y') %></span></li>
  <% end %>
</ul>
```

Then go to [http://localhost:4567/blog](http://localhost:4567/blog) to visit your blog!

