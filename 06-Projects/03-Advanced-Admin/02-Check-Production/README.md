## Debug Heroku

A lot of progress was likely made on the previous session. If your team hasn't pushed all that new merged code to Heroku yet, now is the time to (ask the team member with the `heroku` remote):

```zsh
git status # must be clean, if not add / commit your WIP
git co master
git pull origin master
git push heroku master
```

Once it's there, you can `heroku open`, test all the features and prioritize fixing any bugs first 👌

## Seeds

If you don't have any seeds yet, create some. If you already have some, think about how you can improve them and bulk them out. The more seeds you have and the better they are, the more legit your app will look.

In Le Wagon projects context, you may find it useful to have a seed that "resets" the database to your Demo's starting point. In "real-life" projects, **never code any destructive behaviour** in a seed ⚠️ you don't want to run `User.destroy_all` by mistake 😱

Once your seed is ready and deployed to production, you just need to run :point_down:

```bash
heroku run rails db:seed
```
