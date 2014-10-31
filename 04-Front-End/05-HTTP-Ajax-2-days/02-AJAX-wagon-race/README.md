## Objectives & Background

We will take our last exercise Wagon-race and make it a little bit more interesting by adding a way to register the games we play on a server and store the results through an API.

**Before anything else:**

* Go to the exercise folder
* Run `bundle install`

**For the API:**

* You can read the API documentation in the `API.md` file in the exercise folder
* Start the API by calling the `rake api` command in the exercise forlder
* The API will be accessible on http://localhost:4567

**For YOUR javascript code:**

* Use the files located in the `public` folder
  * Place your JS code in `public/js/game.js`
  * Place your CSS in `public/css/main.css`
  * Place your HTML in `public/index.html`

**Access the Game:**

Once you've started the API with the `rake api` command, the game will be accessible on http://localhost:4567/index.html.

## Specs

**Start by reading the API documentation!**

Your application will work like this:

1. When the page loads, you will ask the API to create a new Game Session
2. Once the Game Session created your page will display a button "Start a new Game!"
3. When clicked the button disappears and a form is displayed to type Player1 and Player2 names
4. On form submission you will ask the API to create a new Game based on the players' names
5. When you get a response, hide the form, display the board (what you've done in the last exercise) and listen for users' input
6. When the game ends, send a request to the API to _finish_ the game, providing the winner and the time spent on the game (in seconds)
7. When you get the API response, display the informations on a score board and provide a "Play again!" button.
