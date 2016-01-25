## Background & Objectives
Use the Facebook Graph API to build a dynamic webpage showing all your facebook info (firstname, lastname, picture, friends..)

## Specs

### Get an access token

In order to make request to the facebook graph API, you have to obtain a token, i.e. a kind of passord authenticating yourself to Facebook.


- Visit the [graph API explorer](https://developers.facebook.com/tools/explorer/)
- Get a token
- Copy this token in your Javascript file `fb.js`


```javascript
var accessToken = "CAu......0vXW"; // copy your access token here
```

### Inject basic info

We have already implemented the first AJAX request for you to insert basic info (first name, last name, picture) in your `index.html` page. Test our code pressing the "Get info from facebook" button. It should work.

### Your turn

It's your turn to play with Facebook API:

- Play with the [open graph api explorer](https://developers.facebook.com/tools/explorer/) to choose the request you want to build (get your friends, your school, whatever info you want!).
- Once you know how this URL is structured, implement a new AJAX `$.get` request in the js code to get this data and inject it in the `#your-profile .advanced` div.

Let's play with the Facebook API!

