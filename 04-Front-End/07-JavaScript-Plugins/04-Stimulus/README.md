## Background & Objectives

In this exercise, we will use the [Stimulus](https://stimulusjs.org/) JavaScript framework. This framework has been created by [Basecamp](https://basecamp.com/), the same company behind the Ruby on Rails framework.

The tagline of this framework is to be the "modest framework for the HTML you already have". It's a framework that you will be able to use during your projects to help you organize your JavaScript code. It plays well with rails as it will allow you to dynamically generate HTML on the server side (remember MVC, Sinatra, etc.) and plug in some JS behavior.

The big upside of Stimulus is that if you use it, you will almost never have to do a manual `querySelector` or `addEventListener` anymore! Instead you will use conventional `data-` HTML attributes on specific element.

This framework uses [ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), a neat addition since 2015 (ES6 release year) to add Object Oriented Programming to JavaScript.

## Getting Started: JavaScript Classes

Let's first do a small Node exercise with the good ol' rake:

```bash
rake
```

There are 3 tests you need to turn green. Everything you need to know is on [this MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). We want you to implement the `User` class in the `lib/user.js` file with:

- A `firstName` instance variable
- A `lastName` instance variable
- Both instance variables are initialized by the `constructor`
- A `fullName()` instance method returning the concatenated first and last name

That's 7 lines of JS code, think about how you did Object Oriented Programming in Ruby, the concepts are exactly the same here!

## My first event listener, Take 2

💡 This challenge is more of a tutorial to help you explore the Stimulus framework. Don't skip a step, follow along and all would be fine 👌

Remember the [My first event listener](?path=04-Front-End/05-DOM-and-Events/03-My-First-Event-Listener) exercise? You clicked a button and a [Zelda Ocarina of Time](https://www.youtube.com/watch?v=g2wzMZzdNJA) sound started playing!

```html
<button id="clickme" class="btn btn-primary btn-lg">
  Click me!
</button>
```

```js
const button = document.querySelector('#clickme');
const sound = new Audio('secret.mp3');

button.addEventListener('click', (event) => {
  const clickedButton = event.currentTarget;
  clickedButton.setAttribute('disabled', '');
  clickedButton.innerText = 'Bingo!';
  sound.addEventListener("ended", () => {
    clickedButton.removeAttribute('disabled');
    clickedButton.innerText = "Click me!";
  });
  sound.play();
});
```

Go ahead, open your `index.html` and `lib/index.js` and copy/paste the code above. When done launch the server and check in your browser that the button is working as intended:

```bash
yarn install
rake webpack
```

```bash
open http://localhost:8080
```

See how we enhanced the solution you came up with listening to the `ended` event on the `audio` element. That way, when the sound is finished playing, we re-enable the button and put back the initial text.

### Refactoring with Stimulus

We will now refactor this code using the Stimulus framework. Before we jump to the code, please take some times to read the following pages of the Handbook to grasp the philosophy behind the birth of this framework:

- [The Origin of Stimulus](https://stimulusjs.org/handbook/origin)
- [Introduction](https://stimulusjs.org/handbook/introduction)
- [Hello Stimulus](https://stimulusjs.org/handbook/hello-stimulus)
- [Building Something Real](https://stimulusjs.org/handbook/building-something-real)

When you are done with these, let's [set up](https://stimulusjs.org/handbook/installing) our project with Stimulus:

```bash
yarn add stimulus
mkdir lib/controllers # This is where we will add our Stimulus code
```

Then open the `lib/index.js` and add the following at the **beginning** of the file:

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// The rest of the code with document.querySelector('#clickme');
```

Let's now implement our **first Stimulus controller**!

```bash
touch lib/controllers/zelda_controller.js
```

```js
// lib/controllers/zelda_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    console.log("The Zelda controller is now loaded!");
  }
}
```

Let's tweak our HTML to connect the controller:

```html
<div data-controller="zelda">
  <button class="btn btn-primary btn-lg">
    Click me!
  </button>
</div>
```

See? We removed the button id, which means that the previous JS code in `lib/index.js` _no longer works_. Actually, just remove that code, and stick with the Stimulus init code. In other words, remove everything which is after this line:

```js
application.load(definitionsFromContext(context));
```

Now let's pause a bit. What do we want to do? We want to be able to click on the button and trigger a method. This can be done like this:

```html
<button data-action="click->zelda#play" [...]>
```

This will bind the `click` event to the `play()` method in the Stimulus `zelda_controller.js`. We can now define this method like this:

```js
// [...]

export default class extends Controller {
  // [...]

  play() {
    console.log("Button clicked! TODO: play a sound");
  }
}
```

Click the button. Do you have a new line in the console? Great! If not, double check everything, ask your buddy and eventually open a ticket.

The next step is to play a sound. Add the two following lines in the `play()` method:

```js
const sound = new Audio('secret.mp3');
sound.play();
```

Test it! Does it work? Good!

So what next? We want to:

- Change the button text to `"Bingo !"` while the sound is playing
- Disable the button while the sound is playing
- Change the button text back to `"Click me!"` when the sound has finished playing
- Re-enable the button when the sound has finished playing

If you look at the code above where we _did not use_ Stimulus, we were using the `event.currentTarget` to reference the button. Here we will use another feature of Stimulus, the **target**.

Re-open your HTML and add another `data-` attribute:

```html
<button data-target="zelda.trigger" [...]>
```

Our button now has a target named `trigger` that we will be able to reference directly in the Stimulus controller:

```js
export default class extends Controller {
  static targets = [ "trigger" ];

  play() {
    // [... Existing code]
    console.log(this.triggerTarget);
  }
}
```

💡 If you use Sublime's linter, then ESLint will complain of a syntax error. This exercise is not configured to support the [`babel-eslint`](https://github.com/babel/babel-eslint) package which would allow this kind of syntax. Just continue the challenge ignoring this error.

Go ahead and click on the button. Can you see the `this.triggerTarget` in the console? Is it referencing the `<button />` element in the DOM?

We can now safely use that variable to actually run the following code to fullfill the 4 specifications stated above:

```js
play() {
  // [...]
  this.triggerTarget.innerText = "Bingo!";
  this.triggerTarget.setAttribute('disabled', '');
  sound.addEventListener("ended", () => {
    this.triggerTarget.removeAttribute('disabled');
    this.triggerTarget.innerText = "Click me!";
  });
}
```

## Revealing the Stimulus magic

For now, this refactoring may seem dull, even more complicated. Let's do some changes to the code so that you see how powerful Stimulus can be.

Let's say we want to add a **second** button, which will play another sound. Also we would like that second button to actually have another text, to be more meaningful.

In a nutshell, we would like to implement our own [Button Playground](https://www.myinstants.com/).

OK, let's start with some HTML:

```html
<div data-controller="zelda">
  <button data-action="click->zelda#play" data-target="zelda.trigger" class="btn btn-success btn-lg">
    Treasure!
  </button>
</div>
```

Reload your page, you can now see the second button. Click on the green one with `Treasure` written on it. What happens?

- Is that the same sound? We'd like a new one (see `treasure.mp3` in your folder)
- When the sound has finished playing, does the button text goes back to `Treasure`? We want that!

Let's start with the text. Right now what we have in the JavaScript is a hard-coded set of the `innerText` in the play `"ended"` callback:

```js
this.triggerTarget.innerText = "Click me!";
```

What we want is to _revert it back to its initial state_. So we need to store the initial state somewhere! We can use the `connect()` method to do that:

```js
connect() {
  this.originalTriggerText = this.triggerTarget.innerText;
}
```

That way we can change the code in the `"ended"` callback to:

```js
this.triggerTarget.innerText = this.originalTriggerText;
```

Go back to the browser and click on the two buttons. Is it working?

Now let's move on to the next bug, which is that the _same_ sound is playing for the two buttons. Why is that? The reason is that in the stimulus controller you have the sound path **hard-coded**:

```js
const sound = new Audio('secret.mp3');
```

We'd like `"secret.mp3"` to actually be a variable. A way to do that is to use another `data-` attribute in the HTML:

```html
<div data-controller="zelda" data-zelda-sound="treasure.mp3">
  <button data-action="click->zelda#play" data-target="zelda.trigger" class="btn btn-success btn-lg">
    Treasure!
  </button>
</div>
```

Then go back to your Stimulus controller and update the `Audio()` constructor parameter:

```js
const sound = new Audio(this.data.get('sound'));
```

Is it working? Great, you can now update the first button HTML to make it work with the updated Stimulus controller

## Conclusion

Have a last look at your `lib/controllers/zelda_controller.js` file.

- Do you see a `querySelector`? No, this is replaced by `this.element` and the **target** mechanism which automatically binds `this.$$$Target` variables to `data-target` defined elements
- Do you see an `addEventListener`? No, this is replaced by the `data-action` with the syntax `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. You just have to implement the CALLBACK in your controller and that's it!

Once a Stimulus controller is implemented, it's very easy to re-use it everywhere on a website with the right HTML tags.

