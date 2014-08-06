# API

## Create a new Game Session

`GET /session/create`

### Returns

A JSON Object (~ Hash) containing the `id` of the session.

**Example:**

    {
      "id": 2,
      "created_at": "2014-07-23T13:50:25.993Z",
      "updated_at": "2014-07-23T13:50:25.993Z"
    }

## Create a new Game

`POST /session/:session_id/game/create`

### Expected POST data

    {
      "players": [
        { "name": "Johnny" },
        { "name": "Boris" }
      ]
    }

Replace `Johnny` and `Boris` with the real information from your form.

### Returns

A Hash of informations containing the id of the game and the players like:

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

`POST /game/:game_id/finish`

### Expected POST data

    {
      "winner": 2,
      "elapsed_time": 28
    }

Replace `2` with the id of the winner player and 28 with the time spent playing in seconds.

### Returns

A Hash of informations about the Game like:

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

`GET /game/:game_id/results`

### Returns

It returns an Hash of informations about the Game like:

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

`GET session/:session_id/games`

### Returns

A Hash with a list of the games ids like:

    {
      "session_id": 2,
      "games": {
        "started": [4],
        "completed": [1, 2, 3]
        ]
      }
    }
