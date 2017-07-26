## Background & Objectives
Use the Facebook Graph API to build a dynamic webpage showing all your facebook info (firstname, lastname, picture, friends..).

## Specs

### Get an access token

First, you need to get an access token to be authenticated (with your Facebook account) when you request the API:

- Visit the [Graph API explorer](https://developers.facebook.com/tools/explorer/)
- Get a token and select fields you want to fetch
- Copy this token in your Javascript file `fb.js`

```javascript
var accessToken = "CAu......0vXW"; // copy your access token here
```

### Inject basic info

We have already implemented the first AJAX request for you to insert basic info (first name, last name, picture) in your `index.html` page. Test our code pressing the "Get info from facebook" button. It should work.

### Your turn

It's your turn to play with the Facebook API:

- Play with the [open graph API explorer](https://developers.facebook.com/tools/explorer/) to set up the request you want to build (groups, likes, education... any *public* data from your profile).
- Once you know how the structure of the URL, implement a new AJAX `$.get` request in the js code to get the data and inject it into the `#your-profile .advanced` div.


