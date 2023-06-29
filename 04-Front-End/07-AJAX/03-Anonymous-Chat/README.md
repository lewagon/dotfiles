## Background & Objectives

In this challenge, you will play with an API we provide: the **wagon-chat** API.
This API will allow you to chat and gossip with your wagon-mates 😉

During this exercise, you'll have to make `GET` and `POST` requests to an API code. You'll use AJAX calls to implement a dynamic chat-room where you can instantly view the latest messages and post new ones.


![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/chat-room.gif)

## Resources
The [documentation of the wagon-chat API](https://github.com/lewagon/wagon-chat-api/blob/master/README.md)

## Specs

Start your local server with `serve`. Go to `localhost:8000`.

### View logic

In the `index.html` file of the challenge, you'll find a page structured into two main parts:

* A **send button** with a form, to push your messages to the chat API.
* A **refresh button** with a placeholder, where you will display all the new messages.

Start by reading the [documentation of the API](https://github.com/lewagon/wagon-chat-api/blob/master/README.md). How many endpoints can you spot? Can you figure out which endpoint is related to the form? And which one is related to the refresh button?

Code your JavaScript in `lib/index.js`.

### Refresh button: fetch recent messages

In the markup, you'll find the `#refresh` button. When clicked, we want to display all the latest comments from everyone in your batch!

You will have to make a `GET` request to the API in JS using `fetch`: read the [documentation](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) to see how this request is structured and what the API will return. Find the messages in the data you receive, and display each one of them in the DOM.

Here is a sample message:

```html
<li>A sample message (posted <span class="date">10 minutes ago</span>) by John</li>
```

### Send button: push your messages to the API

Time to take part to the chat and post your own messages!

The form `#comment-form` has two inputs (`#your-message` and `#your-name`). Start by coding a simple script to  retrieve the input values. At first, you can just `console.log()` the values to make sure everything works as expected. This is a basic DOM exercise, no AJAX involved yet!

**Hint**: You'll have to prevent the default behavior of the form submission (using the `preventDefault()` method).

Your code does not post any data to the server for the moment. To do that, you have to enhance your JavaScript code by adding a `POST` request to send data to be stored in the API's database. Read the [documentation](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) to figure out how to build your request using `fetch`.

Here is an example on using `fetch` on the [JSON Placeholder API](https://jsonplaceholder.typicode.com/):

```js
const message = { name: "George", body: "Hello from Kitt" };
const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url, {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(message)
})
.then(response => response.json())
.then((data) => {
  console.log(data);
});
```

### Auto-refresh

Time to automatically refresh your app. Get rid of that "Refresh Chat" button!

Happy chatting!
