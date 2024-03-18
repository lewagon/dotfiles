## Background & Objectives

In this challenge you will play with the [Free Dictionary API](https://dictionaryapi.dev/). This API will allow you to fetch definitions for a particular word.

To do that, you'll have to implement a `GET` request to the API in order to retrieve the definition of the word and display it in the DOM.

## Specs

As usual, launch your server with `serve` in the terminal and go to `localhost:8000`.

In the `lib/index.js` file, implement the `GET` request to the API using `fetch` in the `displayDefinition()` function. The logic to capture and store the `word` is already implemented, so that you can focus on the AJAX request.

You should use the following URL to make the request to the API:

```
https://api.dictionaryapi.dev/api/v2/entries/en/WORD
```

For example, this URL will fetch definitions for the word "cat":

```
https://api.dictionaryapi.dev/api/v2/entries/en/cat
```

The API will give you many different definitions for the word. Don't worry, your goal is **only to display the very first definition**. In order to find this, you will want to pay close attention to the structure of the data that the API gives you back 🤔 What is an `Array`; what is an `Object`; what are the keys and values?

Once the request is done, update the page content to show the definition. The result should go in the `<p id="definition">`.

Happy defining!
