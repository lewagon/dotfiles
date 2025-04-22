## Background & Objectives

In this challenge you will play with [OMDb API](https://www.omdbapi.com/) (The Open Movie Database). This API will allow you to retrieve information about movies from a keyword.

In this exercise, you'll have to implement a `GET` request to OMDb API in order to retrieve information about movies you're looking for and implement a callback to inject a card for each movie in the DOM.

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-search.gif)

## Resources

The [documentation for the OMDb API](https://www.omdbapi.com/)

## Specs

Start your local server with `serve`. Go to `localhost:8000`.

### View logic

In the `index.html` file of the exercise, you'll find a page structured into two main parts:

* A **form** with a text input and submit button, to enter your search and send it to the API
* A **div with the `movie-cards` id** in which you will inject a card for each movie

Here is the URL structure you should use to make a request to the API:

```
http://www.omdbapi.com/?s=MOVIE_TITLE&apikey=YOUR_API_KEY
```

For example, this is what we would search for to find all `Harry Potter` movies:

```
http://www.omdbapi.com/?s=Harry Potter&apikey=adf1f2d7
```

Here are 3 API keys to make your requests (don't hesitate to change it if your requests don't work anymore):

```
- adf1f2d7
- 48727053
- 8691812a
```

Code your JavaScript in `lib/index.js`.

### Capture the movie title and make the request

Add the proper event listener to capture the keyword entered by the user when they click on the `Search` button or when they hit the `enter` key of the keyboard.

Then store this keyword in a variable and build the url you will use in the `fetch` request.

Don't forget that this API will return a JSON, so you will have to make several operations before accessing the results.

At each step, consider adding some `console.log` to see the object that you are manipulating.

### Inject a card for each movie

As soon as you are able to `console.log` the results of the API request, start to implement the callback which will inject a card for each movie in the div with the `movie-cards` id.

Here is the html of card you can use (but feel free to create your own):

```html
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="card mb-2">
    <img src="https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg" class="card-img-top" alt="Harry Potter and the Half-Blood Prince">
    <div class="card-body">
      <span class="badge bg-primary mb-2">2009</span>
      <h5 class="card-title">Harry Potter and the Half-Blood Prince</h5>
    </div>
  </div>
</div>
```

### Optional: refresh the result on `keyup`

Now that all the logic is implemented, try to update your code to refresh the results each time the user is entering a new letter.

Happy searching!
