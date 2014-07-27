## Background & Objectives

Now it's time to **unleash the kraken** :) You will use the ActiveRecord ORM to make queries to your DB but manipulating friendly Ruby objects directly instead of performing SQL queries and handling manually the mapping to these Ruby objects (which is a pain in the ass...).

Before you start, read the [Active Record documentation](http://guides.rubyonrails.org/active_record_basics.html).

## Specs

Use ActiveRecord to make the Hackernews program. To help you started, we already prepared a skeleton app! With ActiveRecord, each post is now an `Post` object mapped to its corresponding row in the `posts` table. As you see in `models/post.rb` we defined the `Post` class as

``` ruby
class Post < ActiveRecord::Base
end
```

This simple `ActiveRecord::Base` inheritance automatically maps the `Post` model to the `posts` table. Notice that all the magic of ActiveRecord mapping relies on this simple convention (**CONVENTION** over **CONFIGURATION**):

* the _model_ is __singular__ and __camel-cased__ (ex: `Post` or `PostAuthor`)
* the _table_ is __plural__ and __snake-cased__ (ex: `posts` or `post_authors`)

### TODO

- In `interface.rb` use the [ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html) basic methods to create, read, update and delete your posts.

## Learning Badges

- What's an ORM? How does it simplify your life?
- On which naming convention relies Active Record mapping? Where does the magic comes from?
