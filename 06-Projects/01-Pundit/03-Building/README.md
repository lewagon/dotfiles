As not everyone will be able to code the app setup, now is the perfect time to divide up the rest of the steps amongst your team so that everyone has something to work on.


## Rails New

First, decide amongst your team who will be the Lead Developer for this project. This can be the same person from your Airbnb project, or a new team member can give it a go. That person will then continue with the following steps for setting up the app.

When starting your rails project, you **must** use one of the [**Wagon Rails Templates**](https://github.com/lewagon/rails-templates/tree/master). Make sure you use the [Devise template](https://github.com/lewagon/rails-templates/tree/master#devise) if you need a `User` model!

After the app is created, create your Github Repository and add all teammates as collaborators. Check out the [Github lecture slides](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F06-Airbnb-Devise#/1/3/0) for an overview of the process.

Then create the Heroku app and do your initial deploy. Check out [the Heroku lecture slides](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F05-Rails-MC-with-images#/0/2/5) if you need a refresher on the steps.

Tip: always run `heroku run rails db:migrate` after pushing to Heroku to make sure your production database is up to date with any changes.

## Pair Programming

It is hard to split the work and have everyone starting to code on an empty project. Start by generating your **core models** on the lead developer's machine, in [pair-programming](https://en.wikipedia.org/wiki/Pair_programming). Make sure you follow thoroughly the DB schema that was validated by the teaching staff. You can refresh your Active Record knowledge [here](https://kitt.lewagon.com/knowledge/cheatsheets/active_record_basics) if you'd like before starting to create your models.

Always start by generating the models that do not reference other models. Remember the syntax?


```bash
# Generic syntax
rails g model ModelName column:type

# For instance
rails g model Pet name:string user:references
```

Once you generated all your models, don't forget to run

```bash
rails db:migrate
```

Note: Some of your schemas may have more advanced relationships and foreign keys than we saw during Airbnb week. For example, a table that may need to store two instances (foreign keys) from another table (most often the `User` table). In this case you'll need to use something called `aliases`. Learn how to implement them with [this guide](https://kitt.lewagon.com/knowledge/cheatsheets/active_record_advanced) on advanced Active Record.

Once done, open your models and go on with **associations** and **validations** 👌

## Controllers

Before splitting the work, you can also consider generating the main controllers (keep empty at this point).

```bash
# Generic syntax
rails g controller model_name_plural

# For instance
rails g controller pets
```

At this point you should be ready to commit or merge this work to `master` and start dispatching the work in the team. Branching becomes **mandatory** at this stage!


## Figma

As you likely found out during Airbnb Week, having a thorough and fully fleshed-out Figma can make a world of a difference for your team's working process. Knowing exactly what each feature should look like, with a consistent design pattern, is what takes your app to the next level!

While you created your initial mockup on the Product Design Sprint, now is the time to take another look and update it based on the decisions you & your team made earlier about user stories, routes, etc.
Figma is an incredible tool with loads of cool features that you can utilize here to make a high-fidelity prototype. Make sure to create your [components library](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-Components-in-Figma), add some plugins like [unsplash](https://www.figma.com/community/plugin/738454987945972471/Unsplash), [color palettes](https://www.figma.com/community/search?model_type=public_plugins&q=color%20palettes) and explore even more in the [community](https://www.figma.com/community/explore) section.

Choose a team member to work on improving the Figma while the others continue with the remaining tasks.
