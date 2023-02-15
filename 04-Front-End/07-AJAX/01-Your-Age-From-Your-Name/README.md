## Background & Objectives

In this challenge you will play with [agify API](https://agify.io/).
This API will allow you to predict your age from your first name.

To do that, you'll have to implement a `GET` request to agify API in order to retrieve the prediced age and display it in the DOM.

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/your-age-from-your-name.gif)

## Specs

In the `lib/index.js` file, implement the `GET` request to agify API using `fetch` in the `displayAge()` function. The logic to capture and store the `firstName` is already implemented, so that you can focus on the ajax request.

You should use the following url to make the request to the API:

```
https://api.agify.io?name=THE_FIRST_NAME
```

For example, this url will predict the age for `michael`:

```
https://api.agify.io?name=michael
```

Once the request is done, update the content of the paragraph with the `your-name` id. Try to display a message with a sentence like `You're ${data.age} years old.`


Happy agifying!
