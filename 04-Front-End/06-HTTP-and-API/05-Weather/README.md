## Background & Objectives

In this challenge, we are going to play around with the [OpenWeatherMap API](https://openweathermap.org/)! We'll practise calling an API again, and discover how we can ask users for their current position!

## Specs

Open the html page in your browser at `localhost:8000` with:

```bash
serve
```

### Get your API key (1 for you and your buddy)

First, go to [OpenWeatherMap API](https://home.openweathermap.org/) and create an account to get your API key. You should find it [here](https://home.openweathermap.org/api_keys). You all will be creating accounts at the same time, which can create some delay in the keys activation by Open Weather. To avoid this problem, **share your API key with your buddy** to limit the number of keys to activate.

You are allowed to perform 60 calls / minute for free, which should be plenty enough for this challenge.

### Current weather

Read the [current weather API doc](https://openweathermap.org/current) to find the endpoint we want to call with `fetch`. Found it? **Don't forget that a url always starts with `http://`** (or `https://`).

Before coding anything, try opening the url in your browser to see if you get a response. If you get a `401` it means you forgot to pass your API key! You can add it to the url's **query string** with the `appid` parameter:

```bash
&appid=YOUR_API_KEY
```

Once you managed to display the API's response in your browser, let's jump into the JavaScript implementation.

### Display data in your page

With the data sent back by the API, go ahead and build the following page:

![Current Weather](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png)

To get the temperature in Celsius, you can add `&units=metric` in your request's URL.

To get the icon image, from the icon id, you can use this URL: `https://openweathermap.org/img/w/{iconId}.png`

### What's the weather like in Kuala Lumpur?

Now let's listen to the `submit` event on the `<form>` to get user data from the `<input>` and customize the URL before making the API call.

Your page should update and display the right data, without reloading! If your page reloads, it means you forgot to **prevent** something...

![Weather in Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png)

### Get current location weather

Now we want to be able to get the weather for our current location.

First, in the HTML, remove the class `d-none` from the link:

```html
<a href="" class="d-none position"><i class="bi bi-geo-alt"></i></a>
```

You can see a location icon appear.

We can retrieve the **current location** of a user with the browser native [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition):

```javascript
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data)
})
```

Do you see what you get from your browser? Your coordinates.

Our code currently uses city **names** to get the weather. Thankfully, there is also an endpoint that takes **coordinates** in the URL. You can scroll down a little [in the doc](https://openweathermap.org/current) to find the endpoint that takes a latitude and a longitude as parameters.

So go on, add an event listener when you click on the location icon and make the API call which will retrieve the current location of the user and update the page accordingly.

If your HTML page reloads, it means you forgot to **prevent** something...

### Time to reorganize your code!

You are not done yet. When your features work, it's tempting to leave the code as it is. Reorganizing your code to make it maintainable in the long run is key if you want to save tons of time in the future.

Do you see any common code there? You should be able to refactor the code in separate methods for better readability 🙌
