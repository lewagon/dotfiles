## Background and Objectives

You managed your way through the first part of the Food Delivery challenge, kudoz!

In this challenge, we are going to extend the DEV Pocket challenge (Cookbook's first optional challenge), with an `Author` model. We are going to model the following relation between `Post` and `Author`:

![Database schema](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/pocket_reader.png)

We want to extend the user actions to:

```bash
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. List authors         # NEW
6. List author\'s posts  # NEW
7. See author info      # NEW
8. Exit
```

As you probably imagine, the info about authors will be scraped when a post is saved. Let's go ahead and think over our architecture knowing that.

## Specs

Start by navigating to Cookbook's DEV Pocket optional challenge and download the solution. This will be your starting point for coding this extended version.

### Models

First of all, we need to code an `Author` model with instance variables we can deduce from the schema.

**Author-posts relationship**

The relation we want to model between posts and authors is the following:

```
An author can write several posts
A post is written by an author
```

This means that in the code:

- We need to add a `@posts` instance variable in `Author` (and expose it to reading)
- The `@posts` is an array of **`Post` instances**
- We need to update the `@author` instance variable in `Post` to no longer store the name, but **the `Author` instance instead** (and expose it to reading)
- We need to add `@id`s in both models to persist the relationship in our csv files
- The relationship is carried by the children (the posts here), meaning we need an `author_id` column in our `posts.csv`

To associate a post to its author, consider coding the following:

```ruby
# lib/models/author
class Author
  # [...]
  def add_post(post)
    @posts << post
    post.author = self  # <-- what do you need in your Post class to write this?
  end
end
```

Test your relationship in `irb`, fix bugs and move on to the repositories.

### Repositories

The `Repository` should become a `PostRepository` and we need to add the `id` and `author_id` in the csv mechanism.

**As a reminder, it's the repository's role to give ids to the instances whenever it adds them.**

Consider renaming `find(index)` into `find_by_index(index)`. We'll keep the `find` denomination for the method that takes an `id` as a parameter.

We need to code an `AuthorRepository` and link it to an `authors.csv` file. Nothing exotic in this repo for now.

In the `PostRepository`, we need to update the `load_csv` method now that a post is related to an author object.

On a given post, when we read the `author_id` from the csv, we need to find the corresponding author instance to associate it to our post object. This means:

- The `PostRepository` must be instantiated after the `AuthorRepository`
- The `PostRepository` should have access to an `@author_repo` instance
- The `AuthorRepository` should have a `find(id)` method that returns the right `Author` instance from its `@authors` array

Make sure your repositories work well before moving on to the applicative brick of our software.


### Controllers

Start by renaming `Controller` in `PostsController`. We want to add user stories related to authors and they will be served by an `AuthorsController`.

Before coding any new user stories, try running the existing ones. You'll find a series of bugs to fix due to all the changes we did.

**Fix the save post feature**

The hardest part of the challenge is just around the corner. We said we wanted to scrape details about the post's author when saving it to our Pocket app.

We already know how to scrape a post. We need to update our scraping script to get the author's **nickname** on the post's page.
Thanks to the nickname, you should be able to open the author's page and scrape the information detailed in the schema.

Once you have all the data needed to create a post, go ahead and instantiate a `Post.new`. Same thing for the `Author.new`. Let's pause a minute before adding them to our repositories.

For simplicity's sake, let's assume our user is smart and won't try and save a post already saved. However, if you save a 2nd post of the same author, **you don't want to duplicate the author in your repo**! Consider the following steps in your `PostsController#create` action:

```ruby
def create
  # 1. Ask user for a post path (view)
  # 2. Scrape post (?)
  # 3. Scrape author (?)
  # 4. Find corresponding author (author repo)
  # 5. If we don't have it, save it and get it back with its id (author repo)
  # 6. Associate post to its author (model)
  # 7. Save post (post repo)
end
```

Code everything in the `PostsController` until the action works fine. Then you might consider extracting the scraping part in a service object. A fine candidate would be:

```ruby
# lib/services/reader_scraper.rb
class ReaderScraper
  def initialize(post_path)
    @post_path = post_path
  end

  def call
    # Scrape post
    # [...]
    post = Post.new(post_attributes)
    # Scrape author
    # [...]
    author = Author.new(author_attributes)
    return { post: post, author: author }
  end
end
```

Make sure it still works, and move on to the next user story.

**List authors**

Phew, the hardest part is behind us. This one is an easy one. We want to list authors, so let's code an `AuthorsController`.

It will need to access the author repo and an authors view. The view must display authors names and associated unread posts in an indexed list:

```bash
1. Magnus Skog
2. Molly Struve (2 unread)
```

**List authors posts**

Our work on the models should make this one pretty easy. We can access all posts from an author thanks to the `posts` getter. Write the pseudo-code to breakdown the problem in small steps, test and move on to the last feature.

**See author's details**

As always, start by breaking down the action in small steps in pseudo-code, then translate line by line in Ruby and test regularly.

Our user must see the following in the terminal when choosing Molly Struve:

```bash
1. Magnus Skog
2. Molly Struve (2 unread)
Index?
> 2

Molly Struve (molly_struve)

Elasticsearch wrangler. Speaker. Runner. Show Jumper. Always Ambitious. Never Satisfied.

54 posts published - 442 comments written
```

Happy modeling!
