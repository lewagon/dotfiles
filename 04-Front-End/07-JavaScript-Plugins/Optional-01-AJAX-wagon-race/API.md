# API

## Create a new Game Session

`POST /sessions`

### Returns

A JSON Object (~ Hash) containing the `id` of the session.

**Example:**

    {
      "id": 2,
      "created_at": "2014-07-23T13:50:25.993Z",
      "updated_at": "2014-07-23T13:50:25.993Z"
    }

## Create a new Game

`POST /sessions/:session_id/games`

### Expected POST data

    {
      "player1": "Johnny",
      "player2": "Boris"
    }

Replace `Johnny` and `Boris` with the real information from your form.

### Returns

A JSON Object containing the id of the game and the players like:

    {
       "session_id": 2,
       "game": {
          "id": 1,
          "winner": null,
          "status": "started",
          "elapsed_time": null,
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

## Finish a Game

`PATCH /games/:game_id/finish`

### Expected POST data

    {
      "winner": 2,
      "elapsed_time": 28
    }

Replace `2` with the id of the winner player and 28 with the time spent playing in seconds.

### Returns

A JSON Object containing information about the Game like:

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

## Get the results of a Game

`GET /games/:game_id/results`

### Returns

It returns an JSON Object containing information about the Game like:

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

## Get the list of the Games for a Session

`GET /sessions/:session_id/games`

### Returns

A JSON Object containing a list of the games ids like:

    {
      "session_id": 2,
      "games": {
        "started": [4],
        "completed": [1, 2, 3]
        ]
      }
    }
