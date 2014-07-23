## Objectives & Background

We will take our last exercise Wagon-race and make it a little bit more interesting by adding a way to register the games we play on a server and store the results through an API.

For the API :

- [Here's the documentation](https://github.com/lewagon/wagon-race-api). **YOU NEED TO READ THE README**, it explains how the API works.

- The API URL is : http://wagon-race-api.herokuapp.com/

## Specs

Your application will work like this :

- (1) When the page loads, you will ask the API to create a new Game Session with a GET request.
- (2) When the Game Session is created, your page will display a button "Start a new Game !"
- (3) When clicked, this button will display a form asking for the two players' names.
- (4) When the form is submitted, your Javascript Application will make a POST request, providing the players names as data.

For instance you will POST a json object like this one :
  
```javascript
{
  "players": [
    { "name": "Johnny" },
    { "name": "Boris" }
  ]
}
```

You will get back an Hash of informations about the game and the players, you can make use of it to display some informations about the current game to your users.

Example :

```javascript
{  
   "session_id": 2,
   "game": {  
      "id": 1,
      "winner": 2,
      "status": "completed",
      "elapsed_time": 28,
      "players": [  
         {  
            "id": 1,
            "name": "Johnny"
         },
         {  
            "id": 2,
            "name": "Boris"
         }
      ]
   }
}
```

- (5) When you receive the response from the server, it means the game has started, therefore you must display the game board (this is where the code from the last exercise takes place) and listen for users' inputs.
- (6) When the game ends you must make a POST request to the API providing it with the winner data and the time spent on the game.
- You will then get back an Hash of informations (same as earlier) about the game and the players. You MUST display those informations (in a score board at the end of the game) and you MUST provide a "Play again" button. When clicking the "Play again" button, you will start again at **(3)** after asking the server to create a new game.

### The API

Each time you must make a call to the API (GET request, or POST request) take a look at `https://github.com/lewagon/wagon-race-api` .
All endpoints are documented.

For instance, when loading the page, you will need to make a `GET` request.
The API URL is : `http://wagon-race-api.herokuapp.com/`
The Endpoint is : `/session/create`
Thus, you will need to make a `GET` request on `http://wagon-race-api.herokuapp.com/session/create`
You will then get back a Hash that will look like this :

```javascript
{  
  "id": 2,
  "created_at": "2014-07-23T13:50:25.993Z",
  "updated_at": "2014-07-23T13:50:25.993Z"
}
```

This means that the Game Session has been created and the API gives you the session_id.

Be careful to store the session_id somewhere because you will need it later.
For instance, when creating a game inside a Game Session, you will need to `POST` to `/session/:id/game/create`
The `:id` in the previous URL must be replaced with the id of the session you desire to create a game in.

If we got `id: 1`, our API Endpoint will be : `/session/1/game/create`

**If this is too simple for you**

You can look in the API documentation for other endpoints and maybe create a score board for all the games in a session.
You could also create a nice interface, listing all the games in a session and displaying the results of a game when you click on it.
