# <img src="assets/logo.svg?sanitize=true" width="24" height="24" alt="Stimulus"> Stimulus Webpack Helpers

## Using Stimulus Webpack Helpers

Call webpack's [`require.context`](https://webpack.js.org/api/module-methods/#require-context) helper with the path to the folder containing your Stimulus controllers. Then, pass the resulting context to the `Application#load` method using the `definitionsFromContext` helper:

```js
// src/application.js
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
```

## Getting Help & Contributing Back

Looking for the docs? Once you've read through the Handbook, consult the [Stimulus Reference](https://stimulus.hotwired.dev/reference/controllers) for API details.

Have a question about Stimulus? Connect with other Stimulus developers on the [Hotwire Discourse](https://discuss.hotwired.dev/) community forum.

Find a bug? Head over to our [issue tracker](https://github.com/hotwired/stimulus-webpack-helpers/issues) and we'll do our best to help. We love pull requests, too!

We expect all Stimulus contributors to abide by the terms of our [Code of Conduct](CODE_OF_CONDUCT.md).

## Acknowledgments

Stimulus is [MIT-licensed](LICENSE.md) open-source software from [Basecamp](https://basecamp.com/), the creators of [Ruby on Rails](http://rubyonrails.org).

Continuous integration VMs generously provided by [Sauce Labs](https://saucelabs.com/open-source).

---

© 2021 Basecamp, LLC.
