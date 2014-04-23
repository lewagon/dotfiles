## Background & Objectives

A database full of data is much funnier, right? In this challenge, you are going to populate your database.

## Specs

- To feed your `posts` table, collect the data from [Hackernews](https://news.ycombinator.com/)
- For the users you can use the [Faker gem](https://github.com/stympy/faker). 
- Write your code in `db/seed.rb`
- Do not forget to associate each post you create with a user.

When you are done with your ruby script that feeds the db:

- run `cd lib` to get to the lib folder
- run `rake db:seed`, which launch a very simple task, just loading your `seed.rb` file. See the task's details below, we are sure you understand the ruby behind.
 
```
desc "populate the database with sample data"
task "db:seed" do
  require APP_ROOT.join('db', 'seed.rb')
end
```

- complete the `interface.rb`, to enable any fake user (yo have just generated) to login with his email and then consult his hacker news. 