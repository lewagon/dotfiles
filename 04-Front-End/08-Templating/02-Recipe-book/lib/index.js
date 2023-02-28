// TODO: Use the Meal DB API to search for recipes, by name or ingredient (you can choose the endpoint you prefer!)

const searchInput = document.getElementById("search-input");

// Todo: select the HTML elements you need
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";


searchInput.addEventListener("change", (event) => {
  // Todo: Find the category selected and build the URL you will send your request to

  fetch(URL)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // Todo: Insert results into the list

    });
})
