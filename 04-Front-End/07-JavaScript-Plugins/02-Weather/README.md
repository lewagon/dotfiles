## Background & Objectives

In this challenge, we are going to play around with the [OpenWeatherMap API](https://openweathermap.org/)! We'll practise AJAX again, and discover how we can ask users for their current position!

## Specs

You can launch your local server with:

```bash
rake webpack
```

Go to [`localhost:8080`](http://localhost:8080/) and open your console.

### Get your API key

First, go to [OpenWeatherMap API](https://home.openweathermap.org/users/sign_up) and create an account to get your API key. You should find it [here](https://home.openweathermap.org/api_keys).

You are allowed to perform 60 calls / minute for free, which should be plenty enough for this challenge.

### Current weather

Read the [current weather API doc](https://openweathermap.org/current) to find the endpoint we want to call with `fetch`.

Before coding anything, try opening the url in your browser to see if you get a response. If you get a `401` it means you forgot to pass your API key! You can add it to the url's **query string** with the `appid` parameter:

```bash
&appid=YOUR_API_KEY
```

Once you managed to display the API's response in your browser, go ahead and start writing your `fetch` request in the `lib/app.js` file.

Remember the syntax? Go on and `console.log()` what you get back from the API to make sure everything works fine before going any further.

### Display data in your page

With the data sent back by the API, go ahead and build the following page:

![Current Weather](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png)

**Don't rush** in the code:

- start by designing your HTML with a pen & paper ✏️
- code the HTML with the relevant attributes (`id`s mostly)
- code your JS to inject data in the right places
- code your CSS to make it shine ✨

### What's the weather like in Kuala Lumpur?

Now let's add a `<form>` with an `<input>` of `type="text"` to request the weather in any city! Add a `submit` button and listen to the form's `submit` event to make the new API call.

Your page should update and display the right data, without reloading! If your HTML reloads, it means you forgot to **prevent** something...

![Weather in Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png)

### How about

### Get current location

Last but not least, let's add a link to get the weather in the **current location**. We can do this with browsers's native [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).

Add a link in your `index.html` file and bind it to a fetch call that requests the weather in your current city!

### Time to reorganize your code!

You are not done yet. When your features work, it's tempting to leave the code as it is. Reorganizing your code to make it maintainable in the long run is key if you want to save tons of time in the future.

Remember the rules?

- Write functions in separate files
- `import` them in `lib/app.js` to call them

Happy Coding!
