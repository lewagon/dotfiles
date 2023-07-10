## Background & Objectives

The goal of this challenge is to get you to manipulate the DOM with JavaScript but *with [Stimulus](https://stimulus.hotwired.dev/)* instead. This is a very simple demo to get you started with Stimulus. You probably recognize it from the lecture 😉. Try to do it on your own.

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
window.Stimulus.register("event-listener", EventListenerController);
```

Then in the empty `controllers` folders, create a `event_listener_controller.js` file. This is where we'll write the code to react to the click on the button. Copy paste this in the file as a boilerplate to start with:

```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

Try to `console.log` something from the connect method. If you see it in the console, you're good to go! If you don't see anything, check that you have correctly attached your Stimulus controller to the DOM. For example, you can do that by adding the `data-controller="event-listener"` attribute to the `<button>` in the `index.html` file.

## Specs

Your goal is to implement some JavaScript in the `lib/controllers/event_listener_controller.js` file. **You should react to the click on the blue button.** When clicked, the controller will trigger a `disable()` function which will:

- Disable the button. This can be done by adding the `.disabled` class.
- Change the text inside the button from "Click me!" to "Bingo!"
- Optional: the `sound.mp3` [plays in the Browser](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript) when the button is clicked

The sound might not work on some browsers running on **Ubuntu**. To fix it, just run:

```bash
sudo apt-get install ubuntu-restricted-extras
```
