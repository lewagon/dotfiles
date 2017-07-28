## Background & Objectives

Today, we'll take the Mr Cocktail app from yesterday and enhance it using images.

We'll continue working on yesterday's code, so go back to your folder:

```bash
cd ~/code/<user.github_nickname>/rails-mister-cocktail
```

### Specs

The goal is to add a picture to the `Cocktail` model. The user should be able to
upload an image that will then be displayed on the `index` view
of `Cocktail` as a thumbnail. On the `show` view of `Cocktail`, the same
image should be displayed, but bigger!

Even though it's a simple app, try your best to make something beatiful using Bootstrap,
a few nice fonts, and all your creativity 🎨😊🎨

**Hint**: You can always build on top of [lewagon/ui-components](http://lewagon.github.io/ui-components/)

### Deployment

Make sure uploading works both in `development` (on your laptop)
and in `production` (Heroku). To deploy your work, you need to `commit` and then run:

```bash
git push heroku master
```

### (Optional) Cocktail Reviews

If you're done with the images, try to add an anonymous review system to the cocktails.
