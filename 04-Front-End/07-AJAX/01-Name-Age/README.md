## Background & Objectives

In this challenge you will play with [agify API](https://agify.io/). This API will allow you to predict your age based on your first name.

To do that, you'll have to implement a `GET` request to the `agify API` in order to retrieve the predicted age and display it in the DOM.

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/your-age-from-your-name.gif)

## Specs

As usual, launch your server with `serve` in the terminal and go to `localhost:8000`.

In the `lib/index.js` file, implement the `GET` request to agify API using `fetch` in the `displayAge()` function. The logic to capture and store the `firstName` is already implemented, so that you can focus on the ajax request.

You should use the following url to make the request to the API:

```
https://api.agify.io?name=THE_FIRST_NAME
```

For example, this url will predict the age for `michael`:

```
https://api.agify.io?name=michael
```

Once the request is done, update the page content to show the age. The result should go in the `<p id="your-age">`. Try to display a message with a sentence like "You're 30 years old".

Happy agifying!
