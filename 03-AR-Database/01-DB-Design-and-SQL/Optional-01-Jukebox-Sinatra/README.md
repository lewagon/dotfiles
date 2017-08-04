## Background & Objectives

We'd like to build a small [Sinatra](http://www.sinatrarb.com/) web application to display all the information from that Jukebox Database.

You can start from our [Sinatra 101](https://github.com/lewagon/sinatra-101). There is a rake for this exercise that will test your sinatra app, for it to work, run `gem install rack-test` in the Terminal.

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

When you've finished, use `ngrok` to share your work on Slack 👌
