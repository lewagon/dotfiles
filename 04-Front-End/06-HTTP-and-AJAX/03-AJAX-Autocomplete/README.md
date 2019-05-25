## Background & Objectives

This is our first AJAX exercise. We will build an input with autocomplete capability. What's that? Head out to [Algolia Places](https://community.algolia.com/places/) for an example: as soon as you type **one** character in the input field, you get autocomplete suggestions underneath.

We want to build an autocomplete input with **Dictionary words**

## Specs

Launch your local webserver with:

```bash
rake webpack
```

There are three files you need to update:

- `index.html` - the input is already in place but there are some dumb elements in the autocomplete `ul` that you can remove
- `style.css` - add some style
- `lib/index.js` - you'll start here from scratch!

To get suggestions, you can use the following API:

```bash
GET https://wagon-dictionary.herokuapp.com/autocomplete/:stem
```

Here, you will replace `:stem` with the characters typed by the user. As soon as the user enters a new character (`keyup` maybe?), you will trigger a new AJAX call. If you look at your "Network" tab in Chrome Inspector you should see something like this:

```bash
https://wagon-dictionary.herokuapp.com/autocomplete/u
https://wagon-dictionary.herokuapp.com/autocomplete/un
https://wagon-dictionary.herokuapp.com/autocomplete/und
https://wagon-dictionary.herokuapp.com/autocomplete/unde
https://wagon-dictionary.herokuapp.com/autocomplete/under
etc.
```

When you receive the JSON from the API, you job is to update the `ul#results` list with suggestions!

Once you have the basic behavior, don't hesitate to try and make the `ul#results` look 🎨 really good 🎨 😋
