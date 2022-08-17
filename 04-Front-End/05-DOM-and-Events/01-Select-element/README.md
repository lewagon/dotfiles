## Background & Objectives

In this first challenge, we are going to select an element from the DOM!

### Setup

You should already have `node` and `yarn` installed. Check it with:

```bash
node -v
# You should see your node version here
yarn -v
# You should see your yarn version here
```

If not, go back to the dedicated section of the [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) or [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs) setup.

## Specs

Let's launch a local webserver by running:

```bash
rake webpack
```

Then, open [`localhost:8080`](http://localhost:8080) in your favorite web browser.

You should see the countries that won the most FIFA World Cups in an ordered list.

The goal of the challenge is to select France's `<li>` 🇫🇷!

The easiest and most straightforward way to select an element from the DOM is **with an `id`**:

- Open the `index.html` file, spot the element we want to select and set an `id` to it;
- Open the `lib/select.js` file and write the JavaScript to select the element with the given id, and make the function `return` it!

Happy selecting 🎣

**N.B:** In this challenge, the tests output is displayed directly in the browser! When you see `Congratulations!` you can `add`, `commit`, `push` and move on to the next challenge! You can also `rake` to check your style.
