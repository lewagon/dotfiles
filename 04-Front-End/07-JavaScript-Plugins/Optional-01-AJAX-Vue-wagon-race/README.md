## Objectives & Background

Let's take our Wagon Race and make it a little bit more interesting by using an API to register the games we play and store the results.

**Before anything else:**

Go to the exercise folder

```bash
bundle install
```

**For the API:**

* You can read the [API documentation](https://github.com/lewagon/fullstack-challenges/blob/master/04-Front-End/07-JavaScript-Plugins/Optional-01-AJAX-wagon-race/API.md)
* Start the API by calling the `bundle exec rake api` command in the exercise folder
* The API will be accessible on http://localhost:4567

NB: If you have trouble launching the api, try to run `bundle exec rake db_reset`.

**For YOUR JavaScript code:**

* Use the files located in the `public` folder
  * Put your JS code in `public/js/game.js`
  * Put your CSS in `public/css/main.css`
  * Put your HTML in `public/index.html`

**Access the game**

Once you've started the API with the `bundle exec rake api` command, the game will be accessible on http://localhost:4567/index.html.

## Specs

**Start by reading the API documentation!**

Your application will work like this:

1. When the page loads, ask the API to create a new Game Session
2. Once the Game Session is created, your page will display a button `Start New Game!`
3. When clicked, the button disappears and is replaced by a form where you can type Player1 and Player2 names
4. On form submission you will ask the API to create a new Game based on the players' names
5. When you get a response, hide the form, display the board (what you did in the last exercise) and listen for users' input
6. When the game ends, send a request to the API to _finish_ the game, provide the winner and show the time taken to win (in seconds)
7. When you get the API response, display the information on a score board and provide a "Play Again!" button
