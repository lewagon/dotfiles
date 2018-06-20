## Background & Objectives

The `faker` gem is cool, but what if we could directly import some of the **real** HackerNews
data? Well, you guessed it, it's possible! We can do this thanks to their [API](https://github.com/HackerNews/API).

## Setup

We will use the [rest-client](https://github.com/rest-client/rest-client) to call
the HackerNews API. First, install the gem on your laptop:

```bash
gem install rest-client
```

Again, you can reuse the `drop` `create` `migrate` `seed` sequence to test your seed.

```bash
rake db:drop db:create db:migrate db:seed
```

Once you have done the seed, you can look at your rows you just inserted with the `rake db:seed` using traditional SQL queries:

```bash
sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## Specs

Open the `db/seeds.rb` file and write some code to insert **10** posts (**NOT 100**, otherwise they'll ban us from using the API), retrieving data from the HackerNews API.

You can call the API endpoint [https://hacker-news.firebaseio.com/v0/topstories.json](https://hacker-news.firebaseio.com/v0/topstories.json). It will give you an array of the latest 100 post ids. Then, for the first ten (NOT hundred!) ids, you have to call the API to retrieve the details of a post.

As an example, if you want details about the post `8863`, you have to call [https://hacker-news.firebaseio.com/v0/item/8863.json](https://hacker-news.firebaseio.com/v0/item/8863.json)
