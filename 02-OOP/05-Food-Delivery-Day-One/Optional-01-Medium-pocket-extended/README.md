## Background and Objectives

You managed your way through the first part of the Food Delivery challenge, kudoz!

In this challenge, we are going to extend the [Medium Pocket] challenge, with an `Author` model. We are going to model the following relation between `Post` and `Author`:

![Medium tables](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/medium_pocket_tables.png)

We want to extend the user actions to:

```
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. List authors
6. List author's posts
7. See author info
8. Exit
```

As you probably imagine, the info about authors will be scraped when a post is saved. Let's go ahead and think over our architecture knowing that.

## Specs

### Models

We need to add an `Author` model with instance variables we can deduce from the schema.

We also need to think the `@author` instance variable will no longer store the name of the author but the `Author` instead. We also need to add an `@id` to store the primary key.

### Repositories

The `Repository` should become a `PostRepository` and we need to add the `id` and `author_id` in the csv mechanism. Also, loading the `author_id` should result in


