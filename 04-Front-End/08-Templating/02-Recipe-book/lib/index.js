// TODO: Use the Meal DB API to search for recipes by ingredient

// Todo: select the HTML elements you need here
const searchInput = document.getElementById("search-input");
const template = document.getElementById("recipe-template");
const recipesContainer = document.getElementById("recipes-container");
const favouritesContainer = document.getElementById("favourites-container");

// Initialize the favourites array
const favourites = [];

const mealApiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

// Todo: create a function to fetch the recipes from the API when the search input changes
