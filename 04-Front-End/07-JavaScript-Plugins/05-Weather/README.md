## Background & Objectives

In this challenge, we are going to play around with the [OpenWeatherMap API](https://openweathermap.org/)! We'll practise AJAX again, and discover how we can ask users for their current position!

## Specs

You can launch your local server with:

```bash
rake webpack
```

Go to [`localhost:8080`](http://localhost:8080/) and open your console.

### Get your API key (1 for you and your buddy)

First, go to [OpenWeatherMap API](https://home.openweathermap.org/users/sign_up) and create an account to get your API key. You should find it [here](https://home.openweathermap.org/api_keys). You all will be creating accounts at the same time, which can create some delay in the keys activation by Open Weather. To avoid this problem, **share your API key with your buddy** to limit the number of keys to activate.

You are allowed to perform 60 calls / minute for free, which should be plenty enough for this challenge.

### Current weather

Read the [current weather API doc](https://openweathermap.org/current) to find the endpoint we want to call with `fetch`. Found it? **Don't forget that a url always starts with `http://`** (or `https://`).

Before coding anything, try opening the url in your browser to see if you get a response. If you get a `401` it means you forgot to pass your API key! You can add it to the url's **query string** with the `appid` parameter:

```bash
&appid=YOUR_API_KEY
```

Once you managed to display the API's response in your browser, go ahead and start writing your `fetch` request in the `lib/index.js` file.

Remember the syntax? Go on and `console.log()` what you get back from the API to make sure everything works fine before going any further.

### Display data in your page

With the data sent back by the API, go ahead and build the following page:

![Current Weather](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png)

**Don't rush** in the code:

- start by designing your HTML with a pen & paper ✏️
- code the HTML with the relevant attributes (`id`s mostly)
- code your JS to inject data in the right places
- code your CSS to make it shine ✨

**Hint:** to get the temperature in Celsius you can add `&units=metric` in your request's url.

### What's the weather like in Kuala Lumpur?

Now let's add a `<form>` with an `<input>` of `type="text"` to request the weather in any city! Add a `submit` button and listen to the form's `submit` event to make the new API call.

Your page should update and display the right data, without reloading! If your HTML reloads, it means you forgot to **prevent** something...

![Weather in Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png)

### Add Select2 package from NPM

During this morning lecture you saw how to add [select2](https://select2.org/):

1. Download `jquery` and `select2` with yarn

    ```bash
    yarn add jquery select2
    ```

2. Add a select in your `index.html` file (remove the input):

    ```html
    <select id="city-input" class="select2"></select>
    ```

3. Activate `select2` with:

    ```js
    import $ from 'jquery';
    import 'select2';

    $('#city-input').select2();
    ```

Now we want to inject a list of cities without touching the HTML file. Thankfully, select2 [has an option for that](https://select2.org/data-sources/arrays)!

Copy-paste this array in your code to pass it to your `select2`:

```js
const cities = ["Amsterdam","Bali","Barcelona","Belo Horizonte","Berlin","Bordeaux","Brussels","Buenos Aires","Casablanca","Chengdu","Copenhagen","Kyoto","Lausanne","Lille","Lisbon","London","Lyon","Madrid","Marseille","Melbourne","Mexico","Milan","Montréal","Nantes","Oslo","Paris","Rio de Janeiro","Rennes","Rome","São Paulo","Seoul","Shanghai","Shenzhen","Singapore","Stockholm","Tel Aviv","Tokyo"];

$('#city-input').select2({ data: cities, width: '100%' }); // <-- add the `data` and `width` options
```

You should see the cities appear on the select, but not really well designed. That's normal, we did not include select2's css in the code yet! To do so, add this in your HTML's `<head>`:

```html
<link rel="stylesheet" href="node_modules/select2/dist/css/select2.css">
```

Much better right?

### Get current location

Last but not least, let's add a link to get the weather in the **current location**. We can do this with browsers' native [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).

Add an `<a>` tag in your `index.html` file and bind it to the following callback:

```js
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
});
```

Do you see what you get from your browser? Your GPS coordinates. Our code currently uses city **names** to get the weather. Thankfully, there is also an endpoint that takes **coordinates** in the url. You can scroll down a little [in the doc](https://openweathermap.org/current) to find the endpoint that takes a latitude and a longitude as parameters.

So go on and define another `fetchWeatherByCoordinates` to adapt the url you pass to your `fetch` request.

### Time to reorganize your code!

You are not done yet. When your features work, it's tempting to leave the code as it is. Reorganizing your code to make it maintainable in the long run is key if you want to save tons of time in the future.

Remember the rules?

- Write functions in separate files
- `import` them in `lib/index.js` to call them

Happy Coding!
