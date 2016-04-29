## Background & Objectives

Think about the Gmail web interface. Do you need to refresh the page for new mail to show up? The answer
is know, it periodically fetches new emails and add them at the top of the list. It means that some
content was added to the _DOM_ **after** the first page load.

## Specs

We haven't seen AJAX yet, so we'll simulate email fetching. A skeleton is given to you in
`application.js` to get started.

- Implement the method `hasNewMessage()` which should return `true` with a probability of 20%. Otherwise it should return `false`.
- Implement the method `newMessage()` which should return a random object with `subject` and `sender` keys. For instance:

```js
{
  sender: 'GitHub Team',
  subject: 'Welcome to GitHub'
}
```

- Implement the method `appendMessageToDom(message)` which takes as a parameter an object with `subject` and `sender` keys, and append to the HTML markup a new line for this message. Look at the `index.html` file to find examples for `unread` and `read` rows.
- Finally, let's glue everything together. As you can see at the bottom of the file, The `refresh` method is called every `1000` milliseconds. Implement that method which checks if there is a new message (`hasNewMessage()`), and if so, adds a new message (`newMessage()`) to the top of the message list (`appendMessageToDom(message)`). It should also update the counter in the `h1` title.
- (Optional) Update the document title (browser tab) so that the unread counter appears
- (Optional) use [Tinycon](https://github.com/tommoor/tinycon) to update the site favicon with a message unread counter.

Be careful, only the two first items are tested with `rake`. The two other will be tested manually in your browser.

## Further suggestions & resources

There are 4 ways to add new content to the DOM. Can you explain the differences?

- [`$.append()`](http://api.jquery.com/append/)
- [`$.appendTo()`](http://api.jquery.com/appendTo/)
- [`$.prepend()`](http://api.jquery.com/prepend/)
- [`$.prependTo()`](http://api.jquery.com/prependTo/)
