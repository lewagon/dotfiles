## Background & Objectives

We'd like to build a small [Sinatra](http://www.sinatrarb.com/) web application to display all the information from that Jukebox Database.

You can start from our [Sinatra 101](https://github.com/lewagon/sinatra-101)

## Specs

### Home page

You should code a homepage `/` which displays a list of all the artists from
the Jukebox. Clicking on an artist name, you should go to the artist page.

### Artist page

You should code a `/artists/:id` page displaying all albums from this artist.
Clicking on an album name should redirect you to the album page.

### Album page

You should code a `/albums/:id` page displaying the tracks from this album.
Clicking on a track name should redirect you to the track page.

### Track page

You should code a `/tracks/:id` page displaying the track info, and hit the Youtube
API to get a video of this track. Embed it with an iframe.

In the end, use `ngrok` to share your work in Slack 👌
