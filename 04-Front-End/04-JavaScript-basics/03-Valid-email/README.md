## Background & Objectives

The return of the [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)! Good news, they're the exact same expressions you discovered on week 2 🙌

The only difference is the built-in way of testing one in JavaScript (vs. Ruby).

## Specs

Open the `lib/valid_email.js`. Implement the `valid` function which takes one `email` parameter (of type `string`) and returns a `boolean`: `true` if the email provided is valid, `false` if not. For example:

- `valid('boris.lewagon.org')` should return `false`
- `valid('boris@lewagon.org')` should return `true`

**First** you should find a `RegExp` that passes all the tests!

To do so, you can open the `spec/valid_email_spec.js` file and copy paste the tested emails in the `Your test string` textarea on [rubular](http://rubular.com/).

**Then**, you need to find a way to test this `RegExp` using JavaScript in the `valid` function, and return the right boolean!

Test your code by running `rake` regularly.
