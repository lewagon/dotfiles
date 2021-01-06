## Background & Objectives

In this first challenge, we are going to select an element from the DOM!

### Install yarn

You should already have Node installed. Check with `node -v`.

Later this week we will also be using `yarn`, a JavaScript package manager.

To install it run one of the following in the terminal:

```bash
# macOS
brew install yarn
```

<br>

```bash
# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```


## Specs

Let's make sure that all dependencies for this exercise are installed with the following:

```bash
yarn install
```

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
