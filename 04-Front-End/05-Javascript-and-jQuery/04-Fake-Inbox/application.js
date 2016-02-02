"use strict"; // Do not remove

function hasNewMessage() {
  // TODO: return true with a probability of 20%.
}

function newMessage() {
  // TODO: return a random message as an object with two keys, subject and sender
}

function appendMessageToDom(message) {
  // TODO: append the given message to the DOM (as a new row of `#inbox`)
}

function refresh() {
  // TODO: Implement the global refresh logic. If there is a new message,
  //       append it to the DOM. Update the unread counter in title as well.
}

$(document).ready(function () {
  setInterval(refresh, 1000); // Every 1 second, the `refresh` function is called.
});






// Do not mind this below. Used for `rake` only.
try {
  if (module) {
    module.exports = {
      hasNewMessage: hasNewMessage,
      newMessage: newMessage
    };
  }
} catch(ReferenceError) {
  // In-browser
}
