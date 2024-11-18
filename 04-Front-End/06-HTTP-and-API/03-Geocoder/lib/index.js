const TOKEN = "your-token-here";

const displayCoordinates = (longitude, latitude) => {
  // TODO #7: Insert the coordinates into the DOM
  // - Extract the coordinates from the parsed JSON response (lang, lat)
  // - Display the coordinates in the element where the coordinates will be displayed
};

const injectMap = (lng, lat) => {
  // TODO #6: Create the map
  // - Create a map using the Mapbox API
  // - Add a marker to the map at the coordinates
};

const showMapAndCoordinates = (event) => {
  event.preventDefault();
  // TODO #3 Get the user input
  const coordinates = "";
  // TODO #4: Construct the URL (with apiKey & userInput)
  // and make the fetch request to the mapbox API
  const url = ``;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // TODO #5: Extract the coordinates from the parsed JSON response (longitude, latitude)
      // Use these coordinates to call the displayCoordinates and injectMap functions
    });
};

// ### ### ### ### ###
// ### START HERE! ###
// ### ### ### ### ###
// TODO #1: Select the form element
// TODO #2: Add event listener to the form that:
// - Prevents the default form submission behavior
// - Get the user input
// - Calls the showMapAndCoordinates function with the event (from the event listener) as an argument
