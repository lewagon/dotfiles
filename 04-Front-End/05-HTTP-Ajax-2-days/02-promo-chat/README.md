## Background & Objectives

In this challenge, you will play with your first API: the **wagon-chat** API. This API will allow you to chat and post some gossips on your wagon-mates ;) You can find the documentation of the API [here](http://github.com/lewagon/wagon-chat-api/README.md). Throughout this exercise, you'll have to make `GET` and `POST` requests to our API in javascript to implement a dynamic chat-room for your promotion.


Read the [API documentation](http://github.com/lewagon/wagon-chat-api/README.md) carefully before starting.

## Dynamically insert new comments

In the `index.html` file of the challenge, you'll find an HTML form `#comment-form` with two inputs (`#your-message` and `#your-name`). Start by coding a simple jQuery script to dynamically insert a new comment submitted with the form on the top of the comments' list, without reloading the all HTML.

This is a basic jQuery animation that should be easy as pie for you! **Hint**: You'll have to prevent the default behavior of the form submission in jQuery (using the `preventDefault()` method).

## Make it persistent

That's cool to add new comments dynamically without reloading the all HTML. But try refreshing your page.. oups.. The comments are gone!

All your smart jQuery code is on client-side. It does not post any data on the server for the moment. For that, you have to enhance your javascript code adding the adequate `POST` request and send data to be stored on the API's database. Read [the documentation](http://github.com/lewagon/wagon-chat-api/README.md) to figure out how to build your request using `$.post()`.

## Implement the refresh button

In the markup, you'll find a `#refresh` button that should reload all the comments for your promotion and make you discover what your mates have posted on the wall! Implement the jQuery code for getting all the comments when clicking on the refresh button. You will have to make a `GET` request to the API in JS using `$.get()`. Again, you have to read the [the documentation of the API](http://github.com/lewagon/wagon-chat-api/README.md) to see how this request is structured and what the response of the API looks like.


Happy chatting!