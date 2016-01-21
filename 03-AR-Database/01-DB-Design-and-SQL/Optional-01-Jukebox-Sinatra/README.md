## Background & Objectives

We'd like to build a small [Sinatra](http://www.sinatrarb.com/) web application to display all the
information from that Jukebox Database.

First make sure you have those gem installed:

```
$ gem install sinatra sinatra-contrib
```

To launch the Sinatra app, run:

```
$ ruby lib/app.rb
```

Then in your browser, go to [http://localhost:4567](http://localhost:4567)

## Specs

### Home page

You should code a homepage `/` which displays a list of all the artists from
the Jukebox. Clicking on an artist name, you should go to the artist page.

### Artist page

You should code a `/artist/:id` page displaying all albums from this artist.
Clicking on an album name should redirect you to the album page.

### Album page

You should code a `/album/:id` page displaying the tracks from this album.
Clicking on a track name should redirect you to the track page.

### Track page

You should code a `/track/:id` page displaying the track info, and hit the Youtube
API to get a video of this track. Embed it with an iframe.

In the end, use [`ngrok`](https://ngrok.com/) to showcase your work in Slack (on OSX,
just run `brew install ngrok` to get it)!
