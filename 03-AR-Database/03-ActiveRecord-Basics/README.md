### Roadmap of the day

#### Set-up

Before starting the challenges, ensure you have a clean git status and that you have pulled upstream. Otherwise you may work on old versions of the challenges.

```
$ cd ~/code/${GITHUB_USERNAME}/fullstack-challenges/
$ git status # everything should be ok!
$ git pull --no-edit upstream master
```

Ensure you're connected on Slack.

#### `01-Migrations`

This challenge will make you create and update your database schema through migrations. You'll learn how to create a table from a migration file and then how to update the schema of an existing table.

#### `02-Models`

In this challenge, you will create an ActiveRecord model class. Then you will use it to query existing records and insert new ones.

#### `03-Seed-Faker`

The goal of this exercise is to create a dataset of fake posts. You'll use the [faker](https://github.com/stympy/faker) gem.

#### `04-Seed-API`

Similar exercise to the previous one but this time, you'll use the [rest-client](https://github.com/rest-client/rest-client) and directly call the HackerNews API to fill your dataset of posts.
