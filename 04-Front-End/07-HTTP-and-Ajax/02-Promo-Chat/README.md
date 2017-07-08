## Background & Objectives

In this challenge, you will play with an API we provide: the **wagon-chat** API.
This API will allow you to chat and post some gossips on your wagon-mates 😉

Throughout this exercise, you'll have to make `GET` and `POST` requests to an API code by Le Wagon teachers.

You'll use AJAX calls and implement a dynamic chat-room where you view the latest messages and you can post a new one.

## Specs

### View logic

In the `index.html` file of the challenge, you'll find an HTML form `#comment-form` with two inputs (`#your-message` and `#your-name`). Start by coding a simple jQuery script to dynamically insert a new comment submitted with the form on the top of the comments' list, without reloading all the page.

This is a basic jQuery exercise, no AJAX involved yet! **Hint**: You'll have to prevent the default behavior of the form submission in jQuery (using the `preventDefault()` method).

Code your javascript in `js/app.js`.

### Fetch recent messages

In the markup, you'll find a `#refresh` button that should reload all the comments for your promotion and make you discover what your mates have posted on the wall! Implement the jQuery code for getting all the comments when clicking on the refresh button. You will have to make a `GET` request to the API in JS using `$.get()`. Again, you have to read the [the documentation of the API](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) to see how this request is structured and what the API will return.

### Push your messages

That's cool to add new messages without reloading all the HTML. But try refreshing your page... The comments are gone!

All your smart jQuery code is on client-side. It does not post any data on the server for the moment. For that, you have to enhance your javascript code adding the adequate `POST` request and send data to be stored on the API's database. Read [the documentation](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) to figure out how to build your request using `$.post()`.

Open your Web Inspector, and put some `console.log()`, espacially in the `success` & `error` callbacks of the `$.ajax()` method.

### Auto-refresh

Can't you make your app automatically refresh, and get rid of the "Refresh Chat" button?

Happy chatting!
