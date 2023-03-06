// TODO: Call the Weather API when the form is submitted

// TODO: Create a function to get the weather info
const fetchWeather = () => {
  // TODO: Replace the following line with the correct url
  // TODO: prevent default behavior of the form
  const url = '...'

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // TODO: Insert the weather info in the DOM (description, date, temperature...)
    });
}

// TODO: Add an event listener to the form
// TODO: On submit, in the callback, call the getWeatherInfo function
