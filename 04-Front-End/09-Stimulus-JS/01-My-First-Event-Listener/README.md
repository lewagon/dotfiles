## My First Event Listener

## Background & Objectives

We covered how to select a DOM element, read information on it and update it (text, CSS, etc.). Now we'll see how we can react to [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) to create interactive websites.

## Setup

Run the server from your terminal with:

```bash
serve
```

And visit `localhost:8000`. You can see we are using Bootstrap. Also, there is a big button in the `<body>`. We'll come to that in a second.

To install [`Stimulus`](https://stimulus.hotwired.dev/handbook/installing), let's start with your `index.html`. As stated in the AJAX lecture, we are going to import `Stimulus` with `importmap`. 

As a refresher, what is `importmap`? When importing many JS plugins in our code, adding many `<script>` tags can become quickly messy. `importmap` allows us to create a library to pin and import all the JS plugins we need. It's a bit like a `Gemfile` in Ruby.

First, you need to start by importing the `es-module-shims` to make sure that `importmap` can work with older browsers. Then, you can import the Stimulus library. Basically, copy paste this in the `<head>` of your `index.html`:

```html
<script async src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
  {
    "imports": {
      "@hotwired/stimulus": "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
    }
  }
</script>
```

Once this is done, let's go to our `index.js` file. You need to import the `Stimulus` library and register a controller. The controller will be in charge of reacting to the click on the button. In this case, we'll call our controller `EventListenerController`:
```javascript
import { Application } from "@hotwired/stimulus";

import EventListenerController from "./controllers/event_listener_controller.js";

window.Stimulus = Application.start();
Stimulus.register("event-listener", EventListenerController);
```

Then in the empty `controllers` folders, create a `event_listener_controller.js` file. This is where we'll write the code to react to the click on the button. Copy paste this in the file as a boilerplate to start with:
```javascript
// event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

Try to `console.log` something from the connect method. If you see it in the console, you're good to go!

## Specs

Your goal is to implement some JavaScript in the `javascript/listener.js` file. **You should react to the click on the blue button.** When clicked, we want:

- The button to be disabled. This can be done by adding the `.disabled` class.
- The button text to change from "Click me!" to "Bingo!"
- Optional: the `sound.mp3` [plays in the Browser](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)

The sound might not work on some browsers running on **Ubuntu**. To fix it, just run:

```bash
sudo apt-get install ubuntu-restricted-extras
```
