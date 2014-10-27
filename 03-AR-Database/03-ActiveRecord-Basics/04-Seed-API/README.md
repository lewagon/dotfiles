## Background & Objectives

The `faker` gem is nice, but what if we could directly import some of the **real** HackerNews
data? It's possible, as they now have an [API](https://github.com/HackerNews/API).

## Setup

We will use the [rest-client](https://github.com/rest-client/rest-client) to call
the HackerNews API. First, install the gem on your laptop:

```bash
$ gem install rest-client
```

Again, you can reuse this sequence to test your seed.

```bash
$ rake db:drop db:create db:migrate db:seed
```

Look at your rows inserted with the `rake db:seed`:

```bash
$ sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## Specs

Open the `db/seeds.rb` file and write some code to insert **10** posts(not **100**, otherwise they may ban us from using the API...), retrieveing
data from the HackerNews API.

You can call the API endpoint [https://hacker-news.firebaseio.com/v0/topstories.json](https://hacker-news.firebaseio.com/v0/topstories.json). It will give you an array of the latest 100 post ids. Then, for the first ten (not hundred!) ids, you have to call the API
to retrieve the details of a post.

As an example, if you want details about the post `8863`, you have to call
[https://hacker-news.firebaseio.com/v0/item/8863.json](https://hacker-news.firebaseio.com/v0/item/8863.json)

