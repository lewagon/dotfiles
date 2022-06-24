# <img src="assets/logo.svg?sanitize=true" width="24" height="24" alt="Stimulus"> Stimulus

### A modest JavaScript framework for the HTML you already have

Stimulus is a JavaScript framework with modest ambitions. It doesn't seek to take over your entire front-end—in fact, it's not concerned with rendering HTML at all. Instead, it's designed to augment your HTML with just enough behavior to make it shine. Stimulus pairs beautifully with [Turbo](https://turbo.hotwired.dev) to provide a complete solution for fast, compelling applications with a minimal amount of effort.

How does it work? Sprinkle your HTML with controller, target, and action attributes:

```html
<div data-controller="hello">
  <input data-hello-target="name" type="text">

  <button data-action="click->hello#greet">Greet</button>

  <span data-hello-target="output"></span>
</div>
```

Then write a compatible controller. Stimulus brings it to life automatically:

```js
// hello_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "name", "output" ]

  greet() {
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`
  }
}
```

Stimulus continuously watches the page, kicking in as soon as attributes appear or disappear. It works with any update to the DOM, regardless of whether it comes from a full page load, a [Turbo](https://turbo.hotwired.dev) page change, or an Ajax request. Stimulus manages the whole lifecycle.

You can write your first controller in five minutes by following along in the [Stimulus Handbook](https://stimulus.hotwired.dev/handbook/introduction).

You can read more about why we created this new framework in [The Origin of Stimulus](https://stimulus.hotwired.dev/handbook/origin).

## Installing Stimulus

You can use Stimulus with any asset packaging systems. And if you prefer no build step at all, just drop a `<script>` tag on the page and get right down to business.

See the [Installation Guide](https://stimulus.hotwired.dev/handbook/installing) for detailed instructions.

## Getting Help & Contributing Back

Looking for the docs? Once you've read through the Handbook, consult the [Stimulus Reference](https://stimulus.hotwired.dev/reference/controllers) for API details.

Have a question about Stimulus? Connect with other Stimulus developers on the [Hotwire Discourse](https://discuss.hotwired.dev/) community forum.

Find a bug? Head over to our [issue tracker](https://github.com/hotwired/stimulus/issues) and we'll do our best to help. We love pull requests, too!

We expect all Stimulus contributors to abide by the terms of our [Code of Conduct](CODE_OF_CONDUCT.md).

## Acknowledgments

Stimulus is [MIT-licensed](LICENSE.md) open-source software from [Basecamp](https://basecamp.com/), the creators of [Ruby on Rails](http://rubyonrails.org).

Continuous integration VMs generously provided by [Sauce Labs](https://saucelabs.com/open-source).

---

© 2021 Basecamp, LLC.
