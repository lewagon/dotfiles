## Background & Objectives

In this challenge you will build a complete application with all the components you'll find in Rails:

- database interaction through ActiveRecord
- MVC architecture to handle your app logic

If you look at your Hackernews app skeleton, it is very similar to the skeleton of a Rails app. The only missing part is the interface (HTML/CSS/JS).

We want you to understand that **there is no magic behind Rails**. A Rails app is just a logical way to organize a programming project that involves a DB and an applicative logic, such as the Hackernews app we have built step by step.

## Specs

Build a complete Hacker News application that you will run in the terminal with `ruby interface.rb`

This application is a library for tech posts. Here is what you will be able to do:

* Login or Register as user
* See your posts or search for other posts with different filtering options
* Vote for posts you like
* Submit new posts

Example:

    Welcome on LeWagonNews!

    Are you already a member ? y/n
    If yes => what is your email ?
    If no => you can register by giving your name and email

    What do you want to do ?
    1. See all posts (list_<filter>) filter = by_date or by_ratings
    2. Vote for a post (vote_<post_id_>)
    3. See your posts (me)
    4. Submit a new post (add)
    5. Delete a post (del)
    6. exit (exit)

**Warning**: you should be careful about database validations and return correct messages when database validations fail. For example, if someone registers with an email that already exists, you have to return the correct error message.

Try to separate responsibilities with different controllers (e.g. to handle sessions or posts).
