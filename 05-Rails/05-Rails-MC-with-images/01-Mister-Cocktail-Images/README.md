## Background & Objectives

Today, we'll take the Mister Cocktail app from yesterday and enhance it with some images.

We'll continue working on yesterday's code, so go back to your folder:

```bash
cd ~/code/<user.github_nickname>/rails-mister-cocktail
```

### Specs

The goal is to add a picture to the `Cocktail` model. The user should be able to
upload an image. The image would then be displayed on the `index` view
of `Cocktail`, as thumbnails. On the `show` view of `Cocktail`, the same
image should be displayed, but bigger!

Even with such a simple app, try to make something beatiful using Bootstrap,
the right fonts and an ounce of creativity 😊 You should build something beautiful!

**Hint**: Use [lewagon/ui-components](http://lewagon.github.io/ui-components/)

### Deployment

Make sure uploading works both in the `development` environment (on your laptop)
and on the `production` environment (Heroku). To deploy your work, you need
to commit and then run:

```bash
git push heroku master
```

### (Optional) Cocktail Reviews

If you're done with the image, try to add an anonymous review system to the cocktails.
