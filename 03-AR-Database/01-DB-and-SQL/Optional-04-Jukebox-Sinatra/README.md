## Background & Objectives

We'd like to build a small [Sinatra](http://www.sinatrarb.com/) web application to display all the information from that Jukebox Database you've been using in some of the day's challenges.
There is a rake for this exercise that will test your sinatra app. Just launch it with the usual `rake` command.

## Setup

Install the gems specified in your `Gemfile` with the following command:

```bash
bundle install
```
This will create an auto-generated `Gemfile.lock` file which specifies versions for each gem. It locks them actually.

Launch the sinatra app.

```bash
ruby lib/app.rb
```

Look! You can go to [http://localhost:4567](http://localhost:4567). You are now running a small webserver and are accessing it with your browser. No more command line!

## Some words about Sinatra

Sinatra is what we call a web "microframework". It's basically a micro Rails, also following the **MVC** pattern.
The `app.rb` file acts as the controller. The router layer is handled by Sinatra.
We already created a controller method to handle the root of the web app. Sinatra maps the URL in the browser to the right method in `app.rb`. Take a look at the [routing doc](http://www.sinatrarb.com/intro.html#Routes) for more info.

Don't hesitate to read more about Sinatra in our homemade [tutorial](https://github.com/lewagon/sinatra-101) (skip the **Setup** part as you have already a boilerplate in the `lib` folder).

## Specs

### Home page

You should code a homepage `/` which displays a list of all the artists from
the Jukebox. Clicking on an artist name, you should go to the artist page.

### Artist page

You should code an `/artists/:id` page displaying all albums from this artist.
Clicking on an album name should redirect you to the album page.

### Album page

You should code an `/albums/:id` page displaying the tracks from this album.
Clicking on a track name should redirect you to the track page.

### Track page

You should code a `/tracks/:id` page displaying all the track info, and if you have time
you can have a look at a video embed API service like youtube to also throw in a video on
that page.

When you've finished, use [`ngrok`](https://github.com/lewagon/sinatra-101/blob/master/README.md#share-with-the-world) to share your work on Slack 👌
