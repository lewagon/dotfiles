## Background & Objectives

Now it's time to **unleash the kraken** :) You will use the Active Record ORM to make queries to your DB but manipulating friendly ruby objects directly instead of performing SQL queries and handling manually the mapping to these ruby objects (which is a pain in the ass..).

Before you starts, read the [Active Record documentation](http://guides.rubyonrails.org/active_record_basics.html).

## Specs

Use Active Record to make the Hackernews program. To help you started, we already prepared a skeleton app for you! With Active Record, each post is now an Active Record object mapped to its corresponding row in the posts table. As you see in `models/post.rb` we defined the Post class ass

```
class Post < ActiveRecord::Base
end
```

This simple `ActiveRecord::Base` inheritance automatically maps the `Post` model to the `posts` table. Notice that all the magic of Active Record mapping relies on this simple convention (**CONVENTION OVER CONFIGURATION**).

* The model in singular form with capital first letter (like `Post`)
* table all downcase in plural form (like `posts`)
* To sum up: `models` (db side) <=> `Model` (ruby side)

TODO:

- In `interface.rb` use the [Active Record](http://guides.rubyonrails.org/active_record_basics.html) basics methods to create, update, delete and read Active Record objects. 

## Learning Badges

- What's an ORM? How does it simplify your life?
- On which naming convention relies Active Record mapping? Where does the magic comes from?
