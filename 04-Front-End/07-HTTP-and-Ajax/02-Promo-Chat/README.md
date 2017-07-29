## Background & Objectives

In this challenge, you will play with an API we provide: the **wagon-chat** API.
This API will allow you to chat and gossip with your wagon-mates 😉

During this exercise, you'll have to make `GET` and `POST` requests to an API code. You'll use AJAX calls to implement a dynamic chat-room where you can instantly view the latest messages and post new ones.

## Specs

### View logic

In the `index.html` file of the challenge, you'll find an HTML form `#comment-form` with two inputs (`#your-message` and `#your-name`). Start by coding a simple jQuery script to dynamically insert a new comment to the top of the comments' list, without reloading the page.

This is a basic jQuery exercise, no AJAX involved yet! **Hint**: You'll have to prevent the default behavior of the form submission in jQuery (using the `preventDefault()` method).

Code your javascript in `js/app.js`.

### Fetch recent messages

In the markup, you'll find a `#refresh` button. We want to make it show all the latest comments from everyone your batch. Implement the jQuery code to do this. You will have to make a `GET` request to the API in JS using `$.get()`. Again, you have to read [the documentation of the API](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) to see how this request is structured and what the API will return.

### Push your messages

It's fun seeing the new messages without reloading all the HTML. But try refreshing your page... The comments are gone!

All your smart jQuery code is on the client-side. It does not post any data on the server for the moment. To do that, you have to enhance your javascript code by adding a `POST` request to send data to be stored on the API's database. Read [the documentation](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) to figure out how to build your request using `$.post()`.

Open your Web Inspector, and put a few `console.log()` commands in there to see what is happening. Especially in the `success` & `error` callbacks of the `$.ajax()` method.

### Auto-refresh

Time to automatically refresh your app. Get rid of that "Refresh Chat" button!

Happy chatting!
