## Background & Objectives

Think about the Gmail inbox interface. Do you need to refresh the page for new mail to show up? The answer is **no** of course! Sites like Gmail periodically fetch new emails and add them to the top of the list. So it's adding new content to the _DOM_ **after** the first page load.

## Specs

We haven't seen AJAX yet, so we'll simulate email fetching for now. We have given you a skeleton in `application.js` to get you started.

- Implement the method `hasNewMessage()` that has a 20% probability of returning `true` (the rest of the time, it returns `false`).
- Implement the method `newMessage()` which should return a random object (i.e. a new email) with `subject` and `sender` keys. For instance:

```js
{
  sender: 'GitHub Team',
  subject: 'Welcome to GitHub'
}
```

or

```js
{
  sender: 'Arnold Schwarzenegger',
  subject: 'I'm Back'
}
```

You can `rake` these 2 methods.

Now, we'll work by testing the code in the browser (no more `rake` available). In another terminal tab, run:

```bash
serve
```

and go to [localhost:8000](http://localhost:8000). Force reload the page if necessary.

- Implement the method `appendMessageToDom(message)` which takes an object with `subject` and `sender` keys as a parameter, and append a new line for this message to the HTML markup. Inspect the `index.html` file to find examples for `unread` and `read` rows
- Finally, let's glue everything together. As you can see at the bottom of the file, the `refresh` method is called every `1000` milliseconds. Implement your `hasNewMessage()` method, and if there is a new message, add it (`newMessage()`) to the top of the inbox (`appendMessageToDom(message)`). Remember to update the counter in the `h1` title
- (Optional) Update the document title (browser tab) so that the unread message counter appears (like Gmail)

## Further suggestions & resources

There are 4 ways to add new content to the DOM. Can you explain the differences?

- [`$.append()`](http://api.jquery.com/append/)
- [`$.appendTo()`](http://api.jquery.com/appendTo/)
- [`$.prepend()`](http://api.jquery.com/prepend/)
- [`$.prependTo()`](http://api.jquery.com/prependTo/)
